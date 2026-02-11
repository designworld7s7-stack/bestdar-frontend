'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitLead(formData: FormData) {
  const supabase = await createClient();
  const data = Object.fromEntries(formData.entries());

  const { error } = await supabase.from('leads').insert([{
    full_name: data.full_name,
    phone: data.phone,
    source: data.source,
    project_id: data.project_id,
    // Add these lines specifically to your insert object
    planning_timeline: data.planning_timeline,
    payment_preference: data.payment_preference,
    document_status: data.document_status,
    // Keep this as a backup
    form_data: data 
  }]);

  if (error) return { success: false, error: error.message };
  return { success: true };
}