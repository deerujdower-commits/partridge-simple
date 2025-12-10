import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import studio fitted images
import studioFittedWhiteNapkins from '@/assets/studio-fitted-white-napkins.jpg';
import studioFittedBlackNapkins from '@/assets/studio-fitted-black-napkins.jpg';
import studioFittedIvoryNapkins from '@/assets/studio-fitted-ivory-napkins.jpg';

const products = [
  {
    id: 1,
    name: 'Classic White Napkins',
    slug: 'white',
    price: '£24',
    description: 'Premium white cloth napkins perfect for fine dining and special occasions.',
    image: studioFittedWhiteNapkins,
  },
  {
    id: 2,
    name: 'Ivory Elegance Napkins',
    slug: 'ivory',
    price: '£26',
    description: 'Refined ivory napkins that add warmth and sophistication to any dining experience.',
    image: studioFittedIvoryNapkins,
  },
  {
    id: 3,
    name: 'Elegant Black Napkins',
    slug: 'black',
    price: '£28',
    description: 'Sophisticated black napkins that add elegance to any table setting.',
    image: studioFittedBlackNapkins,
  }
];

const colorSwatches = [
  { name: 'White', slug: 'white', hex: '#FFFFFF' },
  { name: 'Ivory', slug: 'ivory', hex: '#FFFDD0' },
  { name: 'Black', slug: 'black', hex: '#000000' }
];

const Napkins = () => {
  const { color } = useParams();
  const navigate = useNavigate();

  // Find the selected product based on URL color param
  const selectedProduct = products.find(p => p.slug === color) || products[0];

  // Update URL when color changes
  const handleColorSelect = (colorSlug: string) => {
    navigate(`/collection/napkins/${colorSlug}`);
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
            to="/collection" 
            className="inline-flex items-center text-foreground/60 hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collection
          </Link>

          {/* Page header */}
          <div className="mb-12">
            <h1 className="font-display text-5xl md:text-7xl font-light text-foreground tracking-tight mb-4">
              Napkins
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Premium cloth napkins in white, black, and ivory to complement any table setting.
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
                <p className="text-2xl font-light text-foreground mb-6">
                  {selectedProduct.price}
                </p>
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
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-200 ${
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

export default Napkins;