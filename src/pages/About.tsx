import ModernNavigation from "@/components/navigation/ModernNavigation";
import { Button } from "@/components/ui/button";
import Footer from "@/components/sections/Footer";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";

export default function AboutPage() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      const bg = bgRef.current;
      const contact = document.getElementById("contact");
      if (!bg || !contact) return;
      const contactRect = contact.getBoundingClientRect();
      if (contactRect.top < window.innerHeight) {
        bg.style.display = "none";
      } else {
        bg.style.display = "";
      }
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Show background image and gradient until contact section is reached */}
      <div ref={bgRef} id="about-bg" className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <img
          src="./assets/Hermes_Trismegistus.jpg"
          alt="Mercurius Trismegistus engraving"
          className="w-full h-full object-cover opacity-40"
          style={{ filter: 'grayscale(0.2) blur(0.5px)', objectPosition: 'top' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/40 to-white/40" />
      </div>
      <ModernNavigation />
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Back to home link */}
          <a href="/" className="flex items-center mt-0 md:mt-10 text-black font-light mb-4 w-fit hover:underline bg-white/40 backdrop-blur-md rounded-xl px-1 py-2 shadow">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Torna alla home
          </a>
          {/* Card 1: Il nome e la storia */}
          <div className="w-full min-h-[420px] flex flex-col justify-between max-w-2xl mx-auto bg-white/40 backdrop-blur-md rounded-xl shadow-md p-6 border border-gray-100 mb-2">
            <h3 className="text-4xl md:text-4xl font-light mb-4 mt-2 text-[#00338D] drop-shadow-lg">Il nome e la storia</h3>
            <p className="font-normal text-left text-xl mb-2 text-[#00338D] w-full">Ermetes è una cooperativa sociale a mutualità prevalente, specializzata in manutenzioni, edilizia residenziale e servizi connessi.</p>
            <div className="text-gray-800 text-justify [word-spacing:-1.5px] text-lg  leading-relaxed text-justify [word-spacing:-1.5px] w-full font-extralight mb-2 w-full mt-4">
              <p className="mb-2 text-justify">Il nome si ispira ad Ermete Trismegisto, leggendario alchimista antico che, secondo la tradizione, aveva scoperto e trascritto la formula per la trasformazione del piombo in oro.</p>
              <p className="mb-2 text-justify">I numerosi discepoli alchimisti che nel corso del medioevo interpretarono la formula in senso letterale ed eseguirono gli esperimenti di trasformazione con fine speculativo alla ricerca di oro e facile ricchezza andarono incontro a reazioni chimiche ed esplosioni trovando morte certa.</p>
              <p className="text-justify">I discepoli che invece la leggevano le formule con la giusta chiave di lettura spirituale, con etica e buon animo, scoprivano insegnamenti molto più profondi.</p>
            </div>
          </div>
          {/* Card 2: La missione di Ermetes */}
          <div className="w-full min-h-[420px] flex flex-col justify-between max-w-2xl mx-auto text-justify bg-white/40 backdrop-blur-md rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="mt-2 text-4xl md:text-4xl text-left font-light mb-4 text-[#00338D] drop-shadow-lg">La missione di Ermetes</h2>
            <p className="text-gray-800 text-lg leading-relaxed text-justify [word-spacing:-1.5px] w-full font-extralight mb-2">Come l’alchimia ermetica trasmuta l’essere umano, così la nostra cooperativa aspira a trasformare le difficoltà quotidiane in opportunità di sviluppo e benessere collettivo.</p>
            <p className="text-gray-800 text-lg leading-relaxed text-justify [word-spacing:-1.5px] w-full font-extralight mb-2">Come ci insegna la storia di Ermete dunque solo se le opportunità generate dalla cooperativa vengono colte dai soci con etica e spirito costruttivo, si genera valore, soddisfazione e crescita per tutti. Se invece prevale lo spirito speculativo egoistico di pochi non ci potranno essere buoni frutti.</p>
            <div  onClick={() => window.location.href = '/impact'} className="pb-2">
              <div className="text-gray-800 text-lg leading-relaxed text-justify [word-spacing:-1.5px] w-full font-extralight mb-6">Per saperne di più sulla nostra organizzazione</div>
              <Button
                className="text-white px-8 py-3 rounded-xl shadow-lg font-regular tracking-wide text-lg hover:bg-[#FFAA00]/80 transition-colors"
                style={{ backgroundColor: '#FFAA00' }}
              >
                Clicca qui
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}
