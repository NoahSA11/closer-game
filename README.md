# Closer — The Connection Game

A free, browser-based game for couples and close friends. One person answers questions about themselves — privately. The other guesses what they chose. Both answers reveal together. See who really knows who.

**[Play it live →](https://closergame.netlify.app)**

---

## How It Works

1. **Set up in 60 seconds** — Enter both names, pick game type (Couple or Friends), mode, and how many rounds
2. **Subject answers privately** — One player answers questions about themselves. Answers lock and stay hidden. You can change your selection before locking in.
3. **Pass the phone** — Handoff screen confirms the switch. The guesser can't see locked answers.
4. **Guesser predicts** — Same questions, same options. They try to match what the subject chose.
5. **Reveal together** — Both answers animate in side by side. Matches earn points. Misses spark conversations.
6. **Roles flip** — Every other round, subject and guesser swap. Neither player has a built-in advantage.

---

## Features

- **Two game types** — Couple mode and Friends mode, each with tailored questions and copy
- **60+ questions** across 6 categories: Daily Life, Just for Fun, Early Days, Big Dreams, Family & Home, and Spicy (opt-in)
- **Custom questions** — Add your own questions in-app with 2–4 options. They mix into the game automatically.
- **Two modes** — Competitive (someone wins) or Cooperative (shared compatibility score)
- **Variable rounds** — 2, 4, or 6 rounds (~10, 20, or 30 min)
- **Speed Round** — optional final round with a 15-second timer per question
- **Confirm before locking** — tap to select, then lock in. No accidental submissions.
- **Compatibility score** — match rate across all questions, shown at the end (70%+ = strong connection)
- **Game history + leaderboard** — sign in to save sessions and track best scores over time (Supabase)
- **Share card** — screenshot-ready result card with a challenge hook for social sharing
- **Mid-game recovery** — refresh during a game and a Resume bar appears with your session intact
- **PWA installable** — Add to Home Screen on iOS and Android for a native app feel
- **One device** — designed to pass between players. No second screen needed.

---

## Run Locally

No build step. Open `index.html` directly in any browser.

```bash
git clone https://github.com/NoahSA11/closer-game.git
cd closer-game
open index.html   # macOS
# or double-click index.html on Windows
```

For leaderboard and auth features, you'll need a Supabase project. Create a `.env`-equivalent config in `auth.js` with your project URL and anon key.

---

## File Structure

```
closer-game/
├── index.html        # All screens, Tailwind CDN, inline game setup scripts
├── app.js            # Game state, screen transitions, scoring, session logic
├── questions.js      # Full question bank (QUESTION_BANK + FRIEND_QUESTION_BANK)
├── auth.js           # Supabase auth (sign in, sign out, session persistence)
├── leaderboard.js    # Game history fetch + render (sparkline, stats row)
├── styles.css        # Additional styles (mostly superseded by Tailwind inline)
├── manifest.json     # PWA manifest for Add to Home Screen
└── og-image.svg      # Social preview image for link sharing
```

---

## Scoring

**Competitive mode**
- Correct guess: +100 pts
- 3+ consecutive matches (streak): +50 bonus pts
- Guesser earns points each round — roles flip each round

**Cooperative mode**
- Tracked as a shared compatibility % (matches ÷ total questions)
- 70%+ is a strong connection — most pairs score between 55–75%

---

## Custom Questions

Add your own in-app via the setup screen — no code needed. Tap **Your Questions**, enter a question and 2–4 options, and they'll mix into the next game.

To add questions directly to the bank, edit `questions.js`:

```js
{
  id: 'unique-id',
  text: "Your question here:",
  options: [
    "Option A",
    "Option B",
    "Option C",
    "Option D"
  ]
}
```

Add to any category array: `daily`, `fun`, `early`, `dreams`, `family`, or `spicy`.

---

## Tech Stack

- Vanilla HTML / CSS / JavaScript — no framework, no build step
- [Tailwind CSS CDN](https://tailwindcss.com) — utility styling
- [Google Fonts](https://fonts.google.com) — Cormorant Garamond + DM Sans + Great Vibes
- [Supabase](https://supabase.com) — auth and game session storage
- Deployed on [Netlify](https://netlify.com) via GitHub CI

---

## License

MIT — free to use, fork, and remix.
