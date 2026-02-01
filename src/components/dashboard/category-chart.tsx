"use client";

import * as React from "react";
import { Pie, PieChart } from "recharts";
import type { Problem } from "@/lib/types";

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
  type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "../ui/skeleton";


const chartConfig = {
  problems: {
    label: "Problems",
  },
  Infrastructure: {
    label: "Infrastructure",
    color: "hsl(var(--chart-1))",
  },
  Environment: {
    label: "Environment",
    color: "hsl(var(--chart-2))",
  },
  "Public Safety": {
    label: "Public Safety",
    color: "hsl(var(--chart-3))",
  },
  "Cyber Threat": {
    label: "Cyber Threat",
    color: "hsl(var(--chart-4))",
  },
  "Social Challenge": {
    label: "Social Challenge",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function CategoryChart({ problems, isLoading }: { problems: Problem[], isLoading: boolean}) {
  const chartData = React.useMemo(() => {
    if (!problems) return [];
    const categoryCounts = problems.reduce((acc, problem) => {
      acc[problem.category] = (acc[problem.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCounts).map(([category, count]) => ({
      name: category,
      value: count,
      fill: `var(--color-${category.replace(" ", "-")})`,
    }));
  }, [problems]);

  if (isLoading) return <Skeleton className="h-full w-full" />;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Category Distribution</CardTitle>
        <CardDescription>Breakdown of problems by category</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
