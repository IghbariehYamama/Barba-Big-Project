package com.BackEnd.Appointments.BLs;

import com.BackEnd.Appointments.DAOs.BusinessDAO;
import com.BackEnd.Appointments.Entities.Business;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessBL {
    @Autowired
    private BusinessDAO businessDAO;
    @Autowired
    @Lazy
    private ServiceBL serviceBL;

    public List<Business> getAllBusiness() {
        return this.businessDAO.findAll();
    }
    public Business getBusinessById(int id) {
        return this.businessDAO.findById(id);
    }
    public Business getBusinessByName(String name) {
        return this.businessDAO.findByName(name);
    }
    public Business updateBusiness(Business business) {
        return this.businessDAO.save(business);
    }
    public void deleteBusiness(int id) {
        this.businessDAO.deleteById(id);
    }
    public Business addBusiness(Business business) {
        return this.businessDAO.save(business);
    }
}
