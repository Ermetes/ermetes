
import React from "react";
import { Button } from '@/components/ui/button';
import InlineQuoteFormTrigger from "@/components/quote/InlineQuoteFormTrigger";
import ConstructionBackground from "@/components/background/ConstructionBackground";
import ModernNavigation from "@/components/navigation/ModernNavigation";
import ConstructionHero from "@/components/hero/ConstructionHero";
import ServicesSection from "@/components/sections/ServicesSection";
import ModernProjectsSection from "@/components/sections/ModernProjectsSection";
import ProjectsScroll from "@/components/sections/ProjectsScroll";
import EditorialSection from "@/components/sections/EditorialSection";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ConstructionBackground />
      <div className="relative z-10">
        <ModernNavigation />
      <ConstructionHero />
      <div className="flex justify-center my-8 gap-4">
        <Button
          onClick={() => {
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="transition-all duration-300"
        >
          Edilizia Residenziale
        </Button>
        <Button
          onClick={() => {
            const el = document.getElementById('articles');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="transition-all duration-300"
        >
          Articles
        </Button>
      </div>
        <ServicesSection />
        <ProjectsScroll />
        <EditorialSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
