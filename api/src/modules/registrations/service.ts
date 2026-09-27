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
    // Sequential creates — no transaction needed for manual QR payment flow.
    // Neon's pooler (PgBouncer) doesn't support interactive transactions,
    // causing prisma.$transaction() to timeout on cold starts.

    // 1. Create College
    const college = await prisma.college.create({
      data: {
        name: data.collegeName,
        city: data.city,
      }
    });

    // 2. Create User (Coordinator)
    const rawPassword = randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const user = await prisma.user.create({
      data: {
        name: data.coordinatorName,
        email: data.coordinatorEmail,
        password: hashedPassword,
      }
    });

    // 3. Create ECell
    const ecell = await prisma.eCell.create({
      data: {
        name: data.ecellName,
        officialEmail: data.officialEmail,
        contactNumber: data.contactNumber || data.coordinatorPhone,
        socialLinks: data.socialLinks || null,
        collegeId: college.id,
        coordinatorId: user.id,
      }
    });

    // 4. Resolve competition slugs to IDs
    const comps = await prisma.competition.findMany({
      where: { slug: { in: data.selectedTracks } }
    });

    // 5. Create Registration
    const passTypeMap: Record<string, any> = {
      "3-pass": "THREE_COMPETITION",
      "5-pass": "FIVE_COMPETITION"
    };

    const registration = await prisma.registration.create({
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
      await prisma.participant.createMany({
        data: data.participants.map((p: any) => ({
          registrationId: registration.id,
          name: p.name,
          email: p.email,
          phone: p.phone,
          collegeIdNo: p.collegeId,
        }))
      });
    }

    // 7. Create Payment record (manual QR / UTR verification)
    await prisma.payment.create({
      data: {
        registrationId: registration.id,
        amount: data.passType === "5-pass" ? 1300 : 1000,
        currency: "INR",
        status: "PENDING_VERIFICATION",
        utr: data.utr,
      }
    });

    return {
      registrationId: registration.id,
      message: "Registration completed successfully. Your payment will be verified shortly."
    };
  }
}
