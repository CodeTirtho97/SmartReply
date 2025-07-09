import axios from "axios";

const api = axios.create({
  baseURL: "http://13.127.111.111:8080/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log("Making API request:", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error);
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout. Please try again.");
    }
    if (error.response?.status >= 500) {
      throw new Error("Server error. Please try again later.");
    }
    throw error;
  }
);

export const emailService = {
  generateReply: async (emailData) => {
    try {
      const response = await api.post("/email/generate", emailData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 429) {
        throw new Error(
          "Daily limit reached. Please try again tomorrow or install our Chrome extension for unlimited usage."
        );
      }
      throw new Error(
        error.response?.data ||
          error.message ||
          "Failed to generate email reply"
      );
    }
  },

  getUsage: async () => {
    try {
      const response = await api.get("/email/usage");
      return response.data;
    } catch (error) {
      console.error("Error fetching usage:", error);
      return {
        currentUsage: 0,
        remainingCalls: 5,
        maxCalls: 5,
        canMakeCall: true,
      };
    }
  },
};

export default api;
