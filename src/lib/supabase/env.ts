export function supabaseEnvStatus() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const anon =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    "";

  return {
    url: Boolean(url),
    anonKey: Boolean(anon),
    connected: Boolean(url && anon),
  };
}
