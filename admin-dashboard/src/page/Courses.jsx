import { VIEW_TYPES } from "../Constants/course-constants";
import courseService from "../api/courseAPI";
import CourseCard from "../components/Course/CourseCard";
import CourseTable from "../components/Course/CourseTable";
import FilterDropdowns from "../components/Course/FilterDropdown";
import CourseForm from "../components/Course/Form/courseForm";
import StatCard from "../components/Course/StatCard";
import OrderHistoryPage from "../components/Course/course_oder_history/order-history-page";
import { useCourseDashboard } from "../hooks/use-course-dashboard";
import { formatDuration } from "../utils/course-utils";
import {
  Search,
  Plus,
  BookOpen,
  Grid,
  List,
  Package,
  Users,
  Star,
  History,
  X,
  Import,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function CourseDashboard() {
  const [view, setView] = useState(VIEW_TYPES.GRID);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showOderHistory, setShowOderHistory] = useState(false);

  const {
    filteredCourses,
    loading,
    error,
    stats,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    levelFilter,
    setLevelFilter,
    statusFilter,
    setStatusFilter,
    refreshCourses,
  } = useCourseDashboard();

  // Handle click outside dropdown
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Course action handlers
  const handleEditCourse = (course) => {
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
    refreshCourses();
  };

  const handleOpenOrderHistory = () => {
    setShowOderHistory(true);
  };

  const handleCloseOrderHistory = () => {
    setShowOderHistory(false);
  };

  const handleToggleVisibility = async (course) => {
    try {
      await courseService.toggleCourseVisibility(course.id, !course.enabled);
      refreshCourses();
    } catch (err) {
      console.error("Error toggling course visibility:", err);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await courseService.deleteCourse(courseId);
        refreshCourses();
      } catch (err) {
        console.error("Error deleting course:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Course Management
          </span>
        </h1>

        {/* Error message */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6">
            {error}
            <button onClick={refreshCourses} className="ml-2 underline">
              Try again
            </button>
          </div>
        )}

        {/* Statistics */}
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

        {/* Toolbar */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-1 gap-4 flex-wrap">
              <FilterDropdowns
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                levelFilter={levelFilter}
                setLevelFilter={setLevelFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                showCategoryDropdown={showCategoryDropdown}
                setShowCategoryDropdown={setShowCategoryDropdown}
                showLevelDropdown={showLevelDropdown}
                setShowLevelDropdown={setShowLevelDropdown}
                showStatusDropdown={showStatusDropdown}
                setShowStatusDropdown={setShowStatusDropdown}
              />

              {/* Search */}
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
                onClick={() => setView(VIEW_TYPES.GRID)}
                className={`px-6 py-4 font-medium text-sm flex items-center gap-2 ${
                  view === VIEW_TYPES.GRID
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid className="h-4 w-4" /> Cards
              </button>
              <button
                onClick={() => setView(VIEW_TYPES.LIST)}
                className={`px-6 py-4 font-medium text-sm flex items-center gap-2 ${
                  view === VIEW_TYPES.LIST
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

            {!loading && view === VIEW_TYPES.GRID ? (
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

                {/* Add course card */}
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
              // List view would go here - keeping original table structure
              <CourseTable
                courses={filteredCourses.map((course) => ({
                  ...course,
                  duration: formatDuration(course.duration),
                }))}
                onEdit={handleEditCourse}
                onToggleVisibility={handleToggleVisibility}
                onDelete={handleDeleteCourse}
              />
            ) : null}

            {/* No results */}
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

      {/* Modals */}
      {showForm && (
        <CourseForm
          course={selectedCourse}
          onClose={handleFormClose}
          onSave={handleFormSave}
        />
      )}

      {showOderHistory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card animate-scaleIn bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <button
                onClick={handleCloseOrderHistory}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(95vh-120px)]">
              <OrderHistoryPage />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
