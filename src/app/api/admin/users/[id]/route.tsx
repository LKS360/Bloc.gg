import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const userId = Number(params.id);

    // Deleta usuário
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    if (error) {
      console.error("DELETE USER ERROR:", error);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("DELETE FAIL:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
