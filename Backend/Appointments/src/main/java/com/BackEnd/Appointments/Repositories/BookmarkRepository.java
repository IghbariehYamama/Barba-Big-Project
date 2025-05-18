package com.BackEnd.Appointments.Repositories;

import com.BackEnd.Appointments.Entities.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Integer> {
    // Find all bookmarks for a specific customer
    List<Bookmark> findByCustomerId(Integer customerId);

    // Find all bookmarks for a specific business
    List<Bookmark> findByBusinessId(Integer businessId);

    // Check if a bookmark exists for a specific customer and business
    @Query("SELECT COUNT(b) > 0 FROM Bookmark b WHERE b.customer.id = :customerId AND b.business.id = :businessId")
    boolean existsByCustomerIdAndBusinessId(@Param("customerId") Integer customerId, @Param("businessId") Integer businessId);

    // Delete a specific bookmark by customer and business
    void deleteByCustomerIdAndBusinessId(Integer customerId, Integer businessId);

    // Find a specific bookmark by customer and business
    Bookmark findByCustomerIdAndBusinessId(Integer customerId, Integer businessId);

}
