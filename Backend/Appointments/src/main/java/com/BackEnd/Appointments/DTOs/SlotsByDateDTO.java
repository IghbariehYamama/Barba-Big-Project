package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.AvailableSlot;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SlotsByDateDTO {
    private LocalDate date;
    private List<SlotByEmployeeDTO> employees;

    public SlotsByDateDTO() {
    }

    public SlotsByDateDTO(LocalDate date, List<SlotByEmployeeDTO> employees) {
        this.date = date;
        this.employees = employees;
    }
    public static List<SlotsByDateDTO> toDTOs(List<AvailableSlot> availableSlots) {
        // Step 1: Group by Date -> Employee -> Slots (as LocalTime)
        Map<LocalDate, Map<Integer, List<LocalTime>>> grouped = new HashMap<>();

        for (AvailableSlot slot : availableSlots) {
            LocalDate date = slot.getSlot().toLocalDate();
            Integer employeeId = slot.getEmployee().getId();
            LocalTime time = slot.getSlot().toLocalTime();

            grouped
                    .computeIfAbsent(date, d -> new HashMap<>())
                    .computeIfAbsent(employeeId, e -> new ArrayList<>())
                    .add(time);
        }

        // Step 2: Convert to DTOs
        List<SlotsByDateDTO> result = new ArrayList<>();

        for (Map.Entry<LocalDate, Map<Integer, List<LocalTime>>> dateEntry : grouped.entrySet()) {
            List<SlotByEmployeeDTO> employeeList = new ArrayList<>();

            for (Map.Entry<Integer, List<LocalTime>> empEntry : dateEntry.getValue().entrySet()) {
                employeeList.add(new SlotByEmployeeDTO(empEntry.getKey(), empEntry.getValue()));
            }

            result.add(new SlotsByDateDTO(dateEntry.getKey(), employeeList));
        }

        return result;
    }
    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<SlotByEmployeeDTO> getEmployees() {
        return employees;
    }

    public void setEmployees(List<SlotByEmployeeDTO> employees) {
        this.employees = employees;
    }
}