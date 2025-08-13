import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";


const ProjectsScroll = () => {
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

  // Redirect to About page if About category is selected
  useEffect(() => {
    if (normalize(selectedCategory) === "articles") {
      window.location.href = "/ermetes/magazine";
    }
  }, [selectedCategory]);

  // Reset selectedCategory to 'All' when categories change (i.e., language switch)
  useEffect(() => {
    setSelectedCategory(defaultCategory);
  }, [categories]);
  console.log(selectedCategory)

  // Normalize category names for filtering (handle translation/case)
  const normalize = (str: string) => str.trim().toLowerCase().replace(/\s+/g, " ");
  let filteredProjects = projects;
  if (categories.length > 0 && selectedCategory && normalize(selectedCategory) !== normalize(categories[0])) {
    filteredProjects = filteredProjects.filter(project => normalize(project.category) === normalize(selectedCategory));
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
      <div className="bg-background sm:py-2 md:py-6 lg:sticky top-16 z-40 border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center sm:mb-4 md:mb-8">
            <h2 className="text-2xl sm:text-3xl font-light text-foreground mb-4 mt-4">
              {projectsScroll?.title || 'Our Projects'}
            </h2>
            <p className="md:text-xl sm:text-md text-muted-foreground max-w-3xl mx-auto font-light">
              {projectsScroll?.subtitle || 'Explore our work and its social impact in the community'}
            </p>
          </div>

          <div className="flex flex-nowrap overflow-x-auto gap-1 pb-2 md:flex-wrap md:overflow-x-visible md:pb-0 justify-center w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
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
          <div className="text-center mt-2 mb-4">
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
              className="flex flex-col md:flex-row items-center min-h-[10vh] md:min-h-[60vh] pb-4 md:pb-6"
            >
              <div className="w-full max-w-5xl mx-auto flex flex-row items-stretch">
                <div className="w-full max-w-xl flex flex-col justify-between">
                  {/* Left: Image and summary */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-l-xl bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-sm transition-all duration-300 group-hover:from-black/70" />
                    {project.image && <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-[250px] md:h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />}
                    <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end">
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
                {activeIndex === index && (
                  <div 
                    className="hidden md:flex bg-[#00338D]/95 backdrop-blur-md p-8 pb-12 animate-fade-in flex-1 min-h-0 rounded-r-xl"
                    style={{ flexBasis: 0 }}
                  >
                    <div className="flex flex-col justify-between w-full h-full">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-3xl">{project.icon}</div>
                        </div>
                        <p className="text-white/90 mb-6 leading-relaxed">
                          {project.extendedInfo}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <p className="text-white/70 text-sm">Durata</p>
                            <p className="text-white font-semibold">{project.duration}</p>
                          </div>
                          <div>
                            <p className="text-white/70 text-sm">Budget</p>
                            <p className="text-white font-semibold">{project.budget}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.features.map((feature, i) => (
                            <Badge key={i} variant="outline" className="text-white border-white/30">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-3 w-full items-stretch flex flex-col">
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90"
                          size="lg"
                          onClick={() => {
                            setTimeout(() => {
                              const element = document.getElementById('quote');
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                            }, 100);
                          }}
                        >
                          {content.projectsScroll?.quoteButton || content.hero.cta}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsScroll;