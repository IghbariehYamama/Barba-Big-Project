package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Enums.BookingStatus;

public class BookingStatusDTO {
    private int bookingId;
    private BookingStatus bookingStatus;
    public BookingStatusDTO() {

    }
    public BookingStatusDTO(Integer bookingId, BookingStatus bookingStatus) {
        this.bookingId = bookingId;
        this.bookingStatus = bookingStatus;
    }
    public int getBookingId() {
        return bookingId;
    }
    public void setBookingId(Integer bookingId) {
        this.bookingId = bookingId;
    }
    public BookingStatus getBookingStatus() {
        return bookingStatus;
    }
    public void setBookingStatus(BookingStatus bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

}
