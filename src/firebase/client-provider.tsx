'use client';

import React, { useState, useEffect } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from '.';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

interface FirebaseContextValue {
  firebaseApp: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

export const FirebaseClientProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [firebaseContextValue, setFirebaseContextValue] = useState<FirebaseContextValue>({
    firebaseApp: null,
    auth: null,
    firestore: null,
  });

  useEffect(() => {
    const { firebaseApp, auth, firestore } = initializeFirebase();
    setFirebaseContextValue({ firebaseApp, auth, firestore });
  }, []);

  return (
    <FirebaseProvider value={firebaseContextValue}>{children}</FirebaseProvider>
  );
};
