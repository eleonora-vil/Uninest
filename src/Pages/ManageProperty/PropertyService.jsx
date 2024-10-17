// src/services/PropertyService.js
import api from "../../config/axios"; // Assuming the file you provided is named 'api.js'

const PropertyService = {
  getAllHomes: async () => {
    try {
      const response = await api.get("/api/Home/GetAll");
      return response.data;
    } catch (error) {
      console.error("Error fetching homes:", error);
      throw error;
    }
  },

  getHomeById: async (id) => {
    try {
      const response = await api.get(`/api/Home/GetHomeByID?id=${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching home:", error);
      throw error;
    }
  },

  createHome: async (homeData, images) => {
    try {
      const formData = new FormData();
      Object.keys(homeData).forEach((key) => {
        formData.append(key, homeData[key]);
      });
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await api.post("/api/Home/CreateHome", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating home:", error);
      throw error;
    }
  },

  deleteHome: async (id) => {
    try {
      await api.delete(`/api/Home/${id}`);
    } catch (error) {
      console.error("Error deleting home:", error);
      throw error;
    }
  },

  getHomesByUserId: async (userId) => {
    try {
      const response = await api.get(
        `/api/Home/GetHomesByUserId?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching homes by user ID:", error);
      throw error;
    }
  },

  // You can add more methods here as needed
};

export default PropertyService;
