package com.BackEnd.Appointments.DAOs;

import com.BackEnd.Appointments.Entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingDAO extends JpaRepository<Booking, Integer> {
    //find
    Booking findById(int id);
    List<Booking> findAll();
    List<Booking> findBookingsByBusinessId(Integer id);
    List<Booking> findBookingsByCustomerId(Integer id);
    List<Booking> findBookingsByServiceId(Integer id);
    List<Booking> findBookingsByEmployeeId(Integer id);
    //delete
    Booking deleteBookingById(Integer id);
    List<Booking> deleteBookingsByCustomerId(Integer id);
    List<Booking> deleteBookingsByServiceId(Integer id);
    List<Booking> deleteBookingsByEmployeeId(Integer id);
    List<Booking> deleteBookingsByBusinessId(Integer id);

}
