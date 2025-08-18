import ModernNavigation from "@/components/navigation/ModernNavigation";
import Footer from "@/components/sections/Footer";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            <h1 className="text-4xl md:text-5xl font-editorial text-foreground text-center mb-8">
              Privacy Policy
            </h1>
            <div className="bg-card rounded-3xl shadow-lg p-4 md:p-8 text-justify text-base text-muted-foreground overflow-x-auto" style={{whiteSpace: 'pre-line'}}>
              {`
1. Premessa
In ottemperanza degli obblighi derivanti dal Regolamento (UE) n. 2016/679 del Parlamento Europeo e della legislazione nazionale vigente, ERMETES SOCIETA’ COOPERATIVA SOCIALE rispetta e tutela i dati personali dei visitatori e degli utenti del sito internet www.ermetes.it.

Questo documento fornisce informazioni sul trattamento dei dati personali raccolti da ERMETES SOCIETA’ COOPERATIVA SOCIALE tramite il Sito Internet e costituisce una informativa ai sensi della predetta normativa.

2. Identità e dati di contatto del titolare del trattamento
Il titolare del trattamento è ERMETES SOCIETA’ COOPERATIVA SOCIALE, P. IVA 02755460223, con sede legale in VIA SAN FRANCESCO D’ASSISI 10, 38122 Trento, Trento; email: amministrazione@ermetes.it, ermetes@pec.decaminada.it.

3. Tipologie di dati trattati tramite il Sito Internet
Il Titolare del Trattamento, tramite il Sito Internet, potrà trattare i seguenti dati:
- Dati raccolti in maniera automatizzata – dati di traffico e di navigazione (indirizzi IP, browser, provider, URI/URL, data e orario di visita, metodo di richiesta, stato della risposta, pagina di provenienza e uscita, sistema operativo, ecc.)
- Dati comunicati dagli Interessati (nome, cognome, email, ecc. inviati tramite moduli o email)

4. Cookie e altri sistemi di tracciamento
Il Sito Internet fa uso di cookie tecnici, analitici e di terze parti. I cookie tecnici sono necessari al funzionamento del sito. I cookie analitici raccolgono informazioni anonime sull’uso del sito. I cookie di terze parti sono utilizzati per servizi aggiuntivi e possono essere di profilazione. L’utente può rifiutare o revocare il consenso ai cookie tramite le impostazioni del browser.

5. Finalità e base giuridica del trattamento
I dati sono trattati per gestire e migliorare il sito, adempiere obblighi di legge, prevenire attività fraudolente, effettuare analisi statistiche, rispondere a richieste degli utenti, inviare comunicazioni amministrative e, previo consenso, comunicazioni commerciali.

6. Comunicazione dei dati
I dati personali raccolti potranno essere comunicati a organismi di vigilanza, autorità giudiziarie e soggetti ai quali la comunicazione sia obbligatoria per legge.

7. Modalità di trattamento e periodo di conservazione
I dati sono trattati con strumenti cartacei, elettronici e automatizzati per il tempo necessario alle finalità indicate e comunque non oltre quanto richiesto dalla normativa vigente.

8. Trasferimento dei dati personali
La gestione e la conservazione dei dati avviene su server ubicati nell’Unione Europea. Il Titolare potrà trasferire i dati extra-UE solo in conformità alla legge.

9. Misure di sicurezza
ERMETES SOCIETA’ COOPERATIVA SOCIALE adotta misure di sicurezza per impedire accessi non autorizzati, divulgazione, modifica o distruzione non autorizzata dei dati.

10. Diritti degli interessati
Gli interessati possono esercitare i diritti previsti dal GDPR: accesso, rettifica, cancellazione, limitazione, portabilità, opposizione. Le richieste possono essere inviate a amministrazione@ermetes.it o ermetes@pec.decaminada.it.

11. Diritto di reclamo
Gli interessati possono proporre reclamo al Garante per la protezione dei dati personali o adire le opportune sedi giudiziarie.

12. Tutela dei minori
Il Titolare non permette a minori di 16 anni di usufruire dei servizi e non raccoglie intenzionalmente dati relativi a minori di 16 anni.

13. Aggiornamenti
La presente informativa è valida dal 25 maggio 2018 e potrà essere aggiornata. Eventuali modifiche saranno comunicate tramite il sito o altri mezzi idonei.

ERMETES SOCIETA’ COOPERATIVA SOCIALE
Viale San Francesco d’Assisi, 10, 38122 Trento TN
Codice fiscale: 02755460223
Email: amministrazione@ermetes.it
PEC: ermetes.pec@decaminada.it
Sito web: www.ermetes.it
              `}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
