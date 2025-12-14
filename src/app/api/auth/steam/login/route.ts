import { NextResponse } from "next/server";

export async function GET() {
  const SITE_URL = process.env.SITE_URL;

  if (!SITE_URL) {
    return NextResponse.json(
      { error: "SITE_URL not configured" },
      { status: 500 }
    );
  }

  const returnUrl = `${SITE_URL}/api/auth/steam/return`;

  const params = new URLSearchParams({
    "openid.ns": "http://specs.openid.net/auth/2.0",
    "openid.mode": "checkid_setup",
    "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
    "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
    "openid.return_to": returnUrl,
    "openid.realm": SITE_URL,
  });

  return NextResponse.redirect(
    `https://steamcommunity.com/openid/login?${params.toString()}`
  );
}
