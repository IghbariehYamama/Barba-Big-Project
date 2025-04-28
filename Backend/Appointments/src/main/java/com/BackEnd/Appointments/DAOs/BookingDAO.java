package com.BackEnd.Appointments.DAOs;

import com.BackEnd.Appointments.Entities.Booking;
import com.BackEnd.Appointments.Entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingDAO extends BaseBookingDAO<Booking> {
    // Specific queries for registered customers
    List<Booking> findByCustomer(Customer customer);
    List<Booking> deleteBookingByCustomer(Customer customer);
}