package com.BackEnd.Appointments.Repositories;

import com.BackEnd.Appointments.Entities.AvailableSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AvailableSlotRepository extends JpaRepository<AvailableSlot, Integer> {
    List<AvailableSlot> findByEmployeeIdAndSlotBetween(Integer employeeId, LocalDateTime start, LocalDateTime end);
    List<AvailableSlot> findByBusinessIdAndServiceIdAndSlotBetween(
            Integer businessId, Integer serviceId, LocalDateTime start, LocalDateTime end);
    List<AvailableSlot> findByBusinessIdAndSlotBetween(Integer businessId, LocalDateTime start, LocalDateTime end);
    List<AvailableSlot> findBySlotBetween(LocalDateTime start, LocalDateTime end);
    List<AvailableSlot> findByEmployeeId(Integer employeeId);
    void deleteByEmployeeIdAndSlot(Integer employeeId, LocalDateTime slot);
    boolean existsByEmployeeIdAndSlot(Integer employeeId, LocalDateTime slot);

}
