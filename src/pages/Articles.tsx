import React from "react";
import EditorialSection from "@/components/sections/EditorialSection";
import ModernNavigation from "@/components/navigation/ModernNavigation";
import Footer from "@/components/sections/Footer";

const ArticlesPage = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <ModernNavigation />
      <EditorialSection />
      <Footer />
    </div>
  );
};

export default ArticlesPage;
