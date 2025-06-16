"use client";

import { X, Loader2, AlertTriangle } from "lucide-react";

export default function DeleteTestSetModal({
  modalRef,
  selectedTestSet,
  groupedTests,
  onClose,
  onConfirm,
  isSubmitting,
}) {
  const testsInSet = groupedTests[selectedTestSet.name] || [];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div
        ref={modalRef}
        className="bg-card rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-border animate-scaleIn"
      >
        <div className="flex justify-between items-center p-6 border-b border-border bg-gradient-to-r from-red-500 to-rose-600 text-white">
          <h3 className="text-xl font-bold">Delete Test Set</h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors bg-white/10 rounded-full p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-foreground">
                Are you sure?
              </h4>
              <p className="text-sm text-muted-foreground">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800 dark:text-red-200 mb-2">
              You are about to delete the test set{" "}
              <strong>"{selectedTestSet.name}"</strong> and all its tests.
            </p>
            <p className="text-sm text-red-800 dark:text-red-200">
              This will permanently remove{" "}
              <strong>{testsInSet.length} test(s)</strong> and all associated
              data.
            </p>
          </div>

          {testsInSet.length > 0 && (
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <h5 className="text-sm font-medium text-foreground mb-2">
                Tests to be deleted:
              </h5>
              <ul className="text-sm text-muted-foreground space-y-1 max-h-32 overflow-y-auto">
                {testsInSet.map((test) => (
                  <li key={test.id} className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    {test.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted transition-all duration-200 font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                `Delete Test Set (${testsInSet.length} tests)`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
