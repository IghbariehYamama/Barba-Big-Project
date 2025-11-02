import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../constants'

export default StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    headerContainer: {
        width: SIZES.width - 32,
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        top: 32,
        zIndex: 999,
        left: 16,
        right: 16
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.white
    },
    bookmarkIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.white
    },
    contentContainer: {
        marginHorizontal: 16
    },
    salonHeaderContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 12
    },
    salonName: {
        fontSize: 24,
        fontFamily: "bold",
        color: COLORS.black,
    },
    salonBtn: {
        width: 72,
        height: 30,
        borderRadius: 24,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    salonBtnText: {
        fontSize: 14,
        fontFamily: "medium",
        color: COLORS.white,
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
    starMiddleIcon: {
        width: 14,
        height: 14,
        tintColor: COLORS.primary,
        marginRight: 8
    },
    starMiddleText: {
        fontSize: 14,
        fontFamily: "medium",
        color: COLORS.grayscale700,
    },
    linkContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 12
    },
    separateLine: {
        width: SIZES.width - 32,
        height: 1,
        backgroundColor: COLORS.grayscale200
    },
    bottomTitle: {
        fontSize: 24,
        fontFamily: "semiBold",
        color: COLORS.black,
        textAlign: "center",
        marginTop: 12
    },
    socialContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 12,
        width: SIZES.width - 32
    }
})