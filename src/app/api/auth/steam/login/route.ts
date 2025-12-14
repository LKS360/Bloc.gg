import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;

  const returnUrl = `${origin}/api/auth/steam/return`;

  const url =
    "https://steamcommunity.com/openid/login" +
    "?openid.ns=http://specs.openid.net/auth/2.0" +
    "&openid.mode=checkid_setup" +
    "&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select" +
    "&openid.identity=http://specs.openid.net/auth/2.0/identifier_select" +
    `&openid.return_to=${encodeURIComponent(returnUrl)}`;

  return NextResponse.redirect(url);
}
