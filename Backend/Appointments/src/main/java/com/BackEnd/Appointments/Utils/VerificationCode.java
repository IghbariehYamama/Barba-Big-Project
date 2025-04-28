package com.BackEnd.Appointments.Utils;


import java.security.SecureRandom;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
public class VerificationCode {

    private static final SecureRandom random = new SecureRandom();
    private static final ConcurrentHashMap<String, CodeEntry> codes = new ConcurrentHashMap<>();

    public static String generateCode(String phoneNumber) {
        String code = String.format("%04d", random.nextInt(10_000)); // 4-digit code
        codes.put(phoneNumber, new CodeEntry(code, System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(5))); // 1 minutes expiry
        return code;
    }

    public static boolean verifyCode(String phoneNumber, String code) {
        CodeEntry entry = codes.get(phoneNumber);
        if (entry == null || System.currentTimeMillis() > entry.expiryTime) {
            codes.remove(phoneNumber); // Cleanup expired entries
            return false;
        }
        boolean isValid = entry.code.equals(code);
        if (isValid) {
            codes.remove(phoneNumber); // Remove after successful verification
        }
        return isValid;
    }

    private static class CodeEntry {
        String code;
        long expiryTime;

        CodeEntry(String code, long expiryTime) {
            this.code = code;
            this.expiryTime = expiryTime;
        }
    }
}
