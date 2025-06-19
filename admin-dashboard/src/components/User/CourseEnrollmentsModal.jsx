import { api } from "../../api/usersAPI";
import { X, BookOpen, Users, DollarSign, Search, Filter } from "lucide-react";
import React, { useState, useEffect } from "react";

const CourseEnrollmentsModal = ({ isOpen, onClose }) => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByUser, setFilterByUser] = useState("all");
  const [stats, setStats] = useState({
    totalEnrollments: 0,
    totalUsers: 0,
    totalRevenue: 0,
    uniqueCourses: 0,
  });

  // Fetch enrollments data
  const fetchEnrollments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/admin/courses/enrollments");
      const data = response.data.body;
      setEnrollments(data);

      // Calculate stats
      const uniqueUsers = new Set(data.map((item) => item.email)).size;
      const uniqueCourses = new Set(data.map((item) => item.courseId)).size;
      const totalRevenue = data.reduce((sum, item) => sum + item.price, 0);

      setStats({
        totalEnrollments: data.length,
        totalUsers: uniqueUsers,
        totalRevenue: totalRevenue,
        uniqueCourses: uniqueCourses,
      });
    } catch (err) {
      setError("Không thể tải dữ liệu đăng ký khóa học");
      console.error("Error fetching enrollments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchEnrollments();
    }
  }, [isOpen]);

  // Filter enrollments based on search and filter criteria
  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterByUser === "all" || enrollment.username === filterByUser;

    return matchesSearch && matchesFilter;
  });

  // Get unique users for filter dropdown
  const uniqueUsers = [...new Set(enrollments.map((item) => item.username))];

  // Group enrollments by user
  const enrollmentsByUser = filteredEnrollments.reduce((acc, enrollment) => {
    const key = `${enrollment.username}-${enrollment.email}`;
    if (!acc[key]) {
      acc[key] = {
        username: enrollment.username,
        email: enrollment.email,
        courses: [],
        totalSpent: 0,
      };
    }
    acc[key].courses.push({
      courseId: enrollment.courseId,
      courseTitle: enrollment.courseTitle,
      price: enrollment.price,
    });
    acc[key].totalSpent += enrollment.price;
    return acc;
  }, {});

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Course Enrollment
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-600 font-medium">
                    Register Total
                  </p>
                  <p className="text-2xl font-bold text-blue-700">
                    {stats.totalEnrollments}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-green-600 font-medium">
                    Student Number
                  </p>
                  <p className="text-2xl font-bold text-green-700">
                    {stats.totalUsers}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-purple-600 font-medium">Courses</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {stats.uniqueCourses}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm text-orange-600 font-medium">
                    Total Revenue
                  </p>
                  <p className="text-lg font-bold text-orange-700">
                    {formatCurrency(stats.totalRevenue)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email hoặc khóa học..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={filterByUser}
                onChange={(e) => setFilterByUser(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="all">Total Students</option>
                {uniqueUsers.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading ...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-600 mb-2">{error}</div>
              <button
                onClick={fetchEnrollments}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try again
              </button>
            </div>
          ) : Object.keys(enrollmentsByUser).length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Course data not found !!!
            </div>
          ) : (
            <div className="space-y-6">
              {Object.values(enrollmentsByUser).map((userEnrollment, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {userEnrollment.username}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {userEnrollment.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Expense </p>
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(userEnrollment.totalSpent)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {userEnrollment.courses.map((course, courseIndex) => (
                      <div
                        key={courseIndex}
                        className="bg-white p-4 rounded-lg border border-gray-200"
                      >
                        <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                          {course.courseTitle}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            ID: {course.courseId}
                          </span>
                          <span className="text-sm font-semibold text-blue-600">
                            {formatCurrency(course.price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>
                        Enrolled Courses: {userEnrollment.courses.length}
                      </span>
                      <span>
                        Average:{" "}
                        {formatCurrency(
                          userEnrollment.totalSpent /
                            userEnrollment.courses.length
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={fetchEnrollments}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseEnrollmentsModal;
