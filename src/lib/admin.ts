import { cookies } from "next/headers";
import { parseSession } from "./auth";
import { supabase } from "./supabaseClient";

export async function getSessionAdmin(req: Request) {
  const cookieStore = cookies();
  const session = cookieStore.get("session");

  if (!session) throw new Error("Not authorized");

  const token = session.value;
  const user = parseSession(token);

  if (!user) throw new Error("Invalid session");

  const { data } = await supabase
    .from("users")
    .select("id")
    .eq("steam_id", user.steamId)
    .single();

  return data;
}
