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
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 16
    },
    scrollView: {
        backgroundColor: COLORS.tertiaryWhite
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    backIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black,
        marginRight: 16
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: "bold",
        color: COLORS.black
    },
    moreIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.black
    },
    summaryContainer: {
        width: SIZES.width - 32,
        backgroundColor: COLORS.white,
        alignItems: "center",
        padding: 16,
        marginVertical: 8
    },
    viewContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginVertical: 12
    },
    viewLeft: {
        fontSize: 12,
        fontFamily: "regular",
        color: "gray"
    },
    viewRight: {
        fontSize: 14,
        fontFamily: "medium",
        color: COLORS.black
    },
    copyContentContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    statusBtn: {
        width: 72,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.tansparentPrimary,
        borderRadius: 6
    },
    statusBtnText: {
        fontSize: 12,
        fontFamily: "medium",
        color: COLORS.primary
    }
})
