import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react'
import { SIZES, COLORS, images } from '../constants'

const CancelledBookings = ({ bookings }) => {
  const [cancelledBookings, setCancelledBookings] = useState(bookings);

  const manualFormatDate = (year, month, day, hour, minute) => {
    return `${day}/${month}/${year} - ${hour}:${minute.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, {
      backgroundColor: COLORS.tertiaryWhite
    }]}>
      <FlatList
        data={cancelledBookings}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.cardContainer, {
            backgroundColor: COLORS.white,
          }]}>
            <View style={styles.dateContainer}>
              <Text style={[styles.date, { color: COLORS.greyscale900 }]}>
                {manualFormatDate(item.year, item.month, item.day, item.hour, item.minute)}
              </Text>
              <View style={styles.statusContainer}>
                <Text style={styles.status}>{item.status}</Text>
              </View>
            </View>
            <View style={[styles.separateLine, {
              backgroundColor: COLORS.grayscale200,
            }]} />
            <View style={styles.detailsContainer}>
              <Image
                  source={images.salon5}
                  resizeMode='cover'
                  style={styles.barberImage}
              />
              <View style={styles.detailsRightContainer}>
                <Text style={[styles.name, {
                  color: COLORS.greyscale900
                }]}>{item.business.name}</Text>
                <Text style={[styles.serviceTitle, {
                  color: COLORS.grayscale700,
                }]}>Employee:</Text>
                <Text style={styles.serviceText}>{item.employee.name}</Text>
                <Text style={[styles.serviceTitle, {
                  color: COLORS.grayscale700,
                }]}>Service:</Text>
                <Text style={styles.serviceText}>{item.service.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.tertiaryWhite
  },
  cardContainer: {
    width: SIZES.width - 32,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginBottom: 16
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.greyscale900
  },
  statusContainer: {
    width: 64,
    height: 24,
    borderRadius: 6,
    backgroundColor: COLORS.red,
    alignItems: "center",
    justifyContent: "center"
  },
  status: {
    fontSize: 10,
    color: COLORS.white,
    fontFamily: "medium",
  },
  separateLine: {
    width: "100%",
    height: .7,
    backgroundColor: COLORS.grayscale700,
    marginVertical: 10
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  barberImage: {
    width: 88,
    height: 88,
    borderRadius: 16,
    marginHorizontal: 12
  },
  detailsRightContainer: {
    flex: 1,
    marginLeft: 12
  },
  name: {
    fontSize: 17,
    fontFamily: "bold",
    color: COLORS.greyscale900
  },
  address: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.grayscale700,
    marginVertical: 4
  },
  serviceTitle: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.grayscale700,
  },
  serviceText: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: "medium",
    marginTop: 6
  },
  receiptBtn: {
    width: "100%",
    height: 36,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    borderColor: COLORS.primary,
    borderWidth: 1.4,
    marginBottom: 12
  },
  receiptBtnText: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.primary,
  }
})

export default CancelledBookings