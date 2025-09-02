import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Wrench, Construction, ClipboardCheck, Users, Leaf } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const iconMap = {
  building: Building,
  wrench: Wrench,
  construction: Construction,
  'clipboard-check': ClipboardCheck,
};

const serviceImages = ['./assets/construction-1.jpg', './assets/maintenance/construction-2.jpg', './assets/construction-3.jpeg', './assets/construction-4.jpeg'];

const WorkWithUs = () => {
  const { content } = useLanguage();
  return (
    <section>
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#117eac] to-[#73c2e3] py-8 md:py-16">
        <div className="max-w-4xl mx-auto text-left px-4 lg:px-8 text-center">
          <h3 className="text-3xl font-light text-white mb-4">
            {content.services.ctaTitle}
          </h3>
          <Button
            className="text-white px-8 mt-5 py-3 rounded-xl shadow-lg font-regular tracking-wide text-md lg:text-lg hover:bg-[#FFAA00]/80 transition-colors px-8 py-4 lg:py-6"
            style={{ backgroundColor: '#FFAA00' }}
            onClick={() => window.location.href = '/ermetes/candidatura'}
          >
            Contact us
          </Button>
          {/* Removed modal trigger button for quote request */}
        </div>
      </div>
    </section>
  );
};

export default WorkWithUs;