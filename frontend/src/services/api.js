import axios from "axios";

// TEMPORARY: Use direct backend URL to bypass proxy issues
const api = axios.create({
  baseURL: "http://13.127.111.111:8080/api", // Direct to AWS backend
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(
      "Making API request:",
      config.method?.toUpperCase(),
      config.url
    );
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor with better error handling
api.interceptors.response.use(
  (response) => {
    console.log("API response received:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("API Error Details:", {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });

    // Handle specific error types
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout. Please try again.");
    }

    if (error.code === "ERR_NETWORK") {
      throw new Error("Network error. Please check your internet connection.");
    }

    if (error.response?.status === 0) {
      throw new Error(
        "Network error. Please check if the backend server is running."
      );
    }

    if (error.response?.status >= 500) {
      throw new Error("Server error. Please try again later.");
    }

    if (error.response?.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    // Default error
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "An unexpected error occurred"
    );
  }
);

export const emailService = {
  generateReply: async (emailData) => {
    try {
      console.log("Generating reply with data:", emailData);

      // Ensure the request format matches backend expectations
      const requestBody = {
        emailContent: emailData.emailContent,
        tone: emailData.tone || "professional",
        customPrompt: emailData.customPrompt || "",
      };

      console.log("Sending formatted request:", requestBody);
      const response = await api.post("/email/generate-reply", requestBody);
      return response.data;
    } catch (error) {
      console.error("Generate reply error:", error);
      console.error("Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
      throw error;
    }
  },

  getUsage: async () => {
    try {
      console.log("Fetching usage stats...");
      const response = await api.get("/rate-limit/check");
      console.log("Usage response:", response.data);

      return {
        currentUsage: response.data.currentUsage || 0,
        remainingCalls: response.data.remainingCalls || 5,
        maxCalls: response.data.maxCalls || 5,
        canMakeCall: response.data.canMakeCall !== false,
      };
    } catch (error) {
      console.error("Error fetching usage:", error);

      // Return default values when rate limit endpoint fails
      return {
        currentUsage: 0,
        remainingCalls: 5,
        maxCalls: 5,
        canMakeCall: true,
      };
    }
  },

  healthCheck: async () => {
    try {
      console.log("Performing health check...");
      const response = await api.get("/email/health");
      console.log("Health check response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Health check failed:", error);
      throw error;
    }
  },
};

export default api;
