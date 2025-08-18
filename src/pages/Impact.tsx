import ModernNavigation from "@/components/navigation/ModernNavigation";
import Footer from "@/components/sections/Footer";
import { ArrowLeft } from "lucide-react";

export default function ImpactPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <ModernNavigation />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 max-w-3xl mx-auto">
            {/* Back to home link */}
            <a href="/ermetes" className="flex items-center mt-0 md:mt-10 text-black font-light mb-4 w-fit hover:underline">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Torna alla home
            </a>
            <h1 className="text-4xl md:text-5xl font-editorial text-foreground text-center">
              Documento organizzativo e definizione impatto sociale Ermetes scs<br />Trento, Aprile 2025
            </h1>
            <div className="bg-card rounded-3xl shadow-lg p-4 md:p-8">
              <h2 className="text-2xl font-semibold mb-4">Introduzione</h2>
              <p className="mb-4 text-lg text-muted-foreground text-justify">
                Il seguente documento è redatto con l’obiettivo di descrivere nel modo più preciso e concreto possibile l’impatto sociale generato dall’attività di inserimento lavorativo e supporto sociale svolto dalla Cooperativa Ermetes. Il programma è redatto tenendo conto delle "Linee guida per la realizzazione di sistemi di valutazione dell'impatto sociale" per gli enti del Terzo settore (ETS) e le imprese sociali contenuto nel decreto del Ministero del Lavoro e delle Politiche Sociali del 23 luglio 2019, pubblicato nella Gazzetta Ufficiale il 12 settembre 2019. Si tratta di linee guida che servono a definire criteri minimi necessari per valutare il valore sociale generato dalle attività, i cambiamenti prodotti e la sostenibilità delle azioni.
              </p>
            </div>
            <div className="bg-card rounded-3xl shadow-lg p-4 md:p-8">
              <h2 className="text-2xl font-semibold mb-4">Chi siamo</h2>
              <p className="mb-4 text-lg text-muted-foreground text-justify">
                Ermetes Società Cooperativa Sociale è una cooperativa a mutualità prevalente che nasce con l’obiettivo di supportare l’inserimento professionale e la continuità lavorativa di personale svantaggiato in particolare disoccupati in difficoltà che faticano a rientrare nel mondo del lavoro, rifugiati politici, cittadini stranieri, giovani NEET.. tramite attività coordinata nell’ambito delle manutenzioni, pulizie, edilizia residenziale e altri servizi connessi.
              </p>
              <h3 className="text-xl font-semibold mb-2">Come lo facciamo</h3>
              <p className="mb-4 text-lg text-muted-foreground text-justify">
                Ermetes organizza la sua attività tramite piccole squadre composte da 3/4 persone di cui due professionalizzate che coordinano e organizzano e una/due svantaggiate, segnalate dall’ufficio welfare comunale, che affiancano, apprendono e applicano. L'attività di tutoraggio e avvicinamento al lavoro per le figure in difficoltà viene svolta sia in fase organizzativa (calendario interventi) sia in fase operativa (affiancamento sul campo). Per raggiungere il suo obiettivo Ermetes offre inoltre ai lavoratori svantaggiati: formazione continua, supporto amministrativo negli aspetti documentali quando necessario, aggiornamento competenze pratiche nel caso di competenze diverse o parziali e continuità lavorativa ove possibile. Come ulteriore strumento di impatto sociale e valorizzazione dei suoi lavoratori, la Cooperativa si impegna a remunerare tutti coloro che hanno partecipato alla creazione del valore di ogni commessa sia con importi fissi come previsto da contratto sia con percentuali aggiuntive definite in base a specifici obiettivi (KPI) di qualità del lavoro e obiettivi raggiunti. L’obiettivo è quello di valorizzare e premiare le qualità individuali dei soci e stimolare il loro coinvolgimento proattivo nel progetto cooperativo.
              </p>
            </div>
            <div className="bg-card rounded-3xl shadow-lg p-4 md:p-8">
              <h2 className="text-2xl font-semibold mb-4">Attività specifiche per l’inserimento figure svantaggiate</h2>
              <ul className="list-disc pl-6 space-y-4">
                <li>Dialogo con l’ufficio welfare del comune di Trento (referente Letizia Chiodi) e con assistenti sociali del territorio che segnalano figure svantaggiate compatibili con la nostra attività, successivo incontro con le figure segnalate, ascolto delle necessità e successiva valutazione di compatibilità con percorsi di affiancamento e inserimento lavorativo;</li>
                <li>Tutoraggio e affiancamento (sul cantiere)  per favorire l’inserimento nel lavoro e (fuori cantiere) in modo volontario per la risoluzione di problematiche sociali extra lavorative, ricerca soluzioni abitative e supporto nella stesura di documenti;</li>
                <li>Collaborazione con altre cooperative per accompagnare verso il lavoro di figure da loro formate e supportate, in particolare collaborazione con Coop Alpi e Punto d’Incontro;</li>
                <li>Messa in regola per quanto riguarda i corsi obbligatori e gli adempimenti per la sicurezza sul lavoro (d.lgs 81.2008) e supporto documentale nelle rendicontazioni di cantiere per tutti i nuovi soci lavoratori;</li>
                <li>Supporto organizzativo (calendario cronoprogramma dei lavori e pianificazione di cantiere costruita a monte per semplificare la comprensione dei lavori);</li>
              </ul>
            </div>
            <div className="bg-card rounded-3xl shadow-lg p-4 md:p-8">
              <h2 className="text-2xl font-semibold mb-4">L’importanza di un servizio sociale di questo tipo</h2>
              <p className="mb-4 text-lg text-muted-foreground text-justify">
                Un progetto come quello proposto da Ermetes per l’inserimento professionale di figure in difficoltà e svantaggiate nel settore delle manutenzioni e dell’edilizia permette di risolvere allo stesso tempo diverse problematiche sociali.
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li><strong>Professionalizzazione e avvicinamento concreto di figure svantaggiate al lavoro:</strong> la presenza costante di tutor/capisquadra competenti che fungono da guida permette a persone fragili seguite dal sociale di essere guidate un passo alla volta verso un’indipendenza lavorativa. Le competenze manutentive che apprendono quotidianamente sono infatti sempre più richieste sul mercato e possono portare con la giusta esperienza a remunerazioni soddisfacenti.</li>
                <li><strong>Riduzione del lavoro sommerso:</strong> cittadini stranieri, migranti e più in generale persone in stato di difficoltà con poche competenze linguistiche e senza una formazione specifica, finiscono spesso per alimentare il mondo del “lavoro in nero”. Se avvicinati invece a realtà come la nostra al contrario vengono in primis resi consapevoli dei loro diritti, delle corrette procedure di inquadramento, della documentazione obbligatoria per la sicurezza sul lavoro che supportiamo a fornire a spese nostre e avviati verso un percorso di legalità e professionalizzazione sia linguistica che competenziale.</li>
              </ul>
            </div>
            <div className="bg-card rounded-3xl shadow-lg p-4 md:p-8">
              <h2 className="text-2xl font-semibold mb-4">Modalità di intervento specifiche da adottare per ogni categoria di svantaggio</h2>
              <table className="w-full text-left mb-4">
                <thead>
                  <tr>
                    <th className="font-semibold">Categorie di svantaggio</th>
                    <th className="font-semibold">Modalità specifiche di intervento e supporto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Rifugiati politici e stranieri</td>
                    <td>Lingua, Sicurezza sul lavoro, Integrazione e aspetti abitativi</td>
                  </tr>
                  <tr>
                    <td>Dipendenze (alcol, droghe)</td>
                    <td>Affiancamento sul lavoro (squadre combinate, e motivazione di gruppo)</td>
                  </tr>
                  <tr>
                    <td>Disoccupati over 50 o giovani NEET</td>
                    <td>Reskilling professionale, Messa a norma documentale, Inserimento in team di lavoro misti multietà, Valorizzazione dell’esperienza per formazione interna giovani</td>
                  </tr>
                  <tr>
                    <td>Svantaggi fisici</td>
                    <td>Affiancamento sul lavoro e supporto organizzativo</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-card rounded-3xl shadow-lg p-4 md:p-8">
              <h2 className="text-2xl font-semibold mb-4">Fasi del processo di inserimento</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Analisi del contesto e dei bisogni specifici in dialogo con il servizio sociale (categorie di svantaggio);</li>
                <li>Definizione degli obiettivi e step di inserimento in base alla categoria inquadrata;</li>
                <li>Pianificazione delle mansioni e del percorso di inserimento professionale più adatto e contrattualizzazione;</li>
                <li>Valutazione: misurazione dei cambiamenti nel tempo in base ai parametri individuati;</li>
                <li>Reporting interno sulle lavorazioni, prestazioni e approfondimento di eventuali problematiche con gli assistenti sociali;</li>
                <li>Condivisione dei risultati tramite reportistica interna semestrale per il CDA;</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
