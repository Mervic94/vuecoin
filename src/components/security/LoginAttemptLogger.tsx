
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const LoginAttemptLogger = () => {
  const { user } = useAuth();

  useEffect(() => {
    const logLoginAttempt = async (success: boolean) => {
      try {
        // Obtenir l'IP et user agent (limité côté client)
        const userAgent = navigator.userAgent;
        
        await supabase
          .from('login_attempts')
          .insert({
            user_id: user?.id || null,
            success,
            user_agent: userAgent,
            ip_address: null // L'IP sera ajoutée côté serveur si nécessaire
          });
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la tentative de connexion:', error);
      }
    };

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          logLoginAttempt(true);
        } else if (event === 'SIGNED_OUT') {
          // Optionnel: logger la déconnexion
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return null; // Ce composant ne rend rien
};

export default LoginAttemptLogger;
