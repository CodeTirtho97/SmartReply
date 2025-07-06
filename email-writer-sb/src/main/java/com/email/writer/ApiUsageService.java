package com.email.writer;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ApiUsageService {

    private static final int MAX_CALLS_PER_DAY = 5;
    private final Map<String, IpUsageData> ipUsageMap = new ConcurrentHashMap<>();

    public static class IpUsageData {
        private int callCount;
        private LocalDate lastResetDate;

        public IpUsageData() {
            this.callCount = 0;
            this.lastResetDate = LocalDate.now();
        }

        // Getters and setters
        public int getCallCount() { return callCount; }
        public void setCallCount(int callCount) { this.callCount = callCount; }
        public LocalDate getLastResetDate() { return lastResetDate; }
        public void setLastResetDate(LocalDate lastResetDate) { this.lastResetDate = lastResetDate; }
    }

    public boolean canMakeApiCall(String ipAddress) {
        IpUsageData usageData = getOrCreateUsageData(ipAddress);
        resetIfNewDay(usageData);
        return usageData.getCallCount() < MAX_CALLS_PER_DAY;
    }

    public void incrementUsage(String ipAddress) {
        IpUsageData usageData = getOrCreateUsageData(ipAddress);
        resetIfNewDay(usageData);
        usageData.setCallCount(usageData.getCallCount() + 1);
    }

    public int getRemainingCalls(String ipAddress) {
        IpUsageData usageData = getOrCreateUsageData(ipAddress);
        resetIfNewDay(usageData);
        return Math.max(0, MAX_CALLS_PER_DAY - usageData.getCallCount());
    }

    public int getCurrentUsage(String ipAddress) {
        IpUsageData usageData = getOrCreateUsageData(ipAddress);
        resetIfNewDay(usageData);
        return usageData.getCallCount();
    }

    private IpUsageData getOrCreateUsageData(String ipAddress) {
        return ipUsageMap.computeIfAbsent(ipAddress, k -> new IpUsageData());
    }

    private void resetIfNewDay(IpUsageData usageData) {
        LocalDate today = LocalDate.now();
        if (!usageData.getLastResetDate().equals(today)) {
            usageData.setCallCount(0);
            usageData.setLastResetDate(today);
        }
    }

    // Clean up old entries (optional - run this periodically)
    public void cleanupOldEntries() {
        LocalDate cutoffDate = LocalDate.now().minusDays(2);
        ipUsageMap.entrySet().removeIf(entry ->
                entry.getValue().getLastResetDate().isBefore(cutoffDate));
    }
}