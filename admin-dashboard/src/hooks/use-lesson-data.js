import { useState, useEffect, useCallback } from "react";
import { LessonAPI, CourseAPI } from "../api/lessonAPI";

export const useLessonData = () => {
  const [lessons, setLessons] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [lessonToDuplicate, setLessonToDuplicate] = useState(null);

  const loadLessons = useCallback(async () => {
    try {
      setLoading(true);
      const response = await LessonAPI.getAllLessons(
        1,
        50,
        selectedCourse || null,
      );
      setLessons(response.body || []);
      setError(null);
    } catch (err) {
      setError("Failed to load lessons");
      console.error("Error loading lessons:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedCourse]);

  const loadCourses = async () => {
    try {
      const response = await CourseAPI.getAllCourses();
      setCourses(response.body || []);
    } catch (err) {
      console.error("Error loading courses:", err);
    }
  };

  useEffect(() => {
    loadLessons();
    loadCourses();
  }, [loadLessons]);

  const handleCreateLesson = () => {
    setSelectedLesson(null);
    setShowForm(true);
  };

  const handleEditLesson = (lesson) => {
    setSelectedLesson(lesson);
    setShowForm(true);
  };

  const handleDeleteLesson = async (lessonId) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      try {
        await LessonAPI.deleteLesson(lessonId);
        await loadLessons();
        alert("Lesson deleted successfully!");
      } catch (error) {
        console.error("Error deleting lesson:", error);
        alert("Failed to delete lesson.");
      }
    }
  };

  const handleDuplicateLesson = (lesson) => {
    setLessonToDuplicate(lesson);
    setShowDuplicateModal(true);
  };

  const handleConfirmDuplicate = async (lessonId, targetCourseId) => {
    try {
      await LessonAPI.duplicateLesson(lessonId, targetCourseId);
      await loadLessons();
      alert("Lesson duplicated successfully!");
      handleCloseDuplicateModal();
    } catch (error) {
      console.error("Error duplicating lesson:", error);
      alert("Failed to duplicate lesson.");
      throw error; // Rethrow to be caught by modal's submit handler
    }
  };

  const handleViewLesson = (lesson) => {
    setSelectedLesson(lesson);
    console.log("Viewing lesson:", lesson);
    // Implement view modal logic here if needed
  };

  const handleSaveLesson = async (lessonData) => {
    try {
      if (selectedLesson) {
        await LessonAPI.updateLesson(selectedLesson.id, lessonData);
      } else {
        await LessonAPI.createLesson(lessonData);
      }
      setShowForm(false);
      await loadLessons();
      alert(selectedLesson ? "Lesson updated!" : "Lesson created!");
    } catch (error) {
      console.error("Error saving lesson:", error);
      alert("Error saving lesson. Please try again.");
      throw error; // Rethrow to be caught by form's submit handler
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedLesson(null);
  };

  const handleCloseDuplicateModal = () => {
    setShowDuplicateModal(false);
    setLessonToDuplicate(null);
  };

  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return {
    lessons,
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
  };
};
