import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropLengthVisual } from "./DropLengthVisual";

interface SizeGuideDialogProps {
  type: 'rectangular' | 'round' | 'both';
  availableSizes?: string[];
}

const SizeGuideDialog = ({ type, availableSizes }: SizeGuideDialogProps) => {
  const rectangularData = [
    {
      tableSize: '6ft x 2ft',
      sizes: {
        '70x70': { ends: "1'' gap each end / 2'' gap", sides: "23'' drop" },
        '70x108': { ends: "18'' drop / 12'' gap", sides: "23'' drop / 7'' gap" },
        '90x90': { ends: "9'' drop / 21'' gap", sides: "3'' trail" },
        '70x144': { ends: "6'' trail", sides: "23'' drop / 7'' gap" },
        '90x144': { ends: "6'' trail", sides: "3'' trail" },
      }
    },
    {
      tableSize: '6ft x 2.5ft',
      sizes: {
        '70x70': { ends: "1'' gap each end / 2'' gap", sides: "20'' drop" },
        '70x108': { ends: "18'' drop / 12'' gap", sides: "20'' drop / 10'' gap" },
        '90x90': { ends: "9'' drop / 21'' gap", sides: "To the floor" },
        '70x144': { ends: "6'' trail", sides: "20'' drop / 10'' gap" },
        '90x144': { ends: "6'' trail", sides: "To the floor" },
      }
    },
    {
      tableSize: '6ft x 3ft',
      sizes: {
        '70x70': { ends: "1'' gap each end / 2'' gap", sides: "17'' drop / 13'' gap" },
        '70x108': { ends: "18'' drop / 12'' gap", sides: "17'' drop / 13'' gap" },
        '90x90': { ends: "9'' drop / 21'' gap", sides: "27'' drop / 3'' gap" },
        '70x144': { ends: "6'' trail", sides: "17'' drop / 13'' gap" },
        '90x144': { ends: "6'' trail", sides: "27'' drop / 3'' gap" },
      }
    },
    {
      tableSize: '6ft x 3.5ft',
      sizes: {
        '70x70': { ends: "1'' gap each end / 2'' gap", sides: "14'' drop / 16'' gap" },
        '70x108': { ends: "18'' drop / 12'' gap", sides: "14'' drop / 16'' gap" },
        '90x90': { ends: "9'' drop / 21'' gap", sides: "24'' drop / 6'' gap" },
        '70x144': { ends: "6'' trail", sides: "14'' drop / 16'' gap" },
        '90x144': { ends: "6'' trail", sides: "24'' drop / 6'' gap" },
      }
    },
    {
      tableSize: '6ft x 4ft',
      sizes: {
        '70x70': { ends: "1'' gap each end / 2'' gap", sides: "11'' drop / 19'' gap" },
        '70x108': { ends: "18'' drop / 12'' gap", sides: "11'' drop / 19'' gap" },
        '90x90': { ends: "9'' drop / 21'' gap", sides: "21'' drop / 9'' gap" },
        '70x144': { ends: "6'' trail", sides: "11'' drop / 19'' gap" },
        '90x144': { ends: "6'' trail", sides: "21'' drop / 9'' gap" },
      }
    },
  ];

  const roundData = [
    {
      tableSize: '6ft Round',
      sizes: {
        '130 Round': 'To the floor',
        '128 Round': "28'' drop / 3'' gap",
        '120 Round': "24'' drop / 6'' gap",
        '108 Round': "18'' drop / 12'' gap",
        '90 Round': "9'' drop / 21'' gap",
      }
    },
    {
      tableSize: '5.5ft Round',
      sizes: {
        '130 Round': "3'' trail",
        '128 Round': "1'' trail",
        '120 Round': "27'' drop / 3'' gap",
        '108 Round': "21'' drop / 9'' gap",
        '90 Round': "12'' drop / 18'' gap",
      }
    },
    {
      tableSize: '5ft Round',
      sizes: {
        '130 Round': "6'' trail",
        '128 Round': "4'' trail",
        '120 Round': 'To the floor',
        '108 Round': "24'' drop / 6'' gap",
        '90 Round': "15'' drop / 15'' gap",
      }
    },
    {
      tableSize: '4.5ft Round',
      sizes: {
        '130 Round': "9'' trail",
        '128 Round': "7'' trail",
        '120 Round': "3'' trail",
        '108 Round': "27'' drop / 3'' gap",
        '90 Round': "18'' drop / 12'' gap",
      }
    },
    {
      tableSize: '4ft Round',
      sizes: {
        '130 Round': "12'' trail",
        '128 Round': "10'' trail",
        '120 Round': "6'' trail",
        '108 Round': 'To the floor',
        '90 Round': "21'' drop / 9'' gap",
      }
    },
    {
      tableSize: '3ft Round',
      sizes: {
        '130 Round': "18'' trail",
        '128 Round': "16'' trail",
        '120 Round': "12'' trail",
        '108 Round': "6'' trail",
        '90 Round': "27'' drop / 3'' gap",
      }
    },
  ];

  // Normalize available sizes for matching
  const normalizeSize = (size: string) => {
    return size.replace(/["\s]/g, '').toUpperCase();
  };

  // Map inch sizes to Round sizes for round tablecloths
  const mapInchToRound = (inchSize: string): string => {
    const normalized = normalizeSize(inchSize);
    const mapping: Record<string, string> = {
      '88': '90 Round',
      '90': '90 Round',
      '108': '108 Round',
      '118': '120 Round',
      '120': '120 Round',
      '130': '130 Round',
      '132': '130 Round',
    };
    return mapping[normalized] || normalized;
  };

  const filteredRectangularSizes = availableSizes 
    ? ['70x70', '70x108', '90x90', '70x144', '90x144'].filter(size => 
        availableSizes.some(available => normalizeSize(available).includes(normalizeSize(size)))
      )
    : ['70x70', '70x108', '90x90', '70x144', '90x144'];

  const filteredRoundSizes = availableSizes
    ? ['130 Round', '128 Round', '120 Round', '108 Round', '90 Round'].filter(size => 
        availableSizes.some(available => {
          const mapped = mapInchToRound(available);
          return normalizeSize(mapped) === normalizeSize(size);
        })
      )
    : ['130 Round', '128 Round', '120 Round', '108 Round', '90 Round'];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
          <Info className="h-4 w-4" />
          Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">
            {type === 'both' ? 'Table Size Guide' : type === 'round' ? 'Round Tables Size Guide' : 'Trestle Tables Size Guide'}
          </DialogTitle>
          <DialogDescription className="text-base">
            We have created this table guide to help you choose which size cloth works best for your table. 
            We advise to figure out your table size then decide on the drop length you require.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chart">Size Chart</TabsTrigger>
            <TabsTrigger value="visual">Drop Length Guide</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart" className="mt-6">
            <p className="text-sm text-muted-foreground mb-4">
              The height of a standard table is 30". Drop measurements are calculated from the table edge down.
              If your table size is not on our chart, please get in touch and we do our very best to help you.
            </p>
        <div className="space-y-8">
          {(type === 'round' || type === 'both') && (
            <div>
              {type === 'both' && <h3 className="text-lg font-semibold mb-3">Round Tables</h3>}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-semibold bg-muted/50">Table Size</th>
                      {filteredRoundSizes.map(size => (
                        <th key={size} className="text-left p-3 font-semibold bg-muted/50">{size}" Cloth</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {roundData.map((row, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-muted/20">
                        <td className="p-3 font-medium">{row.tableSize}</td>
                        {filteredRoundSizes.map(size => {
                          const data = row.sizes[size as keyof typeof row.sizes];
                          return (
                            <td key={size} className="p-3 text-muted-foreground">
                              {data || '-'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {(type === 'rectangular' || type === 'both') && (
            <div>
              {type === 'both' && <h3 className="text-lg font-semibold mb-3">Trestle Tables (Rectangular)</h3>}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-semibold bg-muted/50">Table Size</th>
                      {filteredRectangularSizes.map(size => (
                        <th key={size} className="text-left p-3 font-semibold bg-muted/50">{size}" Cloth</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rectangularData.map((row, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-muted/20">
                        <td className="p-3 font-medium">{row.tableSize}</td>
                        {filteredRectangularSizes.map(size => {
                          const data = row.sizes[size as keyof typeof row.sizes];
                          return (
                            <td key={size} className="p-3 text-muted-foreground">
                              {data && (
                                <div className="space-y-1">
                                  <div className="text-xs">Ends: {data.ends}</div>
                                  <div className="text-xs">Sides: {data.sides}</div>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground italic">
            Note: "Trail" means the cloth extends beyond the table edge by the specified amount. 
            "Drop" means the cloth hangs down from the table edge. 
            "Gap" means the cloth doesn't reach the floor by the specified amount.
          </p>
        </div>
          </TabsContent>
          
          <TabsContent value="visual" className="mt-6">
            <DropLengthVisual />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuideDialog;
