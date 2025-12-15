import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Minus, Plus, CalendarIcon, Bed, Ruler, Bath } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { useToast } from '@/hooks/use-toast';
import SuggestionModal from './SuggestionModal';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import SizeGuideDialog from '@/components/SizeGuideDialog';

// Import 70x144 damask images
import damaskBlack70x144 from '@/assets/damask-black-70x144.png';
import damaskGold70x144 from '@/assets/damask-gold-70x144.png';
import damaskPink70x144 from '@/assets/damask-pink-70x144.png';
import damaskSilver70x144 from '@/assets/damask-silver-70x144.png';
import damaskIvory70x144 from '@/assets/damask-ivory-70x144.png';
import damaskWhite70x144 from '@/assets/damask-white-70x144.png';

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    images: string[];
    roundImages?: string[];
    napkinImages?: string[];
    slug: string;
  };
  fromEventsPage?: boolean;
}

const CollectionModal = ({ isOpen, onClose, category, fromEventsPage = false }: CollectionModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [orderType, setOrderType] = useState<'business' | 'event' | null>(fromEventsPage ? 'event' : null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedShape, setSelectedShape] = useState<string>('');
  const [selectedProductType, setSelectedProductType] = useState<'tablecloth' | 'napkin'>('tablecloth');
  const [selectedKitchenType, setSelectedKitchenType] = useState<string>('');
  const [selectedBedLinenType, setSelectedBedLinenType] = useState<string>('');
  const [selectedWorkwearType, setSelectedWorkwearType] = useState<'jacket' | 'trouser' | 'apron' | ''>('');
  const [selectedSleeveLength, setSelectedSleeveLength] = useState<'long' | 'short' | ''>('');
  const [selectedHireDate, setSelectedHireDate] = useState<Date | undefined>();
  const [isHovered, setIsHovered] = useState(false);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { addItem, getSuggestedItems } = useEnquiry();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate tomorrow's date for minimum date selection
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const getSizes = () => {
    if (category.slug === 'napkins') {
      return [];
    }
    if (category.slug === 'kitchen-linen' || category.slug === 'towel') {
      return []; // No sizes for kitchen linen or towels
    }
    if (category.slug === 'round-tablecloths') {
      // Round tablecloths have specific round sizes
      if (fromEventsPage) {
        return ['Round 88"', 'Round 108"', 'Round 120"', 'Round 130"'];
      } else {
        return ['88"', '108"', '120"', '130"'];
      }
    }
    if (category.slug === 'damask') {
      // Damask has its own specific sizes
      return ['Round 88"', 'Round 108"', 'Round 118"', 'Round 130"', '70" x 144"', 'Napkin'];
    }
    
    if (category.slug === 'tablecloths') {
      // Different sizes for events vs restaurant
      if (fromEventsPage) {
        return ['70" x 70"', '70" x 108"', '90" x 90"', '70" x 144"'];
      } else {
        return ['36" x 36"', '45" x 45"', '52" x 52"', '54" x 70"', '70" x 70"', '70" x 144"', 'Napkin'];
      }
    }
    if (category.slug === 'bed-linen') {
      return ['Single', 'Double', 'Queen Size', 'King Size'];
    }
    return ['Small', 'Medium', 'Large', 'Extra Large', 'Custom'];
  };

  const sizes = getSizes();

  // Pricing for event hire tablecloths (inc. VAT)
  const getPrice = () => {
    if (!fromEventsPage || !selectedSize) return null;
    
    const isDamask = category.slug === 'damask';
    
    const priceMap: { [key: string]: string } = {
      '70" x 144"': isDamask ? '£9.50' : '£7.50',
      'Round 88"': isDamask ? '£12.50' : '£10.50',
      'Round 108"': isDamask ? '£13.00' : '£11.00',
      'Round 118"': isDamask ? '£13.25' : '£11.25',
      'Round 120"': isDamask ? '£13.50' : '£11.50',
      'Round 130"': isDamask ? '£14.00' : '£12.00',
      'Napkin': isDamask ? '£0.40' : '£0.30'
    };
    
    return priceMap[selectedSize] || null;
  };

  const currentPrice = getPrice();

  // Get current image set based on size selection and product type
  const getCurrentImages = () => {
    // Show napkin images when "Napkin" size is selected
    if (category.slug === 'damask' && category.napkinImages && selectedSize === 'Napkin') {
      return category.napkinImages;
    }
    
    // Show 70x144 damask image based on selected color
    if (category.slug === 'damask' && selectedSize === '70" x 144"') {
      const damask70x144Map: { [key: string]: string } = {
        'black': damaskBlack70x144,
        'gold': damaskGold70x144,
        'pink': damaskPink70x144,
        'silver': damaskSilver70x144,
        'ivory': damaskIvory70x144,
        'white': damaskWhite70x144
      };
      
      // Use selected color, or default to first color (black) if no color selected yet
      const colorKey = selectedColor ? selectedColor.toLowerCase() : 'black';
      const image70x144 = damask70x144Map[colorKey];
      if (image70x144) {
        return [image70x144];
      }
    }
    
    // Only show round images if a round size is explicitly selected
    if ((category.slug === 'tablecloths' || category.slug === 'damask') && selectedSize && selectedSize.toLowerCase().includes('round') && category.roundImages) {
      return category.roundImages;
    }
    return category.images;
  };

  const currentImages = getCurrentImages();
  
  // Color swatches based on product type
  const getColorSwatches = () => {
    if (category.slug === 'damask') {
      return [
        { name: 'Black', value: 'black', hex: '#1a1a1a', isDamask: true },
        { name: 'Gold', value: 'gold', hex: '#D4AF37', isDamask: true },
        { name: 'Pink', value: 'pink', hex: '#d4a5a5', isDamask: true },
        { name: 'Silver', value: 'silver', hex: '#C0C0C0', isDamask: true },
        { name: 'Ivory', value: 'ivory', hex: '#f5f0e8', isDamask: true },
        { name: 'White', value: 'white', hex: '#FFFFFF', isDamask: true }
      ];
    }
    return [
      { name: 'White', value: 'white', hex: '#FFFFFF', isDamask: false },
      { name: 'Ivory', value: 'ivory', hex: '#FFFDD0', isDamask: false },
      { name: 'Black', value: 'black', hex: '#000000', isDamask: false }
    ];
  };

  const colorSwatches = getColorSwatches();

  // Auto-carousel effect
  useEffect(() => {
    const images = getCurrentImages();
    if (isOpen && images.length > 1 && !isCarouselPaused) {
      intervalRef.current = setInterval(() => {
        if (!isHovered && !isCarouselPaused) {
          setCurrentImageIndex(prev => (prev + 1) % images.length);
        }
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isOpen, currentImages.length, isHovered, isCarouselPaused]);

  // Reset image index when size or color changes (for 70x144 images)
  useEffect(() => {
    if (category.slug === 'damask' && selectedSize === '70" x 144"') {
      setCurrentImageIndex(0);
    }
  }, [selectedSize, selectedColor, category.slug]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setSelectedColor('');
      setSelectedKitchenType('');
      setSelectedBedLinenType('');
      setSelectedWorkwearType('');
      setSelectedSleeveLength('');
      setIsCarouselPaused(false);
      if (fromEventsPage) {
        setOrderType('event');
      }
    }
  }, [isOpen, category.id, fromEventsPage]);

  if (!isOpen) return null;

  // Get image range for current workwear selection
  const getWorkwearImageRange = () => {
    if (!['work-wear', 'chef-jacket', 'chef-trousers'].includes(category.slug)) return { min: 0, max: currentImages.length - 1 };
    
    // Chef Jacket page (no trousers, includes apron)
    if (category.slug === 'chef-jacket') {
      if (selectedWorkwearType === 'jacket' && selectedSleeveLength === 'long') {
        return { min: 2, max: 5 }; // White long (2-3) + Black long (4-5)
      } else if (selectedWorkwearType === 'jacket' && selectedSleeveLength === 'short') {
        return { min: 6, max: 9 }; // White short (6-7) + Black short (8-9)
      } else if (selectedWorkwearType === 'jacket') {
        return { min: 2, max: 9 }; // All jackets (long and short)
      } else if (selectedWorkwearType === 'apron') {
        return { min: 10, max: 11 }; // Apron (10-11)
      }
    }
    
    // Chef Trousers page (only trousers)
    if (category.slug === 'chef-trousers') {
      if (selectedWorkwearType === 'trouser') {
        return { min: 0, max: 3 }; // Blue check (0-1) + Black (2-3)
      }
    }
    
    // Work Wear page (full collection)
    if (category.slug === 'work-wear') {
      if (selectedWorkwearType === 'jacket' && selectedSleeveLength === 'long') {
        return { min: 2, max: 5 }; // White long (2-3) + Black long (4-5)
      } else if (selectedWorkwearType === 'jacket' && selectedSleeveLength === 'short') {
        return { min: 6, max: 9 }; // White short (6-7) + Black short (8-9)
      } else if (selectedWorkwearType === 'jacket') {
        return { min: 2, max: 9 }; // All jackets (long and short)
      } else if (selectedWorkwearType === 'trouser') {
        return { min: 10, max: 13 }; // Blue check (10-11) + Black (12-13)
      } else if (selectedWorkwearType === 'apron') {
        return { min: 14, max: 15 }; // Apron (14-15)
      }
    }
    
    return { min: 0, max: currentImages.length - 1 };
  };

  const nextImage = () => {
    // Clear the interval to make navigation feel instant
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Clear any pending resume timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
    
    const range = getWorkwearImageRange();
    setCurrentImageIndex((prev) => {
      if (['work-wear', 'chef-jacket', 'chef-trousers'].includes(category.slug) && selectedWorkwearType !== '') {
        return prev >= range.max ? range.min : prev + 1;
      }
      return (prev + 1) % currentImages.length;
    });
    
    // Pause carousel temporarily, will restart after 5 seconds of no interaction
    setIsCarouselPaused(true);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsCarouselPaused(false);
      pauseTimeoutRef.current = null;
    }, 5000);
  };

  const prevImage = () => {
    // Clear the interval to make navigation feel instant
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Clear any pending resume timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
    
    const range = getWorkwearImageRange();
    setCurrentImageIndex((prev) => {
      if (['work-wear', 'chef-jacket', 'chef-trousers'].includes(category.slug) && selectedWorkwearType !== '') {
        return prev <= range.min ? range.max : prev - 1;
      }
      return (prev - 1 + currentImages.length) % currentImages.length;
    });
    
    // Pause carousel temporarily, will restart after 5 seconds of no interaction
    setIsCarouselPaused(true);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsCarouselPaused(false);
      pauseTimeoutRef.current = null;
    }, 5000);
  };

  // Helper function to jump to a specific image (for color/type selections)
  const jumpToImage = (index: number) => {
    // Clear the interval immediately for instant response
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Clear any pending resume timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
    
    setCurrentImageIndex(index);
    setIsCarouselPaused(true);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsCarouselPaused(false);
      pauseTimeoutRef.current = null;
    }, 5000);
  };

  // Auto-update color based on image index for workwear
  useEffect(() => {
    if (['work-wear', 'chef-jacket', 'chef-trousers'].includes(category.slug) && selectedWorkwearType !== '') {
      // For chef-jacket and work-wear jackets
      if (selectedWorkwearType === 'jacket') {
        if (currentImageIndex >= 2 && currentImageIndex <= 3) {
          setSelectedColor('White');
        } else if (currentImageIndex >= 4 && currentImageIndex <= 5) {
          setSelectedColor('Black');
        } else if (currentImageIndex >= 6 && currentImageIndex <= 7) {
          setSelectedColor('White');
        } else if (currentImageIndex >= 8 && currentImageIndex <= 9) {
          setSelectedColor('Black');
        }
      } 
      // For chef-trousers page
      else if (selectedWorkwearType === 'trouser') {
        if (category.slug === 'chef-trousers') {
          if (currentImageIndex >= 0 && currentImageIndex <= 1) {
            setSelectedColor('Blue Check');
          } else if (currentImageIndex >= 2 && currentImageIndex <= 3) {
            setSelectedColor('Black');
          }
        } else if (category.slug === 'work-wear') {
          if (currentImageIndex >= 10 && currentImageIndex <= 11) {
            setSelectedColor('Blue Check');
          } else if (currentImageIndex >= 12 && currentImageIndex <= 13) {
            setSelectedColor('Black');
          }
        }
      }
    }
  }, [currentImageIndex, category.slug, selectedWorkwearType]);

  const handleAddToEnquiry = () => {
    let productName = category.slug === 'damask' && selectedProductType === 'napkin' 
      ? 'Damask Napkins' 
      : category.title;
    
    if (category.slug === 'kitchen-linen' && selectedKitchenType) {
      productName = selectedKitchenType;
    }
    
    if (category.slug === 'bed-linen' && selectedBedLinenType) {
      productName = selectedBedLinenType;
    }
    
    let description = `${category.description}${selectedSize ? ` - Size: ${selectedSize}` : ''}${selectedColor ? ` - Color: ${selectedColor}` : ''}${selectedKitchenType ? ` - Type: ${selectedKitchenType}` : ''}${selectedBedLinenType ? ` - Type: ${selectedBedLinenType}` : ''}`;
    
    if (fromEventsPage && selectedHireDate) {
      description += ` - Hire Date: ${format(selectedHireDate, 'PPP')}`;
    }
    
    addItem({
      name: productName,
      category: 'Enquiry',
      quantity: quantity,
      image: currentImages[currentImageIndex],
      description,
      size: selectedSize,
      color: selectedColor,
      hireDate: fromEventsPage ? selectedHireDate : undefined
    });
    
    // Show toast notification
    toast({
      title: "Added to enquiry!",
      description: `${productName} has been added to your enquiry.`,
    });
    
    // Close modal and show suggestions
    onClose();
    setTimeout(() => {
      setShowSuggestions(true);
    }, 300);
  };
  
  const handleAddSuggestion = (suggestionName: string) => {
    // Find the matching item from collection
    const collectionItem = {
      name: suggestionName,
      category: 'Enquiry',
      quantity: 1,
      image: '/placeholder-image.jpg', // You might want to map these properly
      description: `${suggestionName} suggestion`
    };
    
    addItem(collectionItem);
    
    toast({
      title: "Added to enquiry!",
      description: `${suggestionName} has been added to your enquiry.`,
    });
  };

  const handleQuantityChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) {
      setQuantity(num);
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-background border border-border rounded-lg max-w-4xl w-full my-8 flex flex-col max-h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border flex-shrink-0">
          <div>
            <h2 className="text-xl md:text-2xl font-display text-foreground">{category.title}</h2>
            <p className="text-foreground/60 font-body text-sm md:text-base">{category.subtitle}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row overflow-y-auto flex-1">
          {/* Image Section */}
          <div className="md:w-1/2 p-4 md:p-6">
            <div 
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Main Image */}
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={currentImages[currentImageIndex]}
                  alt={`${category.title} ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center' }}
                />
              </div>

              {/* Navigation Arrows */}
              {(() => {
                const range = getWorkwearImageRange();
                const showArrows = ['work-wear', 'chef-jacket', 'chef-trousers'].includes(category.slug) && selectedWorkwearType !== ''
                  ? (range.max - range.min > 0) 
                  : currentImages.length > 1;
                
                return showArrows && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                      onClick={prevImage}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                );
              })()}

              {/* Image Indicators */}
              {(() => {
                const range = getWorkwearImageRange();
                const isWorkwearSelected = ['work-wear', 'chef-jacket', 'chef-trousers'].includes(category.slug) && selectedWorkwearType !== '';
                
                const showIndicators = isWorkwearSelected ? (range.max - range.min > 0) : currentImages.length > 1;
                
                if (!showIndicators) return null;
                
                const indicesToShow = isWorkwearSelected 
                  ? Array.from({ length: range.max - range.min + 1 }, (_, i) => range.min + i)
                  : Array.from({ length: currentImages.length }, (_, i) => i);
                
                return (
                  <div className="flex justify-center mt-4 gap-2">
                    {indicesToShow.map((index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          index === currentImageIndex ? 'bg-foreground' : 'bg-foreground/30'
                        }`}
                        onClick={() => {
                          jumpToImage(index);
                        }}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Details Section - Better mobile spacing */}
          <div className="md:w-1/2 p-4 md:p-6 border-l-0 md:border-l border-border overflow-y-auto max-h-[70vh]">
            <div className="space-y-4 md:space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-base md:text-lg font-display text-foreground mb-2">Description</h3>
                <p className="text-sm md:text-base text-foreground/80 font-body leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Kitchen Linen - Dynamic Product Name */}
              {category.slug === 'kitchen-linen' && (
                <div>
                  <h3 className="text-base md:text-lg font-display text-foreground mb-2">
                    {(() => {
                      const kitchenLinenNames = [
                        'Wonderdry Kitchen Cloth',
                        'Herringbone Cloth - Green',
                        'Herringbone Cloth - Blue',
                        'Microfibre Cloth',
                        'Oven Cloth',
                        'Glass Cloth',
                        'Polishing Cloth'
                      ];
                      return kitchenLinenNames[currentImageIndex] || 'Kitchen Linen';
                    })()}
                  </h3>
                  <p className="text-sm text-foreground/60">
                    Use arrows to browse products
                  </p>
                </div>
              )}

              {/* Work Wear Selection */}
              {category.slug === 'work-wear' && (
                <div>
                  <h3 className="text-base md:text-lg font-display text-foreground mb-3">Select Item</h3>
                  
                  {/* Step 1: Select Product Type */}
                  {!selectedWorkwearType && (
                    <div className="grid grid-cols-1 gap-3">
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 px-4"
                        onClick={() => {
                          setSelectedWorkwearType('jacket');
                          jumpToImage(2);
                        }}
                      >
                        <div className="text-center"><div className="font-semibold">Chef Jacket</div></div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 px-4"
                        onClick={() => {
                          setSelectedWorkwearType('trouser');
                          jumpToImage(10);
                        }}
                      >
                        <div className="text-center"><div className="font-semibold">Chef Trouser</div></div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 px-4"
                        onClick={() => {
                          setSelectedWorkwearType('apron');
                          jumpToImage(14);
                        }}
                      >
                        <div className="text-center"><div className="font-semibold">Apron</div></div>
                      </Button>
                    </div>
                  )}

                  {/* Step 2: Chef Jacket - Select Sleeve Length */}
                  {selectedWorkwearType === 'jacket' && !selectedSleeveLength && (
                    <div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedWorkwearType('')}
                        className="mb-3"
                      >
                        ← Back
                      </Button>
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setSelectedSleeveLength('long');
                            jumpToImage(2);
                          }}
                        >
                          Long Sleeve
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setSelectedSleeveLength('short');
                            jumpToImage(6);
                          }}
                        >
                          Short Sleeve
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Chef Jacket - Select Color */}
                  {selectedWorkwearType === 'jacket' && selectedSleeveLength && (
                    <div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setSelectedSleeveLength('');
                          setSelectedColor('');
                          jumpToImage(0);
                        }}
                        className="mb-3"
                      >
                        ← Back
                      </Button>
                      <h4 className="text-sm font-medium text-foreground/80 mb-3">Select Color</h4>
                      <div className="flex gap-3 mb-4">
                        <button
                          onClick={() => {
                            const index = selectedSleeveLength === 'long' ? 2 : 6;
                            jumpToImage(index);
                            setSelectedColor('White');
                          }}
                          className="flex flex-col items-center gap-2 group"
                        >
                          <div className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColor === 'White' ? 'border-foreground ring-2 ring-foreground/20' : 'border-border'} bg-white`}></div>
                          <span className="text-xs text-foreground/70">White</span>
                        </button>
                        <button
                          onClick={() => {
                            const index = selectedSleeveLength === 'long' ? 4 : 8;
                            jumpToImage(index);
                            setSelectedColor('Black');
                          }}
                          className="flex flex-col items-center gap-2 group"
                        >
                          <div className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColor === 'Black' ? 'border-foreground ring-2 ring-foreground/20' : 'border-border'} bg-black`}></div>
                          <span className="text-xs text-foreground/70">Black</span>
                        </button>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-xs font-medium text-foreground/70 mb-2">Available Sizes:</p>
                        <ul className="text-xs text-foreground/60 space-y-1">
                          <li>• Extra Small (XS)</li>
                          <li>• Small (S)</li>
                          <li>• Medium (M)</li>
                          <li>• Large (L)</li>
                          <li>• Extra Large (XL)</li>
                        </ul>
                      </div>
                      <p className="text-xs text-foreground/60 mt-3">
                        Scroll through images to view both item and model photos
                      </p>
                    </div>
                  )}

                  {/* Chef Trouser - Select Color */}
                  {selectedWorkwearType === 'trouser' && (
                    <div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setSelectedWorkwearType('');
                          setSelectedColor('');
                          jumpToImage(0);
                        }}
                        className="mb-3"
                      >
                        ← Back
                      </Button>
                      <h4 className="text-sm font-medium text-foreground/80 mb-3">Select Color</h4>
                      <div className="flex gap-3 mb-4">
                        <button
                          onClick={() => {
                            jumpToImage(10);
                            setSelectedColor('Blue Check');
                          }}
                          className="flex flex-col items-center gap-2 group"
                        >
                          <div className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColor === 'Blue Check' ? 'border-foreground ring-2 ring-foreground/20' : 'border-border'}`} style={{ background: 'repeating-linear-gradient(45deg, #4169E1, #4169E1 5px, #FFF 5px, #FFF 10px)' }}></div>
                          <span className="text-xs text-foreground/70">Blue Check</span>
                        </button>
                        <button
                          onClick={() => {
                            jumpToImage(12);
                            setSelectedColor('Black');
                          }}
                          className="flex flex-col items-center gap-2 group"
                        >
                          <div className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColor === 'Black' ? 'border-foreground ring-2 ring-foreground/20' : 'border-border'} bg-black`}></div>
                          <span className="text-xs text-foreground/70">Black</span>
                        </button>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-xs font-medium text-foreground/70 mb-2">Available Sizes:</p>
                        <ul className="text-xs text-foreground/60 space-y-1">
                          <li>• Extra Small (XS)</li>
                          <li>• Small (S)</li>
                          <li>• Medium (M)</li>
                          <li>• Large (L)</li>
                          <li>• Extra Large (XL)</li>
                        </ul>
                      </div>
                      <p className="text-xs text-foreground/60 mt-3">
                        Scroll through images to view both item and model photos
                      </p>
                    </div>
                  )}

                  {/* Apron - Show selection */}
                  {selectedWorkwearType === 'apron' && (
                    <div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setSelectedWorkwearType('');
                          jumpToImage(0);
                        }}
                        className="mb-3"
                      >
                        ← Back
                      </Button>
                      <div className="p-4 bg-muted/50 rounded-lg text-center">
                        <p className="text-sm text-foreground/80">Apron selected - One Size</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Chef Jacket Selection (without trouser option, has apron) */}
              {category.slug === 'chef-jacket' && (
                <div>
                  <h3 className="text-base md:text-lg font-display text-foreground mb-3">Select Item</h3>
                  
                  {/* Step 1: Select Product Type */}
                  {!selectedWorkwearType && (
                    <div className="grid grid-cols-1 gap-3">
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 px-4"
                        onClick={() => {
                          setSelectedWorkwearType('jacket');
                          jumpToImage(2);
                        }}
                      >
                        <div className="text-center"><div className="font-semibold">Chef Jacket</div></div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 px-4"
                        onClick={() => {
                          setSelectedWorkwearType('apron');
                          jumpToImage(10);
                        }}
                      >
                        <div className="text-center"><div className="font-semibold">Apron</div></div>
                      </Button>
                    </div>
                  )}

                  {/* Step 2: Chef Jacket - Select Sleeve Length */}
                  {selectedWorkwearType === 'jacket' && !selectedSleeveLength && (
                    <div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedWorkwearType('')}
                        className="mb-3"
                      >
                        ← Back
                      </Button>
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setSelectedSleeveLength('long');
                            jumpToImage(2);
                          }}
                        >
                          Long Sleeve
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setSelectedSleeveLength('short');
                            jumpToImage(6);
                          }}
                        >
                          Short Sleeve
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Chef Jacket - Select Color */}
                  {selectedWorkwearType === 'jacket' && selectedSleeveLength && (
                    <div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setSelectedSleeveLength('');
                          setSelectedColor('');
                          jumpToImage(0);
                        }}
                        className="mb-3"
                      >
                        ← Back
                      </Button>
                      <h4 className="text-sm font-medium text-foreground/80 mb-3">Select Color</h4>
                      <div className="flex gap-3 mb-4">
                        <button
                          onClick={() => {
                            const index = selectedSleeveLength === 'long' ? 2 : 6;
                            jumpToImage(index);
                            setSelectedColor('White');
                          }}
                          className="flex flex-col items-center gap-2 group"
                        >
                          <div className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColor === 'White' ? 'border-foreground ring-2 ring-foreground/20' : 'border-border'} bg-white`}></div>
                          <span className="text-xs text-foreground/70">White</span>
                        </button>
                        <button
                          onClick={() => {
                            const index = selectedSleeveLength === 'long' ? 4 : 8;
                            jumpToImage(index);
                            setSelectedColor('Black');
                          }}
                          className="flex flex-col items-center gap-2 group"
                        >
                          <div className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColor === 'Black' ? 'border-foreground ring-2 ring-foreground/20' : 'border-border'} bg-black`}></div>
                          <span className="text-xs text-foreground/70">Black</span>
                        </button>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-xs font-medium text-foreground/70 mb-2">Available Sizes:</p>
                        <ul className="text-xs text-foreground/60 space-y-1">
                          <li>• Extra Small (XS)</li>
                          <li>• Small (S)</li>
                          <li>• Medium (M)</li>
                          <li>• Large (L)</li>
                          <li>• Extra Large (XL)</li>
                        </ul>
                      </div>
                      <p className="text-xs text-foreground/60 mt-3">
                        Scroll through images to view both item and model photos
                      </p>
                    </div>
                  )}

                  {/* Apron - Show selection */}
                  {selectedWorkwearType === 'apron' && (
                    <div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setSelectedWorkwearType('');
                          jumpToImage(0);
                        }}
                        className="mb-3"
                      >
                        ← Back
                      </Button>
                      <div className="p-4 bg-muted/50 rounded-lg text-center">
                        <p className="text-sm text-foreground/80">Apron selected - One Size</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Chef Trousers Selection (only trousers) */}
              {category.slug === 'chef-trousers' && (
                <div>
                  <h3 className="text-base md:text-lg font-display text-foreground mb-3">Select Color</h3>
                  <div className="flex gap-3 mb-4">
                    <button
                      onClick={() => {
                        jumpToImage(0);
                        setSelectedColor('Blue Check');
                        setSelectedWorkwearType('trouser');
                      }}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColor === 'Blue Check' ? 'border-foreground ring-2 ring-foreground/20' : 'border-border'}`} style={{ background: 'repeating-linear-gradient(45deg, #4169E1, #4169E1 5px, #FFF 5px, #FFF 10px)' }}></div>
                      <span className="text-xs text-foreground/70">Blue Check</span>
                    </button>
                    <button
                      onClick={() => {
                        jumpToImage(2);
                        setSelectedColor('Black');
                        setSelectedWorkwearType('trouser');
                      }}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColor === 'Black' ? 'border-foreground ring-2 ring-foreground/20' : 'border-border'} bg-black`}></div>
                      <span className="text-xs text-foreground/70">Black</span>
                    </button>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs font-medium text-foreground/70 mb-2">Available Sizes:</p>
                    <ul className="text-xs text-foreground/60 space-y-1">
                      <li>• Extra Small (XS)</li>
                      <li>• Small (S)</li>
                      <li>• Medium (M)</li>
                      <li>• Large (L)</li>
                      <li>• Extra Large (XL)</li>
                    </ul>
                  </div>
                  <p className="text-xs text-foreground/60 mt-3">
                    Scroll through images to view both item and model photos
                  </p>
                </div>
              )}

              {/* Bed Linen Information */}
              {category.slug === 'bed-linen' && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex gap-3">
                    <Bed className="w-5 h-5 text-foreground/40 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-foreground/50 uppercase tracking-wider mb-2">Products</p>
                      <ul className="text-sm text-foreground space-y-1">
                        <li>• Duvet Covers</li>
                        <li>• Bedsheets</li>
                        <li>• Pillow Cases</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Ruler className="w-5 h-5 text-foreground/40 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-foreground/50 uppercase tracking-wider mb-2">Sizes</p>
                      <ul className="text-sm text-foreground space-y-1">
                        <li>• Single</li>
                        <li>• Double</li>
                        <li>• Queen</li>
                        <li>• King</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Towel Types Information */}
              {category.slug === 'towel' && (
                <div className="flex gap-3">
                  <Bath className="w-5 h-5 text-foreground/40 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground/50 uppercase tracking-wider mb-2">Towel Types</p>
                    <TooltipProvider>
                      <div className="grid grid-cols-2 gap-x-6">
                        <ul className="text-sm text-foreground space-y-1.5">
                          {[
                            { name: 'Face Towel', size: '30×30 cm (12×12")', desc: 'Smallest size, for drying the face' },
                            { name: 'Guest Towel', size: '30×50 cm (12×20")', desc: 'Slightly larger, ideal for guests' },
                            { name: 'Hand Towel', size: '40×70 cm (16×28")', desc: 'For drying hands in bathroom or kitchen' },
                            { name: 'Bath Mat', size: '50×80 cm (20×32")', desc: 'Placed on floor to prevent slipping' },
                          ].map((towel) => (
                            <li key={towel.name}>
                              {isMobile ? (
                                <Popover>
                                  <PopoverTrigger className="cursor-pointer hover:text-primary transition-colors text-left">
                                    • {towel.name}
                                  </PopoverTrigger>
                                  <PopoverContent side="right" className="w-auto max-w-[200px] p-3 bg-popover z-50">
                                    <p className="font-medium">{towel.size}</p>
                                    <p className="text-xs text-muted-foreground">{towel.desc}</p>
                                  </PopoverContent>
                                </Popover>
                              ) : (
                                <Tooltip>
                                  <TooltipTrigger className="cursor-help hover:text-primary transition-colors">
                                    • {towel.name}
                                  </TooltipTrigger>
                                  <TooltipContent side="right" className="max-w-[200px]">
                                    <p className="font-medium">{towel.size}</p>
                                    <p className="text-xs text-muted-foreground">{towel.desc}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </li>
                          ))}
                        </ul>
                        <ul className="text-sm text-foreground space-y-1.5">
                          {[
                            { name: 'Gym Towel', size: '50×100 cm (20×40")', desc: 'Medium-sized for gym use' },
                            { name: 'Bath Towel', size: '70×130 cm (28×51")', desc: 'For drying entire body after bath' },
                            { name: 'Bath Sheet', size: '90×150 cm (35×59")', desc: 'Largest type for complete body coverage' },
                            { name: 'Bath Robe', size: '120×140 cm (47×55")', desc: 'Towel robe, various sizes available' },
                          ].map((towel) => (
                            <li key={towel.name}>
                              {isMobile ? (
                                <Popover>
                                  <PopoverTrigger className="cursor-pointer hover:text-primary transition-colors text-left">
                                    • {towel.name}
                                  </PopoverTrigger>
                                  <PopoverContent side="right" className="w-auto max-w-[200px] p-3 bg-popover z-50">
                                    <p className="font-medium">{towel.size}</p>
                                    <p className="text-xs text-muted-foreground">{towel.desc}</p>
                                  </PopoverContent>
                                </Popover>
                              ) : (
                                <Tooltip>
                                  <TooltipTrigger className="cursor-help hover:text-primary transition-colors">
                                    • {towel.name}
                                  </TooltipTrigger>
                                  <TooltipContent side="right" className="max-w-[200px]">
                                    <p className="font-medium">{towel.size}</p>
                                    <p className="text-xs text-muted-foreground">{towel.desc}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TooltipProvider>
                    <p className="text-xs text-muted-foreground mt-3 italic">
                      {isMobile ? 'Tap each type to see dimensions' : 'Hover over each type to see dimensions'}
                    </p>
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {(['tablecloths', 'round-tablecloths', 'napkins', 'damask'].includes(category.slug)) && (
                <div>
                  <h3 className="text-lg font-display text-foreground mb-3">Color</h3>
                  <div className="flex gap-4">
                    {colorSwatches.map((color) => (
                      <button
                        key={color.value}
                        className={`w-12 h-12 rounded-full border-2 transition-all duration-200 relative overflow-hidden ${
                          selectedColor === color.name ? 'border-primary scale-110 ring-2 ring-primary/20' : 'border-border hover:scale-105'
                        }`}
                        style={{ 
                          backgroundColor: color.isDamask ? 'transparent' : color.hex,
                          backgroundImage: color.isDamask ? `radial-gradient(circle at 30% 30%, ${color.hex}40, ${color.hex}20), repeating-linear-gradient(45deg, ${color.hex}30 0px, ${color.hex}30 2px, transparent 2px, transparent 6px)` : undefined
                        }}
                        onClick={() => {
                          setSelectedColor(color.name);
                          // Update image index based on color selection
                          const colorIndex = colorSwatches.findIndex(c => c.name === color.name);
                          if (colorIndex !== -1 && colorIndex < currentImages.length) {
                            jumpToImage(colorIndex);
                          }
                        }}
                        title={color.name}
                        aria-label={`Color: ${color.name}`}
                      >
                        {color.value === 'white' && !color.isDamask && (
                          <div className="w-full h-full rounded-full border border-gray-200" />
                        )}
                      </button>
                    ))}
                  </div>
                  {!fromEventsPage && (
                    <p className="text-xs text-foreground/60 mt-2">
                      We can supply a range of colours - please contact us for more options.
                    </p>
                  )}
                </div>
              )}

              {/* Size Selection */}
              {sizes.length > 0 && !['work-wear', 'chef-jacket', 'chef-trousers', 'bed-linen'].includes(category.slug) && (
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-display text-foreground">Size</h3>
                    {category.slug === 'round-tablecloths' && (
                      <SizeGuideDialog type="round" availableSizes={['88"', '108"', '120"', '130"']} />
                    )}
                    {category.slug === 'tablecloths' && fromEventsPage && (
                      <SizeGuideDialog type="rectangular" availableSizes={['70x70', '70x108', '90x90', '70x144']} />
                    )}
                    {category.slug === 'damask' && (
                      <SizeGuideDialog type="both" availableSizes={['70x144', '88"', '108"', '118"', '130"']} />
                    )}
                  </div>
                  <div className={`grid gap-2 ${(category.slug === 'tablecloths' || category.slug === 'damask') ? 'grid-cols-2' : 'grid-cols-3'}`}>
                    {sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? 'default' : 'outline'}
                        className={`text-xs md:text-sm ${category.slug === 'bed-linen' ? 'opacity-60 cursor-not-allowed' : ''}`}
                        onClick={() => {
                          if (category.slug !== 'bed-linen') {
                            const wasRound = selectedSize?.toLowerCase().includes('round');
                            const isRound = size.toLowerCase().includes('round');
                            
                            setSelectedSize(size);
                            
                            // If switching between round and non-round, update the image
                            if ((category.slug === 'tablecloths' || category.slug === 'damask') && (wasRound !== isRound || !selectedSize)) {
                              // Find the correct image index for the selected color
                              if (selectedColor) {
                                const colorIndex = colorSwatches.findIndex(c => c.name === selectedColor);
                                if (colorIndex !== -1) {
                                  jumpToImage(colorIndex);
                                }
                              } else {
                                jumpToImage(0);
                              }
                            }
                          }
                        }}
                        disabled={category.slug === 'bed-linen'}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                  
                  {/* Note for Tablecloths in Event Hire */}
                  {category.slug === 'tablecloths' && fromEventsPage && (
                    <div className="mt-3 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                      <p className="text-sm text-foreground/80">
                        <span className="font-medium">Need different sizes or colours?</span> We can source many other sizes and colours not advertised. 
                        Please <a href="/contact" className="text-accent hover:underline font-medium">get in touch</a> or call us to discuss your requirements.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Hire Date Selection - Only for Events - Below Size */}
              {fromEventsPage && (
                <div>
                  <div className="mb-3">
                    <div className="inline-block bg-accent/10 text-accent px-3 py-1.5 rounded-full text-sm font-semibold mb-3">
                      3 DAY HIRE
                    </div>
                    <h3 className="text-lg font-display text-foreground">Select Hire Date</h3>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedHireDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedHireDate ? format(selectedHireDate, "PPP") : <span>Pick a start date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedHireDate}
                        onSelect={setSelectedHireDate}
                        disabled={(date) => date < tomorrow}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                        modifiers={{
                          hireRange: selectedHireDate ? Array.from({ length: 3 }, (_, i) => {
                            const date = new Date(selectedHireDate);
                            date.setDate(date.getDate() + i);
                            return date;
                          }) : []
                        }}
                        modifiersStyles={{
                          hireRange: {
                            backgroundColor: 'hsl(var(--accent) / 0.2)',
                            color: 'hsl(var(--accent-foreground))',
                            fontWeight: '600'
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {selectedHireDate && (
                    <div className="mt-2 p-3 bg-muted/50 rounded-lg border border-border">
                      <div className="text-sm text-foreground/80">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Start Date:</span>
                          <span>{format(selectedHireDate, "PPP")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">End Date:</span>
                          <span>{format(new Date(selectedHireDate.getTime() + 72 * 60 * 60 * 1000), "PPP")}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {!selectedHireDate && (
                    <p className="text-xs text-foreground/60 mt-2">
                      Select your event start date. Hire period is 3 days (72 hours).
                    </p>
                  )}
                </div>
              )}

              {/* Enquiry message for work-wear, kitchen-linen, bed-linen, towel, chef-jacket, chef-trousers */}
              {['work-wear', 'kitchen-linen', 'bed-linen', 'towel', 'chef-jacket', 'chef-trousers'].includes(category.slug) && (
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-display text-foreground mb-3">Interested in this product?</h3>
                  <p className="text-foreground/80 font-body mb-4">
                    Please contact us to enquire about availability, pricing, and custom requirements.
                  </p>
                  <Button 
                    variant="default" 
                    className="w-full"
                    onClick={() => window.location.href = '/enquiry'}
                  >
                    Contact Us
                  </Button>
                </div>
              )}

              {/* Regular add to enquiry section for other items */}
              {!['work-wear', 'kitchen-linen', 'bed-linen', 'towel', 'chef-jacket', 'chef-trousers'].includes(category.slug) && (
                <>
                  {/* Pricing Display - Only for Events */}
                  {fromEventsPage && currentPrice && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm text-foreground/80 font-body">Price per item</span>
                        <span className="text-2xl font-display text-foreground">{currentPrice}</span>
                      </div>
                      <p className="text-xs text-foreground/60 mt-1">inc. VAT</p>
                    </div>
                  )}

                  {/* Quantity Selection */}
                  <div>
                    <h3 className="text-lg font-display text-foreground mb-3">Quantity</h3>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(e.target.value)}
                        className="w-20 text-center"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Add to Enquiry Button */}
                  <div className="pt-4">
                    <Button
                      className="w-full"
                      onClick={handleAddToEnquiry}
                      disabled={
                        (['tablecloths', 'round-tablecloths', 'napkins', 'damask'].includes(category.slug) && !selectedColor) ||
                        (fromEventsPage && !selectedHireDate)
                      }
                    >
                      Add to Enquiry
                    </Button>
                    {['tablecloths', 'round-tablecloths', 'napkins', 'damask'].includes(category.slug) && !selectedColor && (
                      <p className="text-xs text-foreground/60 text-center mt-2">Please select a color first</p>
                    )}
                    {fromEventsPage && !selectedHireDate && (
                      <p className="text-xs text-foreground/60 text-center mt-2">Please select a hire date first</p>
                    )}
                  </div>
                </>
              )}

              {/* Contact message for reference */}
              {!fromEventsPage && (
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <p className="text-sm text-foreground/80 font-body leading-relaxed">
                    For pricing and availability, we'll contact you shortly after you submit your enquiry.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Suggestion Modal */}
      <SuggestionModal
        isOpen={showSuggestions}
        onClose={() => setShowSuggestions(false)}
        suggestions={getSuggestedItems()}
        onAddSuggestion={handleAddSuggestion}
      />
    </div>
  );
};

export default CollectionModal;