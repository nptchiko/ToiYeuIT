import { USER_STATUS } from "../Constants/user-constants";
import { userService } from "../api/usersAPI";
import {
  convertGenderToApi,
  convertStatusToApi,
  validateEmail,
  validatePhone,
} from "../utils/user-utils";

export class UserCrudService {
  static async updateUser(userId, editFormData, selectedUser) {
    // Validate phone number
    if (editFormData.phone && !validatePhone(editFormData.phone)) {
      throw new Error("Số điện thoại không hợp lệ");
    }

    const genderForBackend =
      convertGenderToApi(editFormData.gender) ||
      editFormData.rawGender ||
      editFormData.gender;
    const statusForBackend = convertStatusToApi(editFormData.status);

    // console.log("heheh", statusForBackend);
    const payload = {
      username: editFormData.name,
      role: editFormData.role,
      phone: editFormData.phone,
      gender: genderForBackend,
      status: statusForBackend,
    };
    // console.log("eyhehehehe", payload);

    try {
      await userService.updateUser(userId, payload);
      console.log("User updated successfully");
    } catch (apiError) {
      console.error("API error:", apiError);
      // Continue updating UI even if API fails
    }

    return {
      ...selectedUser,
      name: editFormData.name,
      role: editFormData.role,
      status: statusForBackend ? USER_STATUS.ACTIVE : USER_STATUS.INACTIVE,
      phone: editFormData.phone,
      gender: editFormData.gender,
      rawGender: genderForBackend,
    };
  }

  static async createUser(newUserData) {
    // Validate form
    if (
      !newUserData.username.trim() ||
      !newUserData.email.trim() ||
      !newUserData.password?.trim()
    ) {
      throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
    }

    // Validate email
    if (!validateEmail(newUserData.email)) {
      throw new Error("Email không hợp lệ");
    }

    // Validate phone number
    if (newUserData.phone && !validatePhone(newUserData.phone)) {
      throw new Error("Số điện thoại không hợp lệ");
    }

    const genderForBackend = convertGenderToApi(newUserData.gender);

    const payload = {
      username: newUserData.username,
      email: newUserData.email,
      password: newUserData.password,
      gender: genderForBackend,
      phone: newUserData.phone || "",
    };

    try {
      const response = await userService.createUser(payload);
      console.log("User added successfully:", response.data);

      let newUserId;
      if (response.data?.body?.id) {
        newUserId = response.data.body.id;
      } else {
        newUserId = Date.now().toString();
      }

      return {
        id: newUserId,
        name: newUserData.username,
        email: newUserData.email,
        role:
          response.data?.body?.role ||
          response.data?.role ||
          newUserData.role ||
          "USER",
        status: USER_STATUS.ACTIVE,
        registrationDate: new Date().toLocaleDateString("vi-VN"),
        phone: newUserData.phone || "",
        gender: newUserData.gender,
        rawGender: genderForBackend,
        avatar: "/placeholder.svg?height=40&width=40",
      };
    } catch (apiError) {
      console.error("API error:", apiError);
      throw new Error("Có lỗi xảy ra khi thêm người dùng mới");
    }
  }

  static async deleteUser(userId) {
    try {
      await userService.deleteUser(userId);
      console.log("User deleted successfully");
    } catch (apiError) {
      console.error("API error:", apiError);
      // Continue updating UI even if API fails
    }
  }
}
