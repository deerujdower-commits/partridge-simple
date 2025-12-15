import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, Award, Clock, Truck, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import EnquiryModal from '@/components/EnquiryModal';
import CollectionModal from '@/components/CollectionModal';
import WhyUsSection from '@/components/WhyUsSection';
// Tablecloth images
const studioFittedWhiteTablecloth = '/lovable-uploads/cf54b1ce-fef7-4ac1-8bbc-34b126347063.png';
const studioFittedBlackTableclothV2 = '/lovable-uploads/e059eed4-9708-4d5a-8545-42094ce503da.png';
const studioFittedIvoryTableclothV2 = '/lovable-uploads/788eb1d4-c9b5-434b-8d56-65ffdcd67cb8.png';

// Napkin images
import studioFittedWhiteNapkins from '@/assets/studio-fitted-white-napkins.jpg';
import studioFittedBlackNapkins from '@/assets/studio-fitted-black-napkins.jpg';
import studioFittedIvoryNapkins from '@/assets/studio-fitted-ivory-napkins.jpg';

// Kitchen images
import kitchenClothWonderdryGreen from '@/assets/kitchen-cloth-wonderdry-green.jpeg';
import kitchenClothHerringboneGreen from '@/assets/kitchen-cloth-herringbone-green.jpeg';
import kitchenClothHerringboneBlue from '@/assets/kitchen-cloth-herringbone-blue.png';
import kitchenClothMicrofibre from '@/assets/kitchen-cloth-microfibre.png';
import kitchenClothOven from '@/assets/kitchen-cloth-oven.png';
import kitchenClothGlass from '@/assets/kitchen-cloth-glass.jpeg';
import kitchenClothPolishing from '@/assets/kitchen-cloth-polishing.jpeg';

// Workwear images
import chefSuitWhiteFull from '@/assets/chef-suit-white-full.jpg';
import chefSuitBlackFull from '@/assets/chef-suit-black-full.png';
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
import restaurantHero from '@/assets/restaurant-hero.jpg';
import restaurantClient1 from '@/assets/restaurant-client-1.webp';

const Restaurant = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromNav = location.state?.fromNav === true;
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState<{ id: number; title: string; description: string; images: string[]; slug: string } | null>(null);

  const modalData = {
    'tablecloths': {
      id: 1,
      title: 'Tablecloths',
      description: 'Classic square tablecloths in white, black, and ivory perfect for any dining occasion.',
      images: [studioFittedWhiteTablecloth, studioFittedIvoryTableclothV2, studioFittedBlackTableclothV2],
      slug: 'tablecloths'
    },
    'napkins': {
      id: 3,
      title: 'Napkins',
      description: 'Premium cloth napkins in white, black, and ivory to complement any table setting.',
      images: [studioFittedWhiteNapkins, studioFittedIvoryNapkins, studioFittedBlackNapkins],
      slug: 'napkins'
    },
    'kitchen-linen': {
      id: 6,
      title: 'Kitchen Linen',
      description: 'Professional kitchen towels and cloths in various patterns and colors for commercial and domestic use.',
      images: [kitchenClothWonderdryGreen, kitchenClothHerringboneGreen, kitchenClothHerringboneBlue, kitchenClothMicrofibre, kitchenClothOven, kitchenClothGlass, kitchenClothPolishing],
      slug: 'kitchen-linen'
    },
    'work-wear': {
      id: 5,
      title: 'Work Wear',
      description: 'Professional chef jackets, trousers, and aprons designed for comfort and durability in commercial kitchens.',
      images: [
        chefSuitWhiteFull,
        chefSuitBlackFull,
        chefJacketWhite, 
        chefJacketWhiteModel,
        chefJacketBlack,
        chefJacketBlackModel,
        chefJacketShortWhite,
        chefJacketShortWhiteModel,
        chefJacketShortBlack,
        chefJacketShortBlackModel,
        chefTrouserCheck,
        chefTrouserCheckModel,
        chefTrouserBlack,
        chefTrouserBlackModel,
        apron,
        apronModel
      ],
      slug: 'work-wear'
    }
  };

  const restaurantProducts = [
    {
      title: 'Tablecloths',
      description: 'Classic square tablecloths in white, black, and ivory perfect for fine dining.',
      images: [studioFittedWhiteTablecloth],
      modalSlug: 'tablecloths'
    },
    {
      title: 'Napkins',
      description: 'Premium cloth napkins to complement any table setting.',
      images: [studioFittedWhiteNapkins],
      modalSlug: 'napkins'
    },
    {
      title: 'Kitchen Linen',
      description: 'Professional kitchen towels and cloths for commercial use.',
      images: [kitchenClothWonderdryGreen],
      modalSlug: 'kitchen-linen'
    },
    {
      title: 'Work Wear',
      description: 'Professional chef uniforms designed for comfort and durability.',
      images: [chefSuitWhiteFull],
      modalSlug: 'work-wear'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img 
          src={restaurantHero} 
          alt="Elegant restaurant table setting with white tablecloth and napkins"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-px bg-white" />
              <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Restaurant Linens
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Commercial Restaurant Linen Hire
            </h1>
          </div>
        </div>
      </section>
      
      <main className="flex-grow py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Back Button - only show if not from nav dropdown */}
          {!fromNav && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          )}

          {/* Header */}
          <div className="mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-6">
              London & South East
            </h2>
            
            <p className="text-foreground/70 font-body leading-relaxed text-lg max-w-3xl">
              From elegant tablecloths and napkins to professional kitchen linens and crisp chef uniforms, we provide everything required to run a successful restaurant with style and efficiency. Our comprehensive commercial linen hire service ensures you have the quality products you need, delivered reliably.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {restaurantProducts.map((product, index) => (
              <div 
                key={index} 
                className="bg-card rounded-lg overflow-hidden hover:shadow-[var(--shadow-elegant)] transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedModal(modalData[product.modalSlug as keyof typeof modalData])}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-light text-foreground mb-3">
                    {product.title}
                  </h3>
                  <p className="text-foreground/70 font-body leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center text-foreground/60 hover:text-foreground transition-colors duration-300">
                    <span className="text-sm font-light uppercase tracking-wide">View Collection</span>
                    <div className="w-4 h-px bg-current ml-3 transition-all duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Us Section */}
          <WhyUsSection
            heading="Trusted for 30 Years and Counting"
            subheading="Commercial linen solutions for an endless list of establishments. Our portfolio of clientele speaks for itself."
            imagePlaceholder={restaurantClient1}
            features={[
              {
                title: "Quality Service",
                description: "We pride ourselves on providing a bespoke, 24-hour round the clock service.",
                icon: Award
              },
              {
                title: "Quick Turnaround",
                description: "We offer multiple weekly rotations to guarantee fresh linen on all days.",
                icon: Clock
              },
              {
                title: "Nationwide Delivery",
                description: "Fleets delivering linen nationwide all over the UK, every single day.",
                icon: Truck
              },
              {
                title: "Family Heritage",
                description: "Generations of trust, quality and heritage brought forward to present day.",
                icon: Users
              }
            ]}
          />

          {/* CTA Section */}
          <div className="bg-black rounded-lg p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
            
            <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
              Like what you see?
            </h2>
            <p className="text-white/70 font-body leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
              Tell us what you need and we'll put together a quote for you. Whether it's for a single event or regular service, we're here to help.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => setIsEnquiryOpen(true)}
                variant="outline"
                className="font-body border-white/20 bg-white text-black hover:bg-white/90"
              >
                <Mail className="w-4 h-4 mr-2" />
                Request a Quote
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/contact')}
                className="font-body border-white/20 bg-white text-black hover:bg-white/90"
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
      {selectedModal && (
        <CollectionModal
          isOpen={selectedModal !== null}
          onClose={() => setSelectedModal(null)}
          category={{
            id: selectedModal.id,
            title: selectedModal.title,
            subtitle: '',
            description: selectedModal.description,
            images: selectedModal.images,
            slug: selectedModal.slug
          }}
        />
      )}
    </div>
  );
};

export default Restaurant;
