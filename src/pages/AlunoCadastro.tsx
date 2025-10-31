import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const AlunoCadastro = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    rgm: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Verifica se RGM já existe
      const { data: existingAluno } = await supabase
        .from('alunos')
        .select('rgm')
        .eq('rgm', formData.rgm)
        .maybeSingle();

      if (existingAluno) {
        toast.error('Este RGM já está cadastrado!');
        setLoading(false);
        return;
      }

      // Cadastra novo aluno
      const { error } = await supabase
        .from('alunos')
        .insert([
          {
            nome: formData.nome,
            rgm: formData.rgm,
            email: formData.email,
          },
        ]);

      if (error) throw error;

      toast.success('Cadastro realizado com sucesso!');
      
      // Redireciona para página do QR Code
      navigate(`/aluno/qrcode?rgm=${formData.rgm}&nome=${encodeURIComponent(formData.nome)}&email=${encodeURIComponent(formData.email)}`);
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      toast.error('Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card className="p-8 shadow-[var(--shadow-lg)] border-2">
          <div className="text-center space-y-4 mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary">
              <UserPlus className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Cadastro de Aluno
            </h1>
            <p className="text-muted-foreground">
              Preencha seus dados para gerar sua carteirinha digital
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Digite seu nome completo"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rgm">RGM</Label>
              <Input
                id="rgm"
                type="text"
                placeholder="Digite seu RGM"
                value={formData.rgm}
                onChange={(e) => setFormData({ ...formData, rgm: e.target.value })}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-12"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg font-semibold"
            >
              {loading ? 'Cadastrando...' : 'Gerar Carteirinha'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AlunoCadastro;
