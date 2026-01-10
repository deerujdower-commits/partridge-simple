import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ShoppingBag, Plus, Minus, Check } from 'lucide-react';
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
  const [chairQuantity, setChairQuantity] = useState(10);
  const [sashDetails, setSashDetails] = useState('');
  const [sashQuantity, setSashQuantity] = useState(10);

  const chairPrice = 0.80;
  const sashPrice = 0.60;
  const chairTotal = chairPrice * chairQuantity;
  const sashTotal = sashPrice * sashQuantity;

  const handleAddChairCover = () => {
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
  };

  const handleAddSash = () => {
    if (!sashDetails.trim()) {
      toast({
        title: "Please specify details",
        description: "Enter the colour and quantity you need for the sashes.",
        variant: "destructive",
      });
      return;
    }
    
    addItem({
      name: `Chair Cover Sash`,
      category: 'Chair Covers',
      quantity: sashQuantity,
      image: chairSashExample,
      description: `Sash request: ${sashDetails}`,
    });
    
    toast({
      title: "Added to enquiry",
      description: `Chair Cover Sash request added`,
    });
    setSashDetails('');
  };

  return (
    <div className="min-h-[400px]">
      <h3 className="font-display text-xl font-light text-foreground mb-4">Chair Covers</h3>
      
      <div className="bg-muted/30 border border-border rounded-lg p-5">
        {/* Chair Cover Section */}
        <div className="mb-6">
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
                    className={`relative w-10 h-10 rounded-full border-2 transition-all ${
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

          {/* Preview Image */}
          <div className="mb-4">
            <img 
              src={selectedChairColor.image} 
              alt={`${selectedChairColor.name} chair cover`}
              className="w-32 h-32 object-contain rounded-lg bg-white shadow-sm"
            />
          </div>

          {/* Price & Quantity */}
          <div className="mb-4">
            <p className="text-sm font-body text-foreground/70 mb-2">
              Price: <span className="text-foreground font-medium">80p each</span>
            </p>
            <div className="flex items-center gap-3">
              <label className="text-sm font-body text-foreground/70">Quantity:</label>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setChairQuantity(Math.max(1, chairQuantity - 10))}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="w-12 text-center font-body font-medium text-foreground">{chairQuantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setChairQuantity(chairQuantity + 10)}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Total & Add Button */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-sm text-foreground/60 font-body">Total</p>
              <p className="text-lg font-display font-medium text-foreground">£{chairTotal.toFixed(2)}</p>
            </div>
            <Button onClick={handleAddChairCover} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Enquiry
            </Button>
          </div>
        </div>

        {/* Chair Sashes Section */}
        <div className="border-t border-border pt-5">
          <h4 className="font-display text-base font-medium text-foreground mb-3">Chair Cover Sashes</h4>
          
          <div className="flex items-start gap-4 mb-4">
            <img 
              src={chairSashExample} 
              alt="Example chair cover sash" 
              className="w-24 h-24 object-contain rounded-lg bg-white shadow-sm flex-shrink-0"
            />
            <div className="flex-1">
              <p className="font-body text-sm text-foreground/70 mb-2">
                We sell a wide variety of chair cover sashes. Stock needs to be checked for colour and quantity availability.
              </p>
              <p className="text-sm font-body text-foreground/70">
                Price: <span className="text-foreground font-medium">60p each</span>
              </p>
            </div>
          </div>

          {/* Sash Details Input */}
          <div className="mb-4">
            <label className="block text-sm font-body text-foreground/70 mb-2">
              What colour and how many do you need?
            </label>
            <Textarea
              placeholder="e.g. 50x Royal Blue, 20x Gold..."
              value={sashDetails}
              onChange={(e) => setSashDetails(e.target.value)}
              className="min-h-[60px]"
            />
          </div>

          {/* Quantity & Add Button */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-sm text-foreground/60 font-body">Estimated Total</p>
              <p className="text-lg font-display font-medium text-foreground">£{sashTotal.toFixed(2)}</p>
              <p className="text-xs text-foreground/50">(based on {sashQuantity} sashes)</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setSashQuantity(Math.max(1, sashQuantity - 10))}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-10 text-center font-body text-sm text-foreground">{sashQuantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setSashQuantity(sashQuantity + 10)}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              <Button onClick={handleAddSash} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Enquiry
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChairCoversSection;