import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Sparkles, Truck, Building2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EnquiryModal from '@/components/EnquiryModal';
import CollectionModal from '@/components/CollectionModal';
import WhyUsSection from '@/components/WhyUsSection';
import hotelBedClean from '@/assets/hotel-bed-clean.jpg';
import hotelLinens1 from '@/assets/hotel-linens-1.jpg';
import hotelLinens2 from '@/assets/hotel-linens-2.jpg';
import towelsStackWhite from '@/assets/towels-stack-white.jpg';
import bedSheetsClean from '@/assets/bed-sheets-clean.jpg';
import bedsheetsLuxury from '@/assets/bedsheets-luxury.jpg';
import hotelBedFreshLinens from '@/assets/hotel-bed-fresh-linens.jpg';
import towelClean from '@/assets/towel-clean.jpg';
import towelPremium from '@/assets/towel-premium.jpg';
import hotelHero from '@/assets/hotel-hero-bedroom.png';
import hotelWhyusPillows from '@/assets/hotel-whyus-pillows.png';
import hotelClientTowels from '@/assets/hotel-client-towels.jpeg';
import hotelClientBedding from '@/assets/hotel-client-bedding.jpeg';
import hotelBedLinenMain from '@/assets/hotel-bed-linen-main.jpg';
import hotelBedLinen1 from '@/assets/hotel-bed-linen-1.jpeg';
import hotelBedLinen2 from '@/assets/hotel-bed-linen-2.jpeg';

const HotelLinens = () => {
  const navigate = useNavigate();
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState<{ id: number; title: string; description: string; images: string[]; slug: string } | null>(null);

  const modalData = {
    'bed-linen': {
      id: 7,
      title: 'Bed Linen',
      description: 'Luxury bed linens including duvet covers, bedsheets, and pillow cases for hospitality and residential use.',
      images: [hotelBedLinen1, hotelBedLinenMain, hotelBedLinen2],
      slug: 'bed-linen'
    },
    'towel': {
      id: 8,
      title: 'Towel',
      description: 'Premium quality towels for hospitality and commercial use.',
      images: [towelClean, towelPremium, towelsStackWhite],
      slug: 'towel'
    }
  };

  const hotelProducts = [
    {
      title: 'Bed Linens',
      description: 'Premium quality bed sheets, duvet covers, and pillowcases for ultimate guest comfort.',
      images: [hotelBedLinen1, hotelBedLinenMain, hotelBedLinen2],
      modalSlug: 'bed-linen'
    },
    {
      title: 'Bath Towels',
      description: 'Soft, absorbent towels in various sizes - bath sheets, hand towels, and face cloths.',
      images: [towelsStackWhite, hotelLinens1, hotelLinens2],
      modalSlug: 'towel'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img 
          src={hotelHero} 
          alt="Luxury hotel bedroom with crisp white linens"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-px bg-white" />
              <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Hotel Linens
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Complete Linen Service for Hotels
            </h1>
          </div>
        </div>
      </section>
      
      <main className="flex-grow py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Header */}
          <div className="mb-12">
            <p className="text-foreground/70 font-body leading-relaxed text-lg max-w-3xl">
              Elevate your guest experience with our comprehensive hotel linen service. From luxurious bed linens to plush towels, we provide everything you need to create a comfortable and memorable stay for your guests.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {hotelProducts.map((product, index) => (
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
            heading="Hotel Linen That Scales With You"
            subheading="Whether you run a large hotel, boutique property, or luxury Airbnb, we're your trusted partner for professional linen hire."
            images={[hotelWhyusPillows, hotelClientTowels, hotelClientBedding]}
            features={[
              {
                title: "Premium Quality",
                description: "Crisp sheets, soft towels, and polished bedding that guests notice and appreciate.",
                icon: Sparkles
              },
              {
                title: "Reliable Delivery",
                description: "Large-scale collection and delivery on schedules that suit your housekeeping.",
                icon: Truck
              },
              {
                title: "Scalable Solutions",
                description: "From boutique properties to high-volume hotels, we fit your scale and style.",
                icon: Building2
              },
              {
                title: "Specialist Sourcing",
                description: "Luxury fabrics to practical items - we source exactly what you need.",
                icon: Search
              }
            ]}
          />

          {/* CTA Section */}
          <div className="bg-accent rounded-lg p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-white/20" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-white/20" />
            
            <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
              Want to refresh your hotel linens?
            </h2>
            <p className="text-white/80 font-body leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
              Let us know what you need and we'll get you a quote. We handle everything from beds to towels.
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

export default HotelLinens;
