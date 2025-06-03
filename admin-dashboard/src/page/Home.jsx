import courseService from "../api/courseAPI";
import { userService } from "../api/usersAPI";
import { AreaChart } from "../components/area-chart";
import { BarChart } from "../components/bar-chart";
import { LineChart } from "../components/line-chart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Users, Package, Calendar } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

export default function Home() {
  const [currentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [courses, setCourses] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [revenueLoading, setRevenueLoading] = useState(true);
  const [refreshTrigger] = useState(0);

  // Get all users
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getUsers(currentPage, pageSize);
        console.log("User response:", response);
        if (response) {
          const users = response.pagination.totalItems;
          setUserCount(users);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user count:", error);
        setError(true);
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [currentPage, pageSize]);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const data = await courseService.getAllCourses();
        console.log("Course data:", data);
        if (Array.isArray(data)) {
          // Ensure numeric fields are properly formatted
          const formattedData = data.map((course) => ({
            ...course,
            price:
              typeof course.price === "number"
                ? course.price
                : Number(course.price) || 0,
            duration:
              typeof course.duration === "number"
                ? course.duration
                : Number(course.duration) || 0,
            students:
              typeof course.students === "number"
                ? course.students
                : Number(course.students) || 0,
            rating:
              typeof course.rating === "number"
                ? course.rating
                : Number(course.rating) || 0,
          }));
          setCourses(formattedData);
          setError(null);
        } else {
          setCourses([]);
          setError("Invalid data from API");
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Unable to load course data. Please try again later.");
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [refreshTrigger]);

  // Fetch revenue data
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        setRevenueLoading(true);
        const response = await courseService.revenueCourse();
        console.log("Revenue response:", response);

        // Check if response has data structure based on API documentation
        if (response && response.data) {
          // Assuming the API returns revenue data in response.data.body or similar
          const revenueData = response.data.body || response.data;

          // If revenue is a number, use it directly
          if (typeof revenueData === "number") {
            setRevenue(revenueData);
          }
          // If revenue is an object with revenue property
          else if (revenueData && typeof revenueData.revenue === "number") {
            setRevenue(revenueData.revenue);
          }
          // If revenue is an object with total property
          else if (revenueData && typeof revenueData.total === "number") {
            setRevenue(revenueData.total);
          } else {
            console.warn("Unexpected revenue data format:", revenueData);
            setRevenue(0);
          }
        } else {
          setRevenue(0);
        }
      } catch (error) {
        console.error("Error fetching revenue:", error);
        setRevenue(0);
      } finally {
        setRevenueLoading(false);
      }
    };

    fetchRevenue();
  }, [refreshTrigger]);

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      totalCourses: courses.length,
      averageRating: courses.length
        ? (
            courses.reduce(
              (sum, course) => sum + Number.parseFloat(course.rating || 0),
              0
            ) / courses.length
          ).toFixed(1)
        : "0.0",
    };
  }, [courses]);

  // Format revenue for display
  const formatRevenue = (amount) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Total Users Card */}
        <Card className="border border-border shadow-none hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-secondary p-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-foreground">
                <h3 className="text-3xl font-bold mr-2 text-foreground">
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  ) : error ? (
                    "Error"
                  ) : (
                    userCount.toLocaleString()
                  )}
                </h3>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                <span>+</span>
                <span>11.01%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Courses Card */}
        <Card className="border border-border shadow-none hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-secondary p-2">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Courses
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-foreground">
                {stats.totalCourses}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Revenue Card - Updated with API data */}
        <Card className="border border-border shadow-none hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-secondary p-2">
                <svg
                  className="h-5 w-5 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2V6M6 6H18L19 12L18 18H6L5 12L6 6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 10V14M12 10V14M16 10V14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue (VND)
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-foreground">
                {revenueLoading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                ) : (
                  formatRevenue(revenue)
                )}
              </div>
              <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                <span>+</span>
                <span>12.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border border-border shadow-none hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-base font-medium text-foreground">
              Revenue Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>

        <Card className="border border-border shadow-none hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-base font-medium text-foreground">
              Users Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart />
          </CardContent>
        </Card>
      </div>

      {/* Statistics Section */}
      <div className="mt-6">
        <Card className="border border-border shadow-none hover:shadow-md transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium text-foreground">
              Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
