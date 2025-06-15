"use client";

import { AuthService } from "../services/auth-service";
import { Mail, Phone, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const useProfileData = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    error: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch data from API using AuthService
        const response = await AuthService.getCurrentUser();

        // Extract the relevant data from the API response
        const userData = response.body;

        setData({
          name: userData.username || "",
          email: userData.email || "",
          phone: userData.phone || "",
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setData((prevData) => ({
          ...prevData,
          isLoading: false,
          error: "Failed to load profile data",
        }));
      }
    };

    // Only fetch if the user is authenticated
    if (AuthService.isAuthenticated()) {
      fetchUserData();
    } else {
      setData((prevData) => ({
        ...prevData,
        isLoading: false,
      }));
    }
  }, []);

  return { profileData: data };
};

export default function ProfileMini() {
  const { profileData } = useProfileData();

  const handleLogout = () => {
    AuthService.logout();
    // You might want to redirect the user or update UI state after logout
  };

  // Show loading state
  if (profileData.isLoading) {
    return (
      <div className="border rounded-xl shadow-lg w-80 overflow-hidden p-8 flex justify-center items-center">
        <p>Loading profile data...</p>
      </div>
    );
  }

  // Show error state if any
  if (profileData.error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="border rounded-xl shadow-lg w-80 overflow-hidden">
      {/* Profile Header with primary color background */}
      <div className="bg-primary p-6 text-primary-foreground">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center bg-cy\
             border-4 border-blue-400 shadow-md"
            >
              <User className="h-16 w-16 text-slate-300" />
            </div>
          </div>
          <h3 className="font-bold text-xl">{profileData.name}</h3>
          <span className="text-sm text-primary-foreground/80 mt-1">
            {profileData.role || "Administrator"}
          </span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="p-5 space-y-4 bg-card text-card-foreground">
        {/* Email Field */}
        <div className="flex items-center gap-3">
          <div className="bg-muted p-2 rounded-full">
            <Mail className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground">
              Email
            </div>
            <div className="text-sm font-medium">{profileData.email}</div>
          </div>
        </div>

        {/* Phone Field */}
        <div className="flex items-center gap-3">
          <div className="bg-muted p-2 rounded-full">
            <Phone className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground">
              Phone
            </div>
            <div className="text-sm font-medium">{profileData.phone}</div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-border p-4 flex justify-between bg-card">
        <Link
          to="/login"
          onClick={handleLogout}
          className="flex items-center gap-2 text-destructive hover:bg-destructive/10 transition-colors px-3 py-2 rounded-lg"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">Logout</span>
        </Link>
        <Link
          to="/profile"
          className="flex items-center gap-2 text-primary hover:bg-primary/10 transition-colors px-3 py-2 rounded-lg"
        >
          <User className="h-4 w-4" />
          <span className="text-sm font-medium">View Profile</span>
        </Link>
      </div>
    </div>
  );
}
