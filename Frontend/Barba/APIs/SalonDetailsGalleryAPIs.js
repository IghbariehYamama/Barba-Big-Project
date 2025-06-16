// SalonDetailsGalleryAPI.js
import appServer from './serverAPIS';

// APIs used for the SalonDetailsGallery page
export const SalonDetailsGalleryAPI = {

    // 1. Fetches gallery image URLs for a given salon ID
    fetchGalleryImages: async (salonID) => {
        try {
            const response = await fetch(`https://${appServer.serverName}/images/businesses/${salonID}/gallery/urls`);
            const data = await response.json();

            if (!Array.isArray(data)) {
                // eslint-disable-next-line no-console
                console.warn("Unexpected data format for gallery images:", data);
                return [];
            }

            // Construct full URLs
            return data.map(path => `https://${appServer.serverName}${path}`);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error fetching gallery images:", error);
            throw error;
        }
    }
};
