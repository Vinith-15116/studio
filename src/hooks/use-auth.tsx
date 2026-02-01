'use client';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { useAuth as useFirebaseAuth } from '@/firebase/provider';
import { useToast } from './use-toast';

export function useAuth() {
  const auth = useFirebaseAuth();
  const { toast } = useToast();

  const signUp = async (email: string, pass: string) => {
    if (!auth) throw new Error('Firebase Auth not available');
    try {
      return await createUserWithEmailAndPassword(auth, email, pass);
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Sign up failed', description: error.message });
      throw error;
    }
  };

  const signIn = async (email: string, pass: string) => {
    if (!auth) throw new Error('Firebase Auth not available');
    try {
      return await signInWithEmailAndPassword(auth, email, pass);
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Sign in failed', description: error.message });
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    if (!auth) throw new Error('Firebase Auth not available');
    const provider = new GoogleAuthProvider();
    try {
      return await signInWithPopup(auth, provider);
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Google sign in failed', description: error.message });
      throw error;
    }
  };

  const signOut = async () => {
    if (!auth) throw new Error('Firebase Auth not available');
    try {
      await firebaseSignOut(auth);
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Sign out failed', description: error.message });
      throw error;
    }
  };

  return { signUp, signIn, signInWithGoogle, signOut };
}
