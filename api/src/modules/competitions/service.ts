import { prisma } from "../../lib/prisma.js";
import type { CreateCompetitionInput, UpdateCompetitionInput, CreateRoundInput } from "./validation.js";

export class CompetitionService {
  static async getAll() {
    return prisma.competition.findMany({
      include: {
        rounds: { orderBy: { order: "asc" } },
        _count: { select: { registrations: true, results: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getById(id: string) {
    return prisma.competition.findUnique({
      where: { id },
      include: {
        rounds: { orderBy: { order: "asc" } },
        registrations: {
          include: {
            registration: {
              include: {
                eCell: { include: { college: true } },
                participants: true,
              },
            },
          },
        },
        _count: { select: { results: true } },
      },
    });
  }

  static async getBySlug(slug: string) {
    return prisma.competition.findUnique({
      where: { slug },
      include: { rounds: { orderBy: { order: "asc" } } },
    });
  }

  static async create(data: CreateCompetitionInput) {
    return prisma.competition.create({ data });
  }

  static async update(id: string, data: UpdateCompetitionInput) {
    // Strip undefined values to satisfy Prisma exactOptionalPropertyTypes
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined)
    );
    return prisma.competition.update({ where: { id }, data: cleanData as any });
  }

  static async delete(id: string) {
    // Safety check: do not allow deletion if official results exist
    const resultCount = await prisma.result.count({ where: { competitionId: id } });
    if (resultCount > 0) {
      throw new Error("COMPETITION_HAS_RESULTS");
    }
    return prisma.competition.delete({ where: { id } });
  }

  static async getRegisteredTeams(competitionId: string) {
    return prisma.registrationCompetition.findMany({
      where: { competitionId },
      include: {
        registration: {
          include: {
            eCell: { include: { college: true } },
            participants: true,
          },
        },
      },
    });
  }

  // ── Rounds ───────────────────────────────────────────────────────────────────

  static async createRound(competitionId: string, data: CreateRoundInput) {
    return prisma.competitionRound.create({
      data: {
        name: data.name,
        order: data.order,
        date: data.date ? new Date(data.date) : null,
        competitionId,
      },
    });
  }

  static async updateRound(roundId: string, data: Partial<CreateRoundInput>) {
    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.order !== undefined) updateData.order = data.order;
    if (data.date !== undefined) updateData.date = data.date ? new Date(data.date) : null;
    return prisma.competitionRound.update({
      where: { id: roundId },
      data: updateData,
    });
  }

  static async deleteRound(roundId: string) {
    const resultCount = await prisma.result.count({ where: { roundId } });
    if (resultCount > 0) {
      throw new Error("ROUND_HAS_RESULTS");
    }
    return prisma.competitionRound.delete({ where: { id: roundId } });
  }
}
