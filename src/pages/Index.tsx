
import ConstructionBackground from "@/components/background/ConstructionBackground";
import ModernNavigation from "@/components/navigation/ModernNavigation";
import ConstructionHero from "@/components/hero/ConstructionHero";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsScroll from "@/components/sections/ProjectsScroll";
import Footer from "@/components/sections/Footer";
import WorkWithUs from "@/components/sections/WorkWithUs";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ConstructionBackground />
      <div className="relative z-10">
        <ModernNavigation />
      <ConstructionHero />
      <ProjectsScroll />
      <ServicesSection />
      <div className="elfsight-app-7c2e78f2-c2bc-46da-9ac9-34aed222a164" data-elfsight-app-lazy></div>
      <WorkWithUs />
      <Footer />
      </div>
    </div>
  );
};

export default Index;
