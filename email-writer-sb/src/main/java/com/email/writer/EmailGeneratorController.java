package com.email.writer;

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
@CrossOrigin(origins = "*") // Enable CORS for frontend
public class EmailGeneratorController {

    private static final Logger logger = LoggerFactory.getLogger(EmailGeneratorController.class);

    @Autowired
    private EmailGeneratorService emailGeneratorService;

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

            // Generate the reply
            String generatedReply = emailGeneratorService.generateEmailReply(request);

            if (generatedReply == null || generatedReply.trim().isEmpty()) {
                logger.error("Generated reply is empty");
                response.put("success", false);
                response.put("error", "Failed to generate reply - empty response");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }

            // Success response
            response.put("success", true);
            response.put("reply", generatedReply.trim());
            response.put("tone", request.getSafeTone());
            response.put("timestamp", System.currentTimeMillis());

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
}