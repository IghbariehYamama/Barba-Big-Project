import { View, Text, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, icons, illustrations, appServer } from '../constants'
import Header from '../components/Header';
import { ScrollView } from 'react-native-virtualized-view';
import Button from '../components/Button';
import { customer } from '../data'
import styles from '../ScreensStyle/ReviewSummaryStyle'

const ReviewSummary = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    date,
    time,
    salonName,
    salonAddress,
    customerName,
    customerPhone,
    specialistName,
    services, // Array: [{ name: "Haircut", price: 6.00 }, ...]
    employeeId,
    businessId
  } = route.params;

  const createAppointment = async () => {
    try {
      let hour = time.slice(0, 2);
      hour = hour[0] === "0" ? hour[1] : hour;
      let minute = time.slice(3, 5);
      minute = minute[0] === "0" ? minute[1] : minute;
      const appointmentData = {
        businessId: businessId,
        serviceId: "1",
        customerId: customer.id,
        employeeId: employeeId,
        hour: hour,
        minute: minute,
        day: date.day,
        month: date.month,
        year: date.year
      };
      console.log(date)

      const response = await fetch(`https://${appServer.serverName}/bookings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(appointmentData)
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setModalVisible(true); // Show confirmation modal
      } else {
        Alert.alert("Error", data.message || "Failed to create appointment.");
      }
    } catch (error) {
      Alert.alert("Network Error", "Please check your connection and try again.");
    }
  };


  // Render modal
  const renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalSubContainer, {
              backgroundColor: COLORS.white,
            }]}>
              <View style={styles.backgroundIllustration}>
                <Image
                  source={illustrations.background}
                  resizeMode='contain'
                  style={styles.modalIllustration}
                />
                <Image
                  source={icons.check}
                  resizeMode='contain'
                  style={styles.editPencilIcon}
                />
              </View>
              <Text style={styles.modalTitle}>Congratulations!</Text>
              <Text style={[styles.modalSubtitle, {
                color: COLORS.black,
              }]}>
                You have successfully made a payment and booked a service.
              </Text>
              <Button
                title="Continue"
                filled
                onPress={() => {
                  setModalVisible(false)
                  navigation.navigate("Home")
                }}
                style={styles.successBtn}
              />
              <Button
                title="View E-Receipt"
                onPress={() => {
                  setModalVisible(false)
                  navigation.navigate("EReceipt")
                }}
                textColor={COLORS.primary}
                style={{
                  width: "100%",
                  marginTop: 12,
                  borderRadius: 32,
                  backgroundColor: COLORS.tansparentPrimary,
                  borderColor: COLORS.tansparentPrimary
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }


  return (
    <SafeAreaView style={[styles.area, {
      backgroundColor: COLORS.white
    }]}>
      <View style={[styles.container, {
        backgroundColor: COLORS.white
      }]}>
        <Header title="Review Summary" />
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={[styles.summaryContainer, {
            backgroundColor: COLORS.white,
          }]}>
            <View style={styles.view}>
              <Text style={styles.viewLeft}>Barber/Salon</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>{salonName}</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.viewLeft}>Address</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>{salonAddress}</Text>
            </View>

            <View style={styles.view}>
              <Text style={styles.viewLeft}>Name</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>{customerName}</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.viewLeft}>Phone</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>{customerPhone}</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.viewLeft}>Booking Date</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>{date.dateString}</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.viewLeft}>Booking Hours</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>{time}</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.viewLeft}>Specialist</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>{specialistName}</Text>
            </View>
          </View>

          <View style={[styles.summaryContainer, {
            backgroundColor: COLORS.white,
          }]}>
            <View style={styles.view}>
              <Text style={styles.viewLeft}>Haircut (Quiff)</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>$6.00</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.viewLeft}>Hair Wash (Aloe Verra Shamppo)</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>$5.55</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.viewLeft}>Shaving (Thin Shaving)</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>$4.55</Text>
            </View>
            <View style={[styles.separateLine, {
              backgroundColor: COLORS.grayscale200
            }]} />
            <View style={styles.view}>
              <Text style={styles.viewLeft}>Total</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>$11.99</Text>
            </View>
          </View>
          {/*
          <View style={[styles.cardContainer, {
            backgroundColor: COLORS.white
          }]}>
            <View style={styles.cardLeft}>
              <Image
                source={icons.creditCard}
                resizeMode='contain'
                style={styles.creditCard}
              />
              <Text style={[styles.creditCardNum, {
                color: COLORS.greyscale900
              }]}>
                •••• •••• •••• •••• 4679</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddNewCard")}>
              <Text style={styles.changeBtnText}>Change</Text>
            </TouchableOpacity>
          </View>
          */}

        </ScrollView>
        <Button
            title="Continue"
            onPress={() => {
              createAppointment();
              setModalVisible(true);
            }}
            filled
            style={styles.continueBtn}
        />

      </View>
      {renderModal()}
    </SafeAreaView>
  )
};


export default ReviewSummary