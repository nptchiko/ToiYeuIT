import { TEST_STATUS, UNCATEGORIZED } from "../Constants/test-constants";

export const getStatusColor = (status) => {
  switch (status) {
    case TEST_STATUS.ACTIVE:
      return "bg-green-600 text-white";
    case TEST_STATUS.DRAFT:
      return "bg-yellow-600 text-white";
    case TEST_STATUS.INACTIVE:
      return "bg-rose-600 text-white";
    default:
      return "bg-gray-600 text-white";
  }
};

export const groupTestsByTestSet = (tests) => {
  return tests.reduce((acc, test) => {
    const testSet = test.testSet || UNCATEGORIZED;
    if (!acc[testSet]) {
      acc[testSet] = [];
    }
    acc[testSet].push(test);
    return acc;
  }, {});
};

export const filterTests = (tests, searchTerm) => {
  if (!searchTerm) return tests;

  return tests.filter(
    (test) =>
      test.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testSet?.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const calculateTestStats = (tests) => {
  const activeTestsCount = tests.filter(
    (test) => test.status === TEST_STATUS.ACTIVE
  ).length;
  const totalQuestionsCount = tests.reduce(
    (total, test) => total + (Number.parseInt(test.questions) || 0),
    0
  );

  return {
    activeTestsCount,
    totalQuestionsCount,
  };
};

export const extractUniqueTestSets = (tests) => {
  return [...new Set(tests.map((test) => test.testSet || UNCATEGORIZED))];
};

export const initializeExpandedState = (testSets) => {
  return testSets.reduce((acc, set) => {
    acc[set] = true;
    return acc;
  }, {});
};

export const validateTestForm = (testData) => {
  const errors = [];

  if (!testData.name?.trim()) {
    errors.push("Please enter a test name");
  }

  if (!testData.file) {
    errors.push("Please upload a JSON file");
  }

  if (!testData.testSet) {
    errors.push("Please select or create a test set");
  }

  return errors;
};

export const parseJsonFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);

        const totalQuestions = Array.isArray(jsonData)
          ? jsonData.reduce((total, part) => total + part.questions.length, 0)
          : 0;

        resolve({
          jsonData,
          totalQuestions,
          parsedData: { content: jsonData },
        });
      } catch (error) {
        reject(
          new Error(
            "Invalid JSON format. Please check your file and try again."
          )
        );
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read the file. Please try again."));
    };

    reader.readAsText(file);
  });
};
