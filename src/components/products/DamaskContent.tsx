import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import SizeGuideDialog from '@/components/SizeGuideDialog';

import damaskBlack from '@/assets/damask-black-new.png';
import damaskGold from '@/assets/damask-gold-new.png';
import damaskPink from '@/assets/damask-pink-new.png';
import damaskSilver from '@/assets/damask-silver-new.png';
import damaskIvory from '@/assets/damask-ivory-new.jpeg';
import damaskWhite from '@/assets/damask-white-new.png';
import damaskBlackNapkin from '@/assets/damask-black-napkin.png';
import damaskGoldNapkin from '@/assets/damask-gold-napkin.png';
import damaskPinkNapkin from '@/assets/damask-pink-napkin.png';
import damaskSilverNapkin from '@/assets/damask-silver-napkin.png';
import damaskIvoryNapkin from '@/assets/damask-ivory-napkin.png';
import damaskWhiteNapkin from '@/assets/damask-white-napkin.png';
import damaskBlack70x144 from '@/assets/damask-black-70x144.png';
import damaskGold70x144 from '@/assets/damask-gold-70x144.png';
import damaskPink70x144 from '@/assets/damask-pink-70x144.png';
import damaskSilver70x144 from '@/assets/damask-silver-70x144.png';
import damaskIvory70x144 from '@/assets/damask-ivory-70x144.png';
import damaskWhite70x144 from '@/assets/damask-white-70x144.png';

const products = [
  { id: 1, name: 'Black Damask', slug: 'black', description: 'Sophisticated black damask with intricate baroque patterns.', image: damaskBlack, napkinImage: damaskBlackNapkin, image70x144: damaskBlack70x144 },
  { id: 2, name: 'Gold Damask', slug: 'gold', description: 'Luxurious gold damask tablecloth with intricate woven patterns.', image: damaskGold, napkinImage: damaskGoldNapkin, image70x144: damaskGold70x144 },
  { id: 3, name: 'Pink Damask', slug: 'pink', description: 'Romantic pink damask featuring delicate patterns.', image: damaskPink, napkinImage: damaskPinkNapkin, image70x144: damaskPink70x144 },
  { id: 4, name: 'Silver Damask', slug: 'silver', description: 'Sophisticated silver damask tablecloth featuring elegant patterns.', image: damaskSilver, napkinImage: damaskSilverNapkin, image70x144: damaskSilver70x144 },
  { id: 5, name: 'Ivory Damask', slug: 'ivory', description: 'Classic ivory damask with timeless elegance.', image: damaskIvory, napkinImage: damaskIvoryNapkin, image70x144: damaskIvory70x144 },
  { id: 6, name: 'White Damask', slug: 'white', description: 'Elegant white damask with intricate baroque patterns.', image: damaskWhite, napkinImage: damaskWhiteNapkin, image70x144: damaskWhite70x144 }
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

interface DamaskContentProps {
  basePath?: string;
  useUrlRouting?: boolean;
}

const DamaskContent = ({ basePath = '/events/damask', useUrlRouting = false }: DamaskContentProps) => {
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

  const getCurrentImage = () => {
    if (selectedSizeValue === 'Napkin') return selectedProduct.napkinImage;
    if (selectedSizeValue === '70" x 144"') return selectedProduct.image70x144;
    return selectedProduct.image;
  };

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
        <h2 className="font-display text-3xl font-light text-foreground mb-2">Damask</h2>
        <p className="text-muted-foreground">Luxury damask tablecloths with intricate woven patterns.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product image */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img src={getCurrentImage()} alt={selectedProduct.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {products.slice(0, 6).map((product) => (
              <button
                key={product.id}
                onClick={() => handleColorSelect(product.slug)}
                className={`aspect-square rounded overflow-hidden border-2 transition-all ${selectedProduct.id === product.id ? 'border-primary' : 'border-transparent hover:border-muted-foreground/30'}`}
              >
                <img src={selectedSizeValue === 'Napkin' ? product.napkinImage : selectedSizeValue === '70" x 144"' ? product.image70x144 : product.image} alt={product.name} className="w-full h-full object-cover" />
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
            <div className="flex flex-wrap gap-2">
              {colorSwatches.map((swatch) => (
                <button
                  type="button"
                  key={swatch.slug}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${selectedProduct.slug === swatch.slug ? 'border-primary scale-110 ring-2 ring-primary/20' : 'border-border hover:scale-105'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleColorSelect(swatch.slug);
                  }}
                  title={swatch.name}
                >
                  <div 
                    className="w-full h-full rounded-md"
                    style={{ 
                      background: `linear-gradient(45deg, ${swatch.hex} 25%, ${swatch.hex}dd 25%, ${swatch.hex}dd 50%, ${swatch.hex} 50%, ${swatch.hex} 75%, ${swatch.hex}dd 75%)`,
                      backgroundSize: '8px 8px'
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-foreground">Size</h4>
              <SizeGuideDialog type="both" availableSizes={['70x144', '88"', '108"', '118"', '130"']} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {sizes.map((sizeOption) => (
                <button
                  type="button"
                  key={sizeOption}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSizeSelect(sizeOption);
                  }}
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

export default DamaskContent;
