"use client";

import { X, User, Mail, Phone, UserCircle, Lock } from "lucide-react";
import { useState } from "react";

export default function AddUserModal({
  formData,
  onChange,
  onSubmit,
  onClose,
}) {
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {/* Backdrop with animation */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* Modal container with animation */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full animate-scaleIn border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center">
              <UserCircle className="h-6 w-6 mr-2" />
              Add New User
            </h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1.5"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="p-6 space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="add-username"
                className=" text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
              >
                <User className="h-4 w-4 mr-2 text-blue-500" />
                Full Name <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  id="add-username"
                  name="username"
                  value={formData.username}
                  onChange={onChange}
                  required
                  placeholder="Enter full name"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white transition-colors"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="add-email"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
              >
                <Mail className="h-4 w-4 mr-2 text-blue-500" />
                Email <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="add-email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  required
                  placeholder="example@email.com"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="add-password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
              >
                <Lock className="h-4 w-4 mr-2 text-blue-500" />
                Password <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="add-password"
                  name="password"
                  value={formData.password || ""}
                  onChange={onChange}
                  required
                  placeholder="Enter password"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white pr-20 transition-colors"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-sm font-medium bg-transparent px-2 py-1 rounded transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Password should be at least 8 characters
              </p>
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label
                htmlFor="add-phone"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
              >
                <Phone className="h-4 w-4 mr-2 text-blue-500" />
                Phone
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="add-phone"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={onChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white transition-colors"
                />
              </div>
            </div>

            {/* Role Field - Hidden since only "user" is allowed */}
            <input type="hidden" name="role" value="user" />

            {/* Gender Field */}
            <div className="space-y-2">
              <label
                htmlFor="add-gender"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
              >
                <UserCircle className="h-4 w-4 mr-2 text-blue-500" />
                Gender
              </label>
              <div className="relative">
                <button
                  type="button"
                  id="add-gender"
                  className="w-full px-4 py-2.5 text-left border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center bg-white dark:bg-gray-700 dark:text-white transition-colors"
                  onClick={() => setShowGenderDropdown(!showGenderDropdown)}
                >
                  <span>{formData.gender || "Select gender"}</span>
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M7 7l3 3 3-3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {showGenderDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg animate-fadeIn">
                    <ul className="py-1">
                      <li
                        className="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                        onClick={() => {
                          onChange({
                            target: { name: "gender", value: "Nam" },
                          });
                          setShowGenderDropdown(false);
                        }}
                      >
                        Nam
                      </li>
                      <li
                        className="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                        onClick={() => {
                          onChange({ target: { name: "gender", value: "Nữ" } });
                          setShowGenderDropdown(false);
                        }}
                      >
                        Nữ
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Note about role */}
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <span className="font-medium">Note:</span> New users are created
                with the "user" role by default. The "Học viên" role is assigned
                after purchase.
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-5 border-t border-gray-200 dark:border-gray-700 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-gray-800 dark:text-gray-200 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg text-white font-medium transition-all shadow-md hover:shadow-lg"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
