import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id, name, role, banned, ban_reason, vip_until, security_flags } = body;

    const { error } = await supabase
      .from("users")
      .update({
        name,
        role,
        banned,
        ban_reason,
        vip_until,
        security_flags,
      })
      .eq("id", id);

    if (error) {
      console.error("UPDATE USER ERROR:", error);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("UPDATE USER FAIL:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
