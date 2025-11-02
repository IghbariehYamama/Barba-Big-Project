import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../constants'

export default StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16
    },
    title: {
        fontSize: 16,
        fontFamily: "bold",
        color: COLORS.black
    },
    hourButton: {
        padding: 10,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#ccc',
        marginHorizontal: 5,
        backgroundColor: "transparent",
    },
    selectedHourButton: {
        backgroundColor: COLORS.primary,
    },
    selectedHourText: {
        fontSize: 12,
        fontFamily: 'medium',
        color: COLORS.white
    },
    hourText: {
        fontSize: 12,
        fontFamily: 'medium',
        color: COLORS.primary
    },
    bottomContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: 72,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        alignItems: "center",
        backgroundColor: COLORS.white,
        justifyContent: "center"
    },
    button: {
        width: SIZES.width - 32,
        height: 54,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary
    }
});