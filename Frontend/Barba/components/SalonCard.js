import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const SalonCard = ({
    name,
    image,
    rating,
    //distance,
    onPress,
    location
}) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, {
                backgroundColor: COLORS.white
            }]}>
            <Image
                source={image}
                resizeMode='cover'
                style={styles.courseImage}
            />
            <View style={{ flex: 1 }}>
                <View style={styles.topContainer}>
                    <Text style={[styles.name, {
                        color: COLORS.greyscale900
                    }]}>{name}</Text>
                    <TouchableOpacity
                        onPress={() => setIsBookmarked(!isBookmarked)}>
                        <Image
                            source={isBookmarked ? icons.bookmark2 : icons.bookmark2Outline}
                            resizeMode='contain'
                            style={[styles.bookmarkIcon, {
                                tintColor: isBookmarked ? COLORS.primary : COLORS.primary
                            }]}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.location}>{location}</Text>
                <View style={styles.ratingContainer}>
                    {/*<MaterialIcons name="location-on" size={14} color="orange" />
                    <Text style={styles.distance}> {" "}{distance} {"  "}</Text>*/}
                    <FontAwesome name="star-half-empty" size={14} color="orange" />
                    <Text style={styles.rating}> {" "}{rating}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: SIZES.width - 32,
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: "center",
        height: 128,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.1,
        shadowRadius: 0,
        elevation: 0,
        marginVertical: 8
    },
    courseImage: {
        width: 104,
        height: 104,
        borderRadius: 16,
        marginRight: 16,
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    categoryContainer: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: COLORS.transparentTertiary,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryName: {
        fontSize: 14,
        fontFamily: 'semiBold',
        color: COLORS.primary
    },
    bookmarkIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.primary
    },
    name: {
        fontSize: 16,
        fontFamily: 'bold',
        color: COLORS.black,
        marginVertical: 10,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6
    },
    price: {
        fontSize: 18,
        fontFamily: 'bold',
        color: COLORS.primary,
    },
    oldPrice: {
        fontSize: 14,
        fontFamily: 'medium',
        color: COLORS.gray,
        textDecorationLine: 'line-through',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 14,
        fontFamily: 'medium',
        color: COLORS.gray,
    },
    distance: {
        fontSize: 14,
        fontFamily: 'medium',
        color: COLORS.gray,
    },
    numStudents: {
        fontSize: 14,
        fontFamily: 'medium',
        color: COLORS.gray,
        marginLeft: 8,
    },
    location: {
        fontFamily: 'medium',
        color: COLORS.grayscale700,
        fontSize: 14,
        marginVertical: 12,
    }
})

export default SalonCard