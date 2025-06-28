// Storage utilities for API usage tracking
const STORAGE_KEYS = {
  API_USAGE: "smartreply_api_usage",
  LAST_RESET: "smartreply_last_reset",
};

const MAX_API_CALLS = 5;
const RESET_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const getApiUsage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.API_USAGE);
    const lastReset = localStorage.getItem(STORAGE_KEYS.LAST_RESET);

    // Check if we need to reset the counter (24 hours passed)
    if (lastReset) {
      const timeSinceReset = Date.now() - parseInt(lastReset);
      if (timeSinceReset > RESET_INTERVAL) {
        resetApiUsage();
        return 0;
      }
    }

    return stored ? parseInt(stored) : 0;
  } catch (error) {
    console.error("Error getting API usage:", error);
    return 0;
  }
};

export const incrementApiUsage = () => {
  try {
    const currentUsage = getApiUsage();
    const newUsage = currentUsage + 1;
    localStorage.setItem(STORAGE_KEYS.API_USAGE, newUsage.toString());

    // Set last reset time if not set
    if (!localStorage.getItem(STORAGE_KEYS.LAST_RESET)) {
      localStorage.setItem(STORAGE_KEYS.LAST_RESET, Date.now().toString());
    }

    return newUsage;
  } catch (error) {
    console.error("Error incrementing API usage:", error);
    return getApiUsage();
  }
};

export const resetApiUsage = () => {
  try {
    localStorage.setItem(STORAGE_KEYS.API_USAGE, "0");
    localStorage.setItem(STORAGE_KEYS.LAST_RESET, Date.now().toString());
  } catch (error) {
    console.error("Error resetting API usage:", error);
  }
};

export const canMakeApiCall = () => {
  return getApiUsage() < MAX_API_CALLS;
};

export const getRemainingCalls = () => {
  return Math.max(0, MAX_API_CALLS - getApiUsage());
};

export const getTimeUntilReset = () => {
  try {
    const lastReset = localStorage.getItem(STORAGE_KEYS.LAST_RESET);
    if (!lastReset) return null;

    const timeSinceReset = Date.now() - parseInt(lastReset);
    const timeUntilReset = RESET_INTERVAL - timeSinceReset;

    return timeUntilReset > 0 ? timeUntilReset : 0;
  } catch (error) {
    console.error("Error calculating time until reset:", error);
    return null;
  }
};

export { MAX_API_CALLS };
