import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string().trim().min(1, { message: "Phone number is required" }).max(20, { message: "Phone must be less than 20 characters" })
});

const SoftCTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = contactSchema.parse(formData);
      setIsSubmitting(true);

      // Encode data for WhatsApp
      const message = `New enquiry from website:%0A%0AName: ${encodeURIComponent(validatedData.name)}%0AEmail: ${encodeURIComponent(validatedData.email)}%0APhone: ${encodeURIComponent(validatedData.phone)}`;
      const whatsappUrl = `https://wa.me/447949387849?text=${message}`;
      
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Thank you!",
        description: "We'll be in touch shortly.",
      });

      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-secondary/30">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="drams-heading text-3xl md:text-4xl mb-4">
          Interested in finding out more?
        </h2>
        <p className="text-muted-foreground mb-8 font-light">
          Leave your details and we'll get back to you shortly
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-background"
            required
          />
          <Input
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-background"
            required
          />
          <Input
            type="tel"
            placeholder="Your phone number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-background"
            required
          />
          <Button 
            type="submit" 
            variant="gradient" 
            size="lg" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Get in Touch"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SoftCTA;
