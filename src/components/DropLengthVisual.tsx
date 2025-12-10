import { Card } from "@/components/ui/card";
import { Ruler } from "lucide-react";

interface DropLengthVisualProps {
  className?: string;
}

const dropLengths = [
  {
    name: "To the Floor",
    measurement: '30"',
    description: "Elegant formal look, covers table legs completely",
    dropHeight: "h-36",
    perfectFor: "Weddings, galas, formal dining",
    color: "from-accent via-accent/60 to-accent/40",
  },
  {
    name: "Standard Drop",
    measurement: '12"-15"',
    description: "Perfect balance for most events",
    dropHeight: "h-24",
    perfectFor: "Corporate events, restaurants, banquets",
    color: "from-primary via-primary/60 to-primary/40",
  },
  {
    name: "Short Drop",
    measurement: '6"-9"',
    description: "Modern, casual aesthetic",
    dropHeight: "h-16",
    perfectFor: "Casual dining, cafes, contemporary venues",
    color: "from-secondary via-secondary/60 to-secondary/40",
  },
  {
    name: "Trail",
    measurement: '3"-12" extra',
    description: "Cloth extends beyond table edge to the floor",
    dropHeight: "h-40",
    perfectFor: "Luxury events, high-end venues, photo shoots",
    color: "from-accent/80 via-accent/50 to-accent/30",
  },
];

export const DropLengthVisual = ({ className }: DropLengthVisualProps) => {
  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-4">
        <Ruler className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-semibold">Understanding Drop Lengths</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Drop length is the measurement from the table edge down. A standard table height is 30" (floor to tabletop).
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {dropLengths.map((drop, index) => (
          <Card 
            key={index} 
            className="group p-6 hover:border-accent hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden relative"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-accent to-primary" />
            
            <div className="flex items-start gap-6 relative z-10">
              {/* Enhanced Visual Illustration */}
              <div className="flex-shrink-0 w-32 flex flex-col items-center">
                <div className="relative w-28 h-48 bg-gradient-to-b from-muted/10 to-muted/5 rounded-lg border border-border/50 overflow-visible">
                  {/* Room wall */}
                  <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-transparent" />
                  
                  {/* Table Top with wood grain effect */}
                  <div className="absolute top-8 left-2 right-2 h-3 bg-gradient-to-r from-amber-950/40 via-amber-900/30 to-amber-950/40 rounded-sm border-y border-amber-900/30 shadow-md z-20" />
                  
                  {/* Table Cloth with realistic draping */}
                  <div 
                    className={`absolute top-11 left-1 right-1 bg-gradient-to-b ${drop.color} ${drop.dropHeight} rounded-b-lg transition-all duration-500 group-hover:scale-[1.02] shadow-lg`}
                    style={{
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.1)',
                    }}
                  >
                    {/* Cloth texture/highlight */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                    
                    {/* Draping folds effect */}
                    <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/5 to-transparent" />
                    
                    {/* Drop measurement indicator - centered on cloth */}
                    {drop.name !== "Trail" && (
                      <div className="absolute top-1/2 -translate-y-1/2 -right-10 flex items-center z-30">
                        <div className="flex items-center gap-1">
                          <div className="w-0.5 h-8 bg-accent rounded-full shadow-sm" />
                          <span className="text-[11px] text-accent font-bold whitespace-nowrap bg-background px-2 py-1 rounded shadow-md border border-accent/30">
                            {drop.measurement}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Table Legs (attached to table, only visible if cloth is short) */}
                  {(drop.name === "Standard Drop" || drop.name === "Short Drop") && (
                    <>
                      <div className="absolute top-11 left-5 w-2 h-32 bg-gradient-to-b from-amber-950/60 to-amber-950/40 rounded-sm shadow-md" />
                      <div className="absolute top-11 right-5 w-2 h-32 bg-gradient-to-b from-amber-950/60 to-amber-950/40 rounded-sm shadow-md" />
                    </>
                  )}
                  
                  {/* Trail puddle effect - cloth pooling on floor with measurement */}
                  {drop.name === "Trail" && (
                    <>
                      <div className="absolute bottom-0 -left-2 -right-2 h-8 bg-gradient-to-b from-accent/40 via-accent/25 to-accent/15 rounded-b-xl border-t-2 border-accent/30" 
                           style={{
                             boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.2)'
                           }}
                      />
                      {/* Trail measurement on the puddle */}
                      <div className="absolute bottom-2 -right-10 flex items-center z-30">
                        <div className="flex items-center gap-1">
                          <div className="w-0.5 h-6 bg-accent/70 rounded-full shadow-sm" />
                          <span className="text-[11px] text-accent font-bold whitespace-nowrap bg-background px-2 py-1 rounded shadow-md border border-accent/30">
                            {drop.measurement}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                {/* Floor indicator with shadow */}
                <div className="w-full h-2 bg-gradient-to-r from-border via-border/50 to-border mt-1 rounded-full shadow-sm" />
                
                {/* Side view for Trail option */}
                {drop.name === "Trail" && (
                  <div className="mt-4 w-28 h-20 relative bg-gradient-to-b from-muted/10 to-muted/5 rounded-lg border border-border/50 overflow-visible">
                    <p className="absolute -top-5 left-0 text-[9px] text-muted-foreground font-semibold">Side View</p>
                    {/* Floor */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-border via-border/70 to-border" />
                    {/* Table edge */}
                    <div className="absolute bottom-2 left-8 w-12 h-1 bg-amber-950/40 rounded-sm" />
                    {/* Cloth draping to floor with puddle */}
                    <div className="absolute bottom-2 left-8 w-16 h-12 bg-gradient-to-br from-accent/60 via-accent/40 to-accent/30 rounded-br-lg" 
                         style={{
                           clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
                           boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                         }}
                    />
                    {/* Puddle on floor */}
                    <div className="absolute bottom-2 right-3 w-8 h-3 bg-gradient-to-r from-accent/40 to-accent/20 rounded-full" />
                  </div>
                )}
              </div>
              
              {/* Enhanced Description */}
              <div className="flex-1 min-w-0 space-y-3">
                <div>
                  <h4 className="font-bold text-foreground text-lg mb-1 group-hover:text-accent transition-colors">
                    {drop.name}
                  </h4>
                  <p className="text-sm font-semibold text-accent mb-2 flex items-center gap-1">
                    <Ruler className="h-3 w-3" />
                    {drop.measurement}
                  </p>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {drop.description}
                </p>
                
                <div className="pt-2 border-t border-border/50">
                  <p className="text-xs text-muted-foreground/80">
                    <span className="font-semibold text-foreground">Perfect for:</span> {drop.perfectFor}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5 bg-gradient-to-br from-accent/5 via-accent/3 to-transparent border-accent/20">
          <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-accent">
            <Ruler className="h-4 w-4" />
            Measurement Tips
          </h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span><strong className="text-foreground">Standard table height:</strong> 30" from floor to tabletop</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span><strong className="text-foreground">Drop calculation:</strong> Measure from table edge downward</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span><strong className="text-foreground">Trail calculation:</strong> Add extra length for puddle effect</span>
            </li>
          </ul>
        </Card>
        
        <Card className="p-5 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent border-primary/20">
          <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-primary">
            <Ruler className="h-4 w-4" />
            Style Recommendations
          </h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong className="text-foreground">Formal events:</strong> 30" drop or trail for elegance</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong className="text-foreground">Corporate/Dining:</strong> 12-15" drop for professional look</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong className="text-foreground">Modern venues:</strong> 6-9" drop for contemporary style</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
