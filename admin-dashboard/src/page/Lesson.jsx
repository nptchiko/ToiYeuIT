import DuplicateModal from "../components/Lesson/DuplicateModal";
import LessonCard from "../components/Lesson/LessonCard";
import LessonForm from "../components/Lesson/LessonForm";
import { useLessonData } from "../hooks/use-lesson-data";
import {
  Search,
  Plus,
  BookOpen,
  Grid,
  List,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";
import React, { useState, useEffect } from "react";

export default function Lesson() {
  const {
    courses,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCourse,
    setSelectedCourse,
    showForm,
    selectedLesson,
    showDuplicateModal,
    lessonToDuplicate,
    filteredLessons,
    loadLessons,
    handleCreateLesson,
    handleEditLesson,
    handleDeleteLesson,
    handleDuplicateLesson,
    handleConfirmDuplicate,
    handleViewLesson,
    handleSaveLesson,
    handleCloseForm,
    handleCloseDuplicateModal,
  } = useLessonData();

  const [viewType, setViewType] = useState("grid");
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".course-dropdown")) {
        setShowCourseDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const selectedCourseName = selectedCourse
    ? courses.find((c) => c.id === parseInt(selectedCourse))?.title ||
      "All Courses"
    : "All Courses";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lessons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-800 font-medium mb-2">
            Failed to load lessons
          </p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadLessons}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            Lesson Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage lessons, grammar content, and quizzes
          </p>
        </div>
        <button
          onClick={handleCreateLesson}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5" />
          Create Lesson
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Course Filter */}
            <div className="relative course-dropdown">
              <button
                onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-48 justify-between"
              >
                <span className="text-gray-700">{selectedCourseName}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {showCourseDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => {
                      setSelectedCourse("");
                      setShowCourseDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                      !selectedCourse
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    All Courses
                  </button>
                  {courses.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => {
                        setSelectedCourse(course.id.toString());
                        setShowCourseDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                        selectedCourse === course.id.toString()
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {course.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewType("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewType === "grid"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewType("list")}
              className={`p-2 rounded-md transition-colors ${
                viewType === "list"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          {filteredLessons.length} lesson
          {filteredLessons.length !== 1 ? "s" : ""} found
          {selectedCourse && ` in ${selectedCourseName}`}
        </p>
        {filteredLessons.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ArrowUpDown className="h-4 w-4" />
            Sorted by order index
          </div>
        )}
      </div>

      {/* Lessons Grid/List */}
      {filteredLessons.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <BookOpen className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No lessons found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery || selectedCourse
              ? "Try adjusting your search criteria or filters"
              : "Get started by creating your first lesson"}
          </p>
          <button
            onClick={handleCreateLesson}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Create Your First Lesson
          </button>
        </div>
      ) : (
        <div
          className={
            viewType === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredLessons
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                onEdit={handleEditLesson}
                onDelete={handleDeleteLesson}
                onDuplicate={handleDuplicateLesson}
                onView={handleViewLesson}
              />
            ))}
        </div>
      )}

      {/* Modals */}
      {showForm && (
        <LessonForm
          lesson={selectedLesson}
          courses={courses}
          onClose={handleCloseForm}
          onSave={handleSaveLesson}
          isCreating={!selectedLesson}
        />
      )}

      {showDuplicateModal && lessonToDuplicate && (
        <DuplicateModal
          lesson={lessonToDuplicate}
          courses={courses}
          onClose={handleCloseDuplicateModal}
          onConfirm={handleConfirmDuplicate}
        />
      )}
    </div>
  );
}
