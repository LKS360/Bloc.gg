import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;

    const steamId = params
      .get("openid.claimed_id")
      ?.replace("https://steamcommunity.com/openid/id/", "");

    if (!steamId) {
      return NextResponse.json(
        { error: "Invalid OpenID return" },
        { status: 400 }
      );
    }

    const apiKey = process.env.STEAM_API_KEY;

    const steamRes = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`
    );

    if (!steamRes.ok) {
      return NextResponse.json({ error: "Steam API error" }, { status: 500 });
    }

    const data = await steamRes.json();
    const player = data?.response?.players?.[0];

    if (!player) {
      return NextResponse.json(
        { error: "Steam API: player not found" },
        { status: 404 }
      );
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
      console.error("Supabase upsert error:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const userAgent = req.headers.get("user-agent") ?? "unknown";

    await supabase.from("admin_logs").insert({
      admin_steam_id: steamId,
      action: "login",
      details: `Usuário logou no sistema.\nIP: ${ip}\nNavegador: ${userAgent}`,
    });

    // 🔥 CRIA JWT VALIDADE DE 7 DIAS
    const token = createSession({
      id: steamId,
      steamId,
      name: dbUser.name,
      avatar: dbUser.avatar,
      role: dbUser.role ?? "user",
    });

    const response = NextResponse.redirect("http://localhost:3000/?logged=1");
    response.headers.set("Cache-Control", "no-store");

    response.cookies.set({
      name: "session",
      value: token,
      httpOnly: true,
      secure: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Steam return error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
