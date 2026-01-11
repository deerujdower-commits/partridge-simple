import { Clock, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const serviceLinks = [
    { name: 'Restaurant', href: '/restaurant' },
    { name: 'Event Hire', href: '/events' },
    { name: 'Hotel', href: '/hotel-linens' },
    { name: 'Kitchen', href: '/kitchen' }
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-6 gap-8">
          {/* Contact Us - formerly Brand section */}
          <div className="md:col-span-2">
            <a href="/contact" className="font-display font-semibold text-foreground mb-4 block hover:text-primary transition-colors">
              Contact Us
            </a>
            <p className="font-body text-muted-foreground mb-4 max-w-md">
              Partridge Laundry & Linen Hire Ltd
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <a 
                href="tel:02086536066" 
                className="font-body text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                020 8653 6066
              </a>
              <a 
                href="mailto:enquiry@partridgelinenhire.co.uk" 
                className="font-body text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                enquiry@partridgelinenhire.co.uk
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Times & Map side by side */}
          <div className="md:col-span-3 grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Opening Times
              </h3>
              <ul className="space-y-1 mb-4">
                <li className="font-body text-sm text-muted-foreground">Mon - Fri: 8:00am - 5:00pm</li>
                <li className="font-body text-sm text-muted-foreground">Saturday: 9:00am - 1:00pm</li>
                <li className="font-body text-sm text-muted-foreground">Sunday: Closed</li>
              </ul>
              <p className="font-body text-sm text-muted-foreground flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>1-5 The Drive<br />Thornton Heath<br />CR7 8LB</span>
              </p>
            </div>

            {/* Map */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-4">Find Us</h3>
              <div className="rounded-lg overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=1-5+The+Drive,+CR7+8LB,+UK"
                  width="100%"
                  height="150"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Partridge Laundry Location"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-body text-sm text-muted-foreground mb-4 md:mb-0">© 2025 Partridge Laundry & Linen Hire Ltd. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="/privacy-policy" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="/cookie-policy" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Logo at bottom center */}
        <div className="flex justify-center mt-8 pt-8 border-t border-border">
          <img 
            src="/lovable-uploads/1fefad8d-4032-4bd1-8208-2b048542b86c.png" 
            alt="Partridge Logo" 
            className="w-10 h-10 filter brightness-0 contrast-200 hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
