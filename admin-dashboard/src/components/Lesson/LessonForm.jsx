import { X, Save, Trash2, CheckCircle, Circle } from "lucide-react";
import React, { useState } from "react";

const LessonForm = ({ lesson, courses, onClose, onSave, isCreating }) => {
  const [formData, setFormData] = useState({
    title: lesson?.title || "",
    description: lesson?.description || "",
    courseId: lesson?.courseId || "",
    orderIndex: lesson?.orderIndex || 1,
    videoUrl: lesson?.videoUrl || "",
    materialsUrl: lesson?.materialsUrl || "",
    grammar: lesson?.grammar || null,
  });

  const [showGrammar, setShowGrammar] = useState(!!lesson?.grammar);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSubmit = {
      ...formData,
      courseId: parseInt(formData.courseId),
      orderIndex: parseInt(formData.orderIndex),
      grammar: showGrammar ? formData.grammar : null,
    };

    try {
      await onSave(dataToSubmit);
    } catch (error) {
      // Error is handled in the hook, but you could show a specific message here if needed
    } finally {
      setLoading(false);
    }
  };

  const addQuiz = () => {
    const newGrammar = formData.grammar || {
      title: "",
      content: "",
      quizzes: [],
    };
    newGrammar.quizzes = newGrammar.quizzes || [];
    newGrammar.quizzes.push({
      questionText: "",
      orderIndex: newGrammar.quizzes.length + 1,
      options: [
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
      ],
    });
    setFormData({ ...formData, grammar: newGrammar });
  };

  const removeQuiz = (quizIndex) => {
    const newGrammar = { ...formData.grammar };
    newGrammar.quizzes.splice(quizIndex, 1);
    setFormData({ ...formData, grammar: newGrammar });
  };

  const updateQuiz = (quizIndex, field, value) => {
    const newGrammar = { ...formData.grammar };
    newGrammar.quizzes[quizIndex][field] = value;
    setFormData({ ...formData, grammar: newGrammar });
  };

  const addOption = (quizIndex) => {
    const newGrammar = { ...formData.grammar };
    newGrammar.quizzes[quizIndex].options.push({
      optionText: "",
      isCorrect: false,
    });
    setFormData({ ...formData, grammar: newGrammar });
  };

  const removeOption = (quizIndex, optionIndex) => {
    const newGrammar = { ...formData.grammar };
    newGrammar.quizzes[quizIndex].options.splice(optionIndex, 1);
    setFormData({ ...formData, grammar: newGrammar });
  };

  const updateOption = (quizIndex, optionIndex, field, value) => {
    const newGrammar = { ...formData.grammar };
    newGrammar.quizzes[quizIndex].options[optionIndex][field] = value;
    setFormData({ ...formData, grammar: newGrammar });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {isCreating ? "Create New Lesson" : "Edit Lesson"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-auto max-h-[calc(95vh-120px)]"
        >
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter lesson title"
                />
              </div>

              {isCreating && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course *
                  </label>
                  <select
                    required
                    value={formData.courseId}
                    onChange={(e) =>
                      setFormData({ ...formData, courseId: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter lesson description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Index *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.orderIndex}
                  onChange={(e) =>
                    setFormData({ ...formData, orderIndex: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Materials URL
                </label>
                <input
                  type="url"
                  value={formData.materialsUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, materialsUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Grammar Section */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Grammar Content
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setShowGrammar(!showGrammar);
                    if (!showGrammar && !formData.grammar) {
                      setFormData({
                        ...formData,
                        grammar: { title: "", content: "", quizzes: [] },
                      });
                    }
                  }}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {showGrammar ? "Remove Grammar" : "Add Grammar"}
                </button>
              </div>

              {showGrammar && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grammar Title *
                    </label>
                    <input
                      type="text"
                      required={showGrammar}
                      value={formData.grammar?.title || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          grammar: {
                            ...formData.grammar,
                            title: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter grammar title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grammar Content *
                    </label>
                    <textarea
                      required={showGrammar}
                      value={formData.grammar?.content || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          grammar: {
                            ...formData.grammar,
                            content: e.target.value,
                          },
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter grammar content"
                    />
                  </div>

                  {/* Quizzes */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-md font-medium text-gray-900">
                        Quizzes
                      </h4>
                      <button
                        type="button"
                        onClick={addQuiz}
                        className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors"
                      >
                        Add Quiz
                      </button>
                    </div>

                    {formData.grammar?.quizzes?.map((quiz, quizIndex) => (
                      <div
                        key={quizIndex}
                        className="border border-gray-200 rounded-lg p-4 mb-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium text-gray-900">
                            Quiz {quizIndex + 1}
                          </h5>
                          <button
                            type="button"
                            onClick={() => removeQuiz(quizIndex)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Question Text *
                            </label>
                            <input
                              type="text"
                              required
                              value={quiz.questionText}
                              onChange={(e) =>
                                updateQuiz(
                                  quizIndex,
                                  "questionText",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter question"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Order *
                            </label>
                            <input
                              type="number"
                              required
                              min="1"
                              value={quiz.orderIndex}
                              onChange={(e) =>
                                updateQuiz(
                                  quizIndex,
                                  "orderIndex",
                                  parseInt(e.target.value)
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        {/* Options */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Options
                            </label>
                            <button
                              type="button"
                              onClick={() => addOption(quizIndex)}
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              Add Option
                            </button>
                          </div>
                          {quiz.options?.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className="flex items-center gap-3 mb-2"
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  updateOption(
                                    quizIndex,
                                    optionIndex,
                                    "isCorrect",
                                    !option.isCorrect
                                  )
                                }
                                className={`flex-shrink-0 ${
                                  option.isCorrect
                                    ? "text-green-600"
                                    : "text-gray-400"
                                }`}
                              >
                                {option.isCorrect ? (
                                  <CheckCircle className="h-5 w-5" />
                                ) : (
                                  <Circle className="h-5 w-5" />
                                )}
                              </button>
                              <input
                                type="text"
                                required
                                value={option.optionText}
                                onChange={(e) =>
                                  updateOption(
                                    quizIndex,
                                    optionIndex,
                                    "optionText",
                                    e.target.value
                                  )
                                }
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter option text"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  removeOption(quizIndex, optionIndex)
                                }
                                className="flex-shrink-0 text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Lesson
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LessonForm;
