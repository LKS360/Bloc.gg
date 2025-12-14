import { supabase } from "./supabaseClient";

export async function logAdminAction({
  adminId,
  action,
  details = "",
  ip = null,
}: {
  adminId: number;
  action: string;
  details?: string;
  ip?: string | null;
}) {
  try {
    await supabase.from("admin_logs").insert({
      admin_id: adminId,
      action,
      details,
      ip,
    });
  } catch (err) {
    console.error("LOG ERROR:", err);
  }
}
