import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartPulse, Mail, Lock, User, Briefcase, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const roles = ['Mother', 'Midwife', 'Doctor', 'Nurse', 'Community Health Worker', 'Facility Administrator', 'Health System Admin', 'Researcher'];

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Mother' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setErr(''); setLoading(true);
    try { await register(form); nav('/dashboard'); }
    catch (e) { setErr(e.response?.data?.message || 'Registration failed. Please try again.'); }
    finally { setLoading(false); }
  };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return <div className="min-vh-100 d-flex" style={{ background: '#f0fdfa' }}>
    <div className="d-none d-lg-flex col-lg-5 hero-mesh text-white p-5 flex-column justify-content-between">
      <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none text-white"><div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: 44, height: 44, background: 'linear-gradient(135deg,#14b8a6,#0f766e)' }}><HeartPulse size={24} /></div><span className="font-display fw-bold fs-3">Mervie AI</span></Link>
      <div><h1 className="font-display fw-bold display-5 mb-3">Join the Maternal<br />Health Ecosystem</h1><p className="opacity-75 lead">Create your secure role-based account and connect to intelligent maternal care.</p></div>
      <div className="small opacity-75">© 2026 Mervie AI · Kigali, Rwanda</div>
    </div>
    <div className="flex-fill d-flex align-items-center justify-content-center p-4">
      <div className="w-100" style={{ maxWidth: 500 }}>
        <Link to="/" className="d-lg-none d-flex align-items-center gap-2 text-decoration-none mb-4" style={{ color: '#0f766e' }}><HeartPulse size={28} /><span className="font-display fw-bold fs-3">Mervie AI</span></Link>
        <h2 className="font-display fw-bold mb-1">{t('auth.create')}</h2>
        <p className="text-secondary mb-4">Start your Mervie AI journey</p>
        {err && <div className="alert alert-danger rounded-4">{err}</div>}
        <form onSubmit={submit} className="bg-white p-4 p-md-5 rounded-4 shadow-sm border">
          <div className="mb-3"><label className="form-label fw-semibold small">{t('auth.name')}</label><div className="input-group"><span className="input-group-text bg-white"><User size={18} className="text-secondary" /></span><input required className="form-control form-control-lg" value={form.name} onChange={set('name')} /></div></div>
          <div className="mb-3"><label className="form-label fw-semibold small">{t('auth.email')}</label><div className="input-group"><span className="input-group-text bg-white"><Mail size={18} className="text-secondary" /></span><input type="email" required className="form-control form-control-lg" value={form.email} onChange={set('email')} /></div></div>
          <div className="mb-3"><label className="form-label fw-semibold small">{t('auth.role')}</label><div className="input-group"><span className="input-group-text bg-white"><Briefcase size={18} className="text-secondary" /></span><select className="form-select form-select-lg" value={form.role} onChange={set('role')}>{roles.map(r => <option key={r} value={r}>{r}</option>)}</select></div></div>
          <div className="mb-4"><label className="form-label fw-semibold small">{t('auth.password')}</label><div className="input-group"><span className="input-group-text bg-white"><Lock size={18} className="text-secondary" /></span><input type="password" required minLength={6} className="form-control form-control-lg" value={form.password} onChange={set('password')} /></div></div>
          <button disabled={loading} className="btn-mervie w-100 d-flex justify-content-center align-items-center gap-2" type="submit">{loading ? 'Creating account...' : t('auth.register')} {!loading && <ArrowRight size={18} />}</button>
          <p className="text-center small text-secondary mt-4 mb-0">{t('auth.hasAccount')} <Link to="/login" style={{ color: '#0f766e', fontWeight: 700 }}>{t('auth.login')}</Link></p>
        </form>
      </div>
    </div>
  </div>;
}
