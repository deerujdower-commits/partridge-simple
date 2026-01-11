import { Clock } from 'lucide-react';

const Footer = () => {
  const footerSections = [{
    title: 'Services',
    links: [
      { name: 'Restaurant', href: '/restaurant' },
      { name: 'Event Hire', href: '/events' },
      { name: 'Hotel', href: '/hotel-linens' },
      { name: 'Kitchen', href: '/kitchen' }
    ]
  }, {
    title: 'Company',
    links: [
      { name: 'Contact Us', href: '/contact' },
      { name: '020 8653 6066', href: 'tel:02086536066' },
      { name: 'info@partridgelinen.co.uk', href: 'mailto:info@partridgelinen.co.uk' }
    ]
  }];

  return <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-display text-3xl font-bold text-foreground mb-4">
              Partridge<span className="text-primary"> Linen</span>
            </div>
            <p className="font-body text-muted-foreground mb-4 max-w-md">Premium laundry services. Experience the perfect blend of traditional craftsmanship and modern convenience.</p>
            <p className="font-body text-xs text-muted-foreground/70">
              Partridge Laundry & Linen Hire Ltd
            </p>
          </div>

          {/* Links */}
          {footerSections.map((section, index) => <div key={index}>
              <h3 className="font-display font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>)}

          {/* Opening Times & Map */}
          <div className="md:col-span-2">
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Opening Times
            </h3>
            <ul className="space-y-1 mb-4">
              <li className="font-body text-sm text-muted-foreground">Mon - Fri: 8:00am - 5:00pm</li>
              <li className="font-body text-sm text-muted-foreground">Saturday: 9:00am - 1:00pm</li>
              <li className="font-body text-sm text-muted-foreground">Sunday: Closed</li>
            </ul>
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
    </footer>;
};
export default Footer;
