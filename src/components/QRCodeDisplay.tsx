import { QRCodeSVG } from 'qrcode.react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface QRCodeDisplayProps {
  rgm: string;
  nome: string;
  email: string;
}

export const QRCodeDisplay = ({ rgm, nome, email }: QRCodeDisplayProps) => {
  const handleDownload = () => {
    const svg = document.getElementById('qrcode');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `carteirinha-${rgm}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    toast.success('QR Code baixado com sucesso!');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Minha Carteirinha Digital',
          text: `RGM: ${rgm}`,
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      toast.info('Compartilhamento não disponível neste navegador');
    }
  };

  return (
    <Card className="p-6 bg-card shadow-[var(--shadow-lg)] border-2">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Carteirinha Digital</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-2xl">
          <div className="bg-card p-6 rounded-xl space-y-4">
            <div className="text-center space-y-1">
              <p className="text-sm text-muted-foreground font-medium">Nome</p>
              <p className="text-lg font-bold text-foreground">{nome}</p>
            </div>
            
            <div className="text-center space-y-1">
              <p className="text-sm text-muted-foreground font-medium">RGM</p>
              <p className="text-2xl font-bold text-primary">{rgm}</p>
            </div>

            <div className="flex justify-center p-4 bg-background rounded-xl">
              <QRCodeSVG
                id="qrcode"
                value={rgm}
                size={200}
                level="H"
                includeMargin
                fgColor="hsl(var(--primary))"
              />
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleDownload}
            variant="outline"
            className="w-full"
          >
            <Download className="mr-2 h-4 w-4" />
            Baixar
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="w-full"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Compartilhar
          </Button>
        </div>
      </div>
    </Card>
  );
};
