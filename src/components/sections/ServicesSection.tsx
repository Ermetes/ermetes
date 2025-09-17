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

  const [showBg, setShowBg] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!blockRef.current || !endRef.current) return;
      const blockRect = blockRef.current.getBoundingClientRect();
      const endRect = endRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      const topTrigger = isMobile ? window.innerHeight * 0.09 : window.innerHeight * 0.1 + 10;
      const endTrigger = isMobile ? window.innerHeight * 0.05 - 500 : window.innerHeight * 0.05;
      // On desktop, hide bg as soon as endRef enters viewport by 5%, on mobile by 30%
      if (blockRect.top < topTrigger && endRef.current && endRect.top > endTrigger) {
        setShowBg(true);
      } else {
        setShowBg(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="services" className="relative w-full flex items-stretch overflow-hidden">
      <div className="max-w-9xl relative w-full flex flex-col lg:flex-row items-stretch justify-center md:pt-8 md:pb-24 px-0 gap-0">
        {/* Conditionally show background image only when block is in viewport */}
        {showBg && (
          <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
            <img
              src="./assets/Hermes_Trismegistus.jpg"
              alt="Mercurius Trismegistus engraving"
              className="w-full h-full object-cover opacity-40"
              style={{ filter: 'grayscale(0.2) blur(0.5px)', objectPosition: 'top' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/40 to-white/40" />
          </div>
        )}
        {/* Left: Text */}
  <div className="relative z-10 flex-1 flex flex-col justify-start items-start px-4 md:pl-24 md:pr-8 lg:pt-0 lg:pr-0 bg-transparent text-justify">
          <div className="md:mb-8 w-full flex flex-col items-end justify-start font-extralight h-full" ref={blockRef}>
            <div className="w-full h-full min-h-[420px] flex flex-col justify-between bg-white/40 backdrop-blur-md rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-4xl md:text-4xl font-light mb-4 mt-2 text-[#00338D] drop-shadow-lg">Il nome e la storia</h3>
              <p className="font-normal text-left text-xl mb-2 text-[#00338D] w-full">Ermetes è una cooperativa sociale a mutualità prevalente, specializzata in manutenzioni, edilizia residenziale e servizi connessi.</p>
              <div className="text-gray-800 text-justify [word-spacing:-1.5px] text-lg leading-relaxed text-left w-full mt-4">
                <p className="mb-2 text-justify">Il nome si ispira ad Ermete Trismegisto, leggendario alchimista antico che, secondo la tradizione, aveva scoperto e trascritto la formula per la trasformazione del piombo in oro.</p>
                <p className="mb-2 text-justify">I numerosi discepoli alchimisti che nel corso del medioevo interpretarono la formula in senso letterale ed eseguirono gli esperimenti di trasformazione con fine speculativo alla ricerca di oro e facile ricchezza andarono incontro a reazioni chimiche ed esplosioni trovando morte certa.</p>
                <p className="mb-2 text-justify" ref={endRef}>I discepoli che invece la leggevano le formule con la giusta chiave di lettura spirituale, con etica e buon animo, scoprivano insegnamenti molto più profondi. La vera trasformazione non era quella dei metalli, ma quella dell’essere umano: il passaggio dal “piombo” della pesante vita quotidiana lontana dalla conoscenza all’“oro” della crescita spirituale, della saggezza e del bene comune.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Second column with text block */}
        <div className="relative z-10 flex-1 flex flex-col justify-start items-center px-4 md:px-16 md:pl-4 py-12 pt-0 bg-transparent text-justify">
          <div className="w-full h-full min-h-[420px] flex flex-col justify-between max-w-2xl mx-auto text-justify bg-white/40 backdrop-blur-md rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="mt-2 text-4xl md:text-4xl text-left font-light mb-4 text-[#00338D] drop-shadow-lg">La missione di Ermetes</h2>
            <p className="text-gray-800 text-lg leading-relaxed text-justify [word-spacing:-1.5px] w-full font-extralight mb-2">Come l’alchimia ermetica trasmuta l’essere umano, così la nostra cooperativa aspira a trasformare le difficoltà quotidiane in opportunità di sviluppo e benessere collettivo.</p>
            <p className="text-gray-800 text-lg leading-relaxed text-justify [word-spacing:-1.5px] w-full font-extralight mb-2">Come ci insegna la storia di Ermete dunque solo se le opportunità generate dalla cooperativa vengono colte dai soci con etica e spirito costruttivo, si genera valore, soddisfazione e crescita per tutti. Se invece prevale lo spirito speculativo egoistico di pochi non ci potranno essere buoni frutti.</p>
            <div  onClick={() => window.location.href = '/impact'}>
              <div className="text-gray-800 text-lg leading-relaxed text-justify [word-spacing:-1.5px] w-full font-extralight mb-6">Per saperne di più sulla nostra organizzazione</div>
              <Button
                className="text-white px-8 py-3 rounded-xl shadow-lg font-regular tracking-wide text-lg hover:bg-[#FFAA00]/80 transition-colors"
                style={{ backgroundColor: '#FFAA00' }}
              >
                Clicca qui
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;