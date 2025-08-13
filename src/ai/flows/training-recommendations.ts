'use server';

/**
 * @fileOverview AI-driven training recommendations flow.
 *
 * - trainingRecommendations - A function that recommends relevant training courses and sessions based on the employee's role, skills, and past training history.
 * - TrainingRecommendationsInput - The input type for the trainingRecommendations function.
 * - TrainingRecommendationsOutput - The return type for the trainingRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrainingRecommendationsInputSchema = z.object({
  employeeRole: z.string().describe('The role of the employee.'),
  employeeSkills: z.array(z.string()).describe('The skills of the employee.'),
  pastTrainingHistory: z.string().describe('The past training history of the employee.'),
  availableTrainings: z.string().describe('A description of available trainings'),
});
export type TrainingRecommendationsInput = z.infer<typeof TrainingRecommendationsInputSchema>;

const TrainingRecommendationsOutputSchema = z.object({
  recommendedTrainings: z.array(
    z.object({
      trainingName: z.string().describe('The name of the recommended training.'),
      reason: z.string().describe('The reason why this training is recommended.'),
      matchScore: z.number().describe('A score indicating how well the training matches the employee (0-1).'),
    })
  ).describe('A list of recommended trainings with reasons and match scores.'),
});
export type TrainingRecommendationsOutput = z.infer<typeof TrainingRecommendationsOutputSchema>;

export async function trainingRecommendations(input: TrainingRecommendationsInput): Promise<TrainingRecommendationsOutput> {
  return trainingRecommendationsFlow(input);
}

const trainingRecommendationTool = ai.defineTool(
  {
    name: 'trainingRecommendationTool',
    description: 'Determines whether the suggested course aligns with the employee’s role, skills, and experience, and returns a match score (0 to 1).',
    inputSchema: z.object({
      employeeRole: z.string().describe('The role of the employee.'),
      employeeSkills: z.array(z.string()).describe('The skills of the employee.'),
      pastTrainingHistory: z.string().describe('The past training history of the employee.'),
      trainingDescription: z.string().describe('A description of the training course.'),
    }),
    outputSchema: z.object({
      reason: z.string().describe('The reasons why the training is or is not a good fit.'),
      matchScore: z.number().describe('A score between 0 and 1 indicating how well the training matches the employee.'),
    }),
  },
  async (input) => {
    // Dummy implementation for the tool, replace with actual logic
    const match = Math.random();
    return {
      reason: `This training has a ${match > 0.5 ? 'good' : 'poor'} match based on the employee's profile.`,
      matchScore: match,
    };
  }
);

const prompt = ai.definePrompt({
  name: 'trainingRecommendationsPrompt',
  input: { schema: TrainingRecommendationsInputSchema },
  output: { schema: TrainingRecommendationsOutputSchema },
  tools: [trainingRecommendationTool],
  prompt: `You are an AI assistant that recommends training courses to employees based on their role, skills, and past training history.

  The employee has the following role: {{{employeeRole}}}
  The employee has the following skills: {{#each employeeSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  The employee has the following past training history: {{{pastTrainingHistory}}}

  Available trainings: {{{availableTrainings}}}

  Recommend relevant training courses and sessions to the employee. Use the trainingRecommendationTool to determine whether each suggested course aligns with the employee’s role, skills, and experience.
  Provide a reason why each training is recommended.
`,
});

const trainingRecommendationsFlow = ai.defineFlow(
  {
    name: 'trainingRecommendationsFlow',
    inputSchema: TrainingRecommendationsInputSchema,
    outputSchema: TrainingRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
