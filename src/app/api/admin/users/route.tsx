import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("LOAD USERS ERROR:", error);
      return NextResponse.json([], { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("UNEXPECTED USERS ERROR:", err);
    return NextResponse.json([], { status: 500 });
  }
}
