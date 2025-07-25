import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import articlesData from "@/data/articles.json";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Menu, X } from "lucide-react";
// Using uploaded image directly
// import ermetesLogo from "@/assets/ermetes-logo.png";

const ModernNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, content } = useLanguage();
  // Detect if on article page and get lang/slug from URL
  const isArticlePage = window.location.pathname.includes('/magazine/');
  let currentLang = null;
  let currentSlug = null;
  if (isArticlePage) {
    const match = window.location.pathname.match(/\/magazine\/(en|it)\/([^/]+)/);
    if (match) {
      currentLang = match[1];
      currentSlug = match[2];
    }
  }

  // Map slugs between languages
  const articlesIt = articlesData.it;
  const articlesEn = articlesData.en;
  function getSlugForLang(targetLang, currentSlug) {
    if (targetLang === 'it') {
      // Find Italian article whose English slug matches currentSlug
      const enArticle = articlesEn.find(a => a.link.endsWith(currentSlug));
      if (enArticle) {
        // Find matching Italian article by id
        const itArticle = articlesIt.find(a => a.id === enArticle.id);
        return itArticle ? itArticle.link.split('/').pop() : currentSlug;
      }
      // Or, if already Italian, just return
      return currentSlug;
    } else {
      // Find English article whose Italian slug matches currentSlug
      const itArticle = articlesIt.find(a => a.link.endsWith(currentSlug));
      if (itArticle) {
        // Find matching English article by id
        const enArticle = articlesEn.find(a => a.id === itArticle.id);
        return enArticle ? enArticle.link.split('/').pop() : currentSlug;
      }
      // Or, if already English, just return
      return currentSlug;
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navigationItems = [
    { key: "projects", label: content.navigation.projects },
    { key: "services", label: content.navigation.services },
    { key: "about", label: content.navigation.about },
    { key: "articles", label: content.navigation.articles },
    { key: "contact", label: content.navigation.contact },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 dm-sans-light ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="https://ermetes.github.io/ermetes/assets/logo.png" 
              alt="Ermetes Multiservizi" 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navigationItems.map((item) => {
              let href;
              if (item.key === 'articles') {
                href = `https://ermetes.github.io/ermetes#articles`;
              } else {
                href = isArticlePage
                  ? `https://ermetes.github.io/ermetes#${item.key}`
                  : `#${item.key}`;
              }
              return (
                <a
                  key={item.key}
                  href={href}
                  className="text-foreground/80 transition-colors font-light text-md tracking-wide hover:text-[#FFAA00] focus:text-[#FFAA00]"
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Language Switcher & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-foreground/80">
                  <Globe className="h-4 w-4 mr-2" />
                  {language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background border-border">
                <DropdownMenuItem
                  onClick={() => {
                    setLanguage("it");
                    if (isArticlePage && currentSlug) {
                      const targetSlug = getSlugForLang('it', currentSlug);
                      window.location.replace(`/ermetes/magazine/it/${targetSlug}`);
                    }
                  }}
                  className="cursor-pointer"
                >
                  Italiano
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setLanguage("en");
                    if (isArticlePage && currentSlug) {
                      const targetSlug = getSlugForLang('en', currentSlug);
                      window.location.replace(`/ermetes/magazine/en/${targetSlug}`);
                    }
                  }}
                  className="cursor-pointer"
                >
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={() => scrollToSection("hero")}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white font-light dm-sans-light"
            >
              {content.hero.cta}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/10 bg-background/95 backdrop-blur-md">
            <div className="py-4 space-y-3">
              {navigationItems.map((item) => {
                let href;
                if (item.key === 'articles') {
                  href = `https://ermetes.github.io/ermetes#articles`;
                } else {
                  href = isArticlePage
                    ? `https://ermetes.github.io/ermetes#${item.key}`
                    : `#${item.key}`;
                }
                return (
                  <a
                    key={item.key}
                    href={href}
                    className="block w-full text-left px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors font-light"
                  >
                    {item.label}
                  </a>
                );
              })}
              
              <div className="px-4 pt-3 border-t border-border/10">
                <div className="flex items-center justify-between">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Globe className="h-4 w-4 mr-2" />
                        {language.toUpperCase()}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => {
                        setLanguage("it");
                        if (isArticlePage && currentSlug) {
                          const targetSlug = getSlugForLang('it', currentSlug);
                          window.location.replace(`/ermetes/magazine/it/${targetSlug}`);
                        }
                      }}>
                        Italiano
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        setLanguage("en");
                        if (isArticlePage && currentSlug) {
                          const targetSlug = getSlugForLang('en', currentSlug);
                          window.location.replace(`/ermetes/magazine/en/${targetSlug}`);
                        }
                      }}>
                        English
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    onClick={() => scrollToSection("hero")}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Preventivo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ModernNavigation;