'use client';
import { useState, useEffect } from 'react';
import {
  onSnapshot,
  doc,
  type DocumentData,
  type DocumentReference,
} from 'firebase/firestore';
import { useFirestore } from '../provider';

export function useDoc<T extends DocumentData>(
  ref: DocumentReference<T> | null
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!ref) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);

    const unsubscribe = onSnapshot(
      ref,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setData({ ...docSnapshot.data(), id: docSnapshot.id } as T);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
        console.error("Error fetching document:", err);
      }
    );

    return () => unsubscribe();
  }, [ref]);

  return { data, loading, error };
}
