import { useEffect, useRef, useState } from 'react';
import { ChefHat, Utensils, Building2, ArrowRight, Sparkles, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import restaurantWhiteRound from '@/assets/restaurant-white-round-setting.jpg';
import restaurantBlackSetting from '@/assets/restaurant-black-tablecloth-setting.jpg';
import restaurantWhiteMinimal from '@/assets/restaurant-white-table-minimal.jpg';
import kitchenClothHerringboneGreen from '@/assets/kitchen-cloth-herringbone-green.jpeg';
import apronModel from '@/assets/apron-model.jpg';
import chefJacketWhiteModel from '@/assets/chef-jacket-white-model.jpg';
import eventGoldDamaskTables from '@/assets/event-gold-damask-tables.jpg';
import eventSilverDamaskTables from '@/assets/event-silver-damask-tables.jpg';
import eventWhiteRoundTablesClean from '@/assets/event-white-round-tables-clean.jpg';
import hotelBedClean from '@/assets/hotel-bed-clean.jpg';
import hotelLinens1 from '@/assets/hotel-linens-1.jpg';
import towelsStackWhite from '@/assets/towels-stack-white.jpg';

const services = [{
  title: 'Restaurant',
  description: 'Premium tablecloths and napkins for fine dining.',
  images: [restaurantWhiteRound, restaurantBlackSetting, restaurantWhiteMinimal],
  icon: Utensils,
  slug: 'restaurant',
  colors: [{
    name: 'White',
    hex: '#FFFFFF'
  }, {
    name: 'Black',
    hex: '#000000'
  }, {
    name: 'Ivory',
    hex: '#F5F5DC'
  }]
}, {
  title: 'Event Hire',
  description: 'Elegant damask for weddings and corporate events.',
  images: [eventGoldDamaskTables, eventSilverDamaskTables, eventWhiteRoundTablesClean],
  icon: Sparkles,
  slug: 'events',
  colors: [{
    name: 'Gold',
    hex: '#D4AF37'
  }, {
    name: 'Silver',
    hex: '#C0C0C0'
  }, {
    name: 'White',
    hex: '#FFFFFF'
  }]
}, {
  title: 'Hotel',
  description: 'Complete linen service with towels and bedding.',
  images: [hotelBedClean, towelsStackWhite, hotelLinens1],
  icon: Building2,
  slug: 'bed-linen'
}, {
  title: 'Kitchen',
  description: 'Chef uniforms and professional kitchen cloths.',
  images: [apronModel, kitchenClothHerringboneGreen, chefJacketWhiteModel],
  icon: ChefHat,
  slug: 'kitchen-work'
}];
const ServicesSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [activeImages, setActiveImages] = useState<{
    [key: number]: number;
  }>({});
  const [pausedCarousels, setPausedCarousels] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cardIndex = parseInt(entry.target.getAttribute('data-index') || '0');
          setVisibleCards(prev => [...prev, cardIndex]);
        }
      });
    }, {
      threshold: 0.2
    });
    const cards = sectionRef.current?.querySelectorAll('.service-card');
    cards?.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImages(prev => {
        const newActive = {
          ...prev
        };
        services.forEach((service, index) => {
          // Only cycle if not paused
          if (!pausedCarousels.has(index)) {
            const currentIndex = prev[index] || 0;
            newActive[index] = (currentIndex + 1) % service.images.length;
          }
        });
        return newActive;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [pausedCarousels]);
  const handleImageSelect = (serviceIndex: number, imageIndex: number) => {
    setActiveImages(prev => ({
      ...prev,
      [serviceIndex]: imageIndex
    }));
    // Pause the carousel for this service
    setPausedCarousels(prev => new Set(prev).add(serviceIndex));
  };
  return <section ref={sectionRef} className="py-12 md:py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-foreground/10" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-foreground/10" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-px bg-accent" />
            <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-foreground/60">
              What We Do
            </span>
          </div>
        
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-foreground leading-tight mb-8">
          Services
        </h2>

        {/* Story Section */}
        <div className="mb-12">
          <p className="text-foreground/70 font-body leading-relaxed text-lg">Looking for table linen for your restaurant? Need fresh bed linen for your hotel? Planning an event and want it to look perfect? We've got you covered.</p>
        </div>

        {/* Services Grid - 4x1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
          const IconComponent = service.icon;
          return <div key={index} data-index={index} className={`service-card group transition-all duration-700 ${visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
            transitionDelay: `${index * 200}ms`
          }}>
                <div className="bg-card border border-border overflow-hidden h-full hover:shadow-[var(--shadow-elegant)] transition-all duration-500 rounded-lg flex flex-col">
                  {/* Image Section */}
                  <div className="aspect-[4/3] overflow-hidden relative block cursor-pointer" onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    if (service.slug === 'events') {
                      navigate('/events');
                    } else if (service.slug === 'bed-linen') {
                      navigate('/hotel-linens');
                    } else if (service.slug === 'kitchen-work') {
                      navigate('/kitchen');
                    } else if (service.slug === 'restaurant') {
                      navigate('/restaurant');
                    } else {
                      navigate('/collection');
                    }
                  }}>
                    {service.images.map((image, imgIndex) => <img key={imgIndex} src={image} alt={`${service.title} ${imgIndex + 1}`} loading="eager" className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ${(activeImages[index] || 0) === imgIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} style={{
                  imageRendering: 'crisp-edges'
                }} />)}
                    <div className="absolute inset-0 bg-black/10" />
                    
                    {/* Icon - Always Visible */}
                    <div className="absolute top-4 left-4 w-8 h-8 bg-primary flex items-center justify-center z-10">
                      <IconComponent className="w-4 h-4 text-primary-foreground" />
                    </div>

                    {/* Color circles - top right */}
                    {service.colors && <div className="absolute top-4 right-4 flex gap-1.5 z-20">
                        {service.colors.map((color, colorIndex) => <button key={colorIndex} onClick={e => {
                    e.stopPropagation();
                    handleImageSelect(index, colorIndex);
                  }} className={`w-5 h-5 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer border ${(activeImages[index] || 0) === colorIndex ? 'border-white scale-110 ring-1 ring-white/50 shadow-lg' : 'border-white/60 hover:border-white'}`} style={{
                    backgroundColor: color.hex
                  }} aria-label={`View ${color.name}`} title={color.name}>
                            {color.hex === '#FFFFFF' && <div className="w-full h-full rounded-full border border-gray-300" />}
                          </button>)}
                      </div>}

                    {/* Image indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                      {service.images.map((_, imgIndex) => <button key={imgIndex} onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleImageSelect(index, imgIndex);
                  }} className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer border-2 ${(activeImages[index] || 0) === imgIndex ? 'bg-white border-white shadow-xl' : 'bg-white/40 border-white/80 hover:bg-white/70 hover:border-white'}`} aria-label={`View image ${imgIndex + 1}`} />)}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="font-display text-base font-light text-foreground leading-tight mb-2">
                      {service.title}
                    </h3>
                    
                    <p className="text-foreground/70 font-body leading-relaxed text-sm mb-4 flex-grow">
                      {service.description}
                    </p>

                    <Button 
                      variant="gradient" 
                      size="sm"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'instant' });
                        if (service.slug === 'events') {
                          navigate('/events');
                        } else if (service.slug === 'bed-linen') {
                          navigate('/hotel-linens');
                        } else if (service.slug === 'kitchen-work') {
                          navigate('/kitchen');
                        } else if (service.slug === 'restaurant') {
                          navigate('/restaurant');
                        } else {
                          navigate('/collection');
                        }
                      }}
                      className="w-full font-body mt-auto"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      <span className="text-xs uppercase tracking-wider">View Details</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>;
        })}
        </div>
      </div>
    </section>;
};
export default ServicesSection;