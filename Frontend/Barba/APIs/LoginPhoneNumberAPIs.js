import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWithAuth } from './authFetch';
import appServer from './serverAPIS';

// APIs used for the LoginPhoneNumber page

export const LoginPhoneNumberAPI = {

    // 1. Fetches all country codes from a public API (no server auth)
    fetchCountryCodes: async () => {
        const response = await fetch("https://restcountries.com/v2/all");
        return await response.json();
    },

    // 2. Sends the phone number to the backend to check if it is registered.
    sendPhoneNumber: async (phoneNumber) => {

        // eslint-disable-next-line no-useless-catch
        try {
            const response = await fetchWithAuth(
                `https://${appServer.serverName}/customers/login/phone`, // ✅ endpoint only
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: phoneNumber, // backend expects plain string
                }
            );

            if (!response.ok) {
                throw new Error("This phone number is not registered.");
            }

            return response;
        } catch (error) {
            throw error;
        }
    },

    // 3. Verifies the OTP code that was sent to the user, stores token if valid.
    verifyCode: async ({ phoneNumber, code }) => {

        // eslint-disable-next-line no-useless-catch
        try {
            const response = await fetchWithAuth(
                `/verify-code`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phoneNumber, code }),
                }
            );

            const result = await response.json();

            if (!response.ok || !result.token) {
                throw new Error(result.message || "Invalid verification code.");
            }

            // ✅ Save token securely for next requests
            await AsyncStorage.setItem('authToken', result.token);

            return result;
        } catch (error) {
            throw error;
        }
    },
};
