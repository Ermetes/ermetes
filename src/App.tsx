import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ModalProvider } from "@/contexts/ModalContext";
import Index from "./pages/Index";
import PreventivoModal from "./pages/PreventivoModal";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";
import Articles from "./pages/Articles";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <ModalProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HashRouter basename="/ermetes">
            <Routes>
              {/* Multilingual magazine article route */}
              <Route path="/magazine/:lang/:slug" element={<Article />} />
              <Route path="/magazine" element={<Articles />} />
              <Route path="/about" element={<About />} />
              <Route path="/" element={<Index />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
          <PreventivoModal />
        </TooltipProvider>
      </ModalProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;