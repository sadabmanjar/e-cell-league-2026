import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma.js";
import { generateToken } from "../../utils/jwt.util.js";

export class AuthService {
  static async login(email: string, password: string) {
    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    // Use a constant-time comparison path even when the admin doesn't exist
    // to avoid user enumeration via timing attacks.
    const DUMMY_HASH = "$2b$12$invalidhashfortimingprotection000000000000000000000";
    const hashToCheck = admin?.password ?? DUMMY_HASH;

    const isPasswordValid = await bcrypt.compare(password, hashToCheck);

    if (!admin || !isPasswordValid) {
      // Always throw the same error code regardless of which check failed
      throw new Error("INVALID_CREDENTIALS");
    }

    // Never return the password hash
    const token = generateToken({ id: admin.id, role: admin.role });

    return {
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    };
  }
}
