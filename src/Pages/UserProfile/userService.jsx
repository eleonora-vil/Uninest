import api from "../../config/axios"; // Assuming the file you provided is named api.js

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
};

export default userService;
