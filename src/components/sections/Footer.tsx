import React from 'react';
import { Building2, Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { content } = useLanguage();

  return (
    <footer className="bg-[#00338D] text-background py-16" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">{content.footer.company}</span>
            </div>
            <p className="text-background/80 leading-relaxed">
              {content.footer.description}
            </p>
            <div className="flex space-x-4">
              <a href="http://instagram.com/ermetes_coop" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 text-background/80 hover:text-background cursor-pointer transition-colors" />
              </a>
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