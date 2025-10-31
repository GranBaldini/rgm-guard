import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zlgdqzdpqgchafuqmkcy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsZ2RxemRwcWdjaGFmdXFta2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NjIzODgsImV4cCI6MjA3NjEzODM4OH0.osSND5mPypnYEBXq3fMa7a_fDIOLvbMoBx9Uc_aaGQ8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Aluno {
  id: string;
  nome: string;
  rgm: string;
  email: string;
  criado_em: string;
}
