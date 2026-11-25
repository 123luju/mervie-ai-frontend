import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartPulse, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setErr(''); setLoading(true);
    try { await login(email, password); nav('/dashboard'); }
    catch (e) { setErr(e.response?.data?.message || 'Login failed. Please try again.'); }
    finally { setLoading(false); }
  };
  return <div className="min-vh-100 d-flex" style={{ background: '#f0fdfa' }}>
    <div className="d-none d-lg-flex col-lg-5 hero-mesh text-white p-5 flex-column justify-content-between">
      <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none text-white"><div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: 44, height: 44, background: 'linear-gradient(135deg,#14b8a6,#0f766e)' }}><HeartPulse size={24} /></div><span className="font-display fw-bold fs-3">Mervie AI</span></Link>
      <div><h1 className="font-display fw-bold display-5 mb-3">Intelligence for<br />Maternal Health</h1><p className="opacity-75 lead">Secure access for mothers, midwives, doctors, nurses, and community health workers.</p></div>
      <div className="small opacity-75">© 2026 Mervie AI · Kigali, Rwanda</div>
    </div>
    <div className="flex-fill d-flex align-items-center justify-content-center p-4">
      <div className="w-100" style={{ maxWidth: 460 }}>
        <Link to="/" className="d-lg-none d-flex align-items-center gap-2 text-decoration-none mb-4" style={{ color: '#0f766e' }}><HeartPulse size={28} /><span className="font-display fw-bold fs-3">Mervie AI</span></Link>
        <h2 className="font-display fw-bold mb-1">{t('auth.welcome')}</h2>
        <p className="text-secondary mb-4">Sign in to your Mervie AI account</p>
        {err && <div className="alert alert-danger rounded-4">{err}</div>}
        <form onSubmit={submit} className="bg-white p-4 p-md-5 rounded-4 shadow-sm border">
          <div className="mb-3"><label className="form-label fw-semibold small">{t('auth.email')}</label><div className="input-group"><span className="input-group-text bg-white"><Mail size={18} className="text-secondary" /></span><input type="email" required className="form-control form-control-lg" value={email} onChange={e => setEmail(e.target.value)} /></div></div>
          <div className="mb-4"><label className="form-label fw-semibold small">{t('auth.password')}</label><div className="input-group"><span className="input-group-text bg-white"><Lock size={18} className="text-secondary" /></span><input type="password" required className="form-control form-control-lg" value={password} onChange={e => setPassword(e.target.value)} /></div></div>
          <button disabled={loading} className="btn-mervie w-100 d-flex justify-content-center align-items-center gap-2" type="submit">{loading ? 'Signing in...' : t('auth.login')} {!loading && <ArrowRight size={18} />}</button>
          <p className="text-center small text-secondary mt-4 mb-0">{t('auth.noAccount')} <Link to="/register" style={{ color: '#0f766e', fontWeight: 700 }}>{t('auth.register')}</Link></p>
        </form>
      </div>
    </div>
  </div>;
}
