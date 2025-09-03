
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
  // Hide .eapps-widget-toolbar-panel-share-block when it appears
  useHideShareBlock();
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <ModernNavigation />
        <div ref={heroRef}>
          <ConstructionHero />
        </div>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-12">
          <div className="w-full md:px-16 md:py-16">
            <h2 className="text-4xl md:text-5xl font-light mb-2 md:mb-8 text-[#00338D] text-left drop-shadow-lg w-full md:text-center">Perchè affidarci un nuovo lavoro?</h2>
            <p className="font-bold text-xl font-normal mb-2 text-[#00338D] text-left w-full md:text-center">In un settore ricco di insidie come quello edile il team ERMETES ci tiene a distinguersi per correttezza e trasparenza.</p>
            <p className="text-gray-800 text-lg leading-relaxed text-justify [word-spacing:-1.5px] w-full font-extralight">
              Garantisce sopralluoghi e preventivi in tempi certi, propone prezzi chiari senza sorprese, pianifica con precisione i tempi d'intervento e condivide anche quotidianamente gli avanzamenti lavori in cloud con i committenti più ansiosi.
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
        <div className="elfsight-app-7c2e78f2-c2bc-46da-9ac9-34aed222a164" data-elfsight-app-lazy></div>
        <SustainabilitySection />
        <WorkWithUs />
        <Footer />
      </div>
    </div>
  );
};

function useHideShareBlock() {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `.eapps-widget-toolbar-panel-share-block { width: 0 !important; overflow: hidden !important; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
}
export default Index;
