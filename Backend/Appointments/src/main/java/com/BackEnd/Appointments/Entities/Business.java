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
    @Column(name="phone")
    private String phone;
    @Column(name="location")
    private String location;
    @Column(name="about_us")
    private String aboutUs;
    @Column(name="website")
    private String website;
    @OneToMany(mappedBy = "business", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<WorkingHours> workingHours;

    public Business(String name, List<Service> services, List<Employee> employees, BusinessManager businessManager, String phone, String location, String aboutUs, String website, List<WorkingHours> workingHours) {
        this.name = name;
        this.services = services;
        this.employees = employees;
        this.businessManager = businessManager;
        this.phone = phone;
        this.location = location;
        this.aboutUs = aboutUs;
        this.website = website;
        this.workingHours = workingHours;
    }

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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAboutUs() {
        return aboutUs;
    }

    public void setAboutUs(String aboutUs) {
        this.aboutUs = aboutUs;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public List<WorkingHours> getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(List<WorkingHours> workingHours) {
        this.workingHours = workingHours;
    }

    @Override
    public String toString() {
        return "Business{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", services=" + services +
                ", employees=" + employees +
                ", businessManager=" + businessManager +
                ", phone='" + phone + '\'' +
                ", location='" + location + '\'' +
                ", aboutUs='" + aboutUs + '\'' +
                ", website='" + website + '\'' +
                ", workingHours=" + workingHours +
                '}';
    }
}
