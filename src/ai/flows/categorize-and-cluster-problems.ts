'use server';
/**
 * @fileOverview An AI agent that categorizes and clusters problems based on NLP and machine learning.
 *
 * - categorizeAndClusterProblems - A function that handles the problem categorization and clustering process.
 * - CategorizeAndClusterProblemsInput - The input type for the categorizeAndClusterProblems function.
 * - CategorizeAndClusterProblemsOutput - The return type for the categorizeAndClusterProblems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeAndClusterProblemsInputSchema = z.object({
  problemDescription: z
    .string()
    .describe('A description of the problem to be categorized and clustered.'),
});
export type CategorizeAndClusterProblemsInput = z.infer<typeof CategorizeAndClusterProblemsInputSchema>;

const CategorizeAndClusterProblemsOutputSchema = z.object({
  category: z.string().describe('The category of the problem.'),
  cluster: z.string().describe('The cluster the problem belongs to.'),
  confidenceScore: z.number().describe('The confidence score of the categorization and clustering.'),
});
export type CategorizeAndClusterProblemsOutput = z.infer<typeof CategorizeAndClusterProblemsOutputSchema>;

export async function categorizeAndClusterProblems(input: CategorizeAndClusterProblemsInput): Promise<CategorizeAndClusterProblemsOutput> {
  return categorizeAndClusterProblemsFlow(input);
}

const categorizeAndClusterProblemsPrompt = ai.definePrompt({
  name: 'categorizeAndClusterProblemsPrompt',
  input: {schema: CategorizeAndClusterProblemsInputSchema},
  output: {schema: CategorizeAndClusterProblemsOutputSchema},
  prompt: `You are an expert in categorizing and clustering problems using NLP and machine learning techniques.

  Given the following problem description, categorize and cluster the problem. Also, provide a confidence score for your categorization and clustering.

  Problem Description: {{{problemDescription}}}

  Ensure that the output is a valid JSON object that conforms to the schema. Do not include any additional explanation or context outside of the JSON object.`,
});

const categorizeAndClusterProblemsFlow = ai.defineFlow(
  {
    name: 'categorizeAndClusterProblemsFlow',
    inputSchema: CategorizeAndClusterProblemsInputSchema,
    outputSchema: CategorizeAndClusterProblemsOutputSchema,
  },
  async input => {
    const {output} = await categorizeAndClusterProblemsPrompt(input);
    return output!;
  }
);
