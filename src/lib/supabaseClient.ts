import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dffuogxdqwkcnxywokad.supabase.co";
const supabaseAnonKey = "sb_publishable_V3OMn-4i8LmvCm4mLSMTaQ_HIenKGKR";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
