# GoldVault SG — Paytm Gold Clone for Singapore

## Context
Building a B2C fractional gold trading app for Singapore from a completely empty directory.
Users buy/sell 24K gold in SGD. Stack: Next.js 15 App Router, TypeScript, Tailwind CSS,
Supabase Auth + Postgres. Mock price S$186.16/g; GoldAPI.io integration deferred to later phase.

Phase 1 scope: scaffold project + all 5 screens (Buy, Social Proof, Purchase Success,
Portfolio Dashboard, Auth).

---

## Directory Structure

```
gold1/
├── plan.md                               ← you are here
├── .env.local                            ← add your Supabase keys here
├── next.config.ts
├── tailwind.config.ts
├── supabase/
│   └── schema.sql                        ← run in Supabase SQL Editor
└── src/
    ├── middleware.ts                     # Route protection via Supabase SSR
    ├── app/
    │   ├── layout.tsx
    │   ├── globals.css
    │   ├── page.tsx                      # Buy Screen (/)
    │   ├── auth/page.tsx                 # Login / Signup
    │   ├── portfolio/page.tsx            # Portfolio Dashboard
    │   └── purchase-success/page.tsx    # Post-buy confirmation
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx                # Logo + LivePriceBadge
    │   │   └── MobileContainer.tsx       # max-w-[430px] centering wrapper
    │   ├── ui/
    │   │   ├── LivePriceBadge.tsx        # Pulsing green dot + price
    │   │   └── GoldButton.tsx            # Reusable CTA button
    │   ├── buy/
    │   │   ├── BuyToggle.tsx             # "Save Daily" | "Buy Lumpsum" tabs
    │   │   ├── ConverterCard.tsx         # SGD ↔ grams + slider
    │   │   ├── QuickSelectButtons.tsx    # S$100 / 500 / 1000 / 5000
    │   │   ├── PromoCodeInput.tsx        # Promo code + Apply
    │   │   └── StickyBuyCTA.tsx          # Fixed bottom CTA bar
    │   ├── social/
    │   │   ├── UserCounter.tsx           # Animated number ticker (framer-motion)
    │   │   ├── GoldPriceChart.tsx        # Recharts AreaChart (dynamic, no SSR)
    │   │   ├── EducationCards.tsx        # 3 info cards
    │   │   ├── FAQAccordion.tsx          # Expandable FAQ
    │   │   └── TermsLink.tsx             # T&C link
    │   ├── portfolio/
    │   │   ├── TrustBanner.tsx           # Vault partner branding
    │   │   ├── GoldHolding.tsx           # Big gram number + SGD value
    │   │   ├── ReturnsSummary.tsx        # Invested vs Returns
    │   │   ├── ActionGrid.tsx            # 4-button action grid
    │   │   └── OrderHistory.tsx          # Transaction list
    │   ├── success/
    │   │   ├── ConfettiCanvas.tsx        # canvas-confetti on mount
    │   │   └── InvestmentDetailsCard.tsx # Purchase summary
    │   └── auth/
    │       └── AuthForm.tsx              # Login / Signup form
    ├── hooks/
    │   ├── useConverter.ts               # Two-way SGD ↔ grams logic
    │   ├── useGoldPrice.ts               # Mock live price (30s jitter)
    │   └── useAuth.ts                    # Auth state wrapper
    ├── lib/
    │   ├── supabase/
    │   │   ├── client.ts                 # Browser client (@supabase/ssr)
    │   │   └── server.ts                 # Server client with cookies()
    │   ├── goldPrice.ts                  # sgdToGrams, gramsToSgd, calculateReturns
    │   └── formatters.ts                 # formatSGD, formatGrams, formatPercent
    ├── constants/index.ts                # GOLD_PRICE_SGD=186.16, FAQ_DATA, etc.
    └── types/index.ts                    # Shared TypeScript interfaces
```

---

## Step 0 — Bootstrap

```bash
cd /Users/kashishmanoch/Documents/gold1
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
npm install @supabase/supabase-js @supabase/ssr recharts canvas-confetti @types/canvas-confetti clsx tailwind-merge lucide-react framer-motion
```

---

## Step 1 — Tailwind Gold Palette

Edit `tailwind.config.ts` — extend theme with:

| Token       | Hex       | Usage                   |
|-------------|-----------|-------------------------|
| gold-50     | #FFFBEB   | Page background         |
| gold-100    | #FEF3C7   | Card borders            |
| gold-200    | #FDE68A   | Slider fill             |
| gold-300    | #FCD34D   |                         |
| gold-400    | #FBBF24   |                         |
| gold-500    | #F59E0B   | Primary brand           |
| gold-600    | #D97706   | CTAs, active tabs       |
| gold-700    | #B45309   |                         |
| gold-800    | #92400E   | Body text               |
| gold-900    | #78350F   | Headings                |

Also add `maxWidth: { mobile: "430px" }` and custom range-input styles in `globals.css`.

---

## Step 2 — Supabase Setup

### `.env.local`
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### `supabase/schema.sql`
Tables:
- **profiles** — linked to auth.users, auto-created via trigger
- **holdings** — `grams`, `total_invested` per user
- **orders** — `sgd_amount`, `gold_price_sgd`, `grams_purchased`, `status`

All tables have RLS: users can only access their own rows.

Trigger: `on_auth_user_created` → auto-inserts `profiles` + `holdings` rows on signup.

RPC: `increment_holding(p_user_id, p_grams, p_sgd)` — atomic UPDATE to holdings.

---

## Step 3 — Middleware

**`src/middleware.ts`** — Protects `/portfolio` and `/purchase-success`.

Uses `@supabase/ssr` `createServerClient`. MUST return the mutated `supabaseResponse`
(not a fresh `NextResponse`) so token refresh cookies propagate correctly.

- Unauthenticated on protected route → redirect to `/auth`
- Authenticated visiting `/auth` → redirect to `/`

---

## Step 4 — Foundation Files

| File | Key exports |
|------|-------------|
| `src/types/index.ts` | `GoldPrice`, `Order`, `Holding`, `BuyMode`, `ConversionState` |
| `src/constants/index.ts` | `GOLD_PRICE_SGD=186.16`, `QUICK_SELECT_AMOUNTS`, `FAQ_DATA`, `EDUCATION_CARDS` |
| `src/lib/goldPrice.ts` | `sgdToGrams()`, `gramsToSgd()`, `calculateReturns()` |
| `src/lib/formatters.ts` | `formatSGD()`, `formatGrams()`, `formatPercent()` |
| `src/lib/supabase/client.ts` | `createClient()` — browser |
| `src/lib/supabase/server.ts` | `createClient()` — server with `cookies()` |

---

## Step 5 — Hooks

### `useConverter.ts` ← most critical
- Two separate handlers (`handleSgdChange` / `handleGramsChange`) to avoid infinite loops
- `handleSliderChange(value)` drives SGD → recalculates grams
- `handleQuickSelect(amount)` snaps both fields

### `useGoldPrice.ts`
- Starts at `GOLD_PRICE_SGD`, applies ±$0.02 jitter every 30s via `setInterval`

### `useAuth.ts`
- Wraps `supabase.auth.getUser()` + `onAuthStateChange`, exposes `user`, `loading`, `signOut`

---

## Step 6 — Buy Screen (`/`)

Client Component. Wires together all buy + social proof components.

**On "Buy Gold" click:**
1. `supabase.from("orders").insert(...)`
2. `supabase.rpc("increment_holding", ...)`
3. `router.push("/purchase-success?amount=X&grams=Y&price=Z")`

**Page layout:**
```
<MobileContainer>
  <Header />               ← logo + LivePriceBadge
  <BuyToggle />            ← Save Daily | Buy Lumpsum
  <ConverterCard />        ← SGD/grams inputs + slider
  <QuickSelectButtons />   ← S$100 / 500 / 1000 / 5000
  <PromoCodeInput />       ← promo code + Apply
  ── divider: "Trusted by 247,000+ users" ──
  <UserCounter />          ← animated counter
  <GoldPriceChart />       ← area chart (dynamic, no SSR)
  <EducationCards />       ← 3 cards
  <FAQAccordion />         ← expandable FAQ
  <TermsLink />
  <div className="pb-24" />  ← spacer for sticky CTA
  <StickyBuyCTA />         ← fixed bottom bar
</MobileContainer>
```

**Slider track coloring**: `--range-fill` CSS custom property set via inline style;
`globals.css` uses it in `background: linear-gradient(...)` on `input[type=range]`.

**GoldPriceChart**: `dynamic(() => import(...), { ssr: false })` because Recharts uses `window`.
Loading placeholder: pulsing gold skeleton div.

Mock 12-month data: Apr '25 (168.40) → Mar '26 (186.16).

---

## Step 7 — Auth Screen (`/auth`)

`AuthForm.tsx`: `mode: 'login' | 'signup'` toggle, calls:
- Login: `supabase.auth.signInWithPassword({ email, password })`
- Signup: `supabase.auth.signUp({ email, password })`

On success, middleware redirects to `/`.

---

## Step 8 — Purchase Success (`/purchase-success`)

Wrapped in `<Suspense>` (required by Next.js 15 for `useSearchParams()`).

- `ConfettiCanvas.tsx` — fires `canvas-confetti` once on mount, gold colour palette
- `InvestmentDetailsCard.tsx` — reads `?amount=&grams=&price=` from URL

---

## Step 9 — Portfolio Dashboard (`/portfolio`)

Server Component. Fetches `holdings` + `orders` server-side.
Falls back to mock data `{ grams: 5.3214, total_invested: 950.00 }` if null.

Components: `TrustBanner`, `GoldHolding`, `ReturnsSummary` (green/red),
`ActionGrid` (Buy More / Price Alert / Invite / Withdraw), `OrderHistory`.

---

## Verification Checklist

- [ ] `npm run dev` → loads at localhost:3000 with gold background
- [ ] `/` → Header shows pulsing "Live" badge + S$186.16/g
- [ ] Type SGD → grams auto-updates; type grams → SGD auto-updates
- [ ] Slider moves → both inputs update
- [ ] S$1,000 quick-select → inputs snap to correct values
- [ ] Unauthenticated → `/portfolio` redirects to `/auth`
- [ ] Signup → lands on `/`, portfolio accessible
- [ ] Buy → purchase-success with confetti + correct details
- [ ] Portfolio shows holdings with mock data
- [ ] `npm run build` → no TypeScript or ESLint errors

---

## To-Do for Later Phases

- [ ] Integrate GoldAPI.io for live price feed
- [ ] Add PayNow / Stripe payment gateway
- [ ] Physical gold withdrawal flow
- [ ] Price alert notifications (Supabase Edge Functions)
- [ ] Referral system ("Invite Friends")
- [ ] MAS compliance / KYC flow
