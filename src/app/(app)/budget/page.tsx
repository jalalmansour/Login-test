import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function BudgetPage() {
  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Budget Overview</h1>
          <p className="text-muted-foreground">Track and manage training budgets across departments.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Request Budget
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engineering Department</CardTitle>
            <CardDescription>Allocated: €50,000</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Progress value={65} />
            <p className="text-sm text-muted-foreground">€32,500 / €50,000 Consumed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales Department</CardTitle>
            <CardDescription>Allocated: €30,000</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Progress value={80} />
            <p className="text-sm text-muted-foreground">€24,000 / €30,000 Consumed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Human Resources</CardTitle>
            <CardDescription>Allocated: €20,000</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Progress value={40} />
            <p className="text-sm text-muted-foreground">€8,000 / €20,000 Consumed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
