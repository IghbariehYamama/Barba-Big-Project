package com.BackEnd.Appointments.DAOs;

import com.BackEnd.Appointments.Entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryDAO extends JpaRepository<Category, Integer> {
}
