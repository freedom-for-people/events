import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('📝 Please create a .env file with:');
  console.error('   VITE_SUPABASE_URL=your-project-url');
  console.error('   VITE_SUPABASE_ANON_KEY=your-anon-key');
  console.error('📖 See SETUP.md for detailed instructions');
  
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file and see SETUP.md for instructions.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
