package com.BackEnd.Appointments.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class PasswordNotMatchException extends Exception{
    public PasswordNotMatchException(){
        super("Password not match");
    }
}
