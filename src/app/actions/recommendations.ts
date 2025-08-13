"use server";

import { trainingRecommendations, type TrainingRecommendationsInput } from "@/ai/flows/training-recommendations";

export async function getTrainingRecommendations(input: TrainingRecommendationsInput) {
  try {
    const recommendations = await trainingRecommendations(input);
    return recommendations;
  } catch (error) {
    console.error("Error getting training recommendations:", error);
    // In a real app, you'd handle this error more gracefully
    return { recommendedTrainings: [] };
  }
}
