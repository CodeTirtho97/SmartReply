package com.email.writer.waitlist;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/waitlist")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "https://your-domain.com",
        "chrome-extension://*"
})
@AllArgsConstructor
@Slf4j
public class WaitlistController {

    private final WaitlistService waitlistService;

    /**
     * Join the Pro waitlist
     */
    @PostMapping("/join")
    public ResponseEntity<Map<String, Object>> joinWaitlist(
            @Valid @RequestBody WaitlistJoinRequest request) {

        log.info("Waitlist join request received for email: {}", request.getEmail());

        try {
            // Create waitlist entry
            WaitlistEntry entry = new WaitlistEntry(
                    request.getName(),
                    request.getEmail(),
                    request.getSource() != null ? request.getSource() : "website"
            );

            WaitlistEntry savedEntry = waitlistService.addToWaitlist(entry);
            long position = waitlistService.getWaitlistPosition(savedEntry.getEmail());
            long totalCount = waitlistService.getWaitlistCount();

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Successfully joined the Pro waitlist!");
            response.put("position", position);
            response.put("totalCount", totalCount);
            response.put("estimatedLaunch", "Q2 2025"); // Update as needed

            log.info("Successfully added {} to waitlist at position {}",
                    savedEntry.getEmail(), position);

            return ResponseEntity.ok(response);

        } catch (WaitlistException e) {
            log.warn("Waitlist join failed: {}", e.getMessage());

            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());

            return ResponseEntity.badRequest().body(response);

        } catch (Exception e) {
            log.error("Unexpected error during waitlist join: {}", e.getMessage(), e);

            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "An unexpected error occurred. Please try again.");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Get waitlist statistics (public)
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getWaitlistStats() {
        try {
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalCount", waitlistService.getWaitlistCount());
            stats.put("estimatedLaunch", "Q2 2025");

            return ResponseEntity.ok(stats);

        } catch (Exception e) {
            log.error("Error fetching waitlist stats: {}", e.getMessage(), e);

            Map<String, Object> response = new HashMap<>();
            response.put("error", "Unable to fetch statistics");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Check if email is in waitlist
     */
    @GetMapping("/check/{email}")
    public ResponseEntity<Map<String, Object>> checkEmail(@PathVariable String email) {
        try {
            boolean exists = waitlistService.isEmailInWaitlist(email);

            Map<String, Object> response = new HashMap<>();
            response.put("exists", exists);

            if (exists) {
                long position = waitlistService.getWaitlistPosition(email);
                response.put("position", position);
            }

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error checking email: {}", e.getMessage(), e);

            Map<String, Object> response = new HashMap<>();
            response.put("error", "Unable to check email");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Admin endpoint to get detailed stats
     */
    @GetMapping("/admin/stats")
    public ResponseEntity<Map<String, Object>> getDetailedStats(
            @RequestHeader(value = "Admin-Key", required = false) String adminKey) {

        // Simple admin authentication - replace with proper auth in production
        if (!"your-admin-secret-key".equals(adminKey)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        try {
            Map<String, Object> stats = waitlistService.getWaitlistStats();
            return ResponseEntity.ok(stats);

        } catch (Exception e) {
            log.error("Error fetching detailed stats: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}