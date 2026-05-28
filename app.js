const state = {
  p1Name: 'Partner 1',
  p2Name: 'Partner 2',
  mode: 'competitive',
  round: 1,
  totalRounds: 4,
  subjectPlayer: 1,
  roundQuestions: [],       // array[round] of question arrays
  questionsPerRound: 5,     // 5 standard, 6 with spicy
  subjectAnswers: [],
  guesserAnswers: [],
  currentQIndex: 0,
  scores: { p1: 0, p2: 0 },
  streak: 0,
  maxStreak: 0,
  roundResults: [],         // array[round] of result arrays
  speedRound: false,
  spicyEnabled: false,
  speedTimer: null,
  speedTimeLeft: 15
};

// ─── Utilities ───────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
  window.scrollTo(0, 0);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getSubjectPlayer() {
  // Odd rounds → original coin-flip winner; even rounds → flip
  return state.round % 2 === 1
    ? state.subjectPlayer
    : (state.subjectPlayer === 1 ? 2 : 1);
}

function getSubjectName() {
  return getSubjectPlayer() === 1 ? state.p1Name : state.p2Name;
}

function getGuesserName() {
  return getSubjectPlayer() === 1 ? state.p2Name : state.p1Name;
}

function getGuesserPlayer() {
  return getSubjectPlayer() === 1 ? 'p2' : 'p1';
}

function isSpeedRound() {
  return state.speedRound && state.round === state.totalRounds;
}

// ─── Question Selection ───────────────────────────────────────

function selectQuestions() {
  // Build active category list (spicy opt-in)
  const cats = Object.keys(QUESTION_BANK).filter(k => k !== 'spicy');
  if (state.spicyEnabled && QUESTION_BANK.spicy) cats.push('spicy');
  state.questionsPerRound = cats.length;

  // Shuffle each category independently
  const byCat = {};
  cats.forEach(cat => {
    byCat[cat] = shuffle(
      QUESTION_BANK[cat].questions.map(q => ({
        ...q, category: cat, categoryLabel: QUESTION_BANK[cat].label
      }))
    );
  });

  // One question per category per round; wrap if more rounds than questions
  state.roundQuestions = [];
  state.roundResults = [];
  for (let r = 0; r < state.totalRounds; r++) {
    const roundQs = cats.map(cat => {
      const pool = byCat[cat];
      return pool[r < pool.length ? r : r % pool.length];
    });
    state.roundQuestions.push(shuffle(roundQs));
    state.roundResults.push([]);
  }
}

function getCurrentQuestions() {
  return state.roundQuestions[state.round - 1];
}

// ─── Speed Timer ──────────────────────────────────────────────

function startSpeedTimer(timerElId, ringId, numId, onExpire) {
  clearSpeedTimer();
  state.speedTimeLeft = 15;
  updateTimerDisplay(ringId, numId, 15);
  const timerEl = document.getElementById(timerElId);
  if (timerEl) timerEl.style.display = 'flex';

  state.speedTimer = setInterval(() => {
    state.speedTimeLeft--;
    updateTimerDisplay(ringId, numId, state.speedTimeLeft);
    if (state.speedTimeLeft <= 0) {
      clearSpeedTimer();
      onExpire();
    }
  }, 1000);
}

function clearSpeedTimer() {
  if (state.speedTimer) {
    clearInterval(state.speedTimer);
    state.speedTimer = null;
  }
}

function updateTimerDisplay(ringId, numId, seconds) {
  const ring = document.getElementById(ringId);
  const num = document.getElementById(numId);
  if (ring) {
    ring.classList.remove('timer-urgent');
    if (seconds > 8) {
      ring.style.background = '#2D6E4E';
    } else if (seconds > 4) {
      ring.style.background = '#BF9447';
    } else {
      ring.style.background = '#C4756A';
      ring.classList.add('timer-urgent');
    }
  }
  if (num) num.textContent = seconds;
}

// ─── Setup UI helpers ────────────────────────────────────────

function selectRounds(n) {
  document.querySelectorAll('.rounds-btn').forEach(b => b.classList.remove('selected'));
  const btn = document.querySelector(`.rounds-btn[data-rounds="${n}"]`);
  if (btn) btn.classList.add('selected');
}

function toggleOption(id) {
  const cb = document.getElementById(`toggle-${id}`);
  const track = document.getElementById(`toggle-${id}-track`);
  const knob = document.getElementById(`toggle-${id}-knob`);
  if (!cb) return;
  cb.checked = !cb.checked;
  const activeColor = id === 'spicy' ? '#C4756A' : '#1E3A2F';
  if (track) track.style.background = cb.checked ? activeColor : '#D1C9BE';
  if (knob) knob.style.transform = cb.checked ? 'translateX(18px)' : 'translateX(0)';
}

// ─── Setup ────────────────────────────────────────────────────

function startGame() {
  const p1Input = document.getElementById('input-p1').value.trim();
  const p2Input = document.getElementById('input-p2').value.trim();
  state.p1Name = p1Input || 'Partner 1';
  state.p2Name = p2Input || 'Partner 2';

  const modeEl = document.querySelector('input[name="mode"]:checked');
  state.mode = modeEl ? modeEl.value : 'competitive';

  const roundsBtn = document.querySelector('.rounds-btn.selected');
  state.totalRounds = roundsBtn ? parseInt(roundsBtn.dataset.rounds) : 4;
  state.speedRound = document.getElementById('toggle-speed')?.checked || false;
  state.spicyEnabled = document.getElementById('toggle-spicy')?.checked || false;

  state.scores = { p1: 0, p2: 0 };
  state.streak = 0;
  state.maxStreak = 0;
  state.round = 1;

  selectQuestions();
  state.subjectPlayer = Math.random() < 0.5 ? 1 : 2;

  showCoinFlip();
}

// ─── Coin Flip ────────────────────────────────────────────────

function showCoinFlip() {
  showScreen('screen-coinflip');
  const subjectName = state.subjectPlayer === 1 ? state.p1Name : state.p2Name;
  document.getElementById('coinflip-subject').textContent = subjectName;
  document.getElementById('coinflip-reveal').style.opacity = '0';
  document.getElementById('coinflip-btn').style.display = 'none';

  const coin = document.getElementById('coin');
  coin.classList.remove('flipping');
  void coin.offsetWidth; // reflow
  coin.classList.add('flipping');

  setTimeout(() => {
    document.getElementById('coinflip-reveal').style.opacity = '1';
    document.getElementById('coinflip-btn').style.display = 'inline-flex';
  }, 1600);
}

// ─── Round Intro ──────────────────────────────────────────────

function showRoundIntro() {
  showScreen('screen-round-intro');
  const subject = getSubjectName();
  const guesser = getGuesserName();
  const speed = isSpeedRound();

  const roundTag = speed
    ? `⚡ Speed Round — ${state.round} of ${state.totalRounds}`
    : `Round ${state.round} of ${state.totalRounds}`;
  document.getElementById('round-intro-num').textContent = roundTag;
  document.getElementById('round-intro-headline').textContent = `Round ${state.round} is about ${subject}`;

  const desc = speed
    ? `Speed Round! ${subject} answers ${state.questionsPerRound} questions with only 15 seconds each. Answers lock, then ${guesser} does the same. Fast answers, same stakes.`
    : `${subject} answers ${state.questionsPerRound} questions about themselves. Their answers lock — hidden from you. Then ${guesser} guesses what ${subject} chose.`;
  document.getElementById('round-intro-desc').textContent = desc;
  document.getElementById('round-intro-btn').textContent = `Begin — ${subject} goes first`;

  state.subjectAnswers = [];
  state.guesserAnswers = [];
  state.currentQIndex = 0;
}

// ─── Subject Phase ────────────────────────────────────────────

function showSubjectQuestion() {
  showScreen('screen-subject');
  clearSpeedTimer();
  const q = getCurrentQuestions()[state.currentQIndex];
  const subject = getSubjectName();

  document.getElementById('subject-label').textContent = `${subject}, answer for yourself`;
  document.getElementById('subject-progress-text').textContent = `${state.currentQIndex + 1} of ${state.questionsPerRound}`;
  document.getElementById('subject-category-tag').textContent = q.categoryLabel;
  document.getElementById('subject-q-text').textContent = q.text;
  document.getElementById('subject-progress-bar').style.width = `${(state.currentQIndex / state.questionsPerRound) * 100}%`;

  // Hide timer by default; show only in speed round
  const timerEl = document.getElementById('subject-speed-timer');
  if (timerEl) timerEl.style.display = 'none';

  const container = document.getElementById('subject-options');
  container.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span style="flex-shrink:0;width:28px;height:28px;border-radius:50%;background:#F2EBE0;color:#5A5A5A;display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:700">${String.fromCharCode(65 + idx)}</span><span style="flex:1">${opt}</span>`;
    btn.onclick = () => lockSubjectAnswer(idx, btn, container);
    container.appendChild(btn);
  });

  if (isSpeedRound()) {
    startSpeedTimer('subject-speed-timer', 'subject-timer-ring', 'subject-timer-num', () => {
      const btns = container.querySelectorAll('.option-btn');
      if (btns.length && !btns[0].disabled) lockSubjectAnswer(0, btns[0], container);
    });
  }
}

function lockSubjectAnswer(idx, btn, container) {
  clearSpeedTimer();
  container.querySelectorAll('.option-btn').forEach((b, i) => {
    b.disabled = true;
    b.classList.toggle('selected', i === idx);
  });

  setTimeout(() => {
    state.subjectAnswers.push(idx);
    state.currentQIndex++;
    if (state.currentQIndex < state.questionsPerRound) {
      showSubjectQuestion();
    } else {
      showHandoff();
    }
  }, 380);
}

// ─── Handoff ──────────────────────────────────────────────────

function showHandoff() {
  showScreen('screen-handoff');
  const subject = getSubjectName();
  const guesser = getGuesserName();
  document.getElementById('handoff-locked').textContent = `${subject}'s answers are locked.`;
  document.getElementById('handoff-pass').textContent = `Pass the device to ${guesser}.`;
  document.getElementById('handoff-btn').textContent = `I'm ${guesser} — I'm ready`;
  state.currentQIndex = 0;
}

// ─── Guesser Phase ────────────────────────────────────────────

function showGuesserQuestion() {
  showScreen('screen-guesser');
  clearSpeedTimer();
  const q = getCurrentQuestions()[state.currentQIndex];
  const subject = getSubjectName();
  const guesser = getGuesserName();

  document.getElementById('guesser-label').textContent = `${guesser} — what would ${subject} choose?`;
  document.getElementById('guesser-progress-text').textContent = `${state.currentQIndex + 1} of ${state.questionsPerRound}`;
  document.getElementById('guesser-category-tag').textContent = q.categoryLabel;
  document.getElementById('guesser-q-text').textContent = q.text;
  document.getElementById('guesser-progress-bar').style.width = `${(state.currentQIndex / state.questionsPerRound) * 100}%`;

  const timerEl = document.getElementById('guesser-speed-timer');
  if (timerEl) timerEl.style.display = 'none';

  const container = document.getElementById('guesser-options');
  container.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span style="flex-shrink:0;width:28px;height:28px;border-radius:50%;background:#F2EBE0;color:#5A5A5A;display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:700">${String.fromCharCode(65 + idx)}</span><span style="flex:1">${opt}</span>`;
    btn.onclick = () => lockGuesserAnswer(idx, btn, container);
    container.appendChild(btn);
  });

  if (isSpeedRound()) {
    startSpeedTimer('guesser-speed-timer', 'guesser-timer-ring', 'guesser-timer-num', () => {
      const btns = container.querySelectorAll('.option-btn');
      if (btns.length && !btns[0].disabled) lockGuesserAnswer(0, btns[0], container);
    });
  }
}

function lockGuesserAnswer(idx, btn, container) {
  clearSpeedTimer();
  container.querySelectorAll('.option-btn').forEach((b, i) => {
    b.disabled = true;
    b.classList.toggle('selected', i === idx);
  });

  setTimeout(() => {
    state.guesserAnswers.push(idx);
    state.currentQIndex++;
    if (state.currentQIndex < state.questionsPerRound) {
      showGuesserQuestion();
    } else {
      startReveal();
    }
  }, 380);
}

// ─── Reveal ───────────────────────────────────────────────────

function startReveal() {
  state.currentQIndex = 0;
  showRevealQuestion();
}

function showRevealQuestion() {
  showScreen('screen-reveal');
  const q = getCurrentQuestions()[state.currentQIndex];
  const subjectIdx = state.subjectAnswers[state.currentQIndex];
  const guesserIdx = state.guesserAnswers[state.currentQIndex];
  const matched = subjectIdx === guesserIdx;
  const subject = getSubjectName();
  const guesser = getGuesserName();

  document.getElementById('reveal-progress').textContent = `${state.currentQIndex + 1} of ${state.questionsPerRound}`;
  document.getElementById('reveal-category-tag').textContent = q.categoryLabel;
  document.getElementById('reveal-q-text').textContent = q.text;

  const cardSubject = document.getElementById('reveal-card-subject');
  const cardGuesser = document.getElementById('reveal-card-guesser');
  const resultBanner = document.getElementById('reveal-result-banner');
  const nextBtn = document.getElementById('reveal-next-btn');

  cardSubject.className = 'reveal-card';
  cardGuesser.className = 'reveal-card';
  resultBanner.style.display = 'none';
  resultBanner.classList.remove('match', 'miss');
  nextBtn.style.display = 'none';

  document.getElementById('reveal-subject-name').textContent = `${subject}'s answer`;
  document.getElementById('reveal-guesser-name').textContent = `${guesser}'s guess`;
  document.getElementById('reveal-subject-answer').textContent = '—';
  document.getElementById('reveal-guesser-answer').textContent = '—';

  // Staggered reveal
  setTimeout(() => {
    document.getElementById('reveal-subject-answer').textContent = q.options[subjectIdx];
    cardSubject.classList.add('revealed');
  }, 600);

  setTimeout(() => {
    document.getElementById('reveal-guesser-answer').textContent = q.options[guesserIdx];
    cardGuesser.classList.add('revealed');
  }, 1200);

  setTimeout(() => {
    if (matched) {
      state.streak++;
      if (state.streak > state.maxStreak) state.maxStreak = state.streak;
      let pts = 100;
      if (state.streak >= 3) pts += 50;
      state.scores[getGuesserPlayer()] += pts;
      cardSubject.classList.add('match');
      cardGuesser.classList.add('match');
      setRevealBanner(true, pts, state.streak >= 3);
    } else {
      state.streak = 0;
      cardSubject.classList.add('miss');
      cardGuesser.classList.add('miss');
      setRevealBanner(false, 0, false);
    }

    // Store in current round's results array
    state.roundResults[state.round - 1].push({ matched, subjectIdx, guesserIdx, question: q });

    document.getElementById('reveal-p1-name').textContent = state.p1Name;
    document.getElementById('reveal-p2-name').textContent = state.p2Name;
    document.getElementById('reveal-p1-score').textContent = state.scores.p1;
    document.getElementById('reveal-p2-score').textContent = state.scores.p2;

    nextBtn.style.display = 'block';
  }, 1900);
}

function nextReveal() {
  state.currentQIndex++;
  if (state.currentQIndex < state.questionsPerRound) {
    showRevealQuestion();
  } else {
    showRoundSummary();
  }
}

// ─── Round Summary ────────────────────────────────────────────

function showRoundSummary() {
  showScreen('screen-round-summary');
  const results = state.roundResults[state.round - 1];
  const matchCount = results.filter(r => r.matched).length;
  const guesser = getGuesserName();
  const speed = isSpeedRound();

  document.getElementById('summary-heading').textContent = speed
    ? '⚡ Speed Round Complete'
    : `Round ${state.round} Complete`;
  document.getElementById('summary-match-stat').textContent = `${matchCount} of ${state.questionsPerRound} matched`;
  document.getElementById('summary-guesser').textContent = `${guesser} got ${matchCount} right`;

  const dots = document.getElementById('summary-dots');
  dots.innerHTML = '';
  results.forEach(r => {
    const d = document.createElement('span');
    d.className = 'inline-block rounded-full';
    d.style.cssText = `width:16px;height:16px;background:${r.matched ? '#2D6E4E' : '#D4A5A0'}`;
    d.title = r.question.text.slice(0, 40);
    dots.appendChild(d);
  });

  document.getElementById('summary-p1-label').textContent = state.p1Name;
  document.getElementById('summary-p2-label').textContent = state.p2Name;
  document.getElementById('summary-p1-pts').textContent = state.scores.p1;
  document.getElementById('summary-p2-pts').textContent = state.scores.p2;

  const nextBtn = document.getElementById('summary-next-btn');
  if (state.round < state.totalRounds) {
    const nextIsSpeed = state.speedRound && (state.round + 1) === state.totalRounds;
    nextBtn.textContent = nextIsSpeed
      ? `Start Round ${state.round + 1} ⚡`
      : `Start Round ${state.round + 1}`;
    nextBtn.onclick = goToNextRound;
  } else {
    nextBtn.textContent = 'See Final Results';
    nextBtn.onclick = showEndScreen;
  }
}

function goToNextRound() {
  state.round++;
  state.streak = 0;
  state.subjectAnswers = [];
  state.guesserAnswers = [];
  state.currentQIndex = 0;
  showRoundIntro();
}

// ─── End Screen ───────────────────────────────────────────────

function showEndScreen() {
  showScreen('screen-end');

  const allResults = state.roundResults.flat();
  const matchCount = allResults.filter(r => r.matched).length;
  const totalQuestions = state.totalRounds * state.questionsPerRound;
  const compatPct = Math.round((matchCount / totalQuestions) * 100);

  document.getElementById('end-compat-pct').textContent = `${compatPct}%`;
  document.getElementById('end-compat-label').textContent = getCompatLabel(compatPct);

  document.getElementById('end-p1-label').textContent = state.p1Name;
  document.getElementById('end-p2-label').textContent = state.p2Name;
  document.getElementById('end-p1-pts').textContent = state.scores.p1;
  document.getElementById('end-p2-pts').textContent = state.scores.p2;

  const winnerEl = document.getElementById('end-winner');
  if (state.mode === 'competitive') {
    if (state.scores.p1 > state.scores.p2) {
      winnerEl.textContent = `${state.p1Name} wins this round.`;
    } else if (state.scores.p2 > state.scores.p1) {
      winnerEl.textContent = `${state.p2Name} wins this round.`;
    } else {
      winnerEl.textContent = "It's a tie — you know each other equally well.";
    }
  } else {
    winnerEl.textContent = compatPct >= 70
      ? 'Strong session. You know each other well.'
      : 'Good session — some surprises in there.';
  }

  document.getElementById('end-matches').textContent = matchCount;
  document.getElementById('end-streak').textContent = state.maxStreak;

  triggerConfetti();
}

function getCompatLabel(pct) {
  if (pct === 100) return 'Perfect. You know each other completely.';
  if (pct >= 80) return 'You really know each other.';
  if (pct >= 60) return 'Strong connection — a few surprises.';
  if (pct >= 40) return 'More to discover together.';
  return 'Lots of room to learn each other.';
}

function playAgain() {
  state.scores = { p1: 0, p2: 0 };
  state.streak = 0;
  state.maxStreak = 0;
  state.round = 1;
  selectQuestions();
  state.subjectPlayer = Math.random() < 0.5 ? 1 : 2;
  showCoinFlip();
}

// ─── Confetti ─────────────────────────────────────────────────

function triggerConfetti() {
  const container = document.getElementById('confetti-container');
  container.innerHTML = '';
  const colors = ['#C4756A', '#1E3A2F', '#BF9447', '#E8D5C0', '#2D6E4E'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.animationDelay = Math.random() * 1.5 + 's';
    piece.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (6 + Math.random() * 8) + 'px';
    piece.style.height = (6 + Math.random() * 8) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    container.appendChild(piece);
  }
  setTimeout(() => { container.innerHTML = ''; }, 4000);
}

// ─── Mode Toggle UI ───────────────────────────────────────────

function selectMode(mode) {
  state.mode = mode;
  document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('selected'));
  document.getElementById(`mode-${mode}`).classList.add('selected');
  document.querySelectorAll('input[name="mode"]').forEach(r => {
    r.checked = r.value === mode;
  });
}

// ─── Init ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  showScreen('screen-landing');
});
