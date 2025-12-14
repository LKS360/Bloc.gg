import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { steam_id, admin_steam_id } = body;

    if (!steam_id) {
      return NextResponse.json(
        { error: "Missing steam_id" },
        { status: 400 }
      );
    }

    // =========================
    // Remover banimento
    // =========================
    const { error: updateError } = await supabase
      .from("users")
      .update({
        banned: false,
        ban_reason: null,
      })
      .eq("steam_id", steam_id);

    if (updateError) {
      console.error("UNBAN ERROR:", updateError);
      return NextResponse.json(
        { error: "Failed to unban user" },
        { status: 500 }
      );
    }

    // =========================
    // Registrar LOG
    // =========================
    await supabase.from("admin_logs").insert({
      admin_steam_id: admin_steam_id ?? "unknown",
      action: "unban",
      details: `Usuário ${steam_id} foi desbanido.`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("UNBAN API ERROR:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
