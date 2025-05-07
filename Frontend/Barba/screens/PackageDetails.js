import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, icons, images } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { Ionicons } from "@expo/vector-icons";
import Button from '../components/Button';

const PackageDetails = ({ navigation }) => {
    /**
    * Render header
    */
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
        const [showFullDescription, setShowFullDescription] = useState(false);

        const salonDescription = "Welcome to our cozy salon! Sit back, relax, and let our skilled barbers take care of you. From classic cuts to trendy styles, we offer a range of services to suit your needs. Our friendly staff are here to ensure you leave feeling confident and refreshed.";

        const toggleDescription = () => {
            setShowFullDescription(!showFullDescription);
        };

        return (
            <View>
                <Image
                    source={images.haircut1}
                    resizeMode='cover'
                    style={styles.packageImage}
                />
                <View>
                    <Text style={[styles.packageTitle, { 
                        color: COLORS.greyscale900
                    }]}>Haircuts & Hairstyle</Text>
                    <Text style={[styles.packagePromo, { 
                        color: COLORS.grayscale700,
                    }]}>
                        Special Offers Package, valid until 10 Dec, 2025
                    </Text>
                    <Text style={[styles.packageDescription, { 
                         color: COLORS.grayscale700,
                    }]}>{showFullDescription ? salonDescription : `${salonDescription.slice(0, 100)}...`}</Text>
                    <TouchableOpacity onPress={toggleDescription}>
                        <Text style={styles.viewBtn}>
                            {showFullDescription ? 'View Less' : 'View More'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={[styles.servicesTitle, { 
                    color: COLORS.greyscale900
                }]}>Services</Text>
                <View style={styles.checkBoxContainer}>
                    <View style={styles.checkBoxItemContainer}>
                        <Ionicons name="checkbox" size={20} color={COLORS.primary} />
                        <Text style={[styles.checkBoxItemTitle, { 
                             color: COLORS.black,
                        }]}>Haircut</Text>
                    </View>
                    <View style={styles.checkBoxItemContainer}>
                        <Ionicons name="checkbox" size={20} color={COLORS.primary} />
                        <Text style={[styles.checkBoxItemTitle, { 
                             color: COLORS.black,
                        }]}>Shave Mustache</Text>
                    </View>
                </View>
                <View style={styles.checkBoxContainer}>
                    <View style={styles.checkBoxItemContainer}>
                        <Ionicons name="checkbox" size={20} color={COLORS.primary} />
                        <Text style={[styles.checkBoxItemTitle, { 
                             color: COLORS.black,
                        }]}>Hairstyling</Text>
                    </View>
                    <View style={styles.checkBoxItemContainer}>
                        <Ionicons name="checkbox" size={20} color={COLORS.primary} />
                        <Text style={[styles.checkBoxItemTitle, { 
                             color: COLORS.black,
                        }]}>Shave the Beard</Text>
                    </View>
                </View>
                <View style={styles.checkBoxContainer}>
                    <View style={styles.checkBoxItemContainer}>
                        <Ionicons name="checkbox" size={20} color={COLORS.primary} />
                        <Text style={[styles.checkBoxItemTitle, { 
                             color: COLORS.black,
                        }]}>Hair Coloring</Text>
                    </View>
                    <View style={styles.checkBoxItemContainer}>
                        <Ionicons name="checkbox" size={20} color={COLORS.primary} />
                        <Text style={[styles.checkBoxItemTitle, { 
                             color: COLORS.black,
                        }]}>Facial</Text>
                    </View>
                </View>
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
                    title="Book Now - $125"
                    filled
                    onPress={()=>navigation.navigate("BookAppointment")}
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
    moreIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.black
    },
    packageImage: {
        width: SIZES.width - 32,
        height: 270,
        borderRadius: 24,
        marginVertical: 16
    },
    packageTitle: {
        fontSize: 20,
        fontFamily: 'bold',
        color: COLORS.black,
    },
    packagePromo: {
        fontSize: 14,
        fontFamily: "medium",
        color: COLORS.grayscale700,
        marginVertical: 12
    },
    packageDescription: {
        fontSize: 14,
        fontFamily: "regular",
        color: COLORS.grayscale700,
    },
    viewBtn: {
        fontSize: 14,
        fontFamily: "medium",
        color: COLORS.primary,
        marginVertical: 6
    },
    servicesTitle: {
        fontSize: 16,
        fontFamily: "semiBold",
        color: COLORS.black,
        marginVertical: 8
    },
    checkBoxContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: SIZES.width - 32,
        marginVertical: 6
    },
    checkBoxItemContainer: {
        width: (SIZES.width - 32) / 2,
        flexDirection: "row",
        alignItems: "center"
    },
    checkBoxItemTitle: {
        fontSize: 16,
        color: COLORS.black,
        marginLeft: 16,
        fontFamily: "regular"
    }
})

export default PackageDetails