import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. " +
      "Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
  );
}

/**
 * 클라이언트 사이드 / 서버 컴포넌트에서 사용하는 Supabase 클라이언트
 * anon key 사용 → RLS(Row Level Security) 정책을 따름
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
