"use client";

import { AuthService } from "../../../admin-dashboard/src/utils/auth-service";
import { useState, useEffect } from "react";

const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Kiểm tra callback khi component mount
  useEffect(() => {
    const checkCallback = async () => {
      try {
        const userData = await AuthService.handleGoogleCallback();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Callback check failed:", error);
      }
    };

    checkCallback();
  }, []);

  const loginWithGoogle = async (method = "auto") => {
    setIsLoading(true);
    setError(null);

    try {
      let result;

      if (method === "popup") {
        result = await AuthService.loginWithGoogle();
      } else if (method === "redirect") {
        AuthService.loginWithGoogleRedirect();
        return;
      } else {
        // Auto: thử popup trước, fallback sang redirect
        result = await AuthService.loginWithGoogle();
      }

      if (result) {
        setUser(result);
        return result;
      }
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return {
    loginWithGoogle,
    logout,
    isLoading,
    error,
    user,
    isAuthenticated: AuthService.isAuthenticated(),
  };
};

export default useGoogleAuth;
