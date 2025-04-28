package com.BackEnd.Appointments.DAOs;

import com.BackEnd.Appointments.Entities.AvailableSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AvailableSlotDAO extends JpaRepository<AvailableSlot, Integer> {
    List<AvailableSlot> findByEmployeeIdAndSlotBetween(Integer employeeId, LocalDateTime start, LocalDateTime end);
    List<AvailableSlot> findByBusinessIdAndServiceIdAndSlotBetween(
            Integer businessId, Integer serviceId, LocalDateTime start, LocalDateTime end);
    List<AvailableSlot> findByBusinessIdAndSlotBetween(Integer businessId, LocalDateTime start, LocalDateTime end);
    List<AvailableSlot> findBySlotBetween(LocalDateTime start, LocalDateTime end);
    List<AvailableSlot> findByEmployeeId(Integer employeeId);
    void deleteByEmployeeIdAndSlot(Integer employeeId, LocalDateTime slot);
    boolean existsByEmployeeIdAndSlot(Integer employeeId, LocalDateTime slot);

}
