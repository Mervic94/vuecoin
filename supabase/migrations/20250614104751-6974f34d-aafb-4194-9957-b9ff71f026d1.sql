
-- Étape 1 : Créer un enum de rôles (admin, user) si inexistant
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'user');
  END IF;
END$$;

-- Étape 2 : Table des rôles utilisateur
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Étape 3 : Activer la RLS sur user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Étape 4 : Fonction de sécurité definer pour déterminer si un user est admin
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Étape 5 : Politique d’accès au workflow admin (ex : KYC)
-- Permettre aux “admin” de voir tous les profils (nécessaire pour l’écran de gestion KYC) :
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin')
  );

-- Autoriser les utilisateurs à voir leur propre profil :
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (
    id = auth.uid()
  );

-- Autoriser les administrateurs à modifier les champs de KYC :
CREATE POLICY "Admins can update KYC"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin')
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin')
  );

-- Politique d’édition pour l’utilisateur lui-même (hors KYC) si tu le souhaites :
CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (
    id = auth.uid()
  )
  WITH CHECK (
    id = auth.uid()
  );

