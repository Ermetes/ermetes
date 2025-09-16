
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import articlesData from "@/data/articles.json";
import { useLanguage } from "@/contexts/LanguageContext";
import ModernNavigation from "@/components/navigation/ModernNavigation";
import { Button } from '@/components/ui/button';
import InlineQuoteForm from '@/components/quote/InlineQuoteForm';
import Footer from "@/components/sections/Footer";



function OfferQuoteSection() {
  const [showForm, setShowForm] = useState(false);
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  return (
    <div className={showForm
      ? "mb-8 p-6 bg-gradient-to-br from-[#00338D] to-[#0066CC] border border-primary rounded-lg shadow flex flex-col items-center"
      : "mb-8 p-6 bg-white/80 border border rounded-lg shadow flex flex-col items-center"}
    >
      <p className={showForm ? "text-base text-white mb-4 text-center" : "text-base text-primary/80 mb-4 text-center"}>
        {isEnglish
          ? showForm
            ? "Fill out the form below to receive a personalized, no-obligation consultation."
            : "Discover tailored solutions for your property. Get free consultation and personalized offer."
          : showForm
            ? "Compila il modulo qui sotto per ricevere una consulenza personalizzata senza impegno."
            : "Scopri le soluzioni su misura per il tuo immobile. Ottieni una consulenza gratuita e un'offerta personalizzata."}
      </p>
      {!showForm ? (
        <Button size="lg" className="bg-primary/90 text-white font-medium px-6 py-3 rounded-md shadow hover:bg-primary" onClick={() => setShowForm(true)}>
          {isEnglish ? "Request a Free Quote" : "Richiedi Preventivo Gratuito"}
        </Button>
      ) : (
        <div className="w-full max-w-xl">
          <InlineQuoteForm />
        </div>
      )}
    </div>
  );
}

const Article = () => {
  // Modal logic removed
  const { lang, slug } = useParams();
  const { language, setLanguage } = useLanguage();
  const selectedLang = (lang === "en" || lang === "it") ? lang : "it";
  const articles = articlesData[selectedLang] || articlesData.it;

  // Set context language from URL on initial mount only
  React.useEffect(() => {
    // Scroll to top when opening article
    window.scrollTo(0, 0);
    // Only set context language if it doesn't match URL param
    if (language !== selectedLang) {
      setLanguage(selectedLang);
    }
    // Only run on mount
    // eslint-disable-next-line
  }, []);

  // Find article by slug (match link ending)
  const article = articles.find((a) => a.link.endsWith(slug));

  // If not found, try to map slug from other language and redirect
  if (!article) {
    // Try to find by id from other language
    const articlesDataAll = require('@/data/articles.json');
    const otherLang = selectedLang === 'it' ? 'en' : 'it';
    const otherArticles = articlesDataAll[otherLang];
    const otherArticle = otherArticles.find(a => a.link.endsWith(slug));
    if (otherArticle) {
      // Find matching article in current language by id
      const mappedArticle = articles.find(a => a.id === otherArticle.id);
      if (mappedArticle) {
        // Redirect to correct slug
        window.location.replace(`/ermetes/magazine/${selectedLang}/${mappedArticle.link.split('/').pop()}`);
        return null;
      }
    }
  }

  // (No redirect effect: navigation handles URL changes)

  if (!article) {
    return <div className="container mx-auto py-20 text-center text-2xl">Article not found.</div>;
  }

  return (
    <div className="relative min-h-screen bg-background">
      <ModernNavigation />
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <a href="/ermetes/" className="inline-flex items-center text-primary hover:underline mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              {language === 'it' ? 'Torna alla Home' : 'Back to Home'}
            </a>
            {/* <div className="flex items-center justify-center mb-6 min-h-48">
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover object-bottom rounded-lg" />
            </div> */}
            <h1 className="text-4xl font-bold mb-4 mt-10">{article.title}</h1>
            <div className="flex items-center space-x-4 text-muted-foreground mb-4">
              <span>{article.category}</span>
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </div>
          </div>
          {/* CTA Offer Button for first article only */}
          <OfferQuoteSection />
          {/* Render content from articles.json, fallback to excerpt if missing */}
          {article.content ? (
            <div
              className="prose prose-lg text-foreground text-justify" 
              style={{ lineHeight: 2 }}
              dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }}
            />
          ) : (
            <p className="text-lg text-foreground mb-8 text-justify" style={{ lineHeight: 2 }}>{article.excerpt}</p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Article;
