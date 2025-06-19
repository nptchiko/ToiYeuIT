"use client";

import { SKILL_OPTIONS } from "../../Constants/test-constants";
import { X, Loader2 } from "lucide-react";

export default function TestSetModal({
  modalRef,
  newTestSet,
  onClose,
  onSubmit,
  onInputChange,
  isSubmitting,
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div
        ref={modalRef}
        className="bg-card rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-border animate-scaleIn"
      >
        <div className="flex justify-between items-center p-6 border-b border-border bg-gradient-to-r from-primary to-blue-700 text-white">
          <h3 className="text-xl font-bold">Create New Test Set</h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors bg-white/10 rounded-full p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6">
          <div className="space-y-5">
            {/* Test Set Name */}
            <div className="space-y-2">
              <label
                htmlFor="testset-name"
                className="block text-sm font-medium text-foreground"
              >
                Test Set Name *
              </label>
              <input
                type="text"
                id="testset-name"
                name="name"
                value={newTestSet.name}
                onChange={onInputChange}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                placeholder="Enter test set name"
                required
              />
            </div>

            {/* Skill */}
            <div className="space-y-2">
              <label
                htmlFor="testset-skill"
                className="block text-sm font-medium text-foreground"
              >
                Skill
              </label>
              <select
                id="testset-skill"
                name="skill"
                value={newTestSet.skill}
                onChange={onInputChange}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all appearance-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                  backgroundPosition: "right 0.5rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem",
                }}
              >
                {SKILL_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="testset-description"
                className="block text-sm font-medium text-foreground"
              >
                Description
              </label>
              <textarea
                id="testset-description"
                name="description"
                value={newTestSet.description}
                onChange={onInputChange}
                rows={3}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                placeholder="Enter test set description (optional)"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted transition-all duration-200 font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 bg-gradient-to-r from-primary to-blue-700 text-white rounded-lg hover:from-primary/90 hover:to-blue-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Test Set"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
