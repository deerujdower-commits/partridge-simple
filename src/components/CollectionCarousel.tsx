import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import studio fitted photography product images from collection
const studioFittedWhiteTablecloth = '/lovable-uploads/cf54b1ce-fef7-4ac1-8bbc-34b126347063.png';
const studioFittedBlackTableclothV2 = '/lovable-uploads/e059eed4-9708-4d5a-8545-42094ce503da.png';
const studioFittedIvoryTableclothV2 = '/lovable-uploads/788eb1d4-c9b5-434b-8d56-65ffdcd67cb8.png';
import studioFittedWhiteRoundTablecloth from '@/assets/studio-fitted-white-round-tablecloth.jpg';
import studioFittedBlackRoundTablecloth from '@/assets/studio-fitted-black-round-tablecloth.jpg';
import studioFittedIvoryRoundTablecloth from '@/assets/studio-fitted-ivory-round-tablecloth.jpg';
import studioFittedWhiteNapkins from '@/assets/studio-fitted-white-napkins.jpg';
import studioFittedBlackNapkins from '@/assets/studio-fitted-black-napkins.jpg';
import studioFittedIvoryNapkins from '@/assets/studio-fitted-ivory-napkins.jpg';
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

// Work wear images
import chefSuitWhiteFull from '@/assets/chef-suit-white-full.jpg';
import chefSuitBlackFull from '@/assets/chef-suit-black-full.png';
import chefJacketWhite from '@/assets/chef-jacket-white.png';
import chefJacketWhiteModel from '@/assets/chef-jacket-white-model.jpg';
import chefJacketBlack from '@/assets/chef-jacket-black.jpg';
import chefJacketBlackModel from '@/assets/chef-jacket-black-model.jpg';
import chefJacketShortWhite from '@/assets/chef-jacket-short-white.png';
import chefJacketShortWhiteModel from '@/assets/chef-jacket-short-white-model.png';
import chefJacketShortBlack from '@/assets/chef-jacket-short-black.png';
import chefJacketShortBlackModel from '@/assets/chef-jacket-short-black-model.png';
import chefTrouserCheck from '@/assets/chef-trouser-check.png';
import chefTrouserCheckModel from '@/assets/chef-trouser-check-model.png';
import chefTrouserBlack from '@/assets/chef-trouser-black.png';
import chefTrouserBlackModel from '@/assets/chef-trouser-black-model.png';
import apron from '@/assets/apron.png';
import apronModel from '@/assets/apron-model.jpg';

const kitchenLinenImage1 = '/lovable-uploads/027eb211-99a4-4e7d-8d3f-91a396f0b82a.png';
const kitchenLinenImage2 = '/lovable-uploads/2733f275-4abc-4211-8663-e86feb172f9d.png';
import hotelBedLinenMain from '@/assets/hotel-bed-linen-main.jpg';
import hotelBedLinen1 from '@/assets/hotel-bed-linen-1.jpeg';
import hotelBedLinen2 from '@/assets/hotel-bed-linen-2.jpeg';
import towelClean from '@/assets/towel-clean.jpg';
import towelPremium from '@/assets/towel-premium.jpg';
import towelsStackWhite from '@/assets/towels-stack-white.jpg';
import hotelBedFreshLinens from '@/assets/hotel-bed-fresh-linens.jpg';

const collectionItems = [
  { 
    id: 1,
    images: [studioFittedWhiteTablecloth, studioFittedIvoryTableclothV2, studioFittedBlackTableclothV2], 
    title: 'Tablecloths', 
    category: 'Restaurant',
    slug: 'tablecloths',
    description: 'Classic square tablecloths in white, black, and ivory perfect for any dining occasion.',
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Ivory', hex: '#F5F5DC' },
      { name: 'Black', hex: '#000000' }
    ]
  },
  { 
    id: 2,
    images: [studioFittedWhiteRoundTablecloth, studioFittedIvoryRoundTablecloth, studioFittedBlackRoundTablecloth], 
    title: 'Round Tablecloths', 
    category: 'Restaurant',
    slug: 'round-tablecloths',
    description: 'Elegant round tablecloths in white, black, and ivory designed for round tables.',
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Ivory', hex: '#F5F5DC' },
      { name: 'Black', hex: '#000000' }
    ]
  },
  { 
    id: 3,
    images: [studioFittedWhiteNapkins, studioFittedIvoryNapkins, studioFittedBlackNapkins], 
    title: 'Napkins', 
    category: 'Restaurant',
    slug: 'napkins',
    description: 'Premium cloth napkins in white, black, and ivory to complement any table setting.',
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Ivory', hex: '#F5F5DC' },
      { name: 'Black', hex: '#000000' }
    ]
  },
  { 
    id: 4,
    images: [damaskBlack, damaskGold, damaskPink, damaskSilver, damaskIvory, damaskWhite],
    napkinImages: [damaskBlackNapkin, damaskGoldNapkin, damaskPinkNapkin, damaskSilverNapkin, damaskIvoryNapkin, damaskWhiteNapkin],
    title: 'Damask', 
    category: 'Event Hire',
    slug: 'damask',
    description: 'Luxury damask tablecloths in black, gold, pink, silver, ivory, and white with intricate woven patterns.',
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
    id: 5,
    images: [
      chefSuitWhiteFull,
      chefSuitBlackFull,
      chefJacketWhite, 
      chefJacketWhiteModel,
      chefJacketBlack,
      chefJacketBlackModel,
      chefJacketShortWhite,
      chefJacketShortWhiteModel,
      chefJacketShortBlack,
      chefJacketShortBlackModel,
      chefTrouserCheck,
      chefTrouserCheckModel,
      chefTrouserBlack,
      chefTrouserBlackModel,
      apron,
      apronModel
    ], 
    title: 'Work Wear', 
    category: 'Kitchen',
    slug: 'work-wear',
    description: 'Professional chef jackets, trousers, and aprons designed for comfort and durability in commercial kitchens.'
  },
  { 
    id: 6,
    images: [kitchenLinenImage1, kitchenLinenImage2, kitchenLinenImage1], 
    title: 'Kitchen Linen', 
    category: 'Kitchen',
    slug: 'kitchen-linen',
    description: 'Professional kitchen towels and cloths in various patterns and colors for commercial and domestic use.'
  },
  { 
    id: 7,
    images: [hotelBedLinen1, hotelBedLinenMain, hotelBedLinen2], 
    title: 'Bed Linen', 
    category: 'Hotel',
    slug: 'bed-linen',
    description: 'Luxury bed linens including duvet covers, bedsheets, and pillow cases for hospitality and residential use.'
  },
  { 
    id: 8,
    images: [towelClean, towelPremium, towelsStackWhite], 
    title: 'Towels', 
    category: 'Hotel',
    slug: 'towel',
    description: 'Premium quality towels for hospitality and commercial use.'
  }
];

// Duplicate items for endless scroll
const infiniteItems = [...collectionItems, ...collectionItems, ...collectionItems];

const CollectionCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: string]: number }>({});
  const [pausedItems, setPausedItems] = useState<Set<string>>(new Set());
  const intervalRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;
    let scrollSpeed = 0.5;

    const animate = () => {
      if (carousel) {
        carousel.scrollLeft += scrollSpeed;
        
        // Reset scroll position when we've scrolled past one full set
        const maxScroll = carousel.scrollWidth / 3;
        if (carousel.scrollLeft >= maxScroll) {
          carousel.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => {
      scrollSpeed = 0;
    };

    const handleMouseLeave = () => {
      scrollSpeed = 0.5;
    };

    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      if (carousel) {
        carousel.removeEventListener('mouseenter', handleMouseEnter);
        carousel.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Auto-carousel for items with colors every 3 seconds
  useEffect(() => {
    collectionItems.forEach(item => {
      if (item.colors) {
        const keys = infiniteItems
          .map((_, idx) => `${item.title}-${idx}`)
          .filter(key => key.includes(item.title));
        
        keys.forEach(key => {
          if (!intervalRefs.current[key] && !pausedItems.has(key)) {
            intervalRefs.current[key] = setInterval(() => {
              if (!pausedItems.has(key)) {
                setCurrentImageIndices(prev => {
                  const current = prev[key] || 0;
                  return { ...prev, [key]: (current + 1) % item.colors.length };
                });
              }
            }, 3000);
          }
        });
      }
    });

    return () => {
      Object.values(intervalRefs.current).forEach(clearInterval);
      intervalRefs.current = {};
    };
  }, [pausedItems]);

  const handlePrevImage = (itemKey: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const item = collectionItems.find(i => itemKey.includes(i.title));
    const length = item?.images.length || 3;
    setCurrentImageIndices(prev => ({
      ...prev,
      [itemKey]: ((prev[itemKey] || 0) - 1 + length) % length
    }));
  };

  const handleNextImage = (itemKey: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const item = collectionItems.find(i => itemKey.includes(i.title));
    const length = item?.images.length || 3;
    setCurrentImageIndices(prev => ({
      ...prev,
      [itemKey]: ((prev[itemKey] || 0) + 1) % length
    }));
  };

  const handleColorClick = (itemKey: string, colorIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndices(prev => ({
      ...prev,
      [itemKey]: colorIndex
    }));
    // Pause carousel for this item
    setPausedItems(prev => new Set(prev).add(itemKey));
    // Clear interval for this item
    if (intervalRefs.current[itemKey]) {
      clearInterval(intervalRefs.current[itemKey]);
      delete intervalRefs.current[itemKey];
    }
  };

  return (
    <section className="py-12 md:py-20 bg-[hsl(var(--bg-tone-3))] overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-foreground/10" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-foreground/10" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-px bg-accent" />
              <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-foreground/60">
                Explore
              </span>
            </div>
            
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-foreground leading-tight">
              Our Collection
            </h2>
          </div>
          
        </div>
      </div>

      <div 
        ref={carouselRef}
        className="flex gap-6 overflow-x-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
        {infiniteItems.map((item, index) => {
          const itemKey = `${item.title}-${index}`;
          const currentImageIndex = currentImageIndices[itemKey] || 0;
          const originalIndex = index % collectionItems.length;
          const originalItem = collectionItems[originalIndex];
          return (
            <button
              key={itemKey}
              onClick={() => {
                window.scrollTo(0, 0);
                // Map categories to service pages
                const categoryRoutes: { [key: string]: string } = {
                  'Restaurant': '/restaurant',
                  'Event Hire': '/events',
                  'Kitchen': '/kitchen',
                  'Hotel': '/hotel-linens'
                };
                navigate(categoryRoutes[originalItem.category] || '/');
              }}
              className="group flex-shrink-0 block"
            >
              <div className="w-64 h-80 bg-card border border-border overflow-hidden hover:shadow-[var(--shadow-elegant)] transition-all duration-500">
                <div className="aspect-[5/4] overflow-hidden relative">
                  <img 
                    src={item.images[currentImageIndex]} 
                    alt={`${item.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                  
                  {/* Color circles - only for specific items, top right */}
                  {item.colors && (
                    <div className="absolute top-3 right-3 flex gap-1.5 z-20">
                      {item.colors.map((color, colorIndex) => (
                        <button
                          key={colorIndex}
                          onClick={(e) => handleColorClick(itemKey, colorIndex, e)}
                          className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer border ${
                            colorIndex === currentImageIndex 
                              ? 'border-white scale-110 ring-1 ring-white/50 shadow-lg' 
                              : 'border-white/60 hover:border-white'
                          }`}
                          style={{ backgroundColor: color.hex }}
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
                  
                  {/* Navigation arrows - only visible on hover */}
                  <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => handlePrevImage(itemKey, e)}
                      className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={16} className="text-white" />
                    </button>
                    <button
                      onClick={(e) => handleNextImage(itemKey, e)}
                      className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                      aria-label="Next image"
                    >
                      <ChevronRight size={16} className="text-white" />
                    </button>
                  </div>

                  {/* Image indicators */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.images.map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                          i === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="font-body text-xs font-light uppercase tracking-[0.2em] text-foreground/60 mb-2">
                    {item.category}
                  </div>
                  
                  <h3 className="font-display text-lg font-light text-foreground leading-tight group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center text-foreground/40 group-hover:text-foreground/60 transition-colors duration-300 mt-4">
                    <span className="font-body text-sm uppercase tracking-wider whitespace-nowrap">Learn More</span>
                    <div className="w-4 h-px bg-current ml-3 group-hover:w-8 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

    </section>
  );
};

export default CollectionCarousel;