package com.BackEnd.Appointments.Services;

import com.BackEnd.Appointments.Repositories.AvailableSlotRepository;
import com.BackEnd.Appointments.Repositories.BookingRepository;
import com.BackEnd.Appointments.Repositories.CustomerRepository;
import com.BackEnd.Appointments.Entities.Booking;
import com.BackEnd.Appointments.Entities.Customer;
import com.BackEnd.Appointments.Exceptions.CustomerAlreadyExistException;
import com.BackEnd.Appointments.Exceptions.CustomerNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private BookingRepository bookingDAO;
    @Autowired
    private AvailableSlotRepository availableSlotRepository;

    @Transactional
    public List<Customer> getAllCustomers() {
        return this.customerRepository.findAll();
    }
    @Transactional
    public Customer getCustomerByID(int id) throws CustomerNotFoundException {
        Customer customer = this.customerRepository.findById(id);
        if(customer == null) {
            throw new CustomerNotFoundException();
        }
        return customer;
    }
    @Transactional
    public Customer getCustomerByEmail(String email) throws CustomerNotFoundException {
        Customer customer = this.customerRepository.findByEmail(email);
        if(customer == null) {
            throw new CustomerNotFoundException();
        }
        return customer;
    }
    @Transactional
    public Customer getCustomerByPhone(String phone) throws CustomerNotFoundException {
        Customer customer = this.customerRepository.findByPhone(phone);
        if(customer == null) {
            throw new CustomerNotFoundException();
        }
        return customer;
    }
    @Transactional
    public Customer addCustomer(Customer customer) throws CustomerAlreadyExistException {
        if (this.customerRepository.existsByEmail(customer.getEmail())) {
            throw new CustomerAlreadyExistException("A customer with this email already exists.");
        }
        return this.customerRepository.save(customer);
    }
    @Transactional
    public boolean existsCustomerByEmail(String email) {
        return this.customerRepository.existsByEmail(email);
    }
    @Transactional
    public boolean existsCustomerByPhone(String phone) {
        return this.customerRepository.existsByPhone(phone);
    }
    @Transactional
    public Customer updateCustomer(Customer customer) throws CustomerNotFoundException, CustomerAlreadyExistException {
        // Check if the customer exists in the database
        Customer existingCustomer = this.customerRepository.findById(customer.getId())
                .orElseThrow(() -> new CustomerNotFoundException());

        // Update the existing customer's details
        existingCustomer.setName(customer.getName());
        existingCustomer.setEmail(customer.getEmail());
        existingCustomer.setPhone(customer.getPhone());
        existingCustomer.setDateOfBirth(customer.getDateOfBirth());
        existingCustomer.setGender(customer.getGender());
        // Add more fields if applicable

        // Save and return the updated customer
        return this.customerRepository.save(existingCustomer);
    }

    @Transactional
    public void deleteCustomer(int id) throws CustomerNotFoundException {
        Customer customer = this.customerRepository.findById(id);
        if(customer == null) {
            throw new CustomerNotFoundException();
        }
        this.bookingDAO.deleteBookingByCustomer(customer);
        this.customerRepository.deleteById(id);
    }

    @Transactional
    public Booking addBooking(Booking booking) {
        if(!availableSlotRepository.existsByEmployeeIdAndSlot(booking.getEmployee().getId(),booking.getChosenBookingTime()))
            throw new RuntimeException();
        availableSlotRepository.deleteByEmployeeIdAndSlot(booking.getEmployee().getId(),booking.getChosenBookingTime());
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
        Customer customer = this.customerRepository.findById(customerId);
        if(customer == null) {
            return null;
        }
        return this.bookingDAO.findBookingsByCustomer(customer);
    }
}
