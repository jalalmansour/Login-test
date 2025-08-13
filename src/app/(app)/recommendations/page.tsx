"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getTrainingRecommendations } from "@/app/actions/recommendations";
import { RecommendationCard } from "@/components/recommendations/recommendation-card";
import { availableTrainingsDescription } from "@/lib/mock-data";
import type { User } from "@/lib/types";
import type { TrainingRecommendationsOutput } from "@/ai/flows/training-recommendations";
import { Wand2 } from "lucide-react";

interface RecommendationsPageProps {
  currentUser: User;
}

export default function RecommendationsPage({ currentUser }: RecommendationsPageProps) {
  const [recommendations, setRecommendations] = React.useState<TrainingRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGetRecommendations = async () => {
    if (!currentUser) return;
    setIsLoading(true);
    setRecommendations(null);

    const result = await getTrainingRecommendations({
      employeeRole: currentUser.role,
      employeeSkills: currentUser.skills,
      pastTrainingHistory: currentUser.pastTrainingHistory || "No history",
      availableTrainings: availableTrainingsDescription,
    });
    
    setRecommendations(result);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-card p-6 rounded-lg border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">AI Training Recommendations</h1>
          <p className="text-muted-foreground">
            Get personalized training suggestions based on your profile.
          </p>
        </div>
        <Button onClick={handleGetRecommendations} disabled={isLoading} size="lg">
          <Wand2 className="mr-2 h-5 w-5" />
          {isLoading ? "Analyzing..." : "Generate My Recommendations"}
        </Button>
      </div>

      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
             <Card key={i}>
                <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-2/3 mt-1" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-10 w-full" />
                </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {recommendations && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.recommendedTrainings.length > 0 ? (
            recommendations.recommendedTrainings.map((rec, index) => (
              <RecommendationCard
                key={index}
                trainingName={rec.trainingName}
                reason={rec.reason}
                matchScore={rec.matchScore}
              />
            ))
          ) : (
            <Card className="col-span-full text-center p-12">
              <CardTitle>No Recommendations Found</CardTitle>
              <CardContent className="mt-2">
                <p>We couldn't find any suitable recommendations at this time. Please check back later.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
