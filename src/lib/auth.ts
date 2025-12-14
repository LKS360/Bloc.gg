// src/lib/auth.ts
import jwt from "jsonwebtoken";

/**
 * SECRET:
 * - Usa JWT_SECRET
 * - Fallback para SESSION_SECRET
 * - fallback dev
 */
const SECRET =
  process.env.JWT_SECRET ||
  process.env.SESSION_SECRET ||
  "dev-secret-change-me";

export interface SessionPayload {
  id: string;
  steamId: string;
  name: string;
  avatar: string | null;
  role?: string;
  iat?: number;
  exp?: number;
}

/**
 * Cria um token JWT de sessão (7 dias)
 */
export function createSession(user: SessionPayload): string {
  return jwt.sign(
    {
      id: user.id,
      steamId: user.steamId,
      name: user.name,
      avatar: user.avatar ?? null,
      role: user.role ?? "user",
    },
    SECRET,
    { expiresIn: "7d" }
  );
}

/**
 * Valida um token JWT e retorna payload OU null
 */
export function parseSession(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, SECRET) as SessionPayload;
  } catch (err) {
    console.error("Erro ao validar sessão JWT:", err);
    return null;
  }
}
