import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ModalProvider } from "@/contexts/ModalContext";
import Index from "./pages/Index";
import PreventivoModal from "./pages/PreventivoModal";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";
import Articles from "./pages/Articles";
import About from "./pages/About";
import CandidaturaPage from "./pages/Candidatura";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import Impact from "./pages/Impact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <ModalProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename="/ermetes">
            <Routes>
              {/* Multilingual magazine article route */}
              <Route path="magazine/:lang/:slug" element={<Article />} />
              <Route path="magazine" element={<Articles />} />
              <Route path="about" element={<About />} />
              <Route path="" element={<Index />} />
              <Route path="candidatura" element={<CandidaturaPage />} />
              <Route path="privacypolicy" element={<PrivacyPolicyPage />} />
              <Route path="impact" element={<Impact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <PreventivoModal />
        </TooltipProvider>
      </ModalProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;