import type { Request, Response, NextFunction } from "express";
import { ScheduleService } from "./service.js";
import { scheduleSchema, updateScheduleSchema } from "./validation.js";

export class ScheduleController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const schedules = await ScheduleService.getAll();
      res.json({ success: true, data: schedules });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const schedule = await ScheduleService.getById(req.params.id as string);
      if (!schedule) {
        res.status(404).json({ success: false, message: "Schedule not found" });
        return;
      }
      res.json({ success: true, data: schedule });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = scheduleSchema.parse(req.body);
      const schedule = await ScheduleService.create(parsed as any);
      res.status(201).json({ success: true, data: schedule });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = updateScheduleSchema.parse(req.body);
      const schedule = await ScheduleService.update(req.params.id as string, parsed as any);
      res.json({ success: true, data: schedule });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await ScheduleService.delete(req.params.id as string);
      res.json({ success: true, message: "Schedule deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
