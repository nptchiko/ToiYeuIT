"use client";

import { FILTER_TYPES } from "../../Constants/course-constants";
import { Filter, ChevronDown, Headphones, MessageSquare } from "lucide-react";

export default function FilterDropdowns({
  categoryFilter,
  setCategoryFilter,
  levelFilter,
  setLevelFilter,
  statusFilter,
  setStatusFilter,
  showCategoryDropdown,
  setShowCategoryDropdown,
  showLevelDropdown,
  setShowLevelDropdown,
  showStatusDropdown,
  setShowStatusDropdown,
}) {
  return (
    <>
      {/* Category Dropdown */}
      <div className="relative category-dropdown">
        <button
          onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
          className="flex items-center gap-2 px-4 py-2.5 bg-secondary hover:bg-secondary/80 rounded-lg text-secondary-foreground font-medium transition-colors"
        >
          <Filter className="h-4 w-4" />
          {categoryFilter === FILTER_TYPES.ALL
            ? "All Courses"
            : categoryFilter === FILTER_TYPES.LR
            ? "Listening & Reading"
            : "Speaking & Writing"}
          <ChevronDown className="h-4 w-4" />
        </button>
        {showCategoryDropdown && (
          <div className="absolute left-0 mt-2 w-56 bg-card rounded-lg shadow-lg border border-border z-10 animate-fadeIn">
            <div className="py-1">
              <button
                onClick={() => {
                  setCategoryFilter(FILTER_TYPES.ALL);
                  setShowCategoryDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/80"
              >
                All Courses
              </button>
              <button
                onClick={() => {
                  setCategoryFilter(FILTER_TYPES.LR);
                  setShowCategoryDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/80 flex items-center"
              >
                <Headphones className="h-4 w-4 mr-2 text-primary" />
                Listening & Reading
              </button>
              <button
                onClick={() => {
                  setCategoryFilter(FILTER_TYPES.SW);
                  setShowCategoryDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/80 flex items-center"
              >
                <MessageSquare className="h-4 w-4 mr-2 text-[hsl(var(--chart-4))]" />
                Speaking & Writing
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Level Dropdown */}
      <div className="relative level-dropdown">
        <button
          onClick={() => setShowLevelDropdown(!showLevelDropdown)}
          className="flex items-center gap-2 px-4 py-2.5 bg-secondary hover:bg-secondary/80 rounded-lg text-secondary-foreground font-medium transition-colors"
        >
          <Filter className="h-4 w-4" />
          {levelFilter === FILTER_TYPES.ALL
            ? "All Levels"
            : levelFilter === FILTER_TYPES.BASIC
            ? "Basic"
            : levelFilter === FILTER_TYPES.INTERMEDIATE
            ? "Intermediate"
            : "Advanced"}
          <ChevronDown className="h-4 w-4" />
        </button>
        {showLevelDropdown && (
          <div className="absolute left-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border z-10 animate-fadeIn">
            <div className="py-1">
              <button
                onClick={() => {
                  setLevelFilter(FILTER_TYPES.ALL);
                  setShowLevelDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/80"
              >
                All Levels
              </button>
              <button
                onClick={() => {
                  setLevelFilter(FILTER_TYPES.BASIC);
                  setShowLevelDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/80"
              >
                Basic
              </button>
              <button
                onClick={() => {
                  setLevelFilter(FILTER_TYPES.INTERMEDIATE);
                  setShowLevelDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/80"
              >
                Intermediate
              </button>
              <button
                onClick={() => {
                  setLevelFilter(FILTER_TYPES.ADVANCED);
                  setShowLevelDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/80"
              >
                Advanced
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
