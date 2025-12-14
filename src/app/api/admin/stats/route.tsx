import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    // --- Contagem total de usuários via VIEW ---
    const { data: usersCount, error: usersErr } = await supabase
      .from("users_count")
      .select("*")
      .single();

    if (usersErr) console.error("Users view error:", usersErr);

    // --- Contagem de VIPs via VIEW ---
    const { data: vipCount, error: vipErr } = await supabase
      .from("vip_active_count")
      .select("*")
      .single();

    if (vipErr) console.error("VIP view error:", vipErr);

    // --- Contagem de servidores via VIEW ---
    const { data: serversCount, error: serverErr } = await supabase
      .from("servers_count")
      .select("*")
      .single();

    if (serverErr) console.error("Servers view error:", serverErr);

    return NextResponse.json({
      users: usersCount?.total ?? 0,
      vip_active: vipCount?.total ?? 0,
      servers: serversCount?.total ?? 0,
      revenue_30d: 0, // por enquanto placeholder
    });
  } catch (err) {
    console.error("STATS API ERROR:", err);
    return NextResponse.json(
      { error: "Stats fetch error" },
      { status: 500 }
    );
  }
}
