// SalonDetailsGalleryAPI.js
import appServer from './serverAPIS';
import { fetchWithAuth } from './authFetch';

// APIs used for the SalonDetailsGallery page
export const SalonDetailsGalleryAPI = {

    // 1. Fetches gallery image URLs for a given salon ID
    async fetchGalleryImages(salonID) {
        try {
            const response = await fetchWithAuth(
                `https://${appServer.serverName}/images/businesses/${salonID}/gallery/urls`
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch gallery images for salon ${salonID}`);
            }

            const data = await response.json();

            if (!Array.isArray(data)) {
                console.warn("Unexpected data format for gallery images:", data);
                return [];
            }

            // Construct full URLs
            return data.map(path => `https://${appServer.serverName}${path}`);

        } catch (error) {
            console.error("Error fetching gallery images:", error);
            throw error;
        }
    }
};
