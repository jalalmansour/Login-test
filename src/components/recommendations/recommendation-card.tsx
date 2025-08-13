"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface RecommendationCardProps {
  trainingName: string;
  reason: string;
  matchScore: number;
}

export function RecommendationCard({ trainingName, reason, matchScore }: RecommendationCardProps) {
  const scorePercentage = Math.round(matchScore * 100);
  
  const getScoreColor = () => {
    if (scorePercentage > 75) return "bg-green-500";
    if (scorePercentage > 50) return "bg-yellow-500";
    return "bg-red-500";
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle>{trainingName}</CardTitle>
            <Badge variant="outline" className="flex items-center gap-1 border-primary text-primary">
                <Zap className="h-3 w-3" />
                AI Pick
            </Badge>
        </div>
        <CardDescription className="pt-2">{reason}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Match Score</p>
            <p className="text-sm font-bold">{scorePercentage}%</p>
          </div>
          <Progress value={scorePercentage} indicatorClassName={getScoreColor()} />
      </CardContent>
      <CardFooter>
        <Button className="w-full">Enroll Now</Button>
      </CardFooter>
    </Card>
  );
}
