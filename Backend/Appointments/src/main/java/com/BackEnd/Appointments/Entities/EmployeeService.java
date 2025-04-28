package com.BackEnd.Appointments.Entities;

import com.BackEnd.Appointments.Enums.GenderService;
import jakarta.persistence.*;

@Entity
@Table(name = "employee_service")
public class EmployeeService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;

    @Column(name = "duration") // Duration in minutes
    private Integer duration;
    @Enumerated(EnumType.STRING) // Store as String in the database
    @Column(name = "gender_service")
    private GenderService genderService;
    @Column(name = "price")
    private Double price;

    public EmployeeService() {
    }

    public EmployeeService(Employee employee, Service service, Integer duration) {
        this.employee = employee;
        this.service = service;
        this.duration = duration;
    }

    // Getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public GenderService getGenderService() {
        return genderService;
    }

    public void setGenderService(GenderService genderService) {
//        switch (genderService) {
//            case MALE:
//                if(service.getGenderService() == GenderService.FEMALE)
//                    throw new IllegalAccessException("");
//            case FEMALE: if(service.getGenderService() == GenderService.FEMALE)
//                throw new IllegalAccessException("");
//        }
        this.genderService = genderService;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}

