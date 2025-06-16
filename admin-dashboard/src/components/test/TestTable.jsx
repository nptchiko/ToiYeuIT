"use client";

import { getStatusColor } from "../../utils/test-utils";
import {
  FileText,
  Clock,
  Edit,
  Trash2,
  Loader2,
  FolderOpen,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function TestTable({
  groupedTests,
  expandedSets,
  toggleTestSet,
  onEditTest,
  onDeleteTest,
  onDeleteTestSet,
  isSubmitting,
  selectedTest,
  selectedTestSet,
}) {
  return (
    <div className="overflow-x-auto">
      {Object.keys(groupedTests).length > 0 ? (
        Object.keys(groupedTests).map((testSet) => (
          <div
            key={testSet}
            className="mb-4 border border-border rounded-lg overflow-hidden"
          >
            {/* Test Set Header */}
            <div className="flex items-center justify-between p-4 bg-muted">
              <div
                className="flex items-center flex-1 cursor-pointer"
                onClick={() => toggleTestSet(testSet)}
              >
                <FolderOpen className="h-5 w-5 mr-2 text-primary" />
                <h3 className="font-medium text-foreground">
                  {testSet} ({groupedTests[testSet].length})
                </h3>
                <div className="ml-2">
                  {expandedSets[testSet] ? (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>
              <button
                onClick={() => onDeleteTestSet(testSet)}
                className="flex items-center gap-1 px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:hover:bg-rose-900/30 transition-colors shadow-sm ml-2"
                disabled={isSubmitting}
              >
                {isSubmitting && selectedTestSet === testSet ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
                <span>Delete Set</span>
              </button>
            </div>

            {/* Tests Table */}
            {expandedSets[testSet] && (
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3.5 bg-muted/50 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Test Name
                    </th>
                    <th className="px-6 py-3.5 bg-muted/50 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Questions
                    </th>
                    <th className="px-6 py-3.5 bg-muted/50 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3.5 bg-muted/50 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3.5 bg-muted/50 flex justify-center text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {groupedTests[testSet].map((test) => (
                    <tr
                      key={test.id}
                      className="bg-card hover:bg-muted/30 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-foreground">
                              {test.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ID: {test.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-foreground">
                          {test.questions}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          questions
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                          {test.duration} minute
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            test.status
                          )}`}
                        >
                          {test.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2 justify-end">
                          <button
                            onClick={() => onEditTest(test)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/30 transition-colors shadow-sm"
                            disabled={isSubmitting}
                          >
                            <Edit className="h-3.5 w-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => onDeleteTest(test)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:hover:bg-rose-900/30 transition-colors shadow-sm"
                            disabled={isSubmitting}
                          >
                            {isSubmitting && selectedTest?.id === test.id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))
      ) : (
        <div className="px-6 py-10 text-center">
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <FileText className="h-10 w-10 mb-2" />
            <p className="text-lg font-medium">No tests found</p>
            <p className="text-sm">
              Try adjusting your search or add a new test
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
