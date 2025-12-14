// src/proxy.ts
import { NextResponse } from "next/server";
import { parseSession, SessionPayload } from "@/lib/auth";

const ONE_DAY = 60 * 60 * 24;
const SEVEN_DAYS = ONE_DAY * 7;
const REFRESH_THRESHOLD = ONE_DAY * 2; // quando faltar <2 dias

// Rotas públicas
const PUBLIC_ROUTES = [
  "/",
  "/favicon.ico",
  "/api/auth/steam/login",
  "/api/auth/steam/return",
];

// Ignora assets internos
function isAssetPath(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/public")
  );
}

// Pega cookie de sessão
function getSessionCookieFromRequest(req: Request): string | null {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";");
  const sessionPart = cookies.find((c) => c.trim().startsWith("session="));
  if (!sessionPart) return null;

  const raw = sessionPart.trim().slice("session=".length);
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function shouldRefreshSession(exp?: number): boolean {
  if (!exp) return false;

  const now = Math.floor(Date.now() / 1000);
  const timeLeft = exp - now;

  return timeLeft > 0 && timeLeft < REFRESH_THRESHOLD;
}

export const proxy = async (request: Request) => {
  const url = new URL(request.url);
  const { pathname } = url;

  // 1) Ignora assets
  if (isAssetPath(pathname)) return NextResponse.next();

  // 2) Libera rotas públicas
  if (PUBLIC_ROUTES.some((r) => pathname === r || pathname.startsWith(r))) {
    return NextResponse.next();
  }

  // 3) Agora é área protegida
  const token = getSessionCookieFromRequest(request);

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const session = parseSession(token);

  if (!session) {
    const res = NextResponse.redirect(new URL("/", request.url));
    res.cookies.delete("session");
    return res;
  }

  // 4) Libera rota
  const response = NextResponse.next();

  // ❗ O refresh NÃO cria nova sessão via JWT (não permitido no edge)
  // Então apenas EXTENDE a validade do mesmo token sem re-assinar
  if (shouldRefreshSession(session.exp)) {
    response.cookies.set({
      name: "session",
      value: token, // mesmo token
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SEVEN_DAYS, // estende vida do cookie
    });
  }

  return response;
};
