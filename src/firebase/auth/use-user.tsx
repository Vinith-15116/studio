'use client';

import { type User } from 'firebase/auth';

export function useUser() {
  // Always return null user since auth is removed
  return { user: null as User | null, loading: false };
}
