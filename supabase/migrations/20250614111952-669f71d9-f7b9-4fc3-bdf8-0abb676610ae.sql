
-- 1. Sécurisation de la table wallets
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

-- Lire/écrire son propre wallet
CREATE POLICY "User can read own wallet"
  ON public.wallets
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "User can update own wallet"
  ON public.wallets
  FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- (Optionnel) Admins peuvent lire tous les wallets pour audit
CREATE POLICY "Admin can read all wallets"
  ON public.wallets
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 2. Sécurisation de la table transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Lire/créer ses propres transactions
CREATE POLICY "User can read own transactions"
  ON public.transactions
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "User can insert own transactions"
  ON public.transactions
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Modifier/supprimer sa propre transaction (rare mais possible)
CREATE POLICY "User can update own transaction"
  ON public.transactions
  FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "User can delete own transaction"
  ON public.transactions
  FOR DELETE
  USING (user_id = auth.uid());

-- (Optionnel) Admin peut auditer toutes les transactions
CREATE POLICY "Admin can read all transactions"
  ON public.transactions
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. Sécurisation de la table payment_methods 
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;

-- Lecture ouverte à tous (afficher catalogue déposits/retraits)
CREATE POLICY "Anyone can read payment methods"
  ON public.payment_methods
  FOR SELECT
  USING (true);

-- Administration (créer/modifier/désactiver une méthode = réservé admin)
CREATE POLICY "Admin can insert payment methods"
  ON public.payment_methods
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can update payment methods"
  ON public.payment_methods
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can delete payment methods"
  ON public.payment_methods
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

