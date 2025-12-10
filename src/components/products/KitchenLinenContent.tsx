import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

const kitchenClothGreen = '/lovable-uploads/027eb211-99a4-4e7d-8d3f-91a396f0b82a.png';
const kitchenClothBlue = '/lovable-uploads/21a97c9a-3bd0-417c-b445-5ae091c4192f.png';
const kitchenClothRed = '/lovable-uploads/2733f275-4abc-4211-8663-e86feb172f9d.png';

const products = [
  { id: 1, name: 'Kitchen Cloth - Green', slug: 'green', description: 'Durable kitchen cloth in green, perfect for commercial kitchens.', image: kitchenClothGreen },
  { id: 2, name: 'Kitchen Cloth - Blue', slug: 'blue', description: 'Professional blue kitchen cloth for everyday use.', image: kitchenClothBlue },
  { id: 3, name: 'Kitchen Cloth - Red', slug: 'red', description: 'High-visibility red kitchen cloth for food prep areas.', image: kitchenClothRed }
];

interface KitchenLinenContentProps {
  basePath?: string;
}

const KitchenLinenContent = ({ basePath = '/collection/kitchen-linen' }: KitchenLinenContentProps) => {
  const [selectedType, setSelectedType] = useState('green');

  const selectedProduct = products.find(p => p.slug === selectedType) || products[0];

  const handleProductSelect = (productSlug: string) => {
    setSelectedType(productSlug);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-light text-foreground mb-2">Kitchen Linen</h2>
        <p className="text-muted-foreground">Professional kitchen cloths for commercial use.</p>
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

export default KitchenLinenContent;