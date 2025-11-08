import { StyleSheet } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'

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
    avatarContainer: {
        marginVertical: 12,
        alignItems: "center",
        width: 130,
        height: 130,
        borderRadius: 65,
    },
    avatar: {
        height: 130,
        width: 130,
        borderRadius: 65,
    },
    pickImage: {
        height: 42,
        width: 42,
        borderRadius: 21,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    inputContainer: {
        flexDirection: "row",
        borderColor: COLORS.greyscale500,
        borderWidth: .4,
        borderRadius: 12,
        height: 52,
        width: SIZES.width - 32,
        alignItems: 'center',
        marginVertical: 12,
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
    inputBtn: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: COLORS.greyscale500,
        height: 52,
        paddingLeft: 8,
        fontSize: 18,
        justifyContent: "space-between",
        marginTop: 4,
        backgroundColor: COLORS.greyscale500,
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 8
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    bottomContainer: {
        position: "absolute",
        bottom: 32,
        right: 16,
        left: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        width: SIZES.width - 32,
        alignItems: "center"
    },
    continueButton: {
        width: (SIZES.width - 32) - 8,
        borderRadius: 32,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary
    },
    closeBtn: {
        width: 42,
        height: 42,
        borderRadius: 999,
        backgroundColor: COLORS.white,
        position: "absolute",
        right: 16,
        top: 32,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
    },
    modalContainer: {
        width: '90%',
        backgroundColor: COLORS.white,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
        overflow: 'hidden',
    },


    dropdownHeader: {
        marginBottom: 16,
        fontSize: 18,
        color: COLORS.black,
        fontWeight: '600',
    },

    dropdownItem: {
        width: '100%',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
        alignItems: 'center',
    },

    dropdownItemText: {
        fontSize: 16,
        color: COLORS.black,
    },
    label: {
        fontSize: 16,
        color: COLORS.black,
        marginBottom: 4,
    },

    selectedDropdownItem: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        paddingHorizontal: 20,
    },

    selectedDropdownText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
    genderSelector: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 12,
        borderColor: COLORS.gray,
        height: 52,
        paddingHorizontal: 12,
        backgroundColor: COLORS.greyscale500,
    },

    genderText: {
        fontSize: 16,
        color: COLORS.gray,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },

    genderModal: {
        backgroundColor: COLORS.white,
        paddingVertical: 20,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        alignItems: "center",
        width: "100%",
        paddingBottom: 30,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.black,
        marginBottom: 16,
    },

    genderOptionsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        paddingHorizontal: 20,
    },

    genderOption: {
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        backgroundColor: COLORS.lightGray,
        flexDirection: "row",
        gap: 10,
    },

    selectedGenderOption: {
        backgroundColor: COLORS.primary,
    },

    genderOptionText: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight: "bold",
    },
    datePicker: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: COLORS.greyscale500,
        height: 52,
        paddingLeft: 8,
        fontSize: 18,
        justifyContent: "center",
        backgroundColor: COLORS.greyscale500,
        paddingRight: 8,
        marginTop: 4,
    },

    datePickerText: {
        color: COLORS.gray,
        fontSize: 14,
        ...FONTS.body4
    },

    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 16,
        width: '100%',
    },

    calendarDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.greyscale500,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 4,
    },

    calendarDropdownText: {
        fontSize: 16,
        color: COLORS.black,
        marginRight: 4,
    },

    calendarArrowIcon: {
        width: 12,
        height: 12,
        tintColor: COLORS.black,
    },

})