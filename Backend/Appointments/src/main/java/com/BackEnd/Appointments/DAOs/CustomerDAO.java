package com.BackEnd.Appointments.DAOs;

import com.BackEnd.Appointments.Entities.Customer;
import org.hibernate.type.descriptor.converter.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerDAO extends JpaRepository<Customer, Integer> {
    Customer findByEmail(String email);
    Customer findByPhone(String phone);
    Customer findByEmailAndPhone(String email, String phone);
    Customer findByPhoneAndEmail(String phone, String email);
    Customer findById(int id);
    //Customer findCustomerByBookingId(int bookingId);
    List<Customer> findAll();
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
}
