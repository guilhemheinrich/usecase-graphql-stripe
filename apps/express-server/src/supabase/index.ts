import { createClient } from '@supabase/supabase-js';
import { Config } from 'configuration';
import { Database } from '@org/supabase-types';

export const supabase = createClient<Database>(
  Config.SUPABASE_URL,
  Config.SUPABASE_SERVICE_KEY
);

export default supabase;
