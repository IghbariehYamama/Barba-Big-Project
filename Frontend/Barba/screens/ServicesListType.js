import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { ManHaircuts, WomanHaircuts } from '../tabs';
import Button from '../components/Button';

const ServicesListType = ({ navigation }) => {
    /**
    * Render header
    */
    const renderHeader = () => {
        // Services List Type header should be dynamic
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
                        Haircuts
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
     * render content
     */
    const renderContent = () => {

        const [selectedTab, setSelectedTab] = useState('Man'); // Default selected tab

        const renderTabContent = () => {
            switch (selectedTab) {
                case 'Man':
                    return <><ManHaircuts /></>;
                case 'Woman':
                    return <><WomanHaircuts /></>;
                default:
                    return null;
            }
        };

        return (
            <View>
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tabBtn,
                        selectedTab === 'Man' && { backgroundColor: COLORS.primary }]}
                        onPress={() => setSelectedTab('Man')}>
                        <Text style={[styles.tabBtnText, selectedTab === 'Man' && { color: COLORS.white }]}>
                            Man
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tabBtn,
                            selectedTab === 'Woman' && { backgroundColor: COLORS.primary },
                        ]}
                        onPress={() => setSelectedTab('Woman')}>
                        <Text style={[styles.tabBtnText, selectedTab === 'Woman' && { color: COLORS.white }]}>
                            Woman
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.tabContent}>{renderTabContent()}</View>
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
            </View>
            <View style={[styles.bottomButtonContainer, {
                backgroundColor: COLORS.white
            }]}>
                <Button
                    title="Apply"
                    filled
                    style={styles.button}
                    onPress={() => navigation.goBack()}
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
    },
    tabBtn: {
        alignItems: "center",
        justifyContent: "center",
        width: (SIZES.width - 32) / 2 - 12,
        height: 38,
        backgroundColor: "transparent",
        borderColor: COLORS.primary,
        borderWidth: 1.8,
        borderRadius: 32
    },
    tabBtnText: {
        fontFamily: "medium",
        color: COLORS.primary,
        fontSize: 16
    },
    tabContainer: {
        marginVertical: 16,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    bottomButtonContainer: {
        height: 88,
        position: "absolute",
        bottom: 0,
        borderRadius: 32,
        backgroundColor: COLORS.white,
        width: SIZES.width,
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32
    },
    button: {
        width: SIZES.width - 32
    }
})

export default ServicesListType