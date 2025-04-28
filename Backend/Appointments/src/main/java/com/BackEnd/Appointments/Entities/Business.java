package com.BackEnd.Appointments.Entities;
import com.BackEnd.Appointments.Enums.GenderService;
import com.fasterxml.jackson.annotation.*;
import io.swagger.v3.oas.annotations.links.Link;
import io.swagger.v3.oas.annotations.links.LinkParameter;
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
    @Enumerated(EnumType.STRING)
    @Column(name = "gender_service")
    private GenderService genderService;
    @ManyToMany
    private List<Category> categories;
    @OneToMany(mappedBy = "business", fetch = FetchType.EAGER)
    private List<Service> services;
    @OneToMany(mappedBy = "business", fetch = FetchType.EAGER)
    private List<Employee> employees;
    @OneToMany(mappedBy = "business", fetch = FetchType.EAGER)
    private List<BaseBooking> bookings;
    @OneToMany(mappedBy = "business", fetch = FetchType.EAGER)
    private List<AvailableSlot> availableSlots;
    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;
    @ManyToOne
    private BusinessManager businessManager;
    @Column(name="phone")
    private String phone;
    @Column(name="about_us")
    private String aboutUs;
    @Column(name="google_maps")
    private String googleMaps;
    @Column(name="waze")
    private String waze;
    @Column(name = "location")
    private String location;
    @Column(name="website")
    private String website;
    @Column(name = "facebook")
    private String facebook;
    @Column(name = "instagram")
    private String instagram;
    @Column(name = "tiktok")
    private String tiktok;

    @OneToMany(mappedBy = "business", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Bookmark> bookmarks;


    @OneToMany(mappedBy = "business", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<WorkingHours> workingHours;




    @Column(name = "distance")
    private String distance;
    @Column(name = "rating")
    private double rating;


    public Business() {
    }


    public Business(String name, List<Category> categories, List<Employee> employees, List<Service> services, List<BaseBooking> bookings, String location, double rating, String distance) {
        this.name = name;
        this.categories = categories;
        this.employees = employees;
        this.services = services;
        this.bookings = bookings;
        this.location = location;
        this.rating = rating;
        this.distance = distance;
    }

    public Business(String name, List<Category> categories, List<Service> services, List<Employee> employees, List<BaseBooking> bookings, BusinessManager businessManager, String phone, String googleMaps, String aboutUs, String website, List<WorkingHours> workingHours) {
        this.name = name;
        this.categories = categories;
        this.services = services;
        this.employees = employees;
        this.bookings = bookings;
        this.businessManager = businessManager;
        this.phone = phone;
        this.googleMaps = googleMaps;
        this.aboutUs = aboutUs;
        this.website = website;
        this.workingHours = workingHours;
    }

    public String getDistance() {
        return distance;
    }

    public void setDistance(String distance) {
        this.distance = distance;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<Service> getServices() {
        return services;
    }

    public void setServices(List<Service> services) {
        this.services = services;
    }

    public GenderService getGenderService() {
        return genderService;
    }

    public void setGenderService(GenderService genderService) {
        this.genderService = genderService;
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

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getGoogleMaps() {
        return googleMaps;
    }

    public void setGoogleMaps(String location) {
        this.googleMaps = location;
    }

    public String getAboutUs() {
        return aboutUs;
    }

    public String getWaze() {
        return waze;
    }

    public void setWaze(String waze) {
        this.waze = waze;
    }

    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getInstagram() {
        return instagram;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }

    public String getTiktok() {
        return tiktok;
    }

    public void setTiktok(String tiktok) {
        this.tiktok = tiktok;
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

    public List<BaseBooking> getBookings() {
        return bookings;
    }

    public void setBookings(List<BaseBooking> bookings) {
        this.bookings = bookings;
    }
    public List<AvailableSlot> getAvailableSlots() {
        return availableSlots;
    }

    public void setAvailableSlots(List<AvailableSlot> availableSlots) {
        this.availableSlots = availableSlots;
    }
    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public List<Bookmark> getBookmarks() {
        return bookmarks;
    }

    public void setBookmarks(List<Bookmark> bookmarks) {
        this.bookmarks = bookmarks;
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
                ", location='" + googleMaps + '\'' +
                ", aboutUs='" + aboutUs + '\'' +
                ", website='" + website + '\'' +
                ", workingHours=" + workingHours +
                '}';
    }
}
