import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, AlertTriangle } from 'lucide-react';
import { QRCodeDisplay } from '@/components/QRCodeDisplay';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AlunoQRCode = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const rgm = searchParams.get('rgm') || '';
  const nome = searchParams.get('nome') || '';
  const email = searchParams.get('email') || '';

  if (!rgm || !nome || !email) {
    navigate('/aluno/cadastro');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => navigate('/aluno/cadastro')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="ml-auto"
          >
            <Home className="mr-2 h-4 w-4" />
            Início
          </Button>
        </div>

        <Alert className="border-amber-500 bg-amber-50 dark:bg-amber-950/20 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
          <AlertTitle className="text-amber-900 dark:text-amber-100 font-bold">
            ⚠️ Importante: Salve seu QR Code agora!
          </AlertTitle>
          <AlertDescription className="text-amber-800 dark:text-amber-200 space-y-2">
            <p>
              Este QR Code é único e não poderá ser recuperado depois. 
              <strong> Baixe ou tire um print agora mesmo!</strong>
            </p>
            <p className="text-sm">
              💡 Sem o QR Code, você precisará informar seu RGM manualmente ao porteiro.
            </p>
          </AlertDescription>
        </Alert>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <QRCodeDisplay rgm={rgm} nome={nome} email={email} />
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            📱 Salve ou compartilhe sua carteirinha digital
          </p>
          <p className="text-xs text-muted-foreground">
            Use o QR Code para acessar as catracas
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlunoQRCode;
