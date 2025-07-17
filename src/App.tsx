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
              <Route path="/" element={<Index />} />
              {/* Multilingual magazine article route */}
              <Route path="/magazine/:lang/:slug" element={<Article />} />
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