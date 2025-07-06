package com.email.writer;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmailGeneratorService {

    private static final Logger logger = LoggerFactory.getLogger(EmailGeneratorService.class);

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    public EmailGeneratorService() {
        this.restTemplate = new RestTemplate();
    }

    public String generateEmailReply(EmailRequest request) {
        try {
            logger.info("Generating email reply with tone: {} and custom prompt: {}",
                    request.getTone(), request.getCustomPrompt());

            String prompt = buildDynamicPrompt(request);
            String fullUrl = apiUrl + "?key=" + apiKey;

            logger.info("Attempting to call Gemini API with URL: {}", apiUrl);
            logger.debug("Generated prompt: {}", prompt);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> requestBody = createGeminiRequestBody(prompt);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            logger.info("Making request to: {}", fullUrl.replace(apiKey, "[REDACTED]"));
            ResponseEntity<Map> response = restTemplate.exchange(fullUrl, HttpMethod.POST, entity, Map.class);
            logger.info("Received response with status: {}", response.getStatusCode());

            return extractResponseText(response.getBody());

        } catch (Exception e) {
            logger.error("Error generating email reply", e);
            throw new RuntimeException("Failed to generate email reply: " + e.getMessage());
        }
    }

    private String buildDynamicPrompt(EmailRequest request) {
        StringBuilder promptBuilder = new StringBuilder();

        // Base instructions
        promptBuilder.append("You are SmartReply+, an AI email assistant. Generate a professional email reply for the following email content. ");

        // Dynamic tone mapping
        String toneInstructions = getToneInstructions(request.getTone());
        promptBuilder.append(toneInstructions);

        // Important guidelines
        promptBuilder.append(" Important guidelines: ");
        promptBuilder.append("- Do NOT include a subject line ");
        promptBuilder.append("- Start directly with the email body ");
        promptBuilder.append("- Keep the response contextually appropriate ");
        promptBuilder.append("- Include proper greeting and closing ");
        promptBuilder.append("- Make sure the reply addresses the main points of the original email ");

        // Add custom prompt if provided
        if (request.getCustomPrompt() != null && !request.getCustomPrompt().trim().isEmpty()) {
            promptBuilder.append("\n\nAdditional Style Instructions: ");
            promptBuilder.append(request.getCustomPrompt().trim());
        }

        // Add original email content
        promptBuilder.append("\n\nOriginal Email Content:\n");
        promptBuilder.append(request.getEmailContent());

        promptBuilder.append("\n\nGenerate only the email reply body (no subject line):");

        return promptBuilder.toString();
    }

    private String getToneInstructions(String tone) {
        if (tone == null || tone.trim().isEmpty()) {
            tone = "professional";
        }

        switch (tone.toLowerCase()) {
            case "professional":
                return "Use a professional, courteous, and business-appropriate tone. Be formal but approachable.";

            case "casual":
                return "Use a casual, relaxed, and informal tone. Be friendly and conversational while remaining respectful.";

            case "friendly":
                return "Use a warm, friendly, and approachable tone. Be personable and engaging while maintaining professionalism.";

            case "formal":
                return "Use a very formal, respectful, and traditional business tone. Be extremely polite and structured.";

            case "concise":
                return "Use a brief, direct, and to-the-point tone. Keep the response short while being polite and clear.";

            default:
                logger.warn("Unknown tone '{}', defaulting to professional", tone);
                return "Use a professional, courteous, and business-appropriate tone. Be formal but approachable.";
        }
    }

    private Map<String, Object> createGeminiRequestBody(String prompt) {
        Map<String, Object> requestBody = new HashMap<>();

        // Create the parts array with the prompt
        Map<String, String> textPart = new HashMap<>();
        textPart.put("text", prompt);

        Map<String, Object> part = new HashMap<>();
        part.put("parts", List.of(textPart));

        requestBody.put("contents", List.of(part));

        // Generation configuration for better responses
        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("temperature", 0.7);
        generationConfig.put("topK", 40);
        generationConfig.put("topP", 0.95);
        generationConfig.put("maxOutputTokens", 1024);

        requestBody.put("generationConfig", generationConfig);

        // Safety settings to prevent blocking
        List<Map<String, Object>> safetySettings = List.of(
                createSafetySetting("HARM_CATEGORY_HARASSMENT", "BLOCK_NONE"),
                createSafetySetting("HARM_CATEGORY_HATE_SPEECH", "BLOCK_NONE"),
                createSafetySetting("HARM_CATEGORY_SEXUALLY_EXPLICIT", "BLOCK_NONE"),
                createSafetySetting("HARM_CATEGORY_DANGEROUS_CONTENT", "BLOCK_NONE")
        );

        requestBody.put("safetySettings", safetySettings);

        return requestBody;
    }

    private Map<String, Object> createSafetySetting(String category, String threshold) {
        Map<String, Object> setting = new HashMap<>();
        setting.put("category", category);
        setting.put("threshold", threshold);
        return setting;
    }

    @SuppressWarnings("unchecked")
    private String extractResponseText(Map<String, Object> responseBody) {
        try {
            if (responseBody == null) {
                throw new RuntimeException("Empty response from Gemini API");
            }

            List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
            if (candidates == null || candidates.isEmpty()) {
                logger.error("No candidates in response: {}", responseBody);
                throw new RuntimeException("No candidates in API response");
            }

            Map<String, Object> firstCandidate = candidates.get(0);
            Map<String, Object> content = (Map<String, Object>) firstCandidate.get("content");

            if (content == null) {
                logger.error("No content in candidate: {}", firstCandidate);
                throw new RuntimeException("No content in API response");
            }

            List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
            if (parts == null || parts.isEmpty()) {
                logger.error("No parts in content: {}", content);
                throw new RuntimeException("No parts in API response");
            }

            String text = (String) parts.get(0).get("text");
            if (text == null || text.trim().isEmpty()) {
                throw new RuntimeException("Empty text in API response");
            }

            // Clean up the response text
            return text.trim();

        } catch (ClassCastException e) {
            logger.error("Unexpected response structure: {}", responseBody, e);
            throw new RuntimeException("Unexpected API response structure");
        } catch (Exception e) {
            logger.error("Error extracting response text: {}", responseBody, e);
            throw new RuntimeException("Failed to extract response text: " + e.getMessage());
        }
    }
}