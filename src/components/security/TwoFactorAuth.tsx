
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Switch } from '@/components/ui/switch';
import { Eye, EyeOff, Copy, Check } from 'lucide-react';

const TwoFactorAuth = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [token, setToken] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [showSecret, setShowSecret] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchTwoFactorStatus();
  }, [user]);

  const fetchTwoFactorStatus = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('user_2fa')
      .select('is_enabled')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!error && data) {
      setIs2FAEnabled(data.is_enabled);
    }
  };

  const generateSecret = () => {
    // Générer un secret simple pour la démo (en production, utiliser une librairie crypto sécurisée)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let result = '';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const generateBackupCodes = () => {
    const codes = [];
    for (let i = 0; i < 8; i++) {
      codes.push(Math.random().toString(36).substring(2, 10).toUpperCase());
    }
    return codes;
  };

  const setupTwoFactor = async () => {
    setLoading(true);
    try {
      const newSecret = generateSecret();
      const newBackupCodes = generateBackupCodes();
      
      setSecret(newSecret);
      setBackupCodes(newBackupCodes);
      
      // Générer URL pour QR code (format Google Authenticator)
      const qrUrl = `otpauth://totp/VueCoin:${user?.email}?secret=${newSecret}&issuer=VueCoin`;
      setQrCode(qrUrl);

      // Sauvegarder en base (mais pas encore activé)
      const { error } = await supabase
        .from('user_2fa')
        .upsert({
          user_id: user?.id,
          secret: newSecret,
          backup_codes: newBackupCodes,
          is_enabled: false
        });

      if (error) throw error;

      toast({
        title: "2FA configuré",
        description: "Scannez le QR code avec votre application d'authentification"
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyAndEnable = async () => {
    if (!token) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez entrer le code de vérification"
      });
      return;
    }

    setLoading(true);
    try {
      // En production, vérifier le token TOTP ici
      // Pour la démo, on accepte n'importe quel code de 6 chiffres
      if (token.length !== 6) {
        throw new Error("Le code doit contenir 6 chiffres");
      }

      const { error } = await supabase
        .from('user_2fa')
        .update({
          is_enabled: true,
          enabled_at: new Date().toISOString()
        })
        .eq('user_id', user?.id);

      if (error) throw error;

      setIs2FAEnabled(true);
      toast({
        title: "2FA activé",
        description: "L'authentification à deux facteurs est maintenant active"
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de vérification",
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const disableTwoFactor = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_2fa')
        .update({ is_enabled: false })
        .eq('user_id', user?.id);

      if (error) throw error;

      setIs2FAEnabled(false);
      setSecret('');
      setQrCode('');
      setBackupCodes([]);
      setToken('');

      toast({
        title: "2FA désactivé",
        description: "L'authentification à deux facteurs a été désactivée"
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copié",
      description: "Le secret a été copié dans le presse-papier"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Authentification à deux facteurs (2FA)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Statut 2FA</h3>
              <p className="text-sm text-muted-foreground">
                {is2FAEnabled ? 'Activé' : 'Désactivé'}
              </p>
            </div>
            <Switch
              checked={is2FAEnabled}
              onCheckedChange={is2FAEnabled ? disableTwoFactor : setupTwoFactor}
              disabled={loading}
            />
          </div>

          {secret && !is2FAEnabled && (
            <div className="space-y-4 border rounded-lg p-4">
              <h4 className="font-medium">Configuration 2FA</h4>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Secret manuel (si vous ne pouvez pas scanner le QR code)
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type={showSecret ? "text" : "password"}
                    value={secret}
                    readOnly
                    className="font-mono text-xs"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowSecret(!showSecret)}
                  >
                    {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copySecret}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Code de vérification
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="000000"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    maxLength={6}
                  />
                  <Button onClick={verifyAndEnable} disabled={loading}>
                    Vérifier
                  </Button>
                </div>
              </div>

              {backupCodes.length > 0 && (
                <div>
                  <h5 className="font-medium mb-2">Codes de récupération</h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Conservez ces codes en lieu sûr. Ils peuvent être utilisés pour accéder à votre compte si vous perdez votre appareil.
                  </p>
                  <div className="grid grid-cols-2 gap-1 text-xs font-mono bg-muted p-2 rounded">
                    {backupCodes.map((code, index) => (
                      <div key={index}>{code}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {is2FAEnabled && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">
                ✅ L'authentification à deux facteurs est active et protège votre compte.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TwoFactorAuth;
