// SignUpPhoneNumberAPI.js
import appServer from './serverAPIS';
import { fetchWithAuth } from './authFetch';

// APIs used for the SignUpPhoneNumber page
export const SignUpPhoneNumberAPI = {

    // 1. Check if the phone number is not already registered
    async sendPhoneNumberForSignInAPI(phoneNumber) {
        try {
            const response = await fetchWithAuth(
                `https://${appServer.serverName}/customers/exist/phone`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: phoneNumber,
                }
            );

            if (!response.ok) throw new Error('Failed to check phone number');
            return await response.json();

        } catch (error) {
            console.error('Error checking phone number:', error);
            throw error;
        }
    },

    // 2. Verify the OTP code sent to the user
    async verifyOtpCodeAPI(fullPhoneNumber, code) {
        try {
            const response = await fetchWithAuth(
                'https://your-api-endpoint.com/verify-code',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phoneNumber: fullPhoneNumber, code }),
                }
            );

            if (!response.ok) throw new Error('Failed to verify OTP code');
            return await response.json();

        } catch (error) {
            console.error('Error verifying OTP code:', error);
            throw error;
        }
    },

    // 3. Get customer details by phone number after verifying OTP
    async getCustomerByPhoneNumberAPI(phoneNumber) {
        try {
            const response = await fetchWithAuth(
                `https://${appServer.serverName}/get-customer-according-to-phone-number`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phoneNumber }),
                }
            );

            if (!response.ok) throw new Error('Failed to get customer by phone number');
            return await response.json();

        } catch (error) {
            console.error('Error fetching customer by phone number:', error);
            throw error;
        }
    },

    // 4. (Optional) Get all countries with flags and calling codes
    async getCountriesAPI() {
        try {
            const response = await fetchWithAuth('https://restcountries.com/v2/all');

            if (!response.ok) throw new Error('Failed to fetch countries');
            return await response.json();

        } catch (error) {
            console.error('Error fetching countries:', error);
            throw error;
        }
    }
};
