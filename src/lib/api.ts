import { createClient } from '@/utils/supabase/server';

/**
 * 1. Fetch a single project with its related units
 * Used by: src/app/[lang]/projects/[slug]/page.tsx
 */
export async function getProjectWithUnits(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      units:project_units (*) 
    `) // Added 'units:' before project_units
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('Supabase Error:', error.message);
    return null;
  }
  return data;
}

/**
 * 2. Fetch similar projects in the same country
 * Used by: src/app/[lang]/projects/[slug]/page.tsx
 */
export async function getSimilarProjects(countryCode: string, currentSlug: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('country_code', countryCode) // Match the country
    .neq('slug', currentSlug)       // Exclude the current project
    .eq('is_published', true)
    .limit(3); 

  if (error) {
    console.error('Error fetching similar projects:', error);
    return [];
  }
  return data || [];
}

/**
 * 3. Fetch all projects for a specific country (Turkey/UAE)
 * Used by: Turkey and UAE listing pages
 */
export async function getProjectsByCountry(countryCode: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('country_code', countryCode)
    .eq('is_published', true);

  if (error) {
    console.error(`Error fetching ${countryCode} projects:`, error);
    return [];
  }
  return data;
}