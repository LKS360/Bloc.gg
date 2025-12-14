import { NextResponse } from "next/server";

export async function GET() {
  const siteUrl = process.env.SITE_URL;

  if (!siteUrl) {
    return NextResponse.json(
      { error: "SITE_URL not configured" },
      { status: 500 }
    );
  }

  const response = NextResponse.redirect(siteUrl);

  // Apaga o cookie de sessão
  response.cookies.set({
    name: "session",
    value: "",
    maxAge: 0,
    httpOnly: true,
    secure: siteUrl.startsWith("https://"),
    path: "/",
  });

  return response;
}
