import {
  X,
  Phone,
  Mail,
  Calendar,
  User,
  Shield,
  Briefcase,
} from "lucide-react";

export default function ViewUserModal({ user, onClose }) {
  // Convert gender from backend format (m/f) to display format (Nam/Nữ)
  const displayGender = (gender) => {
    if (gender === "m") return "Nam";
    if (gender === "f") return "Nữ";
    return gender; // Return original if not m or f
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-border animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center p-6 border-b border-border bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <h2 className="text-xl font-bold">User Details</h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1.5"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* User Avatar and Basic Info */}
            <div className="flex flex-col items-center justify-center pb-4 border-b border-border">
              <div className="relative mb-3">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={`${user.name}'s avatar`}
                  className="h-24 w-24 rounded-full border-4 border-white shadow-md object-cover"
                />
                <span
                  className={`absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white ${
                    user.status === "Đang hoạt động"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></span>
              </div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">
                  {user.role}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    user.status === "Đang hoạt động"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${
                      user.status === "Đang hoạt động"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                  {user.status}
                </span>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">ID</p>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary opacity-70" />
                    <p className="font-medium">{user.id}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Gender</p>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary opacity-70" />
                    <p className="font-medium">{displayGender(user.gender)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Email</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary opacity-70" />
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Phone</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary opacity-70" />
                  <p className="font-medium">{user.phone || "N/A"}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  Registration Date
                </p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary opacity-70" />
                  <p className="font-medium">{user.registrationDate}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-muted/30 border-t border-border">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
