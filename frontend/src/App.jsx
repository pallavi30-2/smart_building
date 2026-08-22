import { useEffect, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BatteryCharging,
  Building2,
  ChevronDown,
  CircleHelp,
  CloudSun,
  Leaf,
  Menu,
  Settings2,
  Thermometer,
  Zap,
} from 'lucide-react';

const fallbackOverview = {
  energy_today_kwh: 2840,
  energy_target_kwh: 3200,
  occupancy: 68,
  active_alerts: 3,
  zones: [
    { name: 'North Tower', status: 'optimal', temperature: 21.4 },
    { name: 'Atrium', status: 'attention', temperature: 23.1 },
    { name: 'South Wing', status: 'optimal', temperature: 20.8 },
  ],
};

function App() {
  const [overview, setOverview] = useState(fallbackOverview);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/overview')
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then(setOverview)
      .catch(() => setOverview(fallbackOverview));
  }, []);

  const energyPercent = Math.round((overview.energy_today_kwh / overview.energy_target_kwh) * 100);

  return (
    <main className="app-shell">
      <aside className={menuOpen ? 'sidebar sidebar-open' : 'sidebar'}>
        <div className="brand"><span className="brand-mark"><Leaf size={18} /></span><span>verdant</span></div>
        <div className="workspace-label">WORKSPACE</div>
        <button className="building-switcher"><Building2 size={17} /><span>Harbor Point Campus</span><ChevronDown size={15} /></button>
        <nav className="nav-list" aria-label="Main navigation">
          <a className="nav-item active" href="#overview"><Activity size={18} />Overview</a>
          <a className="nav-item" href="#energy"><Zap size={18} />Energy</a>
          <a className="nav-item" href="#spaces"><Building2 size={18} />Spaces</a>
          <a className="nav-item" href="#alerts"><AlertTriangle size={18} />Alerts <span className="nav-count">3</span></a>
        </nav>
        <div className="sidebar-bottom">
          <a className="nav-item" href="#settings"><Settings2 size={18} />Settings</a>
          <div className="profile"><div className="avatar">MC</div><div><strong>Maya Chen</strong><small>Facility lead</small></div><CircleHelp size={16} /></div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar"><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><Menu size={20} /></button><div><p className="eyebrow">FRIDAY, OCTOBER 18, 2024</p><h1>Good morning, Maya<span className="period">.</span></h1></div><div className="header-actions"><div className="weather"><CloudSun size={21} /><div><strong>18°C</strong><small>Partly cloudy</small></div></div><button className="icon-button" aria-label="Notifications"><AlertTriangle size={18} /><span className="notification-dot" /></button></div></header>

        <div className="status-banner"><span className="pulse" /><span><strong>All systems operational</strong> · Last sync 2 minutes ago</span><ArrowUpRight size={16} /></div>

        <div className="dashboard-grid" id="overview">
          <section className="hero-panel"><div><span className="panel-kicker">CAMPUS PERFORMANCE</span><h2>Spaces that work<br /><em>better.</em></h2><p>Real-time intelligence across your building portfolio.</p></div><div className="hero-graphic"><div className="ring ring-one" /><div className="ring ring-two" /><div className="ring ring-three" /><span>68<span>%</span></span><small>occupied now</small></div></section>

          <MetricCard icon={<Zap />} label="Energy used today" value={`${overview.energy_today_kwh.toLocaleString()} kWh`} detail={`${energyPercent}% of daily target`} accent="green" chart={[30, 45, 38, 55, 48, 62, 52, 66, 58, 72, 61, 68]} />
          <MetricCard icon={<Thermometer />} label="Comfort index" value="94.2" detail="+2.4% from yesterday" accent="orange" chart={[45, 42, 50, 48, 61, 56, 68, 62, 72, 68, 76, 82]} />
          <MetricCard icon={<BatteryCharging />} label="Carbon avoided" value="1.8 t" detail="This month" accent="teal" chart={[20, 28, 26, 40, 35, 48, 46, 60, 56, 68, 65, 78]} />

          <section className="wide-panel" id="spaces"><div className="section-heading"><div><span className="panel-kicker">LIVE ZONES</span><h3>Building pulse</h3></div><button className="text-button">View all <ArrowUpRight size={15} /></button></div><div className="zone-list">{overview.zones.map((zone) => <div className="zone-row" key={zone.name}><div className={`zone-status ${zone.status}`} /><strong>{zone.name}</strong><span className="zone-state">{zone.status === 'optimal' ? 'Optimal' : 'Needs attention'}</span><div className="zone-bar"><span style={{ width: `${zone.temperature * 3.6}%` }} /></div><span className="temperature">{zone.temperature}°C</span><ArrowUpRight size={16} /></div>)}</div></section>

          <section className="alert-panel" id="alerts"><div className="section-heading"><div><span className="panel-kicker">NEEDS YOUR EYE</span><h3>Recent alerts</h3></div><span className="alert-number">03</span></div><div className="alert-item"><span className="alert-icon orange"><Thermometer size={16} /></span><div><strong>Temperature drift</strong><small>Atrium · 12 minutes ago</small></div><ArrowUpRight size={16} /></div><div className="alert-item"><span className="alert-icon red"><Zap size={16} /></span><div><strong>High energy draw</strong><small>South Wing · 1 hour ago</small></div><ArrowUpRight size={16} /></div></section>
        </div>
        <footer>Verdant operations platform <span>•</span> Data refreshes automatically</footer>
      </section>
    </main>
  );
}

function MetricCard({ icon, label, value, detail, accent, chart }) {
  return <section className={`metric-card ${accent}`}><div className="metric-top"><span className="metric-icon">{icon}</span><span className="metric-label">{label}</span><ArrowUpRight size={16} /></div><strong className="metric-value">{value}</strong><span className="metric-detail">{detail}</span><div className="sparkline" aria-hidden="true">{chart.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></section>;
}

export default App;
