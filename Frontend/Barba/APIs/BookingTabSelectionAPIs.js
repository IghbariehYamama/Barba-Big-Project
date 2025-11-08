import appServer from './serverAPIS';
import { fetchWithAuth } from './authFetch';
import { customer } from '../data';

// APIs used for the BookingTabSelection page

export const BookingTabSelectionAPI = {

    // 1. Fetches all bookings for the current customer by their ID
    async fetchCustomerBookings() {
        try {
            const response = await fetchWithAuth(
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
            console.error("Error fetching customer bookings:", error);
            throw error;
        }
    },
};
