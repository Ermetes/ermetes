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
      <section id="hero" className="mt-10 py-12 md:py-0 bg-background relative md:min-h-screen md:mt-0 flex items-center justify-center overflow-hidden bg-background">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://www.youtube.com/embed/IdrX7yGC0bI?autoplay=1&mute=1&loop=1&playlist=IdrX7yGC0bI&controls=0&showinfo=0&rel=0&modestbranding=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 w-full h-full object-cover md:min-h-[125vh]"
            style={{
              pointerEvents: 'none',
              aspectRatio: '16/9',
              minWidth: '100vw',
              width: '100%',
              // Responsive overrides
              ...(window.innerWidth <= 768 ? { width: '310%', marginLeft: '-60px' } : {}),
            }}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Curved geometric shapes */}
          <div className="absolute top-0 right-0 w-1/3 h-full">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-2xl" />
          </div>
          {/* Subtle grid pattern - pointer-events-none so it doesn't block interaction */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="grid grid-cols-12 gap-4 h-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="border-r border-white/20 h-full" />
              ))}
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl md:px-4 lg:px-8 lg:pr-0 lg:pt-40 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-12 items-center">
            {/* Left Column - InlineQuoteForm (order first on mobile, second on desktop) */}
            <div className="order-2 lg:order-1 w-full">
              <div className={`transform transition-all duration-700 delay-300 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                <InlineQuoteForm />
              </div>
            </div>
            {/* Right Column - Hero Title and Subtitle (order second on mobile, first on desktop) */}
            <div className="order-3 lg:order-2 w-full flex flex-col items-start">
              <div className="w-full lg:w-[90%] px-4 flex flex-col items-start">
                <h1 
                  className={`text-4xl md:text-6xl font-light leading-tight transform transition-all duration-700 delay-100 mt-4 md:mt-0 text-left mb-2 lg:mb-4 ${
                    loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <span className="block text-white drop-shadow-lg lg:py-1">{content.hero.title.split(' ')[0]}</span>
                  <span className="block text-white drop-shadow-lg lg:py-1">{content.hero.title.split(' ').slice(1, 2).join(' ')}</span>
                  <span className="block text-white drop-shadow-lg lg:py-1">{content.hero.title.split(' ').slice(2).join(' ')}</span>
                </h1>
                {/* Subtitle */}
                <p 
                  className={`text-xl sm:text-2xl text-white/90 max-w-2xl leading-relaxed drop-shadow font-light transform transition-all duration-700 delay-200 text-left ${
                    loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  {content.hero.subtitle}
                </p>
              </div>
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