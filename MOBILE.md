# Closer — Mobile App Build Guide

This guide walks you through submitting Closer to the App Store (iPhone) and Google Play (Android). You don't need to know React or any mobile framework. Capacitor wraps the existing HTML/CSS/JS files directly into a native app shell.

---

## How Capacitor Works (Plain English)

Your game is already built in HTML/JavaScript. Capacitor is a tool that takes that web code and wraps it inside a real iOS or Android app — the same way a browser would display it, but packaged as an `.ipa` (iOS) or `.apk` (Android) file that app stores accept.

No rewrite. No React. The existing `index.html`, `app.js`, `questions.js`, etc. become the app. Capacitor adds native features on top: haptics, status bar color, splash screen, and a home screen icon.

---

## What You Need First (Prerequisites)

Do these before the build session. Some take 1–3 days to process.

### 1. Apple Developer Account — $99/year
Required to publish on the App Store. Even for testing on your own iPhone.

1. Go to [developer.apple.com/enroll](https://developer.apple.com/enroll)
2. Sign in with your Apple ID (or create one)
3. Enroll as an **Individual** (not Organization)
4. Pay the $99/year fee
5. Wait 24–48 hours for approval (sometimes instant, sometimes longer)

Once approved, you'll have access to App Store Connect, where you manage the app listing.

### 2. Google Play Console Account — $25 one-time
Required to publish on Android. One-time fee.

1. Go to [play.google.com/console](https://play.google.com/console)
2. Sign in with a Google account
3. Pay the $25 registration fee
4. Complete the developer profile form
5. Available immediately after payment

### 3. Mac Computer (iOS only)
Building the iOS `.ipa` file requires Xcode, which only runs on macOS.

- If you have a Mac: install **Xcode** from the Mac App Store (free, ~10 GB)
- If you don't have a Mac: you can use a service like [MacStadium](https://macstadium.com) or GitHub Actions with a macOS runner — we'll handle this in the build session

Android builds can be done on Windows or Mac.

### 4. Node.js installed
Capacitor runs on Node. If you don't have it:

1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS** version
3. Run the installer, follow defaults

Verify it worked: open Terminal and type `node --version`. You should see something like `v20.x.x`.

---

## App Assets to Prepare

These files need to be ready before submitting to either store.

### App Icon — 1024×1024 PNG, no transparency
The single most important asset. App stores auto-generate all size variants from this one file.

**How to make it (Canva, free):**
1. Go to [canva.com](https://canva.com) → Create design → Custom size: 1024 × 1024 px
2. Use the deep green background: `#1E3A2F`
3. Place the Closer wordmark or the heart icon in the center
4. Optional: add the gold accent ring (`#BF9447`) as a design element
5. Export as PNG — make sure there is **no transparent background** (use a solid fill)
6. Save as `app-icon-1024.png`

**What NOT to do:**
- No rounded corners (Apple/Google apply their own rounding)
- No transparency/alpha channel
- No text smaller than 14pt at this size (it gets tiny on actual devices)

### Screenshots (for App Store listing page)
Each store requires screenshots showing the app in use. You'll need at least 3.

**Sizes needed:**
- iPhone 6.7" (1290 × 2796 px) — shown first in App Store
- iPhone 6.5" (1242 × 2688 px) — required fallback
- Android phone (1080 × 1920 px minimum)

**How to get them:**
Run the app in your browser at the right size and take screenshots, or use browser dev tools (F12 → mobile view) set to the iPhone Pro Max dimensions.

**Screenshot ideas:**
1. Landing screen (the hero — first impression)
2. Question screen (shows the gameplay mechanic)
3. Reveal screen (shows the match/miss moment)
4. End screen with compat% (the payoff)
5. Share card (shows social viral element)

### App Description (for store listing)
Write this ahead of time — App Store Review takes it seriously.

**Short description (30 chars max, shown under app name):**
> How well do you know each other?

**Full description (4000 chars max):**
Write 3–5 short paragraphs. Lead with the hook, not the feature list. Example structure:
1. What the game is (the emotional promise)
2. How it works (the mechanic)
3. What makes it different (couples + friends mode, no second screen needed)
4. Who it's for (couples, new friends, long-term partners)
5. Call to download

---

## App Store Policies to Know

Both stores will review your app before publishing. Common rejection reasons:

### Apple App Store (stricter)
- App must have **real, complete functionality** — no placeholder screens
- Must work **offline** (Closer does — the only online feature is the leaderboard)
- Privacy policy required if you collect any user data. Supabase auth = user data. You'll need a simple privacy policy URL. [Free generator: privacypolicygenerator.info](https://privacypolicygenerator.info)
- Must not crash during review — test thoroughly
- Review time: **1–3 days** for new apps

### Google Play (more lenient)
- Policy review is mostly automated
- Privacy policy required if you collect data (same as above)
- New apps go through a **20-person closed testing period** for 14 days before going live — plan for this
- Review time: **2–7 days** for new apps

---

## Bundle ID

Already set in `capacitor.config.ts`:
```
com.closergame.app
```

This is the unique identifier for your app in both stores. It cannot be changed after your first submission. If you want to use a custom domain (e.g., `com.noahadler.closer`), update `capacitor.config.ts` before the build session.

---

## The Build Session (Next Steps)

When you're ready to build, we'll do this in order:

**Step 1 — Install Capacitor (one command)**
```bash
npm install
npx cap add ios      # creates /ios project folder
npx cap add android  # creates /android project folder
npx cap sync         # copies web files into native projects
```

**Step 2 — Add app icon + splash**
Place `app-icon-1024.png` in the repo root. One command generates all icon sizes for both platforms.

**Step 3 — Build iOS (Mac required)**
```bash
npx cap open ios
# Xcode opens. Select your Apple Developer account, hit Archive, upload to App Store Connect.
```

**Step 4 — Build Android (any OS)**
```bash
npx cap open android
# Android Studio opens. Generate signed APK or AAB, upload to Google Play Console.
```

---

## Estimated Timeline

| Task | Time |
|------|------|
| Apple Developer account approval | 1–48 hours |
| Google Play account activation | Immediate |
| App icon design in Canva | 30–60 min |
| Screenshots | 30 min |
| Privacy policy | 15 min |
| Build session (with Claude) | 2–3 hours |
| App Store review (Apple) | 1–3 days |
| App Store review (Google) | 2–7 days + 14-day testing period |
| **Total time to live** | **~3–4 weeks** |

---

## Cost Summary

| Item | Cost |
|------|------|
| Apple Developer Program | $99/year |
| Google Play Console | $25 one-time |
| Canva (free tier) | $0 |
| Privacy policy generator | $0 |
| Netlify (current host, already paid) | $0 |
| **Total** | **~$124** |

---

## Questions You'll Be Asked During Submission

App Store Connect will ask:
- **Age rating** — select 4+ or 9+ (no violence, no adult content; Spicy questions are tasteful)
- **Category** — Entertainment or Lifestyle
- **Price** — Free (recommended for launch)
- **In-App Purchases** — None for now
- **Privacy Nutrition Label** — You collect: Email address (from Supabase auth). That's it.

---

## Files Created in This Session

```
closer-game/
├── package.json         ← Capacitor dependencies (run `npm install` to install)
├── capacitor.config.ts  ← iOS/Android config (Bundle ID, splash, status bar)
└── MOBILE.md            ← This file — full guide
```

The `/ios` and `/android` project folders are generated during the build session via `npx cap add ios` and `npx cap add android`. They are large (~100MB each) and should be added to `.gitignore` after creation.
