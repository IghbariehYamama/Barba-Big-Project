package com.BackEnd.Appointments.Entities;

import com.BackEnd.Appointments.Enums.Gender;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
@JsonIdentityReference(alwaysAsId = true)
public class Employee extends User {
    @ManyToOne
    @JoinColumn(name = "business_id")
    private Business business;
    @ManyToMany(fetch = FetchType.EAGER)
    List<Service> services;

    @OneToMany(mappedBy = "employee", fetch = FetchType.EAGER)
    private List<Booking> bookings;

    public Employee() {}
    //UPDATE
    public Employee(String name, String email, String password, Business business, String phone, LocalDate dateOfBirth, Gender gender) {
        super(name, email, password, phone, dateOfBirth, gender);
        this.business = business;
    }

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public List<Service> getServices() {
        return services;
    }

    public void setServices(List<Service> services) {
        this.services = services;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    @Override
    public String toString() {
        return super.toString() + "Employee{" +
                "business=" + business.getName() +
                ", services=" + services +
                ", bookings=" + bookings +
                '}';
    }
}