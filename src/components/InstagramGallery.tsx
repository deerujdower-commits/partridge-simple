import { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = (index: number, e: React.TouchEvent) => {
    if (selectedIndex !== null) {
      setTouchStart(e.touches[0].clientX);
    } else {
      pressTimerRef.current = setTimeout(() => {
        setPressedIndex(index);
      }, 200);
    }
  };

  const handleTouchEnd = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
    }
    setPressedIndex(null);
    setTouchStart(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null || selectedIndex === null) return;
    
    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
      setTouchStart(null);
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
  };

  const closeImagePopup = () => {
    setSelectedIndex(null);
  };

  const goToPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') closeImagePopup();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

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
              onClick={() => handleImageClick(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={(e) => handleTouchStart(index, e)}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className={cn(
                  "w-full h-full object-cover transition-transform duration-200",
                  pressedIndex === index && 'scale-95'
                )}
                draggable={false}
              />

              {/* Hover Preview Popup - Desktop only */}
              <div className={cn(
                "hidden md:block absolute z-50 pointer-events-none transition-all duration-200",
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
                    className="w-full h-full object-contain bg-muted"
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

      {/* Full Image Popup with Navigation */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center"
          onClick={closeImagePopup}
          onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            onClick={closeImagePopup}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            aria-label="Close image"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Image with caption */}
          <div className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              className="max-w-[90vw] max-h-[75vh] object-contain rounded-lg"
            />
          </div>

          {/* Next arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramGallery;
