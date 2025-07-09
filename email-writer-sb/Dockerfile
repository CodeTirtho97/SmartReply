# Use OpenJDK 17 as base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the JAR file from target directory
COPY target/email-writer-sb-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Set environment variables (these will be overridden by AWS)
ENV GEMINI_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
ENV GEMINI_KEY="AIzaSyCLk4qE8nxfTojkCQGA34zWkEr51Y-N6cU"

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]