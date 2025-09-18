import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
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
      <div className="max-w-9xl relative w-full flex flex-col lg:flex-row items-stretch justify-center md:pb-24 px-0 gap-0 w-full md:px-16 md:pb-16">
        {/* Left: Text */}
  <div className="relative z-10 flex-1 flex flex-col justify-start items-start px-4 md:pl-24 md:pr-8 lg:pt-0 lg:pr-0 bg-transparent text-justify">
          <div className="w-full flex flex-col items-end justify-start font-extralight h-full" ref={blockRef}>
            <div className="w-full h-full min-h-[200px] flex flex-col justify-start bg-white/40 backdrop-blur-md rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-4xl md:text-4xl font-light mb-4 mt-2 text-[#00338D] drop-shadow-lg">Il nome e la storia</h3>
              <p className="font-normal text-left text-xl mb-2 text-[#00338D] w-full">Ermetes è una cooperativa sociale a mutualità prevalente, specializzata in manutenzioni, edilizia residenziale e servizi connessi.</p>
              <div className="text-gray-800 text-justify [word-spacing:-1.5px] text-lg leading-relaxed text-left w-full mt-2">
                <p className="text-justify">Il nome si ispira ad Ermete Trismegisto, leggendario alchimista antico che, secondo la tradizione, aveva scoperto e trascritto la formula per la trasformazione del piombo in oro.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Second column with text block */}
        <div className="relative z-10 flex-1 flex flex-col justify-start items-center px-4 pl-2 md:px-24 pt-0 bg-transparent text-justify">
          <div className="w-full h-full min-h-[200px] flex flex-col justify-between max-w-2xl mx-auto text-justify bg-white/40 backdrop-blur-md rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="mt-2 text-4xl md:text-4xl text-left font-light mb-4 text-[#00338D] drop-shadow-lg">La missione di Ermetes</h2>
            <p className="text-gray-800 text-lg leading-relaxed text-justify [word-spacing:-1.5px] w-full font-extralight mb-2">Come l’alchimia ermetica trasmuta l’essere umano, così la nostra cooperativa aspira a trasformare le difficoltà quotidiane in opportunità di sviluppo e benessere collettivo.</p>
            <div  onClick={() => window.location.href = '/about'} className="pb-2">
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