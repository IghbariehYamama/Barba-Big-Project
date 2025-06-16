package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.Coordinates;

public class CoordinatesDTO {
    private String latitude;
    private String longitude;

    public CoordinatesDTO() {
    }

    public CoordinatesDTO(String latitude, String longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public CoordinatesDTO(Coordinates coordinates){
        System.out.println("Creating CoordinatesDTO from: " + coordinates.toString());
        this.latitude = Double.toString(coordinates.getLatitude());
        this.longitude = Double.toString(coordinates.getLongitude());
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    @Override
    public String toString() {
        return "CoordinatesDTO{" +
                "latitude='" + latitude + '\'' +
                ", longitude='" + longitude + '\'' +
                '}';
    }
}
