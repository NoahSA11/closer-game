// challenge.js — "How well do you know me?" async challenge mode for Closer
// Load order: supabase CDN → auth.js → questions.js → challenge.js → app.js

const CHALLENGE_Q_COUNT = 10;

function chEsc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── State ──────────────────────────────────────────────────────
const chCreate = {
  questions: [], answers: [], qIndex: 0, creatorName: '', id: null,
  pool: []  // full shuffled question pool — used for swap
};
const chPlay = {
  challenge: null, playerName: '', guesses: [], qIndex: 0, result: null
};

// ── Question picker ────────────────────────────────────────────
// Returns full shuffled pool (deep-cloned options so edits never mutate QUESTION_BANK)
function buildChallengePool() {
  const pool = [];
  Object.entries(QUESTION_BANK).forEach(([key, cat]) => {
    if (key === 'spicy') return; // intimate partner questions — not appropriate for friend challenges
    cat.questions.forEach(q =>
      pool.push({ id: q.id, text: q.text, options: [...q.options], categoryLabel: cat.label })
    );
  });
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
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
    .select('id, creator_name, creator_id, questions, answers, show_leaderboard, expires_at')
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
    // Creator detection: auth match (any device) OR localStorage flag (same device, anon)
    const currentUser = getCurrentUser();
    let isCreator = (currentUser && challenge.creator_id && challenge.creator_id === currentUser.id);
    if (!isCreator) { try { isCreator = !!localStorage.getItem('closer-created-' + id); } catch {} }
    if (isCreator) {
      await chShowCreatorDashboard();
    } else {
      chShowPlayIntro();
    }
  } catch {
    showScreen('screen-challenge-error');
  }
  return true;
}

// ── Creation flow ──────────────────────────────────────────────
function challengeStartCreate() {
  const pool         = buildChallengePool();
  chCreate.pool      = pool;                                                    // originals, never mutated
  chCreate.questions = pool.slice(0, CHALLENGE_Q_COUNT)
    .map(q => ({ ...q, options: [...q.options] }));                             // editable clones
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

  // Rebuild card: category + question text + edit pencil + swap button
  document.getElementById('ch-question-card').innerHTML = `
    <span class="inline-block bg-rose/15 text-rose text-[11px] font-bold uppercase tracking-[0.08em] px-3 py-1 rounded-full mb-4">${chEsc(q.categoryLabel)}</span>
    <div class="flex items-start gap-2">
      <p id="ch-q-text" class="font-serif text-2xl font-medium text-deep leading-snug flex-1">${chEsc(q.text)}</p>
      <button onclick="chStartEditQuestion()" class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F0EBE4] transition-colors text-base mt-0.5" title="Edit question">✏️</button>
    </div>
    <button onclick="chSwapQuestion()" class="mt-3 text-xs text-[#9A9A9A] hover:text-[#C4756A] flex items-center gap-1.5 transition-colors cursor-pointer font-medium">
      <span class="text-sm">↻</span> Try a different question
    </button>
  `;

  // Options — absolute-positioned pencil overlays right side of each button
  const opts = document.getElementById('ch-options');
  opts.innerHTML = '';
  q.options.forEach((opt, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'relative';
    wrapper.dataset.opt = i;

    const btn = document.createElement('button');
    const selected = chCreate.answers[idx] === i;
    btn.className = 'option-btn' + (selected ? ' selected' : '');
    btn.innerHTML = `<span class="option-letter w-7 h-7 rounded-full bg-[#F0EBE4] text-deep text-xs font-bold flex items-center justify-center flex-shrink-0">${String.fromCharCode(65 + i)}</span><span class="opt-text pr-8">${chEsc(opt)}</span>`;
    btn.onclick = () => {
      chCreate.answers[idx] = i;
      chRenderCreateQuestion();
    };

    const editBtn = document.createElement('button');
    editBtn.className = 'absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white/70 hover:bg-[#F0EBE4] transition-colors text-xs z-10';
    editBtn.title = 'Edit this answer';
    editBtn.textContent = '✏️';
    editBtn.onclick = (e) => { e.stopPropagation(); chStartEditOption(i); };

    wrapper.appendChild(btn);
    wrapper.appendChild(editBtn);
    opts.appendChild(wrapper);
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

// ── Challenge creation — swap / edit controls ──────────────────
function chSwapQuestion() {
  const activeIds = new Set(chCreate.questions.map(q => q.id));
  const available = chCreate.pool.filter(q => !activeIds.has(q.id));
  if (!available.length) {
    const errEl = document.getElementById('ch-create-error');
    errEl.textContent = 'No more questions available to swap in.';
    errEl.classList.remove('hidden');
    return;
  }
  const pick = available[Math.floor(Math.random() * available.length)];
  chCreate.questions[chCreate.qIndex] = { ...pick, options: [...pick.options] };
  chCreate.answers[chCreate.qIndex]   = null; // reset — new options, old index invalid
  chRenderCreateQuestion();
}

function chStartEditQuestion() {
  const el = document.getElementById('ch-q-text');
  if (!el || el.tagName === 'INPUT') return; // already editing
  const idx = chCreate.qIndex;
  const input = document.createElement('input');
  input.type      = 'text';
  input.className = 'font-serif text-2xl font-medium text-deep leading-snug flex-1 border-b-2 border-[#C4756A] bg-transparent outline-none pb-1 w-full';
  input.value     = chCreate.questions[idx].text;
  el.replaceWith(input);
  input.focus();
  input.select();
  const restore = () => {
    const p = document.createElement('p');
    p.id        = 'ch-q-text';
    p.className = 'font-serif text-2xl font-medium text-deep leading-snug flex-1';
    p.textContent = chCreate.questions[idx].text;
    input.replaceWith(p);
  };
  input.addEventListener('blur', () => {
    const val = input.value.trim();
    if (val) chCreate.questions[idx].text = val;
    restore();
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter')  { e.preventDefault(); input.blur(); }
    if (e.key === 'Escape') { restore(); }
  });
}

function chStartEditOption(optIdx) {
  const idx     = chCreate.qIndex;
  const optSpan = document.querySelector(`#ch-options [data-opt="${optIdx}"] .opt-text`);
  if (!optSpan) return;
  const input   = document.createElement('input');
  input.type    = 'text';
  input.className = 'flex-1 min-w-0 text-sm text-deep border-b border-[#C4756A] bg-transparent outline-none py-0.5 pr-8';
  input.value   = chCreate.questions[idx].options[optIdx];
  optSpan.replaceWith(input);
  input.focus();
  input.select();
  const restore = () => {
    const span = document.createElement('span');
    span.className  = 'opt-text pr-8';
    span.textContent = chCreate.questions[idx].options[optIdx];
    input.replaceWith(span);
  };
  input.addEventListener('blur', () => {
    const val = input.value.trim();
    if (val) chCreate.questions[idx].options[optIdx] = val;
    restore();
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter')  { e.preventDefault(); input.blur(); }
    if (e.key === 'Escape') { restore(); }
  });
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
  // Flag this device as the creator so revisiting the link shows the dashboard
  try { localStorage.setItem('closer-created-' + chCreate.id, '1'); } catch {}
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

// ── Creator dashboard ─────────────────────────────────────────
async function chShowCreatorDashboard() {
  showScreen('screen-challenge-creator');
  const c = chPlay.challenge;
  document.getElementById('ccd-title').textContent = c.creator_name + "'s Challenge";
  document.getElementById('ccd-summary').textContent = 'Loading…';

  const { data } = await sb.from('challenge_responses')
    .select('player_name, score, total, pct, guesses, played_at')
    .eq('challenge_id', c.id)
    .order('score', { ascending: false })
    .limit(100);

  const responses = data ?? [];
  const n = responses.length;
  const avg = n ? Math.round(responses.reduce((s, r) => s + r.pct, 0) / n) : 0;
  document.getElementById('ccd-summary').textContent =
    `${n} ${n === 1 ? 'friend' : 'friends'} played · avg ${avg}%`;

  chRenderCreatorLeaderboard(responses);
  chRenderCreatorQuestionStats(responses);
}

function chRenderCreatorLeaderboard(responses) {
  const list = document.getElementById('ccd-leaderboard');
  if (!responses.length) {
    list.innerHTML = '<p class="text-sm text-[#9A9A9A] text-center py-4">No one has played yet — share the link!</p>';
    return;
  }
  const medals = ['🥇', '🥈', '🥉'];
  list.innerHTML = responses.map((r, i) =>
    `<div class="flex items-center justify-between py-2.5 ${i < responses.length - 1 ? 'border-b border-[#E2D9CE]' : ''}">
      <span class="flex items-center gap-2 text-sm text-[#5A5A5A]">
        <span>${medals[i] || (i + 1) + '.'}</span>
        <span>${chEsc(r.player_name)}</span>
      </span>
      <span class="text-sm font-semibold text-[#9A9A9A]">${r.score}/${r.total} · ${r.pct}%</span>
    </div>`
  ).join('');
}

function chRenderCreatorQuestionStats(responses) {
  const wrap = document.getElementById('ccd-questions-wrap');
  const list = document.getElementById('ccd-questions');
  if (!responses.length) { wrap.classList.add('hidden'); return; }
  wrap.classList.remove('hidden');

  const qs      = chPlay.challenge.questions;
  const answers = chPlay.challenge.answers;
  const n       = responses.length;

  list.innerHTML = qs.map((q, i) => {
    const correct = responses.filter(r => Array.isArray(r.guesses) && r.guesses[i] === answers[i]).length;
    const pct     = Math.round((correct / n) * 100);
    const isLast  = i === qs.length - 1;
    const good    = pct >= 60;
    return `<div class="py-3.5 ${isLast ? '' : 'border-b border-[#F0EBE4]'}">
      <div class="flex items-start justify-between gap-3 mb-2">
        <div class="flex-1 min-w-0">
          <p class="text-[10px] font-bold uppercase tracking-wider text-[#9A9A9A] mb-0.5">${chEsc(q.categoryLabel)}</p>
          <p class="text-sm font-medium text-deep leading-snug">${chEsc(q.text)}</p>
        </div>
        <span class="flex-shrink-0 text-sm font-bold ${good ? 'text-[#2D6E4E]' : 'text-[#8B4A3A]'}">${pct}%</span>
      </div>
      <div class="h-1.5 bg-[#E2D9CE] rounded-full overflow-hidden">
        <div class="h-full rounded-full ${good ? 'bg-[#2D6E4E]' : 'bg-[#C4756A]'}" style="width:${pct}%"></div>
      </div>
      <p class="text-[10px] text-[#9A9A9A] mt-1">${correct}/${n} got this right · Your answer: ${chEsc(q.options[answers[i]])}</p>
    </div>`;
  }).join('');
}

// ── My Challenges (setup screen shortcut) ─────────────────────
let chMyChallengesList = [];

async function chInitMyChallengesButton() {
  const btn   = document.getElementById('ch-my-challenges-btn');
  const label = document.getElementById('ch-my-ch-label');
  if (!btn) return;

  let found = [];

  // Always check localStorage first (same device, any auth state)
  try {
    found = Object.keys(localStorage)
      .filter(k => k.startsWith('closer-created-'))
      .map(k => ({ id: k.replace('closer-created-', '') }));
  } catch {}

  // Auth-based: works on any device — use getUser() for guaranteed fresh session
  const { data: { user } } = await sb.auth.getUser();
  if (user) {
    const { data } = await sb.from('challenges')
      .select('id, creator_name, created_at')
      .eq('creator_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);
    if (data?.length) {
      const existingIds = new Set(found.map(c => c.id));
      data.forEach(c => { if (!existingIds.has(c.id)) found.push(c); });
    }
  }

  if (!found.length) return;

  chMyChallengesList = found;
  const n = found.length;
  label.textContent = n === 1 ? '📊 See how friends did' : `📊 My Challenges (${n})`;
  btn.classList.remove('hidden');
}

// Re-run when auth state changes (handles session restore after redirect)
sb.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_IN') chInitMyChallengesButton();
});

async function chOpenMyChallenge() {
  if (!chMyChallengesList.length) return;
  const { id } = chMyChallengesList[0]; // most recent
  showScreen('screen-challenge-loading');
  try {
    const challenge   = await chDbLoad(id);
    chPlay.challenge  = challenge;
    chPlay.guesses    = [];
    chPlay.qIndex     = 0;
    chPlay.playerName = '';
    chPlay.result     = null;
    await chShowCreatorDashboard();
  } catch {
    showScreen('screen-challenge-error');
  }
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
