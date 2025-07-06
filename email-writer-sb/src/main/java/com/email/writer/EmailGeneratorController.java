package com.email.writer;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
public class EmailGeneratorController {

    private static final Logger log = LoggerFactory.getLogger(EmailGeneratorController.class);
    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
        log.info("Received email generation request with tone: {} and customPrompt length: {}",
                emailRequest.getTone(),
                emailRequest.getCustomPrompt() != null ? emailRequest.getCustomPrompt().length() : 0);

        try {
            String response = emailGeneratorService.generateEmailReply(emailRequest);
            log.info("Successfully generated email reply");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error generating email reply: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body("Error generating email reply: " + e.getMessage());
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        log.info("Health check requested");
        return ResponseEntity.ok("SmartReply+ Email Generator is running!");
    }
}