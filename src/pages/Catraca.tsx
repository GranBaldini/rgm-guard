import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { QRScanner } from '@/components/QRScanner';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const Catraca = () => {
  const navigate = useNavigate();
  const [resultado, setResultado] = useState<{
    status: 'success' | 'error';
    nome?: string;
    rgm?: string;
  } | null>(null);

  const handleScan = async (rgm: string) => {
    try {
      const { data: aluno, error } = await supabase
        .from('alunos')
        .select('*')
        .eq('rgm', rgm)
        .maybeSingle();

      if (error) throw error;

      if (aluno) {
        setResultado({
          status: 'success',
          nome: aluno.nome,
          rgm: aluno.rgm,
        });
        toast.success(`Entrada liberada para ${aluno.nome}!`);
        
        // Limpa o resultado após 5 segundos
        setTimeout(() => {
          setResultado(null);
        }, 5000);
      } else {
        setResultado({
          status: 'error',
          rgm,
        });
        toast.error('RGM inválido ou não cadastrado!');
        
        setTimeout(() => {
          setResultado(null);
        }, 5000);
      }
    } catch (error) {
      console.error('Erro ao validar RGM:', error);
      toast.error('Erro ao validar entrada. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Catraca Digital
          </h1>
          <p className="text-muted-foreground">
            Escaneie o QR Code do aluno
          </p>
        </div>

        {!resultado && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <QRScanner onScan={handleScan} />
          </div>
        )}

        {resultado && (
          <Card className={`p-8 text-center space-y-4 animate-in fade-in zoom-in duration-500 border-4 ${
            resultado.status === 'success' ? 'border-secondary bg-secondary/5' : 'border-destructive bg-destructive/5'
          }`}>
            <div className="flex justify-center">
              {resultado.status === 'success' ? (
                <CheckCircle className="h-24 w-24 text-secondary" />
              ) : (
                <XCircle className="h-24 w-24 text-destructive" />
              )}
            </div>

            <div className="space-y-2">
              <h2 className={`text-2xl font-bold ${
                resultado.status === 'success' ? 'text-secondary' : 'text-destructive'
              }`}>
                {resultado.status === 'success' ? 'Entrada Liberada!' : 'Acesso Negado!'}
              </h2>

              {resultado.status === 'success' ? (
                <>
                  <p className="text-lg font-semibold text-foreground">
                    {resultado.nome}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    RGM: {resultado.rgm}
                  </p>
                </>
              ) : (
                <p className="text-muted-foreground">
                  RGM inválido ou não cadastrado
                </p>
              )}
            </div>

            <Button
              onClick={() => setResultado(null)}
              variant="outline"
              className="mt-4"
            >
              Escanear Novamente
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Catraca;
