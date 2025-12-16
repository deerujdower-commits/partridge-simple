import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Plus, Minus, ShoppingBag, CalendarDays } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { toast } from 'sonner';
import SizeGuideDialog from '@/components/SizeGuideDialog';
import { cn } from '@/lib/utils';

interface ColorOption {
  name: string;
  hex: string;
  image?: string;
}

interface SizeOption {
  value: string;
  label: string;
  price: number;
}

interface ProductType {
  value: string;
  label: string;
  sizes: SizeOption[];
}

interface EventProductSectionProps {
  title: string;
  colors: ColorOption[];
  productTypes: ProductType[];
  sizeGuideType: 'rectangular' | 'round' | 'both';
}

const EventProductSection = ({ title, colors, productTypes, sizeGuideType }: EventProductSectionProps) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]?.name || '');
  const [selectedProductType, setSelectedProductType] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  
  const selectedProductTypeData = productTypes.find(p => p.value === selectedProductType);
  const selectedSizeData = selectedProductTypeData?.sizes.find(s => s.value === selectedSize);
  
  const hireEndDate = selectedDate ? addDays(selectedDate, 2) : undefined;

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToBasket = () => {
    if (!selectedColor || !selectedProductType || !selectedSize || !selectedDate) {
      toast.error('Please complete your selection', {
        description: 'Choose colour, product type, size, and hire dates'
      });
      return;
    }
    
    toast.success('Added to basket', {
      description: `${quantity}x ${selectedColor} ${selectedProductTypeData?.label} (${selectedSizeData?.label}) - ${format(selectedDate, 'dd MMM')} to ${format(hireEndDate!, 'dd MMM yyyy')}`
    });
    
    // Reset after adding
    setQuantity(1);
    setShowCalendar(false);
  };

  const handleShowCalendar = () => {
    if (!selectedColor || !selectedProductType || !selectedSize) {
      toast.error('Please complete your selection first', {
        description: 'Choose colour, product type, and size before selecting dates'
      });
      return;
    }
    setShowCalendar(true);
  };

  // Reset size when product type changes
  const handleProductTypeChange = (value: string) => {
    setSelectedProductType(value);
    setSelectedSize('');
    setShowCalendar(false);
    setSelectedDate(undefined);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 mb-8">
      <h2 className="font-display text-2xl font-light text-foreground mb-6">{title}</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Selections */}
        <div className="space-y-6">
          {/* Color Swatches */}
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-3">
              Select Colour
            </label>
            
            {/* Large Preview Image */}
            {selectedColor && (
              <div className="mb-4 rounded-lg overflow-hidden border border-border aspect-[4/3]">
                {colors.find(c => c.name === selectedColor)?.image ? (
                  <img 
                    src={colors.find(c => c.name === selectedColor)?.image} 
                    alt={selectedColor}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div 
                    className="w-full h-full"
                    style={{ backgroundColor: colors.find(c => c.name === selectedColor)?.hex }}
                  />
                )}
              </div>
            )}
            
            {/* Color Swatches Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={cn(
                    "relative aspect-square rounded-md transition-all duration-200 border-2 overflow-hidden",
                    selectedColor === color.name 
                      ? "border-accent ring-2 ring-accent/30" 
                      : "border-border hover:border-foreground/40"
                  )}
                  title={color.name}
                >
                  {color.image ? (
                    <img 
                      src={color.image} 
                      alt={color.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full"
                      style={{ backgroundColor: color.hex }}
                    >
                      {color.hex === '#FFFFFF' && (
                        <div className="w-full h-full border border-gray-200" />
                      )}
                    </div>
                  )}
                  {/* Selected indicator */}
                  {selectedColor === color.name && (
                    <div className="absolute top-1 right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            {/* Selected color name */}
            {selectedColor && (
              <p className="mt-2 text-sm text-foreground font-medium">{selectedColor}</p>
            )}
          </div>

          {/* Product Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">
              Product Type
            </label>
            <Select value={selectedProductType} onValueChange={handleProductTypeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select product type" />
              </SelectTrigger>
              <SelectContent>
                {productTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Size Dropdown */}
          {selectedProductTypeData && (
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">
                Size
              </label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {selectedProductTypeData.sizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label} - £{size.price.toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Price Display */}
          {selectedSizeData && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-foreground/70">Price per item:</span>
                <span className="text-xl font-display text-foreground">£{selectedSizeData.price.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl font-medium w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Calendar & Add to Basket */}
        <div className="space-y-6">
          {/* Calendar Section - Only shows after clicking "Select Dates" */}
          {showCalendar ? (
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">
                Select Start Date (3-day hire)
              </label>
              <div className="border border-border rounded-lg p-4 bg-background">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="pointer-events-auto mx-auto"
                />
                {selectedDate && hireEndDate && (
                  <div className="mt-4 p-3 bg-accent/10 rounded-lg text-center">
                    <p className="text-sm text-foreground/70">Hire Period:</p>
                    <p className="font-medium text-foreground">
                      {format(selectedDate, 'EEE, dd MMM yyyy')} - {format(hireEndDate, 'EEE, dd MMM yyyy')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[200px]">
              <div className="text-center">
                <CalendarDays className="w-12 h-12 mx-auto mb-4 text-foreground/30" />
                <p className="text-foreground/60 text-sm mb-4">
                  Complete your selection above, then select your hire dates
                </p>
                <Button
                  variant="outline"
                  onClick={handleShowCalendar}
                  className="gap-2"
                >
                  <CalendarDays className="w-4 h-4" />
                  Select Hire Dates
                </Button>
              </div>
            </div>
          )}

          {/* Size Guide & Add to Basket */}
          <div className="flex items-center gap-4">
            <SizeGuideDialog type={sizeGuideType} />
            <Button 
              onClick={handleAddToBasket}
              disabled={!selectedColor || !selectedProductType || !selectedSize || !selectedDate}
              className="flex-1 gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Basket
            </Button>
          </div>

          {/* Total if quantity > 1 */}
          {selectedSizeData && quantity > 1 && (
            <div className="p-4 bg-accent/10 rounded-lg text-center">
              <span className="text-foreground/70">Subtotal: </span>
              <span className="text-xl font-display text-accent">
                £{(selectedSizeData.price * quantity).toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventProductSection;
