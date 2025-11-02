import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Zap, TreeDeciduous } from "lucide-react";
import { SolarCalculationResults } from "@/lib/solarCalculations";

interface SummaryCardProps {
  results: SolarCalculationResults;
}

export const SummaryCard = ({ results }: SummaryCardProps) => {
  const performanceConfig = {
    excellent: { label: "Excellent Solar Potential", variant: "default" as const, icon: "✅" },
    good: { label: "Good Solar Potential", variant: "default" as const, icon: "✅" },
    moderate: { label: "Moderate Solar Potential", variant: "secondary" as const, icon: "⚠️" },
  };

  const config = performanceConfig[results.performanceLevel];

  return (
    <Card className="shadow-medium animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Solar Potential Summary</CardTitle>
          <Badge variant={config.variant} className="text-sm">
            {config.icon} {config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Sun className="w-4 h-4" />
              <span>Installation Area</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{results.installationArea}</p>
            <p className="text-xs text-muted-foreground">m²</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Sun className="w-4 h-4" />
              <span>Avg. Irradiance</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{results.avgIrradiance}</p>
            <p className="text-xs text-muted-foreground">kWh/m²/day</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Zap className="w-4 h-4" />
              <span>System Capacity</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{results.systemCapacity}</p>
            <p className="text-xs text-muted-foreground">kW</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Zap className="w-4 h-4" />
              <span>Monthly Output</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{results.monthlyOutput}</p>
            <p className="text-xs text-muted-foreground">kWh/month</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <TreeDeciduous className="w-4 h-4" />
              <span>CO₂ Saved</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{results.co2Saved}</p>
            <p className="text-xs text-muted-foreground">kg/year</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
