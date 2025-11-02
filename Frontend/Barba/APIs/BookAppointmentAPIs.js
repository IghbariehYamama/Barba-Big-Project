import appServer from './serverAPIS'
import { fetchWithAuth } from './authFetch'

// Here are the APIs used for the BookAppointment page

export const BookAppointmentAPI = {
    /**
     * Fetch available appointment slots for a given salon, year, and month
     * @param {string} salonID - The unique salon ID
     * @param {number} year - The year (e.g., 2025)
     * @param {number} month - The month (1-based, e.g., January is 1)
     * @returns {Promise<Array>}
     */
    async fetchAvailableSlots(salonID, year, month) {
        try {
            const response = await fetchWithAuth(
                `https://${appServer.serverName}/businesses/${salonID}/slots/available/${year}/${month}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch available slots.");
            }

            return await response.json();

        } catch (error) {
            console.error("Error fetching available slots:", error);
            throw error;
        }
    }
};
