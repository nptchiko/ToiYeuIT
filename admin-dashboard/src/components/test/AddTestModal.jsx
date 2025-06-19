"use client";

import {
  DURATION_OPTIONS,
  STATUS_OPTIONS,
} from "../../Constants/test-constants";
import { X, Loader2 } from "lucide-react";

export default function AddTestModal({
  modalRef,
  newTest,
  testSets,
  onClose,
  onSubmit,
  onInputChange,
  onCreateNewTestSet,
  isSubmitting,
  FileUploadComponent,
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div
        ref={modalRef}
        className="bg-card rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden border border-border animate-scaleIn"
      >
        <div className="flex justify-between items-center p-6 border-b border-border bg-gradient-to-r from-primary to-blue-700 text-white">
          <h3 className="text-xl font-bold">Add New Test</h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors bg-white/10 rounded-full p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={onSubmit} className="p-6">
            <div className="space-y-5">
              {/* Test Name */}
              <div className="space-y-2">
                <label
                  htmlFor="test-name"
                  className="block text-sm font-medium text-foreground"
                >
                  Test Name *
                </label>
                <input
                  type="text"
                  id="test-name"
                  name="name"
                  value={newTest.name}
                  onChange={onInputChange}
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  placeholder="Enter test name"
                  required
                />
              </div>

              {/* Test Set Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="testSet"
                    className="block text-sm font-medium text-foreground"
                  >
                    Test Set *
                  </label>
                  <button
                    type="button"
                    onClick={onCreateNewTestSet}
                    className="text-xs text-primary hover:text-primary/80 font-medium"
                  >
                    + Create New Test Set
                  </button>
                </div>
                <select
                  id="testSet"
                  name="testSet"
                  value={newTest.testSet}
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
                  required
                >
                  <option value="">Select a test set</option>
                  {testSets.map((set) => (
                    <option key={set} value={set}>
                      {set}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-foreground"
                >
                  Duration
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={newTest.duration}
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
                  {DURATION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-foreground"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={newTest.status}
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
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Course */}
              <div className="space-y-2">
                <label
                  htmlFor="course"
                  className="block text-sm font-medium text-foreground"
                >
                  Course
                </label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  value={newTest.course}
                  onChange={onInputChange}
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  placeholder="Enter course name (optional)"
                />
              </div>

              {/* File Upload */}
              {FileUploadComponent}

              {/* Questions Count Display */}
              {newTest.questions > 0 && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      Questions detected:
                    </span>
                    <span className="text-lg font-bold text-primary">
                      {newTest.questions}
                    </span>
                  </div>
                </div>
              )}
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
                    Adding...
                  </>
                ) : (
                  "Add Test"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
