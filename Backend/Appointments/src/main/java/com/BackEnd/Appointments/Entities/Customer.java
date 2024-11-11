package com.BackEnd.Appointments.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Customer extends User {
    @OneToMany(mappedBy = "customer", fetch = FetchType.EAGER)
    private List<Appointment> appointments;

    public Customer() {}
    public Customer(String name, String email, String password) {
        super(name, email, password);
    }
}