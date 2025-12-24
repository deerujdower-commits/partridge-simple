import { useState, useRef } from 'react';
import { X } from 'lucide-react';

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
              className="relative aspect-square overflow-hidden bg-muted"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  hoveredIndex === index ? 'scale-110' : ''
                } ${pressedIndex === index ? 'scale-105' : ''}`}
                draggable={false}
              />
              
              {/* Hover overlay for desktop */}
              <div 
                className={`absolute inset-0 bg-black/20 transition-opacity duration-200 pointer-events-none ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstagramGallery;
