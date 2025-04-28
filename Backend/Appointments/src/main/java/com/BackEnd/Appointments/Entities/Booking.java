package com.BackEnd.Appointments.Entities;


import jakarta.persistence.*;


@Entity
@Table(name = "bookings")
@DiscriminatorValue("NORMAL")
public class Booking extends BaseBooking {
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    public Booking() {
    }

    public Booking(Business business, Service service, Employee employee, Customer customer) {
        super(business, service, employee);
        this.customer = customer;
    }

    @Override
    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }


    @Override
    public String getCustomerName() {
        return customer.getName();
    }

    @Override
    public Integer getCustomerId(){
        return customer.getId();
    }

    @Override
    public String toString() {
        return super.toString() + ", customer=" + customer.getName() + "}";
    }
}
