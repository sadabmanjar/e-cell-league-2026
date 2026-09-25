import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modules = [
  'ecells',
  'participants',
  'registrations',
  'competitions',
  'results',
  'leaderboard',
  'payments',
  'schedule',
  'announcements'
];

const basePath = path.join(__dirname, 'src', 'modules');

for (const mod of modules) {
  const modPath = path.join(basePath, mod);
  if (!fs.existsSync(modPath)) {
    fs.mkdirSync(modPath, { recursive: true });
  }

  // Format names
  const Name = mod.charAt(0).toUpperCase() + mod.slice(1);
  const SingularName = Name.endsWith('s') ? Name.slice(0, -1) : Name;

  const controller = `import type { Request, Response, NextFunction } from "express";
import { ${SingularName}Service } from "./service.js";

export class ${SingularName}Controller {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await ${SingularName}Service.getAll();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const data = await ${SingularName}Service.getById(id as string);
      if (!data) {
        res.status(404).json({ success: false, message: "Not found" });
        return;
      }
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await ${SingularName}Service.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}
`;

  const service = `import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ${SingularName}Service {
  static async getAll() {
    return [];
  }

  static async getById(id: string) {
    return null;
  }

  static async create(data: any) {
    return data;
  }
}
`;

  const router = `import { Router } from "express";
import { ${SingularName}Controller } from "./controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", ${SingularName}Controller.getAll);
router.get("/:id", ${SingularName}Controller.getById);
router.post("/", authMiddleware, ${SingularName}Controller.create);

export { router as ${mod}Router };
`;

  const validation = `import { z } from "zod";

export const create${SingularName}Schema = z.object({
  // define schema fields here
});
`;

  fs.writeFileSync(path.join(modPath, 'controller.ts'), controller);
  fs.writeFileSync(path.join(modPath, 'service.ts'), service);
  fs.writeFileSync(path.join(modPath, 'router.ts'), router);
  fs.writeFileSync(path.join(modPath, 'validation.ts'), validation);
}

console.log("Modules generated successfully!");
