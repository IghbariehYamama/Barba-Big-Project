import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../constants'

export default StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: COLORS.white
    },
    logo: {
        width: 100,
        height: 100,
        tintColor: COLORS.primary
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 32
    },
    title: {
        fontSize: 26,
        fontFamily: "semiBold",
        color: COLORS.black,
        textAlign: "center",
        marginBottom: 22
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    checkBoxContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 18,
    },
    checkbox: {
        marginRight: 8,
        height: 16,
        width: 16,
        borderRadius: 4,
        borderColor: COLORS.primary,
        borderWidth: 2,
    },
    privacy: {
        fontSize: 12,
        fontFamily: "regular",
        color: COLORS.black,
    },
    socialTitle: {
        fontSize: 19.25,
        fontFamily: "medium",
        color: COLORS.black,
        textAlign: "center",
        marginVertical: 26
    },
    socialBtnContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    bottomLeft: {
        fontSize: 14,
        fontFamily: "regular",
        color: "black"
    },
    bottomRight: {
        fontSize: 16,
        fontFamily: "medium",
        color: COLORS.primary
    },
    button: {
        marginVertical: 6,
        width: SIZES.width - 32,
        borderRadius: 30
    },
    forgotPasswordBtnText: {
        fontSize: 16,
        fontFamily: "semiBold",
        color: COLORS.primary,
        textAlign: "center",
        marginTop: 12
    },
    inputContainer: {
        flexDirection: "row",
        borderColor: COLORS.greyscale500,
        borderWidth: .4,
        borderRadius: 6,
        height: 58,
        width: SIZES.width - 32,
        alignItems: 'center',
        marginVertical: 16,
        backgroundColor: COLORS.greyscale500,
    },
    downIcon: {
        width: 10,
        height: 10,
        tintColor: "#111"
    },
    selectFlagContainer: {
        width: 90,
        height: 50,
        marginHorizontal: 5,
        flexDirection: "row",
    },
    flagIcon: {
        width: 30,
        height: 30
    },
    input: {
        flex: 1,
        marginVertical: 10,
        height: 40,
        fontSize: 14,
        color: "#111"
    },
    bottomContainer: {
        position: "absolute",
        bottom: 32,
        left: 0,
        right: 0,
        alignItems: "center",
    },
    bottomTitle: {
        fontSize: 12,
        fontFamily: "regular",
        color: COLORS.black,
    },
    bottomSubtitle: {
        fontSize: 12,
        fontFamily: "regular",
        color: COLORS.black,
        textDecorationLine: "underline",
        marginTop: 2,
    },
});
