package com.BackEnd.Appointments.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "bookmarks")
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    @ManyToOne
    @JoinColumn(name = "business_id")
    private Business business;

    public Bookmark() {
    }

    public Bookmark(Customer customer, Business business) {
        this.customer = customer;
        this.business = business;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    @Override
    public String toString() {
        return "Bookmark{" +
                "id=" + id +
                ", customer=" + customer.getName() +
                ", business=" + business.getName() +
                '}';
    }
}
