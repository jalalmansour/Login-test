import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function SessionsPage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Training Sessions</CardTitle>
        <CardDescription>View and manage upcoming training sessions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg">
          <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold">Calendar View Coming Soon</h3>
          <p className="text-muted-foreground">
            A full calendar view for scheduling and managing sessions is under development.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
