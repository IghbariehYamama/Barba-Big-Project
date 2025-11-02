// UpcomingBookingsAPI.js
import appServer from './serverAPIS';
import { fetchWithAuth } from './authFetch';

export const UpcomingBookingsAPI = {

    // 1. Cancel a booking by its ID
    async cancelBookingById(bookingId) {
        try {
            const response = await fetchWithAuth(
                `https://${appServer.serverName}/bookings/${bookingId}/status/cancel`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to cancel booking with ID ${bookingId}`);
            }

            return await response.json();

        } catch (error) {
            console.error("Failed to cancel booking:", error);
            throw error;
        }
    },

    // 2. (Optional) Fetch upcoming bookings
    async fetchUpcomingBookings() {
        try {
            const response = await fetchWithAuth(
                `https://${appServer.serverName}/bookings/upcoming`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch upcoming bookings');
            }

            return await response.json();

        } catch (error) {
            console.error("Error fetching upcoming bookings:", error);
            throw error;
        }
    },
};
