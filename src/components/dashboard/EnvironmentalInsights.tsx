import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TreeDeciduous, Zap, Home } from "lucide-react";
import { SolarCalculationResults } from "@/lib/solarCalculations";

interface EnvironmentalInsightsProps {
  results: SolarCalculationResults;
}

export const EnvironmentalInsights = ({ results }: EnvironmentalInsightsProps) => {
  const insights = [
    {
      icon: TreeDeciduous,
      title: "Environmental Impact",
      value: results.treesEquivalent,
      unit: "trees planted/year",
      description: "Equivalent CO₂ reduction",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      icon: Zap,
      title: "Energy Savings",
      value: `₹${results.energySavingsYearly.toLocaleString()}`,
      unit: "per year",
      description: "Based on average tariff rates",
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
    },
    {
      icon: Home,
      title: "Homes Powered",
      value: results.homesEquivalent,
      unit: "homes/month",
      description: "Average household consumption",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
  ];

  return (
    <Card className="shadow-soft animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <CardHeader>
        <CardTitle className="text-lg">Environmental Insights</CardTitle>
        <p className="text-sm text-muted-foreground">Real-world impact of your solar installation</p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${insight.bgColor} transition-smooth hover-scale`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-card ${insight.color}`}>
                  <insight.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground mb-1">{insight.title}</p>
                  <p className="text-2xl font-bold text-foreground">{insight.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{insight.unit}</p>
                  <p className="text-xs text-muted-foreground mt-2">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
