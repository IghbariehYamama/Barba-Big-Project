package com.BackEnd.Appointments.Entities;

import jakarta.persistence.Entity;

@Entity
public class EcoManager extends User {
    public EcoManager() {}
    public EcoManager(String name, String email, String password) {
        super(name, email, password);
    }
}