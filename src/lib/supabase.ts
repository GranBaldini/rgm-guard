import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yckuftzqigdocstqlixf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlja3VmdHpxaWdkb2NzdHFsaXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4OTQ5NTgsImV4cCI6MjA3NzQ3MDk1OH0.AiNMfdPPVXlKec0qcZEJ_grR8StX4ueDsPsg7pl9L1Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Aluno {
  id: string;
  nome: string;
  rgm: string;
  email: string;
  criado_em: string;
}
