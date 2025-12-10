import { useEffect, useRef, useState } from 'react';

const stats = [
  { number: '20000000', label: 'Garments Cleaned', suffix: 'M+' },
  { number: '1000', label: 'Happy Customers', suffix: '+' }
];

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateNumbers();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateNumbers = () => {
    stats.forEach((stat, index) => {
      const targetNumber = parseFloat(stat.number.replace(/[^0-9.]/g, ''));
      const duration = 2000;
      const steps = 60;
      const increment = targetNumber / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
          current = targetNumber;
          clearInterval(timer);
        }
        
        setAnimatedNumbers(prev => {
          const newNumbers = [...prev];
          newNumbers[index] = current;
          return newNumbers;
        });
      }, duration / steps);
    });
  };

  const formatNumber = (num: number, suffix: string) => {
    if (suffix === 'M+') {
      return (num / 1000000).toFixed(1);
    } else if (suffix === 'K+') {
      return Math.round(num / 1000).toString();
    } else if (suffix === '+') {
      return Math.round(num).toString();
    }
    return Math.round(num).toString();
  };

  return (
    <section ref={sectionRef} className="py-20 bg-accent text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-primary-foreground/10" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-primary-foreground/10" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="font-display text-4xl md:text-6xl font-light mb-2 leading-tight">
                {isVisible ? formatNumber(animatedNumbers[index], stat.suffix) : '0'}
                <span className="text-2xl md:text-3xl">{stat.suffix}</span>
              </div>
              <div className="font-body text-sm md:text-base font-light uppercase tracking-wider opacity-90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;