"use client";

import React from "react";
import { useSearchParams } from 'next/navigation';
import { collection, query } from "firebase/firestore";

import { useCollection } from "@/firebase/firestore/use-collection";
import { useFirestore } from "@/firebase";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { TrendsChart } from "@/components/dashboard/trends-chart";
import { CategoryChart } from "@/components/dashboard/category-chart";
import { ProblemTable } from "@/components/dashboard/problem-table";
import { Skeleton } from "@/components/ui/skeleton";
import type { Problem } from "@/lib/types";

export default function DashboardPage() {
  const firestore = useFirestore();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState('');

  const problemsQuery = React.useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, "problems"));
  }, [firestore]);

  const { data: problems, loading: problemsLoading } = useCollection<Problem>(problemsQuery);

  const categoryFilter = searchParams.get('category');

  const filteredProblems = React.useMemo(() => {
    if (!problems) return [];
    
    let filtered = problems;

    if (categoryFilter && categoryFilter !== 'all' && categoryFilter !== '') {
      filtered = filtered.filter(p => p.category.replace(/ /g, '-') === categoryFilter);
    }

    if (searchQuery) {
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return filtered;
  }, [problems, categoryFilter, searchQuery]);


  if (problemsLoading) {
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
        <Header onSearch={setSearchQuery} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <StatsCards problems={filteredProblems || []} isLoading={problemsLoading} />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              <TrendsChart problems={filteredProblems || []} isLoading={problemsLoading}/>
              <CategoryChart problems={filteredProblems || []} isLoading={problemsLoading} />
            </div>
            <ProblemTable problems={filteredProblems || []} isLoading={problemsLoading} />
          </div>
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
            {/* Right column can be used for other components in future */}
          </div>
        </main>
      </div>
    </div>
  );
}
