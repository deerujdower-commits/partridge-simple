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
  const [selectedProductType, setSelectedProductType] = useState(productTypes[0]);
  const [selectedSize, setSelectedSize] = useState(productTypes[0].sizes[0]);
  const [quantity, setQuantity] = useState(10);
  const [hoveredColor, setHoveredColor] = useState<ColorOption | null>(null);
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const handleProductTypeChange = (value: string) => {
    const productType = productTypes.find(p => p.value === value);
    if (productType) {
      setSelectedProductType(productType);
      setSelectedSize(productType.sizes[0]);
    }
  };

  const handleSizeChange = (value: string) => {
    const size = selectedProductType.sizes.find(s => s.value === value);
    if (size) {
      setSelectedSize(size);
    }
  };

  const handleAddToEnquiry = () => {
    const item = {
      name: `${title} - ${selectedProductType.label}`,
      category: title,
      color: selectedColor.name,
      size: selectedSize.label,
      quantity,
      image: selectedColor.image || '',
      description: `${selectedColor.name} ${selectedProductType.label} - ${selectedSize.label}`,
    };
    
    addItem(item);
    
    toast({
      title: "Added to enquiry",
      description: `${quantity}x ${selectedColor.name} ${selectedProductType.label} (${selectedSize.label})`,
    });
  };

  const totalPrice = selectedSize.price * quantity;

  return (
    <div className="bg-muted/30 border border-border rounded-lg p-5 mb-6">
      <h3 className="font-display text-lg font-medium text-foreground mb-4">{title}</h3>

      {/* Color Selection with Preview */}
      <div className="mb-4">
        <label className="block text-sm font-body text-foreground/70 mb-2">Colour</label>
        <div className="flex gap-4 items-start">
          {/* Color Swatches - Left */}
          <div className="flex flex-wrap gap-2 flex-1 max-w-[200px]">
            {colors.map((color) => (
              isMobile ? (
                <Popover 
                  key={color.name} 
                  open={openPopover === color.name} 
                  onOpenChange={(open) => setOpenPopover(open ? color.name : null)}
                >
                  <PopoverTrigger asChild>
                    <button
                      className={`relative w-8 h-8 rounded-full border-2 transition-all overflow-hidden ${
                        selectedColor.name === color.name 
                          ? 'border-primary ring-2 ring-primary/30' 
                          : 'border-border'
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
                  className={`relative w-8 h-8 rounded-full border-2 transition-all overflow-hidden ${
                    selectedColor.name === color.name 
                      ? 'border-primary ring-2 ring-primary/30' 
                      : 'border-border hover:border-primary/50'
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
          
          {/* Selected Color Preview - Right */}
          {selectedColor.image && (
            <div className="flex-shrink-0">
              <div className="rounded-lg overflow-hidden border border-border">
                <img 
                  src={selectedColor.image} 
                  alt={`${selectedColor.name} fabric swatch`}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover"
                />
              </div>
              <p className="text-xs text-center mt-1 font-body text-foreground/70">{selectedColor.name}</p>
            </div>
          )}
        </div>
      </div>

      {/* Product Type Selection */}
      <div className="mb-4">
        <label className="block text-sm font-body text-foreground/70 mb-2">Product</label>
        <Select value={selectedProductType.value} onValueChange={handleProductTypeChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
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

      {/* Size Selection */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-body text-foreground/70">Size</label>
          <SizeGuideDialog type={sizeGuideType} />
        </div>
        {selectedProductType.sizes.length === 1 ? (
          <p className="text-sm font-body text-foreground">{selectedSize.label}</p>
        ) : (
          <Select value={selectedSize.value} onValueChange={handleSizeChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {selectedProductType.sizes.map((size) => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label} - £{size.price.toFixed(2)} each
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Quantity */}
      <div className="mb-4">
        <label className="block text-sm font-body text-foreground/70 mb-2">Quantity</label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => setQuantity(Math.max(1, quantity - 10))}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-16 text-center font-body font-medium text-foreground">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => setQuantity(quantity + 10)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Price & Add Button */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div>
          <p className="text-sm text-foreground/60 font-body">Total</p>
          <p className="text-lg font-display font-medium text-foreground">£{totalPrice.toFixed(2)}</p>
        </div>
        <Button onClick={handleAddToEnquiry} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <ShoppingBag className="w-4 h-4 mr-2" />
          Add to Enquiry
        </Button>
      </div>
    </div>
  );
};

export default EventProductSection;
