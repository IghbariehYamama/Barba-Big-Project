package com.BackEnd.Appointments.Entities;

import com.BackEnd.Appointments.Enums.BookingStatus;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;

import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.JOINED) // Creates separate tables for subclasses but joins them
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonIdentityReference(alwaysAsId = true)
public abstract class BaseBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @ManyToOne
    @JoinColumn(name = "business_id")
    protected Business business;

    @ManyToOne
    @JoinColumn(name = "service_id")
    protected Service service;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    protected Employee employee;

    @Column(name = "chosen_booking_time")
    @Future(message = "Date of Chosen Booking Time must be in the future.")
    protected LocalDateTime chosenBookingTime;

    @Column(name = "cancellation_timestamp")
    private LocalDateTime cancellationTimestamp;

    @Column(name = "booking_timestamp")
    private LocalDateTime bookingTimestamp;

    @Enumerated(EnumType.STRING)
    protected BookingStatus status;

    public BaseBooking() {}

    public BaseBooking(Business business, Service service, Employee employee) {
        this.business = business;
        this.service = service;
        this.employee = employee;
    }
    public BaseBooking(AvailableSlot slot){
        this.business = slot.getBusiness();
        this.service = slot.getService();
        this.employee = slot.getEmployee();
        this.chosenBookingTime = slot.getSlot();
        this.bookingTimestamp = LocalDateTime.now();
    }
    public Integer getId() { return id; }

    public void setId(Integer id) {
        this.id = id;
    }


    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }


    public @Future(message = "Date of Chosen Booking Time must be in the future.") LocalDateTime getChosenBookingTime() {
        return chosenBookingTime;
    }

    public void setChosenBookingTime(@Future(message = "Date of Chosen Booking Time must be in the future.") LocalDateTime chosenBookingTime) {
        this.chosenBookingTime = chosenBookingTime;
    }

    public LocalDateTime getCancellationTimestamp() {
        return cancellationTimestamp;
    }

    public void setCancellationTimestamp(LocalDateTime cancellationTimestamp) {
        this.cancellationTimestamp = cancellationTimestamp;
    }

    public LocalDateTime getBookingTimestamp() {
        return bookingTimestamp;
    }

    public void setBookingTimestamp(LocalDateTime bookingTimestamp) {
        this.bookingTimestamp = bookingTimestamp;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public void book(LocalDateTime chosenBookingTime){
        this.bookingTimestamp = LocalDateTime.now();
        this.chosenBookingTime = chosenBookingTime;
        this.status = BookingStatus.UPCOMING;
    }
    public void cancel(){
        this.cancellationTimestamp = LocalDateTime.now();
        this.status = BookingStatus.CANCELLED;
    }

    public abstract Object getCustomer();


    public abstract String getCustomerName();
    //public abstract String getCustomerType();
    //public abstract String getCustomerPhoneNumber();
    public abstract Integer getCustomerId();

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", business=" + business.getName() +
                ", service=" + service.getName() +
                ", employee=" + employee.getName() +
                ", chosenBookingTime=" + chosenBookingTime +
                ", cancellationTimestamp=" + cancellationTimestamp +
                ", bookingTimestamp=" + bookingTimestamp +
                ", status=" + status +
                '}';
    }
}

