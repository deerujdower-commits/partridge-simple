import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { cn } from '@/lib/utils';
import SizeGuideDialog from '@/components/SizeGuideDialog';
import { toast } from 'sonner';

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

interface ProductTypeOption {
  value: string;
  label: string;
  sizes: SizeOption[];
}

interface EventProductSectionProps {
  title: string;
  colors: ColorOption[];
  productTypes: ProductTypeOption[];
  sizeGuideType: 'rectangular' | 'round' | 'both';
}

const EventProductSection = ({ title, colors, productTypes, sizeGuideType }: EventProductSectionProps) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]?.name || '');
  const [selectedProductType, setSelectedProductType] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const selectedProductTypeData = productTypes.find(pt => pt.value === selectedProductType);
  const selectedSizeData = selectedProductTypeData?.sizes.find(s => s.value === selectedSize);
  
  const hireEndDate = selectedDate ? addDays(selectedDate, 2) : undefined;

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToBasket = () => {
    if (!selectedColor || !selectedProductType || !selectedSize || !selectedDate) {
      toast.error('Please complete all selections', {
        description: 'Select color, product type, size, and hire date.'
      });
      return;
    }
    
    toast.success('Added to basket', {
      description: `${quantity}x ${selectedColor} ${selectedProductTypeData?.label} (${selectedSizeData?.label}) - ${format(selectedDate, 'dd MMM')} to ${format(hireEndDate!, 'dd MMM yyyy')}`
    });
    
    // Reset quantity after adding
    setQuantity(1);
  };

  const totalPrice = selectedSizeData ? selectedSizeData.price * quantity : 0;

  return (
    <section className="py-12 border-b border-border">
      <h2 className="font-display text-2xl md:text-3xl font-light text-foreground mb-8">
        {title}
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Selections */}
        <div className="space-y-6">
          {/* Color Swatches - Large Squares */}
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-3">
              Select Colour
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={cn(
                    "relative aspect-square rounded-lg transition-all duration-200 border-2 overflow-hidden group",
                    selectedColor === color.name 
                      ? "border-accent ring-2 ring-accent/30 scale-[1.02]" 
                      : "border-border hover:border-foreground/40 hover:scale-[1.01]"
                  )}
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
                  {/* Color name overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <span className="text-white text-sm font-medium">{color.name}</span>
                  </div>
                  {/* Selected indicator */}
                  {selectedColor === color.name && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">
              Product Type
            </label>
            <Select value={selectedProductType} onValueChange={(value) => {
              setSelectedProductType(value);
              setSelectedSize('');
            }}>
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder="Select product type" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                {productTypes.map((pt) => (
                  <SelectItem key={pt.value} value={pt.value}>
                    {pt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Size Dropdown */}
          {selectedProductType && selectedProductTypeData && (
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">
                Size
              </label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent className="bg-background">
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
                <span className="text-foreground/70">Price per item (3-day hire):</span>
                <span className="font-display text-lg font-medium">£{selectedSizeData.price.toFixed(2)}</span>
              </div>
              {quantity > 1 && (
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
                  <span className="text-foreground/70">Total ({quantity} items):</span>
                  <span className="font-display text-xl font-semibold text-accent">£{totalPrice.toFixed(2)}</span>
                </div>
              )}
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
          {/* Inline Calendar */}
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">
              Select Hire Start Date (3-day hire period)
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

          {/* Size Guide & Add to Basket */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <SizeGuideDialog type={sizeGuideType} />
            <Button
              className="flex-1 w-full sm:w-auto gap-2"
              size="lg"
              onClick={handleAddToBasket}
              disabled={!selectedColor || !selectedProductType || !selectedSize || !selectedDate}
            >
              <ShoppingBag className="h-5 w-5" />
              Add to Basket
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventProductSection;
