package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.Customer;
import com.BackEnd.Appointments.Enums.Gender;

import java.time.LocalDate;
import java.util.List;

public class CustomerDTO extends UserDTO{
    private List<BookingGetDTO> bookingDTOs;

    public CustomerDTO() {}

    public CustomerDTO(String email, String name, String password, String phone, LocalDate dateOfBirth, Gender gender, List<BookingGetDTO> bookingDTOs) {
        super(email, name, password, phone, dateOfBirth, gender);
        this.bookingDTOs = bookingDTOs;
    }
    public CustomerDTO(Customer customer) {
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
