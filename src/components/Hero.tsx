import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Users, ArrowRight, Home, FileCheck } from 'lucide-react';
import heroImage from '@/assets/hero-main-new.png';
const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleElements, setVisibleElements] = useState<number[]>([]);
  useEffect(() => {
    // Loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (!isLoading) {
      // Staggered appearance of elements
      const delays = [200, 400, 600, 800, 1000];
      delays.forEach((delay, index) => {
        setTimeout(() => {
          setVisibleElements(prev => [...prev, index]);
        }, delay);
      });
    }
  }, [isLoading]);
  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground/40 font-body text-sm font-light uppercase tracking-[0.2em]">
          Loading...
        </div>
      </div>;
  }
  return <section className="relative min-h-[80vh] bg-background overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="h-full">
          <img src={heroImage} alt="Elegant wedding venue with stage and premium silver damask linens" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-20 min-h-[80vh] flex items-end pb-12 md:pb-16 lg:pb-20 pt-32 md:pt-48 lg:pt-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
          
          {/* Main Content */}
          <div className="max-w-3xl mb-6">
            
            {/* Main Headline */}
            <div className="mb-6" style={{
            opacity: visibleElements.includes(0) ? 1 : 0,
            transform: visibleElements.includes(0) ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.7s ease-out'
          }}>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
                We handle the laundry,
                <br />
                <span className="text-white/85">you run the show</span>
              </h1>
            </div>

            {/* Description */}
            <div className="mb-6" style={{
            opacity: visibleElements.includes(1) ? 1 : 0,
            transform: visibleElements.includes(1) ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.7s ease-out',
            transitionDelay: '200ms'
          }}>
              <p className="text-white/85 font-body leading-relaxed text-sm sm:text-base md:text-lg max-w-xl">We've been handling linen for London's best restaurants, hotels, and events for over 30 years. Fresh, clean, and delivered on time.</p>
            </div>

            {/* Badges */}
            <div className="mb-0" style={{
            opacity: visibleElements.includes(2) ? 1 : 0,
            transform: visibleElements.includes(2) ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.7s ease-out',
            transitionDelay: '400ms'
          }}>
              <div className="flex flex-col gap-2 md:gap-3 items-start">
                <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                  {/* 30+ Years Badge */}
                  <button
                    onClick={() => {
                      const servicesSection = document.getElementById('services');
                      servicesSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group relative inline-flex items-center gap-2 md:gap-3 bg-accent rounded-lg px-3 md:px-5 h-10 md:h-12 w-auto md:w-[220px] overflow-hidden transition-all duration-500 hover:bg-accent/90 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-center gap-2 md:gap-3 md:group-hover:opacity-0 md:group-hover:scale-90 transition-all duration-500">
                      <div className="text-white font-display text-base md:text-xl font-light">
                        30+
                      </div>
                      <div className="text-white font-display text-xs md:text-sm font-light whitespace-nowrap">
                        Years serving London
                      </div>
                    </div>
                    <div className="absolute inset-0 hidden md:flex items-center justify-center gap-2 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                      <Sparkles className="w-4 h-4 text-white" />
                      <span className="text-white font-display text-sm font-light tracking-wide">Our Services</span>
                    </div>
                  </button>
                  
                  {/* Local & Family Run Badge */}
                  <button
                    onClick={() => {
                      const aboutSection = document.querySelector('.compact-about-section');
                      aboutSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group relative inline-flex items-center gap-2 md:gap-3 bg-accent rounded-lg px-3 md:px-5 h-10 md:h-12 w-auto md:w-[220px] overflow-hidden transition-all duration-500 hover:bg-accent/90 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-center gap-2 md:gap-3 md:group-hover:opacity-0 md:group-hover:scale-90 transition-all duration-500">
                      <Home className="w-4 md:w-5 h-4 md:h-5 text-white flex-shrink-0" />
                      <div className="text-white font-display text-xs md:text-sm font-light whitespace-nowrap">
                        Local & family run
                      </div>
                    </div>
                    <div className="absolute inset-0 hidden md:flex items-center justify-center gap-2 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                      <Users className="w-4 h-4 text-white" />
                      <span className="text-white font-display text-sm font-light tracking-wide">About Us</span>
                    </div>
                  </button>
                </div>
                
                {/* No Contract Required Badge */}
                <button
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group relative inline-flex items-center gap-2 md:gap-3 bg-accent rounded-lg px-3 md:px-5 h-10 md:h-12 w-auto md:w-[220px] overflow-hidden transition-all duration-500 hover:bg-accent/90 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center gap-2 md:gap-3 md:group-hover:opacity-0 md:group-hover:scale-90 transition-all duration-500">
                    <FileCheck className="w-4 md:w-5 h-4 md:h-5 text-white flex-shrink-0" />
                    <div className="text-white font-display text-xs md:text-sm font-light whitespace-nowrap">
                      No contract required
                    </div>
                  </div>
                  <div className="absolute inset-0 hidden md:flex items-center justify-center gap-2 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                    <ArrowRight className="w-4 h-4 text-white" />
                    <span className="text-white font-display text-sm font-light tracking-wide">Find out more</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;