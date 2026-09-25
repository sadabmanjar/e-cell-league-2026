import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";

export class ScheduleService {
  static async getAll() {
    return prisma.schedule.findMany({
      orderBy: { startTime: "asc" },
      include: {
        competition: { select: { id: true, name: true } },
        round: { select: { id: true, name: true } },
      },
    });
  }

  static async getById(id: string) {
    return prisma.schedule.findUnique({
      where: { id },
      include: {
        competition: { select: { id: true, name: true } },
        round: { select: { id: true, name: true } },
      },
    });
  }

  static async create(data: Prisma.ScheduleUncheckedCreateInput) {
    return prisma.schedule.create({ data });
  }

  static async update(id: string, data: Prisma.ScheduleUncheckedUpdateInput) {
    // Remove undefined values to ensure Prisma doesn't throw errors
    const updateData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );
    return prisma.schedule.update({
      where: { id },
      data: updateData,
    });
  }

  static async delete(id: string) {
    return prisma.schedule.delete({ where: { id } });
  }
}
