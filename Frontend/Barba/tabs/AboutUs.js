import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useContext, useState } from 'react'
import { COLORS, SIZES, FONTS, icons } from '../constants';
import MapView, { Marker, Callout } from 'react-native-maps';
import Button from "../components/Button";
import { useNavigation } from '@react-navigation/native';
import { mapStandardStyle } from '../data/mapData';
import { SalonContext } from '../components/SalonContext'
import { Linking, Modal } from 'react-native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const AboutUs = () => {
    const [expanded, setExpanded] = useState(false);
    const navigation = useNavigation();
    const { salonInfo } = useContext(SalonContext);
    const [isModalVisible, setModalVisible] = useState(false);

    const handleCall = () => {
        Linking.openURL(`tel:${salonInfo.salonPhone}`);
        setModalVisible(false);
    };

    const handleWhatsApp = () => {
        let phone = salonInfo.salonPhone.replace(/\D/g, ''); // Remove non-digits
        if (phone.startsWith('0')) {
            phone = '+972' + phone.slice(1); // Replace first 0 with +972
        }
        Linking.openURL(`https://wa.me/${phone}`);
        setModalVisible(false);
    };

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <View>
            <Text style={[styles.description, { 
                color: COLORS.grayscale700,
            }]} numberOfLines={expanded ? undefined : 2}>{salonInfo.aboutUs}</Text>
            <TouchableOpacity onPress={toggleExpanded}>
                <Text style={styles.viewBtn}>
                    {expanded ? 'View Less' : 'View More'}
                </Text>
            </TouchableOpacity>

            <Text style={[styles.subtitle, { 
               color: COLORS.greyscale900,
            }]}>Working Hours</Text>
            <View style={styles.hoursContainer}>
                <Text style={[styles.hoursDay, { 
                    color: COLORS.grayscale700,
                }]}>Monday - Friday</Text>
                <Text style={[styles.hours, { 
                    color: COLORS.black,
                }]}>9:00am - 5:00pm</Text>
            </View>
            <View style={styles.hoursContainer}>
                <Text style={[styles.hoursDay, { 
                     color: COLORS.grayscale700,
                }]}>Saturday - Sunday</Text>
                <Text style={[styles.hours, { 
                     color: COLORS.black,
                }]}>9:00am - 5:00pm</Text>
            </View>
            <Text style={[styles.subtitle, { 
                color: COLORS.greyscale900,
            }]}>Contact Us</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.phoneNumber}>
                    {salonInfo.salonPhone}
                </Text>
            </TouchableOpacity>


            <View style={styles.viewContainer}>
                <Text style={[styles.viewLeft, { 
                    color: COLORS.greyscale900,
                }]}>Our address</Text>
                <TouchableOpacity>
                    <Text style={styles.viewRight}>See on Maps</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.salonItemContainer}>
                <Image
                    source={icons.location2}
                    resizeMode='contain'
                    style={styles.locationIcon}
                />
                <Text style={[styles.locationText, { 
                    color: COLORS.grayscale700,
                }]}>{salonInfo.salonLocation}</Text>
            </View>

            <View style={[styles.locationMapContainer, { 
                backgroundColor: COLORS.white,
            }]}>
                <MapView
                    style={styles.mapContainer}
                    customMapStyle={mapStandardStyle }
                    userInterfaceStyle="dark"
                    initialRegion={{
                        latitude: 32.51833126,
                        longitude: 35.152166058,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <Marker
                        coordinate={{
                            latitude: 32.51833126,
                            longitude: 35.152166058,
                        }}
                        image={icons.mapsOutline}
                        title="Move"
                        description="Address"
                        onPress={() => console.log("Move to another screen")}
                    >
                        <Callout tooltip>
                            <View>
                                <View style={styles.bubble}>
                                    <Text
                                        style={{
                                            ...FONTS.body4,
                                            fontWeight: 'bold',
                                            color: COLORS.black,
                                        }}
                                    >
                                        User Address
                                    </Text>
                                </View>
                                <View style={styles.arrowBorder} />
                                <View style={styles.arrow} />
                            </View>
                        </Callout>
                    </Marker>
                </MapView>
            </View>

            <Button
              filled
              title="Book Now"
              style={styles.bookBtn}
              onPress={() => navigation.navigate("BookAppointment")}
            />


            <Modal
                transparent
                visible={isModalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Contact via</Text>

                                <TouchableOpacity style={styles.modalButton} onPress={handleWhatsApp}>
                                    <Image source={icons.whatsapp} style={styles.modalIcon} />
                                    <Text style={styles.modalButtonText}>Message on WhatsApp</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.modalButton} onPress={handleCall}>
                                    <Image source={icons.telephone} style={styles.modalIcon} />
                                    <Text style={styles.modalButtonText}>Call</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        </View>
    )
};

const styles = StyleSheet.create({
    description: {
        fontSize: 14,
        color: COLORS.grayscale700,
    },
    viewBtn: {
        color: COLORS.primary,
        marginTop: 5,
        fontSize: 14,
        fontFamily: "semiBold",
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.black,
        fontFamily: "bold",
        marginVertical: 8
    },
    hoursContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
        width: SIZES.width - 32
    },
    hoursDay: {
        fontSize: 14,
        color: COLORS.grayscale700,
        fontFamily: "semiBold"
    },
    hours: {
        fontSize: 14,
        color: COLORS.black,
        fontFamily: "semiBold"
    },
    phoneNumber: {
        fontSize: 16,
        color: COLORS.primary,
        fontFamily: "bold",
        marginVertical: 4
    },
    viewContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
        width: SIZES.width - 32
    },
    viewLeft: {
        fontSize: 16,
        color: COLORS.black,
        fontFamily: "bold"
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 24,
        width: '85%',
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: 'bold',
        color: COLORS.greyscale900,
        marginBottom: 20,
    },
    modalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        width: '100%',
        marginBottom: 12,
    },
    modalIcon: {
        width: 20,
        height: 20,
        marginRight: 12,
        tintColor: COLORS.primary,
    },
    modalButtonText: {
        fontSize: 16,
        fontFamily: 'semiBold',
        color: COLORS.primary,
    },
    cancelButton: {
        marginTop: 10,
    },
    cancelText: {
        fontSize: 14,
        color: COLORS.grayscale700,
        fontFamily: 'medium',
    },
    viewRight: {
        fontSize: 14,
        color: COLORS.primary,
        fontFamily: "semiBold"
    },
    salonItemContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    locationIcon: {
        width: 14,
        height: 14,
        tintColor: COLORS.primary,
        marginRight: 8
    },
    locationText: {
        fontSize: 14,
        fontFamily: "medium",
        color: COLORS.grayscale700,
    },
    locationMapContainer: {
        height: 226,
        width: "100%",
        borderRadius: 12,
        marginVertical: 16
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        borderRadius: 12,
        backgroundColor: COLORS.dark2
    },
    viewMapContainer: {
        height: 50,
        backgroundColor: COLORS.gray,
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 'auto',
    },
    // Arrow below the bubble
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    headingLeft: {
        fontSize: 18,
        fontFamily: "Poppins Bold",
        color: COLORS.primary
    },
    headingRight: {
        fontSize: 12,
        fontFamily: "Poppins SemiBold",
        color: COLORS.primary
    },
    bookBtn: {
        marginBottom: 32
    }
})

export default AboutUs