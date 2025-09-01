
import ConstructionBackground from "@/components/background/ConstructionBackground";
import ModernNavigation from "@/components/navigation/ModernNavigation";
import ConstructionHero from "@/components/hero/ConstructionHero";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsScroll from "@/components/sections/ProjectsScroll";
import Footer from "@/components/sections/Footer";
import WorkWithUs from "@/components/sections/WorkWithUs";
import { useEffect } from "react";

const Index = () => {
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
  return (
    <div className="relative min-h-screen">
      <ConstructionBackground />
      <div className="relative z-10">
        <ModernNavigation />
        <ConstructionHero />
        <ProjectsScroll />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full px-0 py-12 md:py-16">
            <h2 className="text-4xl md:text-5xl font-light mb-8 text-[#00338D] text-left drop-shadow-lg w-full">Perchè affidarci un nuovo lavoro?</h2>
            <p className="font-bold text-xl mb-4 text-[#00338D] text-left w-full">In un settore ricco di insidie il team ERMETES ci tiene a distinguersi per correttezza e rapidità.</p>
            <p className="text-gray-800 text-lg leading-relaxed text-left w-full">
              Garantisce sopralluoghi e preventivi in tempi certi, propone prezzi chiari senza sorprese, pianifica con precisione i tempi d'intervento e condivide anche quotidianamente gli avanzamenti lavori in cloud con i committenti più ansiosi. Instauraf in da subito un rapporto di dialogo e fiducia. Se richiesto da clienti industriali o enti pubblici ERMETES sa rispettare specifici standard ambientali, gestire la tracciabilità di filiera con materiali sostenibili e condividere la contabilità emissiva misurata in "Co2eq" di commessa.
            </p>
          </div>
        </section>
        <ServicesSection />
        <div className="elfsight-app-7c2e78f2-c2bc-46da-9ac9-34aed222a164 md:mt-5 mb-2 md:mb-10" data-elfsight-app-lazy></div>
        <WorkWithUs />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
