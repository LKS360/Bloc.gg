import { NextResponse } from "next/server";

export async function GET() {
  const SITE_URL = process.env.SITE_URL!;

  const res = NextResponse.redirect(SITE_URL);

  res.cookies.set({
    name: "session",
    value: "",
    maxAge: 0,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return res;
}
