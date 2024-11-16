package com.BackEnd.Appointments.Entities;

import jakarta.persistence.Entity;

@Entity
public class Manager extends User {
    public Manager() {}
    public Manager(String name, String email, String password, String phone) {
        super(name, email, password, phone);
    }
}