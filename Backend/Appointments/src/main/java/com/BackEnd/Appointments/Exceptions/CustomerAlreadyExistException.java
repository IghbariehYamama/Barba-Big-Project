package com.BackEnd.Appointments.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class CustomerAlreadyExistException extends Exception{
    public CustomerAlreadyExistException(int id){
        super("Customer "+ id +" is Already Exist");
    }
    public CustomerAlreadyExistException(String message){
        super(message);
    }
}
