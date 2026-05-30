// leaderboard.js — fetch + render game history from Supabase
// Load order: auth.js → leaderboard.js → questions.js → app.js

// ─── Main entry (called from showLeaderboard in index.html inline script) ──

async function renderLeaderboard() {
  const loading = document.getElementById('lb-loading');
  const statsRow = document.getElementById('lb-stats-row');
  const tableWrap = document.getElementById('lb-table-wrap');
  if (loading)   { loading.classList.remove('hidden'); }
  if (statsRow)  { statsRow.style.opacity = '0.4'; }
  if (tableWrap) { tableWrap.style.opacity = '0.4'; }

  const sessions = await loadGameHistory();

  if (loading)   { loading.classList.add('hidden'); }
  if (statsRow)  { statsRow.style.opacity = ''; }
  if (tableWrap) { tableWrap.style.opacity = ''; }

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
    const mode      = s.mode === 'competitive' ? 'Competitive' : 'Cooperative';
    const typeLabel = s.game_type === 'friends'
      ? '<span class="inline-block text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-deep/10 text-deep ml-1">Friends</span>'
      : '';

    const tr = document.createElement('tr');
    tr.className = 'border-b border-[#E2D9CE] last:border-b-0 transition-colors hover:bg-cream';
    if (isBest) tr.style.borderLeft = '3px solid #C19A3E'; // gold accent on best session

    tr.innerHTML = `
      <td class="px-5 py-4 text-[#5A5A5A]">${date}</td>
      <td class="px-5 py-4 text-deep font-medium">${escHtml(s.p1_name)} &amp; ${escHtml(s.p2_name)}</td>
      <td class="px-5 py-4 text-[#9A9A9A]">${mode}${typeLabel}${s.spicy ? ' · 🌶' : ''}${s.speed ? ' · ⚡' : ''}</td>
      <td class="px-5 py-4 text-center font-bold" style="color:${compatColor(s.compat_pct)}">${s.compat_pct}%</td>
      <td class="px-5 py-4 text-center text-[#9A9A9A]">${s.best_streak}x</td>
    `;
    tbody.appendChild(tr);
  });

  // Fix 24: trend sparkline
  renderSparkline(sessions);

  empty.classList.add('hidden');
  table.classList.remove('hidden');
}

// ─── Fix 24: Sparkline ────────────────────────────────────────

function renderSparkline(sessions) {
  const wrap    = document.getElementById('lb-sparkline-wrap');
  const svgWrap = document.getElementById('lb-sparkline-svg-wrap');
  const trendEl = document.getElementById('lb-sparkline-trend');
  if (!wrap || !svgWrap) return;

  // Require at least 3 sessions before showing
  if (sessions.length < 3) {
    wrap.classList.add('hidden');
    return;
  }

  // sessions sorted newest-first → reverse to get chronological order
  const last5 = sessions.slice(0, 5).reverse();
  const n     = last5.length;

  const W = 300, H = 60, PAD_X = 18, PAD_Y = 12;

  // Map each session to (x, y)
  const pts = last5.map((s, i) => ({
    x:   PAD_X + (n === 1 ? (W - 2 * PAD_X) / 2 : (i / (n - 1)) * (W - 2 * PAD_X)),
    y:   H - PAD_Y - (s.compat_pct / 100) * (H - 2 * PAD_Y),
    pct: s.compat_pct
  }));

  // Trend label
  const diff = pts[pts.length - 1].pct - pts[0].pct;
  if (trendEl) {
    if (diff > 0)       { trendEl.textContent = `↑ +${diff}% over ${n} games`; trendEl.style.color = '#2D6E4E'; }
    else if (diff < 0)  { trendEl.textContent = `↓ ${diff}% over ${n} games`;  trendEl.style.color = '#C4756A'; }
    else                { trendEl.textContent = `Steady over ${n} games`;       trendEl.style.color = '#9A9A9A'; }
  }

  // Polyline points string
  const polyPts = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  // Area fill polygon: line + bottom-right + bottom-left
  const fillPts = [
    ...pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`),
    `${pts[pts.length - 1].x.toFixed(1)},${H}`,
    `${pts[0].x.toFixed(1)},${H}`
  ].join(' ');

  // Grid lines at 25 / 50 / 75 %
  const gridLines = [25, 50, 75].map(pct => {
    const gy = H - PAD_Y - (pct / 100) * (H - 2 * PAD_Y);
    return `<line x1="${PAD_X - 4}" y1="${gy.toFixed(1)}" x2="${W - PAD_X + 4}" y2="${gy.toFixed(1)}"
              stroke="#E2D9CE" stroke-width="1" stroke-dasharray="3,3"/>
            <text x="${PAD_X - 6}" y="${(gy + 3).toFixed(1)}" text-anchor="end"
              font-size="7" fill="#C0B8AF">${pct}</text>`;
  }).join('');

  // Dots + percent labels
  const dots = pts.map(p => `
    <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="${compatColor(p.pct)}" stroke="white" stroke-width="2"/>
    <text x="${p.x.toFixed(1)}" y="${(p.y - 8).toFixed(1)}" text-anchor="middle"
      font-size="9" font-weight="600" fill="${compatColor(p.pct)}">${p.pct}%</text>
  `).join('');

  svgWrap.innerHTML = `
    <svg viewBox="0 0 ${W} ${H + 16}" class="w-full" style="overflow:visible">
      <defs>
        <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1E3A2F" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#1E3A2F" stop-opacity="0"/>
        </linearGradient>
      </defs>
      ${gridLines}
      <polygon points="${fillPts}" fill="url(#spark-grad)"/>
      <polyline points="${polyPts}" fill="none" stroke="#1E3A2F" stroke-width="2.5"
        stroke-linejoin="round" stroke-linecap="round"/>
      ${dots}
    </svg>`;

  wrap.classList.remove('hidden');
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
