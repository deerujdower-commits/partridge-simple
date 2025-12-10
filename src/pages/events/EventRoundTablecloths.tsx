import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import SizeGuideDialog from '@/components/SizeGuideDialog';

// Import studio fitted round images
import studioFittedWhiteRoundTablecloth from '@/assets/studio-fitted-white-round-tablecloth.jpg';
import studioFittedBlackRoundTablecloth from '@/assets/studio-fitted-black-round-tablecloth.jpg';
import studioFittedIvoryRoundTablecloth from '@/assets/studio-fitted-ivory-round-tablecloth.jpg';

const products = [
  {
    id: 1,
    name: 'Classic White Round Tablecloth',
    slug: 'white',
    description: 'Premium white round tablecloth crafted from 100% cotton. Perfect for round tables and elegant dining.',
    image: studioFittedWhiteRoundTablecloth,
  },
  {
    id: 2,
    name: 'Premium Ivory Round Tablecloth',
    slug: 'ivory',
    description: 'Our signature ivory round tablecloth with enhanced durability and luxurious feel for round tables.',
    image: studioFittedIvoryRoundTablecloth,
  },
  {
    id: 3,
    name: 'Elegant Black Round Tablecloth',
    slug: 'black',
    description: 'Sophisticated black round tablecloth that adds drama and elegance to any circular dining setting.',
    image: studioFittedBlackRoundTablecloth,
  }
];

const colorSwatches = [
  { name: 'White', slug: 'white', hex: '#FFFFFF' },
  { name: 'Ivory', slug: 'ivory', hex: '#FFFDD0' },
  { name: 'Black', slug: 'black', hex: '#000000' }
];

const sizes = ['88', '108', '120', '130'];

const EventRoundTablecloths = () => {
  const { color, size } = useParams();

  // Use local state for selections
  const [selectedColorSlug, setSelectedColorSlug] = useState(color || products[0].slug);
  const [selectedSize, setSelectedSize] = useState(sizes.includes(size || '') ? size : sizes[1]);

  // Sync with URL params on mount/change
  useEffect(() => {
    if (color) setSelectedColorSlug(color);
    if (size && sizes.includes(size)) setSelectedSize(size);
  }, [color, size]);

  const selectedProduct = products.find(p => p.slug === selectedColorSlug) || products[0];

  // Update URL when color changes
  const handleColorSelect = (colorSlug: string) => {
    setSelectedColorSlug(colorSlug);
    window.history.pushState({}, '', `/events/round-tablecloths/${colorSlug}${selectedSize ? `/${selectedSize}` : ''}`);
  };

  // Update URL when size changes
  const handleSizeSelect = (newSize: string) => {
    setSelectedSize(newSize);
    window.history.pushState({}, '', `/events/round-tablecloths/${selectedColorSlug}/${newSize}`);
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
              Round Tablecloths
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Elegant round tablecloths in white, black, and ivory. Perfect for circular tables and sophisticated dining.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
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
                      src={product.image}
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
                <div className="flex gap-4">
                  {colorSwatches.map((swatch) => (
                    <button
                      key={swatch.slug}
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-200 relative overflow-hidden ${
                        selectedProduct.slug === swatch.slug ? 'border-primary scale-110 ring-2 ring-primary/20' : 'border-border hover:scale-105'
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                      onClick={() => handleColorSelect(swatch.slug)}
                      title={swatch.name}
                      aria-label={`Color: ${swatch.name}`}
                    >
                      {swatch.slug === 'white' && (
                        <div className="w-full h-full rounded-full border border-gray-200" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-foreground">Size</h3>
                  <SizeGuideDialog type="round" availableSizes={sizes.map(s => `${s}"`)} />
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
                      <span className="text-sm text-foreground">{sizeOption}"</span>
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

export default EventRoundTablecloths;
