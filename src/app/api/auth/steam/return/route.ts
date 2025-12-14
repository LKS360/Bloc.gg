import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  try {
    const SITE_URL = process.env.SITE_URL!;
    const url = new URL(req.url);
    const params = url.searchParams;

    const steamId = params
      .get("openid.claimed_id")
      ?.replace("https://steamcommunity.com/openid/id/", "");

    if (!steamId) {
      return NextResponse.json({ error: "Invalid OpenID return" }, { status: 400 });
    }

    const apiKey = process.env.STEAM_API_KEY!;
    const steamRes = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`
    );

    const data = await steamRes.json();
    const player = data?.response?.players?.[0];

    if (!player) {
      return NextResponse.json({ error: "Steam user not found" }, { status: 404 });
    }

    const { data: dbUser, error } = await supabase
      .from("users")
      .upsert(
        {
          steam_id: steamId,
          name: player.personaname,
          avatar: player.avatarfull,
          last_login: new Date().toISOString(),
        },
        { onConflict: "steam_id" }
      )
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
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
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error("Steam return error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
