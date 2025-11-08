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
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    headerContainer: {
        position: "absolute",
        top: 0,
        left: 16
    },
    arrowLeftIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.black
    },
    userInfo: {
        alignItems: "center",
        marginBottom: 100
    },
    view: {
        marginVertical: 22,
        alignItems: 'center'
    },
    userImg: {
        width: 200,
        height: 200,
        borderRadius: 9999
    },
    username: {
        fontSize: 24,
        fontFamily: "bold",
        color: COLORS.black,
        marginBottom: 6
    },
    usertime: {
        fontSize: 14,
        fontFamily: "regular",
        color: COLORS.gray
    },
    bottomContainer: {
        position: "absolute",
        bottom: 36,
        width: SIZES.width - 32,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "center"
    },
    bottomBtn: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    bottomBtnIcon: {
        width: 32,
        height: 32,
        tintColor: COLORS.white
    }
})
