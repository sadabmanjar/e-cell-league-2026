import { prisma } from "../../lib/prisma.js";
import { randomBytes } from "crypto";
import bcrypt from "bcrypt";

export class RegistrationService {
  static async getAll() {
    return prisma.registration.findMany({
      include: {
        eCell: {
          include: {
            college: true
          }
        },
        _count: {
          select: { participants: true }
        },
        payment: true,
      },
      orderBy: { createdAt: "desc" }
    });
  }

  static async getById(id: string) {
    return prisma.registration.findUnique({
      where: { id },
      include: {
        eCell: {
          include: {
            college: true
          }
        },
        participants: true,
        payment: true,
        competitions: {
          include: {
            competition: true
          }
        }
      }
    });
  }

  static async create(data: any) {
    return prisma.registration.create({
      data: {
        eCellId: data.eCellId,
        passType: data.passType,
        competitions: {
          create: data.competitionIds.map((id: string) => ({
            competitionId: id
          }))
        }
      }
    });
  }

  static async onboard(data: any) {
    // This expects the payload from the web frontend RegistrationFormData
    // Which includes ecell details, coordinator, participants, passType, selectedTracks

    // Run in a transaction to ensure everything is created together
    return prisma.$transaction(async (tx) => {
      // 1. Create College
      const college = await tx.college.create({
        data: {
          name: data.collegeName,
          city: data.city,
        }
      });

      // 2. Create User (Coordinator)
      const rawPassword = randomBytes(8).toString('hex');
      const hashedPassword = await bcrypt.hash(rawPassword, 10);
      const user = await tx.user.create({
        data: {
          name: data.coordinatorName,
          email: data.coordinatorEmail,
          password: hashedPassword, // we don't send this yet, just a stub
        }
      });

      // 3. Create ECell
      const ecell = await tx.eCell.create({
        data: {
          name: data.ecellName,
          officialEmail: data.officialEmail,
          contactNumber: data.contactNumber || data.coordinatorPhone,
          socialLinks: data.socialLinks || null,
          collegeId: college.id,
          coordinatorId: user.id,
        }
      });

      // 4. Resolve competition slugs to IDs (frontend sends slugs like 'hackathon')
      // If we don't have these exact slugs, we might need to fall back or just create them
      const comps = await tx.competition.findMany({
        where: { slug: { in: data.selectedTracks } }
      });

      // 5. Create Registration
      const passTypeMap: Record<string, any> = {
        "3-pass": "THREE_COMPETITION",
        "5-pass": "FIVE_COMPETITION"
      };

      const registration = await tx.registration.create({
        data: {
          eCellId: ecell.id,
          passType: passTypeMap[data.passType] || "THREE_COMPETITION",
          status: "PENDING",
          competitions: {
            create: comps.map(c => ({
              competitionId: c.id
            }))
          }
        }
      });

      // 6. Create Participants
      if (data.participants && Array.isArray(data.participants)) {
        await tx.participant.createMany({
          data: data.participants.map((p: any) => ({
            registrationId: registration.id,
            name: p.name,
            email: p.email,
            phone: p.phone,
            collegeIdNo: p.collegeId,
          }))
        });
      }

      // 7. Create Payment Stub
      await tx.payment.create({
        data: {
          registrationId: registration.id,
          amount: data.passType === "5-pass" ? 130000 : 100000, // in paise
          currency: "INR",
          status: "PENDING"
        }
      });

      return {
        registrationId: registration.id,
        message: "Registration completed successfully. Check email for details."
      };
    });
  }
}
