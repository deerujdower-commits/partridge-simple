import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EnquiryModal from '@/components/EnquiryModal';
import CollectionModal from '@/components/CollectionModal';

// Tablecloth images
const studioFittedWhiteTablecloth = '/lovable-uploads/cf54b1ce-fef7-4ac1-8bbc-34b126347063.png';
const studioFittedBlackTableclothV2 = '/lovable-uploads/e059eed4-9708-4d5a-8545-42094ce503da.png';
const studioFittedIvoryTableclothV2 = '/lovable-uploads/788eb1d4-c9b5-434b-8d56-65ffdcd67cb8.png';

// Napkin images
import studioFittedWhiteNapkins from '@/assets/studio-fitted-white-napkins.jpg';
import studioFittedBlackNapkins from '@/assets/studio-fitted-black-napkins.jpg';
import studioFittedIvoryNapkins from '@/assets/studio-fitted-ivory-napkins.jpg';

// Kitchen images
const kitchenCloth = '/lovable-uploads/027eb211-99a4-4e7d-8d3f-91a396f0b82a.png';
const kitchenClothAlt1 = '/lovable-uploads/21a97c9a-3bd0-417c-b445-5ae091c4192f.png';
const kitchenClothAlt2 = '/lovable-uploads/2733f275-4abc-4211-8663-e86feb172f9d.png';

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

const Restaurant = () => {
  const navigate = useNavigate();
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
      title: 'Kitchen',
      description: 'Professional kitchen towels and cloths in various patterns and colors for commercial and domestic use.',
      images: [kitchenCloth, kitchenClothAlt1, kitchenClothAlt2],
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
      title: 'Kitchen Linens',
      description: 'Professional kitchen towels and cloths for commercial use.',
      images: [kitchenCloth],
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
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>

          {/* Header */}
          <div className="mb-12 relative">

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-px bg-accent" />
              <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-foreground/60">
                Restaurant Linens
              </span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-6">
              Commercial Restaurant Linen Hire | London & South East
            </h1>
            
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
          <div className="mb-16 bg-card border-2 border-border rounded-lg p-8 md:p-12">
            <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-6">
              Why Restaurants Choose Partridge Laundry
            </h2>
            
            <p className="text-foreground/80 font-body leading-relaxed text-lg mb-8">
              Running a busy restaurant is demanding. At Partridge Laundry, we see ourselves as a true partner to your restaurant, helping you run smoothly while building a loyal, long-term customer base. Your commercial laundry shouldn't add to the stress—it should be seamless, reliable, and tailored to your operations. With over 30 years' experience serving restaurants across London and the South East, we ensure your linen service is effortless, flexible, and consistently high-quality. Here's why establishments trust us:
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="font-display text-xl font-light text-foreground mb-3 flex items-start gap-3">
                  <span className="text-accent font-semibold">1.</span>
                  Flexible Linen Hire & Operational Freedom
                </h3>
                <p className="text-foreground/70 font-body leading-relaxed">
                  We offer complete flexibility with our no-contract service. Enjoy scheduled deliveries and a set monthly quota, scaling up or down as your needs change—your linen hire adapts to your business, not the other way around.
                </p>
                <p className="text-foreground/70 font-body leading-relaxed mt-3">
                  For restaurants seeking maximum cost control or bespoke items, we also offer structured contracts. These ensure your specialised stock is reserved and pricing is locked in, giving you long-term certainty and convenience.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-light text-foreground mb-3 flex items-start gap-3">
                  <span className="text-accent font-semibold">2.</span>
                  Impeccable Presentation & Quality
                </h3>
                <p className="text-foreground/70 font-body leading-relaxed">
                  Our professional laundering and pressing deliver a crisp, high-quality finish. From tablecloths and napkins to chef uniforms, every item is treated with meticulous care. A polished presentation instantly elevates your guests' dining experience.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-light text-foreground mb-3 flex items-start gap-3">
                  <span className="text-accent font-semibold">3.</span>
                  Reliable Deliveries Across London & the South East
                </h3>
                <p className="text-foreground/70 font-body leading-relaxed">
                  We provide reliable London restaurant linen hire throughout the M25 and beyond, including Brighton, Sevenoaks, and west past Southall. Our collection and delivery schedules are tailored precisely to your kitchen and service operations, ensuring your laundry is always on time.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-light text-foreground mb-3 flex items-start gap-3">
                  <span className="text-accent font-semibold">4.</span>
                  Bespoke Solutions & Unlimited Sourcing
                </h3>
                <p className="text-foreground/70 font-body leading-relaxed">
                  Need daily orders, specific colours, or unique fabrics? We can source virtually any linen, providing customised commercial laundry solutions that match your restaurant's style and operational requirements.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-accent rounded-lg p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-white/20" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-white/20" />
            
            <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
              Like what you see?
            </h2>
            <p className="text-white/80 font-body leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
              Tell us what you need and we'll put together a quote for you. Whether it's for a single event or regular service, we're here to help.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => setIsEnquiryOpen(true)}
                variant="outline"
                className="font-body border-white/30 bg-white text-black hover:bg-white/90"
              >
                <Mail className="w-4 h-4 mr-2" />
                Request a Quote
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/contact')}
                className="font-body border-white/30 bg-white text-black hover:bg-white/90"
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
