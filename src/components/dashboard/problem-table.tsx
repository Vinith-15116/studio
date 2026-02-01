"use client";

import * as React from "react";
import {
  File,
  ListFilter,
  MoreHorizontal,
  Wrench,
  Leaf,
  ShieldAlert,
  SignalHigh,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import type { Problem, ProblemCategory, ProblemSeverity } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "../ui/skeleton";
import { toggleProblemArchiveAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";


const categoryIcons: Record<ProblemCategory, React.ElementType> = {
  Infrastructure: Wrench,
  Environment: Leaf,
  "Public Safety": ShieldAlert,
  "Cyber Threat": SignalHigh,
  "Social Challenge": Users,
};

const severityVariant: Record<ProblemSeverity, "default" | "secondary" | "destructive" | "outline"> = {
    Low: "secondary",
    Medium: "default",
    High: "outline",
    Critical: "destructive"
}


export function ProblemTable({ problems, isLoading }: { problems: Problem[], isLoading: boolean }) {
  const [selectedProblem, setSelectedProblem] = React.useState<Problem | null>(null);
  const [severityFilter, setSeverityFilter] = React.useState<string>("all");
  const [archiveFilter, setArchiveFilter] = React.useState<"all" | "active" | "archived">("active");
  const { toast } = useToast();

  const handleArchiveToggle = async (problem: Problem) => {
    const result = await toggleProblemArchiveAction(problem.id, problem.archived);
    if (result.success) {
      toast({ title: `Problem ${problem.archived ? 'unarchived' : 'archived'}` });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
  };

  const filteredProblems = React.useMemo(() => {
    return problems
      .filter(p => {
        if (severityFilter === 'all') return true;
        return p.severity.toLowerCase() === severityFilter;
      })
      .filter(p => {
        if (archiveFilter === 'all') return true;
        if (archiveFilter === 'active') return !p.archived;
        if (archiveFilter === 'archived') return p.archived;
        return false;
      });
  }, [problems, severityFilter, archiveFilter]);
  
  if (isLoading) return <Skeleton className="h-96 w-full" />

  return (
    <>
      <Tabs defaultValue="all" onValueChange={setSeverityFilter}>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="critical" className="hidden sm:flex text-destructive">
              Critical
            </TabsTrigger>
            <TabsTrigger value="high" className="hidden sm:flex">
              High
            </TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="low">Low</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={archiveFilter} onValueChange={(value) => setArchiveFilter(value as any)}>
                    <DropdownMenuRadioItem value="active">Active</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="archived">Archived</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1" disabled>
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
          </div>
        </div>
      </Tabs>
      <Card>
        <CardHeader>
          <CardTitle>Detected Problems</CardTitle>
          <CardDescription>
            A real-time list of detected global and local problems.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Problem</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">
                  Severity
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Location
                </TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProblems.map((problem) => (
                <TableRow
                  key={problem.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedProblem(problem)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${problem.severity === "Critical" ? 'bg-destructive' : problem.severity === "High" ? 'bg-accent' : 'bg-primary/20'}`} />
                        {problem.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="flex items-center gap-1.5 w-fit">
                      {React.createElement(categoryIcons[problem.category], { className: 'h-3.5 w-3.5' })}
                      {problem.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={severityVariant[problem.severity]}>{problem.severity}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {problem.location}
                  </TableCell>
                  <TableCell suppressHydrationWarning className="hidden md:table-cell">
                    {new Date(problem.timestamp.toDate()).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={(e) => {e.stopPropagation(); setSelectedProblem(problem)}}>View Details</DropdownMenuItem>
                        <DropdownMenuItem disabled>Share</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => {e.stopPropagation(); handleArchiveToggle(problem)}}>
                            {problem.archived ? 'Unarchive' : 'Archive'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-{filteredProblems.length}</strong> of <strong>{filteredProblems.length}</strong> problems
          </div>
        </CardFooter>
      </Card>
      <Dialog
        open={!!selectedProblem}
        onOpenChange={(isOpen) => !isOpen && setSelectedProblem(null)}
      >
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{selectedProblem?.title}</DialogTitle>
            <DialogDescription>
              {selectedProblem?.location} -{" "}
              {selectedProblem &&
                new Date(selectedProblem.timestamp.toDate()).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <h3 className="text-sm font-medium text-muted-foreground col-span-4">
                AI Generated Summary
              </h3>
              <p className="col-span-4 text-sm bg-muted/50 p-3 rounded-md">
                {selectedProblem?.summary}
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <h3 className="text-sm font-medium text-muted-foreground col-span-4">
                Full Description
              </h3>
              <p className="col-span-4 text-sm">
                {selectedProblem?.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Details</h3>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-sm"><span className="font-medium">Severity:</span> <Badge variant={selectedProblem ? severityVariant[selectedProblem.severity] : 'default'}>{selectedProblem?.severity}</Badge></div>
                        <div className="flex justify-between text-sm"><span className="font-medium">Urgency:</span> <span>{selectedProblem?.urgency}/10</span></div>
                        <div className="flex justify-between text-sm"><span className="font-medium">Sentiment:</span> <span>{selectedProblem?.sentimentScore}</span></div>
                    </div>
                </div>
                 <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Key Trends</h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedProblem?.keyTrends.map(trend => <Badge key={trend} variant="secondary">{trend}</Badge>)}
                    </div>
                </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
