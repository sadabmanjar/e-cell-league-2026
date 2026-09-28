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
    // 1. Find or create College to prevent duplicate name errors
    let college = await prisma.college.findFirst({
      where: {
        name: { equals: data.collegeName, mode: 'insensitive' }
      }
    });

    if (!college) {
      college = await prisma.college.create({
        data: {
          name: data.collegeName,
          city: data.city,
        }
      });
    }

    // 2. Check for duplicate official email or coordinator email before attempting creation
    const existingUser = await prisma.user.findUnique({
      where: { email: data.coordinatorEmail }
    });
    if (existingUser) {
      const err: any = new Error("Coordinator email is already registered");
      err.statusCode = 400;
      throw err;
    }

    const existingEcell = await prisma.eCell.findUnique({
      where: { officialEmail: data.officialEmail }
    });
    if (existingEcell) {
      const err: any = new Error("E-Cell official email is already registered");
      err.statusCode = 400;
      throw err;
    }

    if (data.utr) {
      const existingPayment = await prisma.payment.findUnique({
        where: { utr: data.utr }
      });
      if (existingPayment) {
        const err: any = new Error("Transaction UTR has already been submitted");
        err.statusCode = 400;
        throw err;
      }
    }

    // 3. Create User (Coordinator)
    const rawPassword = randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const user = await prisma.user.create({
      data: {
        name: data.coordinatorName,
        email: data.coordinatorEmail,
        password: hashedPassword,
      }
    });

    // 4. Create ECell
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

    // 5. Resolve competition slugs/IDs
    let comps: Array<{ id: string }> = [];
    if (data.selectedTracks && Array.isArray(data.selectedTracks) && data.selectedTracks.length > 0) {
      comps = await prisma.competition.findMany({
        where: {
          OR: [
            { slug: { in: data.selectedTracks } },
            { id: { in: data.selectedTracks } },
            { name: { in: data.selectedTracks } }
          ]
        }
      });
    }

    // Fallback if DB doesn't have exact matching competitions yet
    if (comps.length === 0) {
      const allComps = await prisma.competition.findMany({ take: 5 });
      comps = allComps;
    }

    // 6. Create Registration
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

    // 7. Create Participants
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

    // 8. Create Payment record
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
