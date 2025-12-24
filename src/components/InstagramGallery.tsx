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
              className="relative aspect-square bg-muted cursor-pointer flex items-center justify-center"
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={cn(
                  "max-w-full max-h-full object-contain transition-transform duration-200",
                  pressedIndex === index && 'scale-110'
                )}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstagramGallery;
