
"use client";
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  FileWarning,
  TrendingUp,
  Activity,
} from "lucide-react";
import type { StatCardData, Problem } from "@/lib/types";
import { Skeleton } from '../ui/skeleton';


export function StatsCards({ problems, isLoading }: { problems: Problem[], isLoading: boolean}) {
  const stats: StatCardData[] = React.useMemo(() => {
    const totalProblems = problems.length;
    const urgentIssues = problems.filter(p => p.severity === 'Critical' || p.severity === 'High').length;
    const newToday = problems.filter(p => {
        const problemDate = new Date(p.timestamp.toDate());
        const today = new Date();
        return problemDate.getDate() === today.getDate() &&
               problemDate.getMonth() === today.getMonth() &&
               problemDate.getFullYear() === today.getFullYear();
    }).length;
    // This is a placeholder, as we don't have uncategorized problems yet.
    const uncategorized = 0; 
    
    return [
      {
        title: "Total Problems",
        value: totalProblems.toString(),
        icon: Activity,
        description: "Total active problems being tracked.",
      },
      {
        title: "Urgent Issues",
        value: urgentIssues.toString(),
        icon: AlertTriangle,
        description: "Problems marked as Critical or High severity.",
      },
      {
        title: "New Today",
        value: newToday.toString(),
        icon: TrendingUp,
        description: "Problems detected in the last 24 hours.",
      },
      {
        title: "Uncategorized",
        value: uncategorized.toString(),
        icon: FileWarning,
        description: "Problems awaiting categorization.",
      },
    ];
  }, [problems]);
  
  if (isLoading) {
      return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
        </div>
      )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
