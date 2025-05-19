import {
  Bell,
  X,
  Check,
  Info,
  AlertCircle,
  CheckCheck,
  Clock,
  Trash2,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New user registered",
      message: "A new user has registered to the platform",
      time: "5 minutes ago",
      read: false,
      type: "info",
    },
    {
      id: "2",
      title: "Test completed",
      message: "User John Doe has completed Test #123",
      time: "1 hour ago",
      read: false,
      type: "success",
    },
    {
      id: "3",
      title: "System update",
      message: "The system will be updated tonight at 2:00 AM",
      time: "3 hours ago",
      read: true,
      type: "warning",
    },
    {
      id: "4",
      title: "Error detected",
      message: "An error occurred while processing the request",
      time: "1 day ago",
      read: true,
      type: "error",
    },
  ]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isNotificationHovered, setIsNotificationHovered] = useState(null);

  const dropdownRef = useRef(null);
  const bellRef = useRef(null);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  // Filter notifications based on active filter
  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !notification.read;
    return notification.type === activeFilter;
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !bellRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Add bell animation effect
  useEffect(() => {
    if (unreadCount > 0 && !isOpen) {
      const interval = setInterval(() => {
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 1000);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [unreadCount, isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (id) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setNotifications(
        notifications.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
      setIsLoading(false);
    }, 300);
  };

  const markAllAsRead = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setNotifications(
        notifications.map((notification) => ({ ...notification, read: true }))
      );
      setIsLoading(false);
    }, 500);
  };

  const removeNotification = (id) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setNotifications(
        notifications.filter((notification) => notification.id !== id)
      );
      setIsLoading(false);
    }, 300);
  };

  const clearAllNotifications = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setNotifications([]);
      setIsLoading(false);
    }, 500);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "info":
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 shadow-sm shadow-blue-200 dark:shadow-blue-900/10">
            <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          </div>
        );
      case "success":
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 shadow-sm shadow-green-200 dark:shadow-green-900/10">
            <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
          </div>
        );
      case "warning":
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 shadow-sm shadow-amber-200 dark:shadow-amber-900/10">
            <AlertTriangle className="h-5 w-5 text-amber-500 dark:text-amber-400" />
          </div>
        );
      case "error":
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 shadow-sm shadow-rose-200 dark:shadow-rose-900/10">
            <AlertCircle className="h-5 w-5 text-rose-500 dark:text-rose-400" />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 shadow-sm shadow-blue-200 dark:shadow-blue-900/10">
            <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          </div>
        );
    }
  };

  const getNotificationBackground = (type, read) => {
    if (read) return "";

    switch (type) {
      case "info":
        return "bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent";
      case "success":
        return "bg-gradient-to-r from-green-50 to-transparent dark:from-green-900/10 dark:to-transparent";
      case "warning":
        return "bg-gradient-to-r from-amber-50 to-transparent dark:from-amber-900/10 dark:to-transparent";
      case "error":
        return "bg-gradient-to-r from-rose-50 to-transparent dark:from-rose-900/10 dark:to-transparent";
      default:
        return "bg-gradient-to-r from-primary/5 to-transparent";
    }
  };

  const getNotificationBorderColor = (type, read) => {
    if (read) return "";

    switch (type) {
      case "info":
        return "border-l-4 border-blue-400";
      case "success":
        return "border-l-4 border-green-400";
      case "warning":
        return "border-l-4 border-amber-400";
      case "error":
        return "border-l-4 border-rose-400";
      default:
        return "border-l-4 border-primary";
    }
  };

  return (
    <div className="relative" aria-label="Notifications">
      <button
        ref={bellRef}
        className={`p-2.5 rounded-full hover:bg-secondary/20 hover:scale-105 dark:hover:bg-secondary/30 text-foreground relative transition-all duration-300 ${
          isOpen
            ? "bg-primary/10 dark:bg-primary/20 ring-2 ring-primary/20 dark:ring-primary/30 shadow-lg"
            : ""
        }`}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Notifications ${
          unreadCount > 0 ? `(${unreadCount} unread)` : ""
        }`}
      >
        <Bell
          className={`h-5 w-5 ${showAnimation ? "animate-bell-ring" : ""}`}
        />
        {unreadCount > 0 && (
          <>
            <span className="absolute top-1 right-1 w-3 h-3 bg-gradient-to-br from-rose-400 to-red-500 rounded-full animate-pulse shadow-md shadow-rose-500/30"></span>
            {unreadCount > 1 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-br from-rose-400 to-red-500 text-[10px] text-white rounded-full h-5 min-w-5 flex items-center justify-center px-1.5 font-medium shadow-lg shadow-rose-500/30 ring-2 ring-background">
                {unreadCount}
              </span>
            )}
          </>
        )}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-96 bg-background border border-border rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-5 duration-300"
          role="menu"
          style={{
            boxShadow:
              "0 10px 40px -5px rgba(0, 0, 0, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="p-4 border-b border-border flex justify-between items-center bg-gradient-to-r from-primary/5 via-primary/3 to-transparent">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-200 hover:shadow-md hover:shadow-primary/10 hover:scale-105"
                  disabled={isLoading}
                  aria-label="Mark all as read"
                >
                  {isLoading ? (
                    <Clock className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <CheckCheck className="h-3.5 w-3.5" />
                  )}
                  <span className="font-medium">Mark all read</span>
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="text-xs bg-muted hover:bg-muted/80 hover:text-destructive p-2 rounded-full flex items-center gap-1 transition-all duration-200 hover:shadow-md hover:shadow-destructive/10 hover:scale-105"
                  disabled={isLoading}
                  aria-label="Clear all notifications"
                  title="Clear all notifications"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex border-b border-border bg-muted/30">
            <button
              onClick={() => setActiveFilter("all")}
              className={`flex-1 py-2.5 text-xs font-medium transition-all duration-200 ${
                activeFilter === "all"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("unread")}
              className={`flex-1 py-2.5 text-xs font-medium transition-all duration-200 ${
                activeFilter === "unread"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className="ml-1.5 bg-primary text-primary-foreground rounded-full text-[10px] px-1.5 py-0.5 font-bold shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveFilter("info")}
              className={`flex-1 py-2.5 text-xs font-medium transition-all duration-200 ${
                activeFilter === "info"
                  ? "text-blue-500 border-b-2 border-blue-500 bg-blue-50 dark:bg-blue-900/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              Info
            </button>
            <button
              onClick={() => setActiveFilter("error")}
              className={`flex-1 py-2.5 text-xs font-medium transition-all duration-200 ${
                activeFilter === "error"
                  ? "text-rose-500 border-b-2 border-rose-500 bg-rose-50 dark:bg-rose-900/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              Alerts
            </button>
          </div>

          <div className="max-h-[450px] overflow-y-auto">
            {isLoading && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="h-8 w-8 border-3 border-primary border-t-transparent rounded-full animate-spin shadow-md"></div>
              </div>
            )}

            {filteredNotifications.length > 0 ? (
              <div>
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-border transition-all duration-300 flex gap-4 ${
                      isNotificationHovered === notification.id
                        ? "bg-muted/50"
                        : "hover:bg-muted/30"
                    } ${getNotificationBackground(
                      notification.type,
                      notification.read
                    )} ${getNotificationBorderColor(
                      notification.type,
                      notification.read
                    )}`}
                    onMouseEnter={() =>
                      setIsNotificationHovered(notification.id)
                    }
                    onMouseLeave={() => setIsNotificationHovered(null)}
                  >
                    <div
                      className={`${
                        !notification.read ? "animate-bounce-once" : ""
                      }`}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p
                          className={`font-semibold text-sm ${
                            !notification.read
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {notification.title}
                        </p>
                        <div
                          className={`flex items-center gap-1 ml-2 flex-shrink-0 transition-opacity duration-300 ${
                            isNotificationHovered === notification.id
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        >
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-muted-foreground hover:text-primary p-1.5 rounded-full hover:bg-primary/10 transition-all duration-200 hover:shadow-sm hover:scale-110"
                              aria-label="Mark as read"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="text-muted-foreground hover:text-destructive p-1.5 rounded-full hover:bg-destructive/10 transition-all duration-200 hover:shadow-sm hover:scale-110"
                            aria-label="Remove notification"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        {notification.message}
                      </p>
                      <div className="flex items-center mt-3">
                        <Clock className="h-3 w-3 text-muted-foreground mr-1.5" />
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 px-12 text-center text-muted-foreground flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4 shadow-inner">
                  <MessageSquare className="h-10 w-10 text-muted-foreground/40" />
                </div>
                <p className="text-sm font-medium">No notifications</p>
                <p className="text-xs mt-2 max-w-[250px] text-muted-foreground/80">
                  {activeFilter !== "all"
                    ? `No ${activeFilter} notifications found`
                    : "You're all caught up!"}
                </p>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-border bg-gradient-to-r from-muted/50 to-transparent flex justify-between items-center">
            <span className="text-xs text-muted-foreground pl-2">
              {filteredNotifications.length} notification
              {filteredNotifications.length !== 1 ? "s" : ""}
            </span>
            <button className="py-1.5 px-3 text-xs text-center text-primary hover:text-primary hover:bg-primary/5 rounded-md transition-all duration-200 font-medium">
              View all
            </button>
          </div>
        </div>
      )}

      {/* Custom animations */}
      <style jsx>{`
        @keyframes bounce-once {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-bounce-once {
          animation: bounce-once 0.5s cubic-bezier(0.28, 0.84, 0.42, 1);
        }

        @keyframes bell-ring {
          0%,
          100% {
            transform: rotate(0);
          }
          20% {
            transform: rotate(15deg);
          }
          40% {
            transform: rotate(-15deg);
          }
          60% {
            transform: rotate(7deg);
          }
          80% {
            transform: rotate(-7deg);
          }
        }
        .animate-bell-ring {
          animation: bell-ring 1s cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }
      `}</style>
    </div>
  );
}
