import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, FileText, Save } from "lucide-react";
import { toast } from "sonner";

interface NextActionsPanelProps {
  onRecalculate: () => void;
}

export const NextActionsPanel = ({ onRecalculate }: NextActionsPanelProps) => {
  const handleDownloadReport = () => {
    toast.info("PDF report generation coming soon!");
  };

  const handleSaveProject = () => {
    toast.info("Project save functionality coming soon!");
  };

  return (
    <Card className="shadow-soft animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={onRecalculate}
            className="flex-1 sm:flex-none"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Recalculate
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleDownloadReport}
            className="flex-1 sm:flex-none"
          >
            <FileText className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={handleSaveProject}
            className="flex-1 sm:flex-none"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Project
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
