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
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
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

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
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
              className="relative aspect-square bg-muted cursor-pointer overflow-hidden"
              onClick={() => handleImageClick(image)}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-200 hover:scale-105",
                  pressedIndex === index && 'scale-95'
                )}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Full Image Popup */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={closeImagePopup}
        >
          <button
            onClick={closeImagePopup}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close image"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default InstagramGallery;
