import { fetchWithAuth } from './authFetch';
import appServer from './serverAPIS';

export const SalonDetailsAPIs = {

    // 1. Fetches main salon data by ID
    async fetchSalonDetails(salonID) {
        const response = await fetchWithAuth(
            `https://${appServer.serverName}/businesses/${salonID}`,
            { method: 'GET' }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch salon details: ${response.status}`);
        }

        return await response.json();
    },

    // 2. Fetches image URLs for the slider
    async fetchSliderImages(salonID) {
        const response = await fetchWithAuth(
            `https://${appServer.serverName}/images/${salonID}/sliders/urls`,
            { method: 'GET' }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch slider images: ${response.status}`);
        }

        return await response.json();
    },
};
