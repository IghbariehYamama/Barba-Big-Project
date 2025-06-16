import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, Alert } from 'react-native'
import { appServer, COLORS } from '../constants'
import UpcomingBookings from './UpcomingBookings';
import CompletedBookings from './CompletedBookings';
import CancelledBookings from './CancelledBookings';
import { customer } from '../data'
import {upcomingBookings} from '../data/index'
import { BookingTabSelectionAPI } from '../APIs/BookingTabSelectionAPIs'


const TabContent = ({ tab, bookings }) => {
    let filteredBookings = [];

    // Filter bookings based on their status
    switch (tab) {
        case 'Upcoming':
            filteredBookings = bookings.filter(
                (booking) => booking.status === 'UPCOMING'
            );
            return <UpcomingBookings bookings={filteredBookings} />;
        case 'Completed':
            filteredBookings = bookings.filter(
                (booking) => booking.status === 'COMPLETED'
            );
            return <CompletedBookings bookings={filteredBookings} />;
        case 'Cancelled':
            filteredBookings = bookings.filter(
                (booking) => booking.status === 'CANCELLED'
            );
            return <CancelledBookings bookings={filteredBookings} />;
        default:
            return null;
    }
};

const Tabs = ['Upcoming', 'Completed', 'Cancelled'];

const BookingTabSelection = () => {
    const [selectedTab, setSelectedTab] = useState('Upcoming');
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await BookingTabSelectionAPI.fetchCustomerBookings();
                console.log(data);
                setBookings(data); // Assuming data is an array of bookings
            } catch (error) {
                console.error('Failed to fetch bookings:', error);
                Alert.alert(
                    'Error',
                    'An error occurred while fetching bookings.'
                );
            }
        };

        fetchBookings();

        return () => {
            setBookings([]);
        };
    }, []);


    const renderItem = (item) => (
        <TouchableOpacity
            style={{
                paddingVertical: 8,
                paddingHorizontal: 18,
                backgroundColor: selectedTab === item ? COLORS.primary : "transparent",
                borderColor: COLORS.primary,
                borderWidth: 1.2,
                borderRadius: 24,
                marginRight: 6
            }}
            onPress={() => setSelectedTab(item)}>
            <Text style={{
                fontSize: 14,
                fontFamily: "semiBold",
                color: selectedTab === item ? '#FFFFFF' : COLORS.primary,
            }}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
             <View style={{ 
                flexDirection: 'row',
                justifyContent:'space-between',
                alignItems: 'center',
                marginTop: 18
                }}>
            {Tabs.map((tab, index) => (
                <View key={index}>
                    {renderItem(tab)}
                </View>
            ))}
        </View>
        <View style={{ marginTop: 20 }}>
                <TabContent tab={selectedTab} bookings={bookings} />
            </View>
        </View>
    );
};

export default BookingTabSelection;
