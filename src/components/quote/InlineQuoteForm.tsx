import React, { useState } from 'react';
import { useModal } from '@/contexts/ModalContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, Calculator, Building, User, FileText, CheckCircle, Image, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { v4 as uuidv4 } from 'uuid';

const InlineQuoteForm = () => {
  // Helper to send POST to Google Script (non-blocking)
  const sendStepData = async (step: number, data: any) => {
    setPendingUploads(prev => prev + 1);
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

    let payload = { ...data, sessionId };
    // Only encode files if present
    if (step === 1 && Array.isArray(data.images)) {
      payload.images = [];
      for (let i = 0; i < data.images.length; i++) {
        payload.images.push({
          name: data.images[i].name,
          type: data.images[i].type,
          content: await fileToBase64(data.images[i])
        });
      }
    }
    if (step === 2) {
      // Encode files for step 2 if present
      if (Array.isArray(data.images)) {
        payload.images = [];
        for (let i = 0; i < data.images.length; i++) {
          payload.images.push({
            name: data.images[i].name,
            type: data.images[i].type,
            content: await fileToBase64(data.images[i])
          });
        }
      }
      if (data.projectFile instanceof File) {
        payload.projectFile = JSON.stringify({
          name: data.projectFile.name,
          type: data.projectFile.type,
          content: await fileToBase64(data.projectFile)
        });
      }
      if (data.metricFile instanceof File) {
        payload.metricFile = JSON.stringify({
          name: data.metricFile.name,
          type: data.metricFile.type,
          content: await fileToBase64(data.metricFile)
        });
      }
    }
    // Serialize as x-www-form-urlencoded
    const params = Object.keys(payload)
      .map(key => {
        if (Array.isArray(payload[key])) {
          return payload[key].map((v, i) => `${encodeURIComponent(key + '_' + i)}=${encodeURIComponent(JSON.stringify(v))}`).join('&');
        } else {
          return `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`;
        }
      })
      .join('&');
    // Send via XMLHttpRequest (non-blocking)
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://script.google.com/macros/s/AKfycbz8y1o1WKo1c08XS0qT6VcqK_aIZ_laPr0jV8MzYEF1rLxCyN95y6S7tD-ogc4BAtSxHw/exec');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          setPendingUploads(prev => Math.max(prev - 1, 0));
        }
      };
      xhr.send(params);
    } catch (e) {
      setPendingUploads(prev => Math.max(prev - 1, 0));
    }
  };
  const [showConfirmation, setShowConfirmation] = useState(false);
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
    images: File[];
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
    images: [],
    projectFile: null,
    metricFile: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingUploads, setPendingUploads] = useState(0);
  const [showFileInputs, setShowFileInputs] = useState(false);
  const [sessionId, setSessionId] = useState(uuidv4());

  const handleInputChange = (field: string, value: string | File | FileList | null) => {
    if (field === 'images') {
      const files = value instanceof FileList ? Array.from(value) : [];
      if (files.length > 0) {
        setFormData(prev => ({ ...prev, images: files }));
        // Immediately upload images when selected
        sendStepData(1, {
          projectType: formData.projectType,
          projectDetails: formData.projectDetails,
          address: formData.address,
          images: files,
        });
      }
      // If no files selected, do not update state (preserve previous images)
    } else if (field === 'projectFile') {
      const file = value instanceof File ? value : null;
      if (file) {
        setFormData(prev => ({ ...prev, projectFile: file }));
        sendStepData(2, {
          ...formData,
          projectFile: file,
        });
      }
      // If no file selected, do not update state (preserve previous projectFile)
    } else if (field === 'metricFile') {
      const file = value instanceof File ? value : null;
      if (file) {
        setFormData(prev => ({ ...prev, metricFile: file }));
        sendStepData(2, {
          ...formData,
          metricFile: file,
        });
      }
      // If no file selected, do not update state (preserve previous metricFile)
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleRemoveImage = (idx) => {
    setFormData(prev => {
      const newImages = prev.images.filter((_, i) => i !== idx);
      // Immediately update backend after removal
      sendStepData(1, {
        projectType: prev.projectType,
        projectDetails: prev.projectDetails,
        address: prev.address,
        images: newImages,
      });
      return { ...prev, images: newImages };
    });
  };

  const handleNext = () => {
    if (isStepValid()) {
      // On step 1, send step 1 data (projectType, projectDetails, address, images)
      if (currentStep === 1) {
        sendStepData(1, {
          projectType: formData.projectType,
          projectDetails: formData.projectDetails,
          address: formData.address,
          images: formData.images || [],
        });
      }
      // On step 2, send all data
      if (currentStep === 2) {
        sendStepData(2, formData);
      }
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
    setShowConfirmation(true);
    // Wait until all uploads are finished before closing confirmation
    const waitForUploads = async () => {
      while (pendingUploads > 0) {
        await new Promise(res => setTimeout(res, 200));
      }
    };
    await waitForUploads();
    setTimeout(() => {
      setShowConfirmation(false);
      closeModal();
      setFormData({
        projectType: '',
        projectDetails: '',
        address: '',
        name: '',
        phone: '',
        email: '',
        message: '',
        images: [],
        projectFile: null,
        metricFile: null
      });
      setCurrentStep(1);
      setIsSubmitting(false);
      setSessionId(uuidv4()); // Reset sessionId for new form
    }, 1200); // Show confirmation for at least 1.2s after uploads
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
                  {/* @ts-ignore */}
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
                   // @ts-ignore
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
              // @ts-ignore
                placeholder={content.quote.form.description_placeholder}
                value={formData.projectDetails}
                onChange={(e) => handleInputChange('projectDetails', e.target.value)}
                className="bg-white border-primary/30 text-neutral-900 placeholder:text-neutral-500 min-h-[100px]"
              />
            </div>
            {/* Improved file upload UX for mobile */}
            <div className="block md:hidden">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-primary/30 text-primary mb-2"
                onClick={() => setShowFileInputs((v) => !v)}
              >
                <Image className="h-5 w-5" />
                Allega documenti
              </Button>
              {showFileInputs && (
                <div className="grid grid-cols-1 gap-4 mt-2">
                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Carica immagini</label>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = e.target.files ? Array.from(e.target.files) : [];
                        if (files.length > 0) {
                          setFormData(prev => {
                            const newImages = [...files, ...prev.images];
                            // Immediately upload new images (all, with new ones on top)
                            sendStepData(1, {
                              projectType: prev.projectType,
                              projectDetails: prev.projectDetails,
                              address: prev.address,
                              images: newImages,
                            });
                            return { ...prev, images: newImages };
                          });
                        }
                      }}
                      className="bg-white border-primary/30 text-neutral-900 placeholder:text-neutral-500"
                    />
                    {/* Show selected images */}
                    {formData.images && formData.images.length > 0 && (
                      <ul className="mt-2 text-xs text-neutral-700">
                        {formData.images.map((file, idx) => (
                          <li key={idx} className="flex items-center justify-between gap-2">
                            <span>{file.name}</span>
                            <button type="button" onClick={() => handleRemoveImage(idx)} className="ml-2 p-1 text-red-500 hover:text-red-700">
                              <X className="h-3 w-3" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Carica il progetto</label>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.zip,.rar"
                      onChange={(e) => {
                        const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                        if (file) {
                          setFormData(prev => ({ ...prev, projectFile: file }));
                          sendStepData(2, {
                            ...formData,
                            projectFile: file,
                          });
                        }
                      }}
                      className="bg-white border-primary/30 text-neutral-900 placeholder:text-neutral-500"
                    />
                    {formData.projectFile && (
                      <div className="mt-2 text-xs text-neutral-700">{formData.projectFile.name}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Carica il computo</label>
                    <Input
                      type="file"
                      accept=".pdf,.xls,.xlsx,.csv,.zip,.rar"
                      onChange={(e) => {
                        const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                        if (file) {
                          setFormData(prev => ({ ...prev, metricFile: file }));
                          sendStepData(2, {
                            ...formData,
                            metricFile: file,
                          });
                        }
                      }}
                      className="bg-white border-primary/30 text-neutral-900 placeholder:text-neutral-500"
                    />
                    {formData.metricFile && (
                      <div className="mt-2 text-xs text-neutral-700">{formData.metricFile.name}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* Desktop: show file inputs as before */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Carica immagini</label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files ? Array.from(e.target.files) : [];
                    if (files.length > 0) {
                      setFormData(prev => {
                        const newImages = [...files, ...prev.images];
                        sendStepData(1, {
                          projectType: prev.projectType,
                          projectDetails: prev.projectDetails,
                          address: prev.address,
                          images: newImages,
                        });
                        return { ...prev, images: newImages };
                      });
                    }
                  }}
                  className="bg-white border-primary/30 text-neutral-900 placeholder:text-neutral-500"
                />
                {formData.images && formData.images.length > 0 && (
                  <ul className="mt-2 text-xs text-neutral-700">
                    {formData.images.map((file, idx) => (
                      <li key={idx} className="flex items-center justify-between gap-2">
                        <span>{file.name}</span>
                        <button type="button" onClick={() => handleRemoveImage(idx)} className="ml-2 p-1 text-red-500 hover:text-red-700">
                          <X className="h-3 w-3" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Carica il progetto</label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx,.zip,.rar"
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                    if (file) {
                      setFormData(prev => ({ ...prev, projectFile: file }));
                      sendStepData(2, {
                        ...formData,
                        projectFile: file,
                      });
                    }
                  }}
                  className="bg-white border-primary/30 text-neutral-900 placeholder:text-neutral-500"
                />
                {formData.projectFile && (
                  <div className="mt-2 text-xs text-neutral-700">{formData.projectFile.name}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Carica il computo</label>
                <Input
                  type="file"
                  accept=".pdf,.xls,.xlsx,.csv,.zip,.rar"
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                    if (file) {
                      setFormData(prev => ({ ...prev, metricFile: file }));
                      sendStepData(2, {
                        ...formData,
                        metricFile: file,
                      });
                    }
                  }}
                  className="bg-white border-primary/30 text-neutral-900 placeholder:text-neutral-500"
                />
                {formData.metricFile && (
                  <div className="mt-2 text-xs text-neutral-700">{formData.metricFile.name}</div>
                )}
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
            <div className="flex items-center justify-center gap-3">
              <FileText className="h-7 w-7 text-primary drop-shadow-lg" />
              <h3 className="text-xl font-medium text-blue-900 m-0">{content.quote.form.summary.title}</h3>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-left text-blue-900 space-y-2">
              <p className="text-blue-900"><strong>{content.quote.form.summary.project}:</strong> {formData.projectType}</p>
              <p className="text-blue-900"><strong>{content.quote.form.summary.address}:</strong> {formData.address}</p>
              <p className="text-blue-900"><strong>{content.quote.form.summary.contact}:</strong> {formData.name} - {formData.phone}</p>
              {(formData.images && formData.images.length > 0) && (
                <div className="mt-2">
                  <span className="font-semibold">Immagini allegate:</span>
                  <ul className="list-disc list-inside text-sm mt-1">
                    {formData.images.map((file, idx) => (
                      <li key={idx}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              {formData.projectFile && (
                <div className="mt-2">
                  <span className="font-semibold">Progetto allegato:</span>
                  <span className="ml-2 text-sm">{formData.projectFile.name}</span>
                </div>
              )}
              {formData.metricFile && (
                <div className="mt-2">
                  <span className="font-semibold">Computo allegato:</span>
                  <span className="ml-2 text-sm">{formData.metricFile.name}</span>
                </div>
              )}
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
      {showConfirmation ? (
        <div className="flex flex-col items-center justify-center py-16">
          <CheckCircle className="h-20 w-20 text-green-500 mb-4" />
          <h3 className="text-2xl font-semibold text-primary mb-2">{content.quote.form.toast.successTitle}</h3>
          <p className="text-lg text-primary/80 text-center max-w-md">{content.quote.form.toast.successDescription}</p>
          <p className="text-base text-primary/70 mt-4">Attendere prego, verrai reindirizzato...</p>
        </div>
      ) : (
        <>
          <CardHeader className="pb-4">
            <div className="flex items-center">
              <CardTitle className="text-lg font-medium text-primary">{content.quote.title}</CardTitle>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-primary/70">
                <span className="ml-auto text-right">{content.quote.form[`step${currentStep}`]}</span>
              </div>
              <Progress value={progress} className="h-2 bg-primary/20" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-neutral-900">{renderStep()}</div>
            <div className="flex justify-between mt-6">
              {/* Back button, only show if not on first step */}
              {currentStep > 1 && (
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  className="bg-transparent border-primary/30 text-primary hover:bg-primary/10"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Indietro
                </Button>
              )}
              <div className="ml-auto">
                {currentStep < 3 ? (
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
                        <span className="inline-block mr-2 align-middle">
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin block"></span>
                        </span>
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
        </>
      )}
    </Card>
  );
};

export default InlineQuoteForm;
