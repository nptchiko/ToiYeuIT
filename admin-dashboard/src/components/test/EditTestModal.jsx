"use client";

import { STATUS_OPTIONS } from "../../Constants/test-constants";
import { X, Loader2 } from "lucide-react";

export default function EditTestModal({
  modalRef,
  selectedTest,
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
        <div className="flex justify-between items-center p-6 border-b border-border bg-gradient-to-r from-amber-500 to-orange-600 text-white">
          <h3 className="text-xl font-bold">Edit Test</h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors bg-white/10 rounded-full p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6">
          <div className="space-y-5">
            {/* Test Name */}
            <div className="space-y-2">
              <label
                htmlFor="edit-test-name"
                className="block text-sm font-medium text-foreground"
              >
                Test Name *
              </label>
              <input
                type="text"
                id="edit-test-name"
                name="name"
                value={selectedTest.name}
                onChange={onInputChange}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                placeholder="Enter test name"
                required
              />
            </div>

            {/* Status
            <div className="space-y-2">
              <label
                htmlFor="edit-status"
                className="block text-sm font-medium text-foreground"
              >
                Status
              </label>
              <select
                id="edit-status"
                name="status"
                value={selectedTest.status}
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
            </div> */}

            {/* Test Info Display */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Test Set:</span>
                <span className="font-medium text-foreground">
                  {selectedTest.testSet}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium text-foreground">
                  {selectedTest.duration} minutes
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Questions:</span>
                <span className="font-medium text-foreground">
                  {selectedTest.questions}
                </span>
              </div>
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
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Test"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
