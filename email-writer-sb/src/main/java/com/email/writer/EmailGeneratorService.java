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

        // Build the prompt
        String prompt = buildPrompt(emailRequest);

        log.info("Attempting to call Gemini API with URL: {}", geminiApiUrl);

        try {
            // Craft a request exactly like Postman
            Map<String, Object> requestBody = Map.of(
                    "contents", new Object[] {
                            Map.of("parts", new Object[] {
                                    Map.of("text", prompt)
                            })
                    }
            );

            String jsonBody = objectMapper.writeValueAsString(requestBody);
            String url = geminiApiUrl + "?key=" + geminiApiKey;

            log.info("Making request to: {}", url.substring(0, url.indexOf("?key=")) + "?key=[REDACTED]");

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(30))
                    .header("Content-Type", "application/json")
                    .header("User-Agent", "EmailWriter/1.0")
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

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for the following email content. Please don't generate a subject line ");
        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone.");
        }
        prompt.append("\n Original Email: \n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}