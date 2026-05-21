import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Dashboard.css';

const INVENTORY = [
  { id: '#001', emoji: '🎀', name: 'Barbie Doll Set',     sku: 'SKU-1021', cat: 'Dolls',       catClass: 'badge-purple', stock: 45, stockPct: 75,  stockColor: 'var(--green)',  price: 2400, status: 'In Stock',     statusClass: 'badge-green'  },
  { id: '#002', emoji: '🚗', name: 'RC Racing Car',       sku: 'SKU-1022', cat: 'Cars',        catClass: 'badge-green',  stock: 30, stockPct: 50,  stockColor: 'var(--green)',  price: 3100, status: 'In Stock',     statusClass: 'badge-green'  },
  { id: '#003', emoji: '🐻', name: 'Teddy Bear XL',       sku: 'SKU-1023', cat: 'Stuffed',     catClass: 'badge-yellow', stock: 8,  stockPct: 13,  stockColor: 'var(--yellow)', price: 1800, status: 'Low Stock',    statusClass: 'badge-yellow' },
  { id: '#004', emoji: '🧩', name: 'Puzzle 1000 pcs',     sku: 'SKU-1024', cat: 'Puzzles',     catClass: 'badge-blue',   stock: 60, stockPct: 100, stockColor: 'var(--green)',  price: 950,  status: 'In Stock',     statusClass: 'badge-green'  },
  { id: '#005', emoji: '🍳', name: 'Kitchen Play Set',    sku: 'SKU-1025', cat: 'Playsets',    catClass: 'badge-cyan',   stock: 0,  stockPct: 0,   stockColor: 'var(--red)',    price: 2200, status: 'Out of Stock', statusClass: 'badge-red'    },
  { id: '#006', emoji: '🧱', name: 'LEGO City Set',       sku: 'SKU-1026', cat: 'Building',    catClass: 'badge-cyan',   stock: 22, stockPct: 37,  stockColor: 'var(--green)',  price: 4500, status: 'In Stock',     statusClass: 'badge-green'  },
  { id: '#007', emoji: '🍼', name: 'Baby Rattle Pack',    sku: 'SKU-1027', cat: 'Infant',      catClass: 'badge-yellow', stock: 5,  stockPct: 8,   stockColor: 'var(--yellow)', price: 650,  status: 'Low Stock',    statusClass: 'badge-yellow' },
  { id: '#008', emoji: '🦕', name: 'Dinosaur Figure Set', sku: 'SKU-1028', cat: 'Action Toys', catClass: 'badge-purple', stock: 40, stockPct: 67,  stockColor: 'var(--green)',  price: 1200, status: 'In Stock',     statusClass: 'badge-green'  },
  { id: '#009', emoji: '💦', name: 'Water Gun XL',        sku: 'SKU-1029', cat: 'Outdoor',     catClass: 'badge-blue',   stock: 55, stockPct: 92,  stockColor: 'var(--green)',  price: 800,  status: 'In Stock',     statusClass: 'badge-green'  },
  { id: '#010', emoji: '🎨', name: 'Art & Craft Kit',     sku: 'SKU-1030', cat: 'Creative',    catClass: 'badge-purple', stock: 0,  stockPct: 0,   stockColor: 'var(--red)',    price: 2800, status: 'Out of Stock', statusClass: 'badge-red'    },
  { id: '#011', emoji: '🎲', name: 'Board Game Classic',  sku: 'SKU-1031', cat: 'Games',       catClass: 'badge-green',  stock: 18, stockPct: 30,  stockColor: 'var(--green)',  price: 1900, status: 'In Stock',     statusClass: 'badge-green'  },
];

const ORDERS = [
  { id: '#1021', initials: 'AR', grad: 'linear-gradient(135deg,#6c63ff,#ec4899)', name: 'Ali Raza',     email: 'ali@email.com',    product: 'Barbie Doll Set',    amount: 2400, date: 'May 10, 2026', status: 'Delivered',  statusClass: 'badge-green'  },
  { id: '#1022', initials: 'SK', grad: 'linear-gradient(135deg,#06b6d4,#3b82f6)', name: 'Sara Khan',    email: 'sara@email.com',   product: 'RC Racing Car',      amount: 3100, date: 'May 10, 2026', status: 'Processing', statusClass: 'badge-yellow' },
  { id: '#1023', initials: 'UA', grad: 'linear-gradient(135deg,#f97316,#f59e0b)', name: 'Usman Ahmed',  email: 'usman@email.com',  product: 'Teddy Bear XL',      amount: 1800, date: 'May 9, 2026',  status: 'Delivered',  statusClass: 'badge-green'  },
  { id: '#1024', initials: 'FM', grad: 'linear-gradient(135deg,#22c55e,#06b6d4)', name: 'Fatima Malik', email: 'fatima@email.com', product: 'Puzzle 1000 pcs',    amount: 950,  date: 'May 9, 2026',  status: 'Shipped',    statusClass: 'badge-blue'   },
  { id: '#1025', initials: 'HA', grad: 'linear-gradient(135deg,#ec4899,#6c63ff)', name: 'Hassan Ali',   email: 'hassan@email.com', product: 'Kitchen Play Set',   amount: 2200, date: 'May 8, 2026',  status: 'Processing', statusClass: 'badge-yellow' },
  { id: '#1026', initials: 'ZA', grad: 'linear-gradient(135deg,#3b82f6,#22c55e)', name: 'Zara Ahmed',   email: 'zara@email.com',   product: 'LEGO City Set',      amount: 4500, date: 'May 8, 2026',  status: 'Delivered',  statusClass: 'badge-green'  },
  { id: '#1027', initials: 'BH', grad: 'linear-gradient(135deg,#f59e0b,#f97316)', name: 'Bilal Hassan', email: 'bilal@email.com',  product: 'Dinosaur Figure Set', amount: 1200, date: 'May 7, 2026',  status: 'Cancelled',  statusClass: 'badge-red'    },
];

// ── Canvas chart helpers ──────────────────────────────────
function hex2rgba(hex, a) {
  if (!hex || hex.startsWith('rgb')) return hex;
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function drawSparkline(canvas, data, color) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 200, H = 36;
  canvas.width = W * 2; canvas.height = H * 2;
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  ctx.scale(2, 2);
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => ({
    x: i * (W / (data.length - 1)),
    y: H - 4 - ((v - min) / (max - min || 1)) * (H - 8),
  }));
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, hex2rgba(color, 0.25));
  grad.addColorStop(1, hex2rgba(color, 0));
  ctx.beginPath();
  pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
  ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();
}

function drawRevenueChart(canvas, isDark) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.parentElement.offsetWidth || 500;
  const H = canvas.parentElement.offsetHeight || 220;
  canvas.width = W * 2; canvas.height = H * 2;
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  ctx.scale(2, 2);
  const data = [42, 58, 51, 70, 64, 80, 72, 88, 76, 94, 84, 100];
  const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const pad = { l: 40, r: 20, t: 15, b: 30 };
  const cW = W - pad.l - pad.r, cH = H - pad.t - pad.b;
  const max = 110, step = cW / (data.length - 1);
  const mutedColor = 'rgba(122,134,154,.7)';
  const gridColor = isDark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.06)';
  ctx.strokeStyle = gridColor; ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    const y = pad.t + cH - i * (cH / 5);
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cW, y); ctx.stroke();
    ctx.fillStyle = mutedColor; ctx.font = '10px Inter';
    ctx.textAlign = 'right'; ctx.fillText(Math.round(i * 20) + 'K', pad.l - 6, y + 4);
  }
  labels.forEach((l, i) => {
    ctx.fillStyle = mutedColor; ctx.font = '10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(l, pad.l + i * step, H - pad.b + 14);
  });
  const pts = data.map((v, i) => ({ x: pad.l + i * step, y: pad.t + cH - (v / max) * cH }));
  const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + cH);
  grad.addColorStop(0, 'rgba(108,99,255,.25)');
  grad.addColorStop(1, 'rgba(108,99,255,0)');
  ctx.beginPath();
  pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
  ctx.lineTo(pts[pts.length - 1].x, pad.t + cH);
  ctx.lineTo(pts[0].x, pad.t + cH);
  ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
  ctx.beginPath();
  pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
  ctx.strokeStyle = '#6c63ff'; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.stroke();
  const bg2 = isDark ? '#161b27' : '#ffffff';
  pts.forEach(p => {
    ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#6c63ff'; ctx.fill();
    ctx.strokeStyle = bg2; ctx.lineWidth = 1.5; ctx.stroke();
  });
}

function drawDonutChart(canvas, isDark) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const S = 160;
  canvas.width = S * 2; canvas.height = S * 2;
  canvas.style.width = S + 'px'; canvas.style.height = S + 'px';
  ctx.scale(2, 2);
  const vals = [72, 58, 45, 38, 35];
  const colors = ['#6c63ff', '#22c55e', '#f59e0b', '#3b82f6', '#ec4899'];
  const total = vals.reduce((a, b) => a + b, 0);
  let start = -Math.PI / 2;
  vals.forEach((v, i) => {
    const sweep = (v / total) * Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(S / 2, S / 2);
    ctx.arc(S / 2, S / 2, 65, start, start + sweep);
    ctx.closePath(); ctx.fillStyle = colors[i]; ctx.fill();
    start += sweep;
  });
  const bg2 = isDark ? '#161b27' : '#ffffff';
  ctx.beginPath(); ctx.arc(S / 2, S / 2, 45, 0, Math.PI * 2);
  ctx.fillStyle = bg2; ctx.fill();
}

function drawBarChart(canvas, labels, datasets, isDark) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.parentElement.offsetWidth || 400;
  const H = canvas.parentElement.offsetHeight || 240;
  canvas.width = W * 2; canvas.height = H * 2;
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  ctx.scale(2, 2);
  const pad = { l: 40, r: 10, t: 15, b: 30 };
  const cW = W - pad.l - pad.r, cH = H - pad.t - pad.b;
  const allVals = datasets.flatMap(d => d.data);
  const max = Math.max(...allVals) * 1.15;
  const n = labels.length;
  const bw = (cW / n) * 0.55, gap = (cW / n) * 0.45;
  const gridColor = isDark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.06)';
  const mutedColor = 'rgba(122,134,154,.7)';
  ctx.strokeStyle = gridColor; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + cH - i * (cH / 4);
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cW, y); ctx.stroke();
    ctx.fillStyle = mutedColor; ctx.font = '9px Inter'; ctx.textAlign = 'right';
    ctx.fillText(Math.round(i * (max / 4)), pad.l - 5, y + 4);
  }
  labels.forEach((l, i) => {
    const x = pad.l + (i + 0.5) * (cW / n);
    ctx.fillStyle = mutedColor; ctx.font = '9px Inter'; ctx.textAlign = 'center';
    ctx.fillText(l, x, H - pad.b + 14);
  });
  datasets.forEach((ds, di) => {
    ds.data.forEach((v, i) => {
      const x = pad.l + i * (cW / n) + gap / 2 + di * (bw / datasets.length);
      const bwi = bw / datasets.length;
      const barH = (v / max) * cH;
      const y = pad.t + cH - barH;
      ctx.fillStyle = ds.color;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, bwi, barH, 3);
      else ctx.rect(x, y, bwi, barH);
      ctx.fill();
    });
  });
}

function filterRows(rows, query, keys) {
  if (!query) return rows;
  const q = query.toLowerCase();
  return rows.filter(r => keys.some(k => String(r[k]).toLowerCase().includes(q)));
}

export default function Dashboard() {
  const [section, setSection] = useState('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [invSearch, setInvSearch] = useState('');
  const [ordSearch, setOrdSearch] = useState('');
  const [stkSearch, setStkSearch] = useState('');
  const [inventory, setInventory] = useState(INVENTORY);
  const [modalOpen, setModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  // Canvas refs
  const sp1Ref = useRef(null), sp2Ref = useRef(null), sp3Ref = useRef(null), sp4Ref = useRef(null);
  const revenueRef = useRef(null);
  const donutRef = useRef(null);
  const salesTrendRef = useRef(null), statusRef = useRef(null), catRef = useRef(null), trafficRef = useRef(null);

  // Draw overview charts
  useEffect(() => {
    if (section !== 'overview') return;
    const t = setTimeout(() => {
      drawSparkline(sp1Ref.current, [20,35,28,45,38,52,48,60], '#6c63ff');
      drawSparkline(sp2Ref.current, [30,45,38,60,42,55,50,65], '#22c55e');
      drawSparkline(sp3Ref.current, [150,200,180,220,195,240,215,260], '#f97316');
      drawSparkline(sp4Ref.current, [60,70,65,80,72,75,68,84], '#3b82f6');
      drawRevenueChart(revenueRef.current, isDark);
      drawDonutChart(donutRef.current, isDark);
    }, 100);
    return () => clearTimeout(t);
  }, [section, isDark]);

  // Draw analytics charts
  useEffect(() => {
    if (section !== 'analytics') return;
    const t = setTimeout(() => {
      drawBarChart(salesTrendRef.current, ['Jan','Feb','Mar','Apr','May','Jun'], [
        { data: [32,45,38,60,52,70], color: '#6c63ff' },
        { data: [20,30,25,40,35,55], color: '#22c55e' },
      ], isDark);
      drawBarChart(statusRef.current, ['Delivered','Shipped','Processing','Cancelled'], [
        { data: [42,18,25,8], color: '#22c55e' },
      ], isDark);
      drawBarChart(catRef.current, ['Dolls','Cars','Puzzles','Stuffed','Other'], [
        { data: [42,31,27,18,22], color: '#6c63ff' },
      ], isDark);
      drawBarChart(trafficRef.current, ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], [
        { data: [120,180,150,200,170,240,190], color: '#06b6d4' },
      ], isDark);
    }, 80);
    return () => clearTimeout(t);
  }, [section, isDark]);

  const deleteRow = (id) => setInventory(prev => prev.filter(r => r.id !== id));

  const exportCSV = () => {
    const header = 'ID,Name,Category,Stock,Price,Status';
    const rows = inventory.map(r => `${r.id},${r.name},${r.cat},${r.stock},${r.price},${r.status}`);
    const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'inventory.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const navItems = [
    { sec: 'overview',   icon: '📊', label: 'Overview'      },
    { sec: 'analytics',  icon: '📈', label: 'Analytics'     },
    { sec: 'orders',     icon: '🛍️', label: 'Orders', badge: 7 },
  ];
  const invItems = [
    { sec: 'stock',      icon: '📦', label: 'Stock Manager' },
    { action: 'insert',  icon: '➕', label: 'Add Product'   },
    { action: 'export',  icon: '📤', label: 'Export CSV'    },
  ];
  const storeItems = [
    { path: '/products', icon: '🏪', label: 'View Shop'  },
    { path: '/cart',     icon: '🛒', label: 'Cart'       },
    { path: '/contact',  icon: '📧', label: 'Contact'    },
    { path: '/',         icon: '🏠', label: 'Home'       },
  ];

  return (
    <div className="dash-app" data-theme={theme}>
      {/* ── SIDEBAR ── */}
      <aside className={`dash-sidebar${collapsed ? ' collapsed' : ''}`}>
        <div className="sidebar-top">
          <div className="logo-icon">🧸</div>
          <div className="logo-text">
            <h1>ToyStore</h1>
            <p>Admin Panel</p>
          </div>
        </div>
        <button className="sidebar-collapse" onClick={() => setCollapsed(c => !c)} title="Collapse">
          {collapsed ? '▶' : '◀'}
        </button>

        <div className="nav-group">
          <div className="nav-label">Main</div>
          {navItems.map(item => (
            <button
              key={item.sec}
              className={`nav-item${section === item.sec ? ' active' : ''}`}
              onClick={() => setSection(item.sec)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-item-text">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </div>

        <div className="nav-group">
          <div className="nav-label">Inventory</div>
          {invItems.map((item, i) => (
            <button
              key={i}
              className={`nav-item${item.sec && section === item.sec ? ' active' : ''}`}
              onClick={() => {
                if (item.sec) setSection(item.sec);
                if (item.action === 'insert') setModalOpen(true);
                if (item.action === 'export') exportCSV();
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-item-text">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="nav-group">
          <div className="nav-label">Store</div>
          {storeItems.map(item => (
            <button key={item.path} className="nav-item" onClick={() => navigate(item.path)}>
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-item-text">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="user-av">AD</div>
            <div className="user-info">
              <div className="user-name">Admin</div>
              <div className="user-role">Store Manager</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="dash-main">
        {/* Content */}
        <div className="dash-content">

          {/* ── OVERVIEW ── */}
          {section === 'overview' && (
            <div>
              {/* KPI Cards */}
              <div className="kpi-grid">
                {[
                  { cls: 'kpi-purple', icon: '📦', trend: '▲ 12%', trendCls: 'trend-up',   val: '248',      label: 'Total Products',   ref: sp1Ref, color: '#6c63ff' },
                  { cls: 'kpi-green',  icon: '🛍️', trend: '▲ 8%',  trendCls: 'trend-up',   val: '53',       label: 'Orders Today',     ref: sp2Ref, color: '#22c55e' },
                  { cls: 'kpi-orange', icon: '👥', trend: '▲ 5%',  trendCls: 'trend-up',   val: '1,204',    label: 'Customers',        ref: sp3Ref, color: '#f97316' },
                  { cls: 'kpi-blue',   icon: '💰', trend: '▼ 3%',  trendCls: 'trend-down', val: 'Rs 84.2K', label: 'Revenue (Month)',  ref: sp4Ref, color: '#3b82f6' },
                ].map((k, i) => (
                  <div key={i} className={`kpi-card ${k.cls}`}>
                    <div className="kpi-top">
                      <div className="kpi-icon">{k.icon}</div>
                      <span className={`kpi-trend ${k.trendCls}`}>{k.trend}</span>
                    </div>
                    <div className="kpi-val">{k.val}</div>
                    <div className="kpi-label">{k.label}</div>
                    <div className="kpi-spark">
                      <canvas ref={k.ref} className="spark"></canvas>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="charts-row">
                <div className="chart-card">
                  <div className="card-head">
                    <h3>Revenue Overview</h3>
                    <div className="card-head-right">
                      <span className="chip active">Monthly</span>
                      <span className="chip">Weekly</span>
                    </div>
                  </div>
                  <div className="chart-canvas-wrap" style={{height:'220px'}}>
                    <canvas ref={revenueRef}></canvas>
                  </div>
                </div>
                <div className="chart-card">
                  <div className="card-head"><h3>Category Split</h3></div>
                  <div className="donut-wrap">
                    <div className="donut-center-wrap">
                      <canvas ref={donutRef}></canvas>
                      <div className="donut-center">
                        <span>248</span>
                        <span>Products</span>
                      </div>
                    </div>
                    <div className="donut-legend">
                      {[
                        { color:'#6c63ff', label:'Dolls',   val:72,  pct:'29%' },
                        { color:'#22c55e', label:'Cars',    val:58,  pct:'23%' },
                        { color:'#f59e0b', label:'Puzzles', val:45,  pct:'18%' },
                        { color:'#3b82f6', label:'Stuffed', val:38,  pct:'15%' },
                        { color:'#ec4899', label:'Other',   val:35,  pct:'14%' },
                      ].map(d => (
                        <div key={d.label} className="dl-item">
                          <div className="dl-dot" style={{background:d.color}}></div>
                          <span className="dl-label">{d.label}</span>
                          <span className="dl-val">{d.val}</span>
                          <span className="dl-pct">{d.pct}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mid Row */}
              <div className="mid-row">
                {/* Recent Activity */}
                <div className="mini-panel">
                  <div className="card-head" style={{marginBottom:'12px'}}>
                    <h3>Recent Activity</h3>
                  </div>
                  {[
                    { init:'AR', grad:'linear-gradient(135deg,#6c63ff,#ec4899)', title:'Barbie Doll Set × 2',  sub:'Ali Raza',    badge:'Delivered',  bc:'badge-green'  },
                    { init:'SK', grad:'linear-gradient(135deg,#06b6d4,#3b82f6)', title:'RC Racing Car × 1',   sub:'Sara Khan',   badge:'Processing', bc:'badge-yellow' },
                    { init:'UA', grad:'linear-gradient(135deg,#f97316,#f59e0b)', title:'Teddy Bear XL × 3',   sub:'Usman Ahmed', badge:'Delivered',  bc:'badge-green'  },
                    { init:'FM', grad:'linear-gradient(135deg,#22c55e,#06b6d4)', title:'Puzzle 1000 pcs × 1', sub:'Fatima Malik',badge:'Shipped',    bc:'badge-blue'   },
                  ].map((a,i) => (
                    <div key={i} className="activity-item">
                      <div className="act-av" style={{background:a.grad}}>{a.init}</div>
                      <div className="act-text">
                        <div className="act-title">{a.title}</div>
                        <div className="act-sub">{a.sub} · <span className={`badge ${a.bc}`}>{a.badge}</span></div>
                      </div>
                      <div className="act-time">{['2m','18m','45m','1h'][i]} ago</div>
                    </div>
                  ))}
                </div>

                {/* Stock Alerts */}
                <div className="mini-panel">
                  <div className="card-head" style={{marginBottom:'12px'}}>
                    <h3>⚠ Stock Alerts</h3>
                    <span style={{fontSize:'.72rem',color:'var(--muted)'}}>5 items need attention</span>
                  </div>
                  {[
                    { ic:'🍳', name:'Kitchen Play Set', sub:'Playsets · 0 units',   cls:'danger' },
                    { ic:'🎨', name:'Art & Craft Kit',  sub:'Creative · 0 units',   cls:'danger' },
                    { ic:'🐻', name:'Teddy Bear XL',    sub:'Stuffed · 8 units',    cls:'warn'   },
                    { ic:'🍼', name:'Baby Rattle Pack', sub:'Infant · 5 units',     cls:'warn'   },
                    { ic:'🚗', name:'Mini Toy Cars Set',sub:'Cars · 6 units',       cls:'warn'   },
                  ].map((a,i) => (
                    <div key={i} className={`alert-row ${a.cls}`}>
                      <span className="alert-ic">{a.ic}</span>
                      <div className="alert-info">
                        <strong>{a.name}</strong>
                        <span>{a.sub}</span>
                      </div>
                      <button className="restock-btn" onClick={() => alert(`Restocking ${a.name}`)}>Restock</button>
                    </div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mini-panel" style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  <div className="card-head" style={{marginBottom:'4px'}}><h3>Quick Stats</h3></div>
                  {[
                    { label:'Avg Order Value', val:'Rs 1,590', sub:'↑ Rs 120 vs last week'   },
                    { label:'Avg Rating',      val:'4.8 ⭐',   sub:'Based on 392 reviews'    },
                    { label:'Return Rate',     val:'2.1%',     sub:'↓ 0.4% vs last month'    },
                    { label:'Out of Stock',    val:'2 items',  sub:'Needs immediate action'  },
                  ].map((s,i) => (
                    <div key={i} className="qstat">
                      <div className="qstat-label">{s.label}</div>
                      <div className="qstat-val">{s.val}</div>
                      <div className="qstat-sub">{s.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inventory Table */}
              <InventoryTable
                data={filterRows(inventory, invSearch, ['name','cat','status'])}
                searchVal={invSearch}
                onSearch={setInvSearch}
                onDelete={deleteRow}
                onExport={exportCSV}
                onAdd={() => setModalOpen(true)}
              />
            </div>
          )}

          {/* ── ANALYTICS ── */}
          {section === 'analytics' && (
            <div>
              <div className="analytics-kpi-row">
                {[
                  { cls:'kpi-purple', icon:'📊', trend:'▲ 18%', tc:'trend-up',   val:'Rs 84.2K', label:'Total Revenue' },
                  { cls:'kpi-green',  icon:'📦', trend:'▲ 12%', tc:'trend-up',   val:'1,847',    label:'Units Sold'    },
                  { cls:'kpi-orange', icon:'🔄', trend:'▼ 0.4%',tc:'trend-down', val:'2.1%',     label:'Return Rate'   },
                ].map((k,i) => (
                  <div key={i} className={`kpi-card ${k.cls}`} style={{padding:'16px'}}>
                    <div className="kpi-top">
                      <div className="kpi-icon" style={{width:'36px',height:'36px'}}>{k.icon}</div>
                      <span className={`kpi-trend ${k.tc}`}>{k.trend}</span>
                    </div>
                    <div className="kpi-val" style={{fontSize:'1.4rem'}}>{k.val}</div>
                    <div className="kpi-label">{k.label}</div>
                  </div>
                ))}
              </div>
              <div className="analytics-grid">
                <div className="chart-card">
                  <div className="card-head"><h3>Monthly Sales Trend</h3></div>
                  <div style={{height:'240px'}}><canvas ref={salesTrendRef}></canvas></div>
                </div>
                <div className="chart-card">
                  <div className="card-head"><h3>Orders by Status</h3></div>
                  <div style={{height:'240px'}}><canvas ref={statusRef}></canvas></div>
                </div>
                <div className="chart-card">
                  <div className="card-head"><h3>Category Performance</h3></div>
                  <div style={{height:'240px'}}><canvas ref={catRef}></canvas></div>
                </div>
                <div className="chart-card">
                  <div className="card-head"><h3>Weekly Traffic</h3></div>
                  <div style={{height:'240px'}}><canvas ref={trafficRef}></canvas></div>
                </div>
              </div>
            </div>
          )}

          {/* ── ORDERS ── */}
          {section === 'orders' && (
            <div className="table-card">
              <div className="table-head">
                <h3>🛍️ All Orders</h3>
                <div className="table-actions">
                  <div className="search-mini">
                    <span style={{color:'var(--muted)',fontSize:'13px'}}>🔍</span>
                    <input type="text" placeholder="Search orders…" value={ordSearch} onChange={e => setOrdSearch(e.target.value)} />
                  </div>
                  <button className="btn-ghost">Filter</button>
                </div>
              </div>
              <div style={{overflowX:'auto'}}>
                <table className="adv-table">
                  <thead>
                    <tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Amount</th><th>Date</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {filterRows(ORDERS, ordSearch, ['name','product','status']).map(o => (
                      <tr key={o.id}>
                        <td style={{fontWeight:700,color:'var(--accent)'}}>{o.id}</td>
                        <td>
                          <div className="order-cell">
                            <div className="order-av" style={{background:o.grad}}>{o.initials}</div>
                            <div>
                              <div className="order-name">{o.name}</div>
                              <div className="order-id">{o.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>{o.product}</td>
                        <td style={{fontWeight:700}}>Rs {o.amount.toLocaleString()}</td>
                        <td style={{color:'var(--muted)'}}>{o.date}</td>
                        <td><span className={`badge ${o.statusClass}`}>{o.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── STOCK ── */}
          {section === 'stock' && (
            <InventoryTable
              data={filterRows(inventory, stkSearch, ['name','cat','status'])}
              searchVal={stkSearch}
              onSearch={setStkSearch}
              onDelete={deleteRow}
              onExport={exportCSV}
              onAdd={() => setModalOpen(true)}
            />
          )}

        </div>
      </div>

      {/* ── ADD PRODUCT MODAL ── */}
      {modalOpen && (
        <div className="modal-backdrop open" onClick={e => { if (e.target.classList.contains('modal-backdrop')) setModalOpen(false); }}>
          <div className="modal">
            <div className="modal-hd">
              <h3>Add New Product</h3>
              <button className="modal-close-btn" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <div className="form-row">
              <label>Product Name</label>
              <input type="text" placeholder="e.g. Barbie Doll Deluxe" />
            </div>
            <div className="form-2col">
              <div className="form-row">
                <label>Category</label>
                <select>
                  <option value="">Select…</option>
                  {['Dolls','Cars','Puzzles','Stuffed','Building','Playsets','Infant','Action Toys','Outdoor','Creative','Games'].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <label>SKU</label>
                <input type="text" placeholder="e.g. SKU-1032" />
              </div>
            </div>
            <div className="form-2col">
              <div className="form-row">
                <label>Quantity</label>
                <input type="number" placeholder="e.g. 30" />
              </div>
              <div className="form-row">
                <label>Price (Rs.)</label>
                <input type="number" placeholder="e.g. 1500" />
              </div>
            </div>
            <div className="form-row">
              <label>Description (optional)</label>
              <input type="text" placeholder="Short product description…" />
            </div>
            <div className="modal-actions">
              <button className="btn-modal-cancel" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn-modal-submit" onClick={() => setModalOpen(false)}>Add to Inventory</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InventoryTable({ data, searchVal, onSearch, onDelete, onExport, onAdd }) {
  return (
    <div className="table-card">
      <div className="table-head">
        <h3>📦 Stock Inventory</h3>
        <div className="table-actions">
          <div className="search-mini">
            <span style={{color:'var(--muted)',fontSize:'13px'}}>🔍</span>
            <input type="text" placeholder="Search products…" value={searchVal} onChange={e => onSearch(e.target.value)} />
          </div>
          <button className="btn-ghost" onClick={onExport}>⬇ Export</button>
          <button className="btn-primary" onClick={onAdd}>+ Add Product</button>
        </div>
      </div>
      <div style={{overflowX:'auto'}}>
        <table className="adv-table">
          <thead>
            <tr><th>#</th><th>Product</th><th>Category</th><th>Stock Level</th><th>Price</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id}>
                <td style={{color:'var(--muted)'}}>{row.id}</td>
                <td>
                  <div className="prod-cell">
                    <div className="prod-av">{row.emoji}</div>
                    <div>
                      <div className="prod-name">{row.name}</div>
                      <div className="prod-cat">{row.sku}</div>
                    </div>
                  </div>
                </td>
                <td><span className={`badge ${row.catClass}`}>{row.cat}</span></td>
                <td>
                  <div className="stock-bar-wrap">
                    <div className="stock-bar-bg">
                      <div className="stock-bar-fill" style={{width:`${row.stockPct}%`, background:row.stockColor}}></div>
                    </div>
                    <span className="stock-bar-label">{row.stock}</span>
                  </div>
                </td>
                <td style={{fontWeight:600}}>Rs {row.price.toLocaleString()}</td>
                <td><span className={`badge ${row.statusClass}`}>{row.status}</span></td>
                <td>
                  <div className="row-actions">
                    <button className="act-btn act-edit" onClick={() => alert(`Edit: ${row.name}`)}>Edit</button>
                    <button className="act-btn act-del" onClick={() => onDelete(row.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}