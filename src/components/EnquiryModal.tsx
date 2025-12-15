import { useState, useEffect } from 'react';
import { X, Copy, Check, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { openMailto } from '@/lib/openMailto';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

const EnquiryModal = ({ isOpen, onClose, productName }: EnquiryModalProps) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(productName ? `I would like to enquire about: ${productName}` : '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  // Update message when productName changes
  useEffect(() => {
    if (productName) {
      setMessage(`I would like to enquire about: ${productName}`);
    }
  }, [productName]);

  const emailAddress = 'enquiry@partridgelinenhire.co.uk';
  const phoneNumberDisplay = '020 8653 6066';
  const phoneNumberTel = '02086536066';

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Phone validation (optional, but validate format if provided)
    if (phone.trim() && !/^[\d\s+()-]+$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Email validation (required)
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Message validation (required)
    if (!message.trim()) {
      newErrors.message = 'Message is required';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Open email client
    const subject = `Enquiry from ${name || 'Website'}`;
    const body =
      `Name: ${name || 'Not provided'}\n` +
      `Company: ${company || 'Not provided'}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`;

    console.log('[contact] enquiry modal submit');
    openMailto({ to: emailAddress, subject, body });

    toast({
      title: "Opening email client",
      description: "Your default email client should open with the enquiry details.",
    });

    // Reset form and close
    setTimeout(() => {
      setName('');
      setCompany('');
      setPhone('');
      setEmail('');
      setMessage('');
      setErrors({});
      onClose();
    }, 1000);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setIsCopied(true);
      toast({
        title: "Email copied!",
        description: "The email address has been copied to your clipboard.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the email manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-background border border-border rounded-lg max-w-2xl w-full my-8 flex flex-col max-h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
          <div>
            <h2 className="text-2xl font-display text-foreground">Send Enquiry</h2>
            <p className="text-foreground/60 font-body text-sm mt-1">
              Fill in the form below or{' '}
              <button
                onClick={handleCopyEmail}
                className="text-accent hover:underline inline-flex items-center gap-1"
              >
                copy our email
                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1">
          <div className="space-y-4">
            {/* Name (Optional) */}
            <div>
              <Label htmlFor="name" className="text-foreground">
                Name <span className="text-foreground/40 text-sm">(Optional)</span>
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-1"
              />
            </div>

            {/* Company (Optional) */}
            <div>
              <Label htmlFor="company" className="text-foreground">
                Company <span className="text-foreground/40 text-sm">(Optional)</span>
              </Label>
              <Input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your company"
                className="mt-1"
              />
            </div>

            {/* Phone (Optional) */}
            <div>
              <Label htmlFor="phone" className="text-foreground">
                Phone Number <span className="text-foreground/40 text-sm">(Optional)</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) {
                    setErrors({ ...errors, phone: '' });
                  }
                }}
                placeholder="Your phone number"
                className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Email (Required) */}
            <div>
              <Label htmlFor="email" className="text-foreground">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: '' });
                  }
                }}
                placeholder="your.email@example.com"
                className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Message (Required) */}
            <div>
              <Label htmlFor="message" className="text-foreground">
                Message <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) {
                    setErrors({ ...errors, message: '' });
                  }
                }}
                placeholder="Tell us about your enquiry..."
                rows={5}
                className={`mt-1 ${errors.message ? 'border-red-500' : ''}`}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" variant="outline" asChild>
              <a href={`tel:${phoneNumberTel}`}>
                <Phone className="w-4 h-4 mr-2" />
                Call
              </a>
            </Button>
            <Button type="submit">Send Enquiry</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
