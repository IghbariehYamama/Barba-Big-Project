package com.BackEnd.Appointments.Repositories;

import com.BackEnd.Appointments.Entities.Booking;
import com.BackEnd.Appointments.Entities.Customer;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends BaseBookingRepository<Booking> {
    // Specific queries for registered customers
    List<Booking> findByCustomer(Customer customer);
    List<Booking> deleteBookingByCustomer(Customer customer);
}