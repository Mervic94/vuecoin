
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Shield, Clock, MapPin, Smartphone } from 'lucide-react';
import TwoFactorAuth from './TwoFactorAuth';

interface LoginAttempt {
  id: string;
  attempted_at: string;
  success: boolean;
  ip_address: string;
  user_agent: string;
}

const SecurityDashboard = () => {
  const { user } = useAuth();
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLoginAttempts();
  }, [user]);

  const fetchLoginAttempts = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('login_attempts')
      .select('*')
      .eq('user_id', user.id)
      .order('attempted_at', { ascending: false })
      .limit(10);

    if (!error && data) {
      setLoginAttempts(data);
    }
    setLoading(false);
  };

  const getDeviceType = (userAgent: string) => {
    if (userAgent.includes('Mobile')) return 'Mobile';
    if (userAgent.includes('Tablet')) return 'Tablette';
    return 'Ordinateur';
  };

  const getBrowser = (userAgent: string) => {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Inconnu';
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Aperçu de sécurité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Authentification 2FA</span>
                <Badge variant="outline">À configurer</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Vérification KYC</span>
                <Badge variant="secondary">En cours</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Mot de passe</span>
                <Badge variant="default">Sécurisé</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Chargement...</div>
            ) : loginAttempts.length > 0 ? (
              <div className="space-y-2">
                {loginAttempts.slice(0, 3).map((attempt) => (
                  <div key={attempt.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${attempt.success ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span>{attempt.success ? 'Connexion' : 'Échec'}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {new Date(attempt.attempted_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                Aucune activité récente
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <TwoFactorAuth />

      <Card>
        <CardHeader>
          <CardTitle>Historique des connexions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Chargement...</div>
          ) : loginAttempts.length > 0 ? (
            <div className="space-y-4">
              {loginAttempts.map((attempt) => (
                <div key={attempt.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={attempt.success ? "default" : "destructive"}>
                        {attempt.success ? 'Succès' : 'Échec'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(attempt.attempted_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>IP: {attempt.ip_address || 'Non disponible'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <span>{getDeviceType(attempt.user_agent || '')}</span>
                    </div>
                    <div className="text-muted-foreground">
                      {getBrowser(attempt.user_agent || '')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Aucun historique de connexion disponible
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityDashboard;
