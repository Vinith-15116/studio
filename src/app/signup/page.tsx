'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Redirecting</CardTitle>
          <CardDescription>Sign up has been disabled. Redirecting to the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please wait...</p>
        </CardContent>
      </Card>
    </div>
  );
}
