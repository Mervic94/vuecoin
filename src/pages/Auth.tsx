import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

type Mode = 'login' | 'signup' | 'forgot';

const Auth = () => {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await signIn(email, password);
        toast({ title: 'Connexion réussie', description: 'Bienvenue sur VueCoin Exchange !' });
        navigate('/exchange');
      } else if (mode === 'signup') {
        await signUp(email, password);
        toast({
          title: 'Inscription réussie',
          description: 'Vérifiez votre email pour confirmer votre compte, puis revenez vous connecter.',
        });
        setMode('login');
      } else {
        await resetPassword(email);
        toast({
          title: 'Email envoyé',
          description: 'Si un compte existe pour cet email, vous recevrez un lien de réinitialisation.',
        });
        setMode('login');
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Erreur', description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const titles: Record<Mode, string> = {
    login: 'Connexion à VueCoin Exchange',
    signup: 'Inscription à VueCoin Exchange',
    forgot: 'Réinitialiser le mot de passe',
  };

  const ctas: Record<Mode, string> = {
    login: 'Se connecter',
    signup: "S'inscrire",
    forgot: 'Envoyer le lien',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">{titles[mode]}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            {mode !== 'forgot' && (
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '...' : ctas[mode]}
            </Button>
          </form>
          <div className="mt-4 text-center space-y-2 text-sm">
            {mode === 'login' && (
              <>
                <button type="button" className="text-primary hover:underline block w-full"
                  onClick={() => setMode('signup')}>
                  Pas encore de compte ? S'inscrire
                </button>
                <button type="button" className="text-muted-foreground hover:underline block w-full"
                  onClick={() => setMode('forgot')}>
                  Mot de passe oublié ?
                </button>
              </>
            )}
            {mode === 'signup' && (
              <button type="button" className="text-primary hover:underline"
                onClick={() => setMode('login')}>
                Déjà un compte ? Se connecter
              </button>
            )}
            {mode === 'forgot' && (
              <button type="button" className="text-primary hover:underline"
                onClick={() => setMode('login')}>
                Retour à la connexion
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
