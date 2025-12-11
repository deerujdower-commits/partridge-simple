import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EnquiryModal from '@/components/EnquiryModal';
import CollectionModal from '@/components/CollectionModal';
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
import kitchenHero from '@/assets/kitchen-hero.jpg';

const kitchenCloth = '/lovable-uploads/027eb211-99a4-4e7d-8d3f-91a396f0b82a.png';
const kitchenClothAlt1 = '/lovable-uploads/21a97c9a-3bd0-417c-b445-5ae091c4192f.png';
const kitchenClothAlt2 = '/lovable-uploads/2733f275-4abc-4211-8663-e86feb172f9d.png';

const Kitchen = () => {
  const navigate = useNavigate();
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState<{ id: number; title: string; description: string; images: string[]; slug: string } | null>(null);

  const modalData = {
    'chef-jacket': {
      id: 101,
      title: 'Chef Jackets',
      description: 'Professional chef jackets and aprons designed for comfort and durability in commercial kitchens.',
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
        apron,
        apronModel
      ],
      slug: 'chef-jacket'
    },
    'chef-trousers': {
      id: 102,
      title: 'Chef Trousers',
      description: 'Professional chef trousers in classic patterns designed for comfort and durability in commercial kitchens.',
      images: [
        chefTrouserCheck,
        chefTrouserCheckModel,
        chefTrouserBlack,
        chefTrouserBlackModel
      ],
      slug: 'chef-trousers'
    },
    'kitchen-linen': {
      id: 6,
      title: 'Kitchen Linens',
      description: 'Professional kitchen towels and cloths in various patterns and colors for commercial and domestic use.',
      images: [kitchenCloth, kitchenClothAlt1, kitchenClothAlt2],
      slug: 'kitchen-linen'
    }
  };

  const kitchenProducts = [
    {
      title: 'Chef Jackets',
      description: 'Professional chef jackets and aprons designed for comfort and durability in busy commercial kitchens.',
      images: [chefSuitWhiteFull],
      modalSlug: 'chef-jacket'
    },
    {
      title: 'Chef Trousers',
      description: 'Durable and comfortable chef trousers in classic patterns for professional kitchens.',
      images: [chefTrouserCheckModel],
      modalSlug: 'chef-trousers'
    },
    {
      title: 'Kitchen Linens',
      description: 'High-quality kitchen towels and cloths for all your professional kitchen needs.',
      images: [kitchenCloth],
      modalSlug: 'kitchen-linen'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img 
          src={kitchenHero} 
          alt="Professional chefs working in a commercial kitchen"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-px bg-white" />
              <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Kitchen Workwear & Linens
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Professional Kitchen Essentials
            </h1>
          </div>
        </div>
      </section>
      
      <main className="flex-grow py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Header */}
          <div className="mb-12">
            <p className="text-foreground/70 font-body leading-relaxed text-lg max-w-3xl">
              Outfit your kitchen team with our premium chef uniforms and kitchen linens. From crisp white jackets to durable kitchen cloths, we provide everything you need to maintain professional standards in your commercial kitchen.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {kitchenProducts.map((product, index) => (
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
          <div className="bg-card border-2 border-border rounded-lg p-8 md:p-12 mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-6">
              Why Choose Partridge for Your Kitchen Laundry
            </h2>
            
            <p className="text-foreground/70 font-body leading-relaxed mb-8">
              From busy restaurants and takeaways to hotels and catering teams, Partridge provides a reliable kitchen laundry service designed to keep your staff and operations running smoothly. With over 30 years' experience, we ensure your uniforms, aprons, and kitchen linens are hygienic, crisp, and ready for use every day.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-light text-foreground mb-2">
                  1. Hygiene & Sanitation You Can Trust
                </h3>
                <p className="text-foreground/70 font-body leading-relaxed">
                  In a kitchen, cleanliness is essential. All items are professionally laundered to strict hygiene standards, removing bacteria and tough stains. Your kitchen linens and uniforms are kept sanitary and safe for daily use.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-light text-foreground mb-2">
                  2. Durable Workwear Fabrics
                </h3>
                <p className="text-foreground/70 font-body leading-relaxed">
                  We specialise in poly-cotton workwear, offering long-lasting durability, comfort, and easy maintenance. Chef jackets, aprons, and staff uniforms are designed to withstand the rigours of a busy kitchen while keeping your team comfortable throughout their shift.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-light text-foreground mb-2">
                  3. Hand-Folded, Supreme Quality
                </h3>
                <p className="text-foreground/70 font-body leading-relaxed">
                  Every uniform and linen is hand-folded with meticulous care. This attention to detail ensures your chefs and kitchen staff look sharp, professional, and well-presented, enhancing the image of your kitchen and establishment.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-light text-foreground mb-2">
                  4. Service for All Hospitality Teams
                </h3>
                <p className="text-foreground/70 font-body leading-relaxed">
                  Whether you run a restaurant, takeaway, hotel kitchen, or catering operation, our service adapts to your needs. Regular collection and delivery schedules ensure you never run out of clean linen or uniforms, keeping your operations efficient.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-light text-foreground mb-2">
                  5. Efficient & Large-Load Deliveries
                </h3>
                <p className="text-foreground/70 font-body leading-relaxed">
                  We cover the M25 and beyond, handling large volumes with ease. No matter the size of your kitchen or number of sites, our reliable delivery service ensures your laundry arrives on time, every time.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-accent rounded-lg p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-white/20" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-white/20" />
            
            <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
              Need to kit out your team?
            </h2>
            <p className="text-white/80 font-body leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
              Drop us a message with what you're looking for and we'll sort you out with pricing. Simple as that.
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

export default Kitchen;
