package com.email.writer.waitlist;

/**
 * Custom exception for waitlist operations
 */
public class WaitlistException extends RuntimeException {

    public WaitlistException(String message) {
        super(message);
    }

    public WaitlistException(String message, Throwable cause) {
        super(message, cause);
    }
}