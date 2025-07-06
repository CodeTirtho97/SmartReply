package com.email.writer;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Map;

@Service
@Profile("!mock")
public class EmailGeneratorService {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private static final Logger log = LoggerFactory.getLogger(EmailGeneratorService.class);
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public EmailGeneratorService() {
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(30))
                .build();
        this.objectMapper = new ObjectMapper();
    }

    public String generateEmailReply(EmailRequest emailRequest) {
        // Validate configuration at runtime
        if (geminiApiUrl == null || geminiApiUrl.contains("${") ||
                geminiApiKey == null || geminiApiKey.contains("${")) {
            log.error("Invalid Gemini API configuration. URL: {}, Key: {}",
                    geminiApiUrl, geminiApiKey != null ? "[REDACTED]" : "null");
            return "Error: Gemini API not properly configured. Please check environment variables.";
        }

        // Build the enhanced prompt with user preferences
        String prompt = buildEnhancedPrompt(emailRequest);

        log.info("Attempting to call Gemini API with URL: {}", geminiApiUrl);
        log.debug("Generated prompt: {}", prompt);

        try {
            // Craft a request exactly like Postman
            Map<String, Object> requestBody = Map.of(
                    "contents", new Object[] {
                            Map.of("parts", new Object[] {
                                    Map.of("text", prompt)
                            })
                    },
                    "generationConfig", Map.of(
                            "temperature", 0.7,
                            "maxOutputTokens", 1000,
                            "topP", 0.8,
                            "topK", 40
                    )
            );

            String jsonBody = objectMapper.writeValueAsString(requestBody);
            String url = geminiApiUrl + "?key=" + geminiApiKey;

            log.info("Making request to: {}", url.substring(0, url.indexOf("?key=")) + "?key=[REDACTED]");

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(30))
                    .header("Content-Type", "application/json")
                    .header("User-Agent", "SmartReply+/1.0")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            log.info("Received response with status: {}", response.statusCode());

            if (response.statusCode() == 200) {
                return extractResponseContent(response.body());
            } else {
                log.error("API returned status: {} with body: {}", response.statusCode(), response.body());
                return "Error: API returned status " + response.statusCode() + ": " + response.body();
            }

        } catch (java.net.ConnectException e) {
            log.error("Connection error calling Gemini API: {}", e.getMessage());
            return "Connection error: " + e.getMessage() + ". Please check your internet connection.";
        } catch (Exception e) {
            log.error("Error calling Gemini API: {}", e.getMessage());
            return "Error generating email reply: " + e.getMessage();
        }
    }

    private String extractResponseContent(String response) {
        try {
            JsonNode rootNode = objectMapper.readTree(response);

            if (rootNode.has("candidates") && rootNode.get("candidates").size() > 0) {
                String text = rootNode.path("candidates")
                        .get(0)
                        .path("content")
                        .path("parts")
                        .get(0)
                        .path("text")
                        .asText();
                return text;
            } else {
                log.error("Unexpected response format: {}", response);
                return "Error: Unexpected response format from Gemini API";
            }
        } catch (Exception e) {
            log.error("Error parsing Gemini API response: {}", e.getMessage());
            log.error("Raw response: {}", response);
            return "Error Processing Request: " + e.getMessage();
        }
    }

    /**
     * Build enhanced prompt with user preferences and tone
     */
    private String buildEnhancedPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();

        // Base instruction
        prompt.append("You are SmartReply+, an AI email assistant. Generate a professional email reply for the following email content. ");

        // Add tone-specific instructions
        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            switch (emailRequest.getTone().toLowerCase()) {
                case "professional":
                    prompt.append("Use a professional, courteous tone. Be formal but approachable. ");
                    break;
                case "casual":
                    prompt.append("Use a casual, friendly tone. Be relaxed and conversational. ");
                    break;
                case "friendly":
                    prompt.append("Use a warm, friendly tone. Be personable and engaging. ");
                    break;
                case "formal":
                    prompt.append("Use a formal, business-appropriate tone. Be respectful and structured. ");
                    break;
                case "concise":
                    prompt.append("Be brief and to-the-point. Use short sentences and get straight to the message. ");
                    break;
                default:
                    prompt.append("Use a ").append(emailRequest.getTone()).append(" tone. ");
            }
        }

        // Add custom prompt if provided
        if (emailRequest.getCustomPrompt() != null && !emailRequest.getCustomPrompt().trim().isEmpty()) {
            prompt.append("Additional writing style requirements: ").append(emailRequest.getCustomPrompt().trim()).append(" ");
        }

        // Add specific instructions
        prompt.append("Important guidelines: ");
        prompt.append("- Do NOT include a subject line ");
        prompt.append("- Start directly with the email body ");
        prompt.append("- Keep the response contextually appropriate ");
        prompt.append("- Include proper greeting and closing ");
        prompt.append("- Make sure the reply addresses the main points of the original email ");

        // Add original email content
        prompt.append("\n\nOriginal Email Content:\n").append(emailRequest.getEmailContent());

        // Final instruction
        prompt.append("\n\nGenerate only the email reply body (no subject line):");

        return prompt.toString();
    }
}