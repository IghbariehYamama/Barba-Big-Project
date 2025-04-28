package com.BackEnd.Appointments.Annotations;

import com.BackEnd.Appointments.Validators.AtLeastOneFieldValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import java.lang.annotation.ElementType;

@Constraint(validatedBy = AtLeastOneFieldValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface AtLeastOneField {
    String message() default "At least one of email or phone must be provided.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}