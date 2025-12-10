import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const categories = [
  {
    id: 'chef-jacket',
    name: 'Chef Jackets',
    slug: 'chef-jacket',
    description: 'Professional chef jackets in white and black, available in long and short sleeve styles.',
    products: [
      { name: 'Long Sleeve White', slug: 'white', image: chefJacketWhite, modelImage: chefJacketWhiteModel, price: '£35' },
      { name: 'Long Sleeve Black', slug: 'black', image: chefJacketBlack, modelImage: chefJacketBlackModel, price: '£38' },
      { name: 'Short Sleeve White', slug: 'short-white', image: chefJacketShortWhite, modelImage: chefJacketShortWhiteModel, price: '£32' },
      { name: 'Short Sleeve Black', slug: 'short-black', image: chefJacketShortBlack, modelImage: chefJacketShortBlackModel, price: '£34' },
    ]
  },
  {
    id: 'chef-trousers',
    name: 'Chef Trousers',
    slug: 'chef-trousers',
    description: 'Comfortable and durable chef trousers in classic black and traditional checkered patterns.',
    products: [
      { name: 'Black Trousers', slug: 'black', image: chefTrouserBlack, modelImage: chefTrouserBlackModel, price: '£28' },
      { name: 'Checkered Trousers', slug: 'check', image: chefTrouserCheck, modelImage: chefTrouserCheckModel, price: '£30' },
    ]
  },
  {
    id: 'aprons',
    name: 'Aprons',
    slug: 'aprons',
    description: 'Professional kitchen aprons designed for comfort and durability.',
    products: [
      { name: 'Classic Apron', slug: 'classic', image: apron, modelImage: apronModel, price: '£18' },
    ]
  },
  {
    id: 'full-suits',
    name: 'Full Chef Suits',
    slug: 'full-suits',
    description: 'Complete chef uniform sets including jacket and trousers.',
    products: [
      { name: 'White Full Suit', slug: 'white', image: chefSuitWhiteFull, modelImage: chefSuitWhiteFull, price: '£60' },
      { name: 'Black Full Suit', slug: 'black', image: chefSuitBlackFull, modelImage: chefSuitBlackFull, price: '£65' },
    ]
  }
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

const WorkWear = () => {
  const { category, color } = useParams();
  const navigate = useNavigate();

  // Find the selected category based on URL param
  const selectedCategory = categories.find(c => c.slug === category) || categories[0];
  const selectedProduct = selectedCategory.products.find(p => p.slug === color) || selectedCategory.products[0];

  // Update URL when category changes
  const handleCategorySelect = (categorySlug: string) => {
    const cat = categories.find(c => c.slug === categorySlug);
    if (cat && cat.products.length > 0) {
      navigate(`/collection/work-wear/${categorySlug}/${cat.products[0].slug}`);
    }
  };

  // Update URL when product changes
  const handleProductSelect = (productSlug: string) => {
    navigate(`/collection/work-wear/${selectedCategory.slug}/${productSlug}`);
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
              Work Wear
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Professional chef jackets, trousers, and aprons designed for comfort and durability in commercial kitchens.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={selectedProduct.modelImage || selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {/* Thumbnail grid */}
              <div className="grid grid-cols-4 gap-2">
                {selectedCategory.products.map((product) => (
                  <button
                    key={product.slug}
                    onClick={() => handleProductSelect(product.slug)}
                    className={`aspect-square rounded overflow-hidden border-2 transition-all ${
                      selectedProduct.slug === product.slug 
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
                  {selectedCategory.description}
                </p>
              </div>

              {/* Category Selection */}
              <div>
                <h3 className="font-medium text-foreground mb-4">Category</h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => handleCategorySelect(cat.slug)}
                      className={`p-3 border rounded transition-colors text-left ${
                        selectedCategory.slug === cat.slug 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      <span className="text-sm text-foreground">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Options */}
              <div>
                <h3 className="font-medium text-foreground mb-4">Options</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedCategory.products.map((product) => (
                    <button
                      key={product.slug}
                      onClick={() => handleProductSelect(product.slug)}
                      className={`p-3 border rounded transition-colors text-left ${
                        selectedProduct.slug === product.slug 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      <span className="text-sm text-foreground">{product.name}</span>
                      <span className="block text-xs text-muted-foreground mt-1">{product.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="font-medium text-foreground mb-4">Size</h3>
                <div className="grid grid-cols-4 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className="p-3 border border-border rounded hover:border-primary transition-colors text-center"
                    >
                      <span className="text-sm text-foreground">{size}</span>
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

export default WorkWear;