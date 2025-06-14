
-- Add the missing column to store KYC status logs for users.
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS kyc_status_log jsonb;
