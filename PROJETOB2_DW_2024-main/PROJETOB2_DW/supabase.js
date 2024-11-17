import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xbcdlcexivdngwjwiwmd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiY2RsY2V4aXZkbmd3andpd21kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3MTQyODMsImV4cCI6MjA0NzI5MDI4M30.McsJ_qy5VH5tQ3QWZDMKhS-lLLtoytuTeaeDJEpfDKE';

export const supabase = createClient(supabaseUrl, supabaseKey);
