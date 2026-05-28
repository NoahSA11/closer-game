// leaderboard.js — fetch + render game history from Supabase
// Load order: auth.js → leaderboard.js → questions.js → app.js

// ─── Main entry (called from showLeaderboard in index.html inline script) ──

async function renderLeaderboard() {
  const sessions = await loadGameHistory();

  const tbody   = document.getElementById('lb-tbody');
  const table   = document.getElementById('lb-table');
  const empty   = document.getElementById('lb-empty');

  if (!sessions.length) {
    table.classList.add('hidden');
    empty.classList.remove('hidden');
    // Still clear stats
    document.getElementById('lb-stat-sessions').textContent = '0';
    document.getElementById('lb-stat-compat').textContent   = '—';
    document.getElementById('lb-stat-streak').textContent   = '—';
    return;
  }

  // ── Summary stats ──────────────────────────────────────
  const bestCompat  = Math.max(...sessions.map(s => s.compat_pct));
  const bestStreak  = Math.max(...sessions.map(s => s.best_streak));

  document.getElementById('lb-stat-sessions').textContent = sessions.length;
  document.getElementById('lb-stat-compat').textContent   = `${bestCompat}%`;
  document.getElementById('lb-stat-streak').textContent   = bestStreak;

  // ── Table rows ─────────────────────────────────────────
  tbody.innerHTML = '';
  sessions.forEach(s => {
    const isBest = s.compat_pct === bestCompat;
    const date   = new Date(s.played_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const mode   = s.mode === 'competitive' ? 'Competitive' : 'Cooperative';

    const tr = document.createElement('tr');
    tr.className = 'border-b border-[#E2D9CE] last:border-b-0 transition-colors hover:bg-cream';
    if (isBest) tr.style.borderLeft = '3px solid #C19A3E'; // gold accent on best session

    tr.innerHTML = `
      <td class="px-5 py-4 text-[#5A5A5A]">${date}</td>
      <td class="px-5 py-4 text-deep font-medium">${escHtml(s.p1_name)} &amp; ${escHtml(s.p2_name)}</td>
      <td class="px-5 py-4 text-[#9A9A9A]">${mode}${s.spicy ? ' · 🌶' : ''}${s.speed ? ' · ⚡' : ''}</td>
      <td class="px-5 py-4 text-center font-bold" style="color:${compatColor(s.compat_pct)}">${s.compat_pct}%</td>
      <td class="px-5 py-4 text-center text-[#9A9A9A]">${s.best_streak}x</td>
    `;
    tbody.appendChild(tr);
  });

  empty.classList.add('hidden');
  table.classList.remove('hidden');
}

// ─── Helpers ────────────────────────────────────────────────

function compatColor(pct) {
  if (pct >= 80) return '#2D6E4E';   // deep green
  if (pct >= 60) return '#C19A3E';   // gold
  if (pct >= 40) return '#8B6914';   // warm amber
  return '#8B4A3A';                  // muted red
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
