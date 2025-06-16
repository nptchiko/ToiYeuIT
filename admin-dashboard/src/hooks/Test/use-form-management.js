"use client";

import { DEFAULT_DURATION, TEST_STATUS } from "../../Constants/test-constants";
import { useState } from "react";

export const useFormManagement = () => {
  const [newTest, setNewTest] = useState({
    name: "",
    status: TEST_STATUS.ACTIVE,
    duration: DEFAULT_DURATION,
    testSet: "",
    questions: 0,
    file: null,
    fileName: "",
    parsedData: null,
    isNewTestSet: false,
    course: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Thêm state cho test set form
  const [newTestSet, setNewTestSet] = useState({
    name: "",
    skill: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditInputChange = (selectedTest, setSelectedTest) => (e) => {
    const { name, value } = e.target;
    setSelectedTest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Thêm handler cho test set input
  const handleTestSetInputChange = (e) => {
    const { name, value } = e.target;
    setNewTestSet((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setNewTest({
      name: "",
      status: TEST_STATUS.ACTIVE,
      duration: DEFAULT_DURATION,
      testSet: "",
      questions: 0,
      file: null,
      fileName: "",
      parsedData: null,
      isNewTestSet: false,
      course: "",
    });
  };

  // Thêm reset function cho test set
  const resetTestSetForm = () => {
    setNewTestSet({
      name: "",
      skill: "",
      description: "",
    });
  };

  const updateTestFromFile = (fileData) => {
    setNewTest((prev) => ({
      ...prev,
      name: fileData.jsonData.name || prev.name,
      testSet: fileData.jsonData.testSet || prev.testSet,
      questions: fileData.totalQuestions,
      duration: fileData.jsonData.duration || prev.duration,
      parsedData: fileData.parsedData,
    }));
  };

  // Cập nhật return object
  return {
    newTest,
    setNewTest,
    newTestSet,
    setNewTestSet,
    isSubmitting,
    setIsSubmitting,
    handleInputChange,
    handleEditInputChange,
    handleTestSetInputChange,
    resetForm,
    resetTestSetForm,
    updateTestFromFile,
  };
};
