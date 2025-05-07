import React, { createContext, useState } from 'react';
import { Text } from 'react-native'

export const SalonContext = createContext();

export const SalonProvider = ({ children }) => {
    const [salonInfo, setSalonInfo] = useState({
        salonID: '',
        salonName: '',
        salonLocation: '',
        salonRating: '',
        facebook: '',
        instagram: '',
        waze: '',
        employees: []
    });

    return (
        <SalonContext.Provider value={{ salonInfo, setSalonInfo }}>
            {children}
        </SalonContext.Provider>
    );
};
