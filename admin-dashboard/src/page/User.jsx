"use client";

import { userService } from "../api/usersAPI";
import AddUserModal from "../components/add-user-modal";
import DeleteUserModal from "../components/delete-user-modal";
import EditUserModal from "../components/edit-user-modal";
import StatCard from "../components/stat-card";
import UserRow from "../components/user-row";
import UserSkeleton from "../components/user-skeleton";
import ViewUserModal from "../components/view-user-modal";
import {
  Users,
  GraduationCap,
  UserPlus,
  Search,
  Filter,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";

export default function UsersPage() {
  // Helper function to convert gender from backend format (m/f) to display format (Nam/Nữ)
  const formatGender = (gender) => {
    if (gender === "m") return "Nam";
    if (gender === "f") return "Nữ";
    return gender; // Return original if not m or f
  };

  // State hooks
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Modal states
  const [activeModal, setActiveModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [editFormData, setEditFormData] = useState({
    name: "",
    role: "",
    status: "",
    phone: "",
    gender: "",
  });
  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    role: "USER",
    phone: "",
    gender: "Nam",
  });

  // Handle click outside dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isDropdownOpen &&
        !event.target.closest(".filter-dropdown-container")
      ) {
        document
          .getElementById("status-filter-dropdown")
          .classList.add("hidden");
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Fetch data with pagination
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      // Call API to get user list with pagination
      const response = await userService.getUsers(currentPage, pageSize);

      // Process returned data
      const fetchedUsers = response.users.map((user) => ({
        id: user.id,
        name: user.username,
        email: user.email,
        role: user.role,
        status: "Đang hoạt động",
        registrationDate: new Date().toLocaleDateString("vi-VN"),
        phone: user.phone,
        gender: formatGender(user.gender), // Format gender for display
        rawGender: user.gender, // Keep original value for API
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
      // Create stats from data
      const statsData = {
        totalUsers: fetchedUsers.length + (currentPage - 1) * pageSize, // Placeholder
        totalStudents: fetchedUsers.filter((user) => user.role === "USER")
          .length,
        newRegistrations: Math.floor(fetchedUsers.length * 0.2),
        usersTrend: { percentage: 5.2 },
        studentsTrend: { percentage: 2.1 },
        registrationTrend: { percentage: 3.7 },
      };

      setStats(statsData);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Fallback to mock data if API fails
      const mockUsers = Array(pageSize)
        .fill(0)
        .map((_, index) => ({
          id: (currentPage - 1) * pageSize + index + 1,
          name: `Người dùng ${(currentPage - 1) * pageSize + index + 1}`,
          email: `user${(currentPage - 1) * pageSize + index + 1}@example.com`,
          role: "USER",
          status: index % 5 === 0 ? "Không hoạt động" : "Đang hoạt động",
          registrationDate: new Date().toLocaleDateString("vi-VN"),
          phone: `098765432${index % 10}`,
          gender: index % 2 === 0 ? "Nam" : "Nữ",
          rawGender: index % 2 === 0 ? "m" : "f", // Keep original value for API
          avatar: "/placeholder.svg?height=40&width=40",
        }));

      setUsers(mockUsers);
      setDisplayedUsers(mockUsers);

      // Mock pagination data
      setTotalItems(100); // Assume 100 total users
      setTotalPages(10); // Assume 10 pages (100/10)

      // Create stats from sample data
      const statsData = {
        totalUsers: 100, // Placeholder
        totalStudents: mockUsers.filter((user) => user.role === "USER").length,
        newRegistrations: Math.floor(mockUsers.length * 0.2),
        usersTrend: { percentage: 5.2 },
        studentsTrend: { percentage: 2.1 },
        registrationTrend: { percentage: 3.7 },
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

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (e) => {
    const newSize = Number.parseInt(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  // Memoized filtered users
  const filteredUsers = useMemo(() => {
    let filtered = displayedUsers;

    // Filter by status
    if (statusFilter !== "all") {
      const statusToFilter =
        statusFilter === "active" ? "Đang hoạt động" : "Không hoạt động";
      filtered = filtered.filter((user) => user.status === statusToFilter);
    }

    // Filter by search term
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

  // Modal handlers
  const openModal = (modalType, user = null) => {
    setActiveModal(modalType);
    setSelectedUser(user);

    if (modalType === "edit" && user) {
      // For edit modal, convert display gender back to raw value for API
      const rawGender =
        user.rawGender ||
        (user.gender === "Nam"
          ? "m"
          : user.gender === "Nữ"
          ? "f"
          : user.gender);

      setEditFormData({
        name: user.name,
        role: user.role,
        status: user.status,
        phone: user.phone,
        gender: user.gender, // Use display gender for UI
        rawGender: rawGender, // Keep raw gender for API
      });
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedUser(null);
  };

  // Form handlers
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prev) => ({ ...prev, [name]: value }));
  };

  // CRUD operations
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (editFormData.phone && !/^\d{10}$/.test(editFormData.phone)) {
      alert("Số điện thoại không hợp lệ");
      return;
    }

    try {
      // Prepare data for API
      const genderForBackend =
        editFormData.gender === "Nam"
          ? "m"
          : editFormData.gender === "Nữ"
          ? "f"
          : editFormData.rawGender || editFormData.gender;

      // Convert status to boolean for API
      const statusForBackend =
        typeof editFormData.status === "boolean"
          ? editFormData.status
          : editFormData.status === "Đang hoạt động";

      const payload = {
        username: editFormData.name,
        role: editFormData.role,
        phone: editFormData.phone,
        gender: genderForBackend,
        status: statusForBackend,
      };

      // Call API to update user
      try {
        await userService.updateUser(selectedUser.id, payload);
        console.log("User updated successfully");
      } catch (apiError) {
        console.error("API error:", apiError);
        // Continue updating UI even if API fails
      }

      // Update state with consistent status format
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              name: editFormData.name,
              role: editFormData.role,
              status: statusForBackend ? "Đang hoạt động" : "Không hoạt động",
              phone: editFormData.phone,
              gender: editFormData.gender,
              rawGender: genderForBackend,
            }
          : user
      );

      setUsers(updatedUsers);
      setDisplayedUsers(updatedUsers);
      closeModal();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Có lỗi xảy ra khi cập nhật người dùng");
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !newUserData.username.trim() ||
      !newUserData.email.trim() ||
      !newUserData.password?.trim()
    ) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUserData.email)) {
      alert("Email không hợp lệ");
      return;
    }

    // Validate phone number
    if (newUserData.phone && !/^\d{10}$/.test(newUserData.phone)) {
      alert("Số điện thoại không hợp lệ");
      return;
    }

    try {
      // Convert gender: Nam -> m, Nữ -> f (lowercase per backend requirement)
      const genderForBackend = newUserData.gender === "Nam" ? "m" : "f";

      // Prepare data for API according to required schema
      const payload = {
        username: newUserData.username,
        email: newUserData.email,
        password: newUserData.password, // Add password field
        gender: genderForBackend,
        phone: newUserData.phone || "", // If phone has no value, send empty string
      };

      try {
        const response = await userService.createUser(payload);
        console.log("User added successfully:", response.data);

        // Get ID from response if available
        let newUserId;
        if (response.data?.body?.id) {
          newUserId = response.data.body.id;
        } else {
          newUserId = Date.now().toString();
        }

        // Create new user for frontend
        const newUser = {
          id: newUserId,
          name: newUserData.username,
          email: newUserData.email,
          role:
            response.data?.body?.role ||
            response.data?.role ||
            newUserData.role ||
            "USER",
          status: "Đang hoạt động",
          registrationDate: new Date().toLocaleDateString("vi-VN"),
          phone: newUserData.phone || "",
          gender: newUserData.gender,
          rawGender: genderForBackend,
          avatar: "/placeholder.svg?height=40&width=40",
        };

        // Update state
        setUsers((prevUsers) => [newUser, ...prevUsers]);
        setDisplayedUsers((prevDisplayed) => [newUser, ...prevDisplayed]);

        // Update stats
        setStats((prev) => ({
          ...prev,
          totalUsers: prev.totalUsers + 1,
          totalStudents:
            newUserData.role === "USER"
              ? prev.totalStudents + 1
              : prev.totalStudents,
          newRegistrations: prev.newRegistrations + 1,
        }));

        // Close modal and reset form
        closeModal();
        setNewUserData({
          username: "",
          email: "",
          password: "",
          role: "USER",
          phone: "",
          gender: "Nam",
        });

        // Refresh the current page to show the new user
        fetchUsers();
      } catch (apiError) {
        console.error("API error:", apiError);
        alert("Có lỗi xảy ra khi thêm người dùng mới");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Có lỗi xảy ra khi thêm người dùng mới");
    }
  };

  const confirmDeleteUser = async () => {
    try {
      // Call API to delete user
      try {
        await userService.deleteUser(selectedUser.id);
        console.log("User deleted successfully");
      } catch (apiError) {
        console.error("API error:", apiError);
        // Continue updating UI even if API fails
      }

      // Update state
      const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      setDisplayedUsers(updatedUsers);

      // Update stats
      setStats((prev) => ({
        ...prev,
        totalUsers: prev.totalUsers - 1,
        totalStudents:
          selectedUser.role === "USER"
            ? prev.totalStudents - 1
            : prev.totalStudents,
      }));

      closeModal();

      // If we deleted the last user on this page and it's not the first page, go to previous page
      if (updatedUsers.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        // Otherwise refresh the current page
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Có lỗi xảy ra khi xóa người dùng");
    }
  };

  // Generate pagination numbers
  const generatePaginationNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // If there are fewer than maxPagesToShow pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show ellipsis for larger number of pages
      if (currentPage <= 3) {
        // At beginning, show 1, 2, 3, ..., totalPages
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // At end, show 1, ..., totalPages-2, totalPages-1, totalPages
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="p-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4 md:mb-0">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              User Management
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Searching for users...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            <button
              onClick={() => openModal("add")}
              className="bg-gradient-to-r from-primary to-blue-500 text-foreground px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={
              <Users className="w-8 h-8  bg-blue-100 dark:bg-primary rounded-full text-primary dark:text-blue-800 flex items-center" />
            }
            title="Total Users"
            value={stats.totalUsers?.toLocaleString() || 0}
            trend={{
              value: stats.usersTrend?.percentage || 0,
              isPositive: true,
              icon: <ArrowUpRight className="h-3 w-3 mr-1" />,
            }}
            bgColor="bg-popover dark:bg-popover"
          />

          <StatCard
            icon={
              <GraduationCap className="h-8 w-8 bg-emerald-100  dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-500 " />
            }
            title="Students"
            value={stats.totalStudents || 0}
            trend={{
              value: stats.studentsTrend?.percentage || 0,
              isPositive: false,
              icon: <ArrowDownRight className="h-3 w-3 mr-1" />,
            }}
            bgColor="bg-popover dark:bg-popover"
          />

          <StatCard
            icon={
              <UserPlus className="h-6 w-6 text-yellow-400 dark:text-yellow-600 bg-yellow-100 dark:bg-yellow-100 rounded-full" />
            }
            title="New Registration"
            value={stats.newRegistrations || 0}
            trend={{
              value: stats.registrationTrend?.percentage || 0,
              isPositive: false,
              icon: <ArrowDownRight className="h-3 w-3 mr-1" />,
            }}
            bgColor="bg-popover dark:bg-popover"
          />
        </div>

        {/* Users Table */}
        <div className="bg-card rounded-lg border border-border shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-card-foreground">
                User List
              </h2>
              <div className="flex items-center gap-2">
                <div className="relative filter-dropdown-container">
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted"
                    onClick={() => {
                      document
                        .getElementById("status-filter-dropdown")
                        .classList.toggle("hidden");
                      setIsDropdownOpen(!isDropdownOpen);
                    }}
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    {statusFilter === "all"
                      ? "All Statuses"
                      : statusFilter === "active"
                      ? "Active"
                      : "InActive"}
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </button>
                  <div
                    id="status-filter-dropdown"
                    className="absolute right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-lg z-50 hidden"
                  >
                    <div className="py-1">
                      <button
                        className={`w-full text-left px-4 py-2 text-sm ${
                          statusFilter === "all"
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                        onClick={() => {
                          setStatusFilter("all");
                          document
                            .getElementById("status-filter-dropdown")
                            .classList.add("hidden");
                          setIsDropdownOpen(false);
                        }}
                      >
                        All Statuses
                      </button>
                      <button
                        className={`w-full text-left px-4 py-2 text-sm ${
                          statusFilter === "active"
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                        onClick={() => {
                          setStatusFilter("active");
                          document
                            .getElementById("status-filter-dropdown")
                            .classList.add("hidden");
                          setIsDropdownOpen(false);
                        }}
                      >
                        Active
                      </button>
                      <button
                        className={`w-full text-left px-4 py-2 text-sm ${
                          statusFilter === "inactive"
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                        onClick={() => {
                          setStatusFilter("inactive");
                          document
                            .getElementById("status-filter-dropdown")
                            .classList.add("hidden");
                          setIsDropdownOpen(false);
                        }}
                      >
                        InActive
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3.5 bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider rounded-tl-lg">
                      ID
                    </th>
                    <th className="px-6 py-3.5 bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Picture
                    </th>
                    <th className="px-6 py-3.5 bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3.5 bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3.5 bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3.5 bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-8 py-3.5 bg-muted text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider rounded-tr-lg">
                      Operation
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {isLoading
                    ? Array(5)
                        .fill(0)
                        .map((_, index) => <UserSkeleton key={index} />)
                    : filteredUsers.map((user) => (
                        <UserRow
                          key={user.id}
                          user={user}
                          onView={() => openModal("view", user)}
                          onEdit={() => openModal("edit", user)}
                          onDelete={() => openModal("delete", user)}
                        />
                      ))}
                </tbody>
              </table>
            </div>

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-center items-center py-4">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
                <span className="ml-2 text-muted-foreground">Loading...</span>
              </div>
            )}

            {/* No results message */}
            {filteredUsers.length === 0 && !isLoading && (
              <div className="text-center py-8 text-muted-foreground">
                No user found....
              </div>
            )}

            {/* Pagination Controls */}
            {filteredUsers.length > 0 && !isLoading && (
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                  <span className="text-sm text-muted-foreground">
                    Rows per page:
                  </span>
                  <select
                    className="border border-input rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                  <span className="text-sm text-muted-foreground">
                    Showing{" "}
                    {Math.min((currentPage - 1) * pageSize + 1, totalItems)} to{" "}
                    {Math.min(currentPage * pageSize, totalItems)} of{" "}
                    {totalItems} entries
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 border border-input rounded-md ${
                      currentPage === 1
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    First
                  </button>

                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 border border-input rounded-md ${
                      currentPage === 1
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {generatePaginationNumbers().map((page, index) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="px-3 py-1.5 text-muted-foreground"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={`page-${page}`}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1.5 border border-input rounded-md ${
                          currentPage === page
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1.5 border border-input rounded-md ${
                      currentPage === totalPages
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1.5 border border-input rounded-md ${
                      currentPage === totalPages
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    Last
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === "view" && selectedUser && (
        <ViewUserModal user={selectedUser} onClose={closeModal} />
      )}

      {activeModal === "edit" && selectedUser && (
        <EditUserModal
          user={selectedUser}
          formData={editFormData}
          onInputChange={handleEditInputChange}
          onSubmit={handleEditSubmit}
          onClose={closeModal}
        />
      )}

      {activeModal === "add" && (
        <AddUserModal
          formData={newUserData}
          onChange={handleNewUserInputChange}
          onSubmit={handleAddSubmit}
          onClose={closeModal}
        />
      )}

      {activeModal === "delete" && selectedUser && (
        <DeleteUserModal
          user={selectedUser}
          onConfirm={confirmDeleteUser}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
