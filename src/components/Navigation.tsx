
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ClipboardList, Phone, ChevronDown, Mail, MapPin, Utensils, Building2, ChefHat, PartyPopper } from 'lucide-react';
import { useEnquiry } from '@/contexts/EnquiryContext';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { getTotalItems } = useEnquiry();
  const navigate = useNavigate();

  let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

  const handleMouseEnter = (dropdown: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      setOpenDropdown(dropdown);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: 'Restaurant', href: '/restaurant', icon: Utensils },
    { name: 'Hotel Linens', href: '/hotel-linens', icon: Building2 },
    { name: 'Kitchen', href: '/kitchen', icon: ChefHat },
    { name: 'Corporate Events', href: '/corporate-events', icon: PartyPopper },
  ];

  const handleContactScroll = (sectionId: string) => {
    navigate('/contact');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-xl border-b border-white/10 shadow-[0_1px_10px_rgba(0,0,0,0.1)] ${isScrolled ? 'bg-black/50' : 'bg-black'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20 md:h-24 gap-2 md:gap-4 lg:gap-8">
          {/* Logo */}
          <Link to="/" className={`font-display text-lg md:text-xl font-light flex items-center hover:opacity-80 transition-all duration-300 tracking-wide text-white flex-shrink-0 mr-2 md:mr-5 lg:mr-8`}>
            <img 
              src="/lovable-uploads/1fefad8d-4032-4bd1-8208-2b048542b86c.png" 
              alt="Partridge Logo" 
              className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-4 transition-all duration-300 filter brightness-0 invert opacity-90"
            />
            Partridge<span className="font-body ml-1 md:ml-2 text-xs md:text-sm font-light uppercase tracking-[0.15em] text-white/60">Linen</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-8 flex-grow justify-center">
            {/* Home with dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('home')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/"
                className="font-body text-sm tracking-wide font-light text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-1 relative group"
              >
                <span className="relative">
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full bg-white" />
                </span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === 'home' ? 'rotate-180' : ''}`} />
              </Link>
              {openDropdown === 'home' && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-56 bg-black/95 backdrop-blur-xl border border-white/10 shadow-xl rounded-md p-1 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
                    <div className="px-2 py-1.5 text-xs font-medium text-white/50 uppercase tracking-wider">Services</div>
                    {services.map((service) => (
                      <Link 
                        key={service.name} 
                        to={service.href} 
                        className="flex items-center gap-3 px-2 py-1.5 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-sm cursor-pointer transition-colors"
                      >
                        <service.icon className="w-4 h-4 text-white/60" />
                        <span>{service.name}</span>
                      </Link>
                    ))}
                    <div className="h-px bg-white/10 my-1 -mx-1" />
                    <Link 
                      to="/#about" 
                      className="block px-2 py-1.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-sm cursor-pointer transition-colors"
                    >
                      About Us
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Event Hire with dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('events')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/events"
                className="font-body text-sm tracking-wide font-semibold text-[#DAA520] hover:text-[#B8860B] transition-colors duration-300 flex items-center gap-1 relative group"
              >
                <span className="relative">
                  Event Hire
                  <span className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full bg-[#DAA520]" />
                </span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === 'events' ? 'rotate-180' : ''}`} />
              </Link>
              {openDropdown === 'events' && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-48 bg-black/95 backdrop-blur-xl border border-white/10 shadow-xl rounded-md p-1 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
                    <Link 
                      to="/events" 
                      className="flex items-center gap-3 px-2 py-1.5 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-sm cursor-pointer transition-colors"
                    >
                      <ClipboardList className="w-4 h-4 text-white/60" />
                      <span className="font-medium">Order Now</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Contact with dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('contact')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/contact"
                className="font-body text-sm tracking-wide font-light text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-1 relative group"
              >
                <span className="relative">
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full bg-white" />
                </span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === 'contact' ? 'rotate-180' : ''}`} />
              </Link>
              {openDropdown === 'contact' && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-48 bg-black/95 backdrop-blur-xl border border-white/10 shadow-xl rounded-md p-1 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
                    <button 
                      onClick={() => { setOpenDropdown(null); handleContactScroll('contact-email'); }}
                      className="flex items-center gap-3 px-2 py-1.5 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-sm cursor-pointer transition-colors w-full text-left"
                    >
                      <Mail className="w-4 h-4 text-white/60" />
                      <span>Email</span>
                    </button>
                    <button 
                      onClick={() => { setOpenDropdown(null); handleContactScroll('contact-phone'); }}
                      className="flex items-center gap-3 px-2 py-1.5 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-sm cursor-pointer transition-colors w-full text-left"
                    >
                      <Phone className="w-4 h-4 text-white/60" />
                      <span>Call</span>
                    </button>
                    <button 
                      onClick={() => { setOpenDropdown(null); handleContactScroll('contact-address'); }}
                      className="flex items-center gap-3 px-2 py-1.5 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-sm cursor-pointer transition-colors w-full text-left"
                    >
                      <MapPin className="w-4 h-4 text-white/60" />
                      <span>Address</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4 lg:gap-10 flex-shrink-0 ml-3 lg:ml-8">
            {/* Enquiry bag */}
            <Link to="/enquiry" className="relative group">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:text-white/80 transition-all duration-300"
              >
                <ClipboardList className="w-5 h-5 transition-transform group-hover:scale-110" />
                {getTotalItems() > 0 && (
                   <span 
                    key={getTotalItems()} 
                    className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-in fade-in zoom-in duration-500"
                  >
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
            
            <a 
              href="tel:02086536066" 
              className="text-white hover:text-white/90 transition-colors duration-300 font-body text-xs md:text-sm lg:text-base font-normal tracking-wide flex items-center gap-1 lg:gap-2 whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              020 8653 6066
            </a>
          </div>

          {/* Mobile Menu Button and Phone */}
          <div className="md:hidden flex items-center gap-4">
            {/* Phone icon - visible on mobile */}
            <a 
              href="tel:02086536066" 
              className="text-white hover:text-white/80 transition-colors duration-300"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 transition-colors text-white hover:text-white/80"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-border/20">
          <div className="px-6 py-6 space-y-4">
            <div>
              <Link
                to="/"
                className="block font-body text-foreground/80 hover:text-foreground transition-colors duration-300 font-light tracking-wide mb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <div className="pl-4 space-y-2 border-l border-border/30">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Services</p>
                {services.map((service) => (
                  <Link
                    key={service.name}
                    to={service.href}
                    className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <service.icon className="w-3 h-3" />
                    {service.name}
                  </Link>
                ))}
                <Link
                  to="/#about"
                  className="block text-sm text-foreground/70 hover:text-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
              </div>
            </div>
            
            <div>
              <Link
                to="/events"
                className="block font-body bg-gradient-to-r from-[#B8860B] to-[#DAA520] bg-clip-text text-transparent hover:from-[#DAA520] hover:to-[#B8860B] transition-colors duration-300 font-semibold tracking-wide mb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Event Hire
              </Link>
              <div className="pl-4 border-l border-border/30">
                <Link
                  to="/events"
                  className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ClipboardList className="w-3 h-3" />
                  Order Now
                </Link>
              </div>
            </div>
            
            <div>
              <Link
                to="/contact"
                className="block font-body text-foreground/80 hover:text-foreground transition-colors duration-300 font-light tracking-wide mb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pl-4 space-y-2 border-l border-border/30">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleContactScroll('contact-email');
                  }}
                  className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  Email
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleContactScroll('contact-phone');
                  }}
                  className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  Call
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleContactScroll('contact-address');
                  }}
                  className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  <MapPin className="w-3 h-3" />
                  Address
                </button>
              </div>
            </div>
            
            {/* Mobile enquiry link */}
            <Link
              to="/enquiry"
              className="flex items-center justify-between font-body text-foreground/80 hover:text-foreground transition-colors duration-300 font-light tracking-wide"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Enquiry</span>
              {getTotalItems() > 0 && (
                <span 
                  key={getTotalItems()} 
                  className="bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2 animate-in fade-in zoom-in duration-500"
                >
                  {getTotalItems()}
                </span>
              )}
            </Link>
            
            <div className="pt-4 border-t border-border/20">
              <a href="tel:02086536066" className="block text-center font-body font-light tracking-wide text-foreground/80 hover:text-foreground transition-colors">
                020 8653 6066
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
