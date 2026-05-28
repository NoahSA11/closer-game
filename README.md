# Closer — The Couples Connection Game

A free, browser-based quiz game for couples. Answer questions about yourself, your partner guesses what you chose, and both answers reveal side by side. See who really knows who.

**[Play it live →](https://closergame.netlify.app)**

---

## How It Works

1. **Set up in 60 seconds** — Enter both names, pick Competitive or Cooperative mode
2. **Answer for yourself** — One partner answers 5 questions honestly. Answers lock and stay hidden.
3. **Your partner guesses** — Same questions, same options. They predict what you chose.
4. **Reveal together** — Both answers show side by side. Matches earn points. Misses spark conversations.
5. **Round 2 flips** — Roles reverse. The subject becomes the guesser.

---

## Features

- **45+ questions** across 5 categories: Daily Life, Early Days, Big Dreams, Family & Home, Just for Fun
- **Randomized every session** — each round draws one question from each category, different order every time
- **Two modes** — Competitive (someone wins) or Cooperative (shared connection score)
- **Balanced for both partners** — neither has a built-in advantage; roles swap each round
- **One device** — pass the phone between turns. No accounts, no downloads.
- **15–20 minutes** — designed as a weekly ritual

---

## Run Locally

No build step. Open `index.html` directly in any browser.

```bash
git clone https://github.com/NoahSA11/closer-game.git
cd closer-game
open index.html   # macOS
# or just double-click index.html on Windows
```

---

## File Structure

```
closer-game/
├── index.html      # All screens + Tailwind CDN
├── app.js          # Game state, screen transitions, scoring
├── questions.js    # Full question bank (5 categories, 8-10 questions each)
└── styles.css      # Game screen styles + animations
```

---

## Scoring

**Competitive mode**
- Correct guess: +100 pts
- 3+ consecutive matches (streak): +50 bonus pts
- Guesser earns points each round — roles flip in Round 2

**Cooperative mode**
- Match: shared +200 pts
- Full 5/5 round sweep: +150 bonus
- Ends with a couple compatibility %

---

## Customization

Want to add your own questions? Edit `questions.js`. Each question follows this format:

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

Add it to any of the 5 category arrays: `daily`, `fun`, `early`, `dreams`, `family`.

---

## Built With

- Vanilla HTML / CSS / JavaScript — no framework, no build step
- [Tailwind CSS CDN](https://tailwindcss.com) — utility styling
- [Google Fonts](https://fonts.google.com) — Cormorant Garamond + DM Sans

---

## License

MIT — free to use, fork, and remix. If you make something cool with it, share it.
