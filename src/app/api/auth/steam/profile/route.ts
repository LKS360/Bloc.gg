import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseSession } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) {
      return NextResponse.json({ error: "Missing session" }, { status: 400 });
    }

    // Decodifica JWT local
    const tokenData = parseSession(session.value);
    if (!tokenData) {
      return NextResponse.json({ error: "Invalid session" }, { status: 400 });
    }

    const steamId = tokenData.steamId;

    // Busca dados COMPLETOS do usuário
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("steam_id", steamId)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      steam_id: user.steam_id,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      banned: user.banned,
      ban_reason: user.ban_reason,
      security_flags: user.security_flags,
      vip_until: user.vip_until,      //  <<<<<<<<<<<<<<<<<< AQUI!!!
      last_login: user.last_login,
      created_at: user.created_at,
    });

  } catch (err) {
    console.error("PROFILE ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
