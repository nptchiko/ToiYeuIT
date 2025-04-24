import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Lock,
  User,
  Save,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useProfileDataApi from "../../api/useProfileDataApi";
const useProfileData = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await useProfileDataApi.getUserProfileData();
        setData(res);
      } catch (error) {
        console.error("lỗi khi lấy dữ liệu profile");
        setData({
          username: "User",
          email: "admin@example.com",
          phone: "+1 (555) 123-4567",
          gender: "m",
        });
      }
    }
    fetchProfile();
  }, []);
  useEffect(() => {
    // Load data from localStorage on component mount
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const updateProfileData = (newData) => {
    const updatedData = { ...data, ...newData };
    setData(updatedData);
    // Save to localStorage to persist between components
    localStorage.setItem("profileData", JSON.stringify(updatedData));
  };

  return { profileData: data, updateProfileData };
};

export default function ProfilePage() {
  const { profileData, updateProfileData } = useProfileData();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // using esc to escape page

  // Initialize form data from profile data
  useEffect(() => {
    setFormData({
      username: profileData.username,
      email: profileData.email,
      phone: profileData.phone,
      gender: profileData.gender,
      password: "",
      confirmPassword: "",
    });
  }, [profileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate passwords match if changing password
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Update profile data (excluding password fields)
    updateProfileData({
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
    });

    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Link
            to="/"
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-8 text-white">
            {/* Profile Picture */}
            <div className="flex items-center sm:items-start">
              <div className="w-32 h-32 rounded-full bg-blue-700 overflow-hidden border-4 border-gray-200 shadow-md">
                <User className="h-full w-full" />
              </div>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <User className="h-4 w-4 text-gray-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="username"
                    value={formData.username || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Mail className="h-4 w-4 text-gray-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Phone className="h-4 w-4 text-gray-500" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giới tính
                  </label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="m"
                        checked={formData.gender === "m"}
                        onChange={handleInputChange}
                      />
                      <span>Nam</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="f"
                        checked={formData.gender === "f"}
                        onChange={handleInputChange}
                      />
                      <span>Nữ</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium mb-4">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Password Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <Lock className="h-4 w-4 text-gray-500" />
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Leave blank to keep current password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <Lock className="h-4 w-4 text-gray-500" />
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Leave blank to keep current password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
                >
                  <Save className="h-5 w-5" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
