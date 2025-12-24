import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, Send, X, Grid3x3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import images from collection page
const studioFittedWhiteTablecloth = '/lovable-uploads/cf54b1ce-fef7-4ac1-8bbc-34b126347063.png';
const studioFittedWhiteNapkins = '/lovable-uploads/ba361677-0711-413a-901e-2ef6e8e9905c.png';
const chefJacketNew = '/lovable-uploads/d6d4a833-19ec-475e-bc4c-d85c2ba88188.png';
const chefTrousersNew = '/lovable-uploads/005231c4-59e0-4684-9317-0f2b0a3f6c5a.png';
const towelImage = '/lovable-uploads/92183863-59d1-46cc-b1d8-7cd663c0a9db.png';

const Enquiry = () => {
  const { items, removeItem, updateQuantity, clearEnquiry, getTotalItems } = useEnquiry();
  const { toast } = useToast();
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmitClick = () => {
    setShowFormModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const itemsList = items.map(item => {
      let itemDetails = `- ${item.name} (Qty: ${item.quantity})`;
      if (item.size) itemDetails += ` - Size: ${item.size}`;
      if (item.color) itemDetails += ` - Color: ${item.color}`;
      if (item.hireDate) {
        const startDate = new Date(item.hireDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        const endDate = new Date(new Date(item.hireDate).getTime() + 72 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        itemDetails += ` - Hire: ${startDate} to ${endDate}`;
      }
      return itemDetails;
    }).join('\n');
    const message = `New Enquiry from ${formData.name}\n\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nItems Requested:\n${itemsList}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/442086536066?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Enquiry sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Clear form and enquiry
    clearEnquiry();
    setFormData({ name: '', email: '', phone: '' });
    setShowFormModal(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-12">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="w-16 h-px bg-gradient-to-r from-accent to-accent-blue" />
              <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-foreground/60">
                Your Enquiry
              </span>
              <div className="w-16 h-px bg-gradient-to-l from-accent to-accent-blue" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-light text-foreground tracking-tight mb-6">
              Your basket is empty
            </h1>
            <p className="text-foreground/70 font-body leading-relaxed text-lg mb-8">
              Browse our collection and add items you're interested in
            </p>
            <Link to="/events">
              <Button variant="gradient" className="font-body">
                <Grid3x3 className="w-4 h-4 mr-2" />
                Browse Collection
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-12">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-accent to-accent-blue" />
              <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-foreground/60">
                Your Enquiry
              </span>
            </div>
            
            <div className="flex items-end justify-between">
              <h1 className="font-display text-3xl md:text-4xl font-light text-foreground leading-tight">
                Selected Items
                <span className="block text-accent text-2xl md:text-3xl mt-2">
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                </span>
              </h1>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearEnquiry}
                className="text-destructive border-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>

          {/* Enquiry Items */}
          <div className="space-y-4 mb-8">
            {items.map((item) => {
              // Extract size and color from description
              const sizeMatch = item.description?.match(/Size:\s*([^-]+)/);
              const colorMatch = item.description?.match(/Color:\s*([^-]+)/);
              const size = item.size || sizeMatch?.[1]?.trim();
              const color = item.color || colorMatch?.[1]?.trim();
              
              return (
                <div 
                  key={item.id} 
                  className="bg-secondary/30 border border-border rounded-lg p-4 md:p-6 hover:border-accent/50 transition-colors duration-300"
                >
                  <div className="flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0" 
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg md:text-xl text-foreground mb-2">{item.name}</h3>
                      
                      <div className="space-y-1 mb-3">
                        {size && (
                          <p className="text-sm text-foreground/70 font-body">
                            <span className="font-medium">Size:</span> {size}
                          </p>
                        )}
                        {color && (
                          <p className="text-sm text-foreground/70 font-body">
                            <span className="font-medium">Color:</span> {color}
                          </p>
                        )}
                        {item.hireDate && (
                          <p className="text-sm text-foreground/70 font-body">
                            <span className="font-medium">Hire Date:</span> {new Date(item.hireDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} - {new Date(new Date(item.hireDate).getTime() + 72 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        
                        <span className="w-10 text-center font-body font-medium text-foreground">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Enquiry Button */}
          <div className="bg-gradient-to-r from-accent to-accent-blue rounded-lg p-8 shadow-lg">
            <div className="text-center">
              <h3 className="font-display text-2xl md:text-3xl font-light text-white mb-3">
                Got everything you need?
              </h3>
              <p className="text-white/90 font-body mb-6 max-w-md mx-auto">
                Send us your list and we'll check availability for your dates. We'll get back to you within 24 hours.
              </p>
              <Button 
                onClick={handleSubmitClick}
                className="bg-white text-primary hover:bg-white/90 font-body px-8 py-6 text-lg"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Enquiry
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background border border-border rounded-lg max-w-md w-full animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-xl font-display text-foreground">Just a few details</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowFormModal(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-body text-foreground/80 mb-2">
                  Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="font-body"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-body text-foreground/80 mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="font-body"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-body text-foreground/80 mb-2">
                  Phone Number *
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Your phone number"
                  required
                  className="font-body"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowFormModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Enquiry
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Enquiry;
