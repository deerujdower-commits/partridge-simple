import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const kitchenLinenImage1 = '/lovable-uploads/027eb211-99a4-4e7d-8d3f-91a396f0b82a.png';
const kitchenLinenImage2 = '/lovable-uploads/21a97c9a-3bd0-417c-b445-5ae091c4192f.png';
const kitchenLinenImage3 = '/lovable-uploads/2733f275-4abc-4211-8663-e86feb172f9d.png';

const products = [
  {
    id: 1,
    name: 'Kitchen Towels - White',
    slug: 'towels-white',
    price: '£18/dozen',
    description: 'Premium white kitchen towels perfect for professional kitchens. Highly absorbent and durable.',
    image: kitchenLinenImage1,
  },
  {
    id: 2,
    name: 'Kitchen Cloths - Striped',
    slug: 'cloths-striped',
    price: '£15/dozen',
    description: 'Classic striped kitchen cloths for everyday use in commercial kitchens.',
    image: kitchenLinenImage2,
  },
  {
    id: 3,
    name: 'Tea Towels - Mixed',
    slug: 'tea-towels',
    price: '£20/dozen',
    description: 'Versatile tea towels in assorted patterns for various kitchen tasks.',
    image: kitchenLinenImage3,
  }
];

const KitchenLinen = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  // Find the selected product based on URL type param
  const selectedProduct = products.find(p => p.slug === type) || products[0];

  // Update URL when product changes
  const handleProductSelect = (productSlug: string) => {
    navigate(`/collection/kitchen-linen/${productSlug}`);
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
              Kitchen Linen
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Professional kitchen towels and cloths in various patterns and colors for commercial and domestic use.
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
                    onClick={() => handleProductSelect(product.slug)}
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

              {/* Product Selection */}
              <div>
                <h3 className="font-medium text-foreground mb-4">Type</h3>
                <div className="grid grid-cols-1 gap-3">
                  {products.map((product) => (
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

export default KitchenLinen;