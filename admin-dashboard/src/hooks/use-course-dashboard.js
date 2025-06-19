import { FILTER_TYPES } from "../Constants/course-constants";
import courseService from "../api/courseAPI";
import { formatCourseData } from "../utils/course-utils";
import { useUsersData } from "./use-users-data";
import { useState, useEffect, useMemo } from "react";

export const useCourseDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { stats: userStats } = useUsersData();
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(FILTER_TYPES.ALL);
  const [levelFilter, setLevelFilter] = useState(FILTER_TYPES.ALL);
  const [statusFilter, setStatusFilter] = useState(FILTER_TYPES.ALL);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await courseService.getAllCourses();
        console.log("jiihi", data);
        if (Array.isArray(data)) {
          const formattedData = formatCourseData(data);
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

  // Filter courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.level.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === FILTER_TYPES.ALL ||
        (categoryFilter === FILTER_TYPES.LR && course.type === "LR") ||
        (categoryFilter === FILTER_TYPES.SW && course.type === "SW");

      const matchesLevel =
        levelFilter === FILTER_TYPES.ALL ||
        (levelFilter === FILTER_TYPES.BASIC && course.level === "Cơ bản") ||
        (levelFilter === FILTER_TYPES.INTERMEDIATE &&
          course.level === "Trung cấp") ||
        (levelFilter === FILTER_TYPES.ADVANCED && course.level === "Nâng cao");

      const matchesStatus =
        statusFilter === FILTER_TYPES.ALL ||
        (statusFilter === FILTER_TYPES.ACTIVE && course.enabled === true) ||
        (statusFilter === FILTER_TYPES.HIDDEN && course.enabled === false);

      return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
    });
  }, [courses, searchQuery, categoryFilter, levelFilter, statusFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      totalCourses: courses.length,
      // Sử dụng totalStudents từ userStats thay vì tính từ courses
      totalStudents: userStats?.totalStudents || 0,
      averageRating: courses.length
        ? (
            courses.reduce(
              (sum, course) => sum + Number.parseFloat(course.rating || 0),
              0
            ) / courses.length
          ).toFixed(1)
        : "0.0",
    };
  }, [courses, userStats]);

  const refreshCourses = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return {
    courses,
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
  };
};
