import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const STEAM_KEY = process.env.STEAM_API_KEY!;
  const steamId = req.headers.get("x-steamid");

  if (!steamId)
    return NextResponse.json({ error: "Missing steamId" }, { status: 400 });

  try {
    const url =
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/` +
      `?key=${STEAM_KEY}&steamid=${steamId}&include_played_free_games=1&format=json`;

    const res = await fetch(url);
    const data = await res.json();

    const cs = data?.response?.games?.find((g: any) => g.appid === 730);

    if (!cs) {
      return NextResponse.json({
        hours_all: 0,
        hours_2weeks: 0,
        last_played: null,
      });
    }

    return NextResponse.json({
      hours_all: Math.round((cs.playtime_forever ?? 0) / 60),
      hours_2weeks: Math.round((cs.playtime_2weeks ?? 0) / 60),
      last_played: cs.rtime_last_played
        ? new Date(cs.rtime_last_played * 1000).toISOString()
        : null,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Steam API error" }, { status: 500 });
  }
}
