import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import SizeGuideDialog from '@/components/SizeGuideDialog';

// Import damask tablecloth images
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

// Import 70x144 damask images
import damaskBlack70x144 from '@/assets/damask-black-70x144.png';
import damaskGold70x144 from '@/assets/damask-gold-70x144.png';
import damaskPink70x144 from '@/assets/damask-pink-70x144.png';
import damaskSilver70x144 from '@/assets/damask-silver-70x144.png';
import damaskIvory70x144 from '@/assets/damask-ivory-70x144.png';
import damaskWhite70x144 from '@/assets/damask-white-70x144.png';

const products = [
  {
    id: 1,
    name: 'Black Damask',
    slug: 'black',
    description: 'Sophisticated black damask with intricate baroque patterns, perfect for elegant evening events.',
    image: damaskBlack,
    napkinImage: damaskBlackNapkin,
    image70x144: damaskBlack70x144,
  },
  {
    id: 2,
    name: 'Gold Damask',
    slug: 'gold',
    description: 'Luxurious gold damask tablecloth with intricate woven patterns and metallic threads. Perfect for upscale dining.',
    image: damaskGold,
    napkinImage: damaskGoldNapkin,
    image70x144: damaskGold70x144,
  },
  {
    id: 3,
    name: 'Pink Damask',
    slug: 'pink',
    description: 'Romantic pink damask featuring delicate patterns, ideal for weddings and special celebrations.',
    image: damaskPink,
    napkinImage: damaskPinkNapkin,
    image70x144: damaskPink70x144,
  },
  {
    id: 4,
    name: 'Silver Damask',
    slug: 'silver',
    description: 'Sophisticated silver damask tablecloth featuring elegant patterns and metallic accents for luxury dining.',
    image: damaskSilver,
    napkinImage: damaskSilverNapkin,
    image70x144: damaskSilver70x144,
  },
  {
    id: 5,
    name: 'Ivory Damask',
    slug: 'ivory',
    description: 'Classic ivory damask with timeless elegance, perfect for any sophisticated dining occasion.',
    image: damaskIvory,
    napkinImage: damaskIvoryNapkin,
    image70x144: damaskIvory70x144,
  },
  {
    id: 6,
    name: 'White Damask',
    slug: 'white',
    description: 'Elegant white damask with intricate baroque patterns that complement any fine dining setting.',
    image: damaskWhite,
    napkinImage: damaskWhiteNapkin,
    image70x144: damaskWhite70x144,
  }
];

const colorSwatches = [
  { name: 'Black', slug: 'black', hex: '#1a1a1a' },
  { name: 'Gold', slug: 'gold', hex: '#D4AF37' },
  { name: 'Pink', slug: 'pink', hex: '#d4a5a5' },
  { name: 'Silver', slug: 'silver', hex: '#C0C0C0' },
  { name: 'Ivory', slug: 'ivory', hex: '#f5f0e8' },
  { name: 'White', slug: 'white', hex: '#FFFFFF' }
];

const sizes = ['Round 88"', 'Round 108"', 'Round 118"', 'Round 130"', '70" x 144"', 'Napkin'];

const EventDamask = () => {
  const { color, size } = useParams();

  // Use local state for selections
  const [selectedColorSlug, setSelectedColorSlug] = useState(color || products[0].slug);
  const [selectedSize, setSelectedSize] = useState(
    sizes.find(s => s.toLowerCase().replace(/[" ]/g, '') === size?.toLowerCase()) || ''
  );

  // Sync with URL params on mount/change
  useEffect(() => {
    if (color) setSelectedColorSlug(color);
    if (size) {
      const matchedSize = sizes.find(s => s.toLowerCase().replace(/[" ]/g, '') === size.toLowerCase());
      if (matchedSize) setSelectedSize(matchedSize);
    }
  }, [color, size]);

  const selectedProduct = products.find(p => p.slug === selectedColorSlug) || products[0];

  // Get the appropriate image based on size selection
  const getCurrentImage = () => {
    if (selectedSize === 'Napkin') {
      return selectedProduct.napkinImage;
    }
    if (selectedSize === '70" x 144"') {
      return selectedProduct.image70x144;
    }
    return selectedProduct.image;
  };

  // Update URL when color changes
  const handleColorSelect = (colorSlug: string) => {
    setSelectedColorSlug(colorSlug);
    const sizeSlug = selectedSize ? `/${selectedSize.toLowerCase().replace(/[" ]/g, '')}` : '';
    window.history.pushState({}, '', `/events/damask/${colorSlug}${sizeSlug}`);
  };

  // Update URL when size changes
  const handleSizeSelect = (newSize: string) => {
    setSelectedSize(newSize);
    const sizeSlug = newSize.toLowerCase().replace(/[" ]/g, '');
    window.history.pushState({}, '', `/events/damask/${selectedColorSlug}/${sizeSlug}`);
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Back link */}
          <Link 
            to="/events" 
            className="inline-flex items-center text-foreground/60 hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Event Hire
          </Link>

          {/* Page header */}
          <div className="mb-12">
            <h1 className="font-display text-5xl md:text-7xl font-light text-foreground tracking-tight mb-4">
              Damask
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Exquisite damask tablecloths with intricate woven patterns in six elegant colors. Perfect for special occasions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={getCurrentImage()}
                  alt={`${selectedProduct.name} ${selectedSize || ''}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {/* Thumbnail grid */}
              <div className="grid grid-cols-3 gap-2">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleColorSelect(product.slug)}
                    className={`aspect-square rounded overflow-hidden border-2 transition-all ${
                      selectedProduct.id === product.id 
                        ? 'border-primary' 
                        : 'border-transparent hover:border-muted-foreground/30'
                    }`}
                  >
                    <img
                      src={selectedSize === 'Napkin' ? product.napkinImage : selectedSize === '70" x 144"' ? product.image70x144 : product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product details */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl font-light text-foreground mb-2">
                  {selectedProduct.name}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="font-medium text-foreground mb-4">Color</h3>
                <div className="flex flex-wrap gap-3">
                  {colorSwatches.map((swatch) => (
                    <button
                      key={swatch.slug}
                      className={`w-14 h-14 rounded-lg border-2 transition-all duration-200 overflow-hidden ${
                        selectedProduct.slug === swatch.slug ? 'border-primary scale-110 ring-2 ring-primary/20' : 'border-border hover:scale-105'
                      }`}
                      onClick={() => handleColorSelect(swatch.slug)}
                      title={swatch.name}
                      aria-label={`Color: ${swatch.name}`}
                    >
                      <div 
                        className="w-full h-full relative"
                        style={{ 
                          background: `linear-gradient(45deg, ${swatch.hex} 25%, ${swatch.hex}dd 25%, ${swatch.hex}dd 50%, ${swatch.hex} 50%, ${swatch.hex} 75%, ${swatch.hex}dd 75%), repeating-conic-gradient(from 0deg at 50% 50%, ${swatch.hex}cc 0deg, ${swatch.hex}dd 45deg, ${swatch.hex} 90deg, ${swatch.hex}dd 135deg, ${swatch.hex}cc 180deg)`,
                          backgroundSize: '8px 8px, 16px 16px'
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-foreground">Size</h3>
                  <SizeGuideDialog type="both" availableSizes={['70x144', '88"', '108"', '118"', '130"']} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {sizes.map((sizeOption) => (
                    <button
                      key={sizeOption}
                      onClick={() => handleSizeSelect(sizeOption)}
                      className={`p-3 border rounded transition-colors text-left ${
                        selectedSize === sizeOption 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      <span className="text-sm text-foreground">{sizeOption}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-4 pt-4">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Enquiry
                </Button>
                <Button variant="outline" className="w-full h-12" asChild>
                  <Link to="/enquiry">View Enquiry</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventDamask;
