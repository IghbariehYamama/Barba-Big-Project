package com.BackEnd.Appointments.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Employee extends User {
    @ManyToOne
    private Business business;

    @OneToMany(mappedBy = "employee", fetch = FetchType.EAGER)
    private List<Appointment> appointments;

    public Employee() {}
    public Employee(String name, String email, String password, Business business) {
        super(name, email, password);
        this.business = business;
    }

    // Getters and Setters here...
}