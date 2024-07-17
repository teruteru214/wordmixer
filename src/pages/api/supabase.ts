import { createClient } from "@supabase/supabase-js";

// pages/api/supabase.ts

export const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
);
