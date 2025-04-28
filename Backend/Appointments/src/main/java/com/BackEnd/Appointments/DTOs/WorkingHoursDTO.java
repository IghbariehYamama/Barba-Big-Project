package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.WorkingHours;

import java.time.LocalTime;
import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

public class WorkingHoursDTO {
    private DayOfWeek dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;

    // Constructor
    public WorkingHoursDTO() {
    }

    public WorkingHoursDTO(DayOfWeek dayOfWeek, LocalTime startTime, LocalTime endTime) {
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
    }
    public WorkingHoursDTO(WorkingHours workingHours) {
        this.dayOfWeek = workingHours.getDayOfWeek();
        this.startTime = workingHours.getStartTime();
        this.endTime = workingHours.getEndTime();
    }
    public static List<WorkingHoursDTO> dtos(List<WorkingHours> workingHoursList) {
        List<WorkingHoursDTO> workingHoursDTOList = new ArrayList<>();
        for (WorkingHours workingHours : workingHoursList) {
            workingHoursDTOList.add(new WorkingHoursDTO(workingHours));
        }
        return workingHoursDTOList;
    }

    // Getters and setters
    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }
}

