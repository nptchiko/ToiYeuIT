"use client";

import courseService from "../api/courseAPI";
import OrderHistoryPage from "../components/Course/course_oder_history/order-history-page";
import CourseForm from "../components/courseForm";
import {
  Search,
  Plus,
  BookOpen,
  Edit,
  EyeOff,
  ChevronDown,
  Grid,
  List,
  Package,
  TrendingDown,
  TrendingUp,
  Filter,
  X,
  Headphones,
  MessageSquare,
  Users,
  Clock,
  Star,
  DollarSign,
  CalendarIcon,
  Trash2,
  Eye,
  CheckCircle,
  History,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";

export default function CourseDashboard() {
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // state for API integration
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showOderHistory, setShowOderHistory] = useState(false);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await courseService.getAllCourses();
        console.log("egeg", data);
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
        setLoading(false);
      }
    };

    fetchCourses();
  }, [refreshTrigger]);

  // Lọc khóa học dựa trên tìm kiếm và bộ lọc
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Lọc theo từ khóa tìm kiếm
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.level.toLowerCase().includes(searchQuery.toLowerCase());

      // Lọc theo danh mục
      const matchesCategory =
        categoryFilter === "all" ||
        (categoryFilter === "LR" && course.type === "LR") ||
        (categoryFilter === "SW" && course.type === "SW");

      // Lọc theo cấp độ
      const matchesLevel =
        levelFilter === "all" ||
        (levelFilter === "basic" && course.level === "Cơ bản") ||
        (levelFilter === "intermediate" && course.level === "Trung cấp") ||
        (levelFilter === "advanced" && course.level === "Nâng cao");

      // Lọc theo trạng thái
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && course.enabled === true) ||
        (statusFilter === "hidden" && course.enabled === false);

      return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
    });
  }, [courses, searchQuery, categoryFilter, levelFilter, statusFilter]);

  // Xử lý click bên ngoài dropdown
  const handleClickOutside = (e) => {
    if (!e.target.closest(".category-dropdown")) {
      setShowCategoryDropdown(false);
    }
    if (!e.target.closest(".level-dropdown")) {
      setShowLevelDropdown(false);
    }
    if (!e.target.closest(".status-dropdown")) {
      setShowStatusDropdown(false);
    }
  };

  // Thêm event listener khi component được mount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Tính toán thống kê
  const stats = useMemo(() => {
    return {
      totalCourses: courses.length,
      totalStudents: courses.reduce(
        (sum, course) => sum + (course.students || 0),
        0
      ),
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

  // Handle course actions
  const handleEditCourse = (course) => {
    // Ensure numeric fields are properly formatted before passing to form
    setSelectedCourse({
      ...course,
      price:
        typeof course.price === "number"
          ? course.price
          : Number(course.price) || 0,
      duration:
        typeof course.duration === "number"
          ? course.duration
          : Number(course.duration) || 0,
    });
    setShowForm(true);
  };

  const handleAddCourse = () => {
    setSelectedCourse(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedCourse(null);
  };

  const handleFormSave = () => {
    setShowForm(false);
    setSelectedCourse(null);
    // Trigger a refresh to fetch updated data
    setRefreshTrigger((prev) => prev + 1);
  };

  // furction handle show History Modal
  const handleOpenOrderHistory = () => {
    setShowOderHistory(true);
  };
  const handleCloseOrderHistory = () => {
    setShowOderHistory(false);
  };

  const handleToggleVisibility = async (course) => {
    try {
      setLoading(true);
      await courseService.toggleCourseVisibility(course.id, !course.enabled);
      // Refresh the course list
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      console.error("Error toggling course visibility:", err);
      setError(err.message || "Error changing course visibility status");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        setLoading(true);
        await courseService.deleteCourse(courseId);
        // Refresh the course list
        setRefreshTrigger((prev) => prev + 1);
        setError(null);
      } catch (err) {
        console.error("Error deleting course:", err);
        setError("Error deleting course. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Format duration for display
  const formatDuration = (duration) => {
    if (!duration) return "No information";

    // If duration is already a string with format like "6 tuần", return it
    if (typeof duration === "string" && duration.includes(" ")) {
      return duration;
    }

    // Otherwise format the number
    const hours = Number(duration);
    if (isNaN(hours)) return "No information";

    if (hours < 24) {
      return `${hours} giờ`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days} ngày`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8  ">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Course Managerment
          </span>
        </h1>

        {/* Error message */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6">
            {error}
            <button
              onClick={() => setRefreshTrigger((prev) => prev + 1)}
              className="ml-2 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Thống kê */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Package className="h-6 w-6 text-primary" />}
            title="Total Courses"
            value={stats.totalCourses}
            trend={{ value: "9.05%", isUp: true }}
            color="blue"
            loading={loading}
          />
          <StatCard
            icon={<Users className="h-6 w-6 text-[hsl(var(--chart-4))]" />}
            title="Total Students"
            value={stats.totalStudents.toLocaleString()}
            trend={{ value: "12.3%", isUp: true }}
            color="purple"
            loading={loading}
          />
          <StatCard
            icon={<Star className="h-6 w-6 text-[hsl(var(--chart-1))]" />}
            title="Average Rating"
            value={stats.averageRating}
            trend={null}
            color="amber"
            loading={loading}
          />
        </div>

        {/* Thanh công cụ */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-1 gap-4 flex-wrap">
              {/* Dropdown Danh mục */}
              <div className="relative category-dropdown">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-secondary hover:bg-secondary/80 rounded-lg text-secondary-foreground font-medium transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  {categoryFilter === "all"
                    ? "All Courses"
                    : categoryFilter === "LR"
                    ? "Listening & Reading"
                    : "Speaking & Writing"}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {showCategoryDropdown && (
                  <div className="absolute left-0 mt-2 w-56 bg-card rounded-lg shadow-lg border border-border z-10 animate-fadeIn">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setCategoryFilter("all");
                          setShowCategoryDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/80"
                      >
                        All Courses
                      </button>
                      <button
                        onClick={() => {
                          setCategoryFilter("LR");
                          setShowCategoryDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/80 flex items-center"
                      >
                        <Headphones className="h-4 w-4 mr-2 text-primary" />
                        Listening & Reading
                      </button>
                      <button
                        onClick={() => {
                          setCategoryFilter("SW");
                          setShowCategoryDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/80 flex items-center"
                      >
                        <MessageSquare className="h-4 w-4 mr-2 text-[hsl(var(--chart-4))]" />
                        Speaking & Writing
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Dropdown Cấp độ */}
              <div className="relative level-dropdown">
                <button
                  onClick={() => setShowLevelDropdown(!showLevelDropdown)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-secondary hover:bg-secondary/80 rounded-lg text-secondary-foreground font-medium transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  {levelFilter === "all"
                    ? "All Levels"
                    : levelFilter === "basic"
                    ? "Basic"
                    : levelFilter === "intermediate"
                    ? "Intermediate"
                    : "Advanced"}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {showLevelDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border z-10 animate-fadeIn">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setLevelFilter("all");
                          setShowLevelDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/80"
                      >
                        All Levels
                      </button>
                      <button
                        onClick={() => {
                          setLevelFilter("basic");
                          setShowLevelDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/80"
                      >
                        Basic
                      </button>
                      <button
                        onClick={() => {
                          setLevelFilter("intermediate");
                          setShowLevelDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/80"
                      >
                        Intermediate
                      </button>
                      <button
                        onClick={() => {
                          setLevelFilter("advanced");
                          setShowLevelDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/80"
                      >
                        Advanced
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Tìm kiếm */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search TOEIC courses..."
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <button
              onClick={handleOpenOrderHistory}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <History className="h-4 w-4" /> Transaction History
            </button>
            {/* Nút tạo khóa học */}
            <button
              onClick={handleAddCourse}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="h-4 w-4" /> Create Course
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-card rounded-t-xl shadow-sm border border-border">
          <div className="border-b border-border">
            <div className="flex">
              <button
                onClick={() => setView("grid")}
                className={`px-6 py-4 font-medium text-sm flex items-center gap-2 ${
                  view === "grid"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid className="h-4 w-4" /> Cards
              </button>
              <button
                onClick={() => setView("list")}
                className={`px-6 py-4 font-medium text-sm flex items-center gap-2 ${
                  view === "list"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="h-4 w-4" /> List
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Loading state */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}

            {!loading && view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={{
                      ...course,
                      duration: formatDuration(course.duration),
                    }}
                    onEdit={() => handleEditCourse(course)}
                    onToggleVisibility={() => handleToggleVisibility(course)}
                    onDelete={() => handleDeleteCourse(course.id)}
                  />
                ))}

                {/* Thêm khóa học */}
                <div
                  onClick={handleAddCourse}
                  className="border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center h-[450px] cursor-pointer hover:bg-secondary/80 transition-colors group"
                >
                  <div className="flex flex-col items-center justify-center p-6">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-muted-foreground font-medium group-hover:text-foreground">
                      Create Course
                    </p>
                  </div>
                </div>
              </div>
            ) : !loading ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider rounded-tl-lg">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Students
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        State
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider rounded-tr-lg">
                        peration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {filteredCourses.map((course) => (
                      <tr key={course.id} className="hover:bg-secondary/80">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`h-10 w-10 flex-shrink-0 rounded-lg ${getColorClass(
                                course.color,
                                "bg"
                              )} flex items-center justify-center text-white font-bold`}
                            >
                              {course.type}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-foreground">
                                {course.title}
                              </div>
                              <div className="text-xs text-muted-foreground max-w-xs truncate">
                                {course.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              course.level === "Cơ bản"
                                ? "bg-[hsl(var(--chart-2))/20] text-[hsl(var(--chart-2))]"
                                : course.level === "Trung cấp"
                                ? "bg-primary/20 text-primary"
                                : "bg-[hsl(var(--chart-4))/20] text-[hsl(var(--chart-4))]"
                            }`}
                          >
                            {course.level}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          {formatDuration(course.duration)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-[hsl(var(--chart-1))] mr-1" />
                            <span className="text-sm text-foreground">
                              {course.rating}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          {course.students
                            ? course.students.toLocaleString()
                            : 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          {Number(course.price).toLocaleString("vi-VI")} VND
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              course.enabled
                                ? "bg-[hsl(var(--chart-2))/20] text-[hsl(var(--chart-2))]"
                                : "bg-destructive/20 text-destructive"
                            }`}
                          >
                            {course.enabled ? "Active" : "Hidden"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditCourse(course)}
                              className="text-primary hover:text-primary/80 p-1 rounded-full hover:bg-primary/10"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleToggleVisibility(course)}
                              className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-secondary/80"
                              title={
                                course.enabled ? "Hide Course" : "Show Course"
                              }
                            >
                              {course.enabled ? (
                                <Eye className="h-4 w-4" />
                              ) : (
                                <EyeOff className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course.id)}
                              className="p-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors"
                              title="Delete Course"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            {/* Không có kết quả */}
            {!loading && filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-1">
                  No courses found
                </h3>
                <p className="text-muted-foreground">
                  Try changing filters or search with different keywords
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Form Modal */}
      {showForm && (
        <CourseForm
          course={selectedCourse}
          onClose={handleFormClose}
          onSave={handleFormSave}
        />
      )}

      {showOderHistory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card  animate-scaleInbg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <button
                onClick={handleCloseOrderHistory}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-auto max-h-[calc(95vh-120px)]">
              <OrderHistoryPage />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Component thẻ thống kê
function StatCard({ icon, title, value, trend, color, loading }) {
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

// Component thẻ khóa học
function CourseCard({ course, onEdit, onToggleVisibility, onDelete }) {
  const getTagColor = (tag) => {
    const colors = {
      Popular: "bg-primary",
      Bestseller: "bg-[hsl(var(--chart-2))]",
      Premium: "bg-[hsl(var(--chart-4))]",
      New: "bg-[hsl(var(--chart-3))]",
      Recommended: "bg-[hsl(var(--chart-1))]",
      VIP: "bg-[hsl(var(--chart-5))]",
    };
    return colors[tag] || "bg-muted-foreground";
  };

  const getColorClass = (color, type) => {
    const classes = {
      blue: {
        bg: "bg-primary",
        light: "bg-primary/10",
        hover: "hover:bg-primary/20",
        text: "text-primary",
        border: "border-primary/20",
      },
      purple: {
        bg: "bg-[hsl(var(--chart-4))]",
        light: "bg-[hsl(var(--chart-4))/10]",
        hover: "hover:bg-[hsl(var(--chart-4))/20]",
        text: "text-[hsl(var(--chart-4))]",
        border: "border-[hsl(var(--chart-4))/20]",
      },
      amber: {
        bg: "bg-[hsl(var(--chart-1))]",
        light: "bg-[hsl(var(--chart-1))/10]",
        hover: "hover:bg-[hsl(var(--chart-1))/20]",
        text: "text-[hsl(var(--chart-1))]",
        border: "border-[hsl(var(--chart-1))/20]",
      },
    };
    return classes[color]?.[type] || classes.blue[type];
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-all animate-scaleIn">
      <div
        className={`relative h-32 ${getColorClass(
          course.color,
          "bg"
        )} flex items-center justify-center`}
      >
        {/* Tag */}
        {course.tag && (
          <div
            className={`absolute top-3 left-3 ${getTagColor(
              course.tag
            )} px-2 py-1 rounded-lg text-xs font-medium text-white`}
          >
            {course.tag}
          </div>
        )}

        {/* Level */}
        <div
          className={`absolute top-3 right-3 bg-background/90 px-2 py-1 rounded-lg text-xs font-medium ${
            course.level === "Cơ bản"
              ? "text-[hsl(var(--chart-2))]"
              : course.level === "Trung cấp"
              ? "text-primary"
              : "text-[hsl(var(--chart-4))]"
          }`}
        >
          {course.level}
        </div>

        {/* Status */}
        {!course.enabled && (
          <div className="absolute bottom-3 right-3 bg-destructive px-2 py-1 rounded-lg text-xs font-medium text-destructive-foreground">
            Hidden
          </div>
        )}

        <div className="text-white text-3xl font-bold flex flex-col items-center">
          {course.type === "LR" ? (
            <Headphones className="h-10 w-10 mb-2" />
          ) : (
            <MessageSquare className="h-10 w-10 mb-2" />
          )}
          {course.type}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-foreground mb-1">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
              <span>{course.duration || "No schedule"}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-[hsl(var(--chart-1))] mr-1" />
              <span className="font-medium">{course.rating || "0.0"}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-gray-400" />
              <span>
                {course.students ? course.students.toLocaleString() : 0}{" "}
                students
              </span>
            </div>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
            <span className="font-medium">
              {Number(course.price).toLocaleString("vi-VI")} VND
            </span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Key features:
          </p>
          <ul className="space-y-1">
            {course.features &&
              course.features.map((feature, index) => (
                <li key={index} className="flex items-start text-sm">
                  <CheckCircle className="h-4 w-4 mr-2 text-[hsl(var(--chart-2))] mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            {(!course.features || course.features.length === 0) && (
              <li className="text-sm text-muted-foreground">
                No key features available
              </li>
            )}
          </ul>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onEdit}
            className={`px-4 py-2 ${getColorClass(
              course.color,
              "light"
            )} ${getColorClass(course.color, "hover")} ${getColorClass(
              course.color,
              "text"
            )} rounded-lg font-medium text-sm transition-colors flex items-center`}
          >
            <Edit className="h-4 w-4 mr-1.5" /> Edit
          </button>
          <div className="flex gap-2">
            <button
              onClick={onToggleVisibility}
              className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-medium text-sm transition-colors flex items-center"
            >
              {course.enabled ? (
                <>
                  <EyeOff className="h-4 w-4 mr-1.5" /> Hide
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-1.5" /> Show
                </>
              )}
            </button>
            <button
              onClick={onDelete}
              className="p-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors"
              title="Delete course"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getColorClass(color, type) {
  const classes = {
    blue: {
      bg: "bg-primary",
      light: "bg-primary/10",
      hover: "hover:bg-primary/20",
      text: "text-primary",
      border: "border-primary/20",
    },
    purple: {
      bg: "bg-[hsl(var(--chart-4))]",
      light: "bg-[hsl(var(--chart-4))/10]",
      hover: "hover:bg-[hsl(var(--chart-4))/20]",
      text: "text-[hsl(var(--chart-4))]",
      border: "border-[hsl(var(--chart-4))/20]",
    },
    amber: {
      bg: "bg-[hsl(var(--chart-1))]",
      light: "bg-[hsl(var(--chart-1))/10]",
      hover: "hover:bg-[hsl(var(--chart-1))/20]",
      text: "text-[hsl(var(--chart-1))]",
      border: "border-[hsl(var(--chart-1))/20]",
    },
  };
  return classes[color]?.[type] || classes.blue[type];
}
