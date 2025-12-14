import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { steamid, name, avatar } = body;

    if (!steamid) {
      return NextResponse.json({ error: "Missing steamid" }, { status: 400 });
    }

    // Verifica se já existe
    const { data: existingUser } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("steamid", steamid)
      .single();

    if (existingUser) {
      // Atualiza dados básicos
      await supabaseAdmin
        .from("users")
        .update({ name, avatar })
        .eq("steamid", steamid);

      return NextResponse.json({ success: true, updated: true });
    }

    // Cria novo usuário
    await supabaseAdmin.from("users").insert({
      steamid,
      name,
      avatar,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, created: true });
  } catch (err) {
    console.error("Supabase save-user error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
