import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

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

const categories = [
  {
    name: 'Chef Jackets',
    slug: 'chef-jackets',
    products: [
      { name: 'White Long Sleeve', slug: 'white-long', image: chefJacketWhite, modelImage: chefJacketWhiteModel, price: '£28' },
      { name: 'Black Long Sleeve', slug: 'black-long', image: chefJacketBlack, modelImage: chefJacketBlackModel, price: '£28' },
      { name: 'White Short Sleeve', slug: 'white-short', image: chefJacketShortWhite, modelImage: chefJacketShortWhiteModel, price: '£25' },
      { name: 'Black Short Sleeve', slug: 'black-short', image: chefJacketShortBlack, modelImage: chefJacketShortBlackModel, price: '£25' }
    ]
  },
  {
    name: 'Chef Trousers',
    slug: 'chef-trousers',
    products: [
      { name: 'Check Pattern', slug: 'check', image: chefTrouserCheck, modelImage: chefTrouserCheckModel, price: '£22' },
      { name: 'Black', slug: 'black', image: chefTrouserBlack, modelImage: chefTrouserBlackModel, price: '£22' }
    ]
  },
  {
    name: 'Aprons',
    slug: 'aprons',
    products: [
      { name: 'Classic Apron', slug: 'classic', image: apron, modelImage: apronModel, price: '£15' }
    ]
  }
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

interface WorkWearContentProps {
  basePath?: string;
}

const WorkWearContent = ({ basePath = '/collection/work-wear' }: WorkWearContentProps) => {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('chef-jackets');
  const [selectedProductSlug, setSelectedProductSlug] = useState('white-long');

  const selectedCategory = categories.find(c => c.slug === selectedCategorySlug) || categories[0];
  const selectedProduct = selectedCategory.products.find(p => p.slug === selectedProductSlug) || selectedCategory.products[0];

  const handleCategorySelect = (categorySlug: string) => {
    const cat = categories.find(c => c.slug === categorySlug);
    if (cat) {
      setSelectedCategorySlug(categorySlug);
      setSelectedProductSlug(cat.products[0].slug);
    }
  };

  const handleProductSelect = (productSlug: string) => {
    setSelectedProductSlug(productSlug);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-light text-foreground mb-2">Work Wear</h2>
        <p className="text-muted-foreground">Professional chef apparel for commercial kitchens.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product image */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img src={selectedProduct.modelImage || selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {selectedCategory.products.map((product) => (
              <button
                key={product.slug}
                onClick={() => handleProductSelect(product.slug)}
                className={`aspect-square rounded overflow-hidden border-2 transition-all ${selectedProduct.slug === product.slug ? 'border-primary' : 'border-transparent hover:border-muted-foreground/30'}`}
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
            <p className="text-lg font-medium text-foreground">{selectedProduct.price}</p>
          </div>

          {/* Category Selection */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Category</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={`px-4 py-2 border rounded text-sm transition-colors ${selectedCategory.slug === cat.slug ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Selection */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Style</h4>
            <div className="flex flex-wrap gap-2">
              {selectedCategory.products.map((product) => (
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

          {/* Size Selection */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Size</h4>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 border border-border rounded text-sm hover:border-primary transition-colors"
                >
                  {size}
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

export default WorkWearContent;