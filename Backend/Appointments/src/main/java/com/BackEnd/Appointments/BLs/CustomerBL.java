package com.BackEnd.Appointments.BLs;

import com.BackEnd.Appointments.DAOs.BookingDAO;
import com.BackEnd.Appointments.DAOs.CustomerDAO;
import com.BackEnd.Appointments.Entities.Booking;
import com.BackEnd.Appointments.Entities.Customer;
import com.BackEnd.Appointments.Exceptions.CustomerAlreadyExistException;
import com.BackEnd.Appointments.Exceptions.CustomerNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerBL {
    @Autowired
    private CustomerDAO customerDAO;
    @Autowired
    private BookingDAO bookingDAO;

    public List<Customer> getAllCustomers() {
        return this.customerDAO.findAll();
    }
    public Customer getCustomer(int id) throws CustomerNotFoundException {
        Customer customer = this.customerDAO.findById(id);
        if(customer == null) {
            throw new CustomerNotFoundException();
        }
        return customer;
    }
    public Customer addCustomer(Customer customer) throws CustomerAlreadyExistException {
        if(customer.getId() != null) {
            throw new CustomerAlreadyExistException(customer.getId());
        }
        return this.customerDAO.save(customer);
    }
    public Customer updateCustomer(Customer customer) throws CustomerNotFoundException {
        customer = this.customerDAO.findById(customer.getId().intValue());
        if(customer == null) {
            throw new CustomerNotFoundException();
        }
        return this.customerDAO.save(customer);
    }
    public void deleteCustomer(int id) throws CustomerNotFoundException {
        Customer customer = this.customerDAO.findById(id);
        if(customer == null) {
            throw new CustomerNotFoundException();
        }
        this.customerDAO.deleteById(id);
    }

    public Booking addBooking(Booking booking) {
        return this.bookingDAO.save(booking);
    }

    public void deleteBooking(int id) {
        this.bookingDAO.deleteById(id);
    }
    public Booking updateBooking(Booking booking) {
        return this.bookingDAO.save(booking);
    }
}
