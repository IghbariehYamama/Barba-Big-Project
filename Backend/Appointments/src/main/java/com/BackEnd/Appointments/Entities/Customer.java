package com.BackEnd.Appointments.Entities;

import com.BackEnd.Appointments.Enums.Gender;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
public class Customer extends User {

    @OneToMany(mappedBy = "customer", fetch = FetchType.EAGER)
    private List<Booking> bookings;

    public Customer() {}
    public Customer(String name, String email, String password, String phone, LocalDate dateOfBirth, Gender gender) {
        super(name, email, password, phone,dateOfBirth, gender);;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    @Override
    public String toString() {
        return super.toString() + "Customer{" +
                "bookings=" + bookings +
                '}';
    }
}