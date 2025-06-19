"use client";

import { DEFAULT_PAGE_SIZE } from "../../Constants/test-constants";
import TestAPI from "../../api/testmanagerAPI";
import { userService } from "../../api/usersAPI";
import {
  extractUniqueTestSets,
  initializeExpandedState,
  filterTests,
  groupTestsByTestSet,
  calculateTestStats,
} from "../../utils/test-utils";
import { useState, useEffect, useMemo } from "react";

export const useTestData = () => {
  const [tests, setTests] = useState([]);
  const [testSets, setTestSets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSets, setExpandedSets] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userCount, setUserCount] = useState(0);

  // Fetch users count
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getUsers(1, DEFAULT_PAGE_SIZE);
        if (response?.pagination?.totalItems) {
          setUserCount(response.pagination.totalItems);
        }
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };
    fetchUser();
  }, []);

  // Fetch tests
  useEffect(() => {
    const fetchTests = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await TestAPI.getAllTests();

        if (response?.body) {
          const testsData = Array.isArray(response.body) ? response.body : [];
          setTests(testsData);

          const uniqueTestSets = extractUniqueTestSets(testsData);
          setTestSets(uniqueTestSets);
          setExpandedSets(initializeExpandedState(uniqueTestSets));
        } else {
          throw new Error("Invalid response format from API");
        }
      } catch (err) {
        console.error("Failed to fetch tests:", err);
        setError("Failed to load tests. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTests();
  }, []);

  // Computed values
  const filteredTests = useMemo(
    () => filterTests(tests, searchTerm),
    [tests, searchTerm]
  );
  const groupedTests = useMemo(
    () => groupTestsByTestSet(filteredTests),
    [filteredTests]
  );
  const testStats = useMemo(() => calculateTestStats(tests), [tests]);

  const toggleTestSet = (testSet) => {
    setExpandedSets((prev) => ({
      ...prev,
      [testSet]: !prev[testSet],
    }));
  };

  const refreshTests = async () => {
    setIsLoading(true);
    try {
      const response = await TestAPI.getAllTests();
      if (response?.body) {
        const testsData = Array.isArray(response.body) ? response.body : [];
        setTests(testsData);

        const uniqueTestSets = extractUniqueTestSets(testsData);
        setTestSets(uniqueTestSets);
      }
    } catch (err) {
      console.error("Failed to refresh tests:", err);
      setError("Failed to refresh tests.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // Data
    tests,
    setTests,
    testSets,
    setTestSets,
    filteredTests,
    groupedTests,
    userCount,
    testStats,

    // UI State
    searchTerm,
    setSearchTerm,
    expandedSets,
    setExpandedSets,
    isLoading,
    error,
    setError,

    // Actions
    toggleTestSet,
    refreshTests,
  };
};
