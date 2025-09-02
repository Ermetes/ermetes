
import ConstructionBackground from "@/components/background/ConstructionBackground";
import ModernNavigation from "@/components/navigation/ModernNavigation";
import ConstructionHero from "@/components/hero/ConstructionHero";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsScroll from "@/components/sections/ProjectsScroll";
import Footer from "@/components/sections/Footer";
import WorkWithUs from "@/components/sections/WorkWithUs";
import { useEffect, useRef, useState } from "react";
import SustainabilitySection from "@/components/sections/SustainabilitySection";
import { Button } from "@/components/ui/button";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [showBannerBg, setShowBannerBg] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const selector = 'a[href^="https://elfsight.com/social-feed-widget/?utm_source=websites&utm_medium=clients&utm_content=social-feed&utm_term=ermetes.github.io&utm_campaign=free-widget"]';
      const el = document.querySelector(selector);
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroRect = heroRef.current.getBoundingClientRect();
      // Hide image if hero is in viewport (top 60% of screen)
      setShowBannerBg(!(heroRect.bottom > 0 && heroRect.top < window.innerHeight * 0.6));
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <ModernNavigation />
        <div ref={heroRef}>
          <ConstructionHero />
        </div>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="w-full md:px-16 md:py-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 md:mb-8 text-[#00338D] text-left drop-shadow-lg w-full md:text-center">Perchè affidarci un nuovo lavoro?</h2>
            <p className="font-bold text-xl font-medium mb-4 text-[#00338D] text-left w-full md:text-center">In un settore ricco di insidie il team ERMETES ci tiene a distinguersi per correttezza e rapidità.</p>
            <p className="text-gray-800 text-lg leading-relaxed text-justify w-full font-extralight">
              Garantisce sopralluoghi e preventivi in tempi certi, propone prezzi chiari senza sorprese, pianifica con precisione i tempi d'intervento e condivide anche quotidianamente gli avanzamenti lavori in cloud con i committenti più ansiosi. Instauraf in da subito un rapporto di dialogo e fiducia. Se richiesto da clienti industriali o enti pubblici ERMETES sa rispettare specifici standard ambientali, gestire la tracciabilità di filiera con materiali sostenibili e condividere la contabilità emissiva misurata in "Co2eq" di commessa.
            </p>
          </div>
        </section>
        
        <ServicesSection />
        {/* Team Photo Section */}
        <section className="w-full relative flex justify-center items-center py-0" style={{ minHeight: '320px' }}>
          {/* Main team photo */}
          <div className="relative z-10 w-full flex justify-center items-center">
            <img
              src="./assets/team.jpg"
              alt="Team Ermetes"
              className="w-full max-w-3xl h-[320px] md:h-[420px] object-cover object-center rounded-2xl shadow-xl"
              style={{ objectPosition: 'center', background: 'rgba(255,255,255,0.2)' }}
            />
          </div>
        </section>
        <ProjectsScroll />
        <div className="elfsight-app-7c2e78f2-c2bc-46da-9ac9-34aed222a164 md:mt-5 mb-2 md:mb-10" data-elfsight-app-lazy></div>
        <SustainabilitySection />
        <WorkWithUs />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
