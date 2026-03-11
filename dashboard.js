/* ============================================================
   LIVE DASHBOARD — Bitcoin + Trump Tweets
   ============================================================ */

const COINGECKO = 'https://api.coingecko.com/api/v3';

let chart = null;
let currentDays = 1;
let countdownValue = 60;
let countdownTimer = null;

/* ── Demo tweets (Twitter API kräver backend/server) ── */
const DEMO_TWEETS = [
  {
    id: 1,
    text: "We are bringing JOBS back to America like never before seen. The tariffs are working, our economy is BOOMING, and the Silent Majority knows it. MAKE AMERICA GREAT AGAIN! 🇺🇸",
    time: "43m",
    rawTime: Date.now() - 43 * 60 * 1000,
    likes: 312841,
    retweets: 52934,
    replies: 28491,
  },
  {
    id: 2,
    text: "Bitcoin is through the roof. When I was in the White House, our markets reached heights NOBODY thought possible. We will do it again — and this time EVEN BIGGER!",
    time: "2h",
    rawTime: Date.now() - 2 * 60 * 60 * 1000,
    likes: 198234,
    retweets: 31849,
    replies: 14022,
  },
  {
    id: 3,
    text: "The Fake News Media refuses to cover our GREAT SUCCESS. They are truly the enemy of the people. The American public sees through their lies — that's why our poll numbers are RECORD HIGH!",
    time: "4h",
    rawTime: Date.now() - 4 * 60 * 60 * 1000,
    likes: 287453,
    retweets: 41829,
    replies: 19384,
  },
  {
    id: 4,
    text: "Just spoke with world leaders who all respect America again. Under my leadership, the USA is STRONG. No more being pushed around. AMERICA FIRST — always and forever!",
    time: "6h",
    rawTime: Date.now() - 6 * 60 * 60 * 1000,
    likes: 178293,
    retweets: 22841,
    replies: 9234,
  },
  {
    id: 5,
    text: "THANK YOU to all the incredible Patriots who came out today. The crowds were the LARGEST ever seen — bigger than anyone thought possible! We love you, and together we will WIN! 🇺🇸❤️",
    time: "9h",
    rawTime: Date.now() - 9 * 60 * 60 * 1000,
    likes: 145823,
    retweets: 19284,
    replies: 8127,
  },
];

/* ============================================================
   CLOCK
   ============================================================ */
function updateClock() {
  const el = document.getElementById('navClock');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('sv-SE');
}
setInterval(updateClock, 1000);
updateClock();

/* ============================================================
   FORMAT HELPERS
   ============================================================ */
function fmtUSD(n) {
  if (n >= 1e12) return '$' + (n / 1e12).toFixed(2) + 'T';
  if (n >= 1e9)  return '$' + (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6)  return '$' + (n / 1e6).toFixed(2) + 'M';
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtPrice(n) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtNum(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return n.toString();
}

function fmtTime(ts, days) {
  const d = new Date(ts);
  if (days <= 1) {
    return d.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
  }
  return d.toLocaleDateString('sv-SE', { month: 'short', day: 'numeric' });
}

/* ============================================================
   BITCOIN PRICE — CoinGecko free API
   ============================================================ */
async function fetchBTCPrice() {
  const url = `${COINGECKO}/simple/price?ids=bitcoin&vs_currencies=usd` +
              `&include_24hr_change=true&include_market_cap=true` +
              `&include_24hr_vol=true&include_24hr_high=true&include_24hr_low=true`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('CoinGecko price fetch failed');
  return (await res.json()).bitcoin;
}

function updatePriceUI(data) {
  // Price
  document.getElementById('btcPrice').textContent = fmtPrice(data.usd);

  // Change
  const changeEl = document.getElementById('btcChange');
  const change = data.usd_24h_change;
  const sign = change >= 0 ? '+' : '';
  changeEl.textContent = `${sign}${change.toFixed(2)}%`;
  changeEl.className = 'price-change ' + (change >= 0 ? 'up' : 'down');

  // Stats
  document.getElementById('btcMcap').textContent = fmtUSD(data.usd_market_cap);
  document.getElementById('btcVol').textContent   = fmtUSD(data.usd_24h_vol);

  // high/low may not be available in simple/price — handled in chart data
  const highEl = document.getElementById('btcHigh');
  const lowEl  = document.getElementById('btcLow');
  if (data.usd_24h_high) highEl.textContent = fmtPrice(data.usd_24h_high);
  if (data.usd_24h_low)  lowEl.textContent  = fmtPrice(data.usd_24h_low);
}

/* ============================================================
   BITCOIN CHART — CoinGecko market_chart
   ============================================================ */
async function fetchBTCHistory(days) {
  const url = `${COINGECKO}/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('CoinGecko chart fetch failed');
  const json = await res.json();
  return json.prices; // [[timestamp, price], ...]
}

function buildChart(prices, days) {
  const labels = prices.map(p => fmtTime(p[0], days));
  const values = prices.map(p => p[1]);

  const isUp = values[values.length - 1] >= values[0];
  const lineColor  = isUp ? '#00d17c' : '#ff4a68';
  const glowColor  = isUp ? 'rgba(0,209,124,0.15)' : 'rgba(255,74,104,0.15)';

  const ctx = document.getElementById('btcChart').getContext('2d');

  // Gradient fill
  const grad = ctx.createLinearGradient(0, 0, 0, 300);
  grad.addColorStop(0, isUp ? 'rgba(0,209,124,0.25)' : 'rgba(255,74,104,0.25)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');

  const cfg = {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data: values,
        borderColor: lineColor,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: lineColor,
        pointHoverBorderColor: '#07070e',
        pointHoverBorderWidth: 2,
        fill: true,
        backgroundColor: grad,
        tension: 0.4,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 600, easing: 'easeInOutQuart' },
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(10,10,20,0.92)',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          titleColor: 'rgba(255,255,255,0.5)',
          bodyColor: '#fff',
          bodyFont: { family: "'JetBrains Mono', monospace", size: 13, weight: '600' },
          titleFont: { family: "'Inter', sans-serif", size: 11 },
          padding: 12,
          callbacks: {
            label: ctx => ' ' + fmtPrice(ctx.parsed.y),
          },
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          border: { display: false },
          ticks: {
            color: 'rgba(255,255,255,0.3)',
            font: { family: "'JetBrains Mono', monospace", size: 10 },
            maxTicksLimit: 8,
            maxRotation: 0,
          },
        },
        y: {
          position: 'right',
          grid: { color: 'rgba(255,255,255,0.04)' },
          border: { display: false },
          ticks: {
            color: 'rgba(255,255,255,0.3)',
            font: { family: "'JetBrains Mono', monospace", size: 10 },
            callback: v => '$' + (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v),
          },
        },
      },
    },
  };

  if (chart) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    chart.data.datasets[0].borderColor = lineColor;
    chart.data.datasets[0].backgroundColor = grad;
    chart.update('active');
  } else {
    chart = new Chart(ctx, cfg);
  }

  // Also derive high/low from chart data if stat els are still empty
  const high = Math.max(...values);
  const low  = Math.min(...values);
  const highEl = document.getElementById('btcHigh');
  const lowEl  = document.getElementById('btcLow');
  if (highEl.textContent === '—') highEl.textContent = fmtPrice(high);
  if (lowEl.textContent  === '—') lowEl.textContent  = fmtPrice(low);
}

/* ============================================================
   LOAD / REFRESH BITCOIN DATA
   ============================================================ */
async function loadBitcoin(showOverlay = true) {
  const overlay = document.getElementById('chartOverlay');
  if (showOverlay) overlay.classList.remove('hidden');

  try {
    const [price, history] = await Promise.all([
      fetchBTCPrice(),
      fetchBTCHistory(currentDays),
    ]);
    updatePriceUI(price);
    buildChart(history, currentDays);
  } catch (err) {
    console.error('Bitcoin fetch error:', err);
    document.getElementById('btcPrice').innerHTML =
      '<span class="price-skeleton">API-fel — försök igen</span>';
  } finally {
    overlay.classList.add('hidden');
  }
}

/* ============================================================
   COUNTDOWN TIMER
   ============================================================ */
function startCountdown() {
  clearInterval(countdownTimer);
  countdownValue = 60;
  const el = document.getElementById('countdown');
  countdownTimer = setInterval(() => {
    countdownValue--;
    if (el) el.textContent = countdownValue;
    if (countdownValue <= 0) {
      countdownValue = 60;
      loadBitcoin(false); // silent refresh (no overlay)
    }
  }, 1000);
}

/* ============================================================
   TIMEFRAME BUTTONS
   ============================================================ */
document.querySelectorAll('.tf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentDays = parseInt(btn.dataset.days, 10);
    loadBitcoin(true);
  });
});

/* ============================================================
   RENDER TWEETS
   ============================================================ */
function renderTweets() {
  const feed = document.getElementById('tweetsFeed');
  feed.innerHTML = '';

  DEMO_TWEETS.forEach((t, i) => {
    const card = document.createElement('article');
    card.className = 'tweet-card';
    card.style.animationDelay = `${i * 0.08}s`;

    card.innerHTML = `
      <div class="tweet-header">
        <div class="tweet-avatar">T</div>
        <div class="tweet-meta">
          <div class="tweet-name">
            Donald J. Trump
            <svg class="verified-badge" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91-1.01-1-2.52-1.26-3.91-.8C14.67 2.88 13.43 2 12 2s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81C3.74 6.01 3.48 7.52 3.94 8.91 2.63 9.58 1.75 10.82 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91 1.01 1.01 2.52 1.27 3.91.81.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81 1.01-1.01 1.27-2.52.81-3.91 1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/>
            </svg>
          </div>
          <div class="tweet-handle">@realDonaldTrump</div>
        </div>
        <div class="tweet-time">${t.time} sedan</div>
      </div>
      <p class="tweet-text">${escapeHTML(t.text)}</p>
      <div class="tweet-footer">
        <div class="tweet-stat">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
            <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 7.501 3.858 7.501 7.161 0 2.9-1.838 5.345-4.486 6.243-.569.19-1.175-.141-1.175-.74v-.783c0-.485.29-.929.752-1.096 1.51-.557 2.51-1.998 2.51-3.624 0-2.206-1.893-4.161-4.501-4.161h-4.366c-2.634 0-4.505 2.026-4.505 4 0 1.625 1 3.067 2.511 3.624.462.168.752.611.752 1.095v.785c0 .599-.606.93-1.175.741C3.589 15.343 1.751 12.9 1.751 10zm8.025 9.5l-.26.26c-.14.14-.33.22-.53.22h-.01c-.21 0-.41-.09-.55-.23L4.15 15.48c-.14-.14-.22-.33-.22-.53v-.01c0-.2.08-.39.22-.53l.26-.26c.14-.14.33-.22.53-.22.2 0 .39.08.53.22l1.17 1.17V13.5c0-.41.34-.75.75-.75s.75.34.75.75v1.84l1.17-1.17c.14-.14.33-.22.53-.22.2 0 .39.08.53.22l.26.26c.14.14.22.33.22.53v.01c0 .2-.08.39-.22.53l-4.27 4.27z"/>
          </svg>
          ${fmtNum(t.replies)}
        </div>
        <div class="tweet-stat">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
            <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V19.5H7.75C5.681 19.5 4 17.819 4 15.75V8.38L2.353 9.91 .647 8.09l4.103-4.3zm11.5 2.71H11V4h5.25c2.069 0 3.75 1.681 3.75 3.75v7.37l1.647-1.53 1.706 1.82-4.103 4.3-4.603-4.3 1.706-1.82L18 14.62V7.25c0-.97-.784-1.75-1.75-1.75z"/>
          </svg>
          ${fmtNum(t.retweets)}
        </div>
        <div class="tweet-stat">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
            <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"/>
          </svg>
          ${fmtNum(t.likes)}
        </div>
      </div>
    `;

    feed.appendChild(card);
  });
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ============================================================
   INIT
   ============================================================ */
(async function init() {
  renderTweets();
  await loadBitcoin(true);
  startCountdown();
  // Auto-refresh every 60 seconds is managed by countdown
})();
