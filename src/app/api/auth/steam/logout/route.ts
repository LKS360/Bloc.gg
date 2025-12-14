import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.redirect("http://localhost:3000/");

  // Apaga o cookie de sessão
  res.cookies.set({
    name: "session",
    value: "",
    maxAge: 0,
    httpOnly: true,
    secure: false, // coloque true em produção com HTTPS
    path: "/",
  });

  return res;
}
