import { StyleSheet } from 'react-native'
import { SIZES } from '../constants'

export default StyleSheet.create({
    card: {
        width: SIZES.width - 32,
        borderRadius: 16,
        marginVertical: 6
    },
    addBtn: {
        borderRadius: 32
    }
})