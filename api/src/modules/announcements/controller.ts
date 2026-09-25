import type { Request, Response, NextFunction } from "express";
import { AnnouncementService } from "./service.js";
import { announcementSchema, updateAnnouncementSchema } from "./validation.js";

export class AnnouncementController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const announcements = await AnnouncementService.getAll(false);
      res.json({ success: true, data: announcements });
    } catch (error) {
      next(error);
    }
  }

  static async getPublic(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const announcements = await AnnouncementService.getAll(true);
      res.json({ success: true, data: announcements });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const announcement = await AnnouncementService.getById(req.params.id as string);
      if (!announcement) {
        res.status(404).json({ success: false, message: "Announcement not found" });
        return;
      }
      res.json({ success: true, data: announcement });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Use safeParse — prevents raw Zod errors from reaching the global error handler
      const parsed = announcementSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten(),
        });
        return;
      }
      const announcement = await AnnouncementService.create(parsed.data as any);
      res.status(201).json({ success: true, data: announcement });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = updateAnnouncementSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten(),
        });
        return;
      }
      const announcement = await AnnouncementService.update(
        req.params.id as string,
        parsed.data as any
      );
      res.json({ success: true, data: announcement });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await AnnouncementService.delete(req.params.id as string);
      res.json({ success: true, message: "Announcement deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
