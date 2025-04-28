package com.BackEnd.Appointments.BLs;

import com.BackEnd.Appointments.DAOs.AvailableSlotDAO;
import com.BackEnd.Appointments.DAOs.BaseBookingDAO;
import com.BackEnd.Appointments.DAOs.BookingDAO;
import com.BackEnd.Appointments.DAOs.CustomerDAO;
import com.BackEnd.Appointments.Entities.BaseBooking;
import com.BackEnd.Appointments.Entities.Booking;
import com.BackEnd.Appointments.Entities.Customer;
import com.BackEnd.Appointments.Exceptions.CustomerAlreadyExistException;
import com.BackEnd.Appointments.Exceptions.CustomerNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerBL {
    @Autowired
    private CustomerDAO customerDAO;
    @Autowired
    private BookingDAO bookingDAO;
    @Autowired
    private AvailableSlotDAO availableSlotDAO;

    @Transactional
    public List<Customer> getAllCustomers() {
        return this.customerDAO.findAll();
    }
    @Transactional
    public Customer getCustomerByID(int id) throws CustomerNotFoundException {
        Customer customer = this.customerDAO.findById(id);
        if(customer == null) {
            throw new CustomerNotFoundException();
        }
        return customer;
    }
    @Transactional
    public Customer getCustomerByEmail(String email) throws CustomerNotFoundException {
        Customer customer = this.customerDAO.findByEmail(email);
        if(customer == null) {
            throw new CustomerNotFoundException();
        }
        return customer;
    }
    @Transactional
    public Customer getCustomerByPhone(String phone) throws CustomerNotFoundException {
        Customer customer = this.customerDAO.findByPhone(phone);
        if(customer == null) {
            throw new CustomerNotFoundException();
        }
        return customer;
    }
    @Transactional
    public Customer addCustomer(Customer customer) throws CustomerAlreadyExistException {
        if (this.customerDAO.existsByEmail(customer.getEmail())) {
            throw new CustomerAlreadyExistException("A customer with this email already exists.");
        }
        return this.customerDAO.save(customer);
    }
    @Transactional
    public boolean existsCustomerByEmail(String email) {
        return this.customerDAO.existsByEmail(email);
    }
    @Transactional
    public boolean existsCustomerByPhone(String phone) {
        return this.customerDAO.existsByPhone(phone);
    }
    @Transactional
    public Customer updateCustomer(Customer customer) throws CustomerNotFoundException, CustomerAlreadyExistException {
        // Check if the customer exists in the database
        Customer existingCustomer = this.customerDAO.findById(customer.getId())
                .orElseThrow(() -> new CustomerNotFoundException());

        // Update the existing customer's details
        existingCustomer.setName(customer.getName());
        existingCustomer.setEmail(customer.getEmail());
        existingCustomer.setPhone(customer.getPhone());
        existingCustomer.setDateOfBirth(customer.getDateOfBirth());
        existingCustomer.setGender(customer.getGender());
        // Add more fields if applicable

        // Save and return the updated customer
        return this.customerDAO.save(existingCustomer);
    }

    @Transactional
    public void deleteCustomer(int id) throws CustomerNotFoundException {
        Customer customer = this.customerDAO.findById(id);
        if(customer == null) {
            throw new CustomerNotFoundException();
        }
        this.bookingDAO.deleteBookingByCustomer(customer);
        this.customerDAO.deleteById(id);
    }

    @Transactional
    public Booking addBooking(Booking booking) {
        if(!availableSlotDAO.existsByEmployeeIdAndSlot(booking.getEmployee().getId(),booking.getChosenBookingTime()))
            throw new RuntimeException();
        availableSlotDAO.deleteByEmployeeIdAndSlot(booking.getEmployee().getId(),booking.getChosenBookingTime());
        return this.bookingDAO.save(booking);
    }

    @Transactional
    public void deleteBooking(int id) {
        this.bookingDAO.deleteById(id);
    }
    @Transactional
    public Booking updateBooking(Booking booking) {
        return this.bookingDAO.save(booking);
    }
    @Transactional
    public List<Booking> getAllCustomerBookings(int customerId) {
        Customer customer = this.customerDAO.findById(customerId);
        if(customer == null) {
            return null;
        }
        return this.bookingDAO.findBookingsByCustomer(customer);
    }
}
