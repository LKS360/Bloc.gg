import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { parseSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") ?? "";
    const token = cookie.split("session=")[1]?.split(";")[0];

    if (!token) {
      return NextResponse.json({ error: "Not logged" }, { status: 401 });
    }

    const session = parseSession(token);

    if (!session) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("steam_id", session.steamId)
      .single();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      steamId: user.steam_id,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      vip_until: user.vip_until,
    });
  } catch (err) {
    console.error("[AUTH_ME]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
