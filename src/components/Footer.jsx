import { useTranslation } from 'react-i18next';
import { HeartPulse, Mail, MapPin } from 'lucide-react';
export default function Footer(){
  const {t}=useTranslation();
  return <footer style={{background:'#042f2e',color:'#ccfbf1'}}>
    <div className="container mx-auto px-4 py-5">
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="d-flex align-items-center gap-2 mb-3"><div className="rounded-3 d-flex align-items-center justify-content-center" style={{width:40,height:40,background:'linear-gradient(135deg,#14b8a6,#0f766e)'}}><HeartPulse color="#fff" size={22}/></div><span className="font-display fw-bold text-white fs-4">{t('brand')}</span></div>
          <p className="opacity-75 small">{t('footer.desc')}</p>
          <div className="small opacity-75"><div className="d-flex gap-2 mb-1"><MapPin size={14}/>{t('contact.location')}</div><div className="d-flex gap-2"><Mail size={14}/>contact@mervie.ai</div></div>
        </div>
        <div className="col-6 col-lg-2"><h6 className="text-white fw-bold mb-3">{t('footer.platform')}</h6>{['#features','#modules','#how','#impact'].map((h,i)=><a key={h} href={h} className="d-block text-decoration-none mb-2 small" style={{color:'#99f6e4'}}>{[t('nav.features'),t('nav.modules'),t('nav.how'),t('nav.impact')][i]}</a>)}</div>
        <div className="col-6 col-lg-2"><h6 className="text-white fw-bold mb-3">{t('footer.company')}</h6><a href="#contact" className="d-block text-decoration-none mb-2 small" style={{color:'#99f6e4'}}>{t('nav.contact')}</a><span className="d-block small opacity-75">Jovial IGABURUGERO</span></div>
        <div className="col-lg-4"><h6 className="text-white fw-bold mb-3">{t('footer.legal')}</h6><div className="d-flex flex-wrap gap-3 small">{[t('footer.privacy'),t('footer.terms'),t('footer.security')].map(l=><span key={l} style={{color:'#99f6e4'}}>{l}</span>)}</div>
          <div className="mt-4 p-3 rounded-4" style={{background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)'}}><div className="small text-white fw-semibold mb-1">{t('hero.kicker')}</div><div className="small opacity-75">HIPAA-aware design principles · Data encryption · Role-based access · Consent management</div></div>
        </div>
      </div>
      <hr style={{borderColor:'rgba(255,255,255,.12)'}} className="my-4"/>
      <div className="d-flex flex-column flex-md-row justify-content-between small opacity-75 gap-2"><span>© 2026 Mervie AI. {t('footer.rights')}</span><span>{t('tagline')}</span></div>
    </div>
  </footer>;
}
