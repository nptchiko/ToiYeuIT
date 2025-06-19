import StatCard from "../User/stat-card";
import {
  Users,
  GraduationCap,
  UserPlus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function UserStats({ stats, isLoading }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <StatCard
        icon={
          <Users className="w-8 h-8 bg-blue-100 dark:bg-primary rounded-full text-primary dark:text-blue-800 flex items-center" />
        }
        title="Total Users"
        value={stats.totalUsers?.toLocaleString() || 0}
        trend={{
          value: stats.usersTrend?.percentage || 0,
          isPositive: true,
          icon: <ArrowUpRight className="h-3 w-3 mr-1" />,
        }}
        bgColor="bg-popover dark:bg-popover"
      />

      <StatCard
        icon={
          <GraduationCap className="h-8 w-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-500" />
        }
        title="Students"
        value={stats.totalStudents || 0}
        trend={{
          value: stats.studentsTrend?.percentage || 0,
          isPositive: false,
          icon: <ArrowDownRight className="h-3 w-3 mr-1" />,
        }}
        bgColor="bg-popover dark:bg-popover"
      />

      <StatCard
        icon={
          <UserPlus className="h-6 w-6 text-yellow-400 dark:text-yellow-600 bg-yellow-100 dark:bg-yellow-100 rounded-full" />
        }
        title="New Registration"
        value={stats.newRegistrations || 0}
        trend={{
          value: stats.registrationTrend?.percentage || 0,
          isPositive: false,
          icon: <ArrowDownRight className="h-3 w-3 mr-1" />,
        }}
        bgColor="bg-popover dark:bg-popover"
      />
    </div>
  );
}
