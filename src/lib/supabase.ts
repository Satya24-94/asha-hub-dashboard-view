
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bkdqpmycipceiiafkzpy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrZHFwbXljaXBjZWlpYWZrenB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MTMxMDksImV4cCI6MjA2Mzk4OTEwOX0.2oQudTKpUx5YurRIMbOt0b5Bpz7lzdnSRLIsWKPnyVQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
