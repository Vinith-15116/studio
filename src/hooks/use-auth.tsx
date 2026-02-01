'use client';
import { useToast } from './use-toast';

export function useAuth() {
  const { toast } = useToast();

  const signUp = async (email: string, pass: string) => {
    console.warn('Sign up has been disabled.');
    toast({ variant: 'destructive', title: 'Feature disabled', description: 'User sign up is not available.' });
  };

  const signIn = async (email: string, pass: string) => {
    console.warn('Sign in has been disabled.');
    toast({ variant: 'destructive', title: 'Feature disabled', description: 'User sign in is not available.' });
  };

  const signInWithGoogle = async () => {
    console.warn('Google sign in has been disabled.');
    toast({ variant: 'destructive', title: 'Feature disabled', description: 'User sign in is not available.' });
  };

  const signOut = async () => {
    console.warn('Sign out has been disabled.');
    toast({ variant: 'destructive', title: 'Feature disabled', description: 'User sign out is not available.' });
  };

  return { signUp, signIn, signInWithGoogle, signOut };
}
