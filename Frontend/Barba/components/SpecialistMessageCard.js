import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react'
import { COLORS, SIZES } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { SalonContext } from './SalonContext'

const SpecialistMessageCard = ({ name, position, employeeId }) => {
    const navigation = useNavigation();
    const { salonInfo } = useContext(SalonContext);

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image
                    source={{uri: `https://${appServer.serverName}/businesses/photos/${salonInfo.salonID}/employees/${employeeId}`}}
                    resizeMode='contain'
                    style={styles.avatar}
                />
                <View style={styles.viewContainer}>
                    <Text style={[styles.name, {
                        color: COLORS.greyscale900
                    }]}>{name}</Text>
                    <Text style={styles.phoneNumber}>{position}</Text>
                </View>
            </View>
            {/*
            <TouchableOpacity
                onPress={() => { navigation.navigate("Inbox") }}
                style={[styles.btn, {
                    backgroundColor: COLORS.primary,
                    borderColor: COLORS.primary
                }]}>
                <Text style={[styles.btnText, {
                    color: COLORS.white
                }]}>Message</Text>
            </TouchableOpacity>
            */}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: SIZES.width - 32,
        marginVertical: 12
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    avatar: {
        height: 52,
        width: 52,
        borderRadius: 999
    },
    name: {
        fontSize: 16,
        fontFamily: "bold",
        color: COLORS.black,
        marginBottom: 6
    },
    phoneNumber: {
        fontSize: 12,
        fontFamily: "regular",
        color: COLORS.grayscale700
    },
    viewContainer: {
        marginLeft: 16
    },
    btn: {
        width: 72,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 16
    },
    btnText: {
        fontFamily: "medium",
        color: COLORS.white,
        fontSize: 12
    }
})

export default SpecialistMessageCard