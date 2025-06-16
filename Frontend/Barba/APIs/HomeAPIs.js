import appServer from './serverAPIS'

// Here are the APIs used for the Home page

export const homeAPIs = {

    // 1. Retrieves a list of all salons from the server by making a GET request to the /businesses/all endpoint.
    async fetchAllSalons() {
        try {
            const response = await fetch(`https://${appServer.serverName}/businesses/all`);
            if (!response.ok) throw new Error("Failed to fetch salons");
            return await response.json();
        } catch (error) {
            throw new Error(error);
        }
    },

    // 2. Constructs and returns the URL for a salon's profile image based on its salon ID.
    getSalonImageUrl: (salonId) => `https://${appServer.serverName}/images/profile/${salonId}`,
};
