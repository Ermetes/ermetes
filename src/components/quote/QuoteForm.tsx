import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Phone, Mail, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const QuoteForm = () => {
  const { content } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    projectType: '',
    description: '',
    budget: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    attachments: null as FileList | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally send the data to your backend
    console.log('Form submitted:', formData);
    
    toast({
      title: "Richiesta inviata con successo!",
      description: "Ti contatteremo entro 24 ore per fornirti un preventivo dettagliato.",
    });
    
    // Reset form
    setFormData({
      projectType: '',
      description: '',
      budget: '',
      timeline: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      attachments: null
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, attachments: e.target.files }));
  };

  return (
    <section id="quote" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {content.quote.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {content.quote.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-card border border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  Telefono
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Chiamaci direttamente</p>
                <p className="font-semibold text-foreground">+39 0461 123456</p>
                <p className="text-sm text-muted-foreground mt-1">Lun-Ven 8:00-18:00</p>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Scrivici direttamente</p>
                <p className="font-semibold text-foreground">management@ermetes.it</p>
                <p className="text-sm text-muted-foreground mt-1">Risposta entro 24h</p>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                  WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Messaggia su WhatsApp</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://wa.me/393461123456', '_blank')}
                >
                  Apri Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quote Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card border border-border shadow-lg">
              <CardHeader>
                <CardTitle>Modulo Preventivo</CardTitle>
                <CardDescription>
                  Compila tutti i campi per ricevere un preventivo accurato
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Project Type */}
                    <div className="space-y-2">
                      <Label htmlFor="projectType">{content.quote.form.projectType}</Label>
                      <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona il tipo di progetto" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border border-border">
                          {content.quote.form.projectTypeOptions.map((option, index) => (
                            <SelectItem key={index} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Budget */}
                    <div className="space-y-2">
                      <Label htmlFor="budget">{content.quote.form.budget}</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona il budget" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border border-border">
                          {content.quote.form.budgetOptions.map((option, index) => (
                            <SelectItem key={index} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="timeline">{content.quote.form.timeline}</Label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona le tempistiche" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border border-border">
                          {content.quote.form.timelineOptions.map((option, index) => (
                            <SelectItem key={index} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">{content.quote.form.description}</Label>
                    <Textarea
                      id="description"
                      placeholder="Descrivi dettagliatamente il tuo progetto..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{content.quote.form.name}</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">{content.quote.form.email}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">{content.quote.form.phone}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">{content.quote.form.address}</Label>
                      <Input
                        id="address"
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="attachments">{content.quote.form.attachments}</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <input
                        id="attachments"
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Label htmlFor="attachments" className="cursor-pointer">
                        <span className="text-primary hover:text-primary/80">
                          Clicca per caricare file
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          PDF, immagini, documenti (max 10MB)
                        </p>
                      </Label>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3"
                  >
                    {content.quote.form.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;