package com.email.writer.ratelimit;

import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.HashMap;

@Service
public class RateLimitingService {

    private static final Logger logger = LoggerFactory.getLogger(RateLimitingService.class);
    private static final int DEFAULT_DAILY_LIMIT = 5;

    private final Map<String, UserUsageData> usageTracker = new ConcurrentHashMap<>();

    public static class UserUsageData {
        private int callCount;
        private LocalDate lastResetDate;
        private LocalDateTime lastCallTime;

        public UserUsageData() {
            this.callCount = 0;
            this.lastResetDate = LocalDate.now();
            this.lastCallTime = LocalDateTime.now();
        }

        // Getters and setters
        public int getCallCount() { return callCount; }
        public void setCallCount(int callCount) { this.callCount = callCount; }
        public LocalDate getLastResetDate() { return lastResetDate; }
        public void setLastResetDate(LocalDate lastResetDate) { this.lastResetDate = lastResetDate; }
        public LocalDateTime getLastCallTime() { return lastCallTime; }
        public void setLastCallTime(LocalDateTime lastCallTime) { this.lastCallTime = lastCallTime; }
    }

    public boolean isAllowed(String identifier) {
        UserUsageData userData = getUserData(identifier);
        resetIfNewDay(userData);
        return userData.getCallCount() < DEFAULT_DAILY_LIMIT;
    }

    public void recordUsage(String identifier) {
        UserUsageData userData = getUserData(identifier);
        resetIfNewDay(userData);
        userData.setCallCount(userData.getCallCount() + 1);
        userData.setLastCallTime(LocalDateTime.now());
        logger.info("Usage recorded for {}: {}/{}", identifier, userData.getCallCount(), DEFAULT_DAILY_LIMIT);
    }

    public Map<String, Object> getUsageInfo(String identifier) {
        UserUsageData userData = getUserData(identifier);
        resetIfNewDay(userData);

        Map<String, Object> info = new HashMap<>();
        info.put("currentUsage", userData.getCallCount());
        info.put("remainingCalls", Math.max(0, DEFAULT_DAILY_LIMIT - userData.getCallCount()));
        info.put("maxCalls", DEFAULT_DAILY_LIMIT);
        info.put("canMakeCall", userData.getCallCount() < DEFAULT_DAILY_LIMIT);
        info.put("lastCallTime", userData.getLastCallTime());
        info.put("resetDate", userData.getLastResetDate());

        return info;
    }

    private UserUsageData getUserData(String identifier) {
        return usageTracker.computeIfAbsent(identifier, k -> new UserUsageData());
    }

    private void resetIfNewDay(UserUsageData userData) {
        LocalDate today = LocalDate.now();
        if (!userData.getLastResetDate().equals(today)) {
            userData.setCallCount(0);
            userData.setLastResetDate(today);
        }
    }

    @Scheduled(fixedRate = 3600000) // Clean up every hour
    public void cleanup() {
        LocalDate cutoff = LocalDate.now().minusDays(2);
        int before = usageTracker.size();
        usageTracker.entrySet().removeIf(entry ->
                entry.getValue().getLastResetDate().isBefore(cutoff));
        int after = usageTracker.size();
        if (before != after) {
            logger.info("Cleaned up {} old usage records", before - after);
        }
    }
}