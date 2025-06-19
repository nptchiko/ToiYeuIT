import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  BookOpen,
  Grid,
  List,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  ArrowUpDown,
  ChevronDown,
  X,
  Save,
  Video,
  FileText,
  GraduationCap,
  // Quiz,
  CheckCircle,
  Circle,
} from "lucide-react";
import { TokenService } from "../services/auth-service";
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Lesson API service
const LessonAPI = {
  getAllLessons: async (page = 1, size = 10, courseId = null) => {
    try {
      let url = `/admin/lessons?page=${page}&size=${size}`;
      if (courseId) {
        url += `&courseId=${courseId}`;
      }
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching lessons:", error);
      throw error;
    }
  },

  getLessonById: async (lessonId) => {
    try {
      const response = await api.get(`/admin/lessons/${lessonId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching lesson:", error);
      throw error;
    }
  },

  createLesson: async (lessonData) => {
    try {
      const response = await api.post("/admin/lessons", lessonData);
      return response.data;
    } catch (error) {
      console.error("Error creating lesson:", error);
      throw error;
    }
  },

  updateLesson: async (lessonId, lessonData) => {
    try {
      const response = await api.put(`/admin/lessons/${lessonId}`, lessonData);
      return response.data;
    } catch (error) {
      console.error("Error updating lesson:", error);
      throw error;
    }
  },

  deleteLesson: async (lessonId) => {
    try {
      const response = await api.delete(`/admin/lessons/${lessonId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting lesson:", error);
      throw error;
    }
  },

  reorderLessons: async (courseId, lessonIds) => {
    try {
      const response = await api.put(
        `/admin/lessons/course/${courseId}/reorder`,
        lessonIds,
      );
      return response.data;
    } catch (error) {
      console.error("Error reordering lessons:", error);
      throw error;
    }
  },

  duplicateLesson: async (lessonId, targetCourseId) => {
    try {
      const response = await api.post(
        `/admin/lessons/${lessonId}/duplicate?targetCourseId=${targetCourseId}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error duplicating lesson:", error);
      throw error;
    }
  },
};

// Course API for getting courses list
const CourseAPI = {
  getAllCourses: async () => {
    try {
      const response = await api.get("/admin/courses");
      return response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },
};

// Lesson Card Component
const LessonCard = ({ lesson, onEdit, onDelete, onDuplicate, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">
            {lesson.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {lesson.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              Order: {lesson.orderIndex}
            </span>
            {lesson.hasGrammar && (
              <span className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                Grammar
              </span>
            )}
            {lesson.quizCount > 0 && (
              <span className="flex items-center gap-1">
                {/* <Quiz className="h-4 w-4" /> */}
                {/* {lesson.quizCount} Quiz{lesson.quizCount > 1 ? "es" : ""} */}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {lesson.videoUrl && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            <Video className="h-3 w-3" />
            Video
          </span>
        )}
        {lesson.materialsUrl && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            <FileText className="h-3 w-3" />
            Materials
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-500">
          Course: {lesson.courseName || "Unknown"}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView(lesson)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(lesson)}
            className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDuplicate(lesson)}
            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Duplicate"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(lesson.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Lesson Form Component
const LessonForm = ({ lesson, courses, onClose, onSave, isCreating }) => {
  const [formData, setFormData] = useState({
    title: lesson?.title || "",
    description: lesson?.description || "",
    courseId: lesson?.courseId || "",
    orderIndex: lesson?.orderIndex || 1,
    videoUrl: lesson?.videoUrl || "",
    materialsUrl: lesson?.materialsUrl || "",
    grammar: lesson?.grammar || null,
  });

  const [showGrammar, setShowGrammar] = useState(!!lesson?.grammar);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSubmit = {
        ...formData,
        courseId: parseInt(formData.courseId),
        orderIndex: parseInt(formData.orderIndex),
        grammar: showGrammar ? formData.grammar : null,
      };

      if (isCreating) {
        await LessonAPI.createLesson(dataToSubmit);
      } else {
        await LessonAPI.updateLesson(lesson.id, dataToSubmit);
      }

      onSave();
    } catch (error) {
      console.error("Error saving lesson:", error);
      alert("Error saving lesson. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addQuiz = () => {
    const newGrammar = formData.grammar || {
      title: "",
      content: "",
      quizzes: [],
    };
    newGrammar.quizzes = newGrammar.quizzes || [];
    newGrammar.quizzes.push({
      questionText: "",
      orderIndex: newGrammar.quizzes.length + 1,
      options: [
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
      ],
    });
    setFormData({ ...formData, grammar: newGrammar });
  };

  const removeQuiz = (quizIndex) => {
    const newGrammar = { ...formData.grammar };
    newGrammar.quizzes.splice(quizIndex, 1);
    setFormData({ ...formData, grammar: newGrammar });
  };

  const updateQuiz = (quizIndex, field, value) => {
    const newGrammar = { ...formData.grammar };
    newGrammar.quizzes[quizIndex][field] = value;
    setFormData({ ...formData, grammar: newGrammar });
  };

  const addOption = (quizIndex) => {
    const newGrammar = { ...formData.grammar };
    newGrammar.quizzes[quizIndex].options.push({
      optionText: "",
      isCorrect: false,
    });
    setFormData({ ...formData, grammar: newGrammar });
  };

  const removeOption = (quizIndex, optionIndex) => {
    const newGrammar = { ...formData.grammar };
    newGrammar.quizzes[quizIndex].options.splice(optionIndex, 1);
    setFormData({ ...formData, grammar: newGrammar });
  };

  const updateOption = (quizIndex, optionIndex, field, value) => {
    const newGrammar = { ...formData.grammar };
    newGrammar.quizzes[quizIndex].options[optionIndex][field] = value;
    setFormData({ ...formData, grammar: newGrammar });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {isCreating ? "Create New Lesson" : "Edit Lesson"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-auto max-h-[calc(95vh-120px)]"
        >
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter lesson title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course *
                </label>
                <select
                  required
                  value={formData.courseId}
                  onChange={(e) =>
                    setFormData({ ...formData, courseId: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter lesson description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Index *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.orderIndex}
                  onChange={(e) =>
                    setFormData({ ...formData, orderIndex: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Materials URL
                </label>
                <input
                  type="url"
                  value={formData.materialsUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, materialsUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Grammar Section */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Grammar Content
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setShowGrammar(!showGrammar);
                    if (!showGrammar && !formData.grammar) {
                      setFormData({
                        ...formData,
                        grammar: { title: "", content: "", quizzes: [] },
                      });
                    }
                  }}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {showGrammar ? "Remove Grammar" : "Add Grammar"}
                </button>
              </div>

              {showGrammar && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grammar Title *
                    </label>
                    <input
                      type="text"
                      required={showGrammar}
                      value={formData.grammar?.title || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          grammar: {
                            ...formData.grammar,
                            title: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter grammar title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grammar Content *
                    </label>
                    <textarea
                      required={showGrammar}
                      value={formData.grammar?.content || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          grammar: {
                            ...formData.grammar,
                            content: e.target.value,
                          },
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter grammar content"
                    />
                  </div>

                  {/* Quizzes */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-md font-medium text-gray-900">
                        Quizzes
                      </h4>
                      <button
                        type="button"
                        onClick={addQuiz}
                        className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors"
                      >
                        Add Quiz
                      </button>
                    </div>

                    {formData.grammar?.quizzes?.map((quiz, quizIndex) => (
                      <div
                        key={quizIndex}
                        className="border border-gray-200 rounded-lg p-4 mb-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium text-gray-900">
                            Quiz {quizIndex + 1}
                          </h5>
                          <button
                            type="button"
                            onClick={() => removeQuiz(quizIndex)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Question Text *
                            </label>
                            <input
                              type="text"
                              required
                              value={quiz.questionText}
                              onChange={(e) =>
                                updateQuiz(
                                  quizIndex,
                                  "questionText",
                                  e.target.value,
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter question"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Order *
                            </label>
                            <input
                              type="number"
                              required
                              min="1"
                              value={quiz.orderIndex}
                              onChange={(e) =>
                                updateQuiz(
                                  quizIndex,
                                  "orderIndex",
                                  parseInt(e.target.value),
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        {/* Options */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Options
                            </label>
                            <button
                              type="button"
                              onClick={() => addOption(quizIndex)}
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              Add Option
                            </button>
                          </div>
                          {quiz.options?.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className="flex items-center gap-3 mb-2"
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  updateOption(
                                    quizIndex,
                                    optionIndex,
                                    "isCorrect",
                                    !option.isCorrect,
                                  )
                                }
                                className={`flex-shrink-0 ${
                                  option.isCorrect
                                    ? "text-green-600"
                                    : "text-gray-400"
                                }`}
                              >
                                {option.isCorrect ? (
                                  <CheckCircle className="h-5 w-5" />
                                ) : (
                                  <Circle className="h-5 w-5" />
                                )}
                              </button>
                              <input
                                type="text"
                                required
                                value={option.optionText}
                                onChange={(e) =>
                                  updateOption(
                                    quizIndex,
                                    optionIndex,
                                    "optionText",
                                    e.target.value,
                                  )
                                }
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter option text"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  removeOption(quizIndex, optionIndex)
                                }
                                className="flex-shrink-0 text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Lesson
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Duplicate Lesson Modal
const DuplicateModal = ({ lesson, courses, onClose, onConfirm }) => {
  const [targetCourseId, setTargetCourseId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!targetCourseId) return;

    setLoading(true);
    try {
      await onConfirm(lesson.id, parseInt(targetCourseId));
      onClose();
    } catch (error) {
      console.error("Error duplicating lesson:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Duplicate Lesson</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-gray-600 mb-4">
            Duplicate "{lesson?.title}" to another course:
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Course *
            </label>
            <select
              required
              value={targetCourseId}
              onChange={(e) => setTargetCourseId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select target course</option>
              {courses
                .filter((course) => course.id !== lesson?.courseId)
                .map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !targetCourseId}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Duplicating...
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Duplicate
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Lesson Component
export default function Lesson() {
  const [lessons, setLessons] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [viewType, setViewType] = useState("grid");
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [lessonToDuplicate, setLessonToDuplicate] = useState(null);

  // Load initial data
  useEffect(() => {
    loadLessons();
    loadCourses();
  }, [selectedCourse]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".course-dropdown")) {
        setShowCourseDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const loadLessons = async () => {
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
  };

  const loadCourses = async () => {
    try {
      const response = await CourseAPI.getAllCourses();
      setCourses(response.body || []);
    } catch (err) {
      console.error("Error loading courses:", err);
    }
  };

  // Filter lessons based on search query
  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Event handlers
  const handleCreateLesson = () => {
    setSelectedLesson(null);
    setShowForm(true);
  };

  const handleEditLesson = (lesson) => {
    setSelectedLesson(lesson);
    setShowForm(true);
  };

  const handleDeleteLesson = async (lessonId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this lesson? This action cannot be undone.",
      )
    ) {
      try {
        await LessonAPI.deleteLesson(lessonId);
        await loadLessons();
        alert("Lesson deleted successfully!");
      } catch (error) {
        console.error("Error deleting lesson:", error);
        alert("Failed to delete lesson. Please try again.");
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
    } catch (error) {
      console.error("Error duplicating lesson:", error);
      alert("Failed to duplicate lesson. Please try again.");
      throw error;
    }
  };

  const handleViewLesson = (lesson) => {
    setSelectedLesson(lesson);
    // You might want to implement a view modal here
    console.log("Viewing lesson:", lesson);
  };

  const handleSaveLesson = async () => {
    setShowForm(false);
    await loadLessons();
    alert(
      selectedLesson
        ? "Lesson updated successfully!"
        : "Lesson created successfully!",
    );
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedLesson(null);
  };

  const handleCloseDuplicateModal = () => {
    setShowDuplicateModal(false);
    setLessonToDuplicate(null);
  };

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
          <h1 className="text-3xl font-bold text-gray-900">
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
