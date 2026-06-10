# Closer — Changelog

All notable changes to this project are documented here.
Full architectural context and decision history: see [CLOSER-BUILD-STORY.md](CLOSER-BUILD-STORY.md)

---

## [V6.1] — June 2026 — Bug Fix & Audit Release

### Fixed

**Critical**
- **Game sessions were never saving to Supabase.** The local session-storage function (`saveGameSession`) had the same name as the Supabase save function in `auth.js`. Every call from `showSubjectQuestion()` silently resolved to the wrong function — leaderboard history was completely broken for all users. Local function renamed to `saveSessionToStorage()`.

**High**
- **All share links pointed to a dead URL.** Five locations across `app.js` and `index.html` still referenced `closergame.netlify.app` (Netlify account has since hit bandwidth limit). All replaced with `window.location.origin` so the URL is always correct regardless of hosting environment — future-proofed for the Cloudflare Pages migration.
- **Guesser could accidentally lock answers with a single tap.** The subject phase requires confirming your answer; the guesser phase did not — one misclick locked you in permanently. A two-step confirm flow (`selectGuesserAnswer → confirmGuesserAnswer`) has been added to the guesser phase, matching the subject experience. Speed round timeout still bypasses confirm (by design).

**Medium**
- **Challenge mode did not work offline (PWA).** `challenge.js` was added in V6 but never added to the service worker's pre-cache list. Added to `LOCAL_FILES` in `sw.js`. Cache version bumped from `closer-v2` to `closer-v3` to force all installed users to re-download.
- **Leaderboard back button always went to the game-end screen**, even if you opened the leaderboard from the landing page. The button now returns you to whatever screen you came from.
- **Progress bars had conflicting CSS rules.** Both subject and guesser progress bars had `style="width:0%"` hardcoded in HTML, which conflicted with the JavaScript `style.transform = scaleX(...)` updates in `app.js`. The inline `width:0%` override was removed from both elements.
- **Challenge create back button had no warning.** Tapping Back mid-challenge (after answering some questions) silently discarded all progress. Back button now calls `chConfirmBack()` which shows a confirmation dialog if any answers have been entered.

### Changed
- Share card URL watermark updated to current live domain (`closer-game.noah-adler97.workers.dev`)
- OG/Twitter meta tags updated to current live domain

### Known Pending
- **Supabase OAuth redirect URL** still points to the Workers domain — must be updated in Supabase Auth dashboard after Cloudflare Pages migration
- **Cloudflare Pages migration** — move from Workers (`noah-adler97.workers.dev`) to Pages for a clean URL and unlimited bandwidth

---

## [V6] — 2025 — Async Challenge Mode + WebView OAuth Fix

### Added
- **Async "How well do you know me?" challenge mode** — create a personalized challenge, share a link, friends guess your answers without needing accounts
- **Creator dashboard** — after friends play, creator sees per-question accuracy stats and a full leaderboard
- **WebView OAuth protection** — Google sign-in blocked in in-app browsers (LinkedIn, Instagram, WhatsApp, TikTok, Snapchat, etc.) where OAuth is rejected by Google; replaced with a clear error message
- Two new Supabase tables: `challenges`, `challenge_responses` (public INSERT/SELECT — no auth needed for friends)
- XSS protection (`chEsc()`) for all user-supplied names rendered via innerHTML
- `localStorage` flag (`closer-created-{id}`) to identify challenge creator across sessions/devices

### Changed
- `spicy` category permanently excluded from challenge question pool (intimate questions not appropriate for public sharing)
- `challengeRouteOnLoad()` runs before `initAuth()` in DOMContentLoaded to intercept `?c=UUID` share links

---

## [V5] — 2025 — PWA, Speed Round, Spicy Mode

### Added
- **PWA support** — installable to home screen (iOS + Android), offline-capable via service worker
- **Speed round mode** — countdown timer per question; auto-picks random answer on timeout to prevent option-A bias
- **Spicy question toggle** — adult/intimate question category, disabled by default, opt-in at setup
- **Custom questions** — players can add their own questions, persisted to `localStorage`
- Session recovery — mid-game browser refresh restores game state via `sessionStorage`
- Haptic feedback on match/miss/streak (Android only)

---

## [V4] — 2025 — Friends Mode + Custom Questions

### Added
- **Friends mode** — all `COPY` object strings adapt from couples-specific to friend-group language
- Custom question support with localStorage persistence
- `COPY` config object in `app.js` — all mode-variant strings centralized; never hardcoded elsewhere

---

## [V3] — 2025 — UX Overhaul + Supabase Polish

### Changed
- Full UX redesign — Cormorant Garamond + DM Sans + Great Vibes type stack
- Reveal screen with staggered card animation (subject answer → guesser answer → match/miss banner)
- Round summary screen with streak tracking
- Compatibility percentage on end screen
- Session recovery foundations

---

## [V2] — 2025 — Supabase Integration

### Added
- Supabase auth (Google OAuth + email/password)
- `game_sessions` table — saves completed game records with RLS (scoped to authenticated user)
- Leaderboard screen with game history and sparkline

---

## [V1] — 2025 — Initial Release

### Added
- Core game loop: 10 screens, subject answers → guesser guesses → reveal → score
- Vanilla HTML / CSS / JS — no framework, no build step
- Tailwind CSS via CDN
- Coin flip to determine who answers first
- Couples mode with initial question bank
- Basic scoring and streak tracking
