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
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<EmployeeService> employeeServices;

    @OneToMany(mappedBy = "employee", fetch = FetchType.EAGER)
    private List<BaseBooking> bookings;
    @OneToMany(mappedBy = "employee", fetch = FetchType.EAGER)
    private List<AvailableSlot> availableSlots;


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

    public List<BaseBooking> getBookings() {
        return bookings;
    }
    public List<AvailableSlot> getAvailableSlots() {
        return availableSlots;
    }

    public void setAvailableSlots(List<AvailableSlot> availableSlots) {
        this.availableSlots = availableSlots;
    }
    public void setBookings(List<BaseBooking> bookings) {
        this.bookings = bookings;
    }

    public List<EmployeeService> getEmployeeServices() {
        return employeeServices;
    }

    public void setEmployeeServices(List<EmployeeService> employeeServices) {
        this.employeeServices = employeeServices;
    }

    @Override
    public String toString() {
        return super.toString() + "Employee{" +
                "business=" + business.getName() +
                ", bookings=" + bookings +
                '}';
    }
}