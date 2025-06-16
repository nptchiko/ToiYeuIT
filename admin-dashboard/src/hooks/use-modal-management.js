"use client";

import { useState } from "react";

export const useModalManagement = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (modalType, user = null) => {
    setActiveModal(modalType);
    setSelectedUser(user);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedUser(null);
  };

  return {
    activeModal,
    selectedUser,
    openModal,
    closeModal,
  };
};
