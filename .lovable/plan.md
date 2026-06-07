
## Contexte

Le document FOURSOTCH décrit un écosystème de 5 plateformes (LAVUEPAYEE, SOCIALPAY, LAVUEANNONCE, ZEMPRO, BENIN HUB) autour d'un token commun VUC, avec stack Next.js + Turborepo + Vercel. **Next.js et Turborepo ne sont pas supportés sur Lovable** (contrainte plateforme : Vite + React uniquement). Je conserve donc Vite/React et j'aligne tout le reste : Supabase commun, RLS, anti-fraude, FedaPay/Kkiapay, économie VUC, Edge Functions pour toute opération financière.

La plateforme actuelle (exchange/wallet) devient le **hub central**. LAVUEPAYEE et SOCIALPAY sont ajoutés comme modules internes (routes `/lavuepayee`, `/socialpay`). LAVUEANNONCE/ZEMPRO/BENIN HUB restent en backlog (Phase 3 du doc).

## Phase 1 — Correction Auth + Base VUC (priorité absolue)

**Auth (résout l'échec login/inscription)**
- Activer `emailRedirectTo: window.location.origin` dans `signUp`
- Page `/reset-password` avec `supabase.auth.updateUser({ password })`
- Listener `onAuthStateChange` enregistré tôt
- Note pour toi : dans Supabase Dashboard → Auth → URL Configuration, ajouter les URLs preview/prod en redirect URLs, et désactiver "Confirm email" pendant les tests

**Schéma Supabase — Module wallet VUC commun**
- `wallets` (user_id, balance_vuc, locked_vuc, frozen_at, fraud_score)
- `vuc_transactions` (wallet_id, type credit/debit, amount, source platform_id, reference, status)
- `platforms` (id, code, name) seed : lavuepayee, socialpay, exchange, annonce, zempro, hub
- Trigger auto-création wallet à l'inscription
- RLS : user lit/écrit son wallet, écriture financière uniquement via Edge Function

**Edge Functions financières**
- `wallet-credit` (validation serveur, idempotence)
- `wallet-debit`
- `wallet-transfer`

## Phase 2 — Module LAVUEPAYEE (pub → VUC)

**Tables**
- `campaigns` (advertiser_id, title, budget_vuc, status, platform_id, vuc_per_view)
- `ads` (campaign_id, media_url, duration_seconds, target_audience)
- `ad_views` (ad_id, viewer_id, watched_seconds, rewarded_vuc, device, ip_hash)
- `view_validations` (view_id, validation_method, score, flagged)

**UI**
- Route `/lavuepayee` : feed de vidéos pub à regarder
- Composant lecteur avec timer 80% durée minimum
- Bouton "Réclamer VUC" → appelle Edge Function `validate-view`

**Anti-fraude couches 1+2**
- Durée minimale 80% côté serveur
- 1 vue par utilisateur/pub
- hCaptcha au-delà de 20 vues/jour
- Rate-limit IP

## Phase 3 — Module SOCIALPAY (statuts → VUC)

**Tables**
- `social_tasks` (platform whatsapp/fb/insta/tiktok, action_type, vuc_reward, daily_limit, duration_hours)
- `task_submissions` (task_id, user_id, proof_url, status pending/approved/rejected, validator_id)

**UI**
- Route `/socialpay` : liste des tâches disponibles
- Upload preuve (screenshot) via Supabase Storage bucket `proofs` privé
- Workflow validation admin

**Anti-fraude couche 3 : device fingerprint, blocage > 5 inscriptions/IP/24h**

## Phase 4 — Paiements FedaPay/Kkiapay + Économie VUC

**Économie (paramètres Phase 1 du doc)**
- 1 VUC = 5 XOF (récompense)
- 1000 VUC = 4500 XOF (achat annonceur, spread 10%)
- Retrait min 500 VUC, commission 5%
- Limite 2000 VUC/jour/utilisateur (anti-fraude couche 4)

**Edge Functions**
- `fedapay-checkout` (achat VUC par annonceur)
- `kkiapay-payout` (retrait VUC → mobile money utilisateur)
- `fedapay-webhook`, `kkiapay-webhook` (vérif signature)

**UI**
- Page `/wallet/buy` pour annonceurs
- Page `/wallet/withdraw` pour utilisateurs avec validation limites

**Secrets à ajouter** : `FEDAPAY_SECRET_KEY`, `KKIAPAY_PRIVATE_KEY`, `KKIAPAY_SECRET`

## Hors périmètre (backlog)

- LAVUEANNONCE, ZEMPRO, BENIN HUB → projets Lovable séparés recommandés (le doc lui-même préconise monorepo Turborepo, infaisable ici)
- Migration vers blockchain (Phase 3 du doc, > 100k utilisateurs)
- PostHog, Sentry, Cloudflare Workers → à brancher après stabilisation

## Détails techniques

- Toute opération crédit/débit VUC = Edge Function avec validation serveur (règle absolue du doc)
- RLS sur toutes les tables, jamais de service_role côté client
- Colonne `platform_id` sur transactions pour traçabilité multi-plateformes
- Triggers `updated_at`, helper `has_role` pour admin
- Bucket Storage `proofs` privé (RLS : user lit ses propres preuves, admin lit tout)

## Démarrage

Je commence par la **Phase 1** dès validation : c'est ce qui débloque l'auth et pose les fondations. Les phases 2-4 suivront sur tes prochains "étape suivante".
