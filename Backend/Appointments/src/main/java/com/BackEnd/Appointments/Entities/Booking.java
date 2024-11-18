package com.BackEnd.Appointments.Entities;

import com.BackEnd.Appointments.Enums.BookingStatus;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;

import java.time.LocalDateTime;

@Entity
@Table(name="bookings")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
@JsonIdentityReference(alwaysAsId = true)
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "business_id")
    private Business business;
    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    @Column(name = "chosen_booking_time")
    @Future(message = "Date of Chosen Booking Time must be in the future.")
    private LocalDateTime chosenBookingTime;
    @Column(name = "cancellation_timestamp")
    private LocalDateTime cancellationTimestamp;
    @Column(name = "booking_timestamp")
    private LocalDateTime bookingTimestamp;
    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    public Booking() {
    }

    public Booking(Business business, Service service, Employee employee, Customer customer) {
        this.business = business;
        this.service = service;
        this.employee = employee;
        this.customer = customer;
    }

    public Integer getId() {
        return id;
    }

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

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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


    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", business=" + business.getName() +
                ", service=" + service.getName() +
                ", employee=" + employee.getName() +
                ", customer=" + customer.getName() +
                ", chosenBookingTime=" + chosenBookingTime +
                ", cancellationTimestamp=" + cancellationTimestamp +
                ", bookingTimestamp=" + bookingTimestamp +
                ", status=" + status +
                '}';
    }
}
