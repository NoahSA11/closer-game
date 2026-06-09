// challenge.js — "How well do you know me?" async challenge mode for Closer
// Load order: supabase CDN → auth.js → questions.js → challenge.js → app.js

const CHALLENGE_Q_COUNT = 10;

function chEsc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── State ──────────────────────────────────────────────────────
const chCreate = {
  questions: [], answers: [], qIndex: 0, creatorName: '', id: null
};
const chPlay = {
  challenge: null, playerName: '', guesses: [], qIndex: 0, result: null
};

// ── Question picker ────────────────────────────────────────────
function pickChallengeQuestions() {
  const pool = [];
  Object.entries(QUESTION_BANK).forEach(([key, cat]) => {
    if (key === 'spicy') return; // intimate partner questions — not appropriate for friend challenges
    cat.questions.forEach(q =>
      pool.push({ id: q.id, text: q.text, options: q.options, categoryLabel: cat.label })
    );
  });
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, CHALLENGE_Q_COUNT);
}

// ── Supabase helpers ───────────────────────────────────────────
async function chDbCreate({ creatorName, questions, answers }) {
  const user = getCurrentUser();
  const { data, error } = await sb.from('challenges').insert({
    creator_name: creatorName,
    questions,
    answers,
    show_leaderboard: true,
    ...(user ? { creator_id: user.id } : {})
  }).select('id').single();
  if (error) throw error;
  return data.id;
}

async function chDbLoad(id) {
  const { data, error } = await sb
    .from('challenges')
    .select('id, creator_name, questions, answers, show_leaderboard, expires_at')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

async function chDbSubmit({ challengeId, playerName, guesses, answers }) {
  const score = guesses.reduce((sum, g, i) => sum + (g === answers[i] ? 1 : 0), 0);
  const total = answers.length;
  const pct   = Math.round((score / total) * 100);

  const { error } = await sb.from('challenge_responses').insert({
    challenge_id: challengeId,
    player_name: playerName,
    guesses,
    score,
    total,
    pct
  });
  if (error) throw error;

  const [rankRes, totalRes] = await Promise.all([
    sb.from('challenge_responses').select('*', { count: 'exact', head: true })
      .eq('challenge_id', challengeId).gt('score', score),
    sb.from('challenge_responses').select('*', { count: 'exact', head: true })
      .eq('challenge_id', challengeId)
  ]);

  return {
    score, total, pct,
    rank: (rankRes.count ?? 0) + 1,
    totalPlayers: totalRes.count ?? 1
  };
}

async function chDbLeaderboard(challengeId) {
  const { data, error } = await sb
    .from('challenge_responses')
    .select('player_name, score, total, pct, played_at')
    .eq('challenge_id', challengeId)
    .order('score', { ascending: false })
    .limit(50);
  if (error) return [];
  return data ?? [];
}

// ── URL routing ────────────────────────────────────────────────
// Returns true if a ?c= param was found and we routed to challenge play.
// Called from app.js DOMContentLoaded before normal init.
async function challengeRouteOnLoad() {
  const id = new URLSearchParams(window.location.search).get('c');
  if (!id) return false;

  showScreen('screen-challenge-loading');
  try {
    const challenge = await chDbLoad(id);
    chPlay.challenge  = challenge;
    chPlay.guesses    = [];
    chPlay.qIndex     = 0;
    chPlay.playerName = '';
    chPlay.result     = null;
    chShowPlayIntro();
  } catch {
    showScreen('screen-challenge-error');
  }
  return true;
}

// ── Creation flow ──────────────────────────────────────────────
function challengeStartCreate() {
  chCreate.questions = pickChallengeQuestions();
  chCreate.answers   = new Array(CHALLENGE_Q_COUNT).fill(null);
  chCreate.qIndex    = 0;
  chCreate.id        = null;

  showScreen('screen-challenge-create');
  // Show name phase, hide question phase
  document.getElementById('ch-name-phase').style.display = 'flex';
  document.getElementById('ch-question-phase').style.display = 'none';
  document.getElementById('ch-creator-name').value = '';
  document.getElementById('ch-name-error').classList.add('hidden');
}

function challengeBeginAnswering() {
  const nameEl = document.getElementById('ch-creator-name');
  const name   = nameEl.value.trim();
  if (!name) {
    document.getElementById('ch-name-error').textContent = 'Enter your name to continue.';
    document.getElementById('ch-name-error').classList.remove('hidden');
    return;
  }
  chCreate.creatorName = name;
  document.getElementById('ch-name-phase').style.display    = 'none';
  document.getElementById('ch-question-phase').style.display = 'block';
  chRenderCreateQuestion();
}

function chRenderCreateQuestion() {
  const q     = chCreate.questions[chCreate.qIndex];
  const idx   = chCreate.qIndex;
  const total = chCreate.questions.length;

  document.getElementById('ch-progress-text').textContent = `${idx + 1} of ${total}`;
  document.getElementById('ch-progress-bar').style.transform = `scaleX(${(idx + 1) / total})`;
  document.getElementById('ch-category-tag').textContent = q.categoryLabel;
  document.getElementById('ch-q-text').textContent = q.text;

  const opts = document.getElementById('ch-options');
  opts.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    const selected = chCreate.answers[idx] === i;
    btn.className = 'option-btn' + (selected ? ' selected' : '');
    btn.innerHTML = `<span class="option-letter w-7 h-7 rounded-full bg-[#F0EBE4] text-deep text-xs font-bold flex items-center justify-center flex-shrink-0">${String.fromCharCode(65 + i)}</span><span>${opt}</span>`;
    btn.onclick = () => {
      chCreate.answers[idx] = i;
      chRenderCreateQuestion();
    };
    opts.appendChild(btn);
  });

  const wrap = document.getElementById('ch-confirm-wrap');
  wrap.classList.toggle('hidden', chCreate.answers[idx] === null);

  const confirmBtn = document.getElementById('ch-confirm-btn');
  if (confirmBtn) {
    confirmBtn.textContent = idx === total - 1 ? 'Finish & Create Challenge →' : 'Lock In Answer →';
    confirmBtn.disabled = false;
  }

  document.getElementById('ch-create-error').classList.add('hidden');
}

async function challengeConfirmAnswer() {
  if (chCreate.answers[chCreate.qIndex] === null) return;

  if (chCreate.qIndex < chCreate.questions.length - 1) {
    chCreate.qIndex++;
    chRenderCreateQuestion();
    return;
  }

  const btn = document.getElementById('ch-confirm-btn');
  btn.disabled    = true;
  btn.textContent = 'Creating challenge…';

  try {
    const id = await chDbCreate({
      creatorName: chCreate.creatorName,
      questions:   chCreate.questions,
      answers:     chCreate.answers
    });
    chCreate.id = id;
    chShowShare();
  } catch {
    btn.disabled    = false;
    btn.textContent = 'Finish & Create Challenge →';
    const errEl = document.getElementById('ch-create-error');
    errEl.textContent = 'Something went wrong. Please try again.';
    errEl.classList.remove('hidden');
  }
}

function chShowShare() {
  showScreen('screen-challenge-share');
  const url = `${window.location.origin}${window.location.pathname}?c=${chCreate.id}`;
  document.getElementById('cs-title').textContent = `${chCreate.creatorName}'s Challenge`;
  document.getElementById('cs-link').value = url;
  document.getElementById('cs-q-count').textContent = chCreate.questions.length;
  document.getElementById('cs-copy-btn').textContent = 'Copy Link';
}

function challengeCopyLink() {
  const url = document.getElementById('cs-link').value;
  const btn = document.getElementById('cs-copy-btn');
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      btn.textContent = '✓ Copied!';
      setTimeout(() => { btn.textContent = 'Copy Link'; }, 2500);
    });
  } else {
    document.getElementById('cs-link').select();
    document.execCommand('copy');
    btn.textContent = '✓ Copied!';
    setTimeout(() => { btn.textContent = 'Copy Link'; }, 2500);
  }
}

// ── Play flow ─────────────────────────────────────────────────
function chShowPlayIntro() {
  showScreen('screen-challenge-play-intro');
  const c = chPlay.challenge;
  document.getElementById('cp-intro-creator').textContent = c.creator_name;
  document.getElementById('cp-intro-q-count').textContent = c.questions.length;
  document.getElementById('cp-player-name').value = '';
  document.getElementById('cp-name-error').classList.add('hidden');
}

function challengeStartPlay() {
  const nameEl = document.getElementById('cp-player-name');
  const name   = nameEl.value.trim();
  if (!name) {
    const err = document.getElementById('cp-name-error');
    err.textContent = 'Enter your name to continue.';
    err.classList.remove('hidden');
    return;
  }
  chPlay.playerName = name;
  chPlay.qIndex     = 0;
  chPlay.guesses    = new Array(chPlay.challenge.questions.length).fill(null);
  chRenderPlayQuestion();
}

function chRenderPlayQuestion() {
  showScreen('screen-challenge-play');
  const q     = chPlay.challenge.questions[chPlay.qIndex];
  const idx   = chPlay.qIndex;
  const total = chPlay.challenge.questions.length;
  const creator = chPlay.challenge.creator_name;

  document.getElementById('cp-progress-text').textContent = `${idx + 1} of ${total}`;
  document.getElementById('cp-progress-bar').style.transform = `scaleX(${(idx + 1) / total})`;
  document.getElementById('cp-category-tag').textContent = q.categoryLabel;
  document.getElementById('cp-creator-label').textContent = `What would ${creator} choose?`;

  const qText = document.getElementById('cp-q-text');
  qText.textContent = q.text;

  const opts = document.getElementById('cp-options');
  opts.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    const selected = chPlay.guesses[idx] === i;
    btn.className = 'option-btn' + (selected ? ' selected' : '');
    btn.innerHTML = `<span class="option-letter w-7 h-7 rounded-full bg-[#F0EBE4] text-deep text-xs font-bold flex items-center justify-center flex-shrink-0">${String.fromCharCode(65 + i)}</span><span>${opt}</span>`;
    btn.onclick = () => {
      chPlay.guesses[idx] = i;
      chRenderPlayQuestion();
    };
    opts.appendChild(btn);
  });

  const wrap = document.getElementById('cp-confirm-wrap');
  wrap.classList.toggle('hidden', chPlay.guesses[idx] === null);

  const confirmBtn = document.getElementById('cp-confirm-btn');
  if (confirmBtn) {
    confirmBtn.textContent = idx === total - 1 ? 'Submit →' : 'Lock In Guess →';
    confirmBtn.disabled = false;
  }
}

async function challengeConfirmGuess() {
  if (chPlay.guesses[chPlay.qIndex] === null) return;

  if (chPlay.qIndex < chPlay.challenge.questions.length - 1) {
    chPlay.qIndex++;
    chRenderPlayQuestion();
    return;
  }

  const btn = document.getElementById('cp-confirm-btn');
  btn.disabled    = true;
  btn.textContent = 'Submitting…';

  try {
    const result = await chDbSubmit({
      challengeId: chPlay.challenge.id,
      playerName:  chPlay.playerName,
      guesses:     chPlay.guesses,
      answers:     chPlay.challenge.answers
    });
    chPlay.result = result;
    await chShowResult();
  } catch {
    btn.disabled    = false;
    btn.textContent = 'Submit →';
  }
}

async function chShowResult() {
  showScreen('screen-challenge-result');
  const { score, total, pct, rank, totalPlayers } = chPlay.result;
  const creator = chPlay.challenge.creator_name;

  document.getElementById('cr-score').textContent    = `${score}/${total}`;
  document.getElementById('cr-pct').textContent      = `${pct}%`;
  document.getElementById('cr-creator').textContent  = creator;

  const rankEl = document.getElementById('cr-rank');
  if (totalPlayers > 1) {
    rankEl.textContent = `#${rank} of ${totalPlayers} ${totalPlayers === 1 ? 'player' : 'players'}`;
    rankEl.classList.remove('hidden');
  } else {
    rankEl.classList.add('hidden');
  }

  const emojiEl = document.getElementById('cr-emoji');
  if (pct >= 90)      emojiEl.textContent = '🏆';
  else if (pct >= 70) emojiEl.textContent = '🎉';
  else if (pct >= 50) emojiEl.textContent = '💪';
  else                emojiEl.textContent = '😅';

  // Question breakdown — always rendered, no network call needed
  chRenderBreakdown();

  if (chPlay.challenge.show_leaderboard) {
    const board = await chDbLeaderboard(chPlay.challenge.id);
    chRenderLeaderboard(board);
  } else {
    document.getElementById('cr-leaderboard-wrap').classList.add('hidden');
  }
}

function chRenderBreakdown() {
  const list    = document.getElementById('cr-breakdown-list');
  const qs      = chPlay.challenge.questions;
  const answers = chPlay.challenge.answers;
  const guesses = chPlay.guesses;

  list.innerHTML = qs.map((q, i) => {
    const correct     = guesses[i] === answers[i];
    const guessText   = chEsc(q.options[guesses[i]] ?? '—');
    const correctText = chEsc(q.options[answers[i]] ?? '—');
    const isLast      = i === qs.length - 1;

    return `<div class="py-4 ${isLast ? '' : 'border-b border-[#F0EBE4]'}">
      <div class="flex items-start gap-3">
        <span class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5 ${correct ? 'bg-[#EBF5EF] text-[#2D6E4E]' : 'bg-[#F9EEEC] text-[#8B4A3A]'}">${correct ? '✓' : '✗'}</span>
        <div class="flex-1 min-w-0">
          <p class="text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-1">${chEsc(q.categoryLabel)}</p>
          <p class="text-sm font-medium text-deep leading-snug mb-2">${chEsc(q.text)}</p>
          <span class="text-xs px-3 py-1.5 rounded-lg font-medium ${correct ? 'bg-[#EBF5EF] text-[#2D6E4E]' : 'bg-[#F9EEEC] text-[#8B4A3A]'}">You guessed: ${guessText}</span>
          ${!correct ? `<br><span class="text-xs px-3 py-1.5 rounded-lg font-medium bg-[#FFF8EC] text-[#92600A] inline-block mt-1.5">They chose: ${correctText}</span>` : ''}
        </div>
      </div>
    </div>`;
  }).join('');
}

function chRenderLeaderboard(board) {
  const wrap = document.getElementById('cr-leaderboard-wrap');
  const list = document.getElementById('cr-leaderboard-list');
  if (!board.length) { wrap.classList.add('hidden'); return; }
  wrap.classList.remove('hidden');
  const medals = ['🥇', '🥈', '🥉'];
  list.innerHTML = board.map((r, i) => {
    const isMe  = r.player_name === chPlay.playerName;
    const medal = medals[i] || `${i + 1}.`;
    const name  = chEsc(r.player_name);
    return `<div class="flex items-center justify-between py-2.5 ${i < board.length - 1 ? 'border-b border-[#E2D9CE]' : ''}">
      <span class="flex items-center gap-2 text-sm ${isMe ? 'font-bold text-deep' : 'text-[#5A5A5A]'}">
        <span>${medal}</span>
        <span>${name}${isMe ? ' <span class="text-xs font-normal text-[#9A9A9A]">(you)</span>' : ''}</span>
      </span>
      <span class="text-sm font-semibold ${isMe ? 'text-deep' : 'text-[#9A9A9A]'}">${r.score}/${r.total}</span>
    </div>`;
  }).join('');
}
