import appServer from './serverAPIS'

// Here are the APIs used for the SignUpPhoneNumber page

export const SignUpPhoneNumberAPI = {
    // 1. Check if the phone number is not already registered
    sendPhoneNumberForSignInAPI: async (phoneNumber) => {
        const response = await fetch(`https://${appServer.serverName}/customers/exist/phone`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: phoneNumber,
        });
        return response.json();
    },

    // 2. Verify the OTP code sent to the user
    verifyOtpCodeAPI: async (fullPhoneNumber, code) => {
        const response = await fetch('https://your-api-endpoint.com/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber: fullPhoneNumber, code }),
        });
        return response.json();
    },

    // 3. Get customer details by phone number after verifying OTP
    getCustomerByPhoneNumberAPI: async (phoneNumber) => {
        const response = await fetch(`https://${appServer.serverName}/get-customer-according-to-phone-number`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber }),
        });
        return response.json();
    },

    // 4. (Optional) Get all countries with flags and calling codes
    getCountriesAPI: async () => {
        const response = await fetch("https://restcountries.com/v2/all");
        return response.json();
    }
};
