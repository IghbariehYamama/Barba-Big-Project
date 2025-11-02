// authFetch.js
import * as SecureStore from 'expo-secure-store';
import { navigate } from '../navigations/navigationRef'

export async function fetchWithAuth(url, options = {}) {
    // 1️⃣ Get stored token securely
    const token = await SecureStore.getItemAsync('authToken');

    // 2️⃣ Merge headers (keeping any custom ones you pass)
    const headers = {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : undefined,
    };

    // 3️⃣ Perform the fetch with the token attached
    const response = await fetch(url, { ...options, headers });

    // 4️⃣ If unauthorized → redirect to login screen
    if (response.status === 401) {
        console.warn('Unauthorized → redirecting to login');

        await SecureStore.deleteItemAsync('authToken'); // clear old token

        // navigate to login screen
        navigate('LoginPhoneNumber');
    }

    return response;
}
