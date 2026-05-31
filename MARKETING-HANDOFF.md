# Closer — Marketing & Launch Handoff
## For co-work marketing session

---

## What Was Built

**Closer** is a free, browser-based game for couples and close friends at [closergame.netlify.app](https://closergame.netlify.app).

One player answers questions about themselves privately. The other guesses what they chose. Both answers reveal together. It tracks a compatibility % and game history.

Built entirely by one non-engineer (Noah) using Claude as a coding partner — no prior app development experience.

---

## Tech Stack (for LinkedIn content)

| Layer | Tool | Why it matters for the story |
|-------|------|-------------------------------|
| Frontend | Vanilla HTML / CSS / JS | No framework. Proves you don't need React to ship something real. |
| Styling | Tailwind CSS (CDN) | Zero build step — paste a script tag and go |
| Fonts | Google Fonts (Cormorant Garamond + DM Sans) | Design quality from a free tool |
| Backend | Supabase | Auth (Google login + email), leaderboard, game history — 0 lines of server code |
| Hosting | Netlify | Auto-deploys from GitHub on every push. Free tier. |
| Version control | GitHub | Every feature commit tracked — shows progression |
| AI partner | Claude (Anthropic) | Wrote code, debugged, planned architecture, designed UX |
| PWA | Web App Manifest + Service Worker | Installs to home screen, works offline, no app store needed |

---

## Build Timeline

| Date | What shipped |
|------|-------------|
| May 28 | V1: 10-screen game flow, variable rounds, speed timer, spicy questions, Netlify deploy |
| May 29 | V2: Supabase auth + leaderboard, 24 UX fixes, Friend Mode (52 questions), share card |
| May 30 | V3: OG image, unified CTA, custom questions, reveal animation, session recovery, PWA |
| May 30 | V4: Nielsen UX polish (confirm-to-lock, help tooltip, button consistency), README |
| May 31 | V5: 15 new questions, haptic feedback, PWA install banner, service worker, Supabase QA |

**Total: ~4 days, 5 versions, 40/40 Nielsen UX score**

---

## LinkedIn Content Strategy

### Recommended approach: 3-post series + 1 feedback post

**Post 1 — The story (most viral)**
Hook: "I built a couples game in 4 days with no prior coding experience. Here's what I learned."
Content:
- What the game is + link
- The honest journey (Claude as co-pilot, not magic wand)
- 3 specific things that surprised you about building software
- CTA: "Try it with your partner this weekend"

**Post 2 — The technical breakdown (credibility)**
Hook: "How I shipped a full-stack web app for $0/month."
Content:
- The actual stack (table above)
- GitHub → Netlify auto-deploy pipeline explanation
- Supabase auth in under 100 lines
- PWA = app without app store
- CTA: "What would you build if code wasn't the barrier?"

**Post 3 — The product thinking post (GTM angle)**
Hook: "I gave my app a 40/40 Nielsen UX score. Here's the framework I used."
Content:
- What Nielsen heuristics are (10 principles)
- The specific gaps we found (error prevention, help documentation, consistency)
- How you fixed each one
- CTA: "Drop a comment if you want the scoring template"

**Post 4 — QA testers ask (engagement + feedback)**
Hook: "I need 20 couples to play test my game this week."
Content:
- What the game is
- What you want feedback on
- Link to feedback form
- Offer: "First 20 couples who submit feedback get a shoutout"

---

## Feedback Form — What to Capture

Create via Google Forms (free): [forms.google.com](https://forms.google.com)

**Form title:** Closer Game — Beta Feedback

**Questions:**

1. How did you find out about the game? (short text)
2. Who did you play with? (Couple / Close friends / Other)
3. How many rounds did you play? (2 / 4 / 6)
4. Overall rating: 1–5 stars (linear scale)
5. What moment surprised you most during the game? (paragraph)
6. What confused you or felt unclear? (paragraph)
7. Would you play again? (Yes / Maybe / No)
8. Would you share this with a friend? (Yes / Maybe / No)
9. What's one thing you'd change? (paragraph)
10. Your name + Instagram or LinkedIn (optional, for shoutout)

**Share the form link** in the LinkedIn post + directly to friends via WhatsApp/iMessage.

---

## Sharing Plan — Family & Friends First Wave

### Week 1 (this week): Warm circle
- Send to 5–10 couples directly via WhatsApp/iMessage
- Message template:
  > "Hey! I built a game you and [partner] can play tonight — takes 20 minutes, no download needed. Would love to know what you think: closergame.netlify.app"
- Ask each person to send feedback via the form
- Ask 2–3 to share it to their own circles

### Week 2: LinkedIn posts
- Post 1 on Monday (story hook — highest reach day)
- Post 2 on Wednesday (tech breakdown)
- Post 3 on Friday (UX framework)
- Engage in comments for 1 hour after each post drops

### Week 3: Feedback synthesis
- Collect all form responses
- Identify top 3 friction points
- Fix them (1-session Claude sprint)
- Post 4: "We fixed the top 3 things you complained about" — follow-up post

---

## What Makes This LinkedIn-Worthy

This story hits multiple angles that perform well on LinkedIn:

1. **Non-engineer builds software** — aspirational and accessible
2. **AI as co-pilot, not replacement** — current conversation topic
3. **GTM/RevOps person shows technical range** — directly relevant to Noah's career positioning (addresses the "not technical enough" interview feedback)
4. **Shipped in 4 days** — demonstrates velocity and prioritization
5. **Real product, real link** — not a hypothetical. People can actually play it.
6. **Free stack** — democratizing narrative ($0/month to run a real app)

---

## Co-Work Marketing Session Prompt

Copy everything below this line and paste into a new co-work chat with the Marketing plugin enabled.

---

```
I want to create a LinkedIn content series and launch strategy for a product I just built.

CONTEXT:
I'm Noah Adler — marketing ops professional, 3 years HubSpot experience, building GTM skills. I built a web game called "Closer" (closergame.netlify.app) in 4 days using Claude as my coding partner. I have no prior coding or app development background.

THE PRODUCT:
Closer is a free couples and friends game. One player answers questions privately. The other guesses. Answers reveal together. It tracks a compatibility % and personal game history.

Built with: Vanilla HTML/JS, Tailwind CSS, Supabase (auth + leaderboard), Netlify (hosting), GitHub (CI), PWA (works offline, installs to home screen).

Timeline:
- Day 1: Core game flow (10 screens, variable rounds, speed timer)
- Day 2: Supabase auth, leaderboard, 24 UX fixes, Friend Mode
- Day 3–4: OG image, custom questions, session recovery, offline service worker, PWA install banner, 15+ new questions, haptic feedback, Nielsen UX audit (40/40 score)

CAREER ANGLE:
My interview feedback said I'm "not creative enough" and "not technically deep enough in HubSpot." This project directly challenges that — I shipped a real full-stack product as a non-engineer. The LinkedIn content should help reposition me as someone with both strategic marketing instincts AND technical range.

GOALS:
1. Write 4 LinkedIn posts (story / tech breakdown / UX framework / QA testers ask)
2. Create a Google Form feedback strategy (what questions to ask, how to frame it)
3. Build a sharing plan for warm circles first, then LinkedIn
4. Help me think about what makes each post perform — hooks, structure, CTA

CONSTRAINTS:
- Authentic voice — I'm not a developer, I'm a marketer who learned to build
- No technical jargon without explanation
- Posts should appeal to: marketers, ops people, founders, and couples/friends who'd play the game
- I want real engagement, not vanity metrics

Start by drafting Post 1 (the story hook). Then we'll refine and build the other 3.
```
