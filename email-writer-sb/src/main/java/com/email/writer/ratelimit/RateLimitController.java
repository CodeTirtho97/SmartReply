package com.email.writer.ratelimit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/rate-limit")
@CrossOrigin(origins = "*")
public class RateLimitController {

    private static final Logger logger = LoggerFactory.getLogger(RateLimitController.class);

    @Autowired
    private RateLimitingService rateLimitingService;

    @GetMapping("/check")
    public ResponseEntity<Map<String, Object>> checkRateLimit(HttpServletRequest request) {
        String clientIp = extractClientIp(request);
        logger.debug("Rate limit check for IP: {}", clientIp);

        try {
            Map<String, Object> response = rateLimitingService.getUsageInfo(clientIp);
            response.put("success", true);
            response.put("clientIp", clientIp); // For debugging

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error checking rate limit for IP: {}", clientIp, e);

            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Unable to check rate limit");
            errorResponse.put("currentUsage", 0);
            errorResponse.put("remainingCalls", 5);
            errorResponse.put("maxCalls", 5);
            errorResponse.put("canMakeCall", true);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/consume")
    public ResponseEntity<Map<String, Object>> consumeRateLimit(HttpServletRequest request) {
        String clientIp = extractClientIp(request);
        logger.info("Rate limit consumption request from IP: {}", clientIp);

        try {
            if (!rateLimitingService.isAllowed(clientIp)) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("error", "Rate limit exceeded");
                response.put("message", "Daily API limit reached. Please try again tomorrow or install our Chrome extension for more usage.");
                response.putAll(rateLimitingService.getUsageInfo(clientIp));

                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(response);
            }

            // Record the usage
            rateLimitingService.recordUsage(clientIp);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Rate limit consumed successfully");
            response.putAll(rateLimitingService.getUsageInfo(clientIp));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error consuming rate limit for IP: {}", clientIp, e);

            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Internal server error");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getRateLimitStatus(HttpServletRequest request) {
        String clientIp = extractClientIp(request);

        try {
            Map<String, Object> response = rateLimitingService.getUsageInfo(clientIp);
            response.put("success", true);
            response.put("clientIp", clientIp);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error getting rate limit status for IP: {}", clientIp, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // FIXED: Enhanced IP extraction that works across incognito/regular browsers
    private String extractClientIp(HttpServletRequest request) {
        // Try X-Forwarded-For header first (for reverse proxies)
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty() && !"unknown".equalsIgnoreCase(xForwardedFor)) {
            // X-Forwarded-For can contain multiple IPs, take the first one
            String ip = xForwardedFor.split(",")[0].trim();
            if (isValidIp(ip)) {
                logger.debug("Using X-Forwarded-For IP: {}", ip);
                return ip;
            }
        }

        // Try X-Real-IP header
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty() && !"unknown".equalsIgnoreCase(xRealIp)) {
            if (isValidIp(xRealIp)) {
                logger.debug("Using X-Real-IP: {}", xRealIp);
                return xRealIp;
            }
        }

        // Try other common proxy headers
        String[] proxyHeaders = {
                "X-Forwarded",
                "Forwarded-For",
                "Forwarded",
                "X-Cluster-Client-IP",
                "X-Real-IP",
                "Proxy-Client-IP",
                "WL-Proxy-Client-IP",
                "HTTP_X_FORWARDED_FOR",
                "HTTP_X_FORWARDED",
                "HTTP_X_CLUSTER_CLIENT_IP",
                "HTTP_CLIENT_IP",
                "HTTP_FORWARDED_FOR",
                "HTTP_FORWARDED",
                "HTTP_VIA",
                "REMOTE_ADDR"
        };

        for (String header : proxyHeaders) {
            String ip = request.getHeader(header);
            if (ip != null && !ip.isEmpty() && !"unknown".equalsIgnoreCase(ip)) {
                if (isValidIp(ip)) {
                    logger.debug("Using {} header IP: {}", header, ip);
                    return ip;
                }
            }
        }

        // Get remote address as fallback
        String remoteAddr = request.getRemoteAddr();

        // Handle localhost/development scenarios - USE ACTUAL IP
        if ("127.0.0.1".equals(remoteAddr) || "0:0:0:0:0:0:0:1".equals(remoteAddr) || "::1".equals(remoteAddr)) {
            // For development, try to get the actual local machine IP
            String actualIp = getActualLocalIp();
            if (actualIp != null) {
                logger.debug("Using actual local IP for development: {}", actualIp);
                return actualIp;
            }

            // Fallback to a consistent localhost identifier
            String localhostIp = "localhost-127.0.0.1";
            logger.debug("Using consistent localhost IP: {}", localhostIp);
            return localhostIp;
        }

        if (isValidIp(remoteAddr)) {
            logger.debug("Using remote address: {}", remoteAddr);
            return remoteAddr;
        }

        // Ultimate fallback
        logger.warn("Could not determine client IP, using fallback");
        return "unknown-" + System.currentTimeMillis() % 1000000; // This ensures some uniqueness but not per-session
    }

    // Helper method to validate IP addresses
    private boolean isValidIp(String ip) {
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            return false;
        }

        // Remove any port numbers
        if (ip.contains(":") && !ip.startsWith("[")) { // IPv4 with port
            ip = ip.substring(0, ip.lastIndexOf(":"));
        }

        // Basic IP validation (IPv4)
        String[] parts = ip.split("\\.");
        if (parts.length == 4) {
            try {
                for (String part : parts) {
                    int num = Integer.parseInt(part);
                    if (num < 0 || num > 255) return false;
                }
                return true;
            } catch (NumberFormatException e) {
                return false;
            }
        }

        // For IPv6 or other formats, accept if it's not obviously invalid
        return !ip.equalsIgnoreCase("unknown") && ip.length() > 3;
    }

    // Method to get actual local machine IP (for development)
    private String getActualLocalIp() {
        try {
            java.net.InetAddress localHost = java.net.InetAddress.getLocalHost();
            String hostAddress = localHost.getHostAddress();

            // Skip loopback addresses
            if (!hostAddress.startsWith("127.") && !hostAddress.equals("::1")) {
                return hostAddress;
            }

            // Try to get the first non-loopback address
            java.util.Enumeration<java.net.NetworkInterface> interfaces =
                    java.net.NetworkInterface.getNetworkInterfaces();

            while (interfaces.hasMoreElements()) {
                java.net.NetworkInterface networkInterface = interfaces.nextElement();
                if (networkInterface.isLoopback() || !networkInterface.isUp()) {
                    continue;
                }

                java.util.Enumeration<java.net.InetAddress> addresses = networkInterface.getInetAddresses();
                while (addresses.hasMoreElements()) {
                    java.net.InetAddress address = addresses.nextElement();
                    if (!address.isLoopbackAddress() &&
                            !address.isLinkLocalAddress() &&
                            address instanceof java.net.Inet4Address) {
                        return address.getHostAddress();
                    }
                }
            }
        } catch (Exception e) {
            logger.debug("Could not determine actual local IP: {}", e.getMessage());
        }
        return null;
    }

    // Debug endpoint to show what IP is being detected
    @GetMapping("/debug-ip")
    public ResponseEntity<Map<String, Object>> debugIp(HttpServletRequest request) {
        Map<String, Object> debug = new HashMap<>();

        debug.put("detectedIp", extractClientIp(request));
        debug.put("remoteAddr", request.getRemoteAddr());
        debug.put("xForwardedFor", request.getHeader("X-Forwarded-For"));
        debug.put("xRealIp", request.getHeader("X-Real-IP"));
        debug.put("userAgent", request.getHeader("User-Agent"));
        debug.put("sessionId", request.getSession().getId());

        // Add all headers for debugging
        Map<String, String> headers = new HashMap<>();
        java.util.Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            headers.put(headerName, request.getHeader(headerName));
        }
        debug.put("allHeaders", headers);

        return ResponseEntity.ok(debug);
    }
}