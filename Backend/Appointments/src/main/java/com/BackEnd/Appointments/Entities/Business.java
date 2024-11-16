package com.BackEnd.Appointments.Entities;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="businesses")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
@JsonIdentityReference(alwaysAsId = true)
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name="name")
    private String name;
    @OneToMany(mappedBy = "business", fetch = FetchType.EAGER)
    private List<Service> services;
    @OneToMany(mappedBy = "business", fetch = FetchType.EAGER)
    private List<Employee> employees;
    @ManyToOne
    private BusinessManager businessManager;

    public Business() {
    }

    public Business(String name, List<Service> services, List<Employee> employees, BusinessManager businessManager) {
        this.name = name;
        this.services = services;
        this.employees = employees;
        this.businessManager = businessManager;
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

    public List<Service> getServices() {
        return services;
    }

    public void setServices(List<Service> services) {
        this.services = services;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    public BusinessManager getBusinessManager() {
        return businessManager;
    }

    public void setBusinessManager(BusinessManager businessManager) {
        this.businessManager = businessManager;
    }

    @Override
    public String toString() {
        return "Business{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", services=" + services +
                ", employees=" + employees +
                ", businessManager=" + businessManager +
                '}';
    }
}
