"use client";

import React from "react";
import { collection, query, where } from "firebase/firestore";
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
import { sampleProblems } from "@/lib/sample-data";

function unslugify(slug: string) {
  const words = slug.split('-');
  return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const firestore = useFirestore();
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const categoryName = React.useMemo(() => unslugify(params.category), [params.category]);

  const problemsQuery = React.useMemo(() => {
    if (!firestore || !categoryName) return null;
    return query(collection(firestore, "problems"), where("category", "==", categoryName));
  }, [firestore, categoryName]);

  const { data: problemsFromDB, loading: problemsLoading } = useCollection<Problem>(problemsQuery);

  const allProblems = React.useMemo(() => {
    const staticProblems = sampleProblems.map((p, i) => ({
      ...p,
      id: `sample-${i}`,
      timestamp: {
        toDate: () => new Date(p.date),
      },
    } as Problem)).filter(p => p.category === categoryName);

    if (!problemsFromDB) {
        return staticProblems;
    }

    const combined = [...staticProblems, ...problemsFromDB];
    const uniqueProblems = Array.from(new Map(combined.map(p => [p.id, p])).values());
    return uniqueProblems;
  }, [problemsFromDB, categoryName]);


  const filteredProblems = React.useMemo(() => {
    let filtered = allProblems;

    if (searchQuery) {
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return filtered;
  }, [allProblems, searchQuery]);

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
        <Header onSearch={setSearchQuery} category={categoryName} />
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
