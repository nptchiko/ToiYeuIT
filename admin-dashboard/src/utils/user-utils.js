import {
  GENDER_DISPLAY,
  GENDER_API,
  USER_STATUS,
} from "../Constants/user-constants";

export const formatGender = (gender) => {
  if (gender === GENDER_API.MALE) return GENDER_DISPLAY.MALE;
  if (gender === GENDER_API.FEMALE) return GENDER_DISPLAY.FEMALE;
  return gender;
};

export const convertGenderToApi = (displayGender) => {
  if (displayGender === GENDER_DISPLAY.MALE) return GENDER_API.MALE;
  if (displayGender === GENDER_DISPLAY.FEMALE) return GENDER_API.FEMALE;
  return displayGender;
};

export const convertStatusToApi = (displayStatus) => {
  return displayStatus === USER_STATUS.ACTIVE;
};

export const convertStatusFromApi = (apiStatus) => {
  return apiStatus ? USER_STATUS.ACTIVE : USER_STATUS.INACTIVE;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  return /^\d{10}$/.test(phone);
};

export const generateMockUsers = (pageSize, currentPage) => {
  return Array(pageSize)
    .fill(0)
    .map((_, index) => ({
      id: (currentPage - 1) * pageSize + index + 1,
      name: `Người dùng ${(currentPage - 1) * pageSize + index + 1}`,
      email: `user${(currentPage - 1) * pageSize + index + 1}@example.com`,
      role: "USER",
      status: index % 5 === 0 ? USER_STATUS.INACTIVE : USER_STATUS.ACTIVE,
      registrationDate: new Date().toLocaleDateString("vi-VN"),
      phone: `098765432${index % 10}`,
      gender: index % 2 === 0 ? GENDER_DISPLAY.MALE : GENDER_DISPLAY.FEMALE,
      rawGender: index % 2 === 0 ? GENDER_API.MALE : GENDER_API.FEMALE,
      avatar: "/placeholder.svg?height=40&width=40",
    }));
};

export const generatePaginationNumbers = (currentPage, totalPages) => {
  const pages = [];
  const maxPagesToShow = 5;

  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 3; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
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
