package com.BackEnd.Appointments.Repositories;

import com.BackEnd.Appointments.Entities.Employee;
import com.BackEnd.Appointments.Entities.EmployeeService;
import com.BackEnd.Appointments.Entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeServiceRepository extends JpaRepository<EmployeeService, Integer> {
    // Custom query to find by employee and service
    Optional<EmployeeService> findByEmployeeAndService(Employee employee, Service service);
}
