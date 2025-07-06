package com.email.writer;

import lombok.Data;

@Data
public class ApiUsageResponse {
    private int currentUsage;
    private int remainingCalls;
    private int maxCalls;
    private boolean canMakeCall;

    public ApiUsageResponse(int currentUsage, int remainingCalls, int maxCalls, boolean canMakeCall) {
        this.currentUsage = currentUsage;
        this.remainingCalls = remainingCalls;
        this.maxCalls = maxCalls;
        this.canMakeCall = canMakeCall;
    }
}