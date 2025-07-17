import React from 'react';
import { Building2, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { content } = useLanguage();

  return (
    <footer className="bg-[#00338D] text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">{content.footer.company}</span>
            </div>
            <p className="text-background/80 leading-relaxed">
              {content.footer.description}
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-background/80 hover:text-background cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-background/80 hover:text-background cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-background/80 hover:text-background cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Contact Info */}
          <div id="contact" className="space-y-4">
            <h3 className="text-lg font-semibold">{content.footer.contactTitle}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-background/80" />
                <span className="text-background/80">{content.footer.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-background/80">{content.footer.registrationNumber}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-background/80">{content.footer.registration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-background/80" />
                <span className="text-background/80">{content.footer.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-background/80" />
                <span className="text-background/80">{content.footer.email}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{content.footer.servicesTitle}</h3>
            <ul className="space-y-2 text-background/80">
              {content.footer.services.map((service: string, idx: number) => (
                <li key={idx}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{content.footer.linksTitle}</h3>
            <ul className="space-y-2 text-background/80">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  {content.footer.links.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  {content.footer.links.terms}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  {content.footer.links.social}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  {content.footer.links.certifications}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/60">
            {content.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;