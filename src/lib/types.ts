import type { LucideIcon } from "lucide-react";

export type ProblemCategory =
  | "Infrastructure"
  | "Environment"
  | "Public Safety"
  | "Cyber Threat"
  | "Social Challenge";

export type ProblemSeverity = "Low" | "Medium" | "High" | "Critical";

export type Problem = {
  id: string;
  title: string;
  category: ProblemCategory;
  location: string;
  timestamp: any;
  severity: ProblemSeverity;
  urgency: number;
  sentimentScore: number;
  keyTrends: string[];
  summary: string;
  description: string;
  date: string; // for charting
  userId: string;
};

export type StatCardData = {
  title: string;
  value: string;
  change?: string;
  changeType?: "increase" | "decrease";
  icon: LucideIcon;
  description: string;
};
