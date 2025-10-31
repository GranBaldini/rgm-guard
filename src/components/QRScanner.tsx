import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, X } from 'lucide-react';
import { toast } from 'sonner';

interface QRScannerProps {
  onScan: (rgm: string) => void;
}

export const QRScanner = ({ onScan }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const startScanner = async () => {
    try {
      const html5QrCode = new Html5Qrcode('qr-reader');
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          onScan(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          // Ignora erros de scanning contínuo
        }
      );

      setIsScanning(true);
    } catch (err) {
      console.error('Erro ao iniciar scanner:', err);
      toast.error('Erro ao acessar câmera. Verifique as permissões.');
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.error('Erro ao parar scanner:', err);
      }
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <Card className="p-6 bg-card shadow-[var(--shadow-lg)]">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Scanner de QR Code</h2>
          <p className="text-sm text-muted-foreground">
            Posicione o QR Code dentro da moldura
          </p>
        </div>

        <div className="relative">
          <div
            id="qr-reader"
            className="w-full rounded-xl overflow-hidden border-4 border-primary"
            style={{ minHeight: isScanning ? '300px' : '0' }}
          />
          
          {!isScanning && (
            <div className="flex items-center justify-center py-20 bg-muted rounded-xl">
              <Camera className="h-20 w-20 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex gap-3">
          {!isScanning ? (
            <Button
              onClick={startScanner}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              size="lg"
            >
              <Camera className="mr-2 h-5 w-5" />
              Iniciar Scanner
            </Button>
          ) : (
            <Button
              onClick={stopScanner}
              variant="destructive"
              className="w-full"
              size="lg"
            >
              <X className="mr-2 h-5 w-5" />
              Parar Scanner
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
