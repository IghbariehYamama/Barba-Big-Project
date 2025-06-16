import appServer from './serverAPIS'

// Here are the APIs used for the SalonDetails page
export const SalonDetailsAPIs = {

    // 1. Fetches main salon data by ID
    fetchSalonDetails: async (salonID) => {
        const response = await fetch(`https://${appServer.serverName}/businesses/${salonID}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch salon details: ${response.status}`);
        }
        return await response.json();
    },

    // 2. Fetches image URLs for the slider
    fetchSliderImages: async (salonID) => {
        const response = await fetch(`https://${appServer.serverName}/images/${salonID}/sliders/urls`);
        if (!response.ok) {
            throw new Error(`Failed to fetch slider images: ${response.status}`);
        }
        return await response.json();
    }
};