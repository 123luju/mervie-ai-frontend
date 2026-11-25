import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, LayoutDashboard, Users, Calendar, AlertTriangle, MessageSquare, LogOut, Activity, Baby, Bell, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  useEffect(() => { api.get('/dashboard/stats').then(r => setStats(r.data)).catch(() => {}); }, []);
  const s = stats || { mothers: 2847, appointments: 143, alerts: 12, risk: { low: 72, moderate: 21, high: 7 } };
  const cards = [
    { l: 'Registered Mothers', v: s.mothers, icon: Users, c: '#0f766e', bg: '#ccfbf1' },
    { l: 'ANC Appointments Today', v: s.appointments, icon: Calendar, c: '#2563eb', bg: '#dbeafe' },
    { l: 'Active Risk Alerts', v: s.alerts, icon: AlertTriangle, c: '#ea580c', bg: '#ffedd5' },
    { l: 'AI Assessments', v: s.assessments || 1284, icon: Activity, c: '#7c3aed', bg: '#ede9fe' },
  ];
  const nav = [
    { icon: LayoutDashboard, l: 'Overview', active: true }, { icon: Users, l: 'Patients' }, { icon: Calendar, l: 'Appointments' },
    { icon: AlertTriangle, l: 'Risk Alerts' }, { icon: MessageSquare, l: 'Messages' }, { icon: Baby, l: 'Postpartum' },
  ];
  return <div className="min-vh-100 d-flex" style={{ background: '#f4fbfa' }}>
    <aside className="d-none d-lg-flex flex-column text-white p-3" style={{ width: 260, background: 'linear-gradient(180deg,#042f2e,#0b4f4a)' }}>
      <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none text-white mb-4 px-2"><div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#14b8a6,#0f766e)' }}><HeartPulse size={22} /></div><span className="font-display fw-bold fs-4">Mervie AI</span></Link>
      <div className="small opacity-50 px-2 mb-2 fw-semibold">MAIN MENU</div>
      {nav.map(n => { const I = n.icon; return <div key={n.l} className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 mb-1" style={{ background: n.active ? 'rgba(255,255,255,.12)' : 'transparent', cursor: 'pointer', opacity: n.active ? 1 : 0.75 }}><I size={18} /><span className="small fw-medium">{n.l}</span></div>; })}
      <div className="mt-auto px-2">
        <div className="rounded-4 p-3 mb-3" style={{ background: 'rgba(255,255,255,.07)' }}><div className="small fw-semibold mb-1">Mervie AI Assistant</div><div style={{ fontSize: 11, opacity: 0.7 }}>Ask about symptoms, risk factors, or care guidance.</div></div>
        <button onClick={logout} className="btn btn-sm w-100 text-white d-flex align-items-center justify-content-center gap-2" style={{ background: 'rgba(255,255,255,.1)' }}><LogOut size={16} />Logout</button>
      </div>
    </aside>
    <main className="flex-fill p-3 p-md-4 overflow-auto">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div><h2 className="font-display fw-bold mb-0">Welcome, {user?.name || 'User'}</h2><div className="text-secondary small">{user?.role || 'Healthcare Professional'} · Mervie AI Dashboard</div></div>
        <div className="d-flex gap-2 align-items-center"><span className="badge rounded-pill text-dark" style={{ background: '#ccfbf1' }}><Bell size={14} className="me-1" />{s.alerts} alerts</span><button onClick={logout} className="btn btn-outline-secondary btn-sm d-lg-none">Logout</button></div>
      </div>
      <div className="row g-3 mb-4">
        {cards.map(c => { const I = c.icon; return <div className="col-sm-6 col-xl-3" key={c.l}><div className="bg-white rounded-4 p-4 border h-100 card-lift"><div className="d-flex justify-content-between mb-3"><div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: 46, height: 46, background: c.bg, color: c.c }}><I size={22} /></div><TrendingUp size={16} className="text-success" /></div><div className="fs-2 fw-bold font-display">{c.v?.toLocaleString?.() || c.v}</div><div className="text-secondary small">{c.l}</div></div></div>; })}
      </div>
      <div className="row g-4">
        <div className="col-lg-7"><div className="bg-white rounded-4 p-4 border h-100">
          <h5 className="fw-bold mb-3">Pregnancy Risk Distribution</h5>
          {[['Low Risk', s.risk?.low ?? 72, '#0f766e'], ['Moderate Risk', s.risk?.moderate ?? 21, '#f59e0b'], ['High Risk', s.risk?.high ?? 7, '#ef4444']].map(r => (
            <div key={r[0]} className="mb-3"><div className="d-flex justify-content-between small mb-1"><span className="fw-medium">{r[0]}</span><span className="text-secondary">{r[1]}%</span></div><div className="rounded-pill" style={{ height: 10, background: '#f1f5f9' }}><div className="rounded-pill" style={{ width: r[1] + '%', height: 10, background: r[2] }} /></div></div>
          ))}
          <div className="mt-4 p-3 rounded-4" style={{ background: '#f0fdfa' }}><div className="fw-semibold small mb-1" style={{ color: '#0f766e' }}>AI Recommendation</div><div className="small text-secondary">Prioritize follow-up for 12 high-risk mothers. 3 missed ANC visits detected; SMS reminders have been queued.</div></div>
        </div></div>
        <div className="col-lg-5"><div className="bg-white rounded-4 p-4 border h-100">
          <h5 className="fw-bold mb-3">Recent Activity</h5>
          {[
            ['New maternal registration', 'Aline U. · 12 min ago', '#0f766e'],
            ['High-risk alert generated', 'BP elevated · 28 min ago', '#ef4444'],
            ['ANC appointment completed', 'Health Center Kigali · 1h ago', '#2563eb'],
            ['SMS reminder delivered', 'Kinyarwanda · 2h ago', '#f59e0b'],
            ['Postpartum follow-up logged', 'CHW Marie · 3h ago', '#7c3aed'],
          ].map((a, i) => <div key={i} className="d-flex gap-3 mb-3 align-items-start"><div className="rounded-circle mt-1 flex-shrink-0" style={{ width: 10, height: 10, background: a[2] }} /><div><div className="small fw-medium">{a[0]}</div><div style={{ fontSize: 12, color: '#64748b' }}>{a[1]}</div></div></div>)}
        </div></div>
      </div>
    </main>
  </div>;
}
