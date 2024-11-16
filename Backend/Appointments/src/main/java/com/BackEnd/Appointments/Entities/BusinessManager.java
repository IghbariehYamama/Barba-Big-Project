package com.BackEnd.Appointments.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class BusinessManager extends User {
    @OneToMany(mappedBy = "businessManager")
    private List<Business> managedBusinesses;

    public BusinessManager() {}
    public BusinessManager(String name, String email, String password, String phone) {
        super(name, email, password, phone);
    }

    // Getters and Setters here...
}
