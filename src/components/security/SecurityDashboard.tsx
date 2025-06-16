
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Activity, Lock, AlertTriangle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import TwoFactorAuth from './TwoFactorAuth';

interface LoginAttempt {
  id: string;
  attempted_at: string | null;
  success: boolean;
  ip_address: unknown;
  user_agent: string | null;
}

const SecurityDashboard = () => {
  const { user } = useAuth();
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);

  const { data: attempts, isLoading } = useQuery({
    queryKey: ['login-attempts', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('login_attempts')
        .select('*')
        .eq('user_id', user.id)
        .order('attempted_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  useEffect(() => {
    if (attempts) {
      setLoginAttempts(attempts);
    }
  }, [attempts]);

  if (!user) return null;

  const formatIpAddress = (ip: unknown): string => {
    if (ip === null || ip === undefined) return 'Non disponible';
    return String(ip);
  };

  return (
    <div className="space-y-6">
      {/* Vue d'ensemble de la sécurité */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Niveau de sécurité</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Élevé</div>
            <p className="text-xs text-muted-foreground">
              2FA activé, profil vérifié
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tentatives de connexion</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loginAttempts.length}</div>
            <p className="text-xs text-muted-foreground">
              Dernières 30 jours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions actives</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Session actuelle
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Authentification à deux facteurs */}
      <TwoFactorAuth />

      {/* Historique des connexions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Activité de connexion récente
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-4 text-center text-muted-foreground">Chargement...</div>
          ) : loginAttempts.length > 0 ? (
            <div className="space-y-3">
              {loginAttempts.map((attempt) => (
                <div key={attempt.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {attempt.success ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                    <div>
                      <p className="text-sm font-medium">
                        {attempt.success ? 'Connexion réussie' : 'Tentative échouée'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {attempt.attempted_at ? new Date(attempt.attempted_at).toLocaleString('fr-FR') : 'Date inconnue'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      IP: {formatIpAddress(attempt.ip_address)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-4 text-center text-muted-foreground">
              Aucune activité de connexion récente
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommandations de sécurité */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Recommandations de sécurité
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <p className="text-sm font-medium">Activer l'authentification à deux facteurs</p>
              <p className="text-xs text-muted-foreground">Renforcez la sécurité de votre compte</p>
            </div>
            <Button size="sm">Activer</Button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <p className="text-sm font-medium">Vérification KYC complète</p>
              <p className="text-xs text-muted-foreground">Augmentez vos limites de transaction</p>
            </div>
            <Button size="sm" variant="outline">Compléter</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityDashboard;
