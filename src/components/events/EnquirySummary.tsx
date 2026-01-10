import { ShoppingBag, X, ChevronRight } from 'lucide-react';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const EnquirySummary = () => {
  const { items, getTotalItems, removeItem } = useEnquiry();
  const navigate = useNavigate();
  const totalItems = getTotalItems();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full sm:w-auto">
      <div className="bg-background border-2 border-primary shadow-xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            <span className="font-display text-sm font-medium">Your Enquiry</span>
          </div>
          <span className="bg-primary-foreground text-primary text-xs font-bold px-2 py-0.5 rounded-full">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* Items List */}
        <div className="max-h-48 overflow-y-auto p-3 space-y-2">
          {items.slice(0, 5).map((item) => (
            <div 
              key={item.id} 
              className="flex items-center gap-2 bg-muted/50 rounded-lg p-2 text-sm"
            >
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-8 h-8 object-cover rounded"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-body text-foreground truncate text-xs">
                  {item.quantity}x {item.color} {item.name.split(' - ')[1] || item.name}
                </p>
                {item.size && (
                  <p className="text-foreground/50 text-xs">{item.size}</p>
                )}
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-foreground/40 hover:text-destructive transition-colors p-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {items.length > 5 && (
            <p className="text-xs text-foreground/50 text-center">
              +{items.length - 5} more items
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-3">
          <Button 
            onClick={() => navigate('/enquiry')}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            size="sm"
          >
            View Full Enquiry
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnquirySummary;