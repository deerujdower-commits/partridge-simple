import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import SizeGuideDialog from '@/components/SizeGuideDialog';

import studioFittedWhiteRoundTablecloth from '@/assets/studio-fitted-white-round-tablecloth.jpg';
import studioFittedBlackRoundTablecloth from '@/assets/studio-fitted-black-round-tablecloth.jpg';
import studioFittedIvoryRoundTablecloth from '@/assets/studio-fitted-ivory-round-tablecloth.jpg';

const products = [
  { id: 1, name: 'Classic White Round Tablecloth', slug: 'white', description: 'Premium white round tablecloth crafted from 100% cotton.', image: studioFittedWhiteRoundTablecloth },
  { id: 2, name: 'Premium Ivory Round Tablecloth', slug: 'ivory', description: 'Our signature ivory round tablecloth with enhanced durability.', image: studioFittedIvoryRoundTablecloth },
  { id: 3, name: 'Elegant Black Round Tablecloth', slug: 'black', description: 'Sophisticated black round tablecloth for elegant settings.', image: studioFittedBlackRoundTablecloth }
];

const colorSwatches = [
  { name: 'White', slug: 'white', hex: '#FFFFFF' },
  { name: 'Ivory', slug: 'ivory', hex: '#FFFDD0' },
  { name: 'Black', slug: 'black', hex: '#000000' }
];

const sizes = ['88"', '108"', '118"', '130"'];

interface RoundTableclothsContentProps {
  basePath?: string;
  useUrlRouting?: boolean;
}

const RoundTableclothsContent = ({ basePath = '/events/round-tablecloths', useUrlRouting = false }: RoundTableclothsContentProps) => {
  const { color, size } = useParams();
  const navigate = useNavigate();

  // Use local state for selections to avoid re-renders
  const [selectedColorSlug, setSelectedColorSlug] = useState(color || products[0].slug);
  const [selectedSizeValue, setSelectedSizeValue] = useState(
    sizes.find(s => s.toLowerCase().replace(/[" ]/g, '') === size?.toLowerCase()) || ''
  );

  // Sync with URL params on mount/change
  useEffect(() => {
    if (color) setSelectedColorSlug(color);
    if (size) {
      const matchedSize = sizes.find(s => s.toLowerCase().replace(/[" ]/g, '') === size.toLowerCase());
      if (matchedSize) setSelectedSizeValue(matchedSize);
    }
  }, [color, size]);

  const selectedProduct = products.find(p => p.slug === selectedColorSlug) || products[0];

  const handleColorSelect = (colorSlug: string) => {
    setSelectedColorSlug(colorSlug);
    if (useUrlRouting) {
      const sizeSlug = selectedSizeValue ? `/${selectedSizeValue.toLowerCase().replace(/[" ]/g, '')}` : '';
      navigate(`${basePath}/${colorSlug}${sizeSlug}`, { replace: false });
    }
  };

  const handleSizeSelect = (newSize: string) => {
    setSelectedSizeValue(newSize);
    if (useUrlRouting) {
      const sizeSlug = newSize.toLowerCase().replace(/[" ]/g, '');
      navigate(`${basePath}/${selectedColorSlug}/${sizeSlug}`, { replace: false });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-light text-foreground mb-2">Round Tablecloths</h2>
        <p className="text-muted-foreground">Elegant round tablecloths for round tables.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product image */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => handleColorSelect(product.slug)}
                className={`aspect-square rounded overflow-hidden border-2 transition-all ${selectedProduct.id === product.id ? 'border-primary' : 'border-transparent hover:border-muted-foreground/30'}`}
              >
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product details */}
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-2xl font-light text-foreground mb-2">{selectedProduct.name}</h3>
            <p className="text-muted-foreground">{selectedProduct.description}</p>
          </div>

          {/* Color Selection */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Color</h4>
            <div className="flex gap-3">
              {colorSwatches.map((swatch) => (
                <button
                  type="button"
                  key={swatch.slug}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${selectedProduct.slug === swatch.slug ? 'border-primary scale-110 ring-2 ring-primary/20' : 'border-border hover:scale-105'}`}
                  style={{ backgroundColor: swatch.hex }}
                  onClick={() => handleColorSelect(swatch.slug)}
                  title={swatch.name}
                >
                  {swatch.slug === 'white' && <div className="w-full h-full rounded-full border border-gray-200" />}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-foreground">Size</h4>
              <SizeGuideDialog type="round" availableSizes={sizes.map(s => s.replace(/"/g, ''))} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {sizes.map((sizeOption) => (
                <button
                  type="button"
                  key={sizeOption}
                  onClick={() => handleSizeSelect(sizeOption)}
                  className={`p-2 border rounded text-sm transition-colors ${selectedSizeValue === sizeOption ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'}`}
                >
                  {sizeOption}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 pt-2">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Enquiry
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/enquiry">View Enquiry</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundTableclothsContent;