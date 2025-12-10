import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import new event images
const damaskEventSetup = '/lovable-uploads/ba3431f5-20fc-4ca2-b912-c91a1395793e.png';
const conferenceRoomSetup = '/lovable-uploads/ba361677-0711-413a-901e-2ef6e8e9905c.png';
const goldEventSetup = '/lovable-uploads/c70f1b51-9221-4ffa-8db2-bcc1cabaf32e.png';

const products = [
  {
    id: 1,
    name: 'Corporate Event Linens',
    price: '£85',
    description: 'Professional linens specifically designed for corporate events, conferences, and business gatherings.',
    images: [damaskEventSetup, conferenceRoomSetup, goldEventSetup],
    details: ['Professional grade', 'Corporate styling', 'Stain resistant', 'Quick setup']
  },
  {
    id: 2,
    name: 'Luxury Event Collection',
    price: '£125',
    description: 'Premium event linens that create sophisticated environments for high-end corporate occasions.',
    images: [goldEventSetup, damaskEventSetup, conferenceRoomSetup],
    details: ['Luxury materials', 'Elegant designs', 'Custom colors', 'Event coordination']
  },
  {
    id: 3,
    name: 'Conference Tablecloths',
    price: '£65',
    description: 'Professional tablecloths perfect for conference rooms, meeting spaces, and business presentations.',
    images: [conferenceRoomSetup, goldEventSetup, damaskEventSetup],
    details: ['Conference ready', 'Professional appearance', 'Multiple sizes', 'Logo placement']
  }
];

const CorporateEvents = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
  };

  const handleProductSelect = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

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
              Corporate Events
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Sophisticated linens and tablecloths perfect for corporate events, conferences, and business gatherings.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product image with slideshow */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden relative group">
                <img
                  src={selectedProduct.images[currentImageIndex]}
                  alt={`${selectedProduct.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Navigation arrows */}
                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={handlePrevImage}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} className="text-white" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} className="text-white" />
                  </button>
                </div>

                {/* Image indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {selectedProduct.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        i === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Thumbnail grid */}
              <div className="grid grid-cols-3 gap-2">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className={`aspect-square rounded overflow-hidden border-2 transition-all ${
                      selectedProduct.id === product.id 
                        ? 'border-primary' 
                        : 'border-transparent hover:border-muted-foreground/30'
                    }`}
                  >
                    <img
                      src={product.images[0]}
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

              {/* Product details */}
              <div>
                <h3 className="font-medium text-foreground mb-4">Details</h3>
                <ul className="space-y-2">
                  {selectedProduct.details.map((detail, index) => (
                    <li key={index} className="text-muted-foreground flex items-center">
                      <div className="w-1 h-1 bg-current rounded-full mr-3" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Event types */}
              <div>
                <h3 className="font-medium text-foreground mb-4">Event Types</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Board Meetings', 'Conferences', 'Product Launches', 'Networking Events'].map((event) => (
                    <button
                      key={event}
                      className="p-3 border border-border rounded hover:border-primary transition-colors text-left"
                    >
                      <span className="text-sm text-foreground">{event}</span>
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
                <Button variant="outline" className="w-full h-12">
                  Request Quote
                </Button>
              </div>

              {/* Additional info */}
              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Full-service event support available. Corporate account management and volume pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CorporateEvents;