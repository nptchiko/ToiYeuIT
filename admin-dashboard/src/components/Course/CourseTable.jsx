"use client";

import { getColorClass, formatDuration } from "../../utils/course-utils";
import {
  Edit,
  EyeOff,
  Eye,
  Trash2,
  Star,
  Headphones,
  MessageSquare,
} from "lucide-react";

export default function CourseTable({
  courses,
  onEdit,
  onToggleVisibility,
  onDelete,
}) {
  return (
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
              Operation
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-card">
          {courses.map((course) => (
            <tr key={course.id} className="hover:bg-secondary/80">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div
                    className={`h-10 w-10 flex-shrink-0 rounded-lg ${getColorClass(
                      course.color,
                      "bg"
                    )} flex items-center justify-center text-white font-bold`}
                  >
                    {course.type === "LR" ? (
                      <Headphones className="h-5 w-5" />
                    ) : (
                      <MessageSquare className="h-5 w-5" />
                    )}
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
                {course.students ? course.students.toLocaleString() : 0}
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
                    onClick={() => onEdit(course)}
                    className="text-primary hover:text-primary/80 p-1 rounded-full hover:bg-primary/10"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onToggleVisibility(course)}
                    className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-secondary/80"
                    title={course.enabled ? "Hide Course" : "Show Course"}
                  >
                    {course.enabled ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => onDelete(course.id)}
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
  );
}
