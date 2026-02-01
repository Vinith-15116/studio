"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { collection, query, where } from "firebase/firestore";

import { useUser } from "@/firebase/auth/use-user";
import { useCollection } from "@/firebase/firestore/use-collection";
import { useFirestore } from "@/firebase";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { TrendsChart } from "@/components/dashboard/trends-chart";
import { CategoryChart } from "@/components/dashboard/category-chart";
import { ProblemTable } from "@/components/dashboard/problem-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const problemsQuery = React.useMemo(() => {
    if (!user || !firestore) return null;
    return query(collection(firestore, "problems"), where("userId", "==", user.uid));
  }, [firestore, user]);

  const { data: problems, loading: problemsLoading } = useCollection(problemsQuery);

  React.useEffect(() => {
    if (!user && !userLoading) {
      router.push("/login");
    }
  }, [user, userLoading, router]);

  if (userLoading || !user) {
    return (
       <div className="flex min-h-screen w-full flex-col bg-background">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
             <Skeleton className="h-8 w-24" />
             <div className="relative ml-auto flex-1 md:grow-0">
                <Skeleton className="h-8 w-full" />
             </div>
              <Skeleton className="h-9 w-9 rounded-full" />
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                  <Skeleton className="h-28" />
                  <Skeleton className="h-28" />
                  <Skeleton className="h-28" />
                  <Skeleton className="h-28" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                  <Skeleton className="h-56" />
                  <Skeleton className="h-56" />
              </div>
               <Skeleton className="h-96" />
            </div>
             <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <StatsCards problems={problems || []} isLoading={problemsLoading} />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              <TrendsChart problems={problems || []} isLoading={problemsLoading}/>
              <CategoryChart problems={problems || []} isLoading={problemsLoading} />
            </div>
            <ProblemTable problems={problems || []} isLoading={problemsLoading} />
          </div>
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
            {/* Right column can be used for other components in future */}
          </div>
        </main>
      </div>
    </div>
  );
}
