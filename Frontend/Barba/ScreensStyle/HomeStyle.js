import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../constants'

export default StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container:{
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16
    },
    headerContainer: {
        flexDirection: "row",
        width: SIZES.width - 32,
        justifyContent: "space-between",
        alignItems: "center"
    },
    userIcon: {
        width: 48,
        height: 48,
        borderRadius: 32
    },
    viewLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    greeeting: {
        fontSize: 12,
        fontFamily: "regular",
        color: "gray",
        marginBottom: 4
    },
    title: {
        fontSize: 20,
        fontFamily: "bold",
        color: COLORS.greyscale900
    },
    viewNameContainer: {
        marginLeft: 12
    },
    viewRight: {
        flexDirection: "row",
        alignItems: "center"
    },
    bellIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black,
        marginRight: 8
    },
    bookmarkIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
    },
    searchBarContainer: {
        width: SIZES.width - 32,
        backgroundColor: COLORS.secondaryWhite,
        padding: 16,
        borderRadius: 12,
        height: 52,
        marginVertical: 16,
        flexDirection: "row",
        alignItems: "center"
    },
    searchIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.gray
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: "regular",
        marginHorizontal: 8
    },
    filterIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.primary
    },
    bannerContainer: {
        width :SIZES.width - 32,
        height: 154 ,
        paddingHorizontal: 28,
        paddingTop: 28,
        borderRadius: 32,
        backgroundColor: COLORS.primary
    },
    bannerTopContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    bannerDicount: {
        fontSize: 12,
        fontFamily: "medium",
        color: COLORS.white,
        marginBottom: 4
    },
    bannerDiscountName: {
        fontSize: 16,
        fontFamily: "bold",
        color: COLORS.white
    },
    bannerDiscountNum: {
        fontSize: 46,
        fontFamily: "bold",
        color: COLORS.white
    },
    bannerBottomContainer: {
        marginTop: 8
    },
    bannerBottomTitle: {
        fontSize: 14,
        fontFamily: "medium",
        color: COLORS.white
    },
    bannerBottomSubtitle: {
        fontSize: 14,
        fontFamily: "medium",
        color: COLORS.white,
        marginTop: 4
    },
    mentorContainer: {
        marginRight: 10,
        alignItems: "center"
    },
    userAvatar: {
        width: 64,
        height: 64,
        borderRadius: 999
    },
    firstName: {
        fontSize: 16,
        fontFamily: "semiBold",
        color: COLORS.dark2,
        marginTop: 6
    },
    bannerItemContainer: {
        width: "100%",
        paddingBottom: 10,
        backgroundColor: COLORS.primary,
        height: 170,
        borderRadius: 32,
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: COLORS.white,
    }
})