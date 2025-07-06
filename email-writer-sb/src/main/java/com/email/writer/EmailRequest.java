package com.email.writer;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class EmailRequest {

    @NotBlank(message = "Email content cannot be empty")
    @Size(max = 5000, message = "Email content cannot exceed 5000 characters")
    @JsonProperty("emailContent")
    private String emailContent;

    @JsonProperty("tone")
    private String tone = "professional"; // Default tone

    @JsonProperty("customPrompt")
    @Size(max = 500, message = "Custom prompt cannot exceed 500 characters")
    private String customPrompt;

    // Default constructor
    public EmailRequest() {}

    // Constructor with email content only (for backward compatibility)
    public EmailRequest(String emailContent) {
        this.emailContent = emailContent;
        this.tone = "professional";
        this.customPrompt = "";
    }

    // Full constructor
    public EmailRequest(String emailContent, String tone, String customPrompt) {
        this.emailContent = emailContent;
        this.tone = tone != null ? tone : "professional";
        this.customPrompt = customPrompt;
    }

    // Getters and Setters
    public String getEmailContent() {
        return emailContent;
    }

    public void setEmailContent(String emailContent) {
        this.emailContent = emailContent;
    }

    public String getTone() {
        return tone != null ? tone : "professional";
    }

    public void setTone(String tone) {
        this.tone = tone;
    }

    public String getCustomPrompt() {
        return customPrompt;
    }

    public void setCustomPrompt(String customPrompt) {
        this.customPrompt = customPrompt;
    }

    // Validation method
    public boolean isValid() {
        return emailContent != null &&
                !emailContent.trim().isEmpty() &&
                emailContent.length() <= 5000;
    }

    // Helper method to get safe tone (never null)
    public String getSafeTone() {
        if (tone == null || tone.trim().isEmpty()) {
            return "professional";
        }
        return tone.toLowerCase().trim();
    }

    // Helper method to get safe custom prompt (never null)
    public String getSafeCustomPrompt() {
        return customPrompt != null ? customPrompt.trim() : "";
    }

    @Override
    public String toString() {
        return "EmailRequest{" +
                "emailContent='" + (emailContent != null ? emailContent.substring(0, Math.min(emailContent.length(), 100)) + "..." : "null") + '\'' +
                ", tone='" + tone + '\'' +
                ", customPrompt='" + (customPrompt != null ? customPrompt.substring(0, Math.min(customPrompt.length(), 50)) + "..." : "null") + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        EmailRequest that = (EmailRequest) o;

        if (!emailContent.equals(that.emailContent)) return false;
        if (!tone.equals(that.tone)) return false;
        return customPrompt != null ? customPrompt.equals(that.customPrompt) : that.customPrompt == null;
    }

    @Override
    public int hashCode() {
        int result = emailContent.hashCode();
        result = 31 * result + tone.hashCode();
        result = 31 * result + (customPrompt != null ? customPrompt.hashCode() : 0);
        return result;
    }
}