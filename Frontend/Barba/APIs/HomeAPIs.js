import appServer from './serverAPIS'
import { fetchWithAuth } from './authFetch';

// Here are the APIs used for the Home page

export const homeAPIs = {

    // 1. Retrieves a list of all salons from the server by making a GET request to the /businesses/all endpoint.
    async fetchAllSalons() {
        const response = await fetchWithAuth(`https://${appServer.serverName}/businesses/all`);
        if (!response.ok) throw new Error('Failed to fetch salons');
        return await response.json();
    },

    // 2. Constructs and returns the URL for a salon's profile image based on its salon ID.
    async fetchProtectedSalonImage(salonId) {
        const response = await fetchWithAuth(`https://${appServer.serverName}/images/profile/${salonId}`);
        const blob = await response.blob();
        const base64 = await blobToBase64(blob);
        return `data:image/jpeg;base64,${base64}`;
    },
};

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-undef
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

