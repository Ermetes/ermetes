import React, { createContext, useContext, useState } from 'react';
import contentData from '@/data/content.json';
import articlesData from '@/data/articles.json';

type Language = 'it' | 'en';

type ProjectType = {
  title: string;
  category: string;
  description: string;
  image: string;
  icon: string;
  extendedInfo: string;
  status: string;
  duration: string;
  budget: string;
  features: string[];
  link: string;
  details?: {
    // define the details structure here if needed
    [key: string]: any;
  };
};

type ContentDataType = {
  it: Omit<typeof contentData.it, 'projectsScroll'> & {
    projectsScroll: Omit<typeof contentData.it.projectsScroll, 'projects'> & {
      projects: ProjectType[];
    };
  };
  en: Omit<typeof contentData.en, 'projectsScroll'> & {
    projectsScroll: Omit<typeof contentData.en.projectsScroll, 'projects'> & {
      projects: ProjectType[];
    };
  };
};

type ArticlesDataType = {
  it: typeof articlesData.it;
  en: typeof articlesData.en;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  content: ContentDataType[Language];
  articles: ArticlesDataType[Language];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('it');

  const content = contentData[language];
  const articles = articlesData[language];

  return (
    // @ts-ignore
    <LanguageContext.Provider value={{ language, setLanguage, content, articles }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};