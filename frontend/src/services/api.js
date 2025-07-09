import axios from "axios";

const api = axios.create({
  baseURL: "http://13.127.111.111:8080/api", // Your live AWS backend
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
      // FIXED: Changed from "/email/generate" to "/email/generate-reply"
      const response = await api.post("/email/generate-reply", emailData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 429) {
        throw new Error(
          "Daily limit reached. Please try again tomorrow or install our Chrome extension for unlimited usage."
        );
      }
      throw new Error(
        error.response?.data?.error ||
          error.message ||
          "Failed to generate email reply"
      );
    }
  },

  getUsage: async () => {
    try {
      // FIXED: Changed from "/email/usage" to "/rate-limit/check"
      const response = await api.get("/rate-limit/check");
      return {
        currentUsage: response.data.currentUsage || 0,
        remainingCalls: response.data.remainingCalls || 5,
        maxCalls: response.data.maxCalls || 5,
        canMakeCall: response.data.canMakeCall || true,
      };
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

  // ADDED: New method to get supported tones
  getSupportedTones: async () => {
    try {
      const response = await api.get("/email/supported-tones");
      return response.data;
    } catch (error) {
      console.error("Error fetching supported tones:", error);
      return {
        success: true,
        tones: {
          professional: "Professional, courteous, and business-appropriate",
          casual: "Casual, relaxed, and informal",
          friendly: "Warm, friendly, and approachable",
          formal: "Very formal, respectful, and traditional",
          concise: "Brief, direct, and to-the-point",
        },
        default: "professional",
      };
    }
  },

  // ADDED: Health check method
  healthCheck: async () => {
    try {
      const response = await api.get("/email/health");
      return response.data;
    } catch (error) {
      console.error("Health check failed:", error);
      throw error;
    }
  },
};

export default api;
