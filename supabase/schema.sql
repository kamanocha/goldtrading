-- ═══════════════════════════════════════════════════════════
-- GoldVault SG — Supabase Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ═══════════════════════════════════════════════════════════

-- ─── PROFILES ────────────────────────────────────────────────────────────────
-- Auto-created on auth.users insert via trigger
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  phone       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ─── GOLD HOLDINGS ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.holdings (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  grams          NUMERIC(14, 6) NOT NULL DEFAULT 0,
  total_invested NUMERIC(14, 2) NOT NULL DEFAULT 0,  -- cumulative SGD invested
  updated_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id)
);

ALTER TABLE public.holdings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own holdings"
  ON public.holdings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own holdings"
  ON public.holdings FOR ALL
  USING (auth.uid() = user_id);

-- ─── ORDERS ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
  id               UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sgd_amount       NUMERIC(12, 2) NOT NULL,
  gold_price_sgd   NUMERIC(10, 4) NOT NULL,
  grams_purchased  NUMERIC(14, 6) NOT NULL,
  promo_code       TEXT,
  status           TEXT    DEFAULT 'completed'
                   CHECK (status IN ('pending', 'completed', 'failed')),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ─── TRIGGER: auto-create profile + holdings on signup ───────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name')
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.holdings (user_id, grams, total_invested)
  VALUES (NEW.id, 0, 0)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ─── RPC: increment_holding ───────────────────────────────────────────────────
-- Called after each successful purchase to update the user's holdings aggregate.
CREATE OR REPLACE FUNCTION public.increment_holding(
  p_user_id UUID,
  p_grams   NUMERIC,
  p_sgd     NUMERIC
)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.holdings
  SET
    grams          = grams + p_grams,
    total_invested = total_invested + p_sgd,
    updated_at     = NOW()
  WHERE user_id = p_user_id;
$$;
