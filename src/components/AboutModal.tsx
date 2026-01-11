import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnquireClick?: () => void;
  section: {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
  };
}

const AboutModal = ({ isOpen, onClose, onEnquireClick, section }: AboutModalProps) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getExtendedDescription = (sectionId: number) => {
    const extendedDescriptions = {
      1: `Founded over three decades ago by the Partridge family with a simple mission: to provide the finest commercial linen services to restaurants, hotels, and events across the region. What started as a small family operation has grown into a trusted cornerstone of our community, serving hundreds of satisfied customers with the same dedication and personal touch that defined our early days.

Our story began when John and Margaret Partridge recognized a need for reliable, high-quality linen services in the hospitality industry. Starting with just a handful of local restaurants, they built relationships based on trust, quality, and personalized service. Today, three generations of the Partridge family work together, combining the wisdom of experience with fresh perspectives and modern innovations.

The family values that founded our business continue to guide us today. We believe in treating every client like family, understanding their unique needs, and delivering consistent excellence that helps their businesses thrive. This personal approach has earned us lasting partnerships with some of the region's most respected establishments.`,

      2: `Every piece of linen receives meticulous attention in our state-of-the-art facility. Our advanced equipment and proven techniques ensure consistent quality and pristine results for even the most delicate fabrics. From luxury damask tablecloths to professional kitchen wear, we maintain the highest standards in commercial linen care.

Our quality control process begins the moment your linens arrive at our facility. Each item is carefully inspected, sorted, and treated according to its specific requirements. We use specialized cleaning techniques for different fabric types, ensuring that delicate damask receives the gentle care it needs while heavy-duty kitchen linens get the deep cleaning they require.

Investment in cutting-edge technology allows us to deliver superior results while maintaining efficiency. Our modern washing systems use precise temperature and chemical controls, while our pressing equipment ensures every item leaves our facility looking crisp and professional. We continuously update our methods and equipment to stay at the forefront of the industry.`,

      3: `Proud to serve our local hospitality community for over 30 years, supporting the businesses that make our city thrive. From intimate family restaurants to grand wedding venues, from boutique hotels to corporate boardrooms, we understand that every client has unique needs and deserves personalized attention.

Our deep roots in the community mean we understand the local hospitality landscape intimately. We've watched restaurants grow from small startups to thriving establishments, supported hotels through renovations and expansions, and helped countless events create memorable experiences with our premium linens.

Building lasting partnerships is at the heart of what we do. We work closely with our clients to understand their specific requirements, whether it's rush orders for unexpected events, specialized care for vintage linens, or flexible delivery schedules that accommodate busy restaurant operations. Our local knowledge and community connections allow us to provide service that goes beyond just cleaning linens.`,

      4: `As we look to the future, our commitment remains unchanged: providing exceptional service with the personal touch that only a family business can offer. Innovation and tradition work hand in hand as we serve the next generation of clients, always maintaining the values of quality, reliability, and genuine customer care that have defined us for three decades.

Our vision for the future includes continued investment in sustainable practices and eco-friendly technologies. We're committed to reducing our environmental footprint while maintaining our high standards of service. This includes exploring new cleaning methods that are both effective and environmentally responsible.

The next generation of the Partridge family brings fresh ideas and energy to the business while respecting the traditions that built our reputation. We're expanding our capabilities, improving our technology, and strengthening our partnerships to ensure we continue serving our community for decades to come. Our goal is to remain the trusted choice for commercial linen services while adapting to the evolving needs of the hospitality industry.`
    };

    return extendedDescriptions[sectionId as keyof typeof extendedDescriptions] || section.description;
  };

  const handleGetInTouch = () => {
    onClose();
    if (onEnquireClick) {
      setTimeout(() => onEnquireClick(), 100);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-background border border-border rounded-lg max-w-4xl w-full my-8 flex flex-col max-h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
          <div>
            <h2 className="text-2xl font-display text-foreground">{section.title}</h2>
            <p className="text-foreground/60 font-body">{section.subtitle}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row overflow-y-auto flex-1">
          {/* Image Section */}
          <div className="md:w-1/2 p-6">
            <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-6 border-l-0 md:border-l border-border">
            <div className="space-y-6">
              {/* Extended Description */}
              <div>
                <h3 className="text-lg font-display text-foreground mb-3">Our Story</h3>
                <div className="text-foreground/80 font-body leading-relaxed space-y-4">
                  {getExtendedDescription(section.id).split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-4 border-t border-border">
                <p className="text-foreground/60 font-body text-sm mb-4">
                  Interested in learning more about our services?
                </p>
                <Button 
                  className="w-full"
                  onClick={handleGetInTouch}
                >
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;