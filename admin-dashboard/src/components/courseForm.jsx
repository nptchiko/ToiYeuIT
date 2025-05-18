"use client";

import courseService from "../api/courseAPI";
import { X, Info, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function CourseForm({ course = null, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "Basic",
    duration: 0,
    price: 0,
    type: "LR",
    tag: "",
    enabled: true,
    // Additional fields for UI only
    features: ["", "", ""],
    color: "blue",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [activeTab, setActiveTab] = useState("basic"); // For visual grouping only

  useEffect(() => {
    if (course) {
      setFormData({
        ...course,
        // Ensure numeric values are properly set
        duration: course.duration || 0,
        price: course.price || 0,
        // UI fields
        features: course.features || ["", "", ""],
        color: course.color || "blue",
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price" || name === "duration") {
      const numValue =
        name === "price"
          ? Number.parseFloat(value.replace(/[^\d]/g, ""))
          : Number.parseInt(value, 10);

      setFormData((prev) => ({
        ...prev,
        [name]: isNaN(numValue) ? 0 : numValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Prepare data according to API requirements
      const apiData = {
        title: formData.title,
        description: formData.description,
        level: formData.level,
        duration: formData.duration,
        price: formData.price,
        type: formData.type,
        tag: formData.tag,
        enabled: formData.enabled,
      };

      if (course) {
        // Update existing course
        await courseService.updateCourse(course.id, apiData);
      } else {
        // Create new course
        const createData = {
          ...apiData,
          features: formData.features.filter(
            (feature) => feature.trim() !== ""
          ),
          color: formData.color,
        };
        await courseService.createCourse(createData);
      }

      onSave();
    } catch (err) {
      setError(
        err.message ||
          "An error occurred while saving the course. Please try again."
      );
      console.error("Error saving course:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get color class
  const getColorClass = (color) => {
    const classes = {
      blue: "bg-primary text-primary-foreground",
      purple: "bg-[hsl(var(--chart-4))] text-white",
      amber: "bg-[hsl(var(--chart-1))] text-white",
    };
    return classes[color] || classes.blue;
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn backdrop-blur-sm">
      <div className="bg-card rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-scaleIn">
        {/* Header with color preview */}
        <div className={`p-6 ${getColorClass(formData.color)}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {course ? "Edit Course" : "Create New Course"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-1 text-sm opacity-90">
            {course
              ? "Update the details of your existing course"
              : "Fill in the details to create a new course"}
          </p>
        </div>

        {/* Form content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg mb-6 flex items-start">
              <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <span className="text-xs font-bold">1</span>
                </div>
                <h3 className="text-lg font-medium text-foreground">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">
                    Course Title <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                    required
                    placeholder="Enter a descriptive title for your course"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">
                    Description <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                    required
                    placeholder="Provide a detailed description of what students will learn"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <span className="text-xs font-bold">2</span>
                </div>
                <h3 className="text-lg font-medium text-foreground">
                  Course Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">
                    Level <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground appearance-none pr-10"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="h-4 w-4 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">
                    Duration (hours) <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                    required
                    min="0"
                    placeholder="e.g. 24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">
                    Price (VND) <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                    required
                    min="0"
                    placeholder="e.g. 1500000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">
                    Tag
                  </label>
                  <div className="relative">
                    <select
                      name="tag"
                      value={formData.tag}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground appearance-none pr-10"
                    >
                      <option value="">No tag</option>
                      <option value="Popular">Popular</option>
                      <option value="Bestseller">Bestseller</option>
                      <option value="Premium">Premium</option>
                      <option value="New">New</option>
                      <option value="Recommended">Recommended</option>
                      <option value="VIP">VIP</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="h-4 w-4 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <span className="text-xs font-bold">3</span>
                </div>
                <h3 className="text-lg font-medium text-foreground">
                  Appearance & Features
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">
                    Color Theme
                  </label>
                  <div className="flex gap-3">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="color"
                        value="blue"
                        checked={formData.color === "blue"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-10 w-10 rounded-full bg-primary ${
                            formData.color === "blue"
                              ? "ring-2 ring-offset-2 ring-primary"
                              : ""
                          }`}
                        ></div>
                        <span className="text-xs mt-1 text-muted-foreground">
                          Blue
                        </span>
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="color"
                        value="purple"
                        checked={formData.color === "purple"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-10 w-10 rounded-full bg-[hsl(var(--chart-4))] ${
                            formData.color === "purple"
                              ? "ring-2 ring-offset-2 ring-[hsl(var(--chart-4))]"
                              : ""
                          }`}
                        ></div>
                        <span className="text-xs mt-1 text-muted-foreground">
                          Purple
                        </span>
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="color"
                        value="amber"
                        checked={formData.color === "amber"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-10 w-10 rounded-full bg-[hsl(var(--chart-1))] ${
                            formData.color === "amber"
                              ? "ring-2 ring-offset-2 ring-[hsl(var(--chart-1))]"
                              : ""
                          }`}
                        ></div>
                        <span className="text-xs mt-1 text-muted-foreground">
                          Amber
                        </span>
                      </div>
                    </label>
                  </div>
                </div> */}

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">
                    Key Features
                  </label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Add up to 3 key features that will be displayed on the
                    course card
                  </p>
                  <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-[hsl(var(--chart-2))] mr-2 flex-shrink-0" />
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) =>
                            handleFeatureChange(index, e.target.value)
                          }
                          className="w-full p-2.5 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                          placeholder={`Feature ${
                            index + 1
                          }, e.g. "24/7 Support"`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">
                    Visibility Status
                  </label>
                  <div className="flex items-center gap-4 p-3 bg-background border border-input rounded-lg">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="enabled"
                        checked={formData.enabled === true}
                        onChange={() =>
                          setFormData({ ...formData, enabled: true })
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${
                          formData.enabled === true
                            ? "bg-primary"
                            : "border border-input"
                        }`}
                      >
                        {formData.enabled === true && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="text-foreground">Visible</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="enabled"
                        checked={formData.enabled === false}
                        onChange={() =>
                          setFormData({ ...formData, enabled: false })
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${
                          formData.enabled === false
                            ? "bg-primary"
                            : "border border-input"
                        }`}
                      >
                        {formData.enabled === false && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="text-foreground">Hidden</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-secondary/50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {course ? "Updating an existing course" : "Creating a new course"}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-secondary-foreground transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-primary-foreground transition-colors flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : course ? (
                  "Update Course"
                ) : (
                  "Create Course"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
