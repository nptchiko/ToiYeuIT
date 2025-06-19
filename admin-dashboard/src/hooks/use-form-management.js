import { GENDER_DISPLAY, USER_ROLES } from "../Constants/user-constants";
import { useState } from "react";

export const useFormManagement = () => {
  const [editFormData, setEditFormData] = useState({
    name: "",
    role: "",
    status: "",
    phone: "",
    gender: "",
    rawGender: "",
  });

  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: USER_ROLES.USER,
    phone: "",
    gender: GENDER_DISPLAY.MALE,
  });

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prev) => ({ ...prev, [name]: value }));
  };

  const resetEditForm = () => {
    setEditFormData({
      name: "",
      role: "",
      status: "",
      phone: "",
      gender: "",
      rawGender: "",
    });
  };

  const resetNewUserForm = () => {
    setNewUserData({
      username: "",
      email: "",
      password: "",
      role: USER_ROLES.USER,
      phone: "",
      gender: GENDER_DISPLAY.MALE,
    });
  };

  const setEditFormFromUser = (user) => {
    const rawGender =
      user.rawGender ||
      (user.gender === GENDER_DISPLAY.MALE
        ? "m"
        : user.gender === GENDER_DISPLAY.FEMALE
        ? "f"
        : user.gender);

    setEditFormData({
      name: user.name,
      role: user.role,
      status: user.status,
      phone: user.phone,
      gender: user.gender,
      rawGender: rawGender,
    });
  };

  return {
    editFormData,
    newUserData,
    handleEditInputChange,
    handleNewUserInputChange,
    resetEditForm,
    resetNewUserForm,
    setEditFormFromUser,
  };
};
