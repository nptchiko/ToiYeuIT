"use client";

import { getColorClass, getTagColor } from "../../utils/course-utils";
import {
  Edit,
  EyeOff,
  Eye,
  Trash2,
  Headphones,
  MessageSquare,
  Clock,
  CalendarIcon,
  Star,
  Users,
  DollarSign,
  CheckCircle,
} from "lucide-react";

export default function CourseCard({
  course,
  onEdit,
  onToggleVisibility,
  onDelete,
}) {
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
