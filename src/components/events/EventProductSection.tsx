import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const [quantity, setQuantity] = useState(0);
  const [hoveredColor, setHoveredColor] = useState<ColorOption | null>(null);

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
    if (quantity === 0) {
      toast({
        title: "Please add quantity",
        description: "Set the quantity before adding to enquiry.",
        variant: "destructive",
      });
      return;
    }

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

    // Reset quantity for next addition
    setQuantity(0);
  };

  const totalPrice = selectedSize.price * quantity;

  return (
    <div className="bg-muted/30 border border-border rounded-lg p-5 h-full transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:bg-muted/40">
      <h3 className="font-display text-lg font-medium text-foreground mb-4 text-center sm:text-left">{title}</h3>

      {/* Top section: Colours + Image */}
      <div className="flex flex-col sm:flex-row gap-5 mb-4">
        {/* Left side - Colours */}
        <div className="flex-1 min-w-0 order-2 sm:order-1 text-center sm:text-left">

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-body text-foreground/70 mb-2">Colour</label>
            <div className="grid grid-cols-3 gap-2 min-h-[72px] content-start justify-items-center sm:justify-items-start">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  onMouseEnter={() => !isMobile && setHoveredColor(color)}
                  onMouseLeave={() => !isMobile && setHoveredColor(null)}
                  className={`relative w-8 h-8 rounded-full border-2 transition-all overflow-hidden shadow-sm ${
                    selectedColor.name === color.name 
                      ? 'border-primary ring-2 ring-primary/30' 
                      : 'border-foreground/30 md:hover:border-primary/50'
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
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Preview Image */}
        {selectedColor.image && (
          <div className="flex-shrink-0 order-1 sm:order-2 flex flex-col">
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

      {/* Bottom section: Product/Size on left, Quantity/Add on right */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border text-center sm:text-left">
        {/* Left - Product, Size, Size Guide */}
        <div className="flex-1">
          {/* Product Type Selection */}
          <div className="mb-3">
            <label className="block text-sm font-body text-foreground/70 mb-1">Product</label>
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
          <div className="mb-3">
            <label className="block text-sm font-body text-foreground/70 mb-1">Size</label>
            {selectedProductType.sizes.length === 1 ? (
              <p className="text-sm font-body text-foreground">{selectedSize.label} - £{selectedSize.price.toFixed(2)} each</p>
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

          {/* Size Guide */}
          <SizeGuideDialog type={sizeGuideType} />
        </div>

        {/* Right - Quantity and Add to Enquiry */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Quantity */}
          <div className="mb-3">
            <label className="block text-xs font-body text-foreground/70 mb-1">Quantity</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity(Math.max(0, quantity - 1))}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 text-center font-body font-medium text-foreground text-sm border border-border rounded-md h-8 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <p className="text-xs text-foreground/60 font-body mt-1">
              Total: <span className="font-medium text-foreground">£{totalPrice.toFixed(2)}</span>
            </p>
          </div>

          {/* Add to Enquiry */}
          <Button 
            onClick={handleAddToEnquiry} 
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={quantity === 0}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add to Enquiry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventProductSection;