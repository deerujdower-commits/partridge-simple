import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryImage {
  src: string;
  alt: string;
}

interface InstagramGalleryProps {
  images: GalleryImage[];
  isOpen: boolean;
  onClose: () => void;
}

const InstagramGallery = ({ images, isOpen, onClose }: InstagramGalleryProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = (index: number) => {
    pressTimerRef.current = setTimeout(() => {
      setPressedIndex(index);
    }, 200);
  };

  const handleTouchEnd = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
    }
    setPressedIndex(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center justify-between">
        <h2 className="font-display text-lg font-light text-foreground">Event Gallery</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-muted rounded-full transition-colors"
          aria-label="Close gallery"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Scrollable Grid */}
      <div className="h-[calc(100vh-57px)] overflow-y-auto">
        <div className="grid grid-cols-3 gap-0.5 p-0.5">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square bg-muted cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-200",
                  pressedIndex === index && 'scale-95'
                )}
                draggable={false}
              />

              {/* Full-size Hover Preview Popup - Desktop only */}
              <div className={cn(
                "hidden md:block absolute z-50 pointer-events-none transition-all duration-200",
                // Position popup based on grid position
                index % 3 === 0 ? "left-0" : index % 3 === 2 ? "right-0" : "left-1/2 -translate-x-1/2",
                "bottom-full mb-3",
                hoveredIndex === index 
                  ? "opacity-100 scale-100" 
                  : "opacity-0 scale-95"
              )}>
                <div className="w-64 h-64 rounded-lg overflow-hidden border-2 border-accent shadow-2xl bg-card">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={cn(
                  "absolute -bottom-1 w-3 h-3 bg-accent rotate-45",
                  index % 3 === 0 ? "left-8" : index % 3 === 2 ? "right-8" : "left-1/2 -translate-x-1/2"
                )} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstagramGallery;
