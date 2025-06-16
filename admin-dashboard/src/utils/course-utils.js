import { COURSE_COLORS } from "../Constants/course-constants";

export const formatDuration = (duration) => {
  if (!duration) return "No information";

  if (typeof duration === "string" && duration.includes(" ")) {
    return duration;
  }

  const hours = Number(duration);
  if (isNaN(hours)) return "No information";

  if (hours < 24) {
    return `${hours} giờ`;
  } else {
    const days = Math.floor(hours / 24);
    return `${days} ngày`;
  }
};

export const getColorClass = (color, type) => {
  return COURSE_COLORS[color]?.[type] || COURSE_COLORS.blue[type];
};

export const getTagColor = (tag) => {
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

export const formatCourseData = (courses) => {
  return courses.map((course) => ({
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
};
