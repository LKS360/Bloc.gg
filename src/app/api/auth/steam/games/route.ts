import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseSession } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) return NextResponse.json({ error: "Missing session" });

    const session = parseSession(token);

    const steamId = session?.steamId;
    const key = process.env.STEAM_API_KEY;

    const api =
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/` +
      `?key=${key}&steamid=${steamId}&include_appinfo=1&format=json`;

    const res = await fetch(api);
    const data = await res.json();

    const cs = data.response.games?.find((g: any) => g.appid === 730);

    return NextResponse.json({
      hours_all: cs ? cs.playtime_forever / 60 : 0,
      hours_2weeks: cs?.playtime_2weeks ? cs.playtime_2weeks / 60 : 0,
      last_played: cs?.rtime_last_played || null,
    });
  } catch (err) {
    console.error("Erro Steam API:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
