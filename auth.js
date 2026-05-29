// auth.js — Supabase auth + DB integration for Closer
// Load order: Supabase CDN → auth.js → questions.js → app.js

const { createClient } = window.supabase;

const sb = createClient(
  'https://joyjjspwkiexpwcprmkc.supabase.co',
  'sb_publishable_9hQZsYmfqzbWC3PNMVrK1g_gvePHXzF'
);

let currentUser = null;

// ─── Init (call on DOMContentLoaded) ────────────────────────
// Returns the user if a session already exists (including
// after an OAuth redirect — Supabase parses the hash automatically)

async function initAuth() {
  const { data: { session } } = await sb.auth.getSession();
  currentUser = session?.user ?? null;

  sb.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user ?? null;
  });

  return currentUser;
}

function getCurrentUser() { return currentUser; }

// ─── Sign in ─────────────────────────────────────────────────

async function authSignInEmail(email, password) {
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

async function authSignInGoogle() {
  const { error } = await sb.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin }
  });
  if (error) throw error;
}

// ─── Sign up ─────────────────────────────────────────────────

async function authSignUp(email, password) {
  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) throw error;
  // If email confirmation is OFF, session is live immediately
  currentUser = data.session?.user ?? null;
  return data;
}

// ─── Sign out ────────────────────────────────────────────────

async function authSignOut() {
  await sb.auth.signOut();
  currentUser = null;
}

// ─── Save completed game ─────────────────────────────────────
// Called from showEndScreen() in app.js.
// Silently skips if user played as guest (not logged in).

async function saveGameSession(data) {
  if (!currentUser) return;
  const { error } = await sb.from('game_sessions').insert({
    user_id:             currentUser.id,
    p1_name:             data.p1Name,
    p2_name:             data.p2Name,
    mode:                data.mode,
    total_rounds:        data.totalRounds,
    questions_per_round: data.questionsPerRound,
    p1_score:            data.scores.p1,
    p2_score:            data.scores.p2,
    match_count:         data.matchCount,
    total_questions:     data.totalQuestions,
    compat_pct:          data.compatPct,
    best_streak:         data.maxStreak,
    spicy:               data.spicyEnabled,
    speed:               data.speedRound,
    game_type:           data.gameType || 'couples'
  });
  if (error) console.error('[Closer] save failed:', error.message);
}

// ─── Load history (for leaderboard) ─────────────────────────

async function loadGameHistory() {
  if (!currentUser) return [];
  const { data, error } = await sb
    .from('game_sessions')
    .select('*')
    .order('played_at', { ascending: false });
  if (error) { console.error('[Closer] load failed:', error.message); return []; }
  return data ?? [];
}
