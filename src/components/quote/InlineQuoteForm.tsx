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

  // Only send fields relevant to the current step
  const sendStepData = async (step: number, data: any) => {
  // Add current date and time in dd-mm-yyyy hh:mm (24h) format
  const now = new Date();
  const pad = (n: number) => n < 10 ? '0' + n : n;
  const date = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  let payload: any = { sessionId, date };
    if (step === 1) {
      // Step 1: projectType, projectDetails, address, images, projectFile, metricFile
      payload.projectType = data.projectType;
      payload.projectDetails = data.projectDetails;
      payload.address = data.address;
      // Encode images
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
      // Encode projectFile
      if (data.projectFile instanceof File) {
        payload.projectFile = JSON.stringify({
          name: data.projectFile.name,
          type: data.projectFile.type,
          content: await fileToBase64(data.projectFile)
        });
      }
      // Encode metricFile
      if (data.metricFile instanceof File) {
        payload.metricFile = JSON.stringify({
          name: data.metricFile.name,
          type: data.metricFile.type,
          content: await fileToBase64(data.metricFile)
        });
      }
    } else if (step === 2) {
      // Step 2: name, phone, email, message
      payload.name = data.name;
      payload.phone = data.phone;
      payload.email = data.email;
      payload.message = data.message;
    } else if (step === 3) {
      // Step 3: summary/confirmation, send all fields for final submission
      payload = { ...data, sessionId, date };
      // Encode images
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
      // Encode projectFile
      if (data.projectFile instanceof File) {
        payload.projectFile = JSON.stringify({
          name: data.projectFile.name,
          type: data.projectFile.type,
          content: await fileToBase64(data.projectFile)
        });
      }
      // Encode metricFile
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
    // Send via XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbxOPO6LYky5qqvt5zfgqEIZARmp_QhUjMnUiP3TXQW-M-Paxdn_sDBlEa4OC6BAdnnuqQ/exec');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
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
      setFormData(prev => ({ ...prev, images: files }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleRemoveImage = (idx) => {
    setFormData(prev => {
      const newImages = prev.images.filter((_, i) => i !== idx);
      // Immediately update backend after removal (only send step 1 fields)
      sendStepData(1, {
        projectType: prev.projectType,
        projectDetails: prev.projectDetails,
        address: prev.address,
        images: newImages,
        projectFile: prev.projectFile,
        metricFile: prev.metricFile,
      });
      return { ...prev, images: newImages };
    });
  };

  const handleNext = () => {
    if (isStepValid()) {
      // Only send fields for the current step
      if (currentStep === 1) {
        sendStepData(1, {
          projectType: formData.projectType,
          projectDetails: formData.projectDetails,
          address: formData.address,
          images: formData.images,
          projectFile: formData.projectFile,
          metricFile: formData.metricFile,
        });
      } else if (currentStep === 2) {
        sendStepData(2, {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
        });
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
        await new Promise(res => setTimeout(res, 8000));
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
    }, 10000); // Show confirmation for at least 1.2s after uploads
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

  const renderStep = (compact?: boolean) => {
    switch (currentStep) {
      case 1:
    return (
            <div className="space-y-3 min-h-[260px] md:min-h-[205px]">
            <div className="flex flex-col md:flex-row gap-1">
              <div className="flex-1">
                <label className="block text-sm font-medium text-white mb-1">{content.quote.form.projectType} *</label>
                <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                  <SelectTrigger className="bg-[rgba(255,255,255,0.9)] backdrop-blur-md border-2 border-[#ffaa00] text-black placeholder:text-neutral-500 placeholder:text-sm placeholder:font-medium focus:ring-2 focus:ring-[#ffaa00]">
                  {/* @ts-ignore */}
                    <SelectValue placeholder={content.quote.form.projectType_placeholder} className="placeholder:font-medium" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border">
                    {projectTypes.map((type, index) => (
                      <SelectItem key={index} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-white mb-1">{content.quote.form.address} *</label>
                <Input
                  type="text"
                   // @ts-ignore
                  placeholder={content.quote.form.address_placeholder}
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="bg-[rgba(255, 255, 255, 0.9)] backdrop-blur-md border-2 border-[#ffaa00] text-black placeholder:text-sm placeholder:text-black focus:ring-2 focus:ring-[#ffaa00]"
                />
              </div>
            </div>
            <div className="relative" style={{ marginTop: '4px'}}>
              <span className="absolute left-2 top-2 text-sm font-medium text-black px-1 rounded pointer-events-none z-10">{content.quote.form.description} *</span>
              <Textarea
                // @ts-ignore
                value={formData.projectDetails}
                onChange={(e) => handleInputChange('projectDetails', e.target.value)}
                className="bg-[rgba(255, 255, 255, 0.9)] backdrop-blur-md border-2 border-[#ffaa00] text-black placeholder:text-neutral-700 placeholder:text-xs placeholder:font-medium min-h-[60px] focus:ring-2 focus:ring-[#ffaa00] pt-7"
              />
            </div>
            {/* Unified file upload UX for all devices */}
            <div className='w-full md:flex md:flex-row md:gap-4' style={{ marginTop: '4px'}}>
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-primary/30 text-primary mb-2 md:hidden"
                onClick={() => setShowFileInputs((v) => !v)}
              >
                <Image className="h-5 w-5" />
                Allega documenti (opzionale)
              </Button>

                {/* Show file inputs: visible on desktop, toggled on mobile */}
                <div className={`w-full ${showFileInputs ? 'grid' : 'hidden'} grid-cols-1 gap-2 mt-2 md:grid md:grid-cols-3 md:gap-4 md:mt-0`}> 
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#ffaa00]/20 group-hover:bg-[#ffaa00]/40 transition">
                        <Image className="h-6 w-6 text-[#ffaa00]" />
                      </span>
                      <span className="text-xs font-medium text-[#ffaa00] group-hover:underline">Carica immagini</span>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          const files = e.target.files ? Array.from(e.target.files) : [];
                          if (files.length > 0) {
                            setFormData(prev => {
                              const newImages = [...files, ...prev.images];
                              return { ...prev, images: newImages };
                            });
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                    {/* Show selected images */}
                    {formData.images && formData.images.length > 0 && (
                      <ul className="mt-2 text-xs text-white">
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
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#ffaa00]/20 group-hover:bg-[#ffaa00]/40 transition">
                        <FileText className="h-6 w-6 text-[#ffaa00]" />
                      </span>
                      <span className="text-xs font-medium text-[#ffaa00] group-hover:underline">Carica il progetto</span>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx,.zip,.rar"
                        onChange={(e) => {
                          const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                          setFormData(prev => ({ ...prev, projectFile: file }));
                        }}
                        className="hidden"
                      />
                    </label>
                    {formData.projectFile && (
                      <div className="mt-2 text-xs text-white">{formData.projectFile.name}</div>
                    )}
                  </div>
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#ffaa00]/20 group-hover:bg-[#ffaa00]/40 transition">
                        <Calculator className="h-6 w-6 text-[#ffaa00]" />
                      </span>
                      <span className="text-xs font-medium text-[#ffaa00] group-hover:underline">Carica il computo</span>
                      <Input
                        type="file"
                        accept=".pdf,.xls,.xlsx,.csv,.zip,.rar"
                        onChange={(e) => {
                          const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                          setFormData(prev => ({ ...prev, metricFile: file }));
                        }}
                        className="hidden"
                      />
                    </label>
                    {formData.metricFile && (
                      <div className="mt-2 text-xs text-white">{formData.metricFile.name}</div>
                    )}
                  </div>
                </div>
              
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col h-full justify-between min-h-[260px] md:min-h-[205px]">
            <div className="space-y-4">
              <div className="relative mt-2">
                <span className="absolute left-2 top-2 text-sm font-medium text-black px-1 rounded pointer-events-none z-10 bg-white">{content.quote.form.name} *</span>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-white border-primary/30 text-black pt-7 h-14"
                />
              </div>
              <div className="flex flex-row gap-2 items-start align-top" style={{ marginTop: '4px'}}>
                <div className="flex-1 relative">
                  <span className="absolute left-2 top-2 text-sm font-medium text-black px-1 rounded pointer-events-none z-10 bg-white">{content.quote.form.phone} *</span>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-white border-primary/30 text-black pt-7 h-14"
                  />
                </div>
                <div className="flex-1 relative">
                  <span className="absolute left-2 top-2 text-sm font-medium text-black px-1 rounded pointer-events-none z-10 bg-white">{content.quote.form.email} *</span>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-white border-primary/30 text-black pt-7 h-14"
                  />
                </div>
              </div>
              <div className="relative" style={{ marginTop: '4px'}}>
                <span className="absolute left-2 top-2 text-sm font-medium text-black px-1 rounded pointer-events-none z-10 bg-white">{content.quote.form.message || 'Messaggio (Opzionale)'}</span>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="bg-white border-primary/30 text-black pt-7"
                />
              </div>
            </div>
            {/* Buttons will remain at the bottom as in step 3 */}
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col h-full justify-between min-h-[260px] md:min-h-[205px]">
            <div className="flex flex-col gap-3 mb-2">
              <div className="flex items-start gap-3">
                <FileText className="h-7 w-7 text-primary text-white drop-shadow-lg mt-1" />
                <h3 className="text-xl font-medium text-white m-0 text-left">{content.quote.form.summary.title}</h3>
              </div>
              <div className="bg-white rounded-lg p-4 text-left text-blue-900 space-y-2">
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
            {/* Buttons remain at the bottom as before */}
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
  <Card className="w-full max-w-none p-0 backdrop-blur-md bg-[rgba(255, 174, 0, 0.7)] border-4 border-[#ffaa00] shadow-lg min-h-[260px] md:min-h-[205px] flex flex-col justify-between">
      {showConfirmation ? (
  <div className="flex flex-1 items-center justify-center min-h-[260px] w-full bg-[rgba(255,255,255,0.8)] backdrop-blur-lg">
          <div className="flex flex-col items-center justify-center w-full">
            <CheckCircle className="h-16 w-16 text-green-500 mb-2" />
            <h3 className="text-xl font-semibold text-primary mb-1">{content.quote.form.toast.successTitle}</h3>
            <p className="text-base text-primary/80 text-center max-w-md">{content.quote.form.toast.successDescription}</p>
            <p className="text-sm text-primary/70 mt-2">Attendere prego, verrai reindirizzato...</p>
          </div>
        </div>
      ) : (
        <>
          <CardHeader className="pb-2 pt-3 px-4">
            <div className="flex items-center">
              <CardTitle className="text-base font-medium font-bold text-xl text-left w-full" style={{ color: '#ffaa00' }}>{content.quote.title}</CardTitle>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-white text-medium">
                <span className="ml-auto text-right font-bold text-md text-left w-full">{content.quote.form[`step${currentStep}`]}</span>
              </div>
              <Progress value={progress} className="h-1.5 bg-[#ffaa00]/30" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-3 pt-1">
            <div className="text-white">{renderStep(true)}</div>
            <div className="flex flex-row justify-center items-center justify-center mt-2 gap-2">
              {/* Back button, only show if not on first step */}
              {currentStep > 1 && (
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-primary/10 px-3 py-1.5 text-sm"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Indietro
                </Button>
              )}
              <div>
                {currentStep < 3 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-1.5 text-sm"
                  >
                    {content.quote.form.next || 'Avanti'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-1.5 text-sm"
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
