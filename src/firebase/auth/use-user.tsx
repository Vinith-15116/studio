'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useAuth } from '../provider';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore } from '..';

export function useUser() {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth || !firestore) return;

    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      setUser(userAuth);
      setLoading(false);
      
      if (userAuth) {
        const userRef = doc(firestore, 'users', userAuth.uid);
        await setDoc(userRef, {
          displayName: userAuth.displayName,
          email: userAuth.email,
          photoURL: userAuth.photoURL
        }, { merge: true });
      }
    });

    return () => unsubscribe();
  }, [auth, firestore]);

  return { user, loading };
}
