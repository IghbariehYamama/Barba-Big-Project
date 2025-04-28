import React, { createContext, useState } from 'react';
import { Text } from 'react-native'

export const SalonContext = createContext();

export const SalonProvider = ({ children }) => {
    const [salonID, setSalonID] = useState(null);

    return (
        <SalonContext.Provider value={{ salonID, setSalonID }}>
            {children}
        </SalonContext.Provider>
    );
};
