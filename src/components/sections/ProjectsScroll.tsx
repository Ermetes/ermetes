import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
// Helper to get all images in a folder (publicassets/*)
const assetFolders = ["builders", "commercial", "maintenance", "roofing", "underfloor"];
const assetImages: Record<string, string[]> = {
  builders: [
    "assets/builders/2ff42d78-4162-4525-bbd3-005d00407fc8.png",
    "assets/builders/WhatsApp Image 2025-08-17 at 10.11.38 PM.jpeg",
    "assets/builders/WhatsApp Image 2025-08-17 at 10.11.38 PM (1).jpeg",
    "assets/builders/WhatsApp Image 2025-08-17 at 10.11.43 PM.jpeg",
    "assets/builders/WhatsApp Image 2025-08-17 at 10.12.15 PM (4).jpeg",
    "assets/builders/WhatsApp Image 2025-08-17 at 10.12.16 PM.jpeg",
    "assets/builders/WhatsApp Image 2025-08-17 at 10.12.36 PM (3).jpeg"
  ],
  commercial: [
    "assets/commercial/Ristrutturazione bar Ospedale S.Maurizio Bolzano.jpg",
    "assets/commercial/Bar-Bolzano-2.jpg",
  ],
  'maintenance/Intervento di manutenzione straordinaria manto stradale e ripristino pozzetto': [
    "assets/maintenance/Intervento di manutenzione straordinaria manto stradale e ripristino pozzetto/1.jpeg",
    "assets/maintenance/Intervento di manutenzione straordinaria manto stradale e ripristino pozzetto/2.jpeg",
    "assets/maintenance/Intervento di manutenzione straordinaria manto stradale e ripristino pozzetto/3.jpeg",
    "assets/maintenance/Intervento di manutenzione straordinaria manto stradale e ripristino pozzetto/4.jpeg",
    "assets/maintenance/Intervento di manutenzione straordinaria manto stradale e ripristino pozzetto/5.jpeg",
    "assets/maintenance/Intervento di manutenzione straordinaria manto stradale e ripristino pozzetto/6.jpeg",
    "assets/maintenance/Intervento di manutenzione straordinaria manto stradale e ripristino pozzetto/7.jpeg",
    "assets/maintenance/Intervento di manutenzione straordinaria manto stradale e ripristino pozzetto/8.jpeg",
    "assets/maintenance/Intervento di manutenzione straordinaria manto stradale e ripristino pozzetto/9.jpeg",
    "assets/maintenance/Intervento di manutenzione straordinaria manto stradale e ripristino pozzetto/10.jpeg",
    "assets/maintenance/Intervento di manutenzione straordinaria manto stradale e ripristino pozzetto/11.jpeg"
  ],
  'maintenance/Manutenzioni straordinarie interni Istituto scolastico A Fogazzaro Trento': [
    "assets/maintenance/Manutenzioni straordinarie interni Istituto scolastico A Fogazzaro Trento/1.jpeg",
    "assets/maintenance/Manutenzioni straordinarie interni Istituto scolastico A Fogazzaro Trento/2.jpeg",
    "assets/maintenance/Manutenzioni straordinarie interni Istituto scolastico A Fogazzaro Trento/3.jpeg",
    "assets/maintenance/Manutenzioni straordinarie interni Istituto scolastico A Fogazzaro Trento/4.jpeg",
    "assets/maintenance/Manutenzioni straordinarie interni Istituto scolastico A Fogazzaro Trento/5.jpeg",
    "assets/maintenance/Manutenzioni straordinarie interni Istituto scolastico A Fogazzaro Trento/6.jpeg",
    "assets/maintenance/Manutenzioni straordinarie interni Istituto scolastico A Fogazzaro Trento/7.jpeg",
    "assets/maintenance/Manutenzioni straordinarie interni Istituto scolastico A Fogazzaro Trento/8.jpeg",
    "assets/maintenance/Manutenzioni straordinarie interni Istituto scolastico A Fogazzaro Trento/9.jpeg",
  ],
  'maintenance/Manutenzioni straordinarie presso presidio ospedaliero di Mezzolombardo Trento': [
    "assets/maintenance/Manutenzioni straordinarie presso presidio ospedaliero di Mezzolombardo Trento/1.png",
    "assets/maintenance/Manutenzioni straordinarie presso presidio ospedaliero di Mezzolombardo Trento/2.png"
  ],
  'maintenance/Manutenzioni straordinarie, smontaggio e sistemazione finestre presso presidio ospedaliero di Arco Trento': [
    "assets/maintenance/Manutenzioni straordinarie, smontaggio e sistemazione finestre presso presidio ospedaliero di Arco Trento/1.png",
    "assets/maintenance/Manutenzioni straordinarie, smontaggio e sistemazione finestre presso presidio ospedaliero di Arco Trento/2.png",
    "assets/maintenance/Manutenzioni straordinarie, smontaggio e sistemazione finestre presso presidio ospedaliero di Arco Trento/3.png",
    "assets/maintenance/Manutenzioni straordinarie, smontaggio e sistemazione finestre presso presidio ospedaliero di Arco Trento/4.png",
    "assets/maintenance/Manutenzioni straordinarie, smontaggio e sistemazione finestre presso presidio ospedaliero di Arco Trento/5.png",
    "assets/maintenance/Manutenzioni straordinarie, smontaggio e sistemazione finestre presso presidio ospedaliero di Arco Trento/6.png"
  ],
  "renovation/Rifacimento tubature impianto idraulico Scuola A. Fogazzaro Comune di Trento": [
      "assets/renovation/Rifacimento tubature impianto idraulico Scuola A. Fogazzaro Comune di Trento/1.jpeg",
      "assets/renovation/Rifacimento tubature impianto idraulico Scuola A. Fogazzaro Comune di Trento/2.jpeg",
      "assets/renovation/Rifacimento tubature impianto idraulico Scuola A. Fogazzaro Comune di Trento/3.jpeg",
      "assets/renovation/Rifacimento tubature impianto idraulico Scuola A. Fogazzaro Comune di Trento/4.jpeg",
      "assets/renovation/Rifacimento tubature impianto idraulico Scuola A. Fogazzaro Comune di Trento/5.jpeg",
      "assets/renovation/Rifacimento tubature impianto idraulico Scuola A. Fogazzaro Comune di Trento/6.jpeg",
      "assets/renovation/Rifacimento tubature impianto idraulico Scuola A. Fogazzaro Comune di Trento/7.jpeg",
      "assets/renovation/Rifacimento tubature impianto idraulico Scuola A. Fogazzaro Comune di Trento/8.jpeg",
      "assets/renovation/Rifacimento tubature impianto idraulico Scuola A. Fogazzaro Comune di Trento/9.jpeg",
  ],
  "renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento": [
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/1.jpeg",
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/2.jpeg",
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/3.jpeg",
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/4.jpeg",
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/5.jpeg",
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/6.jpeg",
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/7.jpeg",
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/8.jpeg",
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/9.jpeg",
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/10.jpeg",
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/11.jpeg",
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/12.jpeg",
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/13.jpeg",
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/14.jpeg",
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/15.jpeg",
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/16.jpeg",
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/17.jpeg",
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/18.jpeg",
      "assets/renovation/Ristrutturazione e ripristino cortile interno palazzo storico Torre del Massarello Trento/19.jpeg"
  ],
  roofing: [
    "assets/roofing/IMG-20240831-WA0034.jpg",
    "assets/roofing/Rifacimento copertura edificio Trento.jpg"
  ],
  underfloor: [
    "assets/underfloor/Ristrutturazione abitazione privata, Trento.jpg",
    "assets/underfloor/WhatsApp Image 2025-08-17 at 10.11.54 PM.jpeg",
    "assets/underfloor/WhatsApp Image 2025-08-17 at 10.12.03 PM (1).jpeg",
    "assets/underfloor/WhatsApp Image 2025-08-17 at 10.12.03 PM (2).jpeg",
    "assets/underfloor/WhatsApp Image 2025-08-17 at 10.12.03 PM (3).jpeg"
  ]
};

function getFolderFromImagePath(imagePath: string) {
  // Remove leading './' if present, then match everything between 'assets/' and the last '/' before the filename, including subfolders
  const normalized = imagePath.replace(/^\.\//, "");
  const match = normalized.match(/^assets\/((?:[^/]+\/)*[^/]+)\//);
  return match ? match[1] : null;
}

const ProjectsScroll = () => {
  
  // ...existing code...
  const [showAll, setShowAll] = useState(false);
  const { content } = useLanguage();
  const projectsScroll = content.projectsScroll;
  const projects = projectsScroll?.projects || [];
  const categories = (projectsScroll?.categories && projectsScroll.categories.length > 0)
    ? projectsScroll.categories
    : ["All"];
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // Preselect 'Ristrutturazioni' if present, else fallback to first
  const defaultCategory = categories.find(cat => cat.toLowerCase().includes("ristrutturazioni")) || categories[0];
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  // Reset activeIndex and carouselIndexes when category changes to avoid out-of-bounds errors
  useEffect(() => {
    setActiveIndex(0);
    setCarouselIndexes({});
  }, [selectedCategory]);

  // Normalize category names for filtering (handle translation/case)
  const normalize = (str: string) => str.trim().toLowerCase().replace(/\s+/g, " ");
  let filteredProjects = projects;
  if (selectedCategory) {
    filteredProjects = filteredProjects.filter(project => normalize(project.category) === normalize(selectedCategory));
  }

  // Responsive check (mobile/desktop)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Per-project carousel state for mobile (current image index)
  const [mobileCurrents, setMobileCurrents] = useState<{ [projectIdx: number]: number }>({});
  // Desktop: Track current pair index for fade
  const [desktopPairIndexes, setDesktopPairIndexes] = useState<{ [projectIdx: number]: number }>({});
  const containerRefs = useRef<{ [projectIdx: number]: HTMLDivElement | null }>({});

  // Carousel state for each project (for legacy per-slide carousel)
  const [carouselIndexes, setCarouselIndexes] = useState<{ [projectIdx: number]: number }>({});

  // Preload next two images for the active carousel to avoid loading delay (desktop only)
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

  // Mobile: Autoplay for each project's image
  useEffect(() => {
    if (!isMobile) return;
    const intervals: { [projectIdx: number]: NodeJS.Timeout } = {};
    filteredProjects.forEach((project, idx) => {
      const folder = getFolderFromImagePath(project.image);
      const images = folder && Array.isArray(assetImages[folder]) ? assetImages[folder] : [];
      if (images.length > 1) {
        intervals[idx] = setInterval(() => {
          setMobileCurrents(prev => ({
            ...prev,
            [idx]: ((prev[idx] || 0) + 1) % images.length
          }));
        }, 3500);
      }
    });
    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, [isMobile, filteredProjects]);

  // Desktop: Fade in/out between pairs using GSAP
  useEffect(() => {
    if (isMobile) return;
    const intervalIds: { [projectIdx: number]: NodeJS.Timeout } = {};
    filteredProjects.forEach((project, idx) => {
      const folder = getFolderFromImagePath(project.image);
      const images = folder && Array.isArray(assetImages[folder]) ? assetImages[folder] : [project.image];
      if (images.length <= 2) return;
      intervalIds[idx] = setInterval(() => {
        setDesktopPairIndexes(prev => {
          const current = prev[idx] || 0;
          return { ...prev, [idx]: (current + 2) % images.length };
        });
      }, 3500);
    });
    return () => {
      Object.values(intervalIds).forEach(clearInterval);
    };
  }, [isMobile, filteredProjects]);

  // GSAP fade effect for desktop
  useEffect(() => {
    if (isMobile) return;
    filteredProjects.forEach((project, idx) => {
      const ref = containerRefs.current[idx];
      if (ref) {
        gsap.fromTo(ref, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.inOut" });
      }
    });
  }, [desktopPairIndexes, isMobile, filteredProjects]);

  // Handlers for desktop film roll
  // handleArrow removed: no longer needed after removing auto sliding and offsets

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
      if (!containerRef.current || !containerRef.current.children[1] || !containerRef.current.children[1].children) return;
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

  // --- VERTICAL CAROUSEL UI ---
  return (
    <section id="projects">
      {/* Category Filter (unchanged) */}
  <div className="bg-background sm:py-2 z-40 border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center sm:mb-4 md:mb-6">
            <h2 className="text-4xl md:text-4xl font-light mb-6 mt-8 text-[#00338D] drop-shadow-lg ">
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
        </div>
      </div>
      {/* Vertical Carousel */}
       <div className="fixed left-0 right-0 bg-gradient-to-b from-background/90 to-muted/50 flex flex-col justify-center w-full" style={{ width: '100vw', position: 'relative' }} ref={containerRef}>
         <div className="flex flex-col justify-center w-full px-0 md:px-0 mx-0 py-8 relative" style={{ width: '100vw' }}>
          {/* Project Panel (only active) */}
          {filteredProjects.length > 0 && filteredProjects[activeIndex] && (
             <div
               key={filteredProjects[activeIndex].title}
               className="flex flex-col md:flex-row items-center justify-center min-h-[20vh] w-full transition-all duration-500"
             >
               <div className="w-full flex flex-row items-stretch justify-center" style={{ width: '100vw' }}>
                 <div className="w-full flex flex-col justify-between items-center" style={{ width: '100vw' }}>
                  {/* Image and summary (reuse existing code) */}
                  <div className="relative rounded-t-2xl md:rounded-l-xl rounded-r-xl overflow-visible md:overflow-hidden mx-1 lg:mx-0 group focus-within:z-10" tabIndex={0}>
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/70 rounded-b-2xl rounded-t-2xl md:rounded-l-xl`} />
                    {(() => {
                      const project = filteredProjects[activeIndex];
                      if (!project) return null;
                      const folder = getFolderFromImagePath(project.image);
                      const images = (folder && Array.isArray(assetImages[folder])) ? assetImages[folder] : [];
                      if (isMobile) {
                        const current = mobileCurrents[activeIndex] || 0;
                        return (
                          <div className="relative w-full h-[300px] overflow-hidden rounded-2xl">
                            <img
                              src={images && images.length > 0 ? images[current % images.length] : project.image}
                              alt={project.title}
                              className="h-full w-full object-cover select-none pointer-events-none"
                              draggable={false}
                            />
                            {images.length > 1 ? (
                              <>
                                <button
                                  onClick={() => setActiveIndex(i => (i - 1 + filteredProjects.length) % filteredProjects.length)}
                                  className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full p-1 flex items-center justify-center md:bg-black/20 hover:bg-black/40 transition-opacity duration-200 z-10 sm:hidden disabled:opacity-40 disabled:cursor-not-allowed"
                                  tabIndex={0}
                                  aria-label="Previous Project"
                                  disabled={filteredProjects.length === 1}
                                >
                                  <svg width="30" height="30" viewBox="6 0 20 20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                                </button>
                                <button
                                  onClick={() => setActiveIndex(i => (i + 1) % filteredProjects.length)}
                                  className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full p-1 flex items-center justify-center md:bg-black/40 hover:bg-black/60 transition-opacity duration-200 z-10 sm:hidden disabled:opacity-40 disabled:cursor-not-allowed"
                                  tabIndex={0}
                                  aria-label="Next Project"
                                  disabled={filteredProjects.length === 1}
                                >
                                  <svg width="30" height="30" viewBox="-2 0 20 20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                                </button>
                              </>
                            ) : null}
                          </div>
                        );
                      }
                      // Desktop: Fade in/out between pairs
                      const pairIdx = desktopPairIndexes[activeIndex] || 0;
                       const pair = images.length > 1 ? [images[pairIdx % images.length], images[(pairIdx + 1) % images.length]] : [project.image];
                       return (
                         <div
                           className="relative h-[600px] overflow-hidden rounded-2xl md:rounded-l-xl rounded-b-2xl flex justify-center items-center"
                           style={{ width: '100vw' }}
                           ref={el => (containerRefs.current[activeIndex] = el)}
                         >
                           {/* Left navigation button: switch category */}
                           {categories.length > 1 && (
                             <button
                               onClick={() => {
                                 const currentIdx = categories.indexOf(selectedCategory);
                                 const prevIdx = (currentIdx - 1 + categories.length) % categories.length;
                                 setSelectedCategory(categories[prevIdx]);
                               }}
                               className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-opacity duration-200 z-10"
                               tabIndex={0}
                               aria-label="Previous Category"
                             >
                               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                             </button>
                           )}
                           {/* Image pair, no gap */}
                           {pair.map((imgSrc, i) => (
                             <img
                               key={imgSrc}
                               src={imgSrc}
                               alt={project.title}
                               className="h-full object-cover select-none pointer-events-none"
                               style={{ width: pair.length === 2 ? '50vw' : '100vw', opacity: 1, transition: 'opacity 0.8s', margin: 0, padding: 0, border: 'none' }}
                               draggable={false}
                             />
                           ))}
                           {/* Right navigation button: switch category */}
                           {categories.length > 1 && (
                             <button
                               onClick={() => {
                                 const currentIdx = categories.indexOf(selectedCategory);
                                 const nextIdx = (currentIdx + 1) % categories.length;
                                 setSelectedCategory(categories[nextIdx]);
                               }}
                               className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-opacity duration-200 z-10"
                               tabIndex={0}
                               aria-label="Next Category"
                             >
                               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                             </button>
                           )}
                         </div>
                       );
                    })()}
                    <div className="absolute inset-0 py-4 pb-0 x-6 md:p-8 md:pb-0 flex flex-col justify-between max-w-2xl h-full">
                      <div>
                        <Badge 
                          variant={filteredProjects[activeIndex].status === "Completato" ? "default" : "secondary"} 
                          className="mb-4 w-fit"
                        >
                          {filteredProjects[activeIndex].status}
                        </Badge>
                      </div>
                      <div className="flex items-end">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 backdrop-blur-md bg-black/20 rounded-xl px-4 py-3 shadow-lg">
                          {filteredProjects[activeIndex].link ? (
                            <a href={filteredProjects[activeIndex].link} className="underline hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                              {filteredProjects[activeIndex].title}
                            </a>
                          ) : (
                            filteredProjects[activeIndex].title || filteredProjects[activeIndex].description
                          )}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Removed Down Arrow, navigation is now handled by left/right arrows above */}
        </div>
      </div>
    </section>
  );
};

export default ProjectsScroll;