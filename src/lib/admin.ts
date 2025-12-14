import { cookies } from "next/headers";
import { parseSession } from "./auth";
import { supabase } from "./supabaseClient";

export async function getSessionAdmin() {
  // ✅ Next.js 16 → cookies() é async
  const cookieStore = await cookies();

  const session = cookieStore.get("session");
  if (!session?.value) {
    throw new Error("Not authorized");
  }

  const token = session.value;
  const user = parseSession(token);

  if (!user) {
    throw new Error("Invalid session");
  }

  const { data, error } = await supabase
    .from("users")
    .select("id, role")
    .eq("steam_id", user.steamId)
    .single();

  if (error || !data || data.role !== "admin") {
    throw new Error("Not authorized");
  }

  return data;
}
