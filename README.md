# Chronic Tracker — Landing Page

Waitlist landing page for the Chronic Illness AI Tracker app.

**Stack:** Next.js 15 · Tailwind CSS · Supabase · Resend

## Setup

1. Clone the repo
2. Copy `.env.local.example` → `.env.local` and fill in credentials
3. Run the migration in `supabase/migrations/` against your Supabase project
4. `npm install && npm run dev`

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `RESEND_API_KEY` | Resend API key for transactional email |

## Email

- **Confirmation** — sent immediately on signup
- **Follow-up** — scheduled 24h after signup via Resend scheduled sends (2 open questions)

## Database

Single `waitlist` table — see `supabase/migrations/`.

## Deploy

Linked to Vercel. Push to `main` → auto-deploy.
