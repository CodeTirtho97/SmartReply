package com.email.writer;

import com.email.writer.ratelimit.RateLimitingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS},
        allowedHeaders = "*"
)
public class EmailGeneratorController {

    private static final Logger logger = LoggerFactory.getLogger(EmailGeneratorController.class);

    @Autowired
    private EmailGeneratorService emailGeneratorService;

    @Autowired
    private RateLimitingService rateLimitingService;

    @PostMapping("/generate-reply")
    public ResponseEntity<Map<String, Object>> generateEmailReply(
            @Valid @RequestBody EmailRequest request,
            HttpServletRequest httpRequest) {

        String clientIp = getClientIpAddress(httpRequest);
        logger.info("Received email generation request from IP: {}", clientIp);
        logger.info("Request details - Tone: '{}', Custom Prompt Length: {}, Email Content Length: {}",
                request.getSafeTone(),
                request.getSafeCustomPrompt().length(),
                request.getEmailContent() != null ? request.getEmailContent().length() : 0);

        Map<String, Object> response = new HashMap<>();

        try {
            // Check rate limit BEFORE processing
            if (!rateLimitingService.isAllowed(clientIp)) {
                logger.warn("Rate limit exceeded for IP: {}", clientIp);

                response.put("success", false);
                response.put("error", "Rate limit exceeded");
                response.put("message", "You've reached your daily limit of 5 API calls. Please try again tomorrow.");

                // Add current usage info
                Map<String, Object> usageInfo = rateLimitingService.getUsageInfo(clientIp);
                response.putAll(usageInfo);

                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(response);
            }

            // Validate request
            if (!request.isValid()) {
                logger.warn("Invalid request received: {}", request);
                response.put("success", false);
                response.put("error", "Invalid email content provided");
                response.put("details", "Email content cannot be empty and must be less than 5000 characters");
                return ResponseEntity.badRequest().body(response);
            }

            // Log the effective settings being used
            logger.info("Processing request with settings - Tone: '{}', Has Custom Prompt: {}",
                    request.getSafeTone(),
                    !request.getSafeCustomPrompt().isEmpty());

            // Record usage AFTER validation but BEFORE generation
            rateLimitingService.recordUsage(clientIp);
            logger.info("Rate limit consumed for IP: {}", clientIp);

            // Generate the reply
            String generatedReply = emailGeneratorService.generateEmailReply(request);

            if (generatedReply == null || generatedReply.trim().isEmpty()) {
                logger.error("Generated reply is empty");
                response.put("success", false);
                response.put("error", "Failed to generate reply - empty response");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }

            // Success response with usage info
            response.put("success", true);
            response.put("reply", generatedReply.trim());
            response.put("tone", request.getSafeTone());
            response.put("timestamp", System.currentTimeMillis());

            // Add current usage information
            Map<String, Object> usageInfo = rateLimitingService.getUsageInfo(clientIp);
            response.putAll(usageInfo);

            logger.info("Successfully generated email reply for IP: {} with tone: '{}'",
                    clientIp, request.getSafeTone());
            logger.debug("Generated reply preview: {}",
                    generatedReply.length() > 100 ? generatedReply.substring(0, 100) + "..." : generatedReply);

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            logger.warn("Invalid request parameters from IP {}: {}", clientIp, e.getMessage());
            response.put("success", false);
            response.put("error", "Invalid request parameters");
            response.put("details", e.getMessage());
            return ResponseEntity.badRequest().body(response);

        } catch (RuntimeException e) {
            logger.error("Runtime error generating email reply for IP {}: {}", clientIp, e.getMessage(), e);
            response.put("success", false);
            response.put("error", "Failed to generate email reply");
            response.put("details", "An error occurred while processing your request. Please try again.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

        } catch (Exception e) {
            logger.error("Unexpected error generating email reply for IP {}: {}", clientIp, e.getMessage(), e);
            response.put("success", false);
            response.put("error", "An unexpected error occurred");
            response.put("details", "Please try again later");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "healthy");
        response.put("service", "EmailGeneratorService");
        response.put("timestamp", System.currentTimeMillis());
        response.put("version", "1.0");

        logger.debug("Health check requested");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/supported-tones")
    public ResponseEntity<Map<String, Object>> getSupportedTones() {
        Map<String, Object> response = new HashMap<>();

        Map<String, String> tones = new HashMap<>();
        tones.put("professional", "Professional, courteous, and business-appropriate");
        tones.put("casual", "Casual, relaxed, and informal");
        tones.put("friendly", "Warm, friendly, and approachable");
        tones.put("formal", "Very formal, respectful, and traditional");
        tones.put("concise", "Brief, direct, and to-the-point");

        response.put("success", true);
        response.put("tones", tones);
        response.put("default", "professional");

        return ResponseEntity.ok(response);
    }

    // New endpoint to get usage info without consuming
    @GetMapping("/usage")
    public ResponseEntity<Map<String, Object>> getUsageInfo(HttpServletRequest request) {
        String clientIp = getClientIpAddress(request);

        try {
            Map<String, Object> response = rateLimitingService.getUsageInfo(clientIp);
            response.put("success", true);
            response.put("clientIp", clientIp); // For debugging

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error getting usage info for IP: {}", clientIp, e);

            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Unable to get usage info");
            errorResponse.put("currentUsage", 0);
            errorResponse.put("remainingCalls", 5);
            errorResponse.put("maxCalls", 5);
            errorResponse.put("canMakeCall", true);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // Exception handler for validation errors
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGlobalException(Exception e, HttpServletRequest request) {
        String clientIp = getClientIpAddress(request);
        logger.error("Unhandled exception for IP {}: {}", clientIp, e.getMessage(), e);

        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("error", "An unexpected error occurred");
        response.put("timestamp", System.currentTimeMillis());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }

        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }

        return request.getRemoteAddr();
    }

    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> handleOptions() {
        return ResponseEntity.ok()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
                .header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
                .header("Access-Control-Max-Age", "3600")
                .build();
    }
}