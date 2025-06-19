import React, { useState } from "react";
import { X, Copy } from "lucide-react";

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

export default DuplicateModal;
