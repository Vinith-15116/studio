'use client';
import { useState, useEffect } from 'react';
import {
  onSnapshot,
  collection,
  query,
  where,
  type DocumentData,
  type Query,
} from 'firebase/firestore';
import { useFirestore } from '../provider';

export function useCollection<T extends DocumentData>(
  q: Query<T> | null
) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!q) {
      setData([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(docs as T[]);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
        console.error("Error fetching collection:", err);
      }
    );

    return () => unsubscribe();
  }, [q]);

  return { data, loading, error };
}
