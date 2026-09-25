import type { Request, Response, NextFunction } from "express";
import { ResultService } from "./service.js";
import { bulkUpsertResultsSchema, publishResultsSchema } from "./validation.js";
import type { AuthRequest } from "../../middleware/auth.middleware.js";

export class ResultController {
  static async getByRound(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { competitionId, roundId } = req.params;
      const data = await ResultService.getByRound(competitionId as string, roundId as string);
      res.json({ success: true, data });
    } catch (error: any) {
      if (error.message === "ROUND_NOT_FOUND") {
        res.status(404).json({ success: false, message: "Round not found or does not belong to this competition." });
        return;
      }
      next(error);
    }
  }

  static async bulkUpsert(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = bulkUpsertResultsSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ success: false, message: "Validation failed", errors: parsed.error.flatten() });
        return;
      }

      const data = await ResultService.bulkUpsert(parsed.data, req.admin!.id);
      res.json({ success: true, data, message: `${data.length} result(s) saved as DRAFT.` });
    } catch (error: any) {
      if (error.message === "COMPETITION_NOT_FOUND") {
        res.status(404).json({ success: false, message: "Competition not found." });
        return;
      }
      if (error.message === "ROUND_NOT_FOUND") {
        res.status(404).json({ success: false, message: "Round not found or does not belong to this competition." });
        return;
      }
      if (error.message?.startsWith("INVALID_REGISTRATIONS:")) {
        const ids = error.message.replace("INVALID_REGISTRATIONS:", "");
        res.status(400).json({ success: false, message: `Some teams are not registered for this competition: ${ids}` });
        return;
      }
      next(error);
    }
  }

  static async publishResults(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = publishResultsSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ success: false, message: "Validation failed", errors: parsed.error.flatten() });
        return;
      }

      const result = await ResultService.publishResults(parsed.data, req.admin!.id);
      res.json({ success: true, data: result, message: `${result.publishedCount} result(s) published.` });
    } catch (error: any) {
      if (error.message === "NO_DRAFT_RESULTS") {
        res.status(404).json({ success: false, message: "No draft results found for this round. Enter scores first." });
        return;
      }
      next(error);
    }
  }

  static async unpublishResults(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = publishResultsSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ success: false, message: "Validation failed", errors: parsed.error.flatten() });
        return;
      }

      const result = await ResultService.unpublishResults(parsed.data, req.admin!.id);
      res.json({ success: true, data: result, message: `${result.unpublishedCount} result(s) reverted to draft.` });
    } catch (error: any) {
      if (error.message === "NO_PUBLISHED_RESULTS") {
        res.status(404).json({ success: false, message: "No published results found for this round." });
        return;
      }
      next(error);
    }
  }

  static async deleteResult(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await ResultService.deleteResult(req.params.resultId as string);
      res.json({ success: true, message: "Draft result deleted." });
    } catch (error: any) {
      if (error.message === "RESULT_NOT_FOUND") {
        res.status(404).json({ success: false, message: "Result not found." });
        return;
      }
      if (error.message === "CANNOT_DELETE_PUBLISHED") {
        res.status(409).json({ success: false, message: "Published results cannot be deleted. Unpublish first." });
        return;
      }
      next(error);
    }
  }
}
