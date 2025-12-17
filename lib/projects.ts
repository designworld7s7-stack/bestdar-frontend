import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getProjects(language?: string) {
  let query = supabase
    .from('projects')
    .select('*');

  if (language) {
    query = query.eq('language', language);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Supabase error:', error);
    return [];
  }

  return data ?? [];
}
