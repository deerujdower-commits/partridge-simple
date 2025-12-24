import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GalleryLightbox from '@/components/GalleryLightbox';
import { Button } from '@/components/ui/button';
import { openMailto } from '@/lib/openMailto';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import EventProductSection from '@/components/events/EventProductSection';
import eventsHero from '@/assets/events-hero-damask.jpg';

// Damask swatch images
import damaskSwatchBlue from '@/assets/damask-swatch-blue.jpg';
import damaskSwatchBurgundy from '@/assets/damask-swatch-burgundy.jpg';
import damaskSwatchChampagne from '@/assets/damask-swatch-champagne.jpg';
import damaskSwatchBabyPink from '@/assets/damask-swatch-baby-pink.jpg';
import damaskSwatchLimeGreen from '@/assets/damask-swatch-lime-green.jpg';
import damaskSwatchPurple from '@/assets/damask-swatch-purple.jpg';
import damaskSwatchSilver from '@/assets/damask-swatch-silver.jpg';
import damaskSwatchBlack from '@/assets/damask-swatch-black.jpg';
import damaskSwatchWhite from '@/assets/damask-swatch-white.jpg';
import damaskSwatchIvory from '@/assets/damask-swatch-ivory.jpg';
import damaskSwatchBabyBlue from '@/assets/damask-swatch-baby-blue.jpg';

// Gallery images
import galleryChampagneNapkin from '@/assets/events-champagne-damask-napkin.jpg';
import galleryDamaskGlasses from '@/assets/events-damask-glasses.jpg';
import galleryDamaskTableSet from '@/assets/events-damask-table-set.jpg';
import galleryDamaskRose from '@/assets/events-damask-rose-napkin.jpg';
import galleryDamaskPlate from '@/assets/events-damask-plate-setting.jpg';
import galleryDamaskPurple from '@/assets/events-damask-purple-napkin.jpg';
import galleryRoxyBlush from '@/assets/events-roxy-blush-setting.png';
import galleryRoxyGoldFlowers from '@/assets/events-roxy-gold-flowers.png';
import galleryRoxyCream from '@/assets/events-roxy-cream-table.png';
import galleryRoxyBurgundy from '@/assets/events-roxy-burgundy-damask.png';
import galleryRoxyBlue from '@/assets/events-roxy-blue-feathers.png';
import galleryRoxyWhiteWedding from '@/assets/events-roxy-white-wedding.png';
import galleryRoxyWeddingCake from '@/assets/events-roxy-wedding-cake.png';
import galleryRoxyRedLighting from '@/assets/events-roxy-red-lighting.png';
import galleryRoxyChampagneNapkin from '@/assets/events-roxy-champagne-napkin.png';
import galleryRoxyPurpleCandles from '@/assets/events-roxy-purple-candles.png';

// Table Linen configuration
const tableLinenColors = [
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Ivory', hex: '#F5F5DC' },
  { name: 'Red', hex: '#B22222' },
];

const tableLinenProductTypes = [
  {
    value: 'napkins',
    label: 'Napkins',
    sizes: [
      { value: 'standard', label: '20" x 20"', price: 0.50 },
    ]
  },
  {
    value: 'round-tablecloths',
    label: 'Round Tablecloths',
    sizes: [
      { value: '88', label: '88"', price: 5.00 },
      { value: '108', label: '108"', price: 6.00 },
      { value: '118', label: '118"', price: 7.00 },
      { value: '130', label: '130"', price: 8.00 },
    ]
  },
  {
    value: 'rectangular-tablecloths',
    label: 'Rectangular Tablecloths',
    sizes: [
      { value: '54x54', label: '54" x 54"', price: 3.00 },
      { value: '70x70', label: '70" x 70"', price: 4.00 },
      { value: '70x108', label: '70" x 108"', price: 5.00 },
      { value: '70x144', label: '70" x 144"', price: 6.00 },
      { value: '90x90', label: '90" x 90"', price: 5.50 },
    ]
  },
];

// Damask configuration with image swatches
const damaskColors = [
  { name: 'Black', hex: '#1a1a1a', image: damaskSwatchBlack },
  { name: 'White', hex: '#FFFFFF', image: damaskSwatchWhite },
  { name: 'Ivory', hex: '#F5F5DC', image: damaskSwatchIvory },
  { name: 'Blue', hex: '#1E90FF', image: damaskSwatchBlue },
  { name: 'Baby Blue', hex: '#89CFF0', image: damaskSwatchBabyBlue },
  { name: 'Burgundy', hex: '#800020', image: damaskSwatchBurgundy },
  { name: 'Champagne', hex: '#F7E7CE', image: damaskSwatchChampagne },
  { name: 'Baby Pink', hex: '#F4C2C2', image: damaskSwatchBabyPink },
  { name: 'Lime Green', hex: '#9ACD32', image: damaskSwatchLimeGreen },
  { name: 'Purple', hex: '#9966CC', image: damaskSwatchPurple },
  { name: 'Silver', hex: '#C0C0C0', image: damaskSwatchSilver },
];

const damaskProductTypes = [
  {
    value: 'napkins',
    label: 'Napkins',
    sizes: [
      { value: 'standard', label: '20" x 20"', price: 0.75 },
    ]
  },
  {
    value: 'rectangular-tablecloths',
    label: 'Rectangular Tablecloths',
    sizes: [
      { value: '70x144', label: '70" x 144"', price: 8.00 },
    ]
  },
  {
    value: 'round-tablecloths',
    label: 'Round Tablecloths',
    sizes: [
      { value: '120', label: 'Round 120"', price: 10.00 },
      { value: '130', label: 'Round 130"', price: 12.00 },
    ]
  },
];

// Gallery images array for lightbox
const galleryImages = [
  { src: galleryDamaskTableSet, alt: 'Damask table setting with gold napkins' },
  { src: galleryDamaskPlate, alt: 'Elegant damask place setting with plate' },
  { src: galleryChampagneNapkin, alt: 'Champagne damask napkin' },
  { src: galleryDamaskGlasses, alt: 'Damask napkin with wine glasses' },
  { src: galleryDamaskRose, alt: 'Rose damask napkin' },
  { src: galleryDamaskPurple, alt: 'Purple damask napkin' },
  { src: galleryRoxyBlush, alt: 'Blush damask table with gold cutlery' },
  { src: galleryRoxyGoldFlowers, alt: 'Gold damask with floral centerpiece' },
  { src: galleryRoxyCream, alt: 'Cream damask table setting' },
  { src: galleryRoxyBurgundy, alt: 'Burgundy damask with crystal glasses' },
  { src: galleryRoxyBlue, alt: 'Royal blue event with feather decor' },
  { src: galleryRoxyWhiteWedding, alt: 'White wedding table with candelabra' },
  { src: galleryRoxyWeddingCake, alt: 'Elegant wedding venue with cake' },
  { src: galleryRoxyRedLighting, alt: 'Dramatic red lighting table setting' },
  { src: galleryRoxyChampagneNapkin, alt: 'Champagne damask napkin close-up' },
  { src: galleryRoxyPurpleCandles, alt: 'Purple gala with floating candles' },
];

const Events = () => {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img 
          src={eventsHero} 
          alt="Elegant damask tablecloth with fine dining place setting"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-px bg-white" />
              <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Event Hire
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Elegant Linens for <span className="text-white">Your Special Events</span>
            </h1>
          </div>
        </div>
      </section>

      <main className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Intro text */}
          <div className="mb-8">
            <p className="text-foreground/70 font-body leading-relaxed text-base max-w-2xl">
              From weddings to corporate events, we provide premium tablecloths and damask linens to make your occasion memorable.
            </p>
          </div>

          {/* Split Layout - Products Left, Gallery Right */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Product Selection */}
            <div>
              {/* Table Linen Section */}
              <EventProductSection
                title="Table Linen"
                colors={tableLinenColors}
                productTypes={tableLinenProductTypes}
                sizeGuideType="both"
              />

              {/* Damask Tablecloths Section */}
              <EventProductSection
                title="Damask Patterns"
                colors={damaskColors}
                productTypes={damaskProductTypes}
                sizeGuideType="both"
              />
            </div>

            {/* Right Column - Gallery Space */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <h3 className="font-display text-lg font-light text-foreground mb-4">Damask Collection</h3>
              <div className="grid grid-cols-2 gap-3">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => openLightbox(index)}
                    className="relative group overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </button>
                ))}
              </div>
            </div>

            {/* Lightbox */}
            <GalleryLightbox
              images={galleryImages}
              isOpen={lightboxOpen}
              onClose={() => setLightboxOpen(false)}
              currentIndex={lightboxIndex}
              onIndexChange={setLightboxIndex}
            />
          </div>

          {/* FAQ Section */}
          <div className="bg-muted/50 border-2 border-border rounded-lg p-6 md:p-10 my-10">
            <h2 className="font-display text-2xl font-light text-foreground mb-6">
              Event Linen Hire: FAQ
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-display text-left text-sm">
                  What is the lead time for placing an order?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed text-sm">
                  We recommend submitting your order at least 5 working days prior to your event date. While same-week orders can often be accommodated, we must check stock availability before confirming.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="font-display text-left text-sm">
                  What are the collection and delivery options?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed text-sm">
                  Collection and return are free from our premises in Thornton Heath, Croydon. If you require delivery, you can request this option at checkout.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="font-display text-left text-sm">
                  How does the refundable damage deposit work?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed text-sm">
                  A deposit is required for all items. The deposit is fully refundable after the items are returned and checked at our premises.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="font-display text-left text-sm">
                  What is the standard hire period?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed text-sm">
                  Our standard hire period is 3 days. If you need the items for longer, please let us know and we can arrange an extended hire.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="font-display text-left text-sm">
                  Do I need to wash the items before returning?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed text-sm">
                  No, you don't need to wash the items. Simply return them in a bag or box. We handle all the cleaning professionally.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Why Choose Us Section */}
          <div className="my-10">
            <h2 className="font-display text-2xl font-light text-foreground mb-6 text-center">
              Why Choose Partridge Linen?
            </h2>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-xl">✨</span>
                </div>
                <h3 className="font-display text-base font-medium text-foreground mb-1">Premium Quality</h3>
                <p className="text-foreground/60 text-sm">
                  Professionally cleaned and maintained to the highest standards.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-xl">🚚</span>
                </div>
                <h3 className="font-display text-base font-medium text-foreground mb-1">Flexible Delivery</h3>
                <p className="text-foreground/60 text-sm">
                  Free collection from Croydon or convenient delivery to your venue.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-xl">💬</span>
                </div>
                <h3 className="font-display text-base font-medium text-foreground mb-1">Personal Service</h3>
                <p className="text-foreground/60 text-sm">
                  Family-run business with over 40 years of experience.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-black rounded-lg p-6 md:p-10 my-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
            
            <h2 className="font-display text-xl md:text-2xl font-light text-white mb-3">
              Ready to Make Your Event Special?
            </h2>
            <p className="text-white/70 font-body leading-relaxed mb-6 max-w-xl mx-auto">
              Get in touch with us to discuss your requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="tel:02086536066"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-black rounded hover:bg-white/90 transition-colors font-body text-sm"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </a>
              <button
                type="button"
                onClick={() => {
                  console.log('[contact] events email click');
                  openMailto({ to: 'enquiry@partridgelinenhire.co.uk', subject: 'Event hire enquiry', body: 'Hi,\n\nI would like to enquire about event hire.' });
                }}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-black rounded hover:bg-white/90 transition-colors font-body text-sm"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;