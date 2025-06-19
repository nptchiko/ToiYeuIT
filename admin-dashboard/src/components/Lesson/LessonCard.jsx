import React from "react";
import {
  BookOpen,
  Edit,
  Trash2,
  Eye,
  Copy,
  Video,
  FileText,
  GraduationCap,
} from "lucide-react";

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
          {/* Course: {lesson.courseName || "Unknown"} */}
        </span>
        <div className="flex items-center gap-2">
          {/* <button */}
          {/*   onClick={() => onView(lesson)} */}
          {/*   className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" */}
          {/*   title="View Details" */}
          {/* > */}
          {/*   <Eye className="h-4 w-4" /> */}
          {/* </button> */}
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

export default LessonCard;
