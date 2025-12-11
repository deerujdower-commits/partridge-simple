interface Feature {
  title: string;
  description: string;
}

interface WhyUsSectionProps {
  heading: string;
  subheading: string;
  features: Feature[];
  imagePlaceholder?: string;
}

const WhyUsSection = ({ heading, subheading, features, imagePlaceholder }: WhyUsSectionProps) => {
  // Take first 4 features for the 2x2 grid
  const displayFeatures = features.slice(0, 4);

  return (
    <section className="bg-accent rounded-lg overflow-hidden mb-12">
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Image Placeholder */}
        <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[500px] bg-accent/80 relative">
          {imagePlaceholder ? (
            <img 
              src={imagePlaceholder} 
              alt="Why choose us" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/20">
              <span className="text-white/40 font-body text-sm uppercase tracking-wide">Add Image Here</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4 uppercase tracking-wide">
            {heading}
          </h2>
          
          <p className="text-white/70 font-body leading-relaxed mb-10">
            {subheading}
          </p>

          {/* 2x2 Feature Grid */}
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
            {displayFeatures.map((feature, index) => (
              <div key={index}>
                <h3 className="font-display text-lg md:text-xl font-light text-white mb-2">
                  {feature.title}
                </h3>
                <div className="w-full h-px bg-white/30 mb-4" />
                <p className="text-white/70 font-body text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;