"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { useMemo } from "react";
import type { Problem } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
  problems: {
    label: "Problems",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function TrendsChart({ problems, isLoading }: { problems: Problem[], isLoading: boolean }) {
  const chartData = useMemo(() => {
    const dailyCounts: { [key: string]: number } = {};
    if (!problems) return [];
    
    problems.forEach((p) => {
      if (p.timestamp && typeof p.timestamp.toDate === 'function') {
        const date = new Date(p.timestamp.toDate()).toISOString().split('T')[0];
        dailyCounts[date] = (dailyCounts[date] || 0) + 1;
      }
    });

    return Object.entries(dailyCounts)
      .map(([date, count]) => ({ date, problems: count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [problems]);
  
  if (isLoading) return <Skeleton className="h-full w-full" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Problem Trends</CardTitle>
        <CardDescription>Daily problem detection volume</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="problems" fill="var(--color-problems)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
