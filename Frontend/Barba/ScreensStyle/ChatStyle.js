import { StyleSheet } from 'react-native'
import { COLORS } from '../constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    contentContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: COLORS.white,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: "bold",
        color: COLORS.black,
        marginLeft: 22
    },
    headerIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionIcon: {
        marginRight: 12,
    },
    chatContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    inputMessageContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        backgroundColor: COLORS.grayscale100,
        paddingVertical: 8,
        marginRight: 12,
        borderRadius: 12,
        alignItems: 'center'
    },
    attachmentIconContainer: {
        marginRight: 12,
    },
    input: {
        color: COLORS.blue2,
        flex: 1,
        paddingHorizontal: 10,
    },
    microContainer: {
        height: 48,
        width: 48,
        borderRadius: 49,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    }
});