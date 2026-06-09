# Closer — Complete Build Story
## From zero to live product: every prompt, every decision, every version

**Written for:** Sharing with another LLM to continue the conversation with full context.  
**Author:** Noah Adler (non-engineer, marketing ops professional)  
**AI partner:** Claude (Anthropic) — sole coding partner throughout  
**Live game:** https://closer-game.noah-adler97.workers.dev  
**GitHub:** https://github.com/NoahSA11/closer-game  
**Local files:** `C:\Users\noaha\OneDrive\Desktop\CLAUDE COWORK\OUTPUTS\Misc\closer-game\`

---

## Who Noah Is

Marketing operations professional, ~3 years HubSpot experience, building GTM skills. No prior coding or app development experience. Uses Claude Code as a daily co-work partner for simulations, skill-building, and real projects. Two specific gaps from real job interviews: "not creative/out-of-the-box enough" and "not technically deep enough." This project directly addresses both.

---

## The Idea

Noah wanted to build a couples/friends party game. Core mechanic: one player answers questions about themselves privately, the other guesses what they chose, both answers reveal side-by-side. Simple, single-device, no app download required.

Starting prompt (paraphrased):
> "I want to build a couples game. One person answers questions about themselves. Their partner guesses. Then both answers reveal. Like a 'how well do you know me' game. I want it to be a real product I can share."

---

## Tech Stack (final)

| Layer | Tool | Reason chosen |
|-------|------|---------------|
| Frontend | Vanilla HTML / CSS / JS | No build step, no framework overhead, deployable anywhere |
| Styling | Tailwind CSS via CDN | Paste one script tag, full utility classes, zero config |
| Fonts | Google Fonts (Cormorant Garamond + DM Sans + Great Vibes) | Free, premium feel |
| Backend/Auth | Supabase (free tier) | Google OAuth + email auth, PostgreSQL, client-side SDK, no server needed |
| Hosting | Netlify → Cloudflare Workers (temp) | GitHub auto-deploy, free tier |
| Version Control | GitHub (`NoahSA11/closer-game`) | Every feature commit tracked |
| AI Partner | Claude (Anthropic) | Architecture, code, debugging, UX design |
| PWA | Web App Manifest + Service Worker | Installs to home screen, offline play |

**Key architectural constraint:** Tailwind CDN does NOT process dynamically-added arbitrary class values. All dynamic colors (match/miss states) use inline `style` attributes, never Tailwind classes. This is why `setRevealBanner()` lives in an HTML inline `<script>` block rather than `app.js`.

---

## File Structure (current)

```
closer-game/
├── index.html          — All screens (17 total after V6), Tailwind CDN, inline CSS, inline scripts
├── app.js              — Full game state, screen transitions, scoring, session logic
├── questions.js        — QUESTION_BANK (couples) + FRIEND_QUESTION_BANK (friends)
├── auth.js             — Supabase client, signIn/signUp/signOut, saveGameSession, loadGameHistory, isWebView()
├── challenge.js        — Async challenge mode: creation flow, play flow, Supabase helpers, URL routing
├── leaderboard.js      — Game history fetch + render (sparkline, stats row, loading state)
├── styles.css          — Legacy, mostly superseded by Tailwind inline
├── manifest.json       — PWA manifest (Add to Home Screen)
├── og-image.svg        — 1200×630 social preview image
├── sw.js               — Service worker (offline cache, instant repeat loads)
├── README.md           — Public documentation
├── MOBILE.md           — App Store prerequisites guide (Capacitor, accounts, assets)
├── MARKETING-HANDOFF.md — LinkedIn strategy + co-work prompt for marketing session
└── .gitignore          — Excludes: /ios, /android, /node_modules, package.json, capacitor.config.ts
```

**Note:** `package.json` and `capacitor.config.ts` exist locally but are NOT in git. They were removed after causing a Cloudflare deployment failure (Capacitor installs a 119MB binary that exceeds Cloudflare's 25MB asset limit). Re-add to git only when doing native mobile build.

---

## Global State Object (app.js)

```javascript
const state = {
  p1Name: '',
  p2Name: '',
  gameType: 'couples',      // 'couples' | 'friends'
  mode: 'competitive',      // 'competitive' | 'cooperative'
  round: 1,
  totalRounds: 4,
  subjectPlayer: 1,         // 1 or 2 — set by coin flip
  roundQuestions: [],       // array of arrays, one per round
  questionsPerRound: 0,     // set by selectQuestions()
  subjectAnswers: [],
  guesserAnswers: [],
  currentQIndex: 0,
  scores: { p1: 0, p2: 0 },
  streak: 0,
  maxStreak: 0,
  roundResults: [],         // array of arrays — matched/subjectIdx/guesserIdx/question
  speedRound: false,
  spicyEnabled: false,
  speedTimer: null,
  speedTimeLeft: 15
}
```

---

## Screen Flow (10 screens)

```
screen-landing
  → screen-setup
    → screen-coinflip
      → screen-round-intro
        → screen-subject       (subject answers privately)
          → screen-handoff     (phone passes to guesser)
            → screen-guesser   (guesser predicts)
              → screen-reveal  (both answers shown side-by-side)
                → [loop back to screen-round-intro until totalRounds done]
                  → screen-end
                    → screen-leaderboard (if signed in)
```

All screens live in one HTML file. Navigation = `showScreen(id)` which adds/removes `.active` class. CSS: `.screen { display: none }` / `.screen.active { display: block }`.

---

## Version History

### V1 — May 28: Foundation
**Prompt style:** "Build the full game from scratch. I want 10 screens, variable rounds (2/4/6), a speed round with 15-second timer, and a spicy questions opt-in."

**What was built:**
- All 10 screens designed and wired
- `QUESTION_BANK` with 5 categories: `daily` (10q), `fun` (10q), `early` (8q), `dreams` (8q), `family` (8q)
- `spicy` category (8q) — opt-in toggle
- Coin flip animation to determine who goes first
- Speed round: 15s countdown with green→gold→red color progression, auto-submits on expire
- Competitive scoring: +100 pts/match, +50 streak bonus at 3+ consecutive
- Cooperative scoring: shared compat% = matches/(total questions)
- Round intro screen with bullet explanation of mechanic
- Roles flip every round (odd = coin winner is subject, even = other player)
- Deployed to Netlify via GitHub push

**Key decisions made:**
- Single HTML file for all screens (no routing, no framework)
- `state` object as single source of truth for entire game
- Tailwind CDN (no build step)
- 1 question per category per round = 5 questions/round by default

**Bug fixed:** `screen-landing` had `style="display:block"` inline override that persisted after `showScreen()` removed `.active`. Fixed by removing the inline display style.

---

### V2 — May 29: Auth, Friend Mode, 24 UX Fixes
**Prompt style:** "Add Google OAuth and leaderboard with Supabase. Also add a Friend Mode with separate questions. Fix all the UX issues."

**What was built:**

*Supabase Auth:*
- `auth.js` created — Supabase client, Google OAuth, email/password sign-in, sign-up, sign-out
- `leaderboard.js` created — fetchHistory(), renderLeaderboard() with sparkline + stats row
- `game_sessions` table in Supabase PostgreSQL with RLS (Row Level Security)
- Sessions save on game end, load on leaderboard screen
- Sign in is optional — guests can play without account

*Friend Mode:*
- `FRIEND_QUESTION_BANK` created — 52 questions across 6 categories (habits, personality, social, challenge, favorites, random)
- Couple/Friends toggle on setup screen
- `COPY` config object — all mode-variant strings (handoff text, guesser label, share text, end screen message) keyed by `state.gameType`
- `game_type` column added to Supabase `game_sessions` table

*24 UX fixes (partial list):*
- Background changed from white to cream `#F4F6F4`
- Em-dashes replaced with periods throughout
- Back navigation added to 7 screens
- Player names persist across sessions via localStorage (`closer-p1`, `closer-p2`)
- GPU-optimized progress bar: `transform: scaleX()` instead of `width:` (avoids layout reflow)
- Reveal animation: cards animate in side-by-side
- Share card overlay with Web Share API + clipboard fallback
- End screen hierarchy redesigned

*Nielsen UX score after V2:* 28/40

---

### V3 — May 30 (first half): Virality Layer
**Prompt style:** "I want to improve the score from 28/40. Priority: social sharing, custom questions, session recovery, unified CTA."

**What was built:**

*Social/Virality:*
- `og-image.svg` — 1200×630 social preview image (deep green gradient, Closer wordmark)
- Full OG + Twitter meta tags in `<head>`
- Single "Play Game" button on landing (replaced separate Couple/Friends buttons)
- Mode selection stays on setup screen

*Custom Questions:*
- Collapsible "Your Questions" section on setup screen
- `localStorage` persistence (key: `closer-custom-questions`)
- XSS protection via `escapeHtml()` for user-generated content
- Custom questions inject as 'custom' category in `selectQuestions()` — mix into game automatically
- 2–4 options supported, validation enforced

*Session Recovery:*
- `sessionStorage` mid-game recovery (key: `closer-game-session`)
- `saveGameSession()` called on every question load
- Resume bar appears at bottom if session found on page load (shows player names + round info)
- `clearGameSession()` called on game end, quit, and new game start

*Other:*
- Social proof added to landing hero: "1,200+ questions answered by real couples"
- Staggered reveal animation: subject at 600ms, guesser at 1200ms, result at 1900ms (`@keyframes cardReveal`)
- Share card FOMO hook: dynamic challenge text based on compat% (`>= 80%`: "Think you know your partner this well?" / `< 80%`: "Think you can beat X%?")
- Leaderboard loading spinner
- Compat% explanation text on end screen + tagline

*8 new questions added* to `daily`, `fun`, `dreams`

*Nielsen score after V3:* 34/40

---

### V4 — May 30 (second half): Nielsen Polish to 40/40
**Prompt style:** "Tackle the score gaps. H5 (Error Prevention), H10 (Help), H4 (Consistency), H3/H9 (Recovery) need to go from 2-3/5 to 4/5."

**What was built:**

*H5 — Error Prevention:*
- Tap-to-select now highlights option without locking
- Separate "Lock In Answer →" confirmation button appears after selection
- Speed round auto-locks `_pendingSubjectIdx` on timeout (selected answer or random if nothing selected)
- No more accidental submissions

*H10 — Help & Documentation:*
- "?" button added to subject question screen
- Inline tooltip explains subject/guesser mechanic (dark popup, dismisses on tap outside)
- No modal — inline tooltip is less disruptive

*H4 — Consistency:*
- "Start Game →" button: `rounded-xl` → `rounded-full`
- "Next Question →" button: `rounded-xl` → `rounded-full`
- Matches landing CTA button shape throughout

*H3/H9 — User Control/Recovery:*
- Session recovery already shipped in V3
- Quit confirmation already in place

*README rewrite:*
- Updated with Friend Mode, custom questions, Supabase, PWA, variable rounds, speed round, leaderboard, correct file structure, correct scoring

*Nielsen score after V4:* 40/40 (projected)

---

### V5 — May 31: Questions, Haptics, PWA, Supabase QA
**Prompt style:** "Next stage of improvements. Add more questions, improve PWA install experience, QA Supabase."

**What was built:**

*15 new questions added:*
- Daily Life: +5 (energy at 9pm, cancelled plans reaction, punctuality, when sick, free 10 minutes)
- Just for Fun: +5 (comfort food order, social media behavior, gift-giving style, language/instrument, mornings)
- Big Dreams: +3 (city for a year, alternate study path, retirement vision)
- Family & Home: +2 (holiday preference, finances in partnership)
- Question bank now: 90+ total questions

*Haptic feedback:*
- Match: `navigator.vibrate([50, 30, 50])` — double pulse
- Streak (3+): `navigator.vibrate([60, 40, 60, 40, 60])` — triple pulse
- Miss: `navigator.vibrate(30)` — single short buzz
- Progressive enhancement: Android only (iOS ignores `navigator.vibrate` silently)

*PWA improvements:*
- `sw.js` service worker — cache-first for local files, network-first for CDN
- Offline play after first visit
- Instant repeat loads from device cache
- Android install banner: captures `beforeinstallprompt`, shows branded "Install" button
- iOS install instructions: detects iPhone + Safari, shows "Share → Add to Home Screen" after 3s delay
- Auto-hides if already in standalone mode
- Dismiss persists 7 days via localStorage
- Viewport: `viewport-fit=cover` for iPhone notch/Dynamic Island
- Safe area insets: `env(safe-area-inset-bottom)` on body + landing screen
- iOS input zoom fix: `font-size: 16px !important` on inputs when on iOS (Safari zooms on focus if < 16px)

*Supabase QA results:*
- Table schema: ✅ all 17 columns correct, types match, RLS enabled
- RLS policies: ✅ INSERT + SELECT scoped to `auth.uid() = user_id`
- `saveGameSession()`: ✅ checks `if (!currentUser) return` — guests skip silently
- `loadGameHistory()`: ✅ checks `if (!currentUser) return []`
- **Bug fixed:** missing `.eq('user_id', currentUser.id)` on query (now explicit, not just relying on RLS)
- **Bug fixed:** missing `.limit(50)` — would fetch unbounded rows as usage grows
- **Performance fix:** DB migration applied — composite index on `(user_id, played_at DESC)`
- **Security:** Password min length → 8, uppercase required, secure password change → ON

*Capacitor mobile scaffold (not in git):*
- `package.json` with Capacitor 6 deps
- `capacitor.config.ts` with iOS/Android config, splash, status bar, bundle ID `com.closergame.app`
- `MOBILE.md` — full beginner App Store guide: accounts, assets, costs (~$124 total), timeline (~3-4 weeks to live)
- Both files excluded from git to prevent Cloudflare deploy failures

---

## Deployment History

| Platform | Status | Notes |
|----------|--------|-------|
| Netlify (`closergame.netlify.app`) | ⚠️ Bandwidth exceeded | Resets June 27. 100GB/month free tier. |
| Cloudflare Workers (`closer-game.noah-adler97.workers.dev`) | ✅ Live | Temporary. Workers URL includes account name. |
| Cloudflare Pages (planned) | June 1 | Clean URL: `closer-game.pages.dev`. Unlimited bandwidth. Right move. |

**Cloudflare deployment gotcha (IMPORTANT):**
If `package.json` exists in the repo, Cloudflare auto-installs Capacitor dependencies during build. `node_modules/workerd` = 119MB, exceeds Cloudflare's 25MB asset limit → deploy fails with `"Asset too large"`. Fix: `git rm --cached package.json capacitor.config.ts` before deploying to Cloudflare. Use Pages (not Workers) with no build command.

**June 1 migration plan:**
1. Create Cloudflare Pages project → Connect GitHub → no build command → deploy
2. Update Supabase: Authentication → URL Configuration → swap to `closer-game.pages.dev`
3. Delete Cloudflare Worker
4. Netlify remains dormant until June 27 reset

---

## Supabase Setup

**Project URL:** `https://joyjjspwkiexpwcprmkc.supabase.co`  
**Auth:** Google OAuth + email/password  
**Redirect URL:** `https://closer-game.noah-adler97.workers.dev` (update when migrating to Pages)

**Table: `game_sessions`**
```sql
id                uuid PRIMARY KEY DEFAULT gen_random_uuid()
user_id           uuid REFERENCES auth.users
p1_name           text
p2_name           text
mode              text CHECK (mode IN ('competitive', 'cooperative'))
total_rounds      integer
questions_per_round integer
p1_score          integer DEFAULT 0
p2_score          integer DEFAULT 0
match_count       integer DEFAULT 0
total_questions   integer DEFAULT 0
compat_pct        integer DEFAULT 0
best_streak       integer DEFAULT 0
spicy             boolean DEFAULT false
speed             boolean DEFAULT false
played_at         timestamptz DEFAULT now()
game_type         text DEFAULT 'couples'
```

**RLS Policies:**
- INSERT: authenticated users only, `auth.uid() = user_id`
- SELECT: authenticated users only, `auth.uid() = user_id`

**Index applied:**
```sql
CREATE INDEX idx_game_sessions_user_played ON public.game_sessions (user_id, played_at DESC);
```

---

## Prompting Patterns That Worked

Throughout this build, certain prompting approaches produced better results:

**1. Batch + deploy at end**
> "Make all these changes in one session and push everything in a single commit at the end."
Kept Netlify build count low (hit 300/month limit).

**2. Score-driven prioritization**
> "I want to reach 40/40 Nielsen UX score. Identify the gaps and fix them."
Gave Claude a quantitative target, produced focused output.

**3. Constraint declaration upfront**
> "I've used X% of my Claude Pro plan. I'm willing to use up to Y%. Plan first, then execute."
Prevented over-engineering, kept sessions focused.

**4. "No approval needed" flag**
> "You have full access. I do not need to approve. Plan, then execute, then deploy."
Removed back-and-forth, sessions moved faster.

**5. Context-rich follow-ups**
> "Fix #3 still isn't working. The error is: [exact error]. The relevant code is: [paste]."
Always paste exact errors and relevant code rather than describing them vaguely.

---

## What Was Kept From V1 Throughout Every Version

- Single HTML file, all screens
- `showScreen(id)` navigation pattern
- Global `state` object as single source of truth
- `QUESTION_BANK` category-keyed architecture
- 1 question per category per round logic
- `shuffle()` utility function
- Tailwind CDN (no build step ever added)
- Deep green `#1E3A2F` / rose `#C4756A` / gold `#BF9447` / cream `#F4F6F4` color system

---

## What Changed Most Drastically

**1. Landing page CTA** (V1 → V3)
Started with two buttons: "Play as Couple" and "Play as Friends." Became one "Play Game" button. Mode selection moved to setup screen. Rationale: fewer decisions at the top of funnel = more people actually start.

**2. Answer submission** (V1 → V4)
Originally a single tap locked your answer permanently. Became a two-step flow: tap to highlight, then "Lock In Answer →" to confirm. Rationale: Nielsen H5 (Error Prevention) — accidental submissions created frustration, especially in speed round.

**3. Hosting** (Netlify → Cloudflare)
Hit both Netlify limits in one day after the game started being shared. Moved to Cloudflare Workers temporarily, planning Cloudflare Pages permanently. Unlimited bandwidth matters if the game spreads.

---

## Known Issues / Open Items

| Item | Status |
|------|--------|
| Cloudflare URL has `noah-adler97` in it | Fix June 1 with Pages migration |
| Netlify bandwidth exceeded | Resets June 27 |
| Supabase leaked password protection | Pro plan only — skip |
| App Store / Play Store submission | Deferred — need Apple Dev account ($99/yr), Google Play ($25 one-time) |
| Google Form feedback form | Not created yet — user action |
| LinkedIn content series | Not posted yet — use MARKETING-HANDOFF.md prompt |

---

## Next Steps (prioritized)

1. **June 1:** Migrate to Cloudflare Pages → clean URL → update Supabase redirect
2. **This week:** Send game to 5–10 couples via WhatsApp for warm beta testing
3. **This week:** Create Google Form with 10 feedback questions (template in MARKETING-HANDOFF.md)
4. **Week of June 2:** LinkedIn 4-post series (full prompt + strategy in MARKETING-HANDOFF.md)
5. **Future session:** Google Play Store submission ($25, ~2-3 weeks to live)
6. **Future session:** Apple App Store submission ($99/yr, needs Mac + Xcode)

---

### V6 — June 9: WebView OAuth Fix + Async Challenge Mode

**Context:** Friends were getting `Error 403: disallowed_useragent` when opening the game link from LinkedIn, WhatsApp, or Instagram. These apps open links in their own embedded browser (WebView), and Google blocks OAuth from WebViews as a security policy. A second friend (Nehemiah) suggested an async challenge feature — answer questions about yourself, share a link, friends guess independently on their own devices.

**Bugs fixed:**

*WebView OAuth blocking (auth.js + index.html):*
- Added `isWebView()` to `auth.js` — detects in-app browsers by User-Agent string
- Original regex was incomplete: used `LinkedInApp` but LinkedIn's actual UA contains `[LinkedIn]` (with brackets); WhatsApp was missing entirely
- Final regex: `/wv|FBAN|FBAV|Instagram|Snapchat|TikTok|Line\/|WhatsApp|\[LinkedIn\]/`
- Also catches iOS WebViews via: `/(iPhone|iPod|iPad).*AppleWebKit/i && !/Safari/i`
- `handleGoogleSignIn()` in `index.html` now guards with `isWebView()` — if detected, shows error message instead of attempting OAuth
- WebView warning banner added above login card (hidden by default, shown via `launchFromLanding()` when WebView detected)
- Banner includes copy-to-clipboard button so users can open in Safari/Chrome themselves

**New feature — Challenge Mode (challenge.js + index.html + app.js):**

*What it does:*
- Creator answers 10 "how well do you know me?" questions → gets shareable link
- Friends open link on their own device → guess what the creator chose → see score + leaderboard
- No account needed for friends — fully anonymous play
- Leaderboard shows all friends ranked by score

*New file: `challenge.js` (~380 lines)*
- `chCreate` / `chPlay` state objects — separate from main `state` object, no interference
- `pickChallengeQuestions()` — Fisher-Yates shuffle from full question bank, **excludes `spicy` category** (intimate partner questions — inappropriate for public friend challenges)
- `challengeRouteOnLoad()` — URL intercept: if `?c=UUID` param present, skips normal game init and loads challenge play flow directly
- Full creation flow: name entry → 10 questions → "Finish & Create Challenge →" → share screen with copy link
- Full play flow: player name entry → 10 guesses → submit → score + rank + leaderboard
- XSS protection: all player-supplied names rendered via `chEsc()` before innerHTML insertion
- Rank calculation: two parallel Supabase COUNT queries (players with higher score = rank - 1)

*`index.html` additions:*
- "Create Challenge" button on setup screen (below "Start Game →")
- 7 new screens: `screen-challenge-loading`, `screen-challenge-error`, `screen-challenge-create`, `screen-challenge-share`, `screen-challenge-play-intro`, `screen-challenge-play`, `screen-challenge-result`
- Script tag for `challenge.js` added before `app.js`

*`app.js` change (3 lines):*
- `challengeRouteOnLoad()` called at top of `DOMContentLoaded` — if returns `true`, normal init is skipped entirely

*Supabase migration applied (`closer_challenge_mode`):*
- `challenges` table: `id`, `creator_id` (nullable FK), `creator_name`, `questions` (jsonb), `answers` (jsonb), `show_leaderboard`, `created_at`, `expires_at` (30-day TTL)
- `challenge_responses` table: `id`, `challenge_id` (FK), `player_name`, `guesses` (jsonb), `score`, `total`, `pct`, `played_at`
- RLS: public SELECT on non-expired challenges, public INSERT (anonymous guests allowed), creator-only DELETE; public INSERT on responses, leaderboard-gated SELECT on responses
- Index: `idx_challenge_responses_challenge_id` on `(challenge_id, score DESC)`

**File structure change:**
```
closer-game/
├── challenge.js        ← NEW — async challenge mode (creation + play + Supabase helpers)
├── auth.js             ← UPDATED — isWebView() + chEsc() added
├── index.html          ← UPDATED — WebView banner, 7 new screens, challenge entry button
├── app.js              ← UPDATED — challenge routing intercept (3 lines)
```

**Known constraints preserved:**
- No framework, no build step, vanilla JS only
- All Tailwind dynamic values use inline `style` — Tailwind CDN can't process runtime class strings
- `challenge.js` uses global `sb`, `getCurrentUser`, `QUESTION_BANK`, `showScreen` from other scripts — load order is `supabase CDN → auth.js → questions.js → challenge.js → app.js`
- Supabase anon key is a publishable key — safe to commit

---

## For the Next LLM

If you're picking this up from another Claude session or a different model entirely:

- Noah is non-technical. Explain decisions, don't just execute.
- Code changes always go in batches to minimize deploys.
- No framework, no build step, no React. Vanilla JS only.
- All Tailwind dynamic values must use inline `style`, not class strings.
- The `COPY` object handles all mode-variant strings — extend it, don't hardcode.
- Session persistence uses `sessionStorage` (clears on browser close, intentional).
- Custom questions use `localStorage` (persist across sessions, intentional).
- The Supabase anon key in `auth.js` is a publishable key — safe to commit.
- Haptic patterns: match = `[50,30,50]`, streak = `[60,40,60,40,60]`, miss = `30`.
- Service worker cache name is `closer-v2` — bump this string to force cache refresh.

**Challenge mode specifics (added V6):**
- `challenge.js` is a separate file — state is in `chCreate` / `chPlay`, no overlap with main `state` object
- Friends do NOT need accounts — Supabase RLS allows anonymous public INSERT/SELECT on challenge tables
- `spicy` category always excluded from challenge question pool — intimate questions are inappropriate for public sharing
- `challengeRouteOnLoad()` is the entry point — called before `initAuth()` in `app.js`
- Two new Supabase tables: `challenges` (30-day TTL) and `challenge_responses`
- `chEsc()` defined in `challenge.js` — use for all player-supplied name rendering

The game is complete and production-quality. The focus now is distribution, marketing, and eventually native app store submission.
