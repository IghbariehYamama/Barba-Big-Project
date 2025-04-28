package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.AvailableSlot;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class SlotByEmployeeDTO {
    private Integer employeeId;
    @JsonFormat(pattern = "HH:mm")
    private List<LocalTime> slots;

    public SlotByEmployeeDTO() {
    }

    public SlotByEmployeeDTO(Integer employeeId, List<LocalTime> slots) {
        this.employeeId = employeeId;
        this.slots = slots;
    }

    public List<LocalTime> getSlots() {
        return slots;
    }

    public void setSlots(List<LocalTime> slots) {
        this.slots = slots;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    @Override
    public String toString() {
        return "SlotByEmployeeDTO{" +
                "employeeId=" + employeeId +
                ", slots=" + slots +
                '}';
    }
}


