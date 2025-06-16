import appServer from './serverAPIS';

export const UpcomingBookingsAPI = {
    // 1. Cancel a booking by its ID
    cancelBookingById: async (bookingId) => {
        try {
            const response = await fetch(`https://${appServer.serverName}/bookings/${bookingId}/status/cancel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Failed to cancel booking:", error);
            throw error;
        }
    },

    // 2. (Optional) Fetch upcoming bookings - if you plan to load them from the server
    fetchUpcomingBookings: async () => {
        try {
            const response = await fetch(`https://${appServer.serverName}/bookings/upcoming`);
            if (!response.ok) {
                throw new Error('Failed to fetch upcoming bookings');
            }
            return await response.json();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error fetching upcoming bookings:", error);
            throw error;
        }
    },
};
