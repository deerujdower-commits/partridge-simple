import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
const plans = [{
  name: 'Essential',
  price: '29',
  period: 'per bag',
  description: 'Perfect for individuals and small households',
  features: ['Professional wash & fold', '48-hour turnaround', 'Basic stain treatment', 'Eco-friendly detergents', 'Online ordering'],
  popular: false
}, {
  name: 'Premium',
  price: '49',
  period: 'per bag',
  description: 'Our most popular choice for busy professionals',
  features: ['Everything in Essential', '24-hour turnaround', 'Advanced stain removal', 'Fabric softener options', 'Priority pickup/delivery', 'Garment protection', 'Real-time tracking'],
  popular: true
}, {
  name: 'Luxury',
  price: '89',
  period: 'per bag',
  description: 'White-glove service for discerning customers',
  features: ['Everything in Premium', 'Same-day service', 'Hand-finished pressing', 'Designer garment care', 'Personal account manager', 'Premium packaging', 'Satisfaction guarantee'],
  popular: false
}];
const PricingSection = () => {
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
  return (
    <section
      ref={sectionRef}
      className={`py-20 bg-background transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-light text-foreground mb-6">
            Pricing Plans
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your laundry needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-lg p-8 border transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-primary shadow-lg ring-2 ring-primary/20' 
                  : 'border-border hover:border-primary/50'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-display font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-display font-bold text-foreground">
                    £{plan.price}
                  </span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full ${
                  plan.popular 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background border border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default PricingSection;