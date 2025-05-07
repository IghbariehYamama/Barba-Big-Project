import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { services } from '../data';
import ServiceCard from '../components/ServiceCard';
import Button from '../components/Button';

const OurServices = ({ route, navigation }) => {
    /**
    * Render header
    */
    let { salonID } = route.params;
    console.log("OurServices: " + salonID)
    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={icons.back}
                            resizeMode='contain'
                            style={[styles.backIcon, {
                                tintColor: COLORS.greyscale900
                            }]}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, {
                        color: COLORS.greyscale900
                    }]}>
                        Our Services
                    </Text>
                </View>
                <TouchableOpacity>
                    <Image
                        source={icons.moreCircle}
                        resizeMode='contain'
                        style={[styles.moreIcon, {
                            tintColor: COLORS.greyscale900
                        }]}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    /**
     * Render content
     */
    const renderContent = () => {
        const [selectedServices, setSelectedServices] = useState([]);

        const toggleSelected = (serviceId) => {
            if (selectedServices.includes(serviceId)) {
                setSelectedServices(selectedServices.filter(id => id !== serviceId));
            } else {
                setSelectedServices([...selectedServices, serviceId]);
            }
        };

        return (
            <View style={{ backgroundColor: COLORS.tertiaryWhite }}>
                <FlatList
                    data={services}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <ServiceCard
                            name={item.name}
                            type={item.type}
                            price={item.price}
                            product={item.product}
                            onPress={() => {
                                toggleSelected(item.id);
                                navigation.navigate("ServicesListType")
                            }}
                            isSelected={selectedServices.includes(item.id)}
                        />
                    )}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: COLORS.white }]}>
            <View style={[styles.container, { backgroundColor: COLORS.white }]}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderContent()}
                </ScrollView>
                <Button
                    title="Book Now"
                    filled
                    style={{ marginTop: 22 }}
                    onPress={()=>navigation.navigate("BookAppointment", { salonID: salonID })}
                />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    headerContainer: {
        flexDirection: "row",
        width: SIZES.width - 32,
        justifyContent: "space-between",
        marginBottom: 0
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    backIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'bold',
        color: COLORS.black,
        marginLeft: 16
    },
    moreIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.black
    }
})

export default OurServices