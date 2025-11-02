import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SolarCalculationResults } from "@/lib/solarCalculations";

interface TechnicalBreakdownProps {
  results: SolarCalculationResults;
  inputs: {
    tiltAngle: number;
    orientation: string;
    panelEfficiency: number;
  };
}

export const TechnicalBreakdown = ({ results, inputs }: TechnicalBreakdownProps) => {
  const tableData = [
    { parameter: "Roof Area", value: results.installationArea, unit: "m²" },
    { parameter: "Tilt Angle", value: inputs.tiltAngle, unit: "°" },
    { parameter: "Orientation", value: inputs.orientation.charAt(0).toUpperCase() + inputs.orientation.slice(1), unit: "—" },
    { parameter: "Panel Efficiency", value: inputs.panelEfficiency, unit: "%" },
    { parameter: "Average Irradiance", value: results.avgIrradiance, unit: "kWh/m²/day" },
    { parameter: "System Capacity", value: results.systemCapacity, unit: "kW" },
    { parameter: "Monthly Output", value: results.monthlyOutput, unit: "kWh" },
  ];

  return (
    <Card className="shadow-soft animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <CardHeader>
        <CardTitle className="text-lg">Technical Breakdown</CardTitle>
        <p className="text-sm text-muted-foreground">Detailed system parameters and calculations</p>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Parameter</TableHead>
                <TableHead className="font-semibold text-right">Value</TableHead>
                <TableHead className="font-semibold text-right">Unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index} className="hover:bg-muted/30 transition-smooth">
                  <TableCell className="font-medium">{row.parameter}</TableCell>
                  <TableCell className="text-right font-semibold">{row.value}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{row.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
