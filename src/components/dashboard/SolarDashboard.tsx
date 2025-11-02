import { SolarCalculationResults } from "@/lib/solarCalculations";
import { SummaryCard } from "./SummaryCard";
import { ChartsSection } from "./ChartsSection";
import { EnvironmentalInsights } from "./EnvironmentalInsights";
import { TechnicalBreakdown } from "./TechnicalBreakdown";
import { NextActionsPanel } from "./NextActionsPanel";

interface SolarDashboardProps {
  results: SolarCalculationResults;
  inputs: {
    tiltAngle: number;
    orientation: string;
    panelEfficiency: number;
  };
  onRecalculate: () => void;
}

export const SolarDashboard = ({ results, inputs, onRecalculate }: SolarDashboardProps) => {
  return (
    <div className="space-y-6 pb-8">
      <SummaryCard results={results} />
      <ChartsSection results={results} />
      <EnvironmentalInsights results={results} />
      <TechnicalBreakdown results={results} inputs={inputs} />
      <NextActionsPanel onRecalculate={onRecalculate} />
    </div>
  );
};
