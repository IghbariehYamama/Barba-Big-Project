package com.BackEnd.Appointments.Repositories;
import com.BackEnd.Appointments.Entities.*;
import com.BackEnd.Appointments.Enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

@NoRepositoryBean
public interface BaseBookingRepository<T extends BaseBooking> extends JpaRepository<T, Integer> {
    // Common queries for all bookings
    List<T> findByStatus(BookingStatus status);
    Booking findById(int id);
    List<T> findAll();
    List<T> findBookingsByBusinessId(Integer id);
    List<T> findBookingsByBusinessIdAndEmployeeId(Integer businessId, Integer employeeId);
    List<T> findBookingsByCustomer(Customer customer);
    List<T> findBookingsByServiceId(Integer id);
    List<T> findBookingsByEmployeeId(Integer id);
    List<T> findBookingsByBusinessIdAndStatus(Integer businessId, BookingStatus status);
    List<T> findByBusinessIdAndStatusAndChosenBookingTimeBetween(
            Integer businessId,
            BookingStatus status,
            LocalDateTime start,
            LocalDateTime end
    );
    //delete
    Booking deleteBookingById(Integer id);
    List<T> deleteBookingsByServiceId(Integer id);
    List<T> deleteBookingsByEmployeeId(Integer id);
    List<T> deleteBookingsByBusinessId(Integer id);


    @Query("""
    SELECT COUNT(b) > 0 FROM BaseBooking b 
    WHERE b.employee = :employee
    AND b.service = :service
    AND b.chosenBookingTime < :endTime
    AND b.chosenBookingTime >= :startTime
""")
    boolean isBookingOverlapping(
            @Param("employee") Employee employee,
            @Param("service") Service service,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );




}

