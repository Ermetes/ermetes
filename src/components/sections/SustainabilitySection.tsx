import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Wrench, Construction, ClipboardCheck, Users, Leaf } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const iconMap = {
  building: Building,
  wrench: Wrench,
  construction: Construction,
  'clipboard-check': ClipboardCheck,
};

const serviceImages = ['./assets/construction-1.jpg', './assets/maintenance/construction-2.jpg', './assets/construction-3.jpeg', './assets/construction-4.jpeg'];

const SustainabilitySection = () => {
  const { content } = useLanguage();
  // Modal logic removed
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const sections = containerRef.current.querySelectorAll('[data-service-panel]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const rect = element.getBoundingClientRect();
        const elementTop = window.scrollY + rect.top;
        const elementBottom = elementTop + element.offsetHeight;

        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="sustainability" className="relative w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #eaf7ff 80%, #fff 100%)' }}>
      {/* Top SVG curve hidden on mobile */}
      <div className="relative w-full flex justify-center items-center hidden sm:flex" style={{ height: '140px' }}>
        <svg viewBox="1050 0 140 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full">
          <path d="M0,80 C90,110 60,0 1440,90 L10940,0 L0,0 Z" fill="#ffffffff" />
        </svg>
        <div className="absolute inset-0 flex mt-10 justify-center items-center h-full">
          <h3 className="text-4xl font-light text-[#3a4a5a] leading-tight z-10 text-left px-4" style={{marginTop: '32px'}}>
            Un occhio di riguardo all'ambiente e alla sostenibilità
          </h3>
        </div>
      </div>
      {/* Mobile heading only */}
      <div className="sm:hidden w-full flex justify-center items-center" style={{ height: '80px' }}>
        <h3 className="text-2xl font-light text-[#3a4a5a] leading-tight z-10 text-center px-4" style={{marginTop: '24px'}}>
          Un occhio di riguardo all'ambiente e alla sostenibilità
        </h3>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row items-center gap-12 relative z-10">
        <div className="flex-1 flex flex-col justify-center">
          {/* Heading moved above in curved SVG */}
          <p className="text-gray-700 text-justify font-light mb-6 leading-relaxed text-lg">
            Ermetes ci tiene davvero all’ambiente. Grazie a un apposito gestionale che tiene traccia sia a preventivo che a consuntivo dell’impatto ambientale dei lavori e delle commesse.
          </p>
          <p className="text-gray-700 text-justify font-light leading-relaxed text-lg">
            Grazie alla partnership con l’organizzazione no profit “Sustainable Economy Association” le emissioni misurate possono essere compensate tramite progetti di piantumazione e riforestazione.
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center w-full">
          <img
            src="./assets/sito-ermetes.jpg"
            alt="Sustainability"
            className="rounded-3xl shadow-lg object-cover w-full max-w-md h-[320px] lg:h-[340px]"
            style={{ borderRadius: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
          />
        </div>
      </div>
      {/* Curved bottom edge hidden on mobile */}
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none hidden sm:block">
        <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0,40 C480,120 960,0 1440,80 L1440,100 L0,100 Z" fill="url(#blueGradient)" />
          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="1440" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#eaf7ff" />
              <stop offset="1" stopColor="#5bb3d6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default SustainabilitySection;