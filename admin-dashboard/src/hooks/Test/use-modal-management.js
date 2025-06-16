"use client";

import { useState, useEffect, useRef } from "react";

export const useModalManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteTestModalOpen, setIsDeleteTestModalOpen] = useState(false);
  const [isDeleteTestSetModalOpen, setIsDeleteTestSetModalOpen] =
    useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedTestSet, setSelectedTestSet] = useState(null);

  const modalRef = useRef(null);

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteTestModalOpen(false);
    setIsDeleteTestSetModalOpen(false);
    setSelectedTest(null);
    setSelectedTestSet(null);
  };

  // Handle click outside modals
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeAllModals();
      }
    }

    const isAnyModalOpen =
      isModalOpen ||
      isViewModalOpen ||
      isEditModalOpen ||
      isDeleteTestModalOpen ||
      isDeleteTestSetModalOpen;

    if (isAnyModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    isModalOpen,
    isViewModalOpen,
    isEditModalOpen,
    isDeleteTestModalOpen,
    isDeleteTestSetModalOpen,
  ]);

  return {
    // Modal states
    isModalOpen,
    setIsModalOpen,
    isViewModalOpen,
    setIsViewModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteTestModalOpen,
    setIsDeleteTestModalOpen,
    isDeleteTestSetModalOpen,
    setIsDeleteTestSetModalOpen,

    // Selected items
    selectedTest,
    setSelectedTest,
    selectedTestSet,
    setSelectedTestSet,

    // Ref and actions
    modalRef,
    closeAllModals,
  };
};
