import ModernNavigation from "@/components/navigation/ModernNavigation";
import Footer from "@/components/sections/Footer";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useToast } from '@/hooks/use-toast';

export default function CandidaturaPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    dataNascita: "",
    genere: "",
    telefono: "",
    indirizzo: "",
    domande: "",
    cv: null as File | null,
    privacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, cv: e.target.files ? e.target.files[0] : null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) return;
    setIsSubmitting(true);

    // Helper to convert file to raw base64 (no data URL)
    function fileToBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
          } else {
            reject(new Error('FileReader result is not a string'));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    let data: any = {
      nome: formData.nome,
      cognome: formData.cognome,
      email: formData.email,
      dataNascita: formData.dataNascita,
      genere: formData.genere,
      telefono: formData.telefono,
      indirizzo: formData.indirizzo,
      domande: formData.domande,
      cv: '',
    };
    if (formData.cv instanceof File) {
      data.cv = JSON.stringify({
        name: formData.cv.name,
        type: formData.cv.type,
        content: await fileToBase64(formData.cv),
      });
    }

    // Serialize as x-www-form-urlencoded
    const params = Object.keys(data)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');

    // Send via XMLHttpRequest (replace URL with your Google Script endpoint)
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbxMF6IwD-pFNZzKzK-gbhHxmZ14TzdSakiwRz586HDoeszI9kM4mJgy4Nc3Txrf6O7wfA/exec');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        toast({
          title: 'Candidatura inviata!',
          description: 'Grazie per aver inviato la tua candidatura. Ti ricontatteremo al più presto.',
        });
        setFormData({
          nome: "",
          cognome: "",
          email: "",
          dataNascita: "",
          genere: "",
          telefono: "",
          indirizzo: "",
          domande: "",
          cv: null,
          privacy: false,
        });
        setIsSubmitting(false);
      }
    };
    xhr.send(params);
  };

  return (
    <div className="relative min-h-screen bg-background">
      <ModernNavigation />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 max-w-5xl mx-auto">
            {/* Back to home link */}
            <a href="/ermetes" className="flex items-center mt-0 md:mt-10 text-black font-light mb-4 w-fit hover:underline">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Torna alla home
            </a>
            <h1 className="text-3xl md:text-4xl font-editorial text-foreground mb-8">
              Invia la tua candidatura
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-1">Nome</label>
                  <input name="nome" value={formData.nome} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 border border-gray-100 p-3" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Cognome</label>
                  <input name="cognome" value={formData.cognome} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 border border-gray-100 p-3" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700 mb-1">Indirizzo Email <span className="text-red-500">*</span></label>
                  <input name="email" type="email" value={formData.email} onChange={handleInputChange} required className="w-full rounded-lg bg-gray-50 border border-gray-100 p-3" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Data di nascita</label>
                  <input name="dataNascita" type="date" value={formData.dataNascita} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 border border-gray-100 p-3" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Genere</label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="genere" value="Maschio" checked={formData.genere === 'Maschio'} onChange={handleInputChange} /> Maschio
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="genere" value="Femmina" checked={formData.genere === 'Femmina'} onChange={handleInputChange} /> Femmina
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Numero di telefono</label>
                  <input name="telefono" value={formData.telefono} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 border border-gray-100 p-3" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Indirizzo di residenza</label>
                <input name="indirizzo" value={formData.indirizzo} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 border border-gray-100 p-3" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Domande</label>
                <textarea name="domande" value={formData.domande} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 border border-gray-100 p-3 min-h-[100px]" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Carica il tuo CV</label>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="block" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleInputChange} required />
                <span className="text-sm text-gray-700">Accetto i <a href="/ermetes/privacypolicy" target="_blank" rel="noopener noreferrer" className="text-pink-600 underline">Termini e le Condizioni</a> di utilizzo del Sito e <a href="/ermetes/privacypolicy" target="_blank" rel="noopener noreferrer" className="text-pink-600 underline">Privacy Policy</a></span>
              </div>
              <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-8 py-3 rounded-lg" disabled={isSubmitting}>
                {isSubmitting ? 'Invio...' : 'INVIA'}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
