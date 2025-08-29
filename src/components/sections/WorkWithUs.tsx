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

const serviceImages = ['.assets/construction-1.jpg', '.assets/maintenance/construction-2.jpg', '.assets/construction-3.jpeg', '.assets/construction-4.jpeg'];

const WorkWithUs = () => {
  const { content } = useLanguage();
  return (
    <section>
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#00338D] to-[#0066CC] py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-light text-white mb-6">
            {content.services.ctaTitle}
          </h3>
          <Button
            className="mt-2 text-white px-6 py-2 rounded-lg shadow"
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