import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";

export class AnnouncementService {
  static async getAll(isPublic = false) {
    const where = isPublic ? { status: "PUBLISHED" as const } : {};
    return prisma.announcement.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  static async getById(id: string) {
    return prisma.announcement.findUnique({ where: { id } });
  }

  static async create(data: Prisma.AnnouncementUncheckedCreateInput) {
    return prisma.announcement.create({ data });
  }

  static async update(id: string, data: Prisma.AnnouncementUncheckedUpdateInput) {
    // Check if being published now
    let updateData = { ...data };
    if (data.status === "PUBLISHED" && !data.publishedAt) {
      updateData.publishedAt = new Date().toISOString();
    }
    
    // Remove undefined values
    updateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, v]) => v !== undefined)
    );

    return prisma.announcement.update({
      where: { id },
      data: updateData,
    });
  }

  static async delete(id: string) {
    return prisma.announcement.delete({ where: { id } });
  }
}
