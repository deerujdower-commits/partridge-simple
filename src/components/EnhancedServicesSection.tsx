import { useEffect, useRef, useState } from 'react';
import hotelDining from '@/assets/hotel-dining-damask.jpg';
import hotelBedroom from '@/assets/hotel-bedroom-linens.jpg';
import restaurantWhiteRound from '@/assets/restaurant-white-round-setting.jpg';
import restaurantBlackSetting from '@/assets/restaurant-black-tablecloth-setting.jpg';
import restaurantWhiteMinimal from '@/assets/restaurant-white-table-minimal.jpg';
const weddingReception = '/lovable-uploads/c70f1b51-9221-4ffa-8db2-bcc1cabaf32e.png';
const corporateEvent = '/lovable-uploads/ba3431f5-20fc-4ca2-b912-c91a1395793e.png';

const services = [
  {
    title: 'Hotel & Hospitality Linens',
    description: 'Complete linen management for luxury hotels and resorts. From Egyptian cotton sheets to premium dining linens.',
    images: [hotelDining, hotelBedroom],
    features: ['24/7 pickup & delivery', 'OSHA compliant cleaning', 'Inventory management', 'Emergency replacements']
  },
  {
    title: 'Restaurant & Food Service',
    description: 'Professional kitchen and dining textiles. Damask tablecloths, napkins, chef whites, and aprons cleaned to food service standards.',
    images: [restaurantWhiteRound, restaurantBlackSetting, restaurantWhiteMinimal],
    features: ['Food-safe cleaning', 'Stain removal expertise', 'Same-day turnaround', 'Uniform management']
  },
  {
    title: 'Wedding & Corporate Events',
    description: 'Premium event linens for your special occasions. Luxury damask tablecloths, silk napkins, and ceremonial textiles.',
    images: [weddingReception, corporateEvent],
    features: ['Custom event scheduling', 'Emergency service', 'Delicate fabric care', 'Event coordination']
  }
];

const EnhancedServicesSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<{ [key: number]: number }>({});
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => [...prev, cardIndex]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const cards = sectionRef.current?.querySelectorAll('.service-card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex(prev => {
        const newIndex = { ...prev };
        services.forEach((service, index) => {
          if (service.images.length > 1) {
            newIndex[index] = ((prev[index] || 0) + 1) % service.images.length;
          }
        });
        return newIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-primary rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-6xl font-light text-foreground mb-6 animate-fade-in">
            Commercial Solutions,
            <span className="block font-normal text-primary">
              Professional Results
            </span>
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Specialized linen services designed for hospitality and commercial excellence
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              data-index={index}
              className={`service-card group cursor-pointer transition-all duration-700 hover:scale-105 ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="premium-card h-full overflow-hidden relative">
                {/* Image carousel */}
                <div className="aspect-[4/3] mb-6 rounded-2xl overflow-hidden relative">
                  {service.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`${service.title} - ${imgIndex + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${
                        (activeImageIndex[index] || 0) === imgIndex 
                          ? 'opacity-100 z-10' 
                          : 'opacity-0 z-0'
                      }`}
                    />
                  ))}
                  
                  {/* Image indicators */}
                  {service.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                      {service.images.map((_, imgIndex) => (
                        <div
                          key={imgIndex}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            (activeImageIndex[index] || 0) === imgIndex 
                              ? 'bg-white' 
                              : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/10 z-5"></div>
                </div>
                
                <h3 className="font-display text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className="flex items-center font-body text-sm text-foreground opacity-0 animate-fade-in"
                      style={{ animationDelay: `${(index * 200) + (featureIndex * 100)}ms` }}
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedServicesSection;