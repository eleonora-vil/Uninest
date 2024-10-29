import api from "../../config/axios";

const userService = {
  getUserProfile: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    return api.get("/api/User/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  updateProfile: async (userData) => {
    return api.put("/api/User/update-profile", userData);
  },

  changePassword: async (passwordData) => {
    return api.put("/api/User/change-password", passwordData);
  },

  updateUserImage: async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await api.put("/api/User/UpdateUserImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default userService;
