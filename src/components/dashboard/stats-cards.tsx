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
import type { StatCardData } from "@/lib/types";
import { problems } from "@/lib/data";

const stats: StatCardData[] = [
  {
    title: "Total Problems",
    value: "8",
    icon: Activity,
    description: "Total active problems being tracked.",
  },
  {
    title: "Urgent Issues",
    value: "2",
    icon: AlertTriangle,
    description: "Problems marked as Critical or High severity.",
  },
  {
    title: "New Today",
    value: "4",
    icon: TrendingUp,
    description: "Problems detected in the last 24 hours.",
  },
  {
    title: "Uncategorized",
    value: "0",
    icon: FileWarning,
    description: "Problems awaiting categorization.",
  },
];

export function StatsCards() {
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
