package com.BackEnd.Appointments.Utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtils {
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // Hash a password
    public static String hashPassword(String plainPassword) {
        return encoder.encode(plainPassword);
    }

    // Verify a password
    public static boolean verifyPassword(String plainPassword, String hashedPassword) {
        return encoder.matches(plainPassword, hashedPassword);
    }
}


