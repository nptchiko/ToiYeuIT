import { X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export default function EditUserModal({
  formData,
  onInputChange,
  onSubmit,
  onClose,
}) {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [displayedGender, setDisplayedGender] = useState("Select gender");

  // Helper function to display status text
  const getStatusText = (status) => {
    if (typeof status === "boolean") {
      return status ? "Đang hoạt động" : "Không hoạt động";
    }
    return status === "Đang hoạt động" ? "Đang hoạt động" : "Không hoạt động";
  };

  // Convert backend gender format to display format
  const displayGender = (gender) => {
    if (gender === "m") return "Nam";
    if (gender === "f") return "Nữ";
    return "Select gender"; // Default text when no gender is selected
  };

  // Update displayed gender whenever formData.gender changes
  useEffect(() => {
    setDisplayedGender(displayGender(formData.gender));
  }, [formData.gender]);

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-card rounded-xl shadow-2xl w-full max-w-md mx-4 
        overflow-hidden border border-border animate-in zoom-in-95 duration-200"
        >
          <div className="flex justify-between items-center p-6 border-b border-border bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <h2 className="text-xl font-bold">Edit User</h2>
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
              <label htmlFor="edit-name" className="block text-sm font-medium">
                Full Name
              </label>
              <input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={onInputChange}
                required
                className="w-full px-3 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                placeholder="Enter full name"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label htmlFor="edit-phone" className="block text-sm font-medium">
                Phone
              </label>
              <input
                type="tel"
                id="edit-phone"
                name="phone"
                value={formData.phone || ""}
                onChange={onInputChange}
                className="w-full px-3 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                placeholder="Enter phone number"
              />
            </div>

            {/* Role Field */}
            <div className="space-y-2">
              <label htmlFor="edit-role" className="block text-sm font-medium">
                Role
              </label>
              <div className="relative">
                <button
                  type="button"
                  id="edit-role"
                  className="w-full px-3 py-2.5 bg-card text-left border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 flex justify-between items-center"
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                >
                  <span>{formData.role || "Select role"}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>

                {showRoleDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                    <ul className="py-1">
                      <li
                        className="px-3 py-2.5 hover:bg-muted cursor-pointer transition-colors"
                        onClick={() => {
                          onInputChange({
                            target: { name: "role", value: "USER" },
                          });
                          setShowRoleDropdown(false);
                        }}
                      >
                        USER
                      </li>
                      <li
                        className="px-3 py-2.5 hover:bg-muted cursor-pointer transition-colors"
                        onClick={() => {
                          onInputChange({
                            target: { name: "role", value: "ADMIN" },
                          });
                          setShowRoleDropdown(false);
                        }}
                      >
                        ADMIN
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Status Field */}
            <div className="space-y-2">
              <label
                htmlFor="edit-status"
                className="block text-sm font-medium"
              >
                Status
              </label>
              <div className="relative">
                <button
                  type="button"
                  id="edit-status"
                  className="w-full px-3 py-2.5 bg-card text-left border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 flex justify-between items-center"
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                >
                  <div className="flex items-center">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        getStatusText(formData.status) === "Đang hoạt động"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    <span>{getStatusText(formData.status)}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>

                {showStatusDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                    <ul className="py-1">
                      <li
                        className="px-3 py-2.5 hover:bg-muted cursor-pointer transition-colors flex items-center"
                        onClick={() => {
                          onInputChange({
                            target: { name: "status", value: true },
                          });
                          setShowStatusDropdown(false);
                        }}
                      >
                        <span className="inline-block w-2 h-2 rounded-full mr-2 bg-green-500"></span>
                        Đang hoạt động
                      </li>
                      <li
                        className="px-3 py-2.5 hover:bg-muted cursor-pointer transition-colors flex items-center"
                        onClick={() => {
                          onInputChange({
                            target: {
                              name: "status",
                              value: false,
                            },
                          });
                          setShowStatusDropdown(false);
                        }}
                      >
                        <span className="inline-block w-2 h-2 rounded-full mr-2 bg-red-500"></span>
                        Không hoạt động
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Gender Field - IMPROVED */}
            <div className="space-y-2">
              <label
                htmlFor="edit-gender"
                className="block text-sm font-medium"
              >
                Gender
              </label>
              <div className="relative">
                <button
                  type="button"
                  id="edit-gender"
                  className="w-full px-3 py-2.5 bg-card text-left border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 flex justify-between items-center"
                  onClick={() => setShowGenderDropdown(!showGenderDropdown)}
                >
                  <span>{displayedGender}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>

                {showGenderDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                    <ul className="py-1">
                      <li
                        className="px-3 py-2.5 hover:bg-muted cursor-pointer transition-colors"
                        onClick={() => {
                          onInputChange({
                            target: { name: "gender", value: "m" },
                          });
                          setDisplayedGender("Nam");
                          setShowGenderDropdown(false);
                        }}
                      >
                        Nam
                      </li>
                      <li
                        className="px-3 py-2.5 hover:bg-muted cursor-pointer transition-colors"
                        onClick={() => {
                          onInputChange({
                            target: { name: "gender", value: "f" },
                          });
                          setDisplayedGender("Nữ");
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

            <div className="flex justify-end gap-3 pt-5 border-t mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-muted hover:bg-muted/80 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-lg text-white font-medium transition-all shadow hover:shadow-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
