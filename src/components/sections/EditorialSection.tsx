import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, ArrowLeft } from "lucide-react";
import articlesData from "@/data/articles.json";
import { useLanguage } from "@/contexts/LanguageContext";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  link: string;
  author?: string;
  featured?: boolean;
}

const EditorialSection = () => {
  // Load articles and section content from context
  const { content, articles } = useLanguage();

  // Use the first article as featured, rest as regular
  const featuredArticle = articles[0];
  const regularArticles = articles.slice(1);

  // Helper to get magazine link for React Router navigation
  const getMagazineLink = (link: string) => {
    // Remove /ermetes prefix if present
    if (link.startsWith("/ermetes/")) {
      return link.replace("/ermetes", "");
    }
    return link;
  }

  return (
    <section id="articles" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Back to home link */}
        <a href="/ermetes" className="flex items-center mt-0 md:mt-10 text-black font-light mb-4 w-fit hover:underline">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Torna alla home
        </a>

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-editorial text-foreground mb-6">
            {content.articlesSection?.title || 'Magazine'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            {content.articlesSection?.subtitle || 'Stories, projects and reflections from the world of social construction and sustainability'}
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-16">
            <Link to={getMagazineLink(featuredArticle.link)} style={{ textDecoration: 'none' }}>
              <Card className="overflow-hidden border-0 shadow-lg bg-card cursor-pointer hover:shadow-xl transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-white">
                      {featuredArticle.category}
                    </Badge>
                  </div>
                  <CardContent className="p-8 md:p-12 flex flex-col justify-start">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                      {/* No author property in articles */}
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredArticle.readTime}</span>
                      </div>
                      <span>{featuredArticle.date}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-editorial text-foreground mb-4 leading-tight">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-light text-lg">
                      {featuredArticle.excerpt}
                    </p>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularArticles.map((article) => (
            <Link key={article.id} to={getMagazineLink(article.link)} style={{ textDecoration: 'none' }}>
              <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-card cursor-pointer">
                <div className="relative h-48">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary text-white text-xs">
                    {article.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground mb-3">
                    {/* No author property in articles */}
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <h4 className="text-xl font-editorial text-foreground mb-3 leading-tight">
                    {article.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed font-light">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 text-xs text-muted-foreground">
                    {article.date}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;