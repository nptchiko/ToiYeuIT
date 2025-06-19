// Modals
import TestAPI from "../api/testmanagerAPI";
import AddTestModal from "../components/test/AddTestModal";
import DeleteTestModal from "../components/test/DeleteTestModal";
import DeleteTestSetModal from "../components/test/DeleteTestSetModal";
import EditTestModal from "../components/test/EditTestModal";
import FileUpload from "../components/test/FileUpload";
import SearchAndActions from "../components/test/SearchAndActions";
import TestSetModal from "../components/test/TestSetModal";
// Components
import TestStats from "../components/test/TestStats";
import TestTable from "../components/test/TestTable";
// Hooks
import { useFormManagement } from "../hooks/Test/use-form-management";
import { useModalManagement } from "../hooks/Test/use-modal-management";
import { useTestData } from "../hooks/Test/use-test-data";
// Utils and Constants
import { validateTestForm } from "../utils/test-utils";
import { useToast } from "@/components/toast-context";
import { Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function TestManagement() {
  const addToast = useToast();

  // Custom hooks
  const {
    tests,
    setTests,
    testSets,
    setTestSets,
    filteredTests,
    groupedTests,
    userCount,
    testStats,
    searchTerm,
    setSearchTerm,
    expandedSets,
    setExpandedSets,
    isLoading,
    error,
    setError,
    toggleTestSet,
    refreshTests,
  } = useTestData();

  const {
    isModalOpen,
    setIsModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteTestModalOpen,
    setIsDeleteTestModalOpen,
    isDeleteTestSetModalOpen,
    setIsDeleteTestSetModalOpen,
    selectedTest,
    setSelectedTest,
    selectedTestSet,
    setSelectedTestSet,
    modalRef,
    closeAllModals,
  } = useModalManagement();

  // Thêm state cho test set modal
  const [isTestSetModalOpen, setIsTestSetModalOpen] = useState(false);

  const {
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
  } = useFormManagement();

  // Action handlers
  const handleAddTest = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleEditTest = (test) => {
    if (!test || !test.testId) {
      addToast.addToast("Invalid test selected for editing", "error");
      return;
    }

    const testForEditing = {
      id: test.testId,
      testId: test.testId,
      name: test.name,
      status: test.status,
      duration: test.duration,
      testSet: test.testSet,
      testSetId: test.testSetId,
      questions: test.questions,
    };

    setSelectedTest(testForEditing);
    setIsEditModalOpen(true);
  };

  const handleDeleteTest = (test) => {
    setSelectedTest(test);
    setIsDeleteTestModalOpen(true);
  };

  const handleDeleteTestSet = (testSet) => {
    const testsInSet = tests.filter(
      (test) => (test.testSet || "Uncategorized") === testSet
    );
    const testSetId = testsInSet.length > 0 ? testsInSet[0].testSetId : null;

    setSelectedTestSet({
      name: testSet,
      id: testSetId,
    });
    setIsDeleteTestSetModalOpen(true);
  };

  // Thêm handler cho việc tạo test set mới
  const handleCreateNewTestSet = () => {
    setIsTestSetModalOpen(true);
  };

  const closeTestSetModal = () => {
    setIsTestSetModalOpen(false);
    resetTestSetForm();
  };

  // Cập nhật hàm handleSubmit để sử dụng API đúng cách
  const handleTestSetSubmit = async (e) => {
    e.preventDefault();

    if (!newTestSet.name.trim()) {
      addToast.addToast("Please enter a test set name", "error");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Gọi API với đầy đủ 3 tham số: name, skill, description
      const testSetResponse = await TestAPI.createTestSet(
        newTestSet.name,
        newTestSet.skill,
        newTestSet.description
      );

      if (testSetResponse && testSetResponse.body) {
        // Thêm test set mới vào danh sách
        if (!testSets.includes(newTestSet.name)) {
          setTestSets([...testSets, newTestSet.name]);
          setExpandedSets((prev) => ({
            ...prev,
            [newTestSet.name]: true,
          }));
        }

        closeTestSetModal();
        addToast.addToast("Test set created successfully!", "success");
      } else {
        throw new Error("Failed to create test set");
      }
    } catch (error) {
      console.error("Error creating test set:", error);
      setError("Failed to create test set. Please try again.");
      addToast.addToast(
        "Failed to create test set. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateTestForm(newTest);
    if (validationErrors.length > 0) {
      alert(validationErrors[0]);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let testSetId;

      if (newTest.isNewTestSet) {
        // Tạo test set mới với đầy đủ thông tin
        const testSetResponse = await TestAPI.createTestSet(
          newTest.testSet,
          "", // skill -
          "" // description -
        );

        if (testSetResponse?.body) {
          testSetId = testSetResponse.body.id;

          if (!testSets.includes(newTest.testSet)) {
            setTestSets([...testSets, newTest.testSet]);
            setExpandedSets((prev) => ({
              ...prev,
              [newTest.testSet]: true,
            }));
          }
        } else {
          throw new Error("Failed to create test set");
        }
      } else {
        const testsInSet = tests.filter(
          (test) => test.testSet === newTest.testSet
        );
        testSetId = testsInSet.length > 0 ? testsInSet[0].testSetId : null;

        if (!testSetId) {
          throw new Error("Could not find test set ID");
        }
      }

      // Tạo test với đúng format API
      const testToAdd = {
        testSetId: testSetId,
        name: newTest.name, // API sẽ map name -> title
        content: newTest.parsedData?.content || [],
      };

      const createdTest = await TestAPI.createTest(testToAdd);
      console.log("hehehe", createdTest.id);

      if (
        createdTest &&
        (createdTest.code === 200 || createdTest.message === "Successfully")
      ) {
        const newTestData = {
          testId: createdTest.body?.id || createdTest.id,
          id: createdTest.body?.id || createdTest.id,
          name: createdTest.body?.title || newTest.name,
          testSet: newTest.testSet,
          testSetId: testSetId,
          status: createdTest.body?.status || newTest.status,
          duration: createdTest.body?.duration || newTest.duration,
          questions: newTest.questions || 0,
        };
        console.log("newTestData", newTestData);

        setTests((prevTests) => [...prevTests, newTestData]);
        closeModal();
        addToast.addToast("Test added successfully!", "success");
      } else {
        throw new Error("Invalid response format from API");
      }
    } catch (error) {
      console.error("Error creating test:", error);
      setError("Failed to create test. Please try again.");
      addToast.addToast("Failed to create test. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTest.name?.trim()) {
      addToast.addToast("Please enter a test name", "error");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await TestAPI.updateTest(
        selectedTest.status,
        selectedTest.id || selectedTest.testId,
        selectedTest.name
      );

      if (response && response.code === 200) {
        const updatedTests = tests.map((test) =>
          test.testId === (selectedTest.id || selectedTest.testId)
            ? {
                ...test,
                name: selectedTest.name,
                status: selectedTest.status,
              }
            : test
        );
        setTests(updatedTests);
        setIsEditModalOpen(false);
        setSelectedTest(null);
        addToast.addToast("Test updated successfully!", "success");
      }
    } catch (error) {
      console.error("Error updating test:", error);
      setError("Failed to update test. Please try again.");
      addToast.addToast("Failed to update test. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDeleteTest = async () => {
    if (!selectedTest) return;

    setIsSubmitting(true);
    setError(null);
    console.log("heheh", selectedTest.testId);

    try {
      await TestAPI.deleteTest(selectedTest.testId);

      const updatedTests = tests.filter(
        (test) => test.testId !== selectedTest.testId
      );
      setTests(updatedTests);

      const testSet = selectedTest.testSet || "Uncategorized";
      const remainingTestsInSet = updatedTests.filter(
        (test) => (test.testSet || "Uncategorized") === testSet
      );

      if (remainingTestsInSet.length === 0) {
        const updatedTestSets = testSets.filter((set) => set !== testSet);
        setTestSets(updatedTestSets);
      }

      closeAllModals();
      addToast.addToast("Test deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting test:", error);
      setError("Failed to delete test. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDeleteTestSet = async () => {
    if (!selectedTestSet.testId) {
      addToast.addToast(
        "Cannot delete this test set. Missing test set ID.",
        "error"
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await TestAPI.deleteTests(selectedTestSet.id);

      const updatedTests = tests.filter(
        (test) => (test.testSet || "Uncategorized") !== selectedTestSet.name
      );
      setTests(updatedTests);

      const updatedTestSets = testSets.filter(
        (set) => set !== selectedTestSet.name
      );
      setTestSets(updatedTestSets);

      closeAllModals();
      addToast.addToast(
        "Test set and all tests deleted successfully!",
        "success"
      );
    } catch (error) {
      console.error("Error deleting test set:", error);
      setError("Failed to delete test set. Please try again.");
      addToast.addToast(
        "Failed to delete test set. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4 md:mb-0">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
              Test Management
            </span>
          </h1>

          <SearchAndActions
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAddTest={handleAddTest}
            isLoading={isLoading}
          />
        </div>

        {/* Stats Cards */}
        <TestStats
          userCount={userCount}
          testStats={testStats}
          isLoading={isLoading}
          error={error}
        />

        {/* Test List */}
        <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Test list</h2>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-lg text-muted-foreground">
                  Loading tests...
                </span>
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="px-6 py-10 text-center">
                <div className="flex flex-col items-center justify-center text-rose-600 dark:text-rose-400">
                  <AlertCircle className="h-10 w-10 mb-2" />
                  <p className="text-lg font-medium">{error}</p>
                  <button
                    onClick={refreshTests}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* Test Table */}
            {!isLoading && !error && (
              <TestTable
                groupedTests={groupedTests}
                expandedSets={expandedSets}
                toggleTestSet={toggleTestSet}
                onEditTest={handleEditTest}
                onDeleteTest={handleDeleteTest}
                onDeleteTestSet={handleDeleteTestSet}
                isSubmitting={isSubmitting}
                selectedTest={selectedTest}
                selectedTestSet={selectedTestSet}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {isTestSetModalOpen && (
        <TestSetModal
          modalRef={modalRef}
          newTestSet={newTestSet}
          onClose={closeTestSetModal}
          onSubmit={handleTestSetSubmit}
          onInputChange={handleTestSetInputChange}
          isSubmitting={isSubmitting}
        />
      )}

      {isModalOpen && (
        <AddTestModal
          modalRef={modalRef}
          newTest={newTest}
          testSets={testSets}
          onClose={closeModal}
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
          onCreateNewTestSet={handleCreateNewTestSet}
          isSubmitting={isSubmitting}
          FileUploadComponent={
            <FileUpload
              newTest={newTest}
              setNewTest={setNewTest}
              updateTestFromFile={updateTestFromFile}
            />
          }
        />
      )}

      {isEditModalOpen && selectedTest && (
        <EditTestModal
          modalRef={modalRef}
          selectedTest={selectedTest}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedTest(null);
          }}
          onSubmit={handleEditSubmit}
          onInputChange={handleEditInputChange(selectedTest, setSelectedTest)}
          isSubmitting={isSubmitting}
        />
      )}

      {isDeleteTestModalOpen && selectedTest && (
        <DeleteTestModal
          modalRef={modalRef}
          selectedTest={selectedTest}
          onClose={closeAllModals}
          onConfirm={confirmDeleteTest}
          isSubmitting={isSubmitting}
        />
      )}

      {isDeleteTestSetModalOpen && selectedTestSet && (
        <DeleteTestSetModal
          modalRef={modalRef}
          selectedTestSet={selectedTestSet}
          groupedTests={groupedTests}
          onClose={closeAllModals}
          onConfirm={confirmDeleteTestSet}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
