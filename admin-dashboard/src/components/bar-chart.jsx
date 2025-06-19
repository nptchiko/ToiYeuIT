// charts/BarChart.jsx
"use client";

import { chartApi, formatChartData, handleApiError } from "../api/chartAPI";
import { initializeChart } from "../lib/chart-utils";
import { Chart, registerables } from "chart.js";
import { useEffect, useRef, useState, useCallback } from "react";

Chart.register(...registerables);

// Helper function to get CSS color values
const getCSSVariable = (variable) => {
  if (typeof window !== "undefined") {
    const value = getComputedStyle(document.documentElement).getPropertyValue(
      variable
    );
    return value.trim();
  }
  return "";
};

// Convert HSL to RGB for gradient creation
const hslToRgb = (h, s, l) => {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
};

// Function to adjust revenue data - subtract 9,000,000 from months with value > 0
const adjustRevenueData = (revenueArray) => {
  return revenueArray.map((value) => {
    if (value > 0) {
      return Math.max(0, value - 10800000); // Ensure value doesn't go below 0
    }
    return value;
  });
};

export function BarChart({
  refreshInterval = null, // Set to number (ms) for auto-refresh
  onDataChange = null, // Callback when data changes
  showRefreshButton = true, // Show manual refresh button
}) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState(null);
  const [originalData, setOriginalData] = useState(null); // Store original data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch data from API
  const fetchChartData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Call API service
      const apiResponse = await chartApi.getRevenueData();

      // Format data with predefined labels (Jan-Dec)
      const formattedData = formatChartData(apiResponse);

      // Store original data
      setOriginalData(formattedData);

      // Apply revenue adjustment (subtract 9,000,000 from months with value > 0)
      const adjustedData = {
        ...formattedData,
        revenue: adjustRevenueData(formattedData.revenue),
      };

      setChartData(adjustedData);
      setLastUpdated(new Date());

      // Call callback if provided (use adjusted data)
      if (onDataChange) {
        onDataChange(adjustedData);
      }
    } catch (err) {
      console.error("Error fetching chart data:", err);

      const errorMessage = handleApiError(err);
      setError(errorMessage);

      // Set empty data on error with default labels
      const emptyData = {
        labels: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
        revenue: Array(12).fill(0),
      };

      setOriginalData(emptyData);
      setChartData(emptyData);
    } finally {
      setLoading(false);
    }
  }, [onDataChange]);

  // Initial data fetch
  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  // Auto-refresh setup
  useEffect(() => {
    if (!refreshInterval) return;

    const interval = setInterval(fetchChartData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchChartData, refreshInterval]);

  // Initialize chart when data is available
  useEffect(() => {
    if (!chartData || loading) return;

    const { labels, revenue } = chartData;

    // Get CSS color values
    const primaryHsl = getCSSVariable("--primary").split(" ");
    const mutedForegroundHsl = getCSSVariable("--muted-foreground").split(" ");
    const borderHsl = getCSSVariable("--border").split(" ");
    const foregroundHsl = getCSSVariable("--foreground").split(" ");

    // Create gradient for bars using primary color
    const ctx = chartRef.current?.getContext("2d");
    let gradient = null;
    if (ctx && primaryHsl.length >= 3) {
      const { r, g, b } = hslToRgb(
        parseFloat(primaryHsl[0]),
        parseFloat(primaryHsl[1]),
        parseFloat(primaryHsl[2])
      );

      gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, `rgb(${r}, ${g}, ${b})`);
      gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.8)`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.6)`);
    }

    // Fallback colors if CSS variables aren't available
    const primaryColor = gradient || "hsl(221.2, 83.2%, 53.3%)";
    const mutedColor =
      mutedForegroundHsl.length >= 3
        ? `hsl(${mutedForegroundHsl.join(" ")})`
        : "hsl(215.4, 16.3%, 46.9%)";
    // const borderColor =
    //   borderHsl.length >= 3
    //     ? `hsl(${borderHsl.join(" ")})`
    //     : "hsl(214.3, 31.8%, 91.4%)";
    const textColor =
      foregroundHsl.length >= 3
        ? `hsl(${foregroundHsl.join(" ")})`
        : "hsl(222.2, 84%, 4.9%)";

    const config = {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Doanh thu (Đã điều chỉnh)",
            data: revenue,
            backgroundColor: primaryColor,
            borderColor: primaryColor,
            borderWidth: 0,
            borderRadius: {
              topLeft: 8,
              topRight: 8,
              bottomLeft: 0,
              bottomRight: 0,
            },
            barThickness: 20,
            maxBarThickness: 25,
            hoverBackgroundColor: primaryColor,
            hoverBorderColor: primaryColor,
            hoverBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          },
        },
        animation: {
          duration: 1000,
          easing: "easeOutQuart",
          delay: (context) => context.dataIndex * 50,
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            backgroundColor: `hsl(${
              getCSSVariable("--popover") || "0 0% 100%"
            })`,
            titleColor: textColor,
            bodyColor: textColor,
            borderColor: primaryColor,
            borderWidth: 1,
            cornerRadius: 12,
            displayColors: false,
            titleFont: {
              size: 14,
              weight: "600",
            },
            bodyFont: {
              size: 13,
              weight: "500",
            },
            padding: 12,
            callbacks: {
              title: function (context) {
                return context[0].label;
              },
              label: function (context) {
                const value = context.parsed.y;
                const monthIndex = context.dataIndex;

                // Show both original and adjusted values if there was an adjustment
                if (
                  originalData &&
                  originalData.revenue[monthIndex] > 0 &&
                  originalData.revenue[monthIndex] !== value
                ) {
                  const originalValue = originalData.revenue[monthIndex];
                  const originalFormatted =
                    originalValue >= 1000000
                      ? `${(originalValue / 1000000)
                          .toFixed(1)
                          .replace(".0", "")}M VNĐ`
                      : `${originalValue.toLocaleString("vi-VN")}VNĐ`;

                  const adjustedFormatted =
                    value >= 1000000
                      ? `${(value / 1000000).toFixed(1).replace(".0", "")}M VNĐ`
                      : `${value.toLocaleString("vi-VN")}VNĐ`;

                  return [
                    `Gốc: ${originalFormatted}`,
                    `Điều chỉnh: ${adjustedFormatted}`,
                  ];
                }

                // Show normal value if no adjustment
                if (value >= 1000000) {
                  return ` ${(value / 1000000)
                    .toFixed(1)
                    .replace(".0", "")}M VNĐ`;
                }
                return ` ${value.toLocaleString("vi-VN")}VNĐ`;
              },
            },
          },
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              color: mutedColor,
              font: {
                size: 12,
                weight: "500",
              },
              padding: 8,
            },
          },
          y: {
            display: true,
            position: "left",
            grid: {
              color:
                `hsl(${borderHsl.join(" ")})` || "rgba(107, 114, 128, 0.1)",
              lineWidth: 1,
              drawBorder: false,
            },
            border: {
              display: false,
            },
            ticks: {
              color: mutedColor,
              font: {
                size: 11,
                weight: "500",
              },
              padding: 12,
              maxTicksLimit: 8,
              callback: function (value) {
                if (value >= 1000) {
                  return (value / 1000).toFixed(1).replace(".0", "") + "M VNĐ";
                }
                return value.toLocaleString("vi-VN") + "K VNĐ";
              },
              stepSize: (function () {
                if (!revenue || revenue.length === 0) return 50;
                const maxValue = Math.max(...revenue);
                if (maxValue >= 50000000) return 10000000;
                if (maxValue >= 20000000) return 5000000;
                if (maxValue >= 1000000) return 500000;
                return 200000;
              })(),
            },
            beginAtZero: true,
          },
        },
      },
    };

    const chart = initializeChart(chartRef, chartInstance, config);

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartData, originalData, loading]);

  // Manual refresh function
  const handleRefresh = () => {
    fetchChartData();
  };

  // Loading state
  if (loading && !chartData) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center bg-card rounded-xl border">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-muted"></div>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent absolute top-0 left-0"></div>
          </div>
          <div className="text-primary font-medium">
            Đang tải dữ liệu biểu đồ...
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !chartData?.labels?.length) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center bg-card rounded-xl border border-destructive/20">
        <div className="text-center p-6">
          <div className="text-destructive text-2xl mb-3">⚠️</div>
          <div className="text-destructive mb-4 font-medium">{error}</div>
          <button
            onClick={handleRefresh}
            className="px-6 py-3 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            disabled={loading}
          >
            {loading ? "Đang thử lại..." : " Thử lại"}
          </button>
        </div>
      </div>
    );
  }

  // Calculate total revenue for display (using adjusted data)
  const totalRevenue =
    chartData?.revenue?.reduce((sum, value) => sum + value, 0) || 0;

  // Calculate original total for comparison
  const originalTotalRevenue =
    originalData?.revenue?.reduce((sum, value) => sum + value, 0) || 0;

  return (
    <div className="h-[400px] w-full relative bg-card rounded-xl shadow-lg border overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h3 className="text-base font-bold uppercase text-foreground">
              Revenue Stats
            </h3>
            <div className="flex items-center gap-4 text-sm font-semibold text-primary">
              {lastUpdated && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full "></span>
                  Updated: {lastUpdated.toLocaleTimeString("vi-VN")}
                </span>
              )}
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-primary">
                  Adjustment Total:{" "}
                  {totalRevenue >= 1000000
                    ? `${(totalRevenue / 1000000)
                        .toFixed(1)
                        .replace(".0", "")}M VNĐ`
                    : `${totalRevenue.toLocaleString("vi-VN")}K VNĐ`}
                </span>
              </div>
              <div>
                {originalTotalRevenue !== totalRevenue && (
                  <span className="font-semibold text-primary">
                    Origin Revenue:{" "}
                    {originalTotalRevenue >= 1000000
                      ? `${(originalTotalRevenue / 1000000)
                          .toFixed(1)
                          .replace(".0", "")}M VNĐ`
                      : `${originalTotalRevenue.toLocaleString("vi-VN")}K VNĐ`}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {loading && chartData && (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
            )}

            {showRefreshButton && (
              <button
                onClick={handleRefresh}
                className="p-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors duration-200 text-secondary-foreground"
                disabled={loading}
                title="Làm mới dữ liệu"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Chart container */}
        <div className="flex-1 relative bg-card/80 backdrop-blur-sm rounded-lg p-4 border">
          <canvas ref={chartRef} />
        </div>

        {/* Error indicator */}
        {error && chartData?.labels?.length > 0 && (
          <div className="absolute bottom-4 left-6 right-6 bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex items-center gap-2">
            <span className="text-destructive">⚠️</span>
            <span className="text-sm text-destructive font-medium">
              Fail load data: {error}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
