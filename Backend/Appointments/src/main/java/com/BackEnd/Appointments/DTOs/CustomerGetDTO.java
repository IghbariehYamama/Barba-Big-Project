package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.Customer;

import java.util.ArrayList;
import java.util.List;

public class CustomerGetDTO extends UserGetDTO {
    private List<BookingGetDTO> bookingDTOs;
    public CustomerGetDTO() {
    }
    public CustomerGetDTO(Customer customer) {
        super(customer);
        this.bookingDTOs = BookingGetDTO.toDTO(customer.getBookings());
    }
    public List<BookingGetDTO> getBookingDTOs() {
        return bookingDTOs;
    }

    public void setBookingDTOs(List<BookingGetDTO> bookingDTOs) {
        this.bookingDTOs = bookingDTOs;
    }
}
