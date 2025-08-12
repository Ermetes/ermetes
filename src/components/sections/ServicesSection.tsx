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

const serviceImages = ['./assets/construction-1.jpg', './assets/construction-2.jpg', './assets/construction-3.jpeg', './assets/construction-4.jpeg'];

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
    <section id="services" className="relative bg-white">
      {/* Company Information Section */}
      <div id="about" className="bg-white py-5 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 gap-4">
            <div className="bg-gradient-to-br from-[#00338D]/5 to-[#00338D]/10 rounded-2xl p-4 lg:p-8 border border-[#00338D]/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#00338D]/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-[#00338D]" />
                </div>
                <h3 className="text-3xl font-light text-[#00338D]">{content.about.title}</h3>
              </div>
              <p className="text-gray-600 font-light mb-6 leading-relaxed text-justify">
                {content.about.description}
                <span className="block mt-6 text-base text-[#00338D] font-medium">Par separa di più pulla noaina mibafon a dibaoila</span>
                <Button
                  className="mt-4 text-white px-6 py-2 rounded-lg shadow"
                  style={{ backgroundColor: '#FFAA00' }}
                  onClick={() => window.location.href = '/ermetes/about'}
                >
                  CLICCA QUI
                </Button>
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-[#00338D]/5 rounded-2xl p-4 lg:p-8 border border-green-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-3xl font-light text-[#00338D]">{content.about.sustainability.title}</h3>
              </div>
              <p className="text-gray-600 font-light mb-6 leading-relaxed text-justify">
                {content.about.sustainability.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#00338D] to-[#0066CC] py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-light text-white mb-6">
            {content.services.ctaTitle}
          </h3>
          <Button
            className="mt-2 text-white px-6 py-2 rounded-lg shadow"
            style={{ backgroundColor: '#FFAA00' }}
            onClick={() => window.location.href = 'mailto:info@ermetes.it?subject=Ermetes:lavora con noi'}
          >
            Contattaci
          </Button>
          {/* Removed modal trigger button for quote request */}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;