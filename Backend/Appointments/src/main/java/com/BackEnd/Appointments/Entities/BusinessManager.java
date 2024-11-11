package com.BackEnd.Appointments.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class BusinessManager extends User {
    @OneToMany(mappedBy = "businessManager")
    private List<Business> managedBusinesses;

    public BusinessManager() {}
    public BusinessManager(String name, String email, String password) {
        super(name, email, password);
    }

    // Getters and Setters here...
}
