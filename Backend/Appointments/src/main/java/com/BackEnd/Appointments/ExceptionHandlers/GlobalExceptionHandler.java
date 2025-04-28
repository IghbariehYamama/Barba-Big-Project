package com.BackEnd.Appointments.ExceptionHandlers;

import com.BackEnd.Appointments.Exceptions.CustomerAlreadyExistException;
import com.BackEnd.Appointments.Exceptions.CustomerNotFoundException;
import com.BackEnd.Appointments.Exceptions.PasswordNotMatchException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(CustomerAlreadyExistException.class)
    public ResponseEntity<String> handleCustomerAlreadyExistException(CustomerAlreadyExistException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }
    @ExceptionHandler(CustomerNotFoundException.class)
    public ResponseEntity<String> handleCustomerNotFoundException(CustomerNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + ex.getMessage());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        String message = "A unique constraint violation occurred.";

        // Try to extract more specific details (optional)
        if (ex.getRootCause() != null && ex.getRootCause().getMessage().contains("Duplicate entry")) {
            String errorDetail = ex.getRootCause().getMessage();
            String duplicateField = extractFieldFromMessage(errorDetail);
            message = String.format("Duplicate entry found for %s.", duplicateField);
        }

        Map<String, String> response = new HashMap<>();
        response.put("error", message);

        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    private String extractFieldFromMessage(String errorDetail) {
        if (errorDetail.contains("Duplicate entry") && errorDetail.contains("for key")) {
            int keyStart = errorDetail.indexOf("for key '") + 9;
            int keyEnd = errorDetail.indexOf("'", keyStart);
            String key = errorDetail.substring(keyStart, keyEnd);
            // Add all unique constraints here
            Map<String, String> constraintFieldMap = Map.of(
                    "user.UKob8kqyqqgmefl0aco34akdtpe","email", "UK589idila9li6a4arw1t8ht1gx",
                    "phone"
            );

            if (!constraintFieldMap.containsKey(key)) {
                System.out.println("Warning: No mapping found for constraint key: " + key);
            }

            return constraintFieldMap.getOrDefault(key, "unknown field (constraint: " + key + ")");
        }
        return "unknown field";
    }
    @ExceptionHandler(PasswordNotMatchException.class)
    public ResponseEntity<String> handlePasswordNotMatchException(PasswordNotMatchException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }





}

