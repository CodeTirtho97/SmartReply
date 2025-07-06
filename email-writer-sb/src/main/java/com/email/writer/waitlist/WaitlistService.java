package com.email.writer.waitlist;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class WaitlistService {

    private final WaitlistRepository waitlistRepository;

    /**
     * Add a new entry to the waitlist
     */
    @Transactional
    public WaitlistEntry addToWaitlist(WaitlistEntry entry) {
        log.info("Adding entry to waitlist for email: {}", entry.getEmail());

        // Check if email already exists
        if (waitlistRepository.existsByEmail(entry.getEmail())) {
            log.warn("Email already exists in waitlist: {}", entry.getEmail());
            throw new WaitlistException("This email is already registered in our waitlist!");
        }

        try {
            // Clean and validate the entry
            entry.setEmail(entry.getEmail().toLowerCase().trim());
            entry.setName(entry.getName().trim());

            // Set default source if not provided
            if (entry.getSource() == null || entry.getSource().isEmpty()) {
                entry.setSource("website");
            }

            WaitlistEntry savedEntry = waitlistRepository.save(entry);
            log.info("Successfully added to waitlist: {} at position {}",
                    savedEntry.getEmail(), getWaitlistPosition(savedEntry.getEmail()));

            return savedEntry;

        } catch (Exception e) {
            log.error("Error adding entry to waitlist: {}", e.getMessage(), e);
            throw new WaitlistException("Failed to join waitlist. Please try again.");
        }
    }

    /**
     * Get the position of an email in the waitlist
     */
    public long getWaitlistPosition(String email) {
        Optional<WaitlistEntry> entry = waitlistRepository.findByEmail(email.toLowerCase().trim());

        if (entry.isEmpty()) {
            throw new WaitlistException("Email not found in waitlist");
        }

        return waitlistRepository.countEntriesBeforeDate(entry.get().getCreatedAt()) + 1;
    }

    /**
     * Get total waitlist count
     */
    public long getWaitlistCount() {
        return waitlistRepository.getTotalCount();
    }

    /**
     * Get waitlist statistics
     */
    public Map<String, Object> getWaitlistStats() {
        Map<String, Object> stats = new HashMap<>();

        // Total count
        long totalCount = getWaitlistCount();
        stats.put("totalCount", totalCount);

        // Recent signups (last 24 hours)
        LocalDateTime yesterday = LocalDateTime.now().minusDays(1);
        List<WaitlistEntry> recentSignups = waitlistRepository.findRecentSignups(yesterday);
        stats.put("recentSignups", recentSignups.size());

        // Signups by source
        List<Object[]> sourceStats = waitlistRepository.getSignupsBySource();
        Map<String, Long> sourceMap = new HashMap<>();
        for (Object[] stat : sourceStats) {
            sourceMap.put((String) stat[0], (Long) stat[1]);
        }
        stats.put("signupsBySource", sourceMap);

        log.info("Waitlist stats: {}", stats);
        return stats;
    }

    /**
     * Check if an email exists in waitlist
     */
    public boolean isEmailInWaitlist(String email) {
        return waitlistRepository.existsByEmail(email.toLowerCase().trim());
    }

    /**
     * Get waitlist entry by email
     */
    public Optional<WaitlistEntry> getWaitlistEntry(String email) {
        return waitlistRepository.findByEmail(email.toLowerCase().trim());
    }

    /**
     * Get recent signups for admin dashboard
     */
    public List<WaitlistEntry> getRecentSignups(int days) {
        LocalDateTime since = LocalDateTime.now().minusDays(days);
        return waitlistRepository.findRecentSignups(since);
    }

    /**
     * Mark entries as notified (for when Pro launches)
     */
    @Transactional
    public int markAllAsNotified() {
        List<WaitlistEntry> unnotified = waitlistRepository.findByNotifiedFalseOrderByCreatedAtAsc();

        for (WaitlistEntry entry : unnotified) {
            entry.setNotified(true);
        }

        waitlistRepository.saveAll(unnotified);
        log.info("Marked {} entries as notified", unnotified.size());

        return unnotified.size();
    }
}