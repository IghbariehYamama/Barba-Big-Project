import appServer from './serverAPIS';
import { customer } from '../data'

// APIs used for the BookingTabSelection page

export const BookingTabSelectionAPI = {

    // 1. Fetches all bookings for the current customer by their ID
    fetchCustomerBookings: async () => {

        // eslint-disable-next-line no-useless-catch
        try {
            const response = await fetch(
                `https://${appServer.serverName}/customers/${customer.id}/bookings`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch bookings');
            }

            return data;
        } catch (error) {
            throw error;
        }
    },
};
