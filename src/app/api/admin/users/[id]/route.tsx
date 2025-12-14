import { NextResponse, type NextRequest } from "next/server";
import { supabase } from "@/lib/supabaseClient";

type Params = {
  id: string;
};

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params;
    const userId = Number(id);

    if (Number.isNaN(userId)) {
      return NextResponse.json(
        { success: false, error: "Invalid user id" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    if (error) {
      console.error("DELETE USER ERROR:", error);
      return NextResponse.json(
        { success: false },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE FAIL:", err);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
