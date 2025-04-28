package com.BackEnd.Appointments.Entities;

import com.BackEnd.Appointments.Enums.GenderService;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.HashMap;
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
    @Enumerated(EnumType.STRING)
    @Column(name = "gender_service")
    private GenderService genderService;
    @Column(name = "price")
    private Double price;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @ManyToOne
    @JoinColumn(name = "business_id")
    private Business business;
    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<EmployeeService> employeeServices;
    @OneToMany(mappedBy = "service", fetch = FetchType.EAGER)
    private List<Booking> bookings;
    @OneToMany(mappedBy = "service", fetch = FetchType.EAGER)
    private List<AvailableSlot> availableSlots;

    public Service() {
    }

    public Service(String name, Double price, Category category, Integer duration, Business business, List<Employee> employees, List<Booking> bookings) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.business = business;
        this.bookings = bookings;
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

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public List<AvailableSlot> getAvailableSlots() {
        return availableSlots;
    }

    public void setAvailableSlots(List<AvailableSlot> availableSlots) {
        this.availableSlots = availableSlots;
    }

    public GenderService getGenderService() {
        return genderService;
    }

    public void setGenderService(GenderService genderService) {
        this.genderService = genderService;
    }

    public List<EmployeeService> getEmployeeServices() {
        return employeeServices;
    }

    public void setEmployeeServices(List<EmployeeService> employeeServices) {
        this.employeeServices = employeeServices;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

//    @Override
//    public String toString() {
//        return "Service{" +
//                "id=" + id +
//                ", name='" + name + '\'' +
//                ", business=" + business.getName() +
//                ", Bookings=" + bookings +
//                '}';
//    }

    @Override
    public String toString() {
        return "Service{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", category=" + category.getName() +
                ", business=" + business.getName() +
                ", employeeServices=" + employeeServices +
                ", bookings=" + bookings +
                '}';
    }
}
