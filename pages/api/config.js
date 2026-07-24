// pages/api/config.js
// Returns public Supabase configuration from environment variables (if set)

export default function handler(req, res) {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://zwftcovxxirzzqdmkymc.supabase.co'
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_NTyCZ4iyHpO7kzvZRVGa6A_YEjsXPhU'

  // We only expose the public anon key and url here. Never return service-role keys.
  res.setHeader('Content-Type', 'application/json')
  res.status(200).json({ SUPABASE_URL, SUPABASE_ANON_KEY })
}
