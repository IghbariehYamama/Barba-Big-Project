import appServer from './serverAPIS'

// Here are the APIs used for the BookAppointment page

export const BookAppointmentAPI = {
    /**
     * Fetch available appointment slots for a given salon, year, and month
     * @param {string} salonID - The unique salon ID
     * @param {number} year - The year (e.g., 2025)
     * @param {number} month - The month (1-based, e.g., January is 1)
     * @returns {Promise<Array>} - List of available slot objects
     */
    fetchAvailableSlots: async (salonID, year, month) => {
        const response = await fetch(`https://${appServer.serverName}/businesses/${salonID}/slots/available/${year}/${month}`);

        if (!response.ok) {
            throw new Error("Failed to fetch available slots.");
        }

        return await response.json();
    }
};
