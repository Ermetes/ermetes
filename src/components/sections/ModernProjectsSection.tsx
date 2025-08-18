import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  category: string;
  image: string;
  impact: string;
  teamSize: number;
}

const ModernProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("edilizia");

  const projects: Project[] = [
    {
      id: "1",
      title: "Restauro Edificio Storico",
      description: "Progetto di restauro conservativo che combina tecniche tradizionali e moderne per preservare il patrimonio storico locale.",
      location: "Centro Storico, Trento",
      date: "2024-2025",
      category: "edilizia",
      image: "/lovable-uploads/builders/2ff42d78-4162-4525-bbd3-005d00407fc8.png",
      impact: "3 persone svantaggiate integrate",
      teamSize: 6
    },
    {
      id: "2",
      title: "Manutenzione Infrastrutture",
      description: "Interventi di manutenzione stradale e urbana con focus sulla sicurezza e sostenibilità ambientale.",
      location: "Provincia di Trento",
      date: "2024",
      category: "manutenzione",
      image: "/lovable-uploads/fd6f4117-d936-47b8-8777-dc00af82dd86.png",
      impact: "5 lavoratori formati",
      teamSize: 12
    },
    {
      id: "3",
      title: "Riqualificazione Edilizia",
      description: "Progetti di efficientamento energetico e riqualificazione di edifici residenziali e commerciali.",
      location: "Valle dell'Adige",
      date: "2024",
      category: "edilizia",
      image: ".assets/community-center.jpg",
      impact: "4 rifugiati inseriti",
      teamSize: 9
    },
    {
      id: "4",
      title: "Manutenzione Specializzata",
      description: "Servizi di manutenzione tecnica specializzata per enti pubblici e privati del territorio.",
      location: "Trentino-Alto Adige",
      date: "2024",
      category: "manutenzione",
      image: ".assets/a5ef1125-5ab0-4a60-a8ca-fec86e3a73b1.png",
      impact: "2 giovani NEET formati",
      teamSize: 4
    }
  ];

  const categories = [
    { key: "edilizia", label: "Edilizia" },
    { key: "manutenzione", label: "Manutenzione" }
  ];

  const filteredProjects = projects.filter(project => project.category === activeCategory);


  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="textostri Lavori-4xl md:text-5xl font-editorial text-foreground mb-6 mt-6">
            Lavori recenti
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light">
            Ogni progetto è un'opportunità di crescita e integrazione sociale. 
            Scopri come stiamo costruendo un futuro migliore per la nostra comunità.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={activeCategory === category.key ? "default" : "outline"}
              onClick={() => setActiveCategory(category.key)}
              className="font-light"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-card">
              <div className="relative h-56">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-white capitalize">
                  {project.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span className="font-light">{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span className="font-light">{project.date}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-editorial text-foreground mb-3 leading-tight">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed font-light mb-4">
                  {project.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-primary">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">{project.teamSize} persone</span>
                  </div>
                  <div className="text-accent font-medium">
                    {project.impact}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-editorial text-foreground mb-4">
              Hai un Progetto in Mente?
            </h3>
            <p className="text-muted-foreground font-light mb-6">
              Contattaci per discutere come possiamo contribuire al tuo prossimo progetto 
              con la nostra esperienza e il nostro impegno sociale.
            </p>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-light px-8"
              onClick={() => {
                const element = document.getElementById('hero');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Richiedi un Preventivo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernProjectsSection;