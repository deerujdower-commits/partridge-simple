import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingBag, Plus, Minus, Check, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEnquiry } from '@/contexts/EnquiryContext';
import chairCoverWhite from '@/assets/chair-cover-white.png';
import chairCoverBlack from '@/assets/chair-cover-black.png';
import chairSashExample from '@/assets/chair-sash-example.png';

const chairCoverColors = [
  { name: 'White', hex: '#FFFFFF', image: chairCoverWhite },
  { name: 'Black', hex: '#1a1a1a', image: chairCoverBlack },
];

const ChairCoversSection = () => {
  const { toast } = useToast();
  const { addItem } = useEnquiry();
  
  const [selectedChairColor, setSelectedChairColor] = useState(chairCoverColors[0]);
  const [chairQuantity, setChairQuantity] = useState(0);
  const [sashColour, setSashColour] = useState('');
  const [sashQuantity, setSashQuantity] = useState(0);

  const chairPrice = 0.80;
  const sashPrice = 0.60;
  const chairTotal = chairPrice * chairQuantity;
  const sashTotal = sashPrice * sashQuantity;

  const handleAddChairCover = () => {
    if (chairQuantity === 0) {
      toast({
        title: "Please add quantity",
        description: "Set the quantity before adding to enquiry.",
        variant: "destructive",
      });
      return;
    }

    addItem({
      name: `Chair Cover - ${selectedChairColor.name}`,
      category: 'Chair Covers',
      color: selectedChairColor.name,
      quantity: chairQuantity,
      image: selectedChairColor.image,
      description: `${selectedChairColor.name} Chair Cover`,
    });
    
    toast({
      title: "Added to enquiry",
      description: `${chairQuantity}x ${selectedChairColor.name} Chair Cover`,
    });

    setChairQuantity(0);
  };

  const handleAddSash = () => {
    if (sashQuantity === 0) {
      toast({
        title: "Please add quantity",
        description: "Set the quantity before adding to enquiry.",
        variant: "destructive",
      });
      return;
    }

    if (!sashColour.trim()) {
      toast({
        title: "Please specify colour",
        description: "Enter the colour you need for the sashes.",
        variant: "destructive",
      });
      return;
    }
    
    addItem({
      name: `Chair Cover Sash - ${sashColour.trim()}`,
      category: 'Chair Covers',
      color: sashColour.trim(),
      quantity: sashQuantity,
      image: chairSashExample,
      description: `${sashQuantity}x ${sashColour.trim()} Sash`,
    });
    
    toast({
      title: "Added to enquiry",
      description: `${sashQuantity}x ${sashColour.trim()} Chair Cover Sash`,
    });
    setSashColour('');
    setSashQuantity(0);
  };

  return (
    <div className="h-full">
      <div className="bg-muted/30 border border-border rounded-lg p-5 h-full">
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Left side - Form controls */}
          <div className="flex-1 min-w-0 order-2 sm:order-1">
            <h3 className="font-display text-lg font-medium text-foreground mb-4 hidden sm:block">Chair Covers</h3>

            {/* Color Selection */}
            <div className="mb-4">
              <label className="block text-sm font-body text-foreground/70 mb-2">Colour</label>
              <div className="flex gap-3">
                {chairCoverColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedChairColor(color)}
                    className="flex flex-col items-center"
                  >
                    <div 
                      className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                        selectedChairColor.name === color.name 
                          ? 'border-primary ring-2 ring-primary/30' 
                          : color.name === 'White' 
                            ? 'border-foreground/30 shadow-sm' 
                            : 'border-foreground/20'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedChairColor.name === color.name && (
                        <Check className={`w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                          color.hex === '#FFFFFF' ? 'text-foreground' : 'text-white'
                        } drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]`} />
                      )}
                    </div>
                    <span className="text-xs font-body text-foreground/70 mt-1">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Display */}
            <div className="mb-4">
              <p className="text-sm font-body text-foreground/70">
                Price: <span className="text-foreground font-medium">80p each</span>
              </p>
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label className="block text-sm font-body text-foreground/70 mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setChairQuantity(Math.max(0, chairQuantity - 10))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-16 text-center font-body font-medium text-foreground">{chairQuantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setChairQuantity(chairQuantity + 10)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-border">
              <div>
                <p className="text-sm text-foreground/60 font-body">Total</p>
                <p className="text-lg font-display font-medium text-foreground">£{chairTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Right side (top on mobile) - Large Preview Image */}
          <div className="flex-shrink-0 order-1 sm:order-2 flex flex-col">
            <h3 className="font-display text-lg font-medium text-foreground mb-3 sm:hidden">Chair Covers</h3>
            <div className="rounded-lg overflow-hidden border border-border bg-white">
              <img 
                src={selectedChairColor.image} 
                alt={`${selectedChairColor.name} chair cover`}
                className="w-full h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 object-contain"
              />
            </div>
            <p className="text-sm text-center mt-2 font-body text-foreground/70">{selectedChairColor.name}</p>
            <div className="mt-auto pt-4">
              <Button 
                onClick={handleAddChairCover} 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={chairQuantity === 0}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Enquiry
              </Button>
            </div>
          </div>
        </div>

        {/* Chair Sashes Section */}
        <div className="border-t border-border pt-5 mt-5">
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Left side - Form controls */}
            <div className="flex-1 min-w-0 order-2 sm:order-1">
              <h4 className="font-display text-lg font-medium text-foreground mb-4 hidden sm:block">Chair Cover Sashes</h4>

              {/* Price Display */}
              <div className="mb-4">
                <p className="text-sm font-body text-foreground/70">
                  Price: <span className="text-foreground font-medium">60p each</span>
                </p>
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="block text-sm font-body text-foreground/70 mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setSashQuantity(Math.max(0, sashQuantity - 10))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-16 text-center font-body font-medium text-foreground">{sashQuantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setSashQuantity(sashQuantity + 10)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Colour Input */}
              <div className="mb-4">
                <label className="block text-sm font-body text-foreground/70 mb-2">Colour</label>
                <Input
                  placeholder="e.g. Royal Blue, Gold..."
                  value={sashColour}
                  onChange={(e) => setSashColour(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-foreground/60 font-body">Total</p>
                  <p className="text-lg font-display font-medium text-foreground">£{sashTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Right side (top on mobile) - Large Preview Image */}
            <div className="flex-shrink-0 order-1 sm:order-2 flex flex-col">
              <h4 className="font-display text-lg font-medium text-foreground mb-3 sm:hidden">Chair Cover Sashes</h4>
              <div className="rounded-lg overflow-hidden border border-border bg-white">
                <img 
                  src={chairSashExample} 
                  alt="Example chair cover sash"
                  className="w-full h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 object-contain"
                />
              </div>
              <p className="text-sm text-center mt-2 font-body text-foreground/70">Example sash</p>
              <div className="mt-auto pt-4">
                <Button 
                  onClick={handleAddSash} 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={sashQuantity === 0 || !sashColour.trim()}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Enquiry
                </Button>
              </div>
            </div>
          </div>

          {/* Stock Note - Full width */}
          <div className="flex items-start justify-center gap-2 mt-4 bg-muted/50 rounded-lg p-3">
            <Info className="w-4 h-4 text-foreground/50 flex-shrink-0 mt-0.5" />
            <p className="text-xs font-body text-foreground/50">
              Sash stock will be checked. If not available, we can recommend similar colours. Checkout is via email with a payment link sent back to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChairCoversSection;