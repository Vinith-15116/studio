'use client';
import React, { createContext, useContext } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

interface FirebaseContextValue {
  firebaseApp: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

const FirebaseContext = createContext<FirebaseContextValue>({
  firebaseApp: null,
  auth: null,
  firestore: null,
});

export const FirebaseProvider: React.FC<{
  children: React.ReactNode;
  value: FirebaseContextValue;
}> = ({ children, value }) => {
  return (
    <FirebaseContext.Provider value={value}>
      {children}
      <FirebaseErrorListener />
    </FirebaseContext.Provider>
  );
};

export function useFirebase() {
  return useContext(FirebaseContext);
}

export function useFirebaseApp() {
  return useContext(FirebaseContext).firebaseApp;
}

export function useAuth() {
  return useContext(FirebaseContext).auth;
}

export function useFirestore() {
  return useContext(FirebaseContext).firestore;
}
