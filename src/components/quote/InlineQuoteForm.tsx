import React, { useState } from 'react';
import { useModal } from '@/contexts/ModalContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, Calculator, Building, User, FileText, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const InlineQuoteForm = () => {
  const { closeModal } = useModal();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    projectType: string;
    projectDetails: string;
    address: string;
    name: string;
    phone: string;
    email: string;
    message: string;
    images: FileList | null;
    projectFile: File | null;
    metricFile: File | null;
  }>({
    projectType: '',
    projectDetails: '',
    address: '',
    name: '',
    phone: '',
    email: '',
    message: '',
    images: null,
    projectFile: null,
    metricFile: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | File | FileList | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (isStepValid()) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    } else {
      toast({
        title: content.quote.form.toast.missingFieldsTitle,
        description: content.quote.form.toast.missingFieldsDescription,
        variant: "destructive",
      });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Helper to convert file to raw base64 (no data URL)
    function fileToBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            // Extract only the base64 part
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

    // Prepare data
    let data = {
      projectType: formData.projectType,
      projectDetails: formData.projectDetails,
      address: formData.address,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      images: [],
      projectFile: '',
      metricFile: ''
    };

    // Encode files (send raw base64)
    if (formData.images instanceof FileList) {
      for (let i = 0; i < formData.images.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        data.images.push({
          name: formData.images[i].name,
          type: formData.images[i].type,
          content: await fileToBase64(formData.images[i]) // raw base64
        });
      }
    }
    if (formData.projectFile instanceof File) {
      data.projectFile = JSON.stringify({
        name: formData.projectFile.name,
        type: formData.projectFile.type,
        content: await fileToBase64(formData.projectFile) // raw base64
      });
    }
    if (formData.metricFile instanceof File) {
      data.metricFile = JSON.stringify({
        name: formData.metricFile.name,
        type: formData.metricFile.type,
        content: await fileToBase64(formData.metricFile) // raw base64
      });
    }

    // Serialize as x-www-form-urlencoded
    const params = Object.keys(data)
      .map(key => {
        if (Array.isArray(data[key])) {
          return data[key].map((v, i) => `${encodeURIComponent(key + '_' + i)}=${encodeURIComponent(JSON.stringify(v))}`).join('&');
        } else {
          return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
        }
      })
      .join('&');

    // Send via XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbyUuM-eX-XfBckXyWm1k6K8LCl3HX_AAWa7xE_Icg-rsUXqKyeE1rqu7djxPMVV7Nkbvw/exec');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 3) {
        toast({
          title: content.quote.form.toast.successTitle,
          description: content.quote.form.toast.successDescription,
        });
        closeModal();
        setFormData({
          projectType: '',
          projectDetails: '',
          address: '',
          name: '',
          phone: '',
          email: '',
          message: '',
          images: null,
          projectFile: null,
          metricFile: null
        });
        setCurrentStep(1);
        setIsSubmitting(false);
      }
    };
    xhr.send(params);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.projectType && formData.projectDetails && formData.address;
      case 2:
        return formData.name && formData.phone && formData.email;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const { content } = useLanguage();
  const projectTypes = content.quote.form.projectTypeOptions;

  const budgetRanges = content.quote.form.budgetOptions;

  const timelineOptions = content.quote.form.timelineOptions;

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return Building;
      case 2: return User;
      case 3: return CheckCircle;
      default: return Building;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-neutral-900 mb-2">{content.quote.form.projectType} *</label>
                <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                  <SelectTrigger className="bg-white border-primary/30 text-neutral-900 placeholder:text-neutral-500">
                    <SelectValue placeholder={content.quote.form.projectType_placeholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border">
                    {projectTypes.map((type, index) => (
                      <SelectItem key={index} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-neutral-900 mb-2">{content.quote.form.address} *</label>
                <Input
                  type="text"
                  placeholder={content.quote.form.address_placeholder}
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="bg-white border-primary/30 text-neutral-900 placeholder:text-neutral-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">{content.quote.form.description} *</label>
              <Textarea
                placeholder={content.quote.form.description_placeholder}
                value={formData.projectDetails}
                onChange={(e) => handleInputChange('projectDetails', e.target.value)}
                className="bg-white border-primary/30 text-neutral-900 placeholder:text-neutral-500 min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Carica immagini</label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleInputChange('images', e.target.files)}
                  className="bg-white border-primary/30 text-neutral-900 placeholder:text-neutral-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Carica il progetto</label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx,.zip,.rar"
                  onChange={(e) => handleInputChange('projectFile', e.target.files ? e.target.files[0] : null)}
                  className="bg-white border-primary/30 text-neutral-900 placeholder:text-neutral-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Carica il computo</label>
                <Input
                  type="file"
                  accept=".pdf,.xls,.xlsx,.csv,.zip,.rar"
                  onChange={(e) => handleInputChange('metricFile', e.target.files ? e.target.files[0] : null)}
                  className="bg-white border-primary/30 text-neutral-900 placeholder:text-neutral-500"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">{content.quote.form.name} *</label>
              <Input
                type="text"
                placeholder={content.quote.form.name}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-white border-primary/30 text-neutral-900 placeholder:text-neutral-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">{content.quote.form.phone} *</label>
              <Input
                type="tel"
                placeholder={content.quote.form.phone}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="bg-white border-primary/30 text-neutral-900 placeholder:text-neutral-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">{content.quote.form.email} *</label>
              <Input
                type="email"
                placeholder={content.quote.form.email}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-white border-primary/30 text-neutral-900 placeholder:text-neutral-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">{content.quote.form.message || 'Messaggio (Opzionale)'} </label>
              <Textarea
                placeholder={content.quote.form.message || 'Messaggio (Opzionale)'}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="bg-white border-primary/30 text-neutral-900 placeholder:text-neutral-500"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 text-center">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
            <h3 className="text-xl font-medium text-blue-900">{content.quote.form.summary.title}</h3>
            <div className="bg-white/10 rounded-lg p-4 text-left text-blue-900 space-y-2">
              <p className="text-blue-900"><strong>{content.quote.form.summary.project}:</strong> {formData.projectType}</p>
              <p className="text-blue-900"><strong>{content.quote.form.summary.address}:</strong> {formData.address}</p>
              <p className="text-blue-900"><strong>{content.quote.form.summary.contact}:</strong> {formData.name} - {formData.phone}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const stepTitles = [
    content.quote.form.step1,
    content.quote.form.step3,
  ];

  const StepIcon = getStepIcon(currentStep);
  const progress = (currentStep / 3) * 100;

  return (
    <Card className="bg-white border border-primary/20 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center mb-4">
          <Calculator className="h-5 w-5 text-primary mr-2" />
          <CardTitle className="text-lg font-medium text-primary">{content.quote.title}</CardTitle>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-primary/70">
            <span>{content.quote.form[`step${currentStep}`]}</span>
            <span>{content.quote.form[`progress${Math.round(progress)}`] || `${Math.round(progress)}%`}</span>
          </div>
          <Progress value={progress} className="h-2 bg-primary/20" />
        </div>
        
        <div className="flex items-center mt-4">
          <StepIcon className="h-5 w-5 text-primary mr-2" />
          <h3 className="text-base font-medium text-primary">{stepTitles[currentStep - 1]}</h3>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="text-neutral-900">{renderStep()}</div>
        
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <Button 
              onClick={handlePrevious}
              variant="outline"
              className="bg-transparent border-white/30 text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Indietro
            </Button>
          )}
          
          <div className="ml-auto">
            {currentStep < 3? (
              <Button 
                onClick={handleNext}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                {content.quote.form.next || 'Avanti'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    {content.quote.form.submit}
                  </span>
                ) : (
                  <>
                    {content.quote.form.submit}
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InlineQuoteForm;
