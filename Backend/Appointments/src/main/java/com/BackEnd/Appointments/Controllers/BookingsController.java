package com.BackEnd.Appointments.Controllers;

import com.BackEnd.Appointments.Config.JwtService;
import com.BackEnd.Appointments.DTOs.BookingDTO;
import com.BackEnd.Appointments.DTOs.BookingGetDTO;
import com.BackEnd.Appointments.DTOs.BookingStatusDTO;
import com.BackEnd.Appointments.Entities.Booking;
import com.BackEnd.Appointments.Enums.BookingStatus;
import com.BackEnd.Appointments.Exceptions.CustomerNotFoundException;
import com.BackEnd.Appointments.Repositories.*;
import com.BackEnd.Appointments.Services.*;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/bookings")
@Validated
public class BookingsController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private BaseBookingService baseBookingService;
    @Autowired
    private BookingService bookingService;
    @Autowired
    private BusinessService businessService;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private ServiceManager serviceManager;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/")
    public BookingGetDTO addBooking(@RequestBody BookingDTO booking, Authentication auth) throws CustomerNotFoundException {
        String customerId = auth.getName();
        Booking newBooking = new Booking();
        newBooking.setCustomer(customerService.getCustomerByID(Integer.parseInt(customerId)));
        newBooking.setBusiness(businessService.getBusinessById(booking.getBusinessId()));
        newBooking.setEmployee(employeeRepository.findById(booking.getEmployeeId()).get());
        newBooking.setService(serviceManager.getServiceById(booking.getServiceId()));
        newBooking.setBookingTimestamp(LocalDateTime.now());
        newBooking.setChosenBookingTime(LocalDateTime.of(booking.getYear(),booking.getMonth(),booking.getDay(),booking.getHour(),booking.getMinute()));
        newBooking.setStatus(BookingStatus.UPCOMING);
        newBooking = this.bookingService.addBooking(newBooking);
        return new BookingGetDTO(newBooking);
    }

    @PostMapping("/status/update")
    public ResponseEntity<BookingGetDTO> updateBooking(@RequestBody BookingStatusDTO updatedBookingStatus) throws ChangeSetPersister.NotFoundException {
        Booking booking = bookingService.getBookingByID(updatedBookingStatus.getBookingId());
        booking.setStatus(updatedBookingStatus.getBookingStatus());
        booking  = this.bookingService.updateBooking(booking);
        return ResponseEntity.ok(new BookingGetDTO(booking));
    }
    @PostMapping("/{id}/status/cancel")
    public ResponseEntity<String> cancelBooking(@PathVariable int id) throws ChangeSetPersister.NotFoundException {
        Booking booking = bookingService.getBookingByID(id);
        booking.cancel();
        this.bookingService.updateBooking(booking);
        return ResponseEntity.ok("Cancelled!");
    }

    //DELETE
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Integer id) throws CustomerNotFoundException {
        this.baseBookingService.deleteBooking(id);
        return ResponseEntity.ok("Booking with ID " + id + " has been deleted successfully.");
    }
}
