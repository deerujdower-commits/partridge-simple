import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Phone, Mail, Images } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InstagramGallery from '@/components/InstagramGallery';
import { Button } from '@/components/ui/button';
import { openMailto } from '@/lib/openMailto';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import EventProductSection from '@/components/events/EventProductSection';
import ChairCoversSection from '@/components/events/ChairCoversSection';
import EnquirySummary from '@/components/events/EnquirySummary';
import eventsHero from '@/assets/events-hero-damask.jpg';

// Damask swatch images
import damaskSwatchBlue from '@/assets/damask-swatch-blue.jpg';
import damaskSwatchBurgundy from '@/assets/damask-swatch-burgundy.jpg';
import damaskSwatchLimeGreen from '@/assets/damask-swatch-lime-green.jpg';
import damaskSwatchPurple from '@/assets/damask-swatch-purple.jpg';
import damaskSwatchSilver from '@/assets/damask-swatch-silver.jpg';
import damaskSwatchBabyBlue from '@/assets/damask-swatch-baby-blue.jpg';
import damaskSwatchIvory from '@/assets/damask-swatch-ivory-new.jpg';
import damaskSwatchBlack from '@/assets/damask-swatch-black-new.jpeg';
import damaskSwatchRed from '@/assets/damask-swatch-red.jpg';
import damaskSwatchWhite from '@/assets/damask-swatch-white-new.png';
import damaskSwatchPeach from '@/assets/damask-swatch-peach-final.png';
import damaskSwatchGold from '@/assets/damask-swatch-gold-new.png';
import damaskSwatchChampagne from '@/assets/damask-swatch-champagne-final.png';
import damaskSwatchBabyPink from '@/assets/damask-swatch-baby-pink-final.jpeg';
import damaskSwatchHotPink from '@/assets/damask-swatch-hot-pink.png';

// Plain tablecloth swatch images
import plainSwatchBlack from '@/assets/consistent-black-tablecloth.jpg';
import plainSwatchWhite from '@/assets/consistent-white-tablecloth.jpg';

import plainSwatchIvory from '@/assets/consistent-ivory-tablecloth.jpg';

// Gallery images - SEO optimized with Partridge Linen branding
import galleryWhiteDamaskCandles from '@/assets/partridge-linen-white-damask-candles.webp';
import galleryBlackDamaskMarquee from '@/assets/partridge-linen-black-damask-marquee.webp';
import galleryBlackRoundGala from '@/assets/partridge-linen-black-round-gala.webp';
import galleryBlackRoundVenue from '@/assets/partridge-linen-black-round-venue.webp';
import galleryBlueDamaskFeathers from '@/assets/partridge-linen-blue-damask-feathers.webp';
import galleryBurgundyDamaskCrystal from '@/assets/partridge-linen-burgundy-damask-crystal.webp';
import galleryChampagneDamaskFloral from '@/assets/partridge-linen-champagne-damask-floral.webp';
import galleryGoldDamaskLanterns from '@/assets/partridge-linen-gold-damask-lanterns.webp';
import galleryHotPinkDamaskMarigold from '@/assets/partridge-linen-hot-pink-damask-marigold.webp';
import galleryIvoryDamaskGoldSetting from '@/assets/partridge-linen-ivory-damask-gold-setting.webp';
import galleryIvoryDamaskNapkinCloseup from '@/assets/partridge-linen-ivory-damask-napkin-closeup.webp';
import galleryIvoryDamaskGardenVenue from '@/assets/partridge-linen-ivory-damask-garden-venue.webp';
import galleryMultiColouredDamaskVenue from '@/assets/partridge-linen-multi-coloured-damask-venue.webp';


import galleryWhiteDamaskWeddingHall from '@/assets/partridge-linen-white-damask-wedding-hall.webp';
import galleryWhiteDamaskYellowSashes from '@/assets/partridge-linen-white-damask-yellow-sashes.webp';
import galleryWhiteDamaskReception from '@/assets/partridge-linen-white-damask-reception.webp';
import galleryWhiteRoundRoseCenterpiece from '@/assets/partridge-linen-white-round-rose-centerpiece.webp';
import galleryWhiteRoundPinkMarquee from '@/assets/partridge-linen-white-round-pink-marquee.webp';

import galleryWhiteGoldCandelabra from '@/assets/partridge-linen-white-gold-candelabra.webp';
import galleryIvoryDamaskMarqueeColorful from '@/assets/partridge-linen-ivory-damask-marquee-colorful.webp';

// New gallery images
import galleryBlackPlainRound from '@/assets/partridge-linen-black-plain-round.png';
import galleryBlueDamaskFullCloth from '@/assets/partridge-linen-blue-damask-full-cloth.png';
import galleryWhiteChairCoversPinkSash from '@/assets/partridge-linen-white-chair-covers-pink-sash.png';
import galleryBlackDamaskGoldRimmed from '@/assets/partridge-linen-black-damask-gold-rimmed.png';
import galleryWhiteLinenMarquee from '@/assets/partridge-linen-white-linen-marquee.png';
import galleryWhiteRoundSetup from '@/assets/partridge-linen-white-round-setup.png';
import galleryWhiteSetupMultiple from '@/assets/partridge-linen-white-setup-multiple.png';
import galleryGreenGoldNapkins from '@/assets/partridge-linen-green-gold-napkins.jpeg';
import galleryWhiteRoundDarkLighting from '@/assets/partridge-linen-white-round-dark-lighting.png';

// Table Linen configuration


const tableLinenColors = [
  { name: 'Black', hex: '#1a1a1a', image: plainSwatchBlack },
  { name: 'White', hex: '#FFFFFF', image: plainSwatchWhite },
  { name: 'Ivory', hex: '#F5F5DC', image: plainSwatchIvory },
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
  { name: 'White', hex: '#FFFFFF', image: damaskSwatchWhite },
  { name: 'Ivory', hex: '#F5F5DC', image: damaskSwatchIvory },
  { name: 'Black', hex: '#1a1a1a', image: damaskSwatchBlack },
  { name: 'Red', hex: '#B22222', image: damaskSwatchRed },
  { name: 'Blue', hex: '#1E90FF', image: damaskSwatchBlue },
  { name: 'Baby Blue', hex: '#89CFF0', image: damaskSwatchBabyBlue },
  { name: 'Baby Pink', hex: '#F4C2C2', image: damaskSwatchBabyPink },
  { name: 'Hot Pink', hex: '#FF69B4', image: damaskSwatchHotPink },
  { name: 'Peach', hex: '#FFDAB9', image: damaskSwatchPeach },
  { name: 'Champagne', hex: '#F7E7CE', image: damaskSwatchChampagne },
  { name: 'Gold', hex: '#D4AF37', image: damaskSwatchGold },
  { name: 'Burgundy', hex: '#800020', image: damaskSwatchBurgundy },
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

// Gallery images array for lightbox - SEO optimized with Partridge Linen branding
const galleryImages: { src: string; alt: string }[] = [
  { src: eventsHero, alt: 'Partridge Linen damask tablecloth with elegant fine dining place setting and crystal glassware' },
  { src: galleryBurgundyDamaskCrystal, alt: 'Partridge Linen burgundy damask tablecloth with etched crystal glassware and gold charger plates' },
  { src: galleryWhiteDamaskCandles, alt: 'Partridge Linen white damask tablecloth with crystal candelabra and floral centerpiece at wedding reception' },
  { src: galleryBlackDamaskMarquee, alt: 'Partridge Linen black damask tablecloths with gold chiavari chairs in marquee with fairy lights' },
  { src: galleryIvoryDamaskGoldSetting, alt: 'Partridge Linen ivory damask tablecloth with gold cutlery and glass charger plates at elegant wedding' },
  { src: galleryBlueDamaskFeathers, alt: 'Partridge Linen royal blue damask tablecloth with gold centerpiece and feather decorations' },
  { src: galleryChampagneDamaskFloral, alt: 'Partridge Linen champagne damask tablecloth with pink roses and hydrangea floral arrangement' },
  { src: galleryBlackRoundGala, alt: 'Partridge Linen black round tablecloths at corporate gala with tall floral arrangements and green uplighting' },
  { src: galleryWhiteDamaskWeddingHall, alt: 'Partridge Linen white damask tablecloths at large wedding hall with tall purple and pink floral centerpieces' },
  { src: galleryIvoryDamaskNapkinCloseup, alt: 'Partridge Linen ivory damask napkin with floral pattern on gold charger plate with bokeh lights' },
  { src: galleryGoldDamaskLanterns, alt: 'Partridge Linen gold damask tablecloth with vintage brass lanterns and colorful floral centerpiece' },
  { src: galleryWhiteDamaskYellowSashes, alt: 'Partridge Linen white damask tablecloth with yellow chair sashes and white floral centerpiece' },
  { src: galleryBlackRoundVenue, alt: 'Partridge Linen black round tablecloths with gold napkins at large event venue with stage lighting' },
  { src: galleryIvoryDamaskGardenVenue, alt: 'Partridge Linen ivory damask tablecloth with gold cutlery at garden conservatory wedding venue' },
  
  { src: galleryWhiteDamaskReception, alt: 'Partridge Linen white damask round tablecloths at wedding reception with rose gold hoop floral displays' },
  { src: galleryMultiColouredDamaskVenue, alt: 'Partridge Linen multi-coloured damask tablecloths in pink blue and yellow at party venue with purple uplighting' },
  { src: galleryWhiteRoundRoseCenterpiece, alt: 'Partridge Linen white round tablecloth with tall glass vase and red rose arrangement at pink marquee wedding' },
  { src: galleryIvoryDamaskMarqueeColorful, alt: 'Partridge Linen ivory damask tablecloths in white marquee with vibrant pink yellow and orange floral arrangements' },
  { src: galleryWhiteRoundPinkMarquee, alt: 'Partridge Linen white round tablecloths in elegant pink draped marquee with pastel floral centerpieces' },
  { src: galleryWhiteGoldCandelabra, alt: 'Partridge Linen white round tablecloth with gold candelabra centerpiece and matching gold charger plates' },
  { src: galleryHotPinkDamaskMarigold, alt: 'Partridge Linen hot pink damask tablecloth with marigold garlands for Indian wedding celebration' },
  { src: galleryBlackPlainRound, alt: 'Partridge Linen black plain round tablecloth with colorful floral centerpiece and purple uplighting at gala event' },
  { src: galleryBlueDamaskFullCloth, alt: 'Partridge Linen royal blue damask tablecloth with gold feather decorations and elegant place settings' },
  { src: galleryWhiteChairCoversPinkSash, alt: 'Partridge Linen white round tablecloths with white chair covers and pink satin sashes at wedding reception' },
  { src: galleryBlackDamaskGoldRimmed, alt: 'Partridge Linen navy blue damask tablecloth with gold rimmed plates and chiavari chairs at conservatory venue' },
  { src: galleryWhiteLinenMarquee, alt: 'Partridge Linen white tablecloths in stunning marquee with blue uplighting and crystal chandeliers' },
  { src: galleryWhiteRoundSetup, alt: 'Partridge Linen white round tablecloth with elegant floral centerpiece and chiavari chairs' },
  { src: galleryWhiteSetupMultiple, alt: 'Partridge Linen white round tablecloths at wedding venue with tall floral centerpieces and fairy light backdrop' },
  { src: galleryGreenGoldNapkins, alt: 'Partridge Linen emerald green tablecloths with gold napkins and pink floral arrangements at elegant reception' },
  { src: galleryWhiteRoundDarkLighting, alt: 'Partridge Linen white round tablecloth with tall floral centerpiece and elegant glassware in dramatic dark lighting' },
];

const Events = () => {
  const navigate = useNavigate();
  const [galleryOpen, setGalleryOpen] = useState(false);

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
          {/* Intro text with Gallery button */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-foreground/70 font-body leading-relaxed text-base max-w-2xl">
              From weddings to corporate events, we provide premium tablecloths and damask linens to make your occasion memorable.
            </p>
            <Button 
              onClick={() => setGalleryOpen(true)}
              className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0"
            >
              <Images className="w-4 h-4 mr-2" />
              View Gallery
            </Button>
          </div>

          {/* 2x2 Grid Layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Top Left - Classic Linen */}
            <div>
              <EventProductSection
                title="Classic Linen"
                colors={tableLinenColors}
                productTypes={tableLinenProductTypes}
                sizeGuideType="both"
                showColorNote={true}
              />
            </div>

            {/* Top Right - Damask Linen */}
            <div>
              <EventProductSection
                title="Damask Linen"
                colors={damaskColors}
                productTypes={damaskProductTypes}
                sizeGuideType="both"
              />
            </div>

            {/* Bottom Left - Chair Covers */}
            <ChairCoversSection />

            {/* Bottom Right - Gallery */}
            <div id="event-gallery">
              <div className="bg-muted/30 border border-border rounded-lg overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:bg-muted/40 flex flex-col">
                <h3 className="font-display text-lg font-medium text-foreground p-4 pb-3 text-center sm:text-left">Event Gallery</h3>
                {/* Preview grid - 3x3, no gaps, Instagram-style flush layout */}
                <div className="grid grid-cols-3 gap-0 lg:flex-1 lg:grid-rows-3">
                  {galleryImages.slice(0, 9).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setGalleryOpen(true)}
                      className="relative overflow-hidden bg-muted focus:outline-none aspect-square lg:aspect-auto lg:w-full lg:h-full"
                    >
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
                
                {/* View all button */}
                <button
                  onClick={() => setGalleryOpen(true)}
                  className="m-3 py-2 px-4 bg-primary hover:bg-primary/90 rounded-lg flex items-center justify-center gap-2 text-primary-foreground transition-colors"
                >
                  <span className="font-body text-sm">View all</span>
                </button>
              </div>
            </div>
          </div>

          {/* Instagram-style Gallery Lightbox */}
          <InstagramGallery
            images={galleryImages}
            isOpen={galleryOpen}
            onClose={() => setGalleryOpen(false)}
          />

          {/* FAQ Section - Centered */}
          <div className="max-w-3xl mx-auto my-12 bg-muted-foreground/10 border border-border/50 rounded-xl p-6 md:p-10">
            <h2 className="font-display text-2xl font-light text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-display text-sm text-left">
                  What is the lead time for placing an order?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed text-sm">
                  We recommend submitting your order at least 5 working days prior to your event date. While same-week orders can often be accommodated, we must check stock availability before confirming.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="font-display text-sm text-left">
                  What are the collection and delivery options?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed text-sm">
                  Collection and return are free from our premises in Thornton Heath, Croydon. If you require delivery, you can request this option at checkout.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="font-display text-sm text-left">
                  How does the refundable damage deposit work?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed text-sm">
                  A deposit is required for all items. The deposit is fully refundable after the items are returned and checked at our premises.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="font-display text-sm text-left">
                  What is the standard hire period?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed text-sm">
                  Our standard hire period is 3 days. If you need the items for longer, please let us know and we can arrange an extended hire.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="font-display text-sm text-left">
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

      <EnquirySummary />
      <Footer />
    </div>
  );
};

export default Events;