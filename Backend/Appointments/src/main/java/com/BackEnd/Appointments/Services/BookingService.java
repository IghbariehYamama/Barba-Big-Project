package com.BackEnd.Appointments.Services;

import com.BackEnd.Appointments.Entities.Booking;
import com.BackEnd.Appointments.Entities.Customer;
import com.BackEnd.Appointments.Exceptions.CustomerNotFoundException;
import com.BackEnd.Appointments.Repositories.AvailableSlotRepository;
import com.BackEnd.Appointments.Repositories.BookingRepository;
import com.BackEnd.Appointments.Repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private AvailableSlotRepository availableSlotRepository;


    @Transactional
    public Booking getBookingByID(int id) throws ChangeSetPersister.NotFoundException {
        Booking booking = this.bookingRepository.findById(id);
        if(booking == null) {
            throw new ChangeSetPersister.NotFoundException();
        }
        return booking;
    }

    @Transactional
    public Booking addBooking(Booking booking) {
        if(!availableSlotRepository.existsByEmployeeIdAndSlot(booking.getEmployee().getId(),booking.getChosenBookingTime()))
            throw new RuntimeException();
        availableSlotRepository.deleteByEmployeeIdAndSlot(booking.getEmployee().getId(),booking.getChosenBookingTime());
        return this.bookingRepository.save(booking);
    }
    @Transactional
    public Booking updateBooking(Booking booking) {
        return this.bookingRepository.save(booking);
    }
}
