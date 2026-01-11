import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import laundryFacility from '@/assets/laundry-facility.png';
const CompactAboutSection = () => {
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
  return <section ref={sectionRef} className="compact-about-section py-12 md:py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-foreground/10" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-foreground/10" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-px bg-accent" />
                <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-foreground/60">
                  Family Heritage
                </span>
              </div>
              
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-foreground leading-tight">
                Three Generations of
                <br />
                <span className="text-accent">Linen Excellence</span>
              </h2>
              
              <p className="text-foreground/70 font-body leading-relaxed text-lg">We started as a small family business back in 1993. Today, three generations later, we're still doing what we do best—keeping London's businesses looking sharp with premium linen that just works.</p>
            </div>
          </div>
          
          {/* Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <img src={laundryFacility} alt="Partridge Linen industrial laundry facility" className="w-full h-full object-cover brightness-[1.35] contrast-105" />
              
              {/* Floating accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default CompactAboutSection;