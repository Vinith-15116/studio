'use server';

import { revalidatePath } from 'next/cache';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { summarizeProblem } from '@/ai/flows/summarize-problem';
import { categorizeAndClusterProblems } from '@/ai/flows/categorize-and-cluster-problems';
import { analyzeProblemSentimentAndTrends } from '@/ai/flows/analyze-problem-sentiment-and-trends';
import type { Problem } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export async function createProblemAction(formData: FormData) {
  const { firestore } = initializeFirebase();
  
  const description = formData.get('description') as string;
  const title = formData.get('title') as string;
  const location = formData.get('location') as string;

  if (!description || !title || !location) {
    throw new Error('Title, description, and location are required.');
  }

  try {
    const [summaryResult, categoryResult, analysisResult] = await Promise.all([
      summarizeProblem({ problemDescription: description }),
      categorizeAndClusterProblems({ problemDescription: description }),
      analyzeProblemSentimentAndTrends({ problemDescription: description }),
    ]);
    
    const severityMap: Record<string, Problem["severity"]> = {
        "low": "Low",
        "medium": "Medium",
        "high": "High",
        "critical": "Critical",
    }
    
    const severity = analysisResult.severityScore > 8 ? "Critical" : analysisResult.severityScore > 6 ? "High" : analysisResult.severityScore > 3 ? "Medium" : "Low";


    const newProblem: Omit<Problem, 'id' | 'userId'> = {
      title,
      description,
      location,
      summary: summaryResult.summary,
      category: categoryResult.cluster as Problem["category"],
      urgency: analysisResult.urgencyScore,
      sentimentScore: analysisResult.sentimentScore,
      severity: severity,
      keyTrends: analysisResult.keyTrends.split(',').map(s => s.trim()),
      timestamp: serverTimestamp(),
      date: new Date().toISOString().split('T')[0],
      archived: false,
    };
    
    const collectionRef = collection(firestore, 'problems');

    addDoc(collectionRef, newProblem).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: collectionRef.path,
          operation: 'create',
          requestResourceData: newProblem,
        });

        errorEmitter.emit('permission-error', permissionError);
      });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to create problem:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function toggleProblemArchiveAction(problemId: string, isArchived: boolean) {
    const { firestore } = initializeFirebase();
    const problemRef = doc(firestore, 'problems', problemId);
  
    try {
      updateDoc(problemRef, { archived: !isArchived }).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: problemRef.path,
          operation: 'update',
          requestResourceData: { archived: !isArchived },
        });
        errorEmitter.emit('permission-error', permissionError);
      });
      revalidatePath('/');
      return { success: true };
    } catch (error) {
      console.error('Failed to update problem status:', error);
      return { success: false, error: (error as Error).message };
    }
  }
