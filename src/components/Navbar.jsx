import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, HeartPulse } from 'lucide-react';
import { languages } from '../i18n';

export default function Navbar(){
  const {t,i18n}=useTranslation();
  const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{ const onS=()=>setScrolled(window.scrollY>20); window.addEventListener('scroll',onS); return ()=>window.removeEventListener('scroll',onS); },[]);
  const changeLang=(e)=>{ const l=e.target.value; i18n.changeLanguage(l); const meta=languages.find(x=>x.code===l); document.documentElement.dir=meta?.dir||'ltr'; document.documentElement.lang=l; };
  const nav=[['#features',t('nav.features')],['#modules',t('nav.modules')],['#how',t('nav.how')],['#impact',t('nav.impact')],['#contact',t('nav.contact')]];
  return <nav className={`fixed top-0 w-full z-50 transition-all ${scrolled?'nav-blur shadow-lg':'bg-transparent'}`}>
    <div className="container mx-auto px-4 py-3 d-flex align-items-center justify-content-between">
      <a href="#home" className="d-flex align-items-center gap-2 text-decoration-none">
        <div className="rounded-3 d-flex align-items-center justify-content-center" style={{width:42,height:42,background:'linear-gradient(135deg,#14b8a6,#0f766e)'}}>
          <HeartPulse color="#fff" size={24}/>
        </div>
        <div><div className="font-display fw-bold text-white fs-4 lh-1">{t('brand')}</div><div style={{fontSize:10,color:'#99f6e4',letterSpacing:'.08em'}}>{t('tagline')}</div></div>
      </a>
      <div className="d-none d-lg-flex align-items-center gap-4">
        {nav.map(([h,l])=><a key={h} href={h} className="text-white text-decoration-none opacity-75 hover:opacity-100 fw-medium" style={{fontSize:'.92rem'}}>{l}</a>)}
        <div className="d-flex align-items-center gap-1"><Globe size={16} color="#99f6e4"/><select className="lang-select" value={i18n.language?.slice(0,2)||'en'} onChange={changeLang}>{languages.map(l=><option key={l.code} value={l.code}>{l.name}</option>)}</select></div>
        <Link to="/login" className="text-white text-decoration-none fw-semibold">{t('nav.login')}</Link>
        <Link to="/register" className="btn-mervie text-decoration-none" style={{padding:'.55rem 1.2rem',fontSize:'.9rem'}}>{t('nav.getStarted')}</Link>
      </div>
      <button className="d-lg-none btn text-white" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X/>:<Menu/>}</button>
    </div>
    {open && <div className="d-lg-none nav-blur px-4 pb-4">
      {nav.map(([h,l])=><a key={h} href={h} onClick={()=>setOpen(false)} className="d-block py-2 text-white text-decoration-none">{l}</a>)}
      <div className="py-2"><select className="lang-select w-100" value={i18n.language?.slice(0,2)||'en'} onChange={changeLang}>{languages.map(l=><option key={l.code} value={l.code}>{l.name}</option>)}</select></div>
      <div className="d-flex gap-2 mt-2"><Link to="/login" className="btn btn-outline-light rounded-pill flex-fill">{t('nav.login')}</Link><Link to="/register" className="btn-mervie text-decoration-none text-center flex-fill">{t('nav.getStarted')}</Link></div>
    </div>}
  </nav>;
}
