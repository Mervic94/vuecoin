
-- Créer un bucket de stockage pour les documents KYC
INSERT INTO storage.buckets (id, name, public) VALUES ('kyc', 'kyc', false);

-- Politique de sécurité pour le bucket KYC - seuls les utilisateurs peuvent uploader leurs propres documents
CREATE POLICY "Users can upload their own KYC documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'kyc' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Politique pour lire ses propres documents KYC
CREATE POLICY "Users can view their own KYC documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'kyc' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Politique pour que les admins puissent voir tous les documents KYC
CREATE POLICY "Admins can view all KYC documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'kyc' AND 
  public.has_role(auth.uid(), 'admin')
);

-- Ajouter une table pour les tentatives de connexion (sécurité)
CREATE TABLE IF NOT EXISTS public.login_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ip_address INET,
  success BOOLEAN NOT NULL,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_agent TEXT
);

-- Activer RLS sur login_attempts
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Politique pour que les utilisateurs ne voient que leurs propres tentatives
CREATE POLICY "Users can view own login attempts"
  ON public.login_attempts
  FOR SELECT
  USING (user_id = auth.uid());

-- Les admins peuvent voir toutes les tentatives
CREATE POLICY "Admins can view all login attempts"
  ON public.login_attempts
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Permettre l'insertion des tentatives de connexion
CREATE POLICY "Allow login attempt logging"
  ON public.login_attempts
  FOR INSERT
  WITH CHECK (true);

-- Ajouter une table pour l'authentification 2FA
CREATE TABLE IF NOT EXISTS public.user_2fa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  secret TEXT NOT NULL,
  is_enabled BOOLEAN DEFAULT false,
  backup_codes TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  enabled_at TIMESTAMP WITH TIME ZONE
);

-- Activer RLS sur user_2fa
ALTER TABLE public.user_2fa ENABLE ROW LEVEL SECURITY;

-- Politique pour que les utilisateurs gèrent leur propre 2FA
CREATE POLICY "Users can manage own 2FA"
  ON public.user_2fa
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Améliorer la table profiles avec des champs de sécurité supplémentaires
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS address_line1 TEXT,
ADD COLUMN IF NOT EXISTS address_line2 TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS postal_code TEXT,
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS kyc_level INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS account_locked_until TIMESTAMP WITH TIME ZONE;
