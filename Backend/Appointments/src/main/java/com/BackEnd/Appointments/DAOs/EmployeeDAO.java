package com.BackEnd.Appointments.DAOs;

import com.BackEnd.Appointments.Entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeDAO extends JpaRepository<Employee, Integer> {
    Employee findEmployeeById(Integer id);
    Employee findEmployeeByEmail(String email);
    Employee findEmployeeByBusinessId(Integer businessId);
}
