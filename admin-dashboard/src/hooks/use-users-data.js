"use client";

import { USER_STATUS, FILTER_OPTIONS } from "../Constants/user-constants";
import { userService } from "../api/usersAPI";
import { formatGender, generateMockUsers } from "../utils/user-utils";
import { useState, useEffect, useMemo, useCallback } from "react";

export const useUsersData = () => {
  // State hooks
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [statusFilter, setStatusFilter] = useState(FILTER_OPTIONS.ALL);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch data with pagination
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await userService.getUsers(currentPage, pageSize);

      const fetchedUsers = response.users.map((user) => ({
        id: user.id,
        name: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
        registrationDate: new Date().toLocaleDateString("vi-VN"),
        phone: user.phone,
        gender: formatGender(user.gender),
        rawGender: user.gender,
        avatar: "/placeholder.svg?height=40&width=40",
      }));

      setUsers(fetchedUsers);
      setDisplayedUsers(fetchedUsers);

      if (response.pagination) {
        setTotalItems(response.pagination.totalItems);
        setTotalPages(response.pagination.totalPages);
      } else {
        const estimatedTotal = response.length * 5;
        setTotalItems(estimatedTotal);
        setTotalPages(Math.ceil(estimatedTotal / pageSize));
      }

      const statsData = {
        totalUsers: fetchedUsers.length + (currentPage - 1) * pageSize,
        totalStudents: fetchedUsers.filter((user) => user.role === "STUDENT")
          .length,
        newRegistrations: Math.floor(fetchedUsers.length * 0.2),
        usersTrend: { percentage: 5.2 },
        studentsTrend: { percentage: 2.1 },
        registrationTrend: { percentage: 3.7 },
      };

      setStats(statsData);
    } catch (error) {
      console.error("Error fetching users:", error);

      // Fallback to mock data
      const mockUsers = generateMockUsers(pageSize, currentPage);
      setUsers(mockUsers);
      setDisplayedUsers(mockUsers);
      setTotalItems(100);
      setTotalPages(10);

      const statsData = {
        totalUsers: 100,
        totalStudents: mockUsers.filter((user) => user.role === "USER").length,
        newRegistrations: Math.floor(mockUsers.length * 0.2),
        usersTrend: null,
        studentsTrend: null,
        registrationTrend: null,
      };

      setStats(statsData);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize]);

  // Fetch users when pagination changes
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, currentPage]);

  // Memoized filtered users
  const filteredUsers = useMemo(() => {
    let filtered = displayedUsers;

    if (statusFilter !== FILTER_OPTIONS.ALL) {
      const statusToFilter =
        statusFilter === FILTER_OPTIONS.ACTIVE
          ? USER_STATUS.ACTIVE
          : USER_STATUS.INACTIVE;
      filtered = filtered.filter((user) => user.status === statusToFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.id && user.id.toString().includes(searchTerm))
      );
    }

    return filtered;
  }, [searchTerm, displayedUsers, statusFilter]);

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  return {
    // Data
    users,
    setUsers,
    displayedUsers,
    setDisplayedUsers,
    filteredUsers,
    stats,
    setStats,

    // Loading state
    isLoading,

    // Search and filters
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,

    // Pagination
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    handlePageChange,
    handlePageSizeChange,

    // Actions
    fetchUsers,
  };
};
