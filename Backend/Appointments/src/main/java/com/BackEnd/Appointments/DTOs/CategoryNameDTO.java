package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.Category;

import java.util.ArrayList;
import java.util.List;

public class CategoryNameDTO {
    private Integer id;
    private String name;

    public CategoryNameDTO() {
    }
    public CategoryNameDTO(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
    public CategoryNameDTO(Category category) {
        this.id = category.getId();
        this.name = category.getName();
    }
    public static List<CategoryNameDTO> toDTO(List<Category> categoryList) {
        List<CategoryNameDTO> categoryNameDTOList = new ArrayList<>();
        for (Category category : categoryList) {
            categoryNameDTOList.add(new CategoryNameDTO(category));
        }
        return categoryNameDTOList;
    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
