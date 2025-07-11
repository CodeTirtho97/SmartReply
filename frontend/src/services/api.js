import axios from "axios";

// Get API URL from environment variables or use default
const getApiBaseURL = () => {
  // Check for Vite environment variables
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Default to production Render backend
  return "https://smartreply-v1-backend.onrender.com/api";
};

const api = axios.create({
  baseURL: getApiBaseURL(),
  timeout: import.meta.env.VITE_API_TIMEOUT || 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Log the API URL being used
console.log("API Base URL:", getApiBaseURL());
console.log("Environment:", import.meta.env.MODE);

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(
      "Making API request:",
      config.method?.toUpperCase(),
      config.url,
      "to",
      config.baseURL
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
      baseURL: error.config?.baseURL,
    });

    // Handle specific error types
    if (error.code === "ECONNABORTED") {
      throw new Error(
        "Request timeout. The server might be sleeping. Please try again in a moment."
      );
    }

    if (error.code === "ERR_NETWORK") {
      throw new Error("Network error. Please check your internet connection.");
    }

    if (error.response?.status === 0) {
      throw new Error(
        "Network error. The backend server might be starting up. Please wait a moment and try again."
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

      const requestBody = {
        emailContent: emailData.emailContent,
        tone: emailData.tone || "professional",
        customPrompt: emailData.customPrompt || "",
      };

      console.log("Sending formatted request:", requestBody);
      const response = await api.post("/email/generate-reply", requestBody);

      // The response now includes usage information automatically
      console.log(
        "Reply generated successfully with usage info:",
        response.data
      );
      return response.data;
    } catch (error) {
      console.error("Generate reply error:", error);

      // Handle rate limit errors specifically
      if (error.response?.status === 429) {
        throw new Error(
          error.response.data.message ||
            "Rate limit exceeded. Please try again tomorrow."
        );
      }

      throw error;
    }
  },

  getUsage: async () => {
    try {
      console.log("Fetching usage stats...");

      // Use the new dedicated usage endpoint
      const response = await api.get("/email/usage");
      console.log("Usage response:", response.data);

      return {
        currentUsage: response.data.currentUsage || 0,
        remainingCalls: response.data.remainingCalls || 5,
        maxCalls: response.data.maxCalls || 5,
        canMakeCall: response.data.canMakeCall !== false,
        success: response.data.success,
      };
    } catch (error) {
      console.error("Error fetching usage:", error);

      // Return default values when usage endpoint fails
      return {
        currentUsage: 0,
        remainingCalls: 5,
        maxCalls: 5,
        canMakeCall: true,
        success: false,
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

  // Test the rate limiting system
  testRateLimit: async () => {
    try {
      console.log("Testing rate limit...");
      const response = await api.get("/rate-limit/check");
      console.log("Rate limit test response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Rate limit test failed:", error);
      throw error;
    }
  },
};

export default api;
