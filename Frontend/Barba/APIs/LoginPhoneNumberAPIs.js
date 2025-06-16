import appServer from './serverAPIS';
// Here are the APIs used for the LoginPhoneNumber page

export const LoginPhoneNumberAPI = {

    //1. Sends the phone number to the backend to check if it is registered.
    fetchCountryCodes: async () => {
        const response = await fetch("https://restcountries.com/v2/all");
        return await response.json();
    },

    sendPhoneNumber: async (phoneNumber) => {
        const response = await fetch(`https://${appServer.serverName}/customers/login/phone`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: phoneNumber,
        });

        if (!response.ok) {
            throw new Error("This phone number is not registered.");
        }

        return response;
    },

    //2. Verifies the OTP (code) sent to the user.
    verifyCode: async ({ phoneNumber, code }) => {
        const response = await fetch('https://your-api-endpoint.com/verify-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber, code }),
        });

        const result = await response.json();
        if (!response.ok || !result.success) {
            throw new Error("Invalid verification code.");
        }

        return result;
    }
};

