import appServer from './serverAPIS';

// APIs used for the FillYourProfile page

export const FillYourProfileAPI = {

    // 1. Registers a new customer with name, email, password, phone, date of birth, and gender
    registerCustomer: async ({ name, email, password, phone, dateOfBirth, gender }) => {

        // eslint-disable-next-line no-useless-catch
        try {
            const response = await fetch(`https://${appServer.serverName}/customers/register`, {
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
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to create profile");
            }

            return data;
        } catch (error) {
            throw error;
        }
    }
};
