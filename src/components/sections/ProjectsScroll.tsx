import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef, useEffect, useState } from "react";
// Helper to get all images in a folder (publicassets/*)
const assetFolders = ["builders", "commercial", "maintenance", "roofing", "underfloor"];
const assetImages: Record<string, string[]> = {
  builders: [
    "ermetes/assets/builders/2ff42d78-4162-4525-bbd3-005d00407fc8.png",
    "ermetes/assets/builders/WhatsApp Image 2025-08-17 at 10.11.38 PM.jpeg",
    "ermetes/assets/builders/WhatsApp Image 2025-08-17 at 10.11.38 PM (1).jpeg",
    "ermetes/assets/builders/WhatsApp Image 2025-08-17 at 10.11.43 PM.jpeg",
    "ermetes/assets/builders/WhatsApp Image 2025-08-17 at 10.12.15 PM (4).jpeg",
    "ermetes/assets/builders/WhatsApp Image 2025-08-17 at 10.12.16 PM.jpeg",
    "ermetes/assets/builders/WhatsApp Image 2025-08-17 at 10.12.36 PM (3).jpeg"
  ],
  commercial: [
    "ermetes/assets/commercial/Ristrutturazione bar Ospedale S.Maurizio Bolzano.jpg",
    "ermetes/assets/commercial/WhatsApp Image 2025-08-17 at 10.12.02 PM.jpeg",
    "ermetes/assets/commercial/WhatsApp Image 2025-08-17 at 10.12.02 PM (1).jpeg",
    "ermetes/assets/commercial/WhatsApp Image 2025-08-17 at 10.12.03 PM.jpeg"
  ],
  maintenance: [
    "ermetes/assets/maintenance/construction-2.jpg",
    "ermetes/assets/maintenance/WhatsApp Image 2025-08-17 at 10.12.05 PM.jpeg",
    "ermetes/assets/maintenance/WhatsApp Image 2025-08-17 at 10.12.15 PM.jpeg",
    "ermetes/assets/maintenance/WhatsApp Image 2025-08-17 at 10.12.15 PM (1).jpeg",
    "ermetes/assets/maintenance/WhatsApp Image 2025-08-17 at 10.12.36 PM.jpeg"
  ],
  roofing: [
    "ermetes/assets/roofing/IMG-20240831-WA0034.jpg",
    "ermetes/assets/roofing/Rifacimento copertura edificio Trento.jpg",
        "ermetes/assets/maintenance/WhatsApp Image 2025-08-17 at 10.12.15 PM.jpeg",
    "ermetes/assets/maintenance/WhatsApp Image 2025-08-17 at 10.12.15 PM (1).jpeg"
  ],
  underfloor: [
    "ermetes/assets/underfloor/Ristrutturazione abitazione privata, Trento.jpg",
    "ermetes/assets/underfloor/WhatsApp Image 2025-08-17 at 10.11.54 PM.jpeg",
    "ermetes/assets/underfloor/WhatsApp Image 2025-08-17 at 10.12.03 PM (1).jpeg",
    "ermetes/assets/underfloor/WhatsApp Image 2025-08-17 at 10.12.03 PM (2).jpeg",
    "ermetes/assets/underfloor/WhatsApp Image 2025-08-17 at 10.12.03 PM (3).jpeg",
    "ermetes/assets/underfloor/WhatsApp Image 2025-08-17 at 10.12.36 PM (1).jpeg",
    "ermetes/assets/underfloor/WhatsApp Image 2025-08-17 at 10.12.36 PM (2).jpeg"
  ]
};

function getFolderFromImagePath(imagePath: string) {
  const match = imagePath.match(/assets\/([^/]+)\//);
  return match ? match[1] : null;
}

const ProjectsScroll = () => {
  
  // ...existing code...
  const { content } = useLanguage();
  const projectsScroll = content.projectsScroll;
  const projects = projectsScroll?.projects || [];
  const categories = (projectsScroll?.categories && projectsScroll.categories.length > 0)
    ? projectsScroll.categories
    : ["All"];
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // Preselect 'Edilizia Residenziale' if present, else fallback to first
  const defaultCategory = categories.find(cat => cat.toLowerCase().includes("edilizia residenziale")) || categories[0];
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  // Normalize category names for filtering (handle translation/case)
  const normalize = (str: string) => str.trim().toLowerCase().replace(/\s+/g, " ");
  let filteredProjects = projects;
  if (categories.length > 0 && selectedCategory && normalize(selectedCategory) !== normalize(categories[0])) {
    filteredProjects = filteredProjects.filter(project => normalize(project.category) === normalize(selectedCategory));
  }

  // Carousel state for each project
  const [carouselIndexes, setCarouselIndexes] = useState<{ [projectIdx: number]: number }>({});

  // Preload next two images for the active carousel to avoid loading delay
  useEffect(() => {
    if (!filteredProjects[activeIndex]) return;
    const project = filteredProjects[activeIndex];
    const folder = getFolderFromImagePath(project.image);
    const images = folder ? assetImages[folder] || [] : [];
    const currentIdx = carouselIndexes[activeIndex] || 0;
    [1, 2].forEach(offset => {
      const preloadIdx = (currentIdx + offset) % images.length;
      const src = images[preloadIdx];
      if (src) {
        const img = new window.Image();
        img.src = src;
      }
    });
  }, [activeIndex, carouselIndexes, filteredProjects]);

    // Preload next two images for the active carousel to avoid loading delay
  useEffect(() => {
    if (!filteredProjects[activeIndex]) return;
    const project = filteredProjects[activeIndex];
    const folder = getFolderFromImagePath(project.image);
    const images = folder ? assetImages[folder] || [] : [];
    const currentIdx = carouselIndexes[activeIndex] || 0;
    [1, 2].forEach(offset => {
      const preloadIdx = (currentIdx + offset) % images.length;
      const src = images[preloadIdx];
      if (src) {
        const img = new window.Image();
        img.src = src;
      }
    });
  }, [activeIndex, carouselIndexes, filteredProjects]);
  // Autoplay effect for active project
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndexes(prev => {
        const next = { ...prev };
        filteredProjects.forEach((project, idx) => {
          if (idx === activeIndex) {
            const folder = getFolderFromImagePath(project.image);
            const images = folder ? assetImages[folder] || [] : [];
            if (images.length > 1) {
              next[idx] = ((prev[idx] || 0) + 1) % images.length;
            }
          }
        });
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [activeIndex, filteredProjects]);

  // Carousel navigation handlers
  const handlePrev = (projectIdx: number, imagesLen: number) => {
    setCarouselIndexes(prev => ({
      ...prev,
      [projectIdx]: ((prev[projectIdx] || 0) - 1 + imagesLen) % imagesLen,
    }));
  };
  const handleNext = (projectIdx: number, imagesLen: number) => {
    setCarouselIndexes(prev => ({
      ...prev,
      [projectIdx]: ((prev[projectIdx] || 0) + 1) % imagesLen,
    }));
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const sections = containerRef.current.children[1].children;
      const scrollPosition = window.scrollY - containerRef.current.offsetTop;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop - sectionHeight / 2 &&
          scrollPosition < sectionTop + sectionHeight / 2
        ) {
          setActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredProjects.length]);

  return (
    <section id="projects">
      {/* Category Filter */}
      <div className="bg-background sm:py-2 lg:sticky top-16 z-40 border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center sm:mb-4 md:mb-6">
            <h2 className="text-2xl sm:text-3xl font-light text-foreground mb-2 mt-4">
              {projectsScroll?.title || 'Our Projects'}
            </h2>
          </div>

          <div className="flex flex-nowrap overflow-x-auto gap-2 pb-2 md:flex-wrap md:overflow-x-visible md:pb-0 justify-center w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === category 
                    ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                    : "hover:bg-primary/10 hover:border-primary/50 hover:text-primary"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Category Description */}
          <div className="text-center mt-2 mb-2">
            {normalize(selectedCategory) === "edilizia residenziale" && (
              <p className="text-muted-foreground text-base font-light max-w-2xl mx-auto">
                Ristrutturazione completa di edifici residenziali e interventi manutentivi di strutture appartamenti dalla struttura grezza fino alle finiture
              </p>
            )}
            {normalize(selectedCategory) === "manutenzione" && (
              <p className="text-muted-foreground text-base font-light max-w-2xl mx-auto">
                Pianifichiamo ogni settimana interventi manutentori distruttore private e pubbliche su tutto il territorio trentino
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Projects - Center line and icons on the left, projects in a row */}
      <div className="relative min-h-screen bg-gradient-to-b from-background/90 to-muted/50 flex flex-col md:flex-row" ref={containerRef}>
        {/* Center Line & Icons on the left (hidden on mobile) */}
        <div className="hidden md:relative md:flex md:flex-col md:items-center md:py-12 md:px-2 md:w-32">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-accent/60 to-primary/60" style={{left: '50%'}} />
          <div className="sticky top-1/2 -translate-y-1/2">
            <div className={`w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl transition-all duration-500 transform shadow-xl border-4 border-background/80 border-primary`}>
              {filteredProjects[activeIndex]?.icon}
            </div>
          </div>
        </div>

        {/* Project Panels: vertical stack on mobile, row on desktop */}
        <div className="flex-1 flex flex-col">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className="flex flex-col md:flex-row items-center min-h-[10vh] md:min-h-[80vh] pb-4 md:pb-6"
              >
              <div className="w-full max-w-5xl ml-0 md:ml-8 flex flex-row items-stretch">
                <div className="w-full max-w-6xl flex flex-col justify-between">
                  {/* Left: Image and summary */}
                  <div className="relative rounded-t-2xl md:rounded-l-xl rounded-r-xl overflow-visible md:overflow-hidden mx-1 lg:mx-0 group focus-within:z-10" tabIndex={0}>
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/70 rounded-b-2xl rounded-t-2xl md:rounded-l-xl${index === activeIndex ? '' : ' backdrop-blur-sm'}`} />
                    {/* Carousel: show all images in the same folder as project.image */}
                    {(() => {
                      const folder = getFolderFromImagePath(project.image);
                      const images = folder ? assetImages[folder] || [] : [];
                      // Infinite film roll: duplicate images for seamless loop
                      const filmImages = images.length > 0 ? [...images, ...images] : [project.image];
                      const [offset, setOffset] = useState(0);
                      const speed = 0.5; // px per frame
                      const containerRef = useRef<HTMLDivElement>(null);
                      const [paused, setPaused] = useState(false);

                      // Animate film roll
                      useEffect(() => {
                        if (filmImages.length <= 1 || paused) return;
                        let animationFrame: number;
                        let running = true;
                        const animate = () => {
                          setOffset(prev => {
                            const container = containerRef.current;
                            if (!container) return prev;
                            const totalWidth = container.scrollWidth / 2;
                            let next = prev + speed;
                            if (next >= totalWidth) next = 0;
                            return next;
                          });
                          if (running) animationFrame = requestAnimationFrame(animate);
                        };
                        animationFrame = requestAnimationFrame(animate);
                        return () => {
                          running = false;
                          cancelAnimationFrame(animationFrame);
                        };
                      }, [filmImages.length, paused]);

                      // Manual navigation: scroll by one image width
                      const handleArrow = (dir: 'left' | 'right') => {
                        const container = containerRef.current;
                        if (!container) return;
                        const totalWidth = container.scrollWidth / 2;
                        const imgWidth = totalWidth / images.length;
                        setOffset(prev => {
                          let next = dir === 'left' ? prev - imgWidth : prev + imgWidth;
                          if (next < 0) next = totalWidth + next;
                          if (next >= totalWidth) next = next - totalWidth;
                          return next;
                        });
                      };

                      return (
                        <div
                          className="relative w-full h-[300px] md:h-[600px] overflow-hidden rounded-2xl md:rounded-l-xl rounded-b-2xl"
                          onMouseEnter={() => setPaused(true)}
                          onMouseLeave={() => setPaused(false)}
                          onFocus={() => setPaused(true)}
                          onBlur={() => setPaused(false)}
                        >
                          {/* Film roll */}
                          <div
                            ref={containerRef}
                            className="flex h-full"
                            style={{
                              width: `${(filmImages.length / 2) * 100}%`,
                              transform: `translateX(-${offset}px)`,
                              transition: paused ? 'none' : 'transform 0.1s linear',
                            }}
                          >
                            {filmImages.map((imgSrc, i) => (
                              <img
                                key={i}
                                src={imgSrc}
                                alt={project.title}
                                className="h-full object-cover select-none pointer-events-none"
                                style={{ width: `calc(100% / ${filmImages.length / 2})`, minWidth: 0 }}
                                draggable={false}
                              />
                            ))}
                          </div>
                          {/* Arrow buttons */}
                          {images.length > 1 && (
                            <>
                              <button
                                onClick={() => handleArrow('left')}
                                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-opacity duration-200 z-10"
                                tabIndex={0}
                                aria-label="Previous"
                              >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                              </button>
                              <button
                                onClick={() => handleArrow('right')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-opacity duration-200 z-10"
                                tabIndex={0}
                                aria-label="Next"
                              >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                              </button>
                            </>
                          )}
                        </div>
                      );
                    })()}
                    <div className="absolute inset-0 p-4 md:p-8 md:flex flex-col justify-end block md:flex max-w-2xl">
                      <Badge variant="secondary" className="w-fit mb-4 bg-white/90 text-foreground font-semibold px-3 py-1">
                        {project.category}
                      </Badge>
                       <Badge 
                            variant={project.status === "Completato" ? "default" : "secondary"} 
                            className="mb-4 w-fit"
                          >
                            {project.status}
                          </Badge>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        {project.link ? (
                          <a href={project.link} className="underline hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                            {project.title}
                          </a>
                        ) : (
                          project.title
                        )}
                      </h3>
                      <p className="text-white/90 leading-relaxed text-sm md:text-base">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsScroll;