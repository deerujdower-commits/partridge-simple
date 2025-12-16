import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
      { value: 'standard', label: 'Standard', price: 0.50 },
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
      { value: 'standard', label: 'Standard', price: 0.75 },
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

const Events = () => {
  const navigate = useNavigate();

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
          <div className="max-w-5xl mx-auto">
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

      <main className="py-12">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          {/* Intro text */}
          <div className="mb-12">
            <p className="text-foreground/70 font-body leading-relaxed text-lg max-w-3xl">
              From weddings to corporate events, we provide premium tablecloths and damask linens to make your occasion memorable. Select your items below.
            </p>
          </div>

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


          {/* FAQ Section */}
          <div className="bg-muted/50 border-2 border-border rounded-lg p-8 md:p-12 my-12">
            <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-6">
              Event Linen Hire: Frequently Asked Questions (FAQ)
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-display text-left">
                  What is the lead time for placing an order?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed">
                  We recommend submitting your order at least 5 working days prior to your event date. While same-week orders can often be accommodated, we must check stock availability before confirming and sending the payment link.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="font-display text-left">
                  What are the collection and delivery options?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed">
                  Collection and return are free from our premises in Thornton Heath, Croydon. If you require delivery, you can request this option at checkout. The delivery charge will be calculated and included in your final invoice, allowing you to pay for either the free collection or optional delivery.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="font-display text-left">
                  How does the refundable damage deposit work?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed">
                  A deposit is required for all items (e.g., Round tablecloth: £10 each; Normal napkin: £1 each). The deposit is fully refundable after the items are returned and checked at our premises. Indelible stains—marks that cannot be removed even with professional washing or bleaching—will be considered permanent damage, and the relevant deposit amount will be retained.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="font-display text-left">
                  What is the standard hire period?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed">
                  Our standard hire period is 3 days. If you need the items for longer, please let us know and we can arrange an extended hire at an additional cost.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="font-display text-left">
                  Do I need to wash the items before returning?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed">
                  No, you don't need to wash the items. Simply return them in a bag or box. We handle all the cleaning professionally. However, please shake off any food debris before packing.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Why Choose Us Section */}
          <div className="my-12">
            <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-8 text-center">
              Why Choose Partridge Linen for Your Event?
            </h2>
            
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-display text-lg font-medium text-foreground mb-2">Premium Quality</h3>
                <p className="text-foreground/60 text-sm">
                  All our linens are professionally cleaned and maintained to the highest standards.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="font-display text-lg font-medium text-foreground mb-2">Flexible Delivery</h3>
                <p className="text-foreground/60 text-sm">
                  Free collection from Croydon or convenient delivery to your venue.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="font-display text-lg font-medium text-foreground mb-2">Personal Service</h3>
                <p className="text-foreground/60 text-sm">
                  Family-run business with over 40 years of experience serving London events.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-black rounded-lg p-8 md:p-12 my-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
            
            <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
              Ready to Make Your Event Special?
            </h2>
            <p className="text-white/70 font-body leading-relaxed text-lg mb-8 max-w-xl mx-auto">
              Get in touch with us to discuss your requirements. We're here to help make your event memorable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:02086536066"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-black rounded hover:bg-white/90 transition-colors font-body border border-white/20"
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
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-black rounded hover:bg-white/90 transition-colors font-body border border-white/20"
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
