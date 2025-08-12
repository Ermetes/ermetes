import ModernNavigation from "@/components/navigation/ModernNavigation";
import Footer from "@/components/sections/Footer";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <ModernNavigation />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-editorial text-foreground text-center">
              Chi siamo, approccio operativo e organizzazione
            </h1>
            <div className="bg-card rounded-3xl shadow-lg p-4 md:p-8">
              <p className="mb-4 text-lg text-muted-foreground text-justify">
                Ermetes Società Cooperativa Sociale è una cooperativa a mutualità
                prevalente che nasce con l’obiettivo di supportare l’inserimento
                professionale e la continuità lavorativa di personale svantaggiato
                in particolare disoccupati che faticano a rientrare nel mondo del
                lavoro, rifugiati politici, cittadini stranieri, giovani NEET…
                tramite attività coordinata nell’ambito delle manutenzioni,
                edilizia residenziale e altri servizi connessi.
              </p>
              <p className="mb-4 text-lg text-muted-foreground text-justify">
                Per portare a buon fine i lavori Ermetes si organizza tramite
                picccole squadre composte da n.3 persone di cui una
                professionalizzata che coordina e organizza e due svantaggiate
                che affiancano. L’attività di tutoraggio e avvicinamento al
                lavoro per le figure in difficoltà viene svolta da un
                professionista dedicato socio della Cooperativa.
              </p>
              <p className="mb-4 text-lg text-muted-foreground text-justify">
                Per raggiungere il suo obiettivo Ermetes offre inoltre ai
                lavoratori svantaggiati: formazione continua, supporto
                amministrativo negli aspetti documentali, reskilling in caso di
                parziali competenze e continuità lavorativa tramite la
                pianificazione del cronoprogramma lavori tramite l’ufficio
                amministrativo ed eventuali partnership con enti specializzati.
              </p>
              <p className="mb-4 text-lg text-muted-foreground text-justify">
                Come ulteriore strumento di impatto sociale e valorizzazione dei
                suoi lavoratori, la Cooperativa si impegna a remunerare tutti
                coloro che hanno partecipato alla creazione del valore di ogni
                commessa sia con importi fissi come previsto da contratto sia con
                percentuali aggiuntive definite in base a specifici obiettivi
                (KPI) di qualità del lavoro, miglioramento competenziale e
                personale raggiunti. L’obiettivo è quello di valorizzare e premiare
                le qualità individuali dei soci e stimolare il loro coinvolgimento
                proattivo nel progetto cooperativo.
              </p>
            </div>
            <div className="bg-card rounded-3xl shadow-lg p-4 md:p-8">
              <h2 className="text-2xl font-semibold mb-4">
                Approccio operativo al lavoro e organizzazione
              </h2>
              <ul className="list-disc pl-6 space-y-4">
                <li className="text-justify">
                  <strong>Ufficio amministrativo (referente Elisa Mantovani):</strong>{" "}
                  l’obiettivo dell’ufficio è quello di semplificare l’attività
                  operativa di cantiere rendendola compatibile con la presenza di
                  figure svantaggiate. L’ufficio composto da soci lavoratori e
                  volontari, coordina le squadre, organizza il calendario dei
                  lavori, monitora e gestisce le scadenze, le rendicontazioni, le
                  fatture, i pagamenti e mantiene i rapporti con i committenti.
                </li>
                <li className="text-justify">
                  <strong>
                    Un coordinatore per ogni squadra di lavoro (referente Aron
                    Ioris):
                  </strong>{" "}
                  le squadre di lavoro (attualmente n.1 attiva dedicata a
                  manutenzioni e lavori edili, in fase di creazione la seconda)
                  sono composte ciascuna da tre figure di cui n.1 coordinatore
                  specializzato e due figure svantaggiate. Il coordinatore funge
                  da tutor e si occupa di formare quotidianamente le figure meno
                  esperte, organizzare il lavoro, predisporre gli strumenti
                  necessari, coordinare le attività, gestire le scadente e
                  rendicontare l’avanzamento quotidiano dei lavori dialogando con
                  l’ufficio amministrativo che contabilizza;
                </li>
                <li className="text-justify">
                  <strong>
                    Responsabile risorse umane (referente Adderrazzak Edbali):
                  </strong>{" "}
                  si tratta di una figura specializzata nell’individuazione e
                  coinvolgimento dei soggetti svantaggiati nella cooperativa, nella
                  gestione delle loro necessità sia per l’inserimento professionale
                  sia per quanto riguarda le problematiche di integrazione extra
                  professionali, nel monitoraggio dei loro miglioramenti, nella
                  gestione dei percorsi formativi necessari, nel dialogo con
                  l’agenzia del lavoro e servizio welfare (attività quest’ultima
                  che deve essere ancora strutturata).
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">
                L’importanza per la società del nostro progetto sociale
              </h2>
              <p className="mb-4 text-lg text-muted-foreground text-justify">
                Un progetto specialistico come quello proposto da Ermetes per
                l’inserimento professionale di figure in difficoltà e svantaggiate
                nel settore delle manutenzioni e dell’edilizia diventa sempre più
                importante al giorno d’oggi perchè la complessità organizzativa
                richiesta da tale settore è in forte aumento con conseguenti
                situazioni di difficoltà da parte di manovali e operai over 50 e
                stranieri che in passato trovavano più facilmente occupazione ma
                che oggi senza il nostro tutoraggio e affiancamento sarebbero
                completamente esclusi dal mercato e messi al margine, alimentando
                così il mondo del lavoro sommerso. Tali attività invece, se
                correttamente coordinate da un’ufficio centrale in termini
                organizzativi e da un tutor sempre presente sul posto di lavoro,
                possono risultano invece semplici e interamente basate sulla
                manualità, garantendo così l’inserimento di persone svantaggiate
                non compatibili con altre professioni o attività produttive più
                complesse.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
