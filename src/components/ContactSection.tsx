import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.3
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return <section ref={sectionRef} className="py-12 md:py-20 bg-accent relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/20" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/20" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-white/30" />
            <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-white/70">
              Get In Touch
            </span>
            <div className="w-16 h-px bg-white/30" />
          </div>
          
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white leading-tight mb-6">
            Want to see what we can do
            <span className="block text-white/90">for your business?</span>
          </h2>
          
          <Link to="/contact">
            <Button variant="outline" className="font-body text-sm px-6 py-3 uppercase tracking-wider group border-white/30 bg-white text-black hover:bg-white/90">
              <Send className="w-4 h-4 mr-2" />
              Enquire Now
              <div className="w-4 h-px bg-current ml-3 group-hover:w-8 transition-all duration-300" />
            </Button>
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Contact Info */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-start">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4 flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-body text-sm font-light uppercase tracking-wider text-white/70 mb-1">Call Us</div>
                <a 
                  href="tel:02086536066" 
                  className="text-white font-body leading-relaxed hover:text-white/80 transition-colors cursor-pointer"
                >
                  020 8653 6066
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4 flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-body text-sm font-light uppercase tracking-wider text-white/70 mb-1">Email Us</div>
                <a 
                  href="mailto:enquiry@partridgelinenhire.co.uk"
                  className="text-white font-body leading-relaxed hover:text-white/80 transition-colors cursor-pointer text-left"
                >
                  enquiry@partridgelinenhire.co.uk
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4 flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-body text-sm font-light uppercase tracking-wider text-white/70 mb-1">Visit Us</div>
                <div className="text-white font-body leading-relaxed">1-5 The Drive, Thornton Heath CR7 8LB</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4 flex-shrink-0">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-body text-sm font-light uppercase tracking-wider text-white/70 mb-1">Hours</div>
                <div className="text-white font-body leading-relaxed">Mon-Fri: 7AM-8PM, Sat: 9AM-3PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;