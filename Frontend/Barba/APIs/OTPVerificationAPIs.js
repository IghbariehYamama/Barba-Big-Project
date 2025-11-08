import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWithAuth } from './authFetch';
import { appServer } from '../constants'

// APIs used for the OTPVerification page
export const OTPVerificationAPI = {

    // 1. Verifies OTP code during login
    async verifyLogin({ phoneNumber, code }) {
        const response = await fetchWithAuth(
            `https://${appServer.serverName}/customers/verify/phone`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber, code }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to verify. Please try again.');
        }

        // store non-sensitive user data
        if (data.customerData) {
            await AsyncStorage.setItem('customerData', JSON.stringify(data.customerData));
        }

        // store token securely
        if (data.token) {
            await SecureStore.setItemAsync('authToken', data.token);
        }

        return data.customerData;
    },

    // 2. Verifies OTP code during signup
    async verifySignup({ phoneNumber, code }) {
        const response = await fetchWithAuth(
            `https://${appServer.serverName}/customers/verify`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber, code }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Invalid or Expired Code. Please Try Again.');
        }

        if (data.token) {
            await AsyncStorage.setItem('authToken', data.token);
        }

        return data;
    },

    // 3. Resend OTP code
    async resendCode(phoneNumber) {
        const response = await fetchWithAuth(
            `https://${appServer.serverName}/customers/signIn/phone`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber }),
            }
        );

        if (!response.ok) {
            throw new Error('Failed to resend the code. Please try again.');
        }

        return response;
    },
};
