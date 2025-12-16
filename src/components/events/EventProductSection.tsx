import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Plus, Minus, ShoppingBag, CalendarDays, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  
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

  // Reset size when product type changes, auto-select if only one size
  const handleProductTypeChange = (value: string) => {
    setSelectedProductType(value);
    const productType = productTypes.find(p => p.value === value);
    // Auto-select size if only one option
    if (productType?.sizes.length === 1) {
      setSelectedSize(productType.sizes[0].value);
    } else {
      setSelectedSize('');
    }
    setShowCalendar(false);
    setSelectedDate(undefined);
  };
  
  const hasSingleSize = selectedProductTypeData?.sizes.length === 1;

  const hoveredColorData = colors.find(c => c.name === hoveredColor);

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 mb-6">
      <h2 className="font-display text-xl font-light text-foreground mb-4">{title}</h2>
      
      <div className="space-y-4">
        {/* Color Swatches */}
        <div className="relative">
          <label className="block text-sm font-medium text-foreground/70 mb-2">
            Select Colour
          </label>
          
          {/* Color Swatches Grid */}
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-1.5">
            {colors.map((color) => (
              <div key={color.name} className="relative group">
                <button
                  onClick={() => setSelectedColor(color.name)}
                  onMouseEnter={() => setHoveredColor(color.name)}
                  onMouseLeave={() => setHoveredColor(null)}
                  className={cn(
                    "relative aspect-square rounded transition-all duration-200 border-2 overflow-hidden w-full",
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
                    <div className="absolute top-0.5 right-0.5 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
                
                {/* Hover Preview Popup */}
                <div className={cn(
                  "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 pointer-events-none transition-all duration-200",
                  hoveredColor === color.name 
                    ? "opacity-100 scale-100" 
                    : "opacity-0 scale-95"
                )}>
                  <div className="w-40 h-40 rounded-lg overflow-hidden border-2 border-accent shadow-2xl bg-card">
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
                      />
                    )}
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rotate-45" />
                  <p className="text-center mt-2 text-xs font-medium text-foreground bg-card/90 rounded px-2 py-0.5">
                    {color.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Selected color name */}
          {selectedColor && (
            <p className="mt-1.5 text-xs text-foreground font-medium">{selectedColor}</p>
          )}
        </div>

        {/* Product Type & Size Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-foreground/70 mb-1.5">
              Product Type
            </label>
            <Select value={selectedProductType} onValueChange={handleProductTypeChange}>
              <SelectTrigger className="w-full h-9 text-sm">
                <SelectValue placeholder="Select type" />
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

          {/* Size - Dropdown or Static Text */}
          <div>
            <label className="block text-xs font-medium text-foreground/70 mb-1.5">
              Size
            </label>
            {hasSingleSize ? (
              // Single size - show as static text
              <div className="h-9 px-3 flex items-center text-sm bg-muted/50 rounded-md border border-border">
                {selectedProductTypeData?.sizes[0].label} - £{selectedProductTypeData?.sizes[0].price.toFixed(2)}
              </div>
            ) : (
              // Multiple sizes - show dropdown
              <Select 
                value={selectedSize} 
                onValueChange={setSelectedSize}
                disabled={!selectedProductTypeData}
              >
                <SelectTrigger className="w-full h-9 text-sm">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {selectedProductTypeData?.sizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label} - £{size.price.toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {/* Size Guide - Always visible when product type is selected */}
        {selectedProductType && (
          <div className="pt-1">
            <SizeGuideDialog type={sizeGuideType} />
          </div>
        )}

        {/* Quantity & Calendar Section - Only show when size is selected */}
        {selectedSizeData && (
          <div className="space-y-3 pt-2 border-t border-border">
            {/* Quantity Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-foreground/70">Qty:</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-sm text-foreground/70">Total: </span>
                <span className="text-lg font-display text-foreground">
                  £{(selectedSizeData.price * quantity).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Calendar Toggle */}
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-foreground/60" />
                <span className="text-sm font-medium">
                  {selectedDate 
                    ? `${format(selectedDate, 'dd MMM')} - ${format(hireEndDate!, 'dd MMM yyyy')}`
                    : 'Select Hire Dates'
                  }
                </span>
              </div>
              {showCalendar ? (
                <ChevronUp className="w-4 h-4 text-foreground/60" />
              ) : (
                <ChevronDown className="w-4 h-4 text-foreground/60" />
              )}
            </button>

            {/* Calendar - Collapsible */}
            {showCalendar && (
              <div className="border border-border rounded-lg p-3 bg-background">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                  }}
                  disabled={(date) => date < new Date()}
                  className="pointer-events-auto mx-auto"
                />
              </div>
            )}

            {/* Actions Row */}
            <div className="flex items-center gap-3">
              <Button 
                onClick={handleAddToBasket}
                disabled={!selectedColor || !selectedProductType || !selectedSize || !selectedDate}
                className="flex-1 gap-2 h-9"
                size="sm"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Basket
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventProductSection;