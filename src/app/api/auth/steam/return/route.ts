export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  try {
    const siteUrl = process.env.SITE_URL;

    if (!siteUrl) {
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
    if (!apiKey) {
      return NextResponse.json(
        { error: "STEAM_API_KEY not configured" },
        { status: 500 }
      );
    }

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

    const { data: dbUser, error } = await supabase
      .from("users")
      .upsert(
        {
          steam_id: steamId,
          name: player.personaname ?? "Steam User",
          avatar: player.avatarfull ?? null,
          last_login: new Date().toISOString(),
        },
        { onConflict: "steam_id" }
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
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

    const response = NextResponse.redirect(`${siteUrl}/?logged=1`);

    response.cookies.set({
      name: "session",
      value: token,
      httpOnly: true,
      secure: siteUrl.startsWith("https"),
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (err) {
    console.error("Steam return error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
