import { NextResponse } from "next/server";

// Lendo a variável de ambiente diretamente dentro da função
export async function GET() {
  const siteUrl = process.env.SITE_URL;  // Definindo a variável de ambiente corretamente

  // Verificando se SITE_URL foi configurado
  if (!siteUrl) {
    return NextResponse.json(
      { error: "SITE_URL not configured" },  // Caso não esteja configurado
      { status: 500 }
    );
  }

  const returnUrl = `${siteUrl}/api/auth/steam/return`;

  const url =
    "https://steamcommunity.com/openid/login" +
    "?openid.ns=http://specs.openid.net/auth/2.0" +
    "&openid.mode=checkid_setup" +
    "&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select" +
    "&openid.identity=http://specs.openid.net/auth/2.0/identifier_select" +
    `&openid.return_to=${encodeURIComponent(returnUrl)}`;

  return NextResponse.redirect(url);  // Redireciona para o login do Steam
}
