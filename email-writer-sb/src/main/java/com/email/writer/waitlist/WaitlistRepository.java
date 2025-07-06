package com.email.writer.waitlist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface WaitlistRepository extends JpaRepository<WaitlistEntry, Long> {

    /**
     * Check if email already exists in waitlist
     */
    boolean existsByEmail(String email);

    /**
     * Find entry by email
     */
    Optional<WaitlistEntry> findByEmail(String email);

    /**
     * Get waitlist position for a specific email
     */
    @Query("SELECT COUNT(w) FROM WaitlistEntry w WHERE w.createdAt < :createdAt")
    long countEntriesBeforeDate(@Param("createdAt") LocalDateTime createdAt);

    /**
     * Get total waitlist count
     */
    @Query("SELECT COUNT(w) FROM WaitlistEntry w")
    long getTotalCount();

    /**
     * Get recent signups (last 24 hours)
     */
    @Query("SELECT w FROM WaitlistEntry w WHERE w.createdAt >= :since ORDER BY w.createdAt DESC")
    List<WaitlistEntry> findRecentSignups(@Param("since") LocalDateTime since);

    /**
     * Get signups by source
     */
    @Query("SELECT w.source, COUNT(w) FROM WaitlistEntry w GROUP BY w.source")
    List<Object[]> getSignupsBySource();

    /**
     * Find unnotified entries
     */
    List<WaitlistEntry> findByNotifiedFalseOrderByCreatedAtAsc();
}