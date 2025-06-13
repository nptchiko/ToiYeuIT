"use client";

// Client component
import { useAuth } from "../../hooks/auth-context";
import { useToast } from "../../hooks/toast-context";
import PasswordStrength from "./password-strength";
import GoogleLoginButton from "@/components/login/google-login-button";
import {
  X,
  ChevronLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { login, register, resetPassword, verifyResetCode, setNewPassword } =
    useAuth();

  // Modal state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [isModalTransitioning, setIsModalTransitioning] = useState(false);

  // Form visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Focus states
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [resetEmailFocus, setResetEmailFocus] = useState(false);

  // Form data
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");

  // Form validation
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});
  const [resetErrors, setResetErrors] = useState({});
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);
  const [isRegisterSubmitting, setIsRegisterSubmitting] = useState(false);
  const [isResetSubmitting, setIsResetSubmitting] = useState(false);

  // States for password reset flow
  const [showVerificationCodeModal, setShowVerificationCodeModal] =
    useState(false);
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeErrors, setVerificationCodeErrors] = useState({});
  const [isVerificationSubmitting, setIsVerificationSubmitting] =
    useState(false);
  const [newPassword, setNewPasswordState] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPasswordErrors, setNewPasswordErrors] = useState({});
  const [isNewPasswordSubmitting, setIsNewPasswordSubmitting] = useState(false);
  const [verificationCodeFocus, setVerificationCodeFocus] = useState(false);
  const [newPasswordFocus, setNewPasswordFocus] = useState(false);
  const [confirmNewPasswordFocus, setConfirmNewPasswordFocus] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // Track Google login state
  const [isGoogleLoginInProgress, setIsGoogleLoginInProgress] = useState(false);

  // Google Login handlers
  const handleGoogleSuccess = (userData) => {
    console.log("Google login successful:", userData);
    setIsGoogleLoginInProgress(false);
    closeModals();
    addToast("Đăng nhập Google thành công!", "success");
    navigate("/xay-dung");
  };

  const handleGoogleError = (error) => {
    console.error("Google login error:", error);
    setIsGoogleLoginInProgress(false);
    addToast("Đăng nhập Google không thành công. Vui lòng thử lại.", "error");
  };

  // Modal handling functions
  const openLoginModal = () => {
    setIsModalTransitioning(true);
    setShowLoginModal(true);
    setShowRegisterModal(false);
    setShowForgotPasswordModal(false);
    setShowResetConfirmation(false);
    setShowVerificationCodeModal(false);
    setShowNewPasswordModal(false);
    resetFormErrors();
  };

  const openRegisterModal = () => {
    setIsModalTransitioning(true);
    setShowRegisterModal(true);
    setShowLoginModal(false);
    setShowForgotPasswordModal(false);
    setShowResetConfirmation(false);
    setShowVerificationCodeModal(false);
    setShowNewPasswordModal(false);
    resetFormErrors();
  };

  const openForgotPasswordModal = () => {
    setIsModalTransitioning(true);
    setShowForgotPasswordModal(true);
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setShowResetConfirmation(false);
    setShowVerificationCodeModal(false);
    setShowNewPasswordModal(false);
    resetFormErrors();
  };

  const openVerificationCodeModal = () => {
    setIsModalTransitioning(true);
    setTimeout(() => {
      setShowVerificationCodeModal(true);
      setShowForgotPasswordModal(false);
      setShowLoginModal(false);
      setShowRegisterModal(false);
      setShowResetConfirmation(false);
      setShowNewPasswordModal(false);
      setIsModalTransitioning(false);
      resetFormErrors();
    }, 300);
  };

  const openNewPasswordModal = () => {
    setIsModalTransitioning(true);
    setShowNewPasswordModal(true);
    setShowVerificationCodeModal(false);
    setShowForgotPasswordModal(false);
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setShowResetConfirmation(false);
    resetFormErrors();
  };

  const closeModals = () => {
    setIsModalTransitioning(true);
    setTimeout(() => {
      setShowLoginModal(false);
      setShowRegisterModal(false);
      setShowForgotPasswordModal(false);
      setShowResetConfirmation(false);
      setShowVerificationCodeModal(false);
      setShowNewPasswordModal(false);
      setIsModalTransitioning(false);
      resetFormErrors();
    }, 300);
  };

  const resetFormErrors = () => {
    setLoginErrors({});
    setRegisterErrors({});
    setResetErrors({});
    setVerificationCodeErrors({});
    setNewPasswordErrors({});
  };

  // Form validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // Form submission handlers
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoginSubmitting(true);

    const errors = {};

    if (!loginEmail) {
      errors.email = "Email là bắt buộc";
    } else if (!validateEmail(loginEmail)) {
      errors.email = "Email không hợp lệ";
    }

    if (!loginPassword) {
      errors.password = "Mật khẩu là bắt buộc";
    }

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      setIsLoginSubmitting(false);
      return;
    }

    try {
      await login(loginEmail, loginPassword);
      closeModals();
      navigate("/xay-dung");
    } catch (error) {
      console.error("Login failed:", error);
      addToast(
        "Không đăng nhập thành công . Vui lòng kiểm tra đăng nhập lại. ",
        "error"
      );
    } finally {
      setIsLoginSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsRegisterSubmitting(true);

    const errors = {};

    if (!registerEmail) {
      errors.email = "Email là bắt buộc";
    } else if (!validateEmail(registerEmail)) {
      errors.email = "Email không hợp lệ";
    }

    if (!registerPassword) {
      errors.password = "Mật khẩu là bắt buộc";
    } else if (!validatePassword(registerPassword)) {
      errors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Xác nhận mật khẩu là bắt buộc";
    } else if (confirmPassword !== registerPassword) {
      errors.confirmPassword = "Mật khẩu không khớp";
    }

    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      setIsRegisterSubmitting(false);
      return;
    }

    try {
      await register(registerEmail, registerPassword);
      closeModals();
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      addToast("Đăng ký không thành công. Vui lòng thử lại.", "error");
    } finally {
      setIsRegisterSubmitting(false);
    }
  };

  // Sửa hàm handleResetPasswordSubmit để xử lý kết quả đúng cách
  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsResetSubmitting(true);

    const errors = {};

    if (!resetEmail) {
      errors.email = "Email là bắt buộc";
    } else if (!validateEmail(resetEmail)) {
      errors.email = "Email không hợp lệ";
    }

    if (Object.keys(errors).length > 0) {
      setResetErrors(errors);
      setIsResetSubmitting(false);
      return;
    }

    try {
      const res = await resetPassword(resetEmail);
      console.log("Kết quả gửi mã xác nhận:", res);

      // Chỉ mở modal nhập mã xác nhận nếu API trả về thành công

      openVerificationCodeModal();
      if (res.code) {
        console.log(res.code);

        addToast("Mã xác nhận đã được gửi đến email của bạn", "success");
      } else {
        addToast("Không thể gửi mã xác nhận. Vui lòng thử lại.", "error");
      }
    } catch (error) {
      console.error("Password reset failed:", error);
      addToast(
        "Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại.",
        "error"
      );
    } finally {
      setIsResetSubmitting(false);
    }
  };

  const handleVerificationCodeSubmit = async (e) => {
    e.preventDefault();
    setIsVerificationSubmitting(true);

    const errors = {};

    if (!verificationCode) {
      errors.code = "Mã xác nhận là bắt buộc";
    } else if (verificationCode.length < 6) {
      errors.code = "Mã xác nhận phải có ít nhất 6 ký tự";
    }

    if (Object.keys(errors).length > 0) {
      setVerificationCodeErrors(errors);
      setIsVerificationSubmitting(false);
      return;
    }

    try {
      const response = await verifyResetCode(resetEmail, verificationCode);
      // console.log("maxacnhan", response);
      if (response === true) {
        openNewPasswordModal();
      } else {
        addToast("Mã xác nhận không đúng. Vui lòng thử lại.", "error");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      addToast("Xác minh mã không thành công. Vui lòng thử lại.", "error");
    } finally {
      setIsVerificationSubmitting(false);
    }
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsNewPasswordSubmitting(true);

    const errors = {};

    if (!newPassword) {
      errors.password = "Mật khẩu mới là bắt buộc";
    } else if (!validatePassword(newPassword)) {
      errors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }

    if (!confirmNewPassword) {
      errors.confirmPassword = "Xác nhận mật khẩu là bắt buộc";
    } else if (confirmNewPassword !== newPassword) {
      errors.confirmPassword = "Mật khẩu không khớp";
    }

    if (Object.keys(errors).length > 0) {
      setNewPasswordErrors(errors);
      setIsNewPasswordSubmitting(false);
      return;
    }

    try {
      await setNewPassword(resetEmail, newPassword, confirmNewPassword);
      addToast("Đặt lại mật khẩu thành công!", "success");
      closeModals();
      openLoginModal();
    } catch (error) {
      console.error("Password reset failed:", error);
      addToast("Đặt lại mật khẩu không thành công. Vui lòng thử lại.", "error");
    } finally {
      setIsNewPasswordSubmitting(false);
    }
  };

  useEffect(() => {
    // console.log("hehehehe", showVerificationCodeModal);
    if (
      showLoginModal ||
      showRegisterModal ||
      showForgotPasswordModal ||
      showResetConfirmation ||
      showVerificationCodeModal ||
      showNewPasswordModal
    ) {
      document.body.classList.add("overflow-hidden");
      setTimeout(() => setIsModalTransitioning(false), 50);
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [
    showLoginModal,
    showRegisterModal,
    showForgotPasswordModal,
    showResetConfirmation,
    showVerificationCodeModal,
    showNewPasswordModal,
  ]);

  // Helper component for error message
  const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
      <div className="flex items-center mt-1 text-red-500 text-sm">
        <AlertTriangle size={14} className="mr-1" />
        <span>{message}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100 rounded-full translate-x-1/2 opacity-50"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-100 rounded-full translate-y-1/2 opacity-40"></div>
      </div>

      {/* Logo */}
      <div className="w-full max-w-md mb-8 relative z-10 flex justify-center">
        <div className="text-3xl font-bold text-[#0071f9] flex items-center">
          <span className="bg-[#0071f9] text-white px-3 py-1 rounded-lg mr-2">
            ET
          </span>
          <span>Enghub</span>
        </div>
      </div>

      <div className="max-w-md w-full text-center mb-8 relative z-10 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-[#152946] mb-2">
          Tham gia ngay cùng Enghub
        </h1>
        <h2 className="text-lg text-[#0071f9] font-medium mb-4">
          Nền tảng học và luyện thi thông minh. Tốt nhất hiện nay
        </h2>

        <div className="flex flex-col w-full max-w-xs mx-auto gap-3 mt-8">
          <button
            onClick={openLoginModal}
            className="w-full py-3 px-4 bg-[#0071f9] text-white rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center"
          >
            Đăng nhập
          </button>
          <button
            onClick={openRegisterModal}
            className="w-full py-3 px-4 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium hover:border-gray-400 flex items-center justify-center hover:-translate-y-0.5"
          >
            Đăng ký
          </button>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm ${
            isModalTransitioning ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModals();
          }}
        >
          <div
            className={`bg-white rounded-2xl w-full max-w-md relative overflow-hidden shadow-2xl ${
              isModalTransitioning ? "scale-95" : "scale-100"
            } transition-all duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <button
                onClick={closeModals}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-xl font-semibold text-center flex-1 text-[#152946]">
                Đăng nhập
              </h2>
              <button
                onClick={closeModals}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <form className="space-y-4" onSubmit={handleLoginSubmit}>
                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div
                    className={`relative flex items-center ${
                      emailFocus ? "ring-2 ring-[#0071f9]" : ""
                    } rounded-lg overflow-hidden ${
                      loginErrors.email ? "border-red-500" : ""
                    }`}
                  >
                    <div className="absolute left-3 text-gray-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      placeholder="abc123@gmail.com"
                      className={`w-full p-3 pl-10 border ${
                        loginErrors.email ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none`}
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <ErrorMessage message={loginErrors.email} />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mật khẩu
                    </label>
                    <button
                      type="button"
                      onClick={openForgotPasswordModal}
                      className="text-sm text-[#0071f9] hover:underline"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                  <div
                    className={`relative flex items-center ${
                      passwordFocus ? "ring-2 ring-[#0071f9]" : ""
                    } rounded-lg overflow-hidden ${
                      loginErrors.password ? "border-red-500" : ""
                    }`}
                  >
                    <div className="absolute left-3 text-gray-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="••••••••••••••••"
                      className={`w-full p-3 pl-10 border ${
                        loginErrors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:outline-none`}
                      onFocus={() => setPasswordFocus(true)}
                      onBlur={() => setPasswordFocus(false)}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <ErrorMessage message={loginErrors.password} />
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#0071f9] focus:ring-[#0071f9] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Ghi nhớ đăng nhập
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoginSubmitting}
                  className={`w-full py-3 bg-[#0071f9] text-white rounded-lg hover:bg-blue-600 transition-all duration-300 mt-4 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center ${
                    isLoginSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoginSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang xử lý...
                    </span>
                  ) : (
                    "Đăng nhập"
                  )}
                </button>

                <div className="relative flex items-center justify-center mt-4">
                  <div className="border-t border-gray-300 absolute w-full"></div>
                  <span className="bg-white px-2 text-sm text-gray-500 relative">
                    hoặc
                  </span>
                </div>

                {/* Google Login Button */}
                <GoogleLoginButton
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  className=""
                  disabled={isGoogleLoginInProgress}
                />

                <div className="text-center text-sm mt-4">
                  <span className="text-gray-600">Chưa có tài khoản? </span>
                  <button
                    type="button"
                    onClick={openRegisterModal}
                    className="text-[#0071f9] hover:underline font-medium"
                  >
                    Đăng ký ngay
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm ${
            isModalTransitioning ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModals();
          }}
        >
          <div
            className={`bg-white rounded-2xl w-full max-w-md relative overflow-hidden shadow-2xl ${
              isModalTransitioning ? "scale-95" : "scale-100"
            } transition-all duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <button
                onClick={closeModals}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-xl font-semibold text-center flex-1 text-[#152946]">
                Đăng ký
              </h2>
              <button
                onClick={closeModals}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                <div className="space-y-1">
                  <label
                    htmlFor="register-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 text-gray-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      id="register-email"
                      placeholder="abc123@gmail.com"
                      className={`w-full p-3 pl-10 border ${
                        registerErrors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071f9]`}
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                  </div>
                  <ErrorMessage message={registerErrors.email} />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="register-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mật khẩu
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 text-gray-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="register-password"
                      placeholder="••••••••••••••••"
                      className={`w-full p-3 pl-10 border ${
                        registerErrors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071f9]`}
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <ErrorMessage message={registerErrors.password} />
                  {registerPassword && !registerErrors.password && (
                    <PasswordStrength password={registerPassword} />
                  )}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nhập lại mật khẩu
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 text-gray-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      placeholder="••••••••••••••••"
                      className={`w-full p-3 pl-10 border ${
                        registerErrors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071f9]`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  <ErrorMessage message={registerErrors.confirmPassword} />
                </div>

                <button
                  type="submit"
                  disabled={isRegisterSubmitting}
                  className={`w-full py-3 bg-[#0071f9] text-white rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 mt-4 flex items-center justify-center ${
                    isRegisterSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isRegisterSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang xử lý...
                    </span>
                  ) : (
                    "Đăng ký"
                  )}
                </button>

                <div className="relative flex items-center justify-center mt-4">
                  <div className="border-t border-gray-300 absolute w-full"></div>
                  <span className="bg-white px-2 text-sm text-gray-500 relative">
                    hoặc
                  </span>
                </div>

                {/* Google Login Button for Register */}
                <GoogleLoginButton
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  className=""
                  disabled={isGoogleLoginInProgress}
                />

                <div className="text-center text-sm mt-4">
                  <span className="text-gray-600">Đã có tài khoản? </span>
                  <button
                    type="button"
                    onClick={openLoginModal}
                    className="text-[#0071f9] hover:underline font-medium"
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm ${
            isModalTransitioning ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModals();
          }}
        >
          <div
            className={`bg-white rounded-2xl w-full max-w-md relative overflow-hidden shadow-2xl ${
              isModalTransitioning ? "scale-95" : "scale-100"
            } transition-all duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <button
                onClick={openLoginModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-xl font-semibold text-center flex-1 text-[#152946]">
                Quên mật khẩu
              </h2>
              <button
                onClick={closeModals}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn hướng dẫn
                để đặt lại mật khẩu.
              </p>

              <form className="space-y-4" onSubmit={handleResetPasswordSubmit}>
                <div className="space-y-1">
                  <label
                    htmlFor="reset-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div
                    className={`relative flex items-center ${
                      resetEmailFocus ? "ring-2 ring-[#0071f9]" : ""
                    } rounded-lg overflow-hidden ${
                      resetErrors.email ? "border-red-500" : ""
                    }`}
                  >
                    <div className="absolute left-3 text-gray-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      id="reset-email"
                      placeholder="abc123@gmail.com"
                      className={`w-full p-3 pl-10 border ${
                        resetErrors.email ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none`}
                      onFocus={() => setResetEmailFocus(true)}
                      onBlur={() => setResetEmailFocus(false)}
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                    />
                  </div>
                  <ErrorMessage message={resetErrors.email} />
                </div>

                <button
                  type="submit"
                  disabled={isResetSubmitting}
                  className={`w-full py-3 bg-[#0071f9] text-white rounded-lg hover:bg-blue-600 transition-all duration-300 mt-4 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center ${
                    isResetSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isResetSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang xử lý...
                    </span>
                  ) : (
                    "Gửi hướng dẫn đặt lại"
                  )}
                </button>

                <div className="text-center text-sm mt-4">
                  <span className="text-gray-600">Nhớ mật khẩu? </span>
                  <button
                    type="button"
                    onClick={openLoginModal}
                    className="text-[#0071f9] hover:underline font-medium"
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Verification Code Modal */}
      {showVerificationCodeModal && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm ${
            isModalTransitioning ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModals();
          }}
        >
          <div
            className={`bg-white rounded-2xl w-full max-w-md relative overflow-hidden shadow-2xl ${
              isModalTransitioning ? "scale-95" : "scale-100"
            } transition-all duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <button
                onClick={openForgotPasswordModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-xl font-semibold text-center flex-1 text-[#152946]">
                Nhập mã xác nhận
              </h2>
              <button
                onClick={closeModals}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Vui lòng nhập mã xác nhận đã được gửi đến email của bạn.
              </p>

              <form
                className="space-y-4"
                onSubmit={handleVerificationCodeSubmit}
              >
                <div className="space-y-1">
                  <label
                    htmlFor="verification-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mã xác nhận
                  </label>
                  <div
                    className={`relative flex items-center ${
                      verificationCodeFocus ? "ring-2 ring-[#0071f9]" : ""
                    } rounded-lg overflow-hidden ${
                      verificationCodeErrors.code ? "border-red-500" : ""
                    }`}
                  >
                    <input
                      type="text"
                      id="verification-code"
                      placeholder="123456"
                      className={`w-full p-3 border ${
                        verificationCodeErrors.code
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:outline-none`}
                      onFocus={() => setVerificationCodeFocus(true)}
                      onBlur={() => setVerificationCodeFocus(false)}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                  </div>
                  <ErrorMessage message={verificationCodeErrors.code} />
                </div>

                <button
                  type="submit"
                  disabled={isVerificationSubmitting}
                  className={`w-full py-3 bg-[#0071f9] text-white rounded-lg hover:bg-blue-600 transition-all duration-300 mt-4 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center ${
                    isVerificationSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isVerificationSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang xử lý...
                    </span>
                  ) : (
                    "Xác nhận"
                  )}
                </button>

                <div className="text-center text-sm mt-4">
                  <span className="text-gray-600">Chưa nhận được mã? </span>
                  <button
                    type="button"
                    onClick={openForgotPasswordModal}
                    className="text-[#0071f9] hover:underline font-medium"
                  >
                    Gửi lại mã
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* New Password Modal */}
      {showNewPasswordModal && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm ${
            isModalTransitioning ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModals();
          }}
        >
          <div
            className={`bg-white rounded-2xl w-full max-w-md relative overflow-hidden shadow-2xl ${
              isModalTransitioning ? "scale-95" : "scale-100"
            } transition-all duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <button
                onClick={openVerificationCodeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-xl font-semibold text-center flex-1 text-[#152946]">
                Đặt mật khẩu mới
              </h2>
              <button
                onClick={closeModals}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Vui lòng nhập mật khẩu mới của bạn.
              </p>

              <form className="space-y-4" onSubmit={handleNewPasswordSubmit}>
                <div className="space-y-1">
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mật khẩu mới
                  </label>
                  <div
                    className={`relative flex items-center ${
                      newPasswordFocus ? "ring-2 ring-[#0071f9]" : ""
                    } rounded-lg overflow-hidden ${
                      newPasswordErrors.password ? "border-red-500" : ""
                    }`}
                  >
                    <div className="absolute left-3 text-gray-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="new-password"
                      placeholder="••••••••••••••••"
                      className={`w-full p-3 border ${
                        newPasswordErrors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:outline-none`}
                      onFocus={() => setNewPasswordFocus(true)}
                      onBlur={() => setNewPasswordFocus(false)}
                      value={newPassword}
                      onChange={(e) => setNewPasswordState(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  <ErrorMessage message={newPasswordErrors.password} />
                  {newPassword && !newPasswordErrors.password && (
                    <PasswordStrength password={newPassword} />
                  )}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="confirm-new-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Xác nhận mật khẩu mới
                  </label>
                  <div
                    className={`relative flex items-center ${
                      confirmNewPasswordFocus ? "ring-2 ring-[#0071f9]" : ""
                    } rounded-lg overflow-hidden ${
                      newPasswordErrors.confirmPassword ? "border-red-500" : ""
                    }`}
                  >
                    <div className="absolute left-3 text-gray-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showConfirmNewPassword ? "text" : "password"}
                      id="confirm-new-password"
                      placeholder="••••••••••••••••"
                      className={`w-full p-3 border ${
                        newPasswordErrors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:outline-none`}
                      onFocus={() => setConfirmNewPasswordFocus(true)}
                      onBlur={() => setConfirmNewPasswordFocus(false)}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmNewPassword(!showConfirmNewPassword)
                      }
                      className="absolute right-3 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmNewPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  <ErrorMessage message={newPasswordErrors.confirmPassword} />
                </div>

                <button
                  type="submit"
                  disabled={isNewPasswordSubmitting}
                  className={`w-full py-3 bg-[#0071f9] text-white rounded-lg hover:bg-blue-600 transition-all duration-300 mt-4 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center ${
                    isNewPasswordSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isNewPasswordSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang xử lý...
                    </span>
                  ) : (
                    "Đặt lại mật khẩu"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
