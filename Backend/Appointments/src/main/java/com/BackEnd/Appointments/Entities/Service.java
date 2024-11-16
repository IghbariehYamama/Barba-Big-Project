package com.BackEnd.Appointments.Entities;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="services")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
@JsonIdentityReference(alwaysAsId = true)
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name="name")
    private String name;
    @ManyToOne
    @JoinColumn(name = "business_id")
    private Business business;
    @ManyToMany(fetch = FetchType.EAGER)
    List<Employee> employees;
    @OneToMany(mappedBy = "service", fetch = FetchType.EAGER)
    private List<Booking> Bookings;

    public Service() {
    }

    public Service(Business business, String name, List<Employee> employees, List<Booking> bookings) {
        this.business = business;
        this.name = name;
        this.employees = employees;
        Bookings = bookings;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    public List<Booking> getBookings() {
        return Bookings;
    }

    public void setBookings(List<Booking> bookings) {
        Bookings = bookings;
    }

    @Override
    public String toString() {
        return "Service{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", business=" + business.getName() +
                ", employees=" + employees +
                ", Bookings=" + Bookings +
                '}';
    }
}
