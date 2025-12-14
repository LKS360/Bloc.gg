import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { steam_id, reason, admin_steam_id } = body;

    if (!steam_id || !reason) {
      return NextResponse.json(
        { error: "Missing steam_id or reason" },
        { status: 400 }
      );
    }

    // =========================
    // Bannir usuário
    // =========================
    const { error: updateError } = await supabase
      .from("users")
      .update({
        banned: true,
        ban_reason: reason,
      })
      .eq("steam_id", steam_id);

    if (updateError) {
      console.error("BAN ERROR:", updateError);
      return NextResponse.json({ error: "Failed to ban user" }, { status: 500 });
    }

    // =========================
    // Registrar LOG
    // =========================
    await supabase.from("admin_logs").insert({
      admin_steam_id: admin_steam_id ?? "unknown",
      action: "ban",
      details: `Usuário ${steam_id} foi banido.\nMotivo: ${reason}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("BAN API ERROR:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
