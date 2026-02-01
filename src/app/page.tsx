import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { TrendsChart } from "@/components/dashboard/trends-chart";
import { CategoryChart } from "@/components/dashboard/category-chart";
import { ProblemTable } from "@/components/dashboard/problem-table";
import { problems } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <StatsCards />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              <TrendsChart />
              <CategoryChart />
            </div>
            <ProblemTable problems={problems} />
          </div>
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
            {/* Right column can be used for other components in future */}
          </div>
        </main>
      </div>
    </div>
  );
}
