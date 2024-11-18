package com.BackEnd.Appointments.Controllers;

import com.BackEnd.Appointments.BLs.CustomerBL;
import com.BackEnd.Appointments.DAOs.*;
import com.BackEnd.Appointments.DTOs.BookingDTO;
import com.BackEnd.Appointments.DTOs.BookingGetDTO;
import com.BackEnd.Appointments.DTOs.BookingStatusDTO;
import com.BackEnd.Appointments.DTOs.UserDTO;
import com.BackEnd.Appointments.Entities.Booking;
import com.BackEnd.Appointments.Entities.Customer;
import com.BackEnd.Appointments.Entities.User;
import com.BackEnd.Appointments.Enums.BookingStatus;
import com.BackEnd.Appointments.Exceptions.CustomerAlreadyExistException;
import com.BackEnd.Appointments.Exceptions.CustomerNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/customers")
@Validated
public class CustomersController {
    @Autowired
    private CustomerBL customerBL;
    @Autowired
    private BookingDAO bookingDAO;
    @Autowired
    private CustomerDAO customerDAO;
    @Autowired
    private BusinessDAO businessDAO;
    @Autowired
    private EmployeeDAO employeeDAO;
    @Autowired
    private ServiceDAO serviceDAO;
    //GET

    @GetMapping("/get/{id}")
    public Customer getCustomer(@PathVariable Integer id) throws CustomerNotFoundException {
        return this.customerBL.getCustomer(id);
    }
    @GetMapping("/get/bookings/all/{customerId}")
    public List<BookingGetDTO> getAllBookings(@PathVariable Integer customerId) {
        List<Booking> bookings = this.customerBL.getAllBookings(customerId);
        List<BookingGetDTO> res = new ArrayList<>();
        for(Booking booking : bookings){
            BookingGetDTO bookingGet = new BookingGetDTO(booking.getId(),
                    booking.getBusiness(),
                    booking.getService(),
                    booking.getCustomer(),
                    booking.getEmployee(),
                    booking.getChosenBookingTime(),
                    booking.getStatus());
            res.add(bookingGet);
        }
        return res;
    }


    //POST

    @PostMapping("/register")
    public ResponseEntity<String> addCustomer(@RequestBody  @Valid UserDTO user) throws CustomerAlreadyExistException {
        Customer customer = new Customer(user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getPhone(),
                user.getDateOfBirth(),
                user.getGender());
        this.customerBL.addCustomer(customer);
        return ResponseEntity.ok("User Created Successfully!");
    }

    @PostMapping("/bookings/add")
    public BookingDTO addBooking(@RequestBody BookingDTO booking) {
        Booking newBooking = new Booking();
        newBooking.setCustomer(customerDAO.findById(booking.getCustomerId()).get());
        newBooking.setBusiness(businessDAO.findById(booking.getBusinessId()).get());
        newBooking.setEmployee(employeeDAO.findById(booking.getEmployeeId()).get());
        newBooking.setService(serviceDAO.findById(booking.getServiceId()).get());
        newBooking.setBookingTimestamp(LocalDateTime.now());
        newBooking.setChosenBookingTime(LocalDateTime.of(booking.getYear(),booking.getMonth(),booking.getDay(),booking.getHour(),booking.getMinute()));
        newBooking = this.customerBL.addBooking(newBooking);
        booking.setId(newBooking.getId());
        return booking;
    }
    @PostMapping("/bookings/status/update")
    public BookingGetDTO updateBooking(@RequestBody BookingStatusDTO updatedBookingStatus) {
        Booking booking = bookingDAO.findById(updatedBookingStatus.getBookingId()).get();
        booking.setStatus(updatedBookingStatus.getBookingStatus());
        booking  = this.customerBL.updateBooking(booking);
        BookingGetDTO updatedBooking = new BookingGetDTO(booking.getId(),
                booking.getBusiness(),
                booking.getService(),
                booking.getCustomer(),
                booking.getEmployee(),
                booking.getChosenBookingTime(),
                booking.getStatus());
        return updatedBooking;
    }


    //DELETE

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Integer id) throws CustomerNotFoundException {
        this.customerBL.deleteCustomer(id);
        return ResponseEntity.ok("Customer with ID " + id + " has been deleted successfully.");
    }
    @DeleteMapping("bookings/delete/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Integer id) throws CustomerNotFoundException {
        this.customerBL.deleteBooking(id);
        return ResponseEntity.ok("Booking with ID " + id + " has been deleted successfully.");
    }

}
