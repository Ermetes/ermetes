

import React from "react";
import ModernNavigation from "@/components/navigation/ModernNavigation";
import Footer from "@/components/sections/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  it: {
    title: "Un Tetto di Innovazione: La Nuova Copertura in Legno",
    image: "/assets/roofing/Rifacimento copertura edificio Trento.jpg",
    sections: [
      {
        heading: "Introduzione",
        text: `Nel cuore di Trento, la Residenza Green Valley si distingue per una copertura in legno che coniuga tradizione e innovazione. Il progetto nasce dalla volontà di reinterpretare il tetto come elemento architettonico centrale, capace di dialogare con il paesaggio alpino e le esigenze contemporanee di sostenibilità. In questo contesto, la copertura diventa protagonista di una narrazione che intreccia storia locale, ricerca tecnologica e attenzione all’ambiente.`
      },
      {
        heading: "Processo Progettuale",
        text: `La fase di progettazione ha coinvolto architetti, ingegneri e artigiani, con l’obiettivo di creare una struttura che fosse al tempo stesso funzionale e iconica. Sono stati analizzati i vincoli paesaggistici e climatici, scegliendo soluzioni costruttive che garantissero resistenza, efficienza energetica e integrazione estetica con il territorio circostante.`
      },
      {
        heading: "Analisi Tecnica",
        text: `La struttura portante è realizzata in legno lamellare, selezionato per le sue proprietà meccaniche e la capacità di garantire efficienza energetica. L’isolamento termico è affidato a pannelli multistrato e una barriera al vapore di ultima generazione, che assicurano comfort abitativo in ogni stagione. La posa in opera ha richiesto una precisione millimetrica, con attenzione ai dettagli costruttivi e all’integrazione degli impianti. Il sistema di ventilazione naturale contribuisce a mantenere un microclima interno ottimale.`
      },
      {
        heading: "Design e Materiali",
        text: `Il tetto si caratterizza per una geometria pulita e lineare, che valorizza la luce naturale e la vista sulle montagne. Le travi a vista, trattate con oli naturali, conferiscono calore agli ambienti interni e dialogano con le facciate in pietra locale. La scelta dei materiali risponde a criteri di durabilità e basso impatto ambientale, in linea con le più recenti tendenze dell’architettura sostenibile. Ogni dettaglio, dalla grondaia integrata ai sistemi di fissaggio invisibili, è pensato per garantire estetica e funzionalità.`
      },
      {
        heading: "Sostenibilità e Innovazione",
        text: `Il progetto si distingue per l’adozione di soluzioni innovative: il sistema di raccolta delle acque piovane, integrato nella copertura, alimenta l’irrigazione degli spazi verdi. I pannelli fotovoltaici, perfettamente incassati nella struttura, contribuiscono all’autosufficienza energetica dell’edificio. Ogni scelta progettuale è guidata dalla volontà di ridurre l’impatto ambientale e promuovere il benessere degli abitanti. La certificazione energetica ottenuta testimonia l’impegno verso la sostenibilità.`
      },
      {
        heading: "Impatto Sociale e Culturale",
        text: `La nuova copertura non è solo un elemento tecnico, ma diventa simbolo di una comunità che investe nel futuro. Il coinvolgimento di imprese locali e la valorizzazione delle maestranze artigiane hanno rafforzato il legame tra progetto e territorio, generando ricadute positive in termini di occupazione e identità culturale.`
      },
      {
        heading: "Conclusione",
        text: `La nuova copertura in legno della Residenza Green Valley rappresenta un esempio virtuoso di architettura contemporanea, dove la tradizione costruttiva si fonde con la ricerca tecnologica. Un tetto che non è solo protezione, ma manifesto di una visione sostenibile e integrata del costruire.`
      }
    ]
  },
  en: {
    title: "A Roof of Innovation: Timber Construction Excellence",
    image: "/assets/roofing/Rifacimento copertura edificio Trento.jpg",
    sections: [
      {
        heading: "Introduction",
        text: `In the heart of Trento, the Green Valley Residence stands out for its timber roof, blending tradition and innovation. The project reimagines the roof as a central architectural element, engaging with the Alpine landscape and contemporary sustainability needs. Here, the roof becomes the protagonist of a narrative intertwining local history, technological research, and environmental care.`
      },
      {
        heading: "Design Process",
        text: `The design phase involved architects, engineers, and craftsmen, aiming to create a structure that is both functional and iconic. Landscape and climate constraints were analyzed, selecting construction solutions that ensure strength, energy efficiency, and aesthetic integration with the surrounding territory.`
      },
      {
        heading: "Technical Analysis",
        text: `The supporting structure is made of laminated timber, chosen for its mechanical properties and energy efficiency. Thermal insulation relies on multilayer panels and a state-of-the-art vapor barrier, ensuring comfort in every season. Installation required millimetric precision, with attention to construction details and system integration. The natural ventilation system helps maintain an optimal indoor microclimate.`
      },
      {
        heading: "Design and Materials",
        text: `The roof features a clean, linear geometry that enhances natural light and mountain views. Exposed beams, treated with natural oils, add warmth to the interiors and harmonize with local stone facades. Material choices reflect durability and low environmental impact, in line with the latest sustainable architecture trends. Every detail, from the integrated gutter to invisible fasteners, is designed for aesthetics and functionality.`
      },
      {
        heading: "Sustainability and Innovation",
        text: `The project stands out for its innovative solutions: the rainwater harvesting system, integrated into the roof, irrigates green spaces. Photovoltaic panels, perfectly embedded in the structure, contribute to the building’s energy self-sufficiency. Every design choice is guided by the desire to reduce environmental impact and promote residents’ well-being. The achieved energy certification attests to the commitment to sustainability.`
      },
      {
        heading: "Social and Cultural Impact",
        text: `The new roof is not just a technical element but a symbol of a community investing in its future. The involvement of local businesses and the valorization of artisan skills have strengthened the bond between project and territory, generating positive effects in terms of employment and cultural identity.`
      },
      {
        heading: "Conclusion",
        text: `The new timber roof of Green Valley Residence is a virtuous example of contemporary architecture, where building tradition merges with technological research. A roof that is not just protection, but a manifesto of a sustainable and integrated vision of construction.`
      }
    ]
  }
};

export default function TettoLegno() {
  const { language, setLanguage } = useLanguage();
  const lang = language || "it";
  const article = content[lang];

  return (
    <div className="relative min-h-screen bg-background">
      <ModernNavigation />
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl flex flex-col justify-center items-center min-h-[calc(100vh-200px)]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">{article.title}</h1>
            <div>
              <button
                className={`px-3 py-1 rounded text-sm mr-2 ${lang === "it" ? "bg-primary text-white" : "bg-muted"}`}
                onClick={() => setLanguage("it")}
              >IT</button>
              <button
                className={`px-3 py-1 rounded text-sm ${lang === "en" ? "bg-primary text-white" : "bg-muted"}`}
                onClick={() => setLanguage("en")}
              >EN</button>
            </div>
          </div>
          <div className="flex justify-center mb-8 w-full">
            <img src={article.image} alt={article.title} className="rounded-xl shadow w-full max-w-xl h-80 object-cover object-center" />
          </div>
          <article className="prose prose-lg text-foreground">
            {article.sections.map((section, idx) => (
              <section key={idx}>
                <h2>{section.heading}</h2>
                <p>{section.text}</p>
              </section>
            ))}
          </article>
        </div>
      </section>
      <Footer />
    </div>
  );
}
