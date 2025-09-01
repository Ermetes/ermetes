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

const serviceImages = ['.assets/construction-1.jpg', '.assets/maintenance/construction-2.jpg', '.assets/construction-3.jpeg', '.assets/construction-4.jpeg'];

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
    <section id="services" className="relative bg-gradient-to-br bg-gradient-to-br from-[#00338D]/5 to-[#00338D]/10 rounded-2xl p-4 lg:p-8 border border-[#00338D]/20 py-16">
      {/* Company Information Section */}
      <div id="about" className="py-5 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 gap-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-[#00338D]/10 flex flex-col justify-between">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-[#00338D]/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-[#00338D]" />
                </div>
                <h3 className="text-3xl font-light text-[#00338D]">{content.about.title}</h3>
              </div>
              <p className="text-gray-700 font-light mb-8 leading-relaxed text-justify text-lg">
                <span className="block mb-4"><span className="font-bold">Ermetes</span> è una cooperativa sociale a mutualità prevalente, specializzata in <span className="font-bold">manutenzioni, edilizia residenziale e servizi connessi</span>.</span>
                <span className="block text-xl font-semibold mt-6 mb-2">Il nome e la storia:</span>
                <span className="block mb-2">Il nome si ispira ad <span className="font-bold">Ermete Trismegisto</span> leggendario alchimista antico che, secondo la tradizione, aveva scoperto e trascritto la formula per la trasformazione del piombo in oro.</span>
                <span className="block mb-2">I numerosi discepoli alchimisti che nel corso del medioevo interpretarono la formula in senso letterale ed eseguirono gli esperimenti di trasformazione con fine speculativo alla ricerca di oro e facile ricchezza andarono incontro a reazioni chimiche ed esplosioni trovando morte certa.</span>
                <span className="block mb-4">I discepoli che invece la leggevano le formule con la giusta chiave di lettura spirituale con etica e buon animo scoprivano insegnamenti molto più profondi. La vera trasformazione non era quella dei metalli, ma quella dell’essere umano. Era il passaggio dal “piombo” della pesante vita quotidiana lontana dalla conoscenza all’“oro” della crescita spirituale, della saggezza e del bene comune.</span>
                <span className="block text-xl font-semibold mt-6 mb-2">La missione di Ermetes</span>
                <span className="block mb-2">La cooperativa ERMETES nasce proprio da questa visione: un percorso di trasformazione del “piombo” delle difficoltà quotidiane, all’“oro” di un gruppo coeso che condivide valori comuni generano benessere per gli individui e per la comunità.</span>
                <span className="block mb-2">Come l’alchimia ermetica trasmuta l’essere umano, così la nostra cooperativa aspira a trasformare le difficoltà quotidiane in opportunità di sviluppo e benessere collettivo.</span>
                <span className="block mb-4">Come ci insegna la storia di Ermete dunque se le opportunità vengono colte dai soci con <span className="font-bold">etica e spirito costruttivo</span>, si genera <span className="font-bold">valore, soddisfazione e crescita per tutti</span>. Se invece prevale lo spirito speculativo egoistico di pochi non ci potranno essere buoni frutti.</span>
                <span className="block mt-6 text-base text-[#00338D] font-medium">Per saperne di più sulla nostra mission e filosofia</span>
                <Button
                  className="mt-6 text-white px-8 py-3 rounded-xl shadow-lg font-semibold tracking-wide text-lg hover:bg-[#FFAA00]/80 transition-colors"
                  style={{ backgroundColor: '#FFAA00' }}
                  onClick={() => window.location.href = '/ermetes/impact'}
                >
                  CLICCA QUI
                </Button>
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-[#00338D]/10 rounded-3xl p-8 shadow-xl border border-green-200/40 flex flex-col justify-start h-fit">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-3xl font-light text-[#00338D]">{content.about.sustainability.title}</h3>
              </div>
              <p className="text-gray-700 font-light mb-8 leading-relaxed text-justify text-lg flex items-start">
                {content.about.sustainability.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;