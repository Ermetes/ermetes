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
    <section id="sustainability" className="relative w-full py-16 bg-gradient-to-br from-[#00338D]/5 to-[#00338D]/10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-20">
        <div className="flex flex-col lg:flex-row items-start w-full gap-16">
          <div className="flex flex-row items-center mb-6 w-full max-w-2xl">
            <div className="mr-4 flex items-center justify-center">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-light text-[#00338D]">{content.about.sustainability.title}</h3>
          </div>
          <div className="w-full max-w-2xl">
            <p className="text-gray-700 font-light mb-8 leading-relaxed text-justify text-lg flex items-start">
              {content.about.sustainability.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;