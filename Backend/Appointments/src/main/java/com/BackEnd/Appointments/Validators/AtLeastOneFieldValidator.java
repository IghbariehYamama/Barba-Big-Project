package com.BackEnd.Appointments.Validators;

import com.BackEnd.Appointments.Annotations.AtLeastOneField;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Objects;

public class AtLeastOneFieldValidator implements ConstraintValidator<AtLeastOneField, Object> {

    @Override
    public boolean isValid(Object object, ConstraintValidatorContext context) {
        if (object == null) {
            return true; // Null check is handled by other annotations
        }

        try {
            // Get the `email` and `phone` fields using reflection
            var emailField = object.getClass().getDeclaredField("email");
            var phoneField = object.getClass().getDeclaredField("phone");

            emailField.setAccessible(true);
            phoneField.setAccessible(true);

            Object emailValue = emailField.get(object);
            Object phoneValue = phoneField.get(object);

            // At least one of the fields must not be null or blank
            return (emailValue != null && !((String) emailValue).isBlank()) ||
                    (phoneValue != null && !((String) phoneValue).isBlank());

        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw new RuntimeException("Validation error: Missing fields in the class", e);
        }
    }
}

