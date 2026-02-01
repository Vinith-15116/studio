'use server';

/**
 * @fileOverview An AI agent to summarize complex problems into concise, human-readable insights.
 *
 * - summarizeProblem - A function that handles the problem summarization process.
 * - SummarizeProblemInput - The input type for the summarizeProblem function.
 * - SummarizeProblemOutput - The return type for the summarizeProblem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProblemInputSchema = z.object({
  problemDescription: z
    .string()
    .describe('A detailed description of the problem detected from various sources.'),
});
export type SummarizeProblemInput = z.infer<typeof SummarizeProblemInputSchema>;

const SummarizeProblemOutputSchema = z.object({
  summary: z.string().describe('A concise, human-readable summary of the problem.'),
});
export type SummarizeProblemOutput = z.infer<typeof SummarizeProblemOutputSchema>;

export async function summarizeProblem(input: SummarizeProblemInput): Promise<SummarizeProblemOutput> {
  return summarizeProblemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeProblemPrompt',
  input: {schema: SummarizeProblemInputSchema},
  output: {schema: SummarizeProblemOutputSchema},
  prompt: `You are an expert summarizer, skilled at distilling complex information into concise, human-readable insights.

  Please provide a summary of the following problem description:

  {{{problemDescription}}}
  `,
});

const summarizeProblemFlow = ai.defineFlow(
  {
    name: 'summarizeProblemFlow',
    inputSchema: SummarizeProblemInputSchema,
    outputSchema: SummarizeProblemOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
