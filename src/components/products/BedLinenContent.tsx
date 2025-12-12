import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

import hotelBedClean from '@/assets/hotel-bed-clean.jpg';
import hotelBedLinen1 from '@/assets/hotel-bed-linen-1.jpeg';
import hotelBedLinen2 from '@/assets/hotel-bed-linen-2.jpeg';

const products = [
  { id: 1, name: 'Duvet Covers', slug: 'duvet-covers', description: 'Premium duvet covers for hotels and hospitality.', image: hotelBedClean },
  { id: 2, name: 'Bed Sheets', slug: 'bed-sheets', description: 'Luxury bed sheets with high thread count.', image: hotelBedLinen1 },
  { id: 3, name: 'Pillow Cases', slug: 'pillow-cases', description: 'Quality pillow cases to complement your bedding.', image: hotelBedLinen2 }
];

interface BedLinenContentProps {
  basePath?: string;
}

const BedLinenContent = ({ basePath = '/collection/bed-linen' }: BedLinenContentProps) => {
  const [selectedType, setSelectedType] = useState('duvet-covers');

  const selectedProduct = products.find(p => p.slug === selectedType) || products[0];

  const handleProductSelect = (productSlug: string) => {
    setSelectedType(productSlug);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-light text-foreground mb-2">Bed Linen</h2>
        <p className="text-muted-foreground">Premium bed linens for hospitality and residential use.</p>
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
                onClick={() => handleProductSelect(product.slug)}
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

          {/* Product Selection */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Type</h4>
            <div className="flex flex-wrap gap-2">
              {products.map((product) => (
                <button
                  key={product.slug}
                  onClick={() => handleProductSelect(product.slug)}
                  className={`px-4 py-2 border rounded text-sm transition-colors ${selectedProduct.slug === product.slug ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'}`}
                >
                  {product.name}
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

export default BedLinenContent;