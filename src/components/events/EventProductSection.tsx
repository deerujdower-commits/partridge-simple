import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { useIsMobile } from '@/hooks/use-mobile';
import SizeGuideDialog from '@/components/SizeGuideDialog';

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

interface ProductState {
  selectedSize: SizeOption;
  quantity: number;
}

interface EventProductSectionProps {
  title: string;
  colors: ColorOption[];
  productTypes: ProductType[];
  sizeGuideType?: 'rectangular' | 'round' | 'both';
}

const EventProductSection = ({ title, colors, productTypes, sizeGuideType = 'both' }: EventProductSectionProps) => {
  const { toast } = useToast();
  const { addItem } = useEnquiry();
  const isMobile = useIsMobile();
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [hoveredColor, setHoveredColor] = useState<ColorOption | null>(null);
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  
  // Track state for each product type
  const [productStates, setProductStates] = useState<Record<string, ProductState>>(() => {
    const initial: Record<string, ProductState> = {};
    productTypes.forEach(pt => {
      initial[pt.value] = {
        selectedSize: pt.sizes[0],
        quantity: 10,
      };
    });
    return initial;
  });

  const handleSizeChange = (productValue: string, sizeValue: string) => {
    const productType = productTypes.find(p => p.value === productValue);
    const size = productType?.sizes.find(s => s.value === sizeValue);
    if (size) {
      setProductStates(prev => ({
        ...prev,
        [productValue]: { ...prev[productValue], selectedSize: size }
      }));
    }
  };

  const handleQuantityChange = (productValue: string, delta: number) => {
    setProductStates(prev => ({
      ...prev,
      [productValue]: {
        ...prev[productValue],
        quantity: Math.max(1, prev[productValue].quantity + delta)
      }
    }));
  };

  const handleAddToEnquiry = (productType: ProductType) => {
    const state = productStates[productType.value];
    const item = {
      name: `${title} - ${productType.label}`,
      category: title,
      color: selectedColor.name,
      size: state.selectedSize.label,
      quantity: state.quantity,
      image: selectedColor.image || '',
      description: `${selectedColor.name} ${productType.label} - ${state.selectedSize.label}`,
    };
    
    addItem(item);
    
    toast({
      title: "Added to enquiry",
      description: `${state.quantity}x ${selectedColor.name} ${productType.label} (${state.selectedSize.label})`,
    });
  };

  return (
    <div className="bg-muted/30 border border-border rounded-lg p-5 mb-6">
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Left side - Form controls */}
        <div className="flex-1 min-w-0 order-2 sm:order-1">
          <h3 className="font-display text-lg font-medium text-foreground mb-4 hidden sm:block">{title}</h3>

          {/* Color Selection */}
          <div className="mb-4">
            <label className="block text-sm font-body text-foreground/70 mb-2">Colour</label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                isMobile ? (
                  <Popover 
                    key={color.name} 
                    open={openPopover === color.name} 
                    onOpenChange={(open) => setOpenPopover(open ? color.name : null)}
                  >
                    <PopoverTrigger asChild>
                      <button
                        className={`relative w-8 h-8 rounded-full border-2 transition-all overflow-hidden shadow-sm ${
                          selectedColor.name === color.name 
                            ? 'border-primary ring-2 ring-primary/30' 
                            : 'border-foreground/30'
                        }`}
                        style={color.image ? undefined : { backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {color.image ? (
                          <img 
                            src={color.image} 
                            alt={color.name}
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                        {selectedColor.name === color.name && (
                          <Check className={`w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                            color.hex === '#FFFFFF' || color.hex === '#F5F5DC' || color.hex === '#F7E7CE' || color.hex === '#F4C2C2' || color.hex === '#C0C0C0'
                              ? 'text-foreground' 
                              : 'text-white'
                          } drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]`} />
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent side="top" className="w-auto p-3 bg-popover z-50">
                      <div className="flex flex-col items-center gap-2">
                        {color.image && (
                          <img 
                            src={color.image} 
                            alt={color.name}
                            className="w-32 h-32 object-cover rounded"
                          />
                        )}
                        <p className="text-sm font-medium text-foreground">{color.name}</p>
                        <Button 
                          size="sm" 
                          onClick={() => {
                            setSelectedColor(color);
                            setOpenPopover(null);
                          }}
                        >
                          Select
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    onMouseEnter={() => setHoveredColor(color)}
                    onMouseLeave={() => setHoveredColor(null)}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all overflow-hidden shadow-sm ${
                      selectedColor.name === color.name 
                        ? 'border-primary ring-2 ring-primary/30' 
                        : 'border-foreground/30 hover:border-primary/50'
                    }`}
                    style={color.image ? undefined : { backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {color.image ? (
                      <img 
                        src={color.image} 
                        alt={color.name}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                    {selectedColor.name === color.name && (
                      <Check className={`w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                        color.hex === '#FFFFFF' || color.hex === '#F5F5DC' || color.hex === '#F7E7CE' || color.hex === '#F4C2C2' || color.hex === '#C0C0C0'
                          ? 'text-foreground' 
                          : 'text-white'
                      } drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]`} />
                    )}
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Size Guide */}
          <div className="mb-4">
            <SizeGuideDialog type={sizeGuideType} />
          </div>

          {/* Product Types - Each with own controls */}
          <div className="space-y-4">
            {productTypes.map((productType) => {
              const state = productStates[productType.value];
              const totalPrice = state.selectedSize.price * state.quantity;
              
              return (
                <div key={productType.value} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-body text-sm font-medium text-foreground">{productType.label}</h4>
                    <span className="text-xs text-foreground/60">
                      £{state.selectedSize.price.toFixed(2)} each
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    {/* Size Selection */}
                    {productType.sizes.length === 1 ? (
                      <span className="text-sm font-body text-foreground/70">{state.selectedSize.label}</span>
                    ) : (
                      <Select 
                        value={state.selectedSize.value} 
                        onValueChange={(value) => handleSizeChange(productType.value, value)}
                      >
                        <SelectTrigger className="w-32 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {productType.sizes.map((size) => (
                            <SelectItem key={size.value} value={size.value} className="text-xs">
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(productType.value, -10)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-10 text-center font-body text-sm font-medium text-foreground">
                        {state.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(productType.value, 10)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Price & Add Button */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-display font-medium text-foreground">
                      £{totalPrice.toFixed(2)}
                    </p>
                    <Button 
                      size="sm"
                      onClick={() => handleAddToEnquiry(productType)} 
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <ShoppingBag className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side (top on mobile) - Large Preview Image */}
        {selectedColor.image && (
          <div className="flex-shrink-0 order-1 sm:order-2">
            <h3 className="font-display text-lg font-medium text-foreground mb-3 sm:hidden">{title}</h3>
            <div className="rounded-lg overflow-hidden border border-border">
              <img 
                src={selectedColor.image} 
                alt={`${selectedColor.name} fabric swatch`}
                className="w-full h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 object-cover"
              />
            </div>
            <p className="text-sm text-center mt-2 font-body text-foreground/70">{selectedColor.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventProductSection;