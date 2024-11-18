package com.BackEnd.Appointments.Controllers;

import com.BackEnd.Appointments.BLs.BusinessBL;
import com.BackEnd.Appointments.DTOs.*;
import com.BackEnd.Appointments.Entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/businesses")
@Validated
public class BusinessController {
    @Autowired
    private BusinessBL businessBL;

    @GetMapping("/get/all")
    public List<BusinessGetDTO> getAllBusinesses() {
        List<Business> businesses = this.businessBL.getAllBusiness();
        List<BusinessGetDTO> res = new ArrayList<>();
        for(Business business : businesses){
            BusinessGetDTO businessGet = new BusinessGetDTO();
            businessGet.setId(business.getId());
            businessGet.setName(business.getName());
            List<EmployeeNameDTO> employeeNameDTOList = new ArrayList<>();
            for(Employee employee : business.getEmployees()){
                EmployeeNameDTO employeeNameDTO = new EmployeeNameDTO();
                employeeNameDTO.setId(employee.getId());
                employeeNameDTO.setName(employee.getName());
                employeeNameDTOList.add(employeeNameDTO);
            }
            businessGet.setEmployees(employeeNameDTOList);
            List<ServiceNameDTO> serviceNameDTOList = new ArrayList<>();
            for(Service service : business.getServices()){
                ServiceNameDTO serviceNameDTO = new ServiceNameDTO();
                serviceNameDTO.setId(service.getId());
                serviceNameDTO.setName(service.getName());
                serviceNameDTOList.add(serviceNameDTO);
            }
            businessGet.setServices(serviceNameDTOList);
            businessGet.setLocation(business.getLocation());
            businessGet.setPhone(business.getPhone());
            businessGet.setAboutUs(business.getAboutUs());
            businessGet.setWebsite(business.getWebsite());
            List<WorkingHoursDTO> workingHoursDTOList = new ArrayList<>();
            for(WorkingHours workingHours : business.getWorkingHours()){
                WorkingHoursDTO workingHoursDTO = new WorkingHoursDTO();
                workingHoursDTO.setDayOfWeek(workingHours.getDayOfWeek());
                workingHoursDTO.setEndTime(workingHours.getEndTime());
                workingHoursDTO.setStartTime(workingHours.getStartTime());
                workingHoursDTOList.add(workingHoursDTO);
            }
            businessGet.setWorkingHours(workingHoursDTOList);
            res.add(businessGet);

        }
        return res;
    }
    @GetMapping("/get/{id}")
    public BusinessGetDTO getBooking(@PathVariable Integer id) {
        Business business = this.businessBL.getBusinessById(id);
        BusinessGetDTO businessGet = new BusinessGetDTO();
        businessGet.setId(business.getId());
        businessGet.setName(business.getName());
        List<EmployeeNameDTO> employeeNameDTOList = new ArrayList<>();
        for(Employee employee : business.getEmployees()){
            EmployeeNameDTO employeeNameDTO = new EmployeeNameDTO();
            employeeNameDTO.setId(employee.getId());
            employeeNameDTO.setName(employee.getName());
            employeeNameDTOList.add(employeeNameDTO);
        }
        businessGet.setEmployees(employeeNameDTOList);
        List<ServiceNameDTO> serviceNameDTOList = new ArrayList<>();
        for(Service service : business.getServices()){
            ServiceNameDTO serviceNameDTO = new ServiceNameDTO();
            serviceNameDTO.setId(service.getId());
            serviceNameDTO.setName(service.getName());
            serviceNameDTOList.add(serviceNameDTO);
        }
        businessGet.setServices(serviceNameDTOList);
        businessGet.setLocation(business.getLocation());
        businessGet.setPhone(business.getPhone());
        businessGet.setAboutUs(business.getAboutUs());
        businessGet.setWebsite(business.getWebsite());
        List<WorkingHoursDTO> workingHoursDTOList = new ArrayList<>();
        for(WorkingHours workingHours : business.getWorkingHours()){
            WorkingHoursDTO workingHoursDTO = new WorkingHoursDTO();
            workingHoursDTO.setDayOfWeek(workingHours.getDayOfWeek());
            workingHoursDTO.setEndTime(workingHours.getEndTime());
            workingHoursDTO.setStartTime(workingHours.getStartTime());
            workingHoursDTOList.add(workingHoursDTO);
        }
        businessGet.setWorkingHours(workingHoursDTOList);
        return businessGet;
    }
}
