import { Loader2 } from "lucide-react";

export default function TestStats({ userCount, testStats, isLoading, error }) {
  const StatCard = ({ icon, title, value, bgColor }) => (
    <div
      className={`${bgColor} rounded-xl p-6 border border-border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="flex flex-col space-y-4">
        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-12 h-12 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-muted-foreground font-medium">{title}</p>
          <div className="flex items-center mt-1">
            <h3 className="text-3xl font-bold mr-2 text-foreground">
              {isLoading ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : error ? (
                "Error"
              ) : (
                value
              )}
            </h3>
            {/* {trend && (
              <div
                
                className="flex items-center text-sm text-emerald-600 dark:text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full"
              ></div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary dark:text-blue-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        }
        title="Total Users"
        value={userCount.toLocaleString()}
        // trend={{
        //   icon: (
        //     <svg
        //       xmlns="http://www.w3.org/2000/svg"
        //       className="h-3 w-3 mr-1"
        //       viewBox="0 0 24 24"
        //       fill="none"
        //       stroke="currentColor"
        //       strokeWidth="2"
        //       strokeLinecap="round"
        //       strokeLinejoin="round"
        //     >
        //       <line x1="7" y1="17" x2="17" y2="7"></line>
        //       <polyline points="7 7 17 7 17 17"></polyline>
        //     </svg>
        //   ),
        //   value: "11.01%",
        // }}
        bgColor="bg-gradient-to-br from-card to-card/80"
      />

      <StatCard
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary dark:text-blue-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        }
        title="Active tests"
        value={testStats.activeTestsCount}
        bgColor="bg-gradient-to-br from-card to-card/80"
      />

      <StatCard
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary dark:text-blue-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line>
          </svg>
        }
        title="Total questions"
        value={testStats.totalQuestionsCount}
        bgColor="bg-gradient-to-br from-card to-card/80"
      />
    </div>
  );
}
