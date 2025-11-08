import appServer from './serverAPIS';
import { fetchWithAuth } from './authFetch';

// APIs used for the FillYourProfile page

export const FillYourProfileAPI = {

    // 1. Registers a new customer with name, email, password, phone, date of birth, and gender
    async registerCustomer({ name, email, password, phone, dateOfBirth, gender }) {
        try {
            const response = await fetchWithAuth(
                `https://${appServer.serverName}/customers/register`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        phone,
                        dateOfBirth,
                        gender
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to create profile");
            }

            return data;

        } catch (error) {
            console.error("Error registering customer:", error);
            throw error;
        }
    },
};
