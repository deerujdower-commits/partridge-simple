import { useState, useCallback, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Briefcase, Phone, Mail } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Import product content components
import DamaskContent from '@/components/products/DamaskContent';
import RoundTableclothsContent from '@/components/products/RoundTableclothsContent';
import TableclothsContent from '@/components/products/TableclothsContent';
import NapkinsContent from '@/components/products/NapkinsContent';

// Import round tablecloth images
import studioWhiteRoundTablecloth from '@/assets/studio-fitted-white-round-tablecloth.jpg';
import studioIvoryRoundTablecloth from '@/assets/studio-fitted-ivory-round-tablecloth.jpg';
import studioBlackRoundTablecloth from '@/assets/studio-fitted-black-round-tablecloth.jpg';

// Import square/rectangular tablecloth images
const studioWhiteTablecloth = '/lovable-uploads/cf54b1ce-fef7-4ac1-8bbc-34b126347063.png';
const studioBlackTablecloth = '/lovable-uploads/e059eed4-9708-4d5a-8545-42094ce503da.png';
const studioIvoryTablecloth = '/lovable-uploads/788eb1d4-c9b5-434b-8d56-65ffdcd67cb8.png';

// Import damask images from assets
import damaskBlack from '@/assets/damask-black-new.png';
import damaskGold from '@/assets/damask-gold-new.png';
import damaskPink from '@/assets/damask-pink-new.png';
import damaskSilver from '@/assets/damask-silver-new.png';
import damaskIvory from '@/assets/damask-ivory-new.jpeg';
import damaskWhite from '@/assets/damask-white-new.png';

// Import damask napkin images
import damaskBlackNapkin from '@/assets/damask-black-napkin.png';
import damaskGoldNapkin from '@/assets/damask-gold-napkin.png';
import damaskPinkNapkin from '@/assets/damask-pink-napkin.png';
import damaskSilverNapkin from '@/assets/damask-silver-napkin.png';
import damaskIvoryNapkin from '@/assets/damask-ivory-napkin.png';
import damaskWhiteNapkin from '@/assets/damask-white-napkin.png';

// Import napkin images from assets
import studioWhiteNapkins from '@/assets/studio-fitted-white-napkins.jpg';
import studioIvoryNapkins from '@/assets/studio-fitted-ivory-napkins.jpg';
import studioBlackNapkins from '@/assets/studio-fitted-black-napkins.jpg';

const eventItems = [
  {
    id: 1,
    title: 'Damask',
    description: 'Luxury damask tablecloths and napkins in black, gold, pink, silver, ivory, and white with intricate woven patterns.',
    mainImage: damaskBlack,
    galleryImages: [damaskBlack, damaskGold, damaskPink, damaskSilver, damaskIvory, damaskWhite],
    roundImages: [damaskBlack, damaskGold, damaskPink, damaskSilver, damaskIvory, damaskWhite],
    napkinImages: [damaskBlackNapkin, damaskGoldNapkin, damaskPinkNapkin, damaskSilverNapkin, damaskIvoryNapkin, damaskWhiteNapkin],
    popular: true,
    slug: 'damask',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Pink', hex: '#d4a5a5' },
      { name: 'Silver', hex: '#C0C0C0' },
      { name: 'Ivory', hex: '#f5f0e8' },
      { name: 'White', hex: '#FFFFFF' }
    ]
  },
  {
    id: 2,
    title: 'Tablecloths',
    description: 'Classic square and rectangular tablecloths in white, black, and ivory perfect for any event.',
    mainImage: studioWhiteTablecloth,
    galleryImages: [studioWhiteTablecloth, studioIvoryTablecloth, studioBlackTablecloth],
    roundImages: [studioWhiteRoundTablecloth, studioIvoryRoundTablecloth, studioBlackRoundTablecloth],
    popular: true,
    slug: 'tablecloths',
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Ivory', hex: '#F5F5DC' },
      { name: 'Black', hex: '#000000' }
    ]
  },
  {
    id: 3,
    title: 'Round Tablecloths',
    description: 'Elegant round tablecloths in white, black, and ivory designed for round tables.',
    mainImage: studioWhiteRoundTablecloth,
    galleryImages: [studioWhiteRoundTablecloth, studioIvoryRoundTablecloth, studioBlackRoundTablecloth],
    popular: true,
    slug: 'round-tablecloths',
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Ivory', hex: '#F5F5DC' },
      { name: 'Black', hex: '#000000' }
    ]
  },
  {
    id: 4,
    title: 'Napkins',
    description: 'Premium napkins in white, ivory, and black to complement your table settings.',
    mainImage: studioWhiteNapkins,
    galleryImages: [studioWhiteNapkins, studioIvoryNapkins, studioBlackNapkins],
    popular: true,
    slug: 'napkins',
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Ivory', hex: '#F5F5DC' },
      { name: 'Black', hex: '#000000' }
    ]
  }
];

const Events = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: number]: number }>({});
  const [isHovered, setIsHovered] = useState<{ [key: number]: boolean }>({});
  const [pausedCarousels, setPausedCarousels] = useState<{ [key: number]: boolean }>({});
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const intervalRefs = useRef<{ [key: number]: NodeJS.Timeout }>({});
  const gridRef = useRef<HTMLDivElement>(null);

  // Detect which product modal to show based on URL
  const getActiveProduct = () => {
    const path = location.pathname;
    if (path.startsWith('/events/damask')) return 'damask';
    if (path.startsWith('/events/round-tablecloths')) return 'round-tablecloths';
    if (path.startsWith('/events/tablecloths')) return 'tablecloths';
    if (path.startsWith('/events/napkins')) return 'napkins';
    return null;
  };

  const activeProduct = getActiveProduct();
  const isModalOpen = activeProduct !== null;

  const handleCloseModal = () => {
    const from = location.state?.from;
    navigate(from || '/events');
  };

  const startCarousel = useCallback((itemId: number) => {
    if (intervalRefs.current[itemId]) {
      clearInterval(intervalRefs.current[itemId]);
    }
    intervalRefs.current[itemId] = setInterval(() => {
      setCurrentImageIndices((prev) => {
        const item = eventItems.find((i) => i.id === itemId);
        if (!item) return prev;
        const currentIndex = prev[itemId] || 0;
        return {
          ...prev,
          [itemId]: (currentIndex + 1) % item.galleryImages.length,
        };
      });
    }, 3000);
  }, []);

  const stopCarousel = useCallback((itemId: number) => {
    if (intervalRefs.current[itemId]) {
      clearInterval(intervalRefs.current[itemId]);
      delete intervalRefs.current[itemId];
    }
  }, []);

  useEffect(() => {
    eventItems.forEach((item) => {
      if (!pausedCarousels[item.id]) {
        startCarousel(item.id);
      }
    });

    return () => {
      Object.values(intervalRefs.current).forEach(clearInterval);
    };
  }, [startCarousel, pausedCarousels]);

  const handleColorSwatchClick = (itemId: number, colorIndex: number) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [itemId]: colorIndex,
    }));
    setPausedCarousels((prev) => ({
      ...prev,
      [itemId]: true,
    }));
    stopCarousel(itemId);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = parseInt(entry.target.getAttribute('data-item-id') || '0');
            setVisibleItems((prev) => [...prev, itemId]);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    const items = gridRef.current?.querySelectorAll('.event-item');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (item: typeof eventItems[0]) => {
    navigate(`/events/${item.slug}`);
  };

  const renderProductContent = () => {
    switch (activeProduct) {
      case 'damask':
        return <DamaskContent basePath="/events/damask" useUrlRouting={true} />;
      case 'round-tablecloths':
        return <RoundTableclothsContent basePath="/events/round-tablecloths" useUrlRouting={true} />;
      case 'tablecloths':
        return <TableclothsContent basePath="/events/tablecloths" useUrlRouting={true} />;
      case 'napkins':
        return <NapkinsContent basePath="/events/napkins" useUrlRouting={true} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center text-foreground/60 hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Header with Business Services Button */}
          <div className="mb-12 relative">
            {/* Business Services Button - Top Right */}
            <div className="mb-6 md:mb-0 md:absolute md:top-0 md:right-0">
              <Link to="/collection">
                <Button 
                  className="bg-gradient-to-r from-accent to-accent-blue hover:from-accent-blue hover:to-accent text-white shadow-lg hover:shadow-xl transition-all duration-300 group font-body w-full md:w-auto"
                >
                  <Briefcase className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Looking for your business?
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-accent to-accent-blue" />
              <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-foreground/60">
                Event Hire
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-light text-foreground leading-tight mb-6">
              Elegant Linens for
              <br />
              <span className="text-accent">Your Special Events</span>
            </h1>

            <p className="text-foreground/70 font-body leading-relaxed text-lg max-w-3xl">
              From weddings to corporate events, we provide premium tablecloths and damask linens to make your occasion memorable. Browse our collection and let us know what you need.
            </p>
          </div>

          {/* Event Items Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {eventItems.map((item, index) => {
              const currentImageIndex = currentImageIndices[item.id] || 0;
              return (
                <div
                  key={item.id}
                  data-item-id={item.id}
                  className={`event-item relative transition-all duration-700 hover:scale-[1.02] group cursor-pointer ${
                    visibleItems.includes(item.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                  onClick={() => handleCardClick(item)}
                  onMouseEnter={() => {
                    setIsHovered((prev) => ({
                      ...prev,
                      [item.id]: true,
                    }));
                  }}
                  onMouseLeave={() => {
                    setIsHovered((prev) => ({
                      ...prev,
                      [item.id]: false,
                    }));
                  }}
                >
                  {/* Main Image with Auto-Carousel */}
                  <div className="relative aspect-[5/4] overflow-hidden rounded-lg">
                    <img
                      src={item.galleryImages[currentImageIndex] || item.mainImage}
                      alt={`${item.title} ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                      loading="eager"
                      style={{
                        imageRendering: 'crisp-edges',
                      }}
                    />

                    {/* Popular Badge */}
                    {item.popular && (
                      <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                        Popular
                      </Badge>
                    )}

                    {/* Color circles - top right */}
                    {item.colors && (
                      <div className="absolute top-3 right-3 flex gap-1.5 z-20">
                        {item.colors.map((color, colorIndex) => (
                          <button
                            key={colorIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleColorSwatchClick(item.id, colorIndex);
                            }}
                            className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer border ${
                              colorIndex === currentImageIndex
                                ? 'border-white scale-110 ring-1 ring-white/50 shadow-lg'
                                : 'border-white/60 hover:border-white'
                            }`}
                            style={{
                              backgroundColor: color.hex,
                            }}
                            aria-label={`View ${color.name}`}
                            title={color.name}
                          >
                            {color.hex === '#FFFFFF' && (
                              <div className="w-full h-full rounded-full border border-gray-300" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Button Navigation */}
                    {item.galleryImages.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                        {item.galleryImages.map((_, dotIndex) => (
                          <button
                            key={dotIndex}
                            className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer border-2 ${
                              dotIndex === currentImageIndex
                                ? 'bg-white border-white shadow-xl'
                                : 'bg-white/40 border-white/80 hover:bg-white/70 hover:border-white'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleColorSwatchClick(item.id, dotIndex);
                            }}
                            aria-label={`View image ${dotIndex + 1} of ${item.title}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Item Content */}
                  <div className="mt-4">
                    <h3 className="font-display text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300 mb-2">
                      {item.title}
                    </h3>

                    <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Action button */}
                    <div className="flex items-center text-foreground/60 group-hover:text-foreground transition-colors duration-300">
                      <span className="text-sm font-light uppercase tracking-wide">Order Now</span>
                      <div className="w-4 h-px bg-current ml-3 group-hover:w-8 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Browse Collection Link */}
          <div className="my-12 text-center">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate('/collection')}
              className="font-body group"
            >
              Browse Full Collection
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* FAQ Section */}
          <div className="bg-muted/50 border-2 border-border rounded-lg p-8 md:p-12 my-12 max-w-4xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-6">
              Event Linen Hire: Frequently Asked Questions (FAQ)
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-display text-left">
                  What is the lead time for placing an order?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed">
                  We recommend submitting your order at least 5 working days prior to your event date. While same-week orders can often be accommodated, we must check stock availability before confirming and sending the payment link.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="font-display text-left">
                  What are the collection and delivery options?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed">
                  Collection and return are free from our premises in Thornton Heath, Croydon. If you require delivery, you can request this option at checkout. The delivery charge will be calculated and included in your final invoice, allowing you to pay for either the free collection or optional delivery.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="font-display text-left">
                  How does the refundable damage deposit work?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed">
                  A deposit is required for all items (e.g., Round tablecloth: £10 each; Normal napkin: £1 each). The deposit is fully refundable after the items are returned and checked at our premises. Indelible stains—marks that cannot be removed even with professional washing or bleaching—will be considered permanent damage, and the relevant deposit amount will be retained.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="font-display text-left">
                  What is the standard hire period?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed">
                  Our standard hire period is 3 days. If you need the items for longer, please let us know and we can arrange an extended hire at an additional cost.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="font-display text-left">
                  Do I need to wash the items before returning?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed">
                  No, you don't need to wash the items. Simply return them in a bag or box. We handle all the cleaning professionally. However, please shake off any food debris before packing.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Why Choose Us Section */}
          <div className="my-12 max-w-4xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-8 text-center">
              Why Choose Partridge Linen for Your Event?
            </h2>
            
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-display text-lg font-medium text-foreground mb-2">Premium Quality</h3>
                <p className="text-foreground/60 text-sm">
                  All our linens are professionally cleaned and maintained to the highest standards.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="font-display text-lg font-medium text-foreground mb-2">Flexible Delivery</h3>
                <p className="text-foreground/60 text-sm">
                  Free collection from Croydon or convenient delivery to your venue.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="font-display text-lg font-medium text-foreground mb-2">Personal Service</h3>
                <p className="text-foreground/60 text-sm">
                  Family-run business with over 40 years of experience serving London events.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-accent/10 to-accent-blue/10 border border-border rounded-lg p-8 my-12 max-w-4xl mx-auto text-center">
            <h2 className="font-display text-2xl font-light text-foreground mb-4">
              Ready to Make Your Event Special?
            </h2>
            <p className="text-foreground/70 font-body mb-6 max-w-xl mx-auto">
              Get in touch with us to discuss your requirements. We're here to help make your event memorable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:02086aborndne"
                className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background rounded hover:bg-foreground/90 transition-colors font-body"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </a>
              <a 
                href="mailto:info@partridgelinen.co.uk"
                className="inline-flex items-center justify-center px-6 py-3 border border-foreground text-foreground rounded hover:bg-foreground hover:text-background transition-colors font-body"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Product Modal Sheet */}
      <Sheet open={isModalOpen} onOpenChange={(open) => !open && handleCloseModal()}>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto rounded-t-2xl">
          <SheetHeader className="sr-only">
            <SheetTitle>Product Details</SheetTitle>
          </SheetHeader>
          <div className="max-w-6xl mx-auto py-6">
            {renderProductContent()}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Events;
