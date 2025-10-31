# Configuração do Banco de Dados Supabase

## Instruções para criar a tabela no seu Supabase

1. Acesse o painel do Supabase: https://zlgdqzdpqgchafuqmkcy.supabase.co
2. Vá em **SQL Editor**
3. Crie uma nova query e cole o código abaixo:

```sql
-- Criar tabela de alunos
CREATE TABLE IF NOT EXISTS public.alunos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  rgm TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adicionar índice para melhorar performance nas consultas por RGM
CREATE INDEX IF NOT EXISTS idx_alunos_rgm ON public.alunos(rgm);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.alunos ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir inserção pública (cadastro)
CREATE POLICY "Permitir cadastro público" ON public.alunos
  FOR INSERT
  WITH CHECK (true);

-- Criar política para permitir leitura pública (validação na catraca)
CREATE POLICY "Permitir leitura pública" ON public.alunos
  FOR SELECT
  USING (true);

-- Criar política para permitir atualização (caso necessário no futuro)
CREATE POLICY "Permitir atualização pública" ON public.alunos
  FOR UPDATE
  USING (true);
```

4. Execute a query clicando em **Run**

## O que foi criado:

- **Tabela alunos**: Armazena os dados dos estudantes
  - `id`: Identificador único (UUID)
  - `nome`: Nome completo do aluno
  - `rgm`: Registro Geral de Matrícula (único)
  - `email`: E-mail do aluno
  - `criado_em`: Data e hora do cadastro

- **Índice**: Otimiza buscas por RGM
- **RLS (Row Level Security)**: Políticas de acesso configuradas
- **Políticas**: Permitem inserção, leitura e atualização pública

## Testando a tabela

Você pode testar inserindo um aluno de exemplo:

```sql
INSERT INTO public.alunos (nome, rgm, email)
VALUES ('João Silva', '123456', 'joao.silva@exemplo.com');
```

Para verificar se foi inserido:

```sql
SELECT * FROM public.alunos;
```

## Segurança

⚠️ **Importante**: Este setup permite acesso público para facilitar o desenvolvimento. Em produção, considere:
- Adicionar autenticação para o app da catraca
- Restringir quem pode cadastrar alunos
- Adicionar validações adicionais
