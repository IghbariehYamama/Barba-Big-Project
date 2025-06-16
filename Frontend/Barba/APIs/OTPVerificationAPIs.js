import appServer from './serverAPIS'

// Here are the APIs used for the OTPVerification page
export const OTPVerificationAPI = {

    // 1. Verifies OTP code during login
    verifyLogin: async ({ phoneNumber, code }) => {
        const response = await fetch(`https://${appServer.serverName}/customers/verify/phone`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber, code }),
        });

        if (!response.ok) {
            throw new Error('Failed to verify. Please try again.');
        }

        const data = await response.json();
        return data;
    },

    // 2. Verifies OTP code during signup
    verifySignup: async ({ phoneNumber, code }) => {
        const response = await fetch(`https://${appServer.serverName}/customers/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber, code }),
        });

        if (!response.ok) {
            throw new Error('Invalid or Expired Code. Please Try Again.');
        }

        return response;
    },

    // 3. Resend OTP code
    resendCode: async (phoneNumber) => {
        const response = await fetch(`https://${appServer.serverName}/customers/signIn/phone`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber }),
        });

        if (!response.ok) {
            throw new Error('Failed to resend the code. Please try again.');
        }

        return response;
    },
};
