import { useEffect, useRef, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Clock, MessageCircle, Calendar, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import heroImage from '@/assets/event-white-round-tables-clean.jpg';
import buildingExterior from '@/assets/building-exterior.webp';
import EnquiryModal from '@/components/EnquiryModal';

const contactMethods = [
  {
    id: 1,
    title: 'Call Us',
    subtitle: 'Speak Directly',
    description: 'Get immediate assistance and answers to all your linen service questions.',
    icon: Phone,
    contact: '020 8653 6066',
    featured: false,
    action: 'call'
  },
  {
    id: 2,
    title: 'Email Us',
    subtitle: 'Quick Response',
    description: 'Send us your requirements and we\'ll respond within 24 hours.',
    icon: Mail,
    contact: 'enquiry@partridgelinenhire.co.uk',
    featured: false,
    action: 'email'
  },
  {
    id: 3,
    title: 'Visit Us',
    subtitle: 'In Person',
    description: 'Tour our facility and meet our team. See our quality standards firsthand.',
    icon: MapPin,
    contact: '1-5 The Drive, Thornton Heath CR7 8LB',
    featured: true,
    action: 'none',
    fullWidth: true
  },
  {
    id: 4,
    title: 'Schedule Pickup',
    subtitle: 'Convenient Service',
    description: 'Book a pickup time that works for your business schedule.',
    icon: Calendar,
    contact: 'Online Booking Available',
    featured: false,
    action: 'none'
  },
  {
    id: 5,
    title: 'Business Hours',
    subtitle: 'Always Available',
    description: 'Extended hours to accommodate the hospitality industry schedule.',
    icon: Clock,
    contact: 'Mon-Fri: 7AM-8PM, Sat: 9AM-3PM',
    featured: false,
    action: 'none'
  },
  {
    id: 6,
    title: 'Live Chat',
    subtitle: 'Instant Help',
    description: 'Connect with our customer service team for immediate assistance.',
    icon: MessageCircle,
    contact: 'Available During Business Hours',
    featured: false,
    action: 'none'
  }
];

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string().trim().min(1, { message: "Phone is required" }).max(20, { message: "Phone must be less than 20 characters" }),
  message: z.string().trim().max(500, { message: "Message must be less than 500 characters" }).optional()
});

const Contact = () => {
  const [visibleMethods, setVisibleMethods] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleMethodClick = (action: string) => {
    console.log('[contact] method click', action);
    if (action === 'call') {
      window.location.href = 'tel:02086536066';
    } else if (action === 'email') {
      setIsEnquiryOpen(true);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = contactSchema.parse(formData);
      
      // Encode data for WhatsApp
      const messageParts = [
        `New Contact Form Submission:`,
        ``,
        `Name: ${validated.name}`,
        `Email: ${validated.email}`,
        `Phone: ${validated.phone}`
      ];
      
      if (validated.message && validated.message.trim()) {
        messageParts.push(`Message: ${validated.message}`);
      }
      
      const message = messageParts.join('\n');
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/442086536066?text=${encodedMessage}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Simulate loading like Drams
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const methodId = parseInt(entry.target.getAttribute('data-method-id') || '0');
            setVisibleMethods(prev => [...prev, methodId]);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (!isLoading) {
      const methods = gridRef.current?.querySelectorAll('.contact-method');
      methods?.forEach(method => observer.observe(method));
    }

    return () => observer.disconnect();
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground/40 font-body text-sm font-light uppercase tracking-[0.2em]">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section with Contact Form and Methods */}
      <section className="relative min-h-[85vh] bg-background overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="h-full">
            <img src={heroImage} alt="Contact Partridge Linen" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-black/80" />
          </div>
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-20 min-h-[85vh] flex items-center pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Side - Contact Form */}
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-light text-white leading-tight mb-3">
                  Get in Touch
                </h1>
                <p className="text-white/85 font-body leading-relaxed text-sm md:text-base mb-6">
                  Leave your details and we'll get back to you shortly
                </p>
                
                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 md:p-6 space-y-3">
                  <div className="space-y-3">
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 h-10 text-sm"
                      placeholder="Your name"
                      required
                      maxLength={100}
                    />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 h-10 text-sm"
                      placeholder="Your email"
                      required
                      maxLength={255}
                    />
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 h-10 text-sm"
                      placeholder="Your phone number"
                      required
                      maxLength={20}
                    />
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 min-h-[70px] resize-none text-sm"
                      placeholder="Message (optional)"
                      maxLength={500}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="gradient"
                    className="w-full h-10 text-sm"
                  >
                    {isSubmitting ? 'Submitting...' : 'Get in Touch'}
                  </Button>
                </form>
              </div>

              {/* Right Side - Contact Methods */}
              <div className="pt-12 md:pt-[52px]">
                <div className="space-y-4">
                  {contactMethods.filter(m => m.id !== 3 && m.id !== 4 && m.id !== 6).map((method) => (
                    <div
                      key={method.id}
                      id={method.id === 1 ? 'contact-phone' : method.id === 2 ? 'contact-email' : undefined}
                      className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 transition-all duration-300 ${
                        method.action !== 'none' ? 'cursor-pointer hover:bg-white/15' : ''
                      }`}
                      onClick={() => handleMethodClick(method.action)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <method.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-display text-base font-light mb-1">
                            {method.title}
                          </h3>
                          <p className="text-white/70 text-xs mb-2">
                            {method.description}
                          </p>
                          <p className="text-white text-sm font-medium">
                            {method.contact}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <main className="py-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Visit Us with Map - Full Width */}
          <div 
            ref={gridRef}
            className="bg-card rounded-2xl overflow-hidden border border-border/20"
          >
            {contactMethods.filter(m => m.id === 3).map((method) => (
              <article
                key={method.id}
                id="contact-address"
                data-method-id={method.id}
                className="p-6"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="text-xs font-light uppercase tracking-wider text-foreground/60 mb-2">
                          {method.subtitle}
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mr-4">
                            <method.icon className="w-6 h-6 text-primary" />
                          </div>
                          <h2 className="font-display text-2xl font-light text-foreground">
                            {method.title}
                          </h2>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4 font-light">
                          {method.description}
                        </p>
                        
                        <div className="text-sm font-semibold text-primary mb-4">
                          <span className="block">1-5 The Drive</span>
                          <span className="block">Thornton Heath</span>
                          <span className="block">CR7 8LB</span>
                        </div>

                        {/* Building Image */}
                        <div className="mt-4">
                          <img 
                            src={buildingExterior} 
                            alt="Partridge Linen building exterior" 
                            className="w-full max-w-md rounded-lg object-cover"
                          />
                          <p className="text-xs text-muted-foreground mt-2">
                            This is what our building looks like when you visit
                          </p>
                        </div>
                      </div>
                      
                      {/* Google Maps on the right */}
                      <div className="flex-1 min-w-[300px]">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2488.0789876543!2d-0.1089!3d51.3989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487608c8a4f5b5b5%3A0x1234567890abcdef!2s1-5%20The%20Drive%2C%20Thornton%20Heath%20CR7%208LB!5e0!3m2!1sen!2suk!4v1234567890"
                          width="100%"
                          height="100%"
                          style={{ border: 0, borderRadius: '12px', minHeight: '250px' }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Partridge Linen Location"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>

          {/* Bottom section like Drams */}
          <div className="mt-8 text-center">
            <p className="drams-text mb-3">
              We look forward to hearing from you
            </p>
            <div className="w-px h-6 bg-foreground/10 mx-auto" />
          </div>
        </div>
      </main>

      <Footer onEmailClick={() => setIsEnquiryOpen(true)} />
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
};

export default Contact;