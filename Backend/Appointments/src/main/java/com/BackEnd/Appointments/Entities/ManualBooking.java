package com.BackEnd.Appointments.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "manual_bookings")
@DiscriminatorValue("MANUAL")
public class ManualBooking extends BaseBooking {
    @ManyToOne
    @JoinColumn(name = "manual_customer_id")
    private ManualCustomer manualCustomer;

    public ManualBooking() {}

    public ManualBooking(Business business, Service service, Employee employee, ManualCustomer manualCustomer) {
        super(business, service, employee);
        this.manualCustomer = manualCustomer;
    }

    @Override
    public ManualCustomer getCustomer() {
        return manualCustomer;
    }
    @Override
    public Integer getCustomerId(){
        return manualCustomer.getId();
    }
    @Override
    public String getCustomerName() {
        return manualCustomer.getName();
    }


    @Override
    public String toString() {
        return super.toString() + ", manualCustomer=" + manualCustomer.getName() + "}";
    }
}

