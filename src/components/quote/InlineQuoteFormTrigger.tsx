import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import InlineQuoteForm from './InlineQuoteForm';

const InlineQuoteFormTrigger = ({ buttonText = 'Richiedi un Preventivo Personalizzato' }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="inline-quote-form-trigger">
      {!showForm ? (
        <Button onClick={() => setShowForm(true)} className="transition-all duration-300">
          {buttonText}
        </Button>
      ) : (
        <div className="animate-fade-in">
          <InlineQuoteForm />
        </div>
      )}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.5s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default InlineQuoteFormTrigger;
