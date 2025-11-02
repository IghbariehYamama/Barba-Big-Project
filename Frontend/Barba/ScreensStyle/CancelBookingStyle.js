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
        fontFamily: "medium",
        color: COLORS.greyscale900,
        marginVertical: 32
    },
    bottomContainer: {
        position: "absolute",
        bottom: 16,
        right: 16,
        width: SIZES.width - 32,
    },
    separateLine: {
        width: SIZES.width - 32,
        height: 1,
        backgroundColor: COLORS.grayscale200,
        marginVertical: 6
    },
    refundContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 12,
        width: SIZES.width - 32
    },
    paidText: {
        fontSize: 16,
        fontFamily: "regular",
        color: COLORS.grayscale700,
        marginRight: 12,
        textDecorationLine: "line-through"
    },
    refundText: {
        fontSize: 16,
        fontFamily: "bold",
        color: COLORS.greyscale900,
    },
    continueBtn: {
        borderRadius: 32,
        backgroundColor: COLORS.primary,
    },
    modalTitle: {
        fontSize: 24,
        fontFamily: "bold",
        color: COLORS.primary,
        textAlign: "center",
        marginVertical: 12
    },
    modalSubtitle: {
        fontSize: 16,
        fontFamily: "regular",
        color: COLORS.black,
        textAlign: "center",
        marginVertical: 12
    },
    modalContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.4)"
    },
    modalSubContainer: {
        height: 460,
        width: SIZES.width * 0.85,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        padding: 16
    },
    modalIllustration: {
        height: 180,
        width: 180,
        marginVertical: 22
    },
    successBtn: {
        width: "100%",
        marginTop: 12,
        borderRadius: 32
    },
    receiptBtn: {
        width: "100%",
        marginTop: 12,
        borderRadius: 32,
        backgroundColor: COLORS.tansparentPrimary,
        borderColor: COLORS.tansparentPrimary
    },
    editPencilIcon: {
        width: 42,
        height: 42,
        tintColor: COLORS.white,
        zIndex: 99999,
        position: "absolute",
        top: 54,
        left: 58,
    },
    backgroundIllustration: {
        height: 150,
        width: 150,
        marginVertical: 22,
        alignItems: "center",
        justifyContent: "center",
        zIndex: -999
    },
})