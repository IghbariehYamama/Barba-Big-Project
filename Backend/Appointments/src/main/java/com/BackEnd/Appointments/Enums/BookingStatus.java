package com.BackEnd.Appointments.Enums;

public enum BookingStatus {
    CANCELLED,          // The booking was cancelled
    NO_SHOW,            // The customer did not arrive at their booking time
    UPCOMING,           // The booking time has not come yet
    COMPLETED           // The booking was completed successfully
}
