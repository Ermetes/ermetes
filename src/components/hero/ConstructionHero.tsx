import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import InlineQuoteForm from '@/components/quote/InlineQuoteForm';

const ConstructionHero = () => {
  const [loaded, setLoaded] = useState(false);
  const { content } = useLanguage();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://www.youtube.com/embed/potTv0gTCrg?si=0PvGJ4Opc_WdjYMd&autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="absolute inset-0 z-10">
          {/* Curved geometric shapes */}
          <div className="absolute top-0 right-0 w-1/3 h-full">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-2xl" />
          </div>
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 gap-4 h-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="border-r border-white/20 h-full" />
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-0 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            
            {/* Left Column - Text Content */}
            <div className="space-y-8 text-white">
              <h1 
                className={`text-5xl sm:text-6xl md:text-6xl font-light leading-tight transform transition-all duration-700 delay-100 ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <span className="block text-white drop-shadow-lg">{content.hero.title.split(' ')[0]}</span>
                <span className="block text-white drop-shadow-lg">{content.hero.title.split(' ').slice(1, 2).join(' ')}</span>
                <span className="block text-white drop-shadow-lg">{content.hero.title.split(' ').slice(2).join(' ')}</span>
              </h1>

              {/* Subtitle */}
              <p 
                className={`text-xl sm:text-2xl text-white/90 max-w-2xl leading-relaxed drop-shadow font-light transform transition-all duration-700 delay-200 ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {content.hero.subtitle}
              </p>

              {/* Inline Quote Form */}
              <div className={`transform transition-all duration-700 delay-300 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                <InlineQuoteForm />
              </div>

              {/* CTA Button */}
              {/* Project CTA Button */}
              <div className={`flex items-start transform transition-all duration-700 delay-400 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
              </div>
            </div>

            {/* Right Column - Empty space for better focus on form */}
            <div className={`hidden lg:block transform transition-all duration-700 delay-400 ${
              loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}>
              {/* Empty space or could add additional visual elements */}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

    </>
  );
};

export default ConstructionHero;