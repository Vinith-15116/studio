'use client';

import React, { useMemo } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from '.';

export const FirebaseClientProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const firebaseContextValue = useMemo(() => {
    const { firebaseApp, auth, firestore } = initializeFirebase();
    return { firebaseApp, auth, firestore };
  }, []);

  return (
    <FirebaseProvider value={firebaseContextValue}>{children}</FirebaseProvider>
  );
};
