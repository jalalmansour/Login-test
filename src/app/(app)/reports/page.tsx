import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ReportsPage() {
  const reportTypes = [
    "Training Effectiveness",
    "Budget Utilization",
    "Compliance Audit",
    "User Activity Log",
    "Competency Gap Analysis",
    "Trainer Performance",
  ];

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <p className="text-muted-foreground">Generate and view reports for data-driven insights.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report) => (
          <Card key={report} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{report}</CardTitle>
              <FileText className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription>
                Click to generate and view the {report.toLowerCase()} report.
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
