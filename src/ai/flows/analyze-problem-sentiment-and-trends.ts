'use server';
/**
 * @fileOverview Analyzes the sentiment and trends associated with a given problem to determine its severity, urgency, and emerging status.
 *
 * - analyzeProblemSentimentAndTrends - A function that handles the sentiment and trend analysis process.
 * - AnalyzeProblemSentimentAndTrendsInput - The input type for the analyzeProblemSentimentAndTrends function.
 * - AnalyzeProblemSentimentAndTrendsOutput - The return type for the analyzeProblemSentimentAndTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeProblemSentimentAndTrendsInputSchema = z.object({
  problemDescription: z
    .string()
    .describe('The description of the problem to analyze.'),
  relevantNewsArticles: z
    .string()
    .describe('A list of news articles relevant to the problem.'),
  socialMediaPosts: z
    .string()
    .describe('A list of social media posts related to the problem.'),
});
export type AnalyzeProblemSentimentAndTrendsInput = z.infer<
  typeof AnalyzeProblemSentimentAndTrendsInputSchema
>;

const AnalyzeProblemSentimentAndTrendsOutputSchema = z.object({
  sentimentScore: z
    .number()
    .describe(
      'A numerical score representing the overall sentiment towards the problem. Higher values indicate more positive sentiment, while lower values indicate negative sentiment.'
    ),
  urgencyScore: z
    .number()
    .describe(
      'A numerical score representing the urgency of the problem. Higher values indicate a more urgent problem.'
    ),
  severityScore: z
    .number()
    .describe(
      'A numerical score representing the severity of the problem. Higher values indicate a more severe problem.'
    ),
  emergingStatus: z
    .string()
    .describe(
      'A description of the emerging status of the problem. Can be "emerging", "stable", or "declining".'
    ),
  keyTrends: z
    .string()
    .describe('A summary of the key trends associated with the problem.'),
});
export type AnalyzeProblemSentimentAndTrendsOutput = z.infer<
  typeof AnalyzeProblemSentimentAndTrendsOutputSchema
>;

export async function analyzeProblemSentimentAndTrends(
  input: AnalyzeProblemSentimentAndTrendsInput
): Promise<AnalyzeProblemSentimentAndTrendsOutput> {
  return analyzeProblemSentimentAndTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeProblemSentimentAndTrendsPrompt',
  input: {schema: AnalyzeProblemSentimentAndTrendsInputSchema},
  output: {schema: AnalyzeProblemSentimentAndTrendsOutputSchema},
  prompt: `You are an AI expert in sentiment analysis and trend detection. Analyze the following problem description, news articles, and social media posts to determine the sentiment, urgency, severity, emerging status, and key trends associated with the problem.

Problem Description: {{{problemDescription}}}

Relevant News Articles: {{{relevantNewsArticles}}}

Social Media Posts: {{{socialMediaPosts}}}

Provide the sentiment score, urgency score, severity score, emerging status, and key trends in the output. The sentiment score should be on a scale of -1 to 1, urgency and severity scores should be on a scale of 1 to 10. The emerging status can be "emerging", "stable", or "declining". The key trends should be a short summary of the main trends associated with the problem.

Make sure to output a json that conforms to this schema:
{{json schema=AnalyzeProblemSentimentAndTrendsOutputSchema}}`,
});

const analyzeProblemSentimentAndTrendsFlow = ai.defineFlow(
  {
    name: 'analyzeProblemSentimentAndTrendsFlow',
    inputSchema: AnalyzeProblemSentimentAndTrendsInputSchema,
    outputSchema: AnalyzeProblemSentimentAndTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
