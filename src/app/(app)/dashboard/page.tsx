import type { User } from "@/lib/types";
import { StatCard } from "@/components/dashboard/stat-card";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { RecentEnrollments } from "@/components/dashboard/recent-enrollments";
import { Wallet, BookOpen, Users, CheckCircle } from "lucide-react";

interface DashboardPageProps {
  currentUser: User;
}

export default function DashboardPage({ currentUser }: DashboardPageProps) {
  if (!currentUser) return null; // Or a loading state

  const commonStats = (
    <>
        <StatCard 
            title="Trainings Completed"
            value="12"
            icon={CheckCircle}
            description="Your personal training progress."
        />
        <StatCard 
            title="Active Enrollments"
            value="3"
            icon={Users}
            description="Sessions you are signed up for."
        />
    </>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {currentUser.role === 'ADMIN' && (
          <>
            <StatCard title="Total Budget" value="€500,000" icon={Wallet} trend="+5.2% from last month" />
            <StatCard title="Total Trainings" value="42" icon={BookOpen} trend="+10 from last month" />
            <StatCard title="Total Users" value="1,250" icon={Users} trend="+180 since last month" />
            <StatCard title="Completion Rate" value="85%" icon={CheckCircle} trend="+3% from last month" />
          </>
        )}
        {currentUser.role === 'MANAGER' && (
            <>
                <StatCard title="Team Budget" value="€25,000" icon={Wallet} description="€15,000 remaining" />
                <StatCard title="Team Enrollments" value="8" icon={Users} trend="+2 this week" />
                <StatCard title="Pending Approvals" value="2" icon={CheckCircle} />
                <StatCard title="Team Completion" value="78%" icon={CheckCircle} trend="-2% from last month" />
            </>
        )}
        {currentUser.role === 'EMPLOYEE' && commonStats}
        {currentUser.role === 'RRH' && (
            <>
                <StatCard title="Open Positions" value="12" icon={Users} />
                <StatCard title="New Hires" value="5" icon={Users} trend="+2 this month" />
                <StatCard title="Company-wide Completion" value="85%" icon={CheckCircle} />
                <StatCard title="Compliance Training" value="98% Complete" icon={BookOpen} />
            </>
        )}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
          <OverviewChart />
          <RecentEnrollments />
      </div>
    </div>
  );
}
