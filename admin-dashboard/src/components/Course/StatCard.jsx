import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  icon,
  title,
  value,
  trend,
  color,
  loading,
}) {
  const getColorClasses = (color) => {
    const classes = {
      blue: {
        bg: "bg-primary/10",
        iconBg: "bg-primary/20",
        text: "text-primary",
        trendUp: "text-[hsl(var(--chart-2))] bg-[hsl(var(--chart-2))/20]",
        trendDown: "text-destructive bg-destructive/10",
      },
      purple: {
        bg: "bg-[hsl(var(--chart-4))/10]",
        iconBg: "bg-[hsl(var(--chart-4))/20]",
        text: "text-[hsl(var(--chart-4))]",
        trendUp: "text-[hsl(var(--chart-2))] bg-[hsl(var(--chart-2))/20]",
        trendDown: "text-destructive bg-destructive/10",
      },
      amber: {
        bg: "bg-[hsl(var(--chart-1))/10]",
        iconBg: "bg-[hsl(var(--chart-1))/20]",
        text: "text-[hsl(var(--chart-1))]",
        trendUp: "text-[hsl(var(--chart-2))] bg-[hsl(var(--chart-2))/20]",
        trendDown: "text-destructive bg-destructive/10",
      },
    };
    return classes[color] || classes.blue;
  };

  const colorClasses = getColorClasses(color);

  return (
    <div
      className={`bg-card rounded-xl shadow-sm border border-border ${colorClasses.bg} p-6 transition-transform hover:shadow-md hover:-translate-y-1`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          {loading ? (
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <h3 className="text-3xl font-bold text-foreground">{value}</h3>
          )}
          {trend && !loading && (
            <div
              className={`mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                trend.isUp ? colorClasses.trendUp : colorClasses.trendDown
              }`}
            >
              {trend.isUp ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {trend.value}
            </div>
          )}
        </div>
        <div
          className={`h-12 w-12 rounded-full ${colorClasses.iconBg} flex items-center justify-center ${colorClasses.text}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
