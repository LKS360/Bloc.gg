import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const SITE_URL = process.env.SITE_URL;

    if (!SITE_URL) {
      return NextResponse.json(
        { error: "SITE_URL not configured" },
        { status: 500 }
      );
    }

    const url = new URL(req.url);
    const params = url.searchParams;

    const claimedId = params.get("openid.claimed_id");

    if (!claimedId) {
      return NextResponse.json(
        { error: "Invalid OpenID return" },
        { status: 400 }
      );
    }

    const steamId = claimedId.replace(
      "https://steamcommunity.com/openid/id/",
      ""
    );

    const apiKey = process.env.STEAM_API_KEY;

    const steamRes = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`
    );

    if (!steamRes.ok) {
      return NextResponse.json(
        { error: "Steam API error" },
        { status: 500 }
      );
    }

    const data = await steamRes.json();
    const player = data?.response?.players?.[0];

    if (!player) {
      return NextResponse.json(
        { error: "Steam user not found" },
        { status: 404 }
      );
    }

    const userData = {
      steam_id: steamId,
      name: player.personaname ?? "Steam User",
      avatar: player.avatarfull ?? null,
      last_login: new Date().toISOString(),
    };

    const { data: dbUser, error } = await supabase
      .from("users")
      .upsert(userData, { onConflict: "steam_id" })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Database error" },
        { status: 500 }
      );
    }

    const token = createSession({
      id: steamId,
      steamId,
      name: dbUser.name,
      avatar: dbUser.avatar,
      role: dbUser.role ?? "user",
    });

    const response = NextResponse.redirect(`${SITE_URL}/?logged=1`);

    response.cookies.set({
      name: "session",
      value: token,
      httpOnly: true,
      secure: true, // HTTPS na Vercel
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error("Steam return error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
