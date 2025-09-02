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

const serviceImages = ['./ermetes/assets/construction-1.jpg', './ermetes/assets/maintenance/construction-2.jpg', './ermetes/assets/construction-3.jpeg', './ermetes/assets/construction-4.jpeg'];

const ServicesSection = () => {
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
    <section id="services" className="relative w-full min-h-screen flex items-stretch overflow-hidden">
      {/* Only show background for the about area */}
      <div className="relative w-full flex flex-col lg:flex-row items-stretch justify-center min-h-screen px-0 py-16 gap-0">
        {/* Background image absolutely positioned, only for this area */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img
            src="./ermetes/assets/Hermes_Trismegistus.jpg"
            alt="Mercurius Trismegistus engraving"
            className="w-full h-full object-cover opacity-30"
            style={{ filter: 'grayscale(0.2) blur(0.5px)', objectPosition: 'top' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/80 to-white/60" />
        </div>
        {/* Left: Text */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-start px-6 md:px-16 py-12 lg:py-24 bg-transparent text-justify">
          <div className="mb-8 w-full flex flex-col items-center justify-center">
            <div className="max-w-2xl w-full">
              <h3 className="text-4xl md:text-5xl font-light mb-4 text-[#00338D] drop-shadow-lg w-full">Il nome e la storia</h3>
              <p className="font-bold text-xl mb-4 text-[#00338D] w-full">Ermetes è una cooperativa sociale a mutualità prevalente, specializzata in manutenzioni, edilizia residenziale e servizi connessi.</p>
            </div>
                      <div className="text-gray-800 text-justify text-lg leading-relaxed text-left w-full max-w-2xl">
            <p className="mb-4 text-justify">Il nome si ispira ad <span className="font-bold">Ermete Trismegisto</span>, leggendario alchimista antico che, secondo la tradizione, aveva scoperto e trascritto la formula per la trasformazione del piombo in oro.</p>
            <p className="mb-4 text-justify">I numerosi discepoli alchimisti che nel corso del medioevo interpretarono la formula in senso letterale ed eseguirono gli esperimenti di trasformazione con fine speculativo alla ricerca di oro e facile ricchezza andarono incontro a reazioni chimiche ed esplosioni trovando morte certa.</p>
            <p className="mb-4 text-justify">I discepoli che invece la leggevano le formule con la giusta chiave di lettura spirituale, con etica e buon animo, scoprivano insegnamenti molto più profondi. La vera trasformazione non era quella dei metalli, ma quella dell’essere umano: il passaggio dal “piombo” della pesante vita quotidiana lontana dalla conoscenza all’“oro” della crescita spirituale, della saggezza e del bene comune.</p>
          </div>
          </div>
        </div>
        {/* Right: Full-height image */}
        <div className="relative z-10 hidden lg:flex flex-col justify-center items-center w-[40vw] min-w-[340px] max-w-[600px]">
          <img
            src="/ermetes/assets/Hermes_Trismegistus.jpg"
            alt="Mercurius Trismegistus engraving"
            className="object-contain h-[80vh] w-auto rounded-2xl shadow-2xl border border-[#00338D]/20 bg-white/80"
            style={{ filter: 'grayscale(0.2)' }}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;