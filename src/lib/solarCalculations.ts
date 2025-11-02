export interface SolarCalculationInputs {
  latitude: number;
  longitude: number;
  projectType: string;
  installationArea: number;
  tiltAngle: number;
  orientation: string;
  panelEfficiency: number;
}

export interface SolarCalculationResults {
  installationArea: number;
  avgIrradiance: number; // kWh/m²/day
  systemCapacity: number; // kW
  monthlyOutput: number; // kWh/month
  co2Saved: number; // kg/year
  performanceLevel: "excellent" | "good" | "moderate";
  monthlyIrradiance: { month: string; value: number }[];
  monthlyGeneration: { month: string; value: number }[];
  energySavingsYearly: number; // ₹/year
  homesEquivalent: number;
  treesEquivalent: number;
}

// Calculate solar irradiance based on location (simplified model)
function calculateIrradiance(latitude: number, orientation: string): number {
  // Base irradiance for India (kWh/m²/day)
  let baseIrradiance = 5.5;
  
  // Adjust for latitude (higher latitude = lower irradiance)
  const latitudeFactor = 1 - Math.abs(latitude - 20) * 0.01;
  baseIrradiance *= latitudeFactor;
  
  // Adjust for orientation
  const orientationFactors: { [key: string]: number } = {
    south: 1.0,
    north: 0.7,
    east: 0.85,
    west: 0.85,
  };
  baseIrradiance *= orientationFactors[orientation] || 0.9;
  
  return Math.max(3.5, Math.min(6.5, baseIrradiance));
}

// Generate monthly irradiance data
function generateMonthlyIrradiance(avgIrradiance: number) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // Seasonal variation factors
  const seasonalFactors = [0.85, 0.9, 1.0, 1.1, 1.15, 1.1, 0.95, 0.95, 1.0, 1.05, 0.95, 0.85];
  
  return months.map((month, index) => ({
    month,
    value: parseFloat((avgIrradiance * seasonalFactors[index]).toFixed(2)),
  }));
}

// Calculate system capacity based on area and efficiency
function calculateSystemCapacity(area: number, efficiency: number): number {
  // Standard formula: Capacity (kW) = Area (m²) × Efficiency × 1 kW/m² (standard test condition)
  return (area * (efficiency / 100) * 1) / 1000 * area;
}

// Main calculation function
export function calculateSolarPotential(inputs: SolarCalculationInputs): SolarCalculationResults {
  const avgIrradiance = calculateIrradiance(inputs.latitude, inputs.orientation);
  
  // Adjust for tilt angle (optimal is around 25-30° for India)
  const tiltFactor = 1 - Math.abs(inputs.tiltAngle - 28) * 0.005;
  const adjustedIrradiance = avgIrradiance * Math.max(0.8, tiltFactor);
  
  // System capacity (kW) = area × panel efficiency × 0.001
  const systemCapacity = inputs.installationArea * (inputs.panelEfficiency / 100) * 0.15;
  
  // Monthly output (kWh/month) = capacity × irradiance × 30 days × performance ratio (0.75)
  const monthlyOutput = systemCapacity * adjustedIrradiance * 30 * 0.75;
  
  // CO2 saved (kg/year) = annual output × 0.7 kg CO2/kWh
  const annualOutput = monthlyOutput * 12;
  const co2Saved = annualOutput * 0.7;
  
  // Performance level
  let performanceLevel: "excellent" | "good" | "moderate" = "good";
  if (adjustedIrradiance > 5.5) performanceLevel = "excellent";
  else if (adjustedIrradiance < 4.5) performanceLevel = "moderate";
  
  // Monthly data
  const monthlyIrradiance = generateMonthlyIrradiance(adjustedIrradiance);
  const monthlyGeneration = monthlyIrradiance.map(item => ({
    month: item.month,
    value: parseFloat((systemCapacity * item.value * 30 * 0.75).toFixed(0)),
  }));
  
  // Environmental calculations
  const energySavingsYearly = annualOutput * 6.5; // ₹6.5 per kWh average
  const homesEquivalent = monthlyOutput / 300; // Average home uses ~300 kWh/month
  const treesEquivalent = co2Saved / 21; // One tree absorbs ~21 kg CO2/year
  
  return {
    installationArea: inputs.installationArea,
    avgIrradiance: parseFloat(adjustedIrradiance.toFixed(2)),
    systemCapacity: parseFloat(systemCapacity.toFixed(2)),
    monthlyOutput: parseFloat(monthlyOutput.toFixed(0)),
    co2Saved: parseFloat(co2Saved.toFixed(0)),
    performanceLevel,
    monthlyIrradiance,
    monthlyGeneration,
    energySavingsYearly: parseFloat(energySavingsYearly.toFixed(0)),
    homesEquivalent: parseFloat(homesEquivalent.toFixed(1)),
    treesEquivalent: parseFloat(treesEquivalent.toFixed(0)),
  };
}
