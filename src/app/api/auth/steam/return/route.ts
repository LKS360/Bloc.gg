import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  try {
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
      throw new Error("STEAM_API_KEY not configured");
    }

    const steamRes = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`
    );

    if (!steamRes.ok) {
      throw new Error("Steam API request failed");
    }

    const data = await steamRes.json();
    const player = data?.response?.players?.[0];

    if (!player) {
      throw new Error("Steam player not found");
    }

    const userData = {
      steam_id: steamId,
      name: player.personaname ?? "Steam User",
      avatar: player.avatarfull ?? player.avatarmedium ?? null,
      last_login: new Date().toISOString(),
    };

    const { data: dbUser, error: dbError } = await supabase
      .from("users")
      .upsert(userData, { onConflict: "steam_id" })
      .select()
      .single();

    if (dbError) {
      throw dbError;
    }

    const token = createSession({
      id: steamId,
      steamId,
      name: dbUser.name,
      avatar: dbUser.avatar,
      role: (dbUser as any).role ?? "user",
    });

    const siteUrl =
  process.env.SITE_URL ?? "https://bloc-gg.vercel.app";

const response = NextResponse.redirect(
  `${siteUrl}/?logged=1`
);

console.log("SITE_URL:", process.env.SITE_URL);

    response.cookies.set({
      name: "session",
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err: any) {
    console.error("Steam return error:", err);

    return NextResponse.json(
      {
        error: "Internal error",
        message: err?.message,
        stack: err?.stack,
      },
      { status: 500 }
    );
  }
}
