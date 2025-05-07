import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SIZES, icons, images } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookingTabSelection from '../tabs/BookingTabSelection';

const MyBooking = () => {
  /**
   * render header
   */
  const renderHeader = ()=>{
    return (
      <View style={styles.headerContainer}>
         <View style={styles.headerLeftContainer}>
            <Image
              source={images.logo}
              resizeMode='contain'
              style={styles.logoIcon}
            />
            <Text style={[styles.headerTitle, {
              color: COLORS.greyscale900
            }]}>My Bookings</Text>
         </View>
         <View style={styles.headerRightContainer}>
            <TouchableOpacity>
              <Image
                source={icons.search}
                resizeMode='contain'
                style={[styles.searchIcon, { 
                  tintColor: COLORS.greyscale900,
                }]}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={icons.moreCircle}
                resizeMode='contain'
                style={[styles.moreIcon, { 
                  tintColor: COLORS.greyscale900,
                }]}
              />
            </TouchableOpacity>
         </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={[styles.area, { backgroundColor: COLORS.white }]}>
      <View style={[styles.container, { backgroundColor: COLORS.white }]}>
        {renderHeader()}
        <BookingTabSelection/>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
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
    width: SIZES.width - 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerLeftContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  logoIcon: {
    height: 32,
    width: 32,
    tintColor: COLORS.primary,
    marginRight: 16
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "bold",
    color: COLORS.greyscale900
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.greyscale900,
    marginRight: 12
  },
  moreIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.greyscale900
  }
})

export default MyBooking