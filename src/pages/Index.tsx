
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
    // Track and remove Elfsight attribution link whenever it appears
    const selector = 'a[href^="https://elfsight.com/social-feed-widget/?utm_source=websites&utm_medium=clients&utm_content=social-feed&utm_term=ermetes.github.io&utm_campaign=free-widget"]';
    const removeElfsightLink = () => {
      const el = document.querySelector(selector);
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    };
    // Initial check
    removeElfsightLink();
    // Observe DOM changes
    const observer = new MutationObserver(() => {
      removeElfsightLink();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    // Cleanup
    return () => observer.disconnect();
  }, []);
  return (
    <div className="relative min-h-screen">
      <ConstructionBackground />
      <div className="relative z-10">
        <ModernNavigation />
        <ConstructionHero />
        <ProjectsScroll />
        <ServicesSection />
        <div className="elfsight-app-7c2e78f2-c2bc-46da-9ac9-34aed222a164 md:mt-5 mb-2 md:mb-10" data-elfsight-app-lazy></div>
        <WorkWithUs />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
