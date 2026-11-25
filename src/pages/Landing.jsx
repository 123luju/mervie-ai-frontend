import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HeartPulse, Shield, Brain, Users, Activity, Bell, Globe2, Phone, Baby, Stethoscope, Ambulance, BarChart3, WifiOff, ArrowRight, CheckCircle2, MapPin, Mail, Send, Sparkles, LineChart, HeartHandshake, Microscope } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

export default function Landing() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', org: '', message: '' });
  const [sent, setSent] = useState(false);
  const submit = async (e) => { e.preventDefault(); try { await api.post('/contact', form); } catch {} setSent(true); setForm({ name: '', email: '', org: '', message: '' }); };

  const problems = t('problem.items', { returnObjects: true }) || [];
  const moduleIcons = [HeartPulse, Brain, Stethoscope, Users, HeartHandshake, WifiOff, Bell, BarChart3, Baby];
  const moduleKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  const modules = moduleKeys.map((k, i) => ({ icon: moduleIcons[i], title: t(`modules.${k}.title`), desc: t(`modules.${k}.desc`) }));
  const innovations = [
    { icon: Ambulance, title: t('innovations.i1.title'), desc: t('innovations.i1.desc') },
    { icon: LineChart, title: t('innovations.i2.title'), desc: t('innovations.i2.desc') },
    { icon: Microscope, title: t('innovations.i3.title'), desc: t('innovations.i3.desc') },
  ];
  const steps = [
    { icon: Users, t: t('how.s1.title'), d: t('how.s1.desc') },
    { icon: Activity, t: t('how.s2.title'), d: t('how.s2.desc') },
    { icon: Bell, t: t('how.s3.title'), d: t('how.s3.desc') },
    { icon: Baby, t: t('how.s4.title'), d: t('how.s4.desc') },
  ];

  return <div>
    <Navbar />
    <section id="home" className="hero-mesh text-white position-relative overflow-hidden" style={{ paddingTop: 120, paddingBottom: 90 }}>
      <div className="position-absolute w-100 h-100" style={{ top: 0, left: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.5 }} />
      <div className="container mx-auto px-4 position-relative">
        <div className="row align-items-center g-5">
          <motion.div className="col-lg-6" initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fade} className="d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2 mb-4" style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)' }}>
              <span className="pulse-dot" /><span className="small fw-semibold" style={{ color: '#99f6e4' }}>{t('hero.kicker')}</span>
            </motion.div>
            <motion.h1 variants={fade} className="font-display fw-bold mb-3" style={{ fontSize: 'clamp(2.4rem,5.5vw,4.5rem)', lineHeight: 1.08 }}>
              {t('hero.title1')}<br /><span style={{ background: 'linear-gradient(135deg,#5eead4,#facc15,#fb923c)', WebkitBackgroundClip: 'text', color: 'transparent' }}>{t('hero.title2')}</span>
            </motion.h1>
            <motion.p variants={fade} className="lead mb-4 opacity-90" style={{ maxWidth: 620 }}>{t('hero.desc')}</motion.p>
            <motion.div variants={fade} className="d-flex flex-wrap gap-3 mb-4">
              <a href="#modules" className="btn-mervie text-decoration-none d-inline-flex align-items-center gap-2">{t('hero.cta1')} <ArrowRight size={18} /></a>
              <a href="#contact" className="btn-mervie-outline text-decoration-none">{t('hero.cta2')}</a>
            </motion.div>
            <motion.div variants={fade} className="d-flex align-items-center gap-2 small" style={{ color: '#99f6e4' }}><Shield size={16} />{t('hero.trust')}</motion.div>
          </motion.div>
          <motion.div className="col-lg-6" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
            <div className="position-relative mx-auto" style={{ maxWidth: 560 }}>
              <div className="rounded-4 p-4 glass" style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.14)' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div><div className="text-white fw-bold">{t('dashboard.risk')}</div><div className="small" style={{ color: '#99f6e4' }}>Live maternal monitoring</div></div>
                  <span className="badge rounded-pill" style={{ background: 'rgba(20,184,166,.2)', color: '#5eead4' }}>AI Active</span>
                </div>
                <div className="row g-3 mb-3">
                  {[{ l: 'Mothers Monitored', v: '2,847', c: '#14b8a6' }, { l: 'High-Risk Alerts', v: '12', c: '#f97316' }, { l: 'ANC Visits Today', v: '143', c: '#facc15' }].map(s => (
                    <div className="col-4" key={s.l}><div className="rounded-4 p-3 h-100" style={{ background: 'rgba(0,0,0,.18)' }}><div className="fw-bold fs-4" style={{ color: s.c }}>{s.v}</div><div style={{ fontSize: 11, color: '#ccfbf1', lineHeight: 1.3 }}>{s.l}</div></div></div>
                  ))}
                </div>
                <div className="rounded-4 p-3 mb-3" style={{ background: 'rgba(0,0,0,.18)' }}>
                  <div className="d-flex justify-content-between small mb-2"><span style={{ color: '#ccfbf1' }}>Pregnancy Risk Distribution</span><span style={{ color: '#5eead4' }}>This week</span></div>
                  {[['Low Risk', 72, '#14b8a6'], ['Moderate', 21, '#facc15'], ['High Risk', 7, '#f97316']].map(r => (
                    <div key={r[0]} className="mb-2"><div className="d-flex justify-content-between" style={{ fontSize: 12 }}><span>{r[0]}</span><span>{r[1]}%</span></div><div className="rounded-pill" style={{ height: 6, background: 'rgba(255,255,255,.1)' }}><div className="rounded-pill" style={{ width: r[1] + '%', height: 6, background: r[2] }} /></div></div>
                  ))}
                </div>
                <div className="d-flex gap-2 align-items-start rounded-4 p-3" style={{ background: 'rgba(249,115,22,.12)', border: '1px solid rgba(249,115,22,.25)' }}>
                  <Sparkles size={18} color="#fb923c" className="mt-1 flex-shrink-0" /><div><div className="fw-semibold small" style={{ color: '#fed7aa' }}>Mervie AI Insight</div><div style={{ fontSize: 12, color: '#ffedd5' }}>3 mothers missed ANC appointments. Automated SMS reminders sent in Kinyarwanda.</div></div>
                </div>
              </div>
              <div className="position-absolute rounded-4 p-3 float-y d-none d-md-block" style={{ bottom: -20, left: -20, background: '#fff', color: '#132a2e', boxShadow: '0 20px 50px rgba(0,0,0,.15)', width: 220 }}>
                <div className="d-flex gap-2 align-items-center"><div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 38, height: 38, background: '#ccfbf1' }}><Phone size={18} color="#0f766e" /></div><div><div className="fw-bold small">USSD Access</div><div style={{ fontSize: 12, color: '#0f766e' }}>*999# · No smartphone needed</div></div></div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="row g-3 mt-5 pt-3">
          {[{ v: '9', l: t('hero.stat1') }, { v: '50+', l: t('hero.stat2') }, { v: '8', l: t('hero.stat3') }].map(s => (
            <div className="col-4" key={s.l}><div className="text-center text-md-start"><div className="font-display fw-bold fs-2" style={{ color: '#5eead4' }}>{s.v}</div><div className="small opacity-75">{s.l}</div></div></div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-5 bg-white" id="problem">
      <div className="container mx-auto px-4 py-4">
        <div className="row g-5 align-items-center">
          <div className="col-lg-5">
            <span className="section-kicker mb-3">{t('problem.kicker')}</span>
            <h2 className="font-display fw-bold mb-3" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>{t('problem.title')}</h2>
            <p className="text-secondary mb-4">{t('problem.desc')}</p>
            <div className="rounded-4 p-4 text-white" style={{ background: 'linear-gradient(135deg,#042f2e,#0f766e)' }}>
              <div className="fw-bold fs-5 mb-2">Mervie AI bridges the gap</div>
              <p className="mb-0 small opacity-90">A unified digital ecosystem that empowers healthcare professionals and gives every mother access to intelligent, continuous maternal care.</p>
            </div>
          </div>
          <div className="col-lg-7"><div className="row g-2">
            {(Array.isArray(problems) ? problems : []).map((p, i) => (
              <div className="col-md-6" key={i}><div className="d-flex gap-2 p-3 rounded-4 h-100" style={{ background: '#f7fffd', border: '1px solid #ccfbf1' }}><div className="mt-1 flex-shrink-0 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 24, height: 24, background: '#fee2e2', color: '#dc2626', fontSize: 12, fontWeight: 700 }}>{i + 1}</div><span className="small">{p}</span></div></div>
            ))}
          </div></div>
        </div>
      </div>
    </section>

    <section id="features" className="py-5 bg-grid" style={{ backgroundColor: '#f0fdfa' }}>
      <div id="modules" className="container mx-auto px-4 py-4">
        <div className="text-center mb-5"><span className="section-kicker mb-3">{t('modules.kicker')}</span><h2 className="font-display fw-bold" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>{t('modules.title')}</h2><p className="text-secondary mx-auto" style={{ maxWidth: 700 }}>{t('features.desc')}</p></div>
        <div className="row g-4">
          {modules.map((m, i) => { const I = m.icon; return <div className="col-md-6 col-lg-4" key={i}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="bg-white rounded-4 p-4 h-100 card-lift border" style={{ borderColor: '#e6fffa' }}>
              <div className="d-inline-flex align-items-center justify-content-center rounded-4 mb-3" style={{ width: 52, height: 52, background: 'linear-gradient(135deg,#ccfbf1,#99f6e4)', color: '#0f766e' }}><I size={26} /></div>
              <h5 className="fw-bold mb-2">{m.title}</h5><p className="text-secondary small mb-0">{m.desc}</p>
            </motion.div>
          </div>; })}
        </div>
      </div>
    </section>

    <section className="py-5 text-white" style={{ background: '#042f2e' }}>
      <div className="container mx-auto px-4 py-4">
        <div className="text-center mb-5"><span className="section-kicker mb-3" style={{ background: 'rgba(250,204,21,.15)', color: '#fde68a' }}>{t('innovations.kicker')}</span><h2 className="font-display fw-bold">{t('innovations.title')}</h2></div>
        <div className="row g-4">
          {innovations.map((inn, i) => { const I = inn.icon; return <div className="col-lg-4" key={i}><div className="rounded-4 p-4 h-100 card-lift" style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)' }}>
            <div className="d-inline-flex align-items-center justify-content-center rounded-4 mb-3" style={{ width: 56, height: 56, background: 'linear-gradient(135deg,#f97316,#facc15)', color: '#042f2e' }}><I size={28} /></div>
            <h4 className="fw-bold mb-2">{inn.title}</h4><p className="small opacity-75 mb-0">{inn.desc}</p>
          </div></div>; })}
        </div>
      </div>
    </section>

    <section id="how" className="py-5 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="text-center mb-5"><span className="section-kicker mb-3">{t('how.kicker')}</span><h2 className="font-display fw-bold">{t('how.title')}</h2></div>
        <div className="row g-4">
          {steps.map((s, i) => { const I = s.icon; return <div className="col-md-6 col-lg-3" key={i}><div className="text-center p-3">
            <div className="mx-auto mb-3 position-relative d-flex align-items-center justify-content-center rounded-circle" style={{ width: 80, height: 80, background: 'linear-gradient(135deg,#0f766e,#14b8a6)', color: '#fff', boxShadow: '0 12px 30px rgba(15,118,110,.25)' }}>
              <I size={32} /><span className="position-absolute rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: 28, height: 28, background: '#f97316', color: '#fff', top: -4, right: -4, fontSize: 12 }}>{i + 1}</span>
            </div>
            <h5 className="fw-bold">{s.t}</h5><p className="text-secondary small mb-0">{s.d}</p>
          </div></div>; })}
        </div>
      </div>
    </section>

    <section id="impact" className="py-5" style={{ background: 'linear-gradient(180deg,#f0fdfa,#fff)' }}>
      <div className="container mx-auto px-4 py-4">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <span className="section-kicker mb-3">{t('impact.kicker')}</span>
            <h2 className="font-display fw-bold mb-3" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>{t('impact.title')}</h2>
            <p className="text-secondary mb-4">{t('impact.desc')}</p>
            {[{ l: t('impact.rwanda'), d: 'Pilot in selected health facilities, CHW integration, Kinyarwanda voice & SMS.', p: 100, c: '#0f766e' }, { l: t('impact.africa'), d: 'Regional expansion, institutional partnerships, multilingual scale.', p: 55, c: '#14b8a6' }, { l: t('impact.global'), d: 'International maternal-health ecosystem with research collaboration.', p: 25, c: '#f97316' }].map(r => (
              <div key={r.l} className="p-3 rounded-4 bg-white border mb-3"><div className="d-flex justify-content-between fw-semibold mb-1"><span>{r.l}</span><span style={{ color: r.c }}>{r.p}%</span></div><div className="small text-secondary mb-2">{r.d}</div><div className="rounded-pill" style={{ height: 8, background: '#e6fffa' }}><div className="rounded-pill" style={{ width: r.p + '%', height: 8, background: r.c }} /></div></div>
            ))}
          </div>
          <div className="col-lg-6">
            <div className="rounded-4 p-4 p-md-5 text-white" style={{ background: 'linear-gradient(145deg,#0f766e,#042f2e)' }}>
              <Globe2 size={48} color="#5eead4" className="mb-3" />
              <h3 className="font-display fw-bold mb-3">Designed for real-world access</h3>
              {['50+ international languages with auto-detection', 'USSD *999# and SMS for low-connectivity areas', 'Kinyarwanda voice assistance', 'Secure, role-based access for 8 user types', 'Interoperability-ready architecture (OpenMRS/FHIR path)'].map(x => <div key={x} className="d-flex gap-2 mb-2"><CheckCircle2 size={18} color="#5eead4" className="mt-1 flex-shrink-0" /><span className="small">{x}</span></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" className="py-5 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="row g-5">
          <div className="col-lg-5">
            <span className="section-kicker mb-3">{t('contact.kicker')}</span>
            <h2 className="font-display fw-bold mb-3">{t('contact.title')}</h2>
            <p className="text-secondary mb-4">{t('contact.desc')}</p>
            <div className="p-4 rounded-4 mb-3" style={{ background: '#f0fdfa', border: '1px solid #ccfbf1' }}>
              <div className="fw-bold mb-1">{t('contact.founder')}</div>
              <div className="fs-5 font-display fw-bold" style={{ color: '#0f766e' }}>Jovial IGABURUGERO</div>
              <div className="small text-secondary d-flex gap-2 mt-2"><MapPin size={14} />{t('contact.location')}</div>
              <div className="small text-secondary d-flex gap-2"><Mail size={14} />contact@mervie.ai</div>
            </div>
            <div className="d-flex gap-2 flex-wrap">{['Technical Partners', 'Health Institutions', 'Investors', 'NGOs'].map(x => <span key={x} className="badge rounded-pill text-dark" style={{ background: '#ccfbf1', padding: '.6rem .9rem' }}>{x}</span>)}</div>
          </div>
          <div className="col-lg-7">
            <form onSubmit={submit} className="p-4 p-md-5 rounded-4 border bg-white shadow-sm">
              {sent && <div className="alert alert-success rounded-4">Thank you! Your message has been received. We'll get back to you soon.</div>}
              <div className="row g-3">
                <div className="col-md-6"><label className="form-label fw-semibold small">{t('contact.name')}</label><input required className="form-control form-control-lg rounded-3" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div className="col-md-6"><label className="form-label fw-semibold small">{t('contact.email')}</label><input required type="email" className="form-control form-control-lg rounded-3" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div className="col-12"><label className="form-label fw-semibold small">{t('contact.org')}</label><input className="form-control form-control-lg rounded-3" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} /></div>
                <div className="col-12"><label className="form-label fw-semibold small">{t('contact.message')}</label><textarea required rows={4} className="form-control rounded-3" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></div>
                <div className="col-12"><button className="btn-mervie d-inline-flex align-items-center gap-2" type="submit"><Send size={18} />{t('contact.send')}</button></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>;
}
