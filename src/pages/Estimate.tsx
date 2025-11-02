import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Map as MapIcon, Settings, LogOut } from "lucide-react";
import Map from "@/components/Map";
import { calculateSolarPotential, SolarCalculationResults } from "@/lib/solarCalculations";
import { SolarDashboard } from "@/components/dashboard/SolarDashboard";
import { toast } from "sonner";

const Estimate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState("20.5937");
  const [longitude, setLongitude] = useState("78.9629");
  const [projectType, setProjectType] = useState("");
  const [installationArea, setInstallationArea] = useState("");
  const [tiltAngle, setTiltAngle] = useState([10]);
  const [orientation, setOrientation] = useState("");
  const [panelEfficiency, setPanelEfficiency] = useState([20]);
  const [measuredArea, setMeasuredArea] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);
  const [calculationResults, setCalculationResults] = useState<SolarCalculationResults | null>(null);

  const handleCoordinatesChange = (lat: number, lng: number) => {
    setLatitude(lat.toFixed(6));
    setLongitude(lng.toFixed(6));
  };

  const handleAreaChange = (area: number) => {
    setMeasuredArea(area);
    setInstallationArea(area.toString());
  };

  const handleRecenter = () => {
    (window as any).mapControls?.recenter();
  };

  const handleClearDrawing = () => {
    (window as any).mapControls?.clearDrawing();
  };

  useEffect(() => {
    // Check authentication status
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setLoading(false);
        
        // Get user's current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLatitude(position.coords.latitude.toFixed(6));
              setLongitude(position.coords.longitude.toFixed(6));
            },
            (error) => {
              console.log("Location access denied, using default India center");
            }
          );
        }
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleCalculate = () => {
    // Validation
    if (!projectType) {
      toast.error("Please select a project type");
      return;
    }
    if (!installationArea || parseFloat(installationArea) <= 0) {
      toast.error("Please draw a polygon on the map to calculate area");
      return;
    }
    if (!orientation) {
      toast.error("Please select an orientation");
      return;
    }

    // Perform calculation
    const results = calculateSolarPotential({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      projectType,
      installationArea: parseFloat(installationArea),
      tiltAngle: tiltAngle[0],
      orientation,
      panelEfficiency: panelEfficiency[0],
    });

    setCalculationResults(results);
    setShowDashboard(true);
    toast.success("Solar potential calculated successfully!");

    // Scroll to results
    setTimeout(() => {
      document.getElementById("solar-dashboard")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleRecalculate = () => {
    setShowDashboard(false);
    setCalculationResults(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">SunScan</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {!showDashboard ? (
          <div className="grid lg:grid-cols-2 gap-6">
          {/* Area Measurement Tool */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-primary" />
                <CardTitle>Area Measurement Tool</CardTitle>
              </div>
              <CardDescription>
                Use the drawing tools on the map to measure your installation area
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">
                    <span className="flex items-center gap-1">
                      <MapIcon className="w-4 h-4" />
                      Latitude
                    </span>
                  </Label>
                  <Input
                    id="latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="28.6139"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">
                    <span className="flex items-center gap-1">
                      <MapIcon className="w-4 h-4" />
                      Longitude
                    </span>
                  </Label>
                  <Input
                    id="longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="77.209"
                  />
                </div>
              </div>

              {/* Interactive Map */}
              <Map
                latitude={latitude}
                longitude={longitude}
                onCoordinatesChange={handleCoordinatesChange}
                onAreaChange={handleAreaChange}
              />

              {measuredArea > 0 && (
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm font-medium text-foreground">
                    Measured Area: <span className="text-primary font-bold">{measuredArea.toLocaleString()} m²</span>
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={handleClearDrawing}>
                  Clear Drawing
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleRecenter}>
                  Recenter Map
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Project Configuration */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                <CardTitle>Project Configuration</CardTitle>
              </div>
              <CardDescription>
                Configure project parameters for commercial-grade analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="projectType">
                  <span className="flex items-center gap-1">
                    <Settings className="w-4 h-4" />
                    Project Type
                  </span>
                </Label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger id="projectType">
                    <SelectValue placeholder="Choose project type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential (1-10 kW)</SelectItem>
                    <SelectItem value="commercial">Commercial (10-100 kW)</SelectItem>
                    <SelectItem value="industrial">Industrial (100+ kW)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="installationArea">
                  <span className="flex items-center gap-1">
                    <Settings className="w-4 h-4" />
                    Installation Area (m²)
                  </span>
                </Label>
                <Input
                  id="installationArea"
                  type="number"
                  value={installationArea}
                  onChange={(e) => setInstallationArea(e.target.value)}
                  placeholder="500"
                />
                <p className="text-xs text-muted-foreground">
                  Total available area for solar panel installation
                </p>
              </div>

              <div className="space-y-3">
                <Label>
                  <span className="flex items-center gap-1">
                    <Settings className="w-4 h-4" />
                    Tilt Angle: {tiltAngle[0]}°
                  </span>
                </Label>
                <Slider
                  value={tiltAngle}
                  onValueChange={setTiltAngle}
                  min={0}
                  max={90}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="orientation">
                  <span className="flex items-center gap-1">
                    <Settings className="w-4 h-4" />
                    Orientation
                  </span>
                </Label>
                <Select value={orientation} onValueChange={setOrientation}>
                  <SelectTrigger id="orientation">
                    <SelectValue placeholder="Choose orientation..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north">North</SelectItem>
                    <SelectItem value="south">South</SelectItem>
                    <SelectItem value="east">East</SelectItem>
                    <SelectItem value="west">West</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Panel Efficiency: {panelEfficiency[0]}%</Label>
                <Slider
                  value={panelEfficiency}
                  onValueChange={setPanelEfficiency}
                  min={10}
                  max={30}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Modern commercial panels: 18-22% typical
                </p>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleCalculate}
              >
                Calculate Solar Potential
              </Button>
            </CardContent>
          </Card>
        </div>
        ) : (
          <div id="solar-dashboard">
            <SolarDashboard
              results={calculationResults!}
              inputs={{
                tiltAngle: tiltAngle[0],
                orientation,
                panelEfficiency: panelEfficiency[0],
              }}
              onRecalculate={handleRecalculate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Estimate;
