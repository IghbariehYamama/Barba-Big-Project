package com.BackEnd.Appointments.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class EcoManager extends User {

    public EcoManager() {}
    public EcoManager(String name, String email, String password, String phone) {
        super(name, email, password, phone);;
    }
}