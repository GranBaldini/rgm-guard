import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, ScanLine } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary mb-4">
            <GraduationCap className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            UniScan
          </h1>
          <p className="text-lg text-muted-foreground">
            Escolha como deseja continuar
          </p>
        </div>

        <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          <Link to="/aluno/cadastro">
            <Card className="p-6 hover:shadow-[var(--shadow-lg)] transition-all duration-300 border-2 hover:border-primary cursor-pointer group">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    Sou Aluno
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Cadastre-se e gere sua carteirinha digital
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/catraca">
            <Card className="p-6 hover:shadow-[var(--shadow-lg)] transition-all duration-300 border-2 hover:border-secondary cursor-pointer group">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ScanLine className="h-7 w-7 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    Catraca
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Escaneie QR Codes para validar entrada
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/professor">
            <Card className="p-6 hover:shadow-[var(--shadow-lg)] transition-all duration-300 border-2 hover:border-accent cursor-pointer group">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-7 w-7 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    Professor
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Registre presença dos alunos nas aulas
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        <div className="text-center text-sm text-muted-foreground animate-in fade-in duration-1000 delay-300">
          <p>UniScan - Sistema de controle de acesso v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
