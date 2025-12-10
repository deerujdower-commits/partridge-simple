import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

// Import product content components
import TableclothsContent from '@/components/products/TableclothsContent';
import NapkinsContent from '@/components/products/NapkinsContent';
import WorkWearContent from '@/components/products/WorkWearContent';
import KitchenLinenContent from '@/components/products/KitchenLinenContent';
import BedLinenContent from '@/components/products/BedLinenContent';
import TowelsContent from '@/components/products/TowelsContent';
import DamaskContent from '@/components/products/DamaskContent';
import RoundTableclothsContent from '@/components/products/RoundTableclothsContent';

// Import studio fitted photography product images
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
import chefSuitWhiteFull from '@/assets/chef-suit-white-full.jpg';
import chefSuitBlackFull from '@/assets/chef-suit-black-full.png';

// Other images
import hotelBedClean from '@/assets/hotel-bed-clean.jpg';
import towelClean from '@/assets/towel-clean.jpg';
import towelPremium from '@/assets/towel-premium.jpg';
import towelsStackWhite from '@/assets/towels-stack-white.jpg';
import hotelLinens1 from '@/assets/hotel-linens-1.jpg';
import hotelBedFreshLinens from '@/assets/hotel-bed-fresh-linens.jpg';

const collectionItems = [{
  id: 1,
  title: 'Tablecloths',
  description: 'Classic square tablecloths in white, black, and ivory perfect for any dining occasion.',
  mainImage: studioFittedWhiteTablecloth,
  galleryImages: [studioFittedWhiteTablecloth, studioFittedIvoryTableclothV2, studioFittedBlackTableclothV2],
  popular: false,
  slug: 'tablecloths',
  colors: [{
    name: 'White',
    hex: '#FFFFFF'
  }, {
    name: 'Ivory',
    hex: '#F5F5DC'
  }, {
    name: 'Black',
    hex: '#000000'
  }]
}, {
  id: 2,
  title: 'Round Tablecloths',
  description: 'Elegant round tablecloths in white, black, and ivory designed for round tables.',
  mainImage: studioFittedWhiteRoundTablecloth,
  galleryImages: [studioFittedWhiteRoundTablecloth, studioFittedIvoryRoundTablecloth, studioFittedBlackRoundTablecloth],
  popular: true,
  slug: 'round-tablecloths',
  colors: [{
    name: 'White',
    hex: '#FFFFFF'
  }, {
    name: 'Ivory',
    hex: '#F5F5DC'
  }, {
    name: 'Black',
    hex: '#000000'
  }]
}, {
  id: 3,
  title: 'Napkins',
  description: 'Premium cloth napkins in white, black, and ivory to complement any table setting.',
  mainImage: studioFittedWhiteNapkins,
  galleryImages: [studioFittedWhiteNapkins, studioFittedIvoryNapkins, studioFittedBlackNapkins],
  popular: true,
  slug: 'napkins',
  colors: [{
    name: 'White',
    hex: '#FFFFFF'
  }, {
    name: 'Ivory',
    hex: '#F5F5DC'
  }, {
    name: 'Black',
    hex: '#000000'
  }]
}, {
  id: 4,
  title: 'Damask',
  description: 'Luxury damask tablecloths in six elegant colors with intricate woven patterns.',
  mainImage: damaskBlack,
  galleryImages: [damaskBlack, damaskGold, damaskPink, damaskSilver, damaskIvory, damaskWhite],
  napkinImages: [damaskBlackNapkin, damaskGoldNapkin, damaskPinkNapkin, damaskSilverNapkin, damaskIvoryNapkin, damaskWhiteNapkin],
  popular: true,
  slug: 'damask',
  colors: [{
    name: 'Black',
    hex: '#1a1a1a'
  }, {
    name: 'Gold',
    hex: '#D4AF37'
  }, {
    name: 'Pink',
    hex: '#d4a5a5'
  }, {
    name: 'Silver',
    hex: '#C0C0C0'
  }, {
    name: 'Ivory',
    hex: '#f5f0e8'
  }, {
    name: 'White',
    hex: '#FFFFFF'
  }]
}, {
  id: 5,
  title: 'Work Wear',
  description: 'Professional chef jackets, trousers, and aprons designed for comfort and durability in commercial kitchens.',
  mainImage: chefSuitWhiteFull,
  galleryImages: [
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
  popular: false,
  slug: 'work-wear'
}, {
  id: 6,
  title: 'Kitchen',
  description: 'Professional kitchen towels and cloths in various patterns and colors for commercial and domestic use.',
  mainImage: '/lovable-uploads/027eb211-99a4-4e7d-8d3f-91a396f0b82a.png',
  galleryImages: ['/lovable-uploads/027eb211-99a4-4e7d-8d3f-91a396f0b82a.png', '/lovable-uploads/21a97c9a-3bd0-417c-b445-5ae091c4192f.png', '/lovable-uploads/2733f275-4abc-4211-8663-e86feb172f9d.png'],
  popular: false,
  slug: 'kitchen-linen'
}, {
  id: 7,
  title: 'Bed Linen',
  description: 'Luxury bed linens including duvet covers, bedsheets, and pillow cases for hospitality and residential use.',
  mainImage: hotelBedClean,
  galleryImages: [hotelBedClean, hotelLinens1, hotelBedFreshLinens],
  popular: false,
  slug: 'bed-linen'
}, {
  id: 8,
  title: 'Towel',
  description: 'Premium quality towels for hospitality and commercial use.',
  mainImage: towelClean,
  galleryImages: [towelClean, towelPremium, towelsStackWhite],
  popular: false,
  slug: 'towel'
}];

const Collection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<number, number>>({});
  const [isHovered, setIsHovered] = useState<Record<number, boolean>>({});
  const [pausedCarousels, setPausedCarousels] = useState<Record<number, boolean>>({});
  const gridRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Detect which product modal to show based on URL
  const getActiveProduct = () => {
    const path = location.pathname;
    if (path.startsWith('/collection/tablecloths')) return 'tablecloths';
    if (path.startsWith('/collection/napkins')) return 'napkins';
    if (path.startsWith('/collection/work-wear')) return 'work-wear';
    if (path.startsWith('/collection/kitchen-linen')) return 'kitchen-linen';
    if (path.startsWith('/collection/bed-linen')) return 'bed-linen';
    if (path.startsWith('/collection/towel')) return 'towel';
    if (path.startsWith('/collection/damask')) return 'damask';
    if (path.startsWith('/collection/round-tablecloths')) return 'round-tablecloths';
    return null;
  };

  const activeProduct = getActiveProduct();
  const isModalOpen = activeProduct !== null;

  const handleCloseModal = () => {
    navigate('/collection');
  };

  // Single unified carousel timer for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Single interval for all carousels instead of one per item
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndices(prev => {
        const updates: Record<number, number> = {};
        collectionItems.forEach(item => {
          if (!isHovered[item.id] && !pausedCarousels[item.id]) {
            const currentIndex = prev[item.id] || 0;
            updates[item.id] = (currentIndex + 1) % item.galleryImages.length;
          }
        });
        return Object.keys(updates).length > 0 ? { ...prev, ...updates } : prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, pausedCarousels]);

  const handleColorSwatchClick = (itemId: number, colorIndex: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [itemId]: colorIndex
    }));
    setPausedCarousels(prev => ({
      ...prev,
      [itemId]: true
    }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const itemId = parseInt(entry.target.getAttribute('data-item-id') || '0');
          setVisibleItems(prev => [...prev, itemId]);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    if (!isLoading) {
      const items = gridRef.current?.querySelectorAll('.shop-item');
      items?.forEach(item => observer.observe(item));
    }
    return () => observer.disconnect();
  }, [isLoading]);

  useEffect(() => {
    if (location.hash && !isLoading) {
      const elementId = location.hash.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }, 100);
      }
    }
  }, [location.hash, isLoading]);

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground/40 font-body text-sm font-light uppercase tracking-[0.2em]">
          Loading...
        </div>
      </div>;
  }

  const handleCardClick = (item: typeof collectionItems[0]) => {
    navigate(`/collection/${item.slug}`);
  };

  const renderProductContent = () => {
    switch (activeProduct) {
      case 'tablecloths':
        return <TableclothsContent basePath="/collection/tablecloths" />;
      case 'napkins':
        return <NapkinsContent basePath="/collection/napkins" />;
      case 'work-wear':
        return <WorkWearContent basePath="/collection/work-wear" />;
      case 'kitchen-linen':
        return <KitchenLinenContent basePath="/collection/kitchen-linen" />;
      case 'bed-linen':
        return <BedLinenContent basePath="/collection/bed-linen" />;
      case 'towel':
        return <TowelsContent basePath="/collection/towel" />;
      case 'damask':
        return <DamaskContent basePath="/collection/damask" />;
      case 'round-tablecloths':
        return <RoundTableclothsContent basePath="/collection/round-tablecloths" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header with Event Button */}
          <div className="mb-12 relative">
            <div className="mb-6 md:mb-0 md:absolute md:top-0 md:right-0">
              <Link to="/events">
                <Button 
                  className="bg-gradient-to-r from-accent to-accent-blue hover:from-accent-blue hover:to-accent text-white shadow-lg hover:shadow-xl transition-all duration-300 group font-body w-full md:w-auto"
                >
                  <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  Looking for events?
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-accent to-accent-blue" />
              <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-foreground/60">
                Our Collection
              </span>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl font-light text-foreground leading-tight mb-6">
              Everything You Need,
              <br />
              <span className="text-accent">All in One Place</span>
            </h1>
            
            <p className="text-foreground/70 font-body leading-relaxed text-lg max-w-3xl">From restaurant linen to event hire and chef whites, we have what you need to keep your business or event running smoothly. 
Click through to see what we have and let us know what you need.</p>
          </div>

          {/* Collection Items Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6">
            {collectionItems.map((item, index) => {
            const currentImageIndex = currentImageIndices[item.id] || 0;
            return <div key={item.id} id={item.slug} data-item-id={item.id} className={`shop-item relative transition-all duration-700 hover:scale-[1.02] group cursor-pointer h-full flex flex-col ${visibleItems.includes(item.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{
              transitionDelay: `${index * 100}ms`
            }} onClick={() => handleCardClick(item)} onMouseEnter={() => {
              setIsHovered(prev => ({
                ...prev,
                [item.id]: true
              }));
            }} onMouseLeave={() => {
              setIsHovered(prev => ({
                ...prev,
                [item.id]: false
              }));
            }}>
                  {/* Main Image with Auto-Carousel */}
                  <div className="relative aspect-[5/4] overflow-hidden rounded-lg">
                    <img src={item.galleryImages[currentImageIndex] || item.mainImage} alt={`${item.title} ${currentImageIndex + 1}`} className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105" loading="eager" style={{
                  imageRendering: 'crisp-edges'
                }} />
                    
                    {/* Popular Badge */}
                    {item.popular && <Badge className="absolute top-3 left-3 bg-gradient-to-r from-accent to-accent-blue text-white border-0">
                        Popular
                      </Badge>}
                    
                    {/* Color circles - top right */}
                    {item.colors && <div className="absolute top-3 right-3 flex gap-1.5 z-20">
                        {item.colors.map((color, colorIndex) => <button key={colorIndex} onClick={e => {
                    e.stopPropagation();
                    handleColorSwatchClick(item.id, colorIndex);
                  }} className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer border ${colorIndex === currentImageIndex ? 'border-white scale-110 ring-1 ring-white/50 shadow-lg' : 'border-white/60 hover:border-white'}`} style={{
                    backgroundColor: color.hex
                  }} aria-label={`View ${color.name}`} title={color.name}>
                            {color.hex === '#FFFFFF' && <div className="w-full h-full rounded-full border border-gray-300" />}
                          </button>)}
                      </div>}
                    
                    {/* Button Navigation */}
                    {item.galleryImages.length > 1 && <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                        {item.galleryImages.map((_, dotIndex) => <button key={dotIndex} className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer border-2 ${dotIndex === currentImageIndex ? 'bg-white border-white shadow-xl' : 'bg-white/40 border-white/80 hover:bg-white/70 hover:border-white'}`} onClick={e => {
                    e.stopPropagation();
                    handleColorSwatchClick(item.id, dotIndex);
                  }} aria-label={`View image ${dotIndex + 1} of ${item.title}`} />)}
                      </div>}
                  </div>
                
                {/* Item Content */}
                <div className="mt-4 flex flex-col flex-1 min-h-[150px]">
                  <h3 className="font-display text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300 mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-foreground/60 text-sm leading-relaxed mb-4 flex-grow">
                    {item.description}
                  </p>
                  
                  {/* Action button */}
                  <div className="flex items-center text-foreground/60 group-hover:text-foreground transition-colors duration-300 mt-auto">
                    <span className="text-sm font-light uppercase tracking-wide">
                      View Details
                    </span>
                    <div className="w-4 h-px bg-current ml-3 group-hover:w-8 transition-all duration-300" />
                  </div>
                </div>
              </div>;
          })}
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

export default Collection;
