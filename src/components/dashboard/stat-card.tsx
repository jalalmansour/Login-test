import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
  trend?: string;
  trendDirection?: 'up' | 'down';
}

export function StatCard({ title, value, icon: Icon, description, trend, trendDirection = 'up' }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
            <p className={cn(
                "text-xs text-muted-foreground mt-1",
                trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
            )}>
                {trend}
            </p>
        )}
      </CardContent>
    </Card>
  );
}
