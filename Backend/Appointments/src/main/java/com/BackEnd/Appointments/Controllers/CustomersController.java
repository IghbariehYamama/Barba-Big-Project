package com.BackEnd.Appointments.Controllers;

import com.BackEnd.Appointments.BLs.CustomerBL;
import com.BackEnd.Appointments.DAOs.*;
import com.BackEnd.Appointments.DTOs.BookingDTO;
import com.BackEnd.Appointments.Entities.Booking;
import com.BackEnd.Appointments.Entities.Customer;
import com.BackEnd.Appointments.Entities.Service;
import com.BackEnd.Appointments.Exceptions.CustomerAlreadyExistException;
import com.BackEnd.Appointments.Exceptions.CustomerNotFoundException;
import com.BackEnd.Appointments.Status.BookingStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/customers")
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


    //POST

    @PostMapping("/register")
    public Customer addCustomer(@RequestBody Customer customer) throws CustomerAlreadyExistException {
        return this.customerBL.addCustomer(customer);
    }

    @PostMapping("/booking/add")
    public Booking addBooking(@RequestBody BookingDTO booking) {
        Booking newBooking = new Booking();
        newBooking.setCustomer(customerDAO.findById(booking.getCustomerId()).get());
        newBooking.setBusiness(businessDAO.findById(booking.getBusinessId()).get());
        newBooking.setEmployee(employeeDAO.findById(booking.getEmployeeId()).get());
        newBooking.setService(serviceDAO.findById(booking.getServiceId()).get());
        newBooking.setBookingTimestamp(LocalDateTime.now());
        newBooking.setChosenBookingTime(LocalDateTime.of(booking.getYear(),booking.getMonth(),booking.getDay(),booking.getHour(),booking.getMinute()));
        return this.customerBL.addBooking(newBooking);
    }
    @PostMapping("/booking/status")
    public Booking updateBooking(@RequestBody BookingDTO updatedBooking) {
        Booking booking = bookingDAO.findById(updatedBooking.getId()).get();
        booking.setStatus(updatedBooking.getStatus());
        return this.customerBL.updateBooking(booking);
    }


    //DELETE

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Integer id) throws CustomerNotFoundException {
        this.customerBL.deleteCustomer(id);
        return ResponseEntity.ok("Customer with ID " + id + " has been deleted successfully.");
    }
    @DeleteMapping("booking/delete/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Integer id) throws CustomerNotFoundException {
        this.customerBL.deleteBooking(id);
        return ResponseEntity.ok("Booking with ID " + id + " has been deleted successfully.");
    }

}
