import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { ScrollView } from 'react-native-virtualized-view';
import { Calendar } from 'react-native-calendars';
import { hoursData, specialists } from '../data';
import Button from '../components/Button';
import SpecialistCard from '../components/SpecialistCard';

const BookAppointment = ({ navigation }) => {
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  const onDayPress = (day) => {
    if (new Date(day.dateString) >= today) {
      setSelectedDate(day.dateString);
    }
  };

  const getMarkedDates = () => {
    const markedDates = {};

    if (selectedDate) {
      markedDates[selectedDate] = {
        selected: true,
        color: COLORS.white,
        textColor: COLORS.primary
      };
    }

    return markedDates;
  };

  const getDisabledDates = () => {
    const disabledDates = {};
    const currentDate = new Date(today);
    for (let i = -365; i < 0; i++) {
      const pastDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
      const pastDateString = pastDate.toISOString().split('T')[0];
      disabledDates[pastDateString] = { disabled: true, disableTouchEvent: true };
    }
    return disabledDates;
  };

  const markedDates = {
    ...getMarkedDates(),
    ...getDisabledDates(),
  };
  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
  };

  const handleSelectSpecialist = (id) => {
    setSelectedSpecialist(id);
  };

  const renderHourItem = ({ item }) => {
    return (
        <TouchableOpacity
            style={[
              styles.hourButton,
              selectedHour === item.id && styles.selectedHourButton,
            ]}
            onPress={() => handleHourSelect(item.id)}
        >
          <Text style={[
            styles.hourText,
            selectedHour === item.id && styles.selectedHourText
          ]}>{item.hour}</Text>
        </TouchableOpacity>
    );
  };

  return (
      <SafeAreaView style={[styles.area, { backgroundColor: COLORS.white }]}>
        <View style={[styles.container, { backgroundColor: COLORS.white }]}>
          <Header title="Booking Details" />
          <ScrollView contentContainerStyle={{ marginVertical: 16 }} showsVerticalScrollIndicator={false}>
            <Text style={[styles.title, { color: COLORS.black }]}>Select Date</Text>
            <Calendar
                onDayPress={onDayPress}
                markingType={'simple'}
                markedDates={markedDates}
                style={{
                  backgroundColor: COLORS.primary,
                  marginVertical: 16,
                  borderRadius: 12,
                  height: 360,
                }}
                theme={{
                  backgroundColor: COLORS.primary,
                  calendarBackground: COLORS.primary,
                  textSectionTitleColor: COLORS.white,
                  selectedDayBackgroundColor: COLORS.white,
                  selectedDayTextColor: COLORS.primary,
                  todayTextColor: COLORS.white,
                  dayTextColor: COLORS.white,
                  textDisabledColor: '#bdbdbd',
                  monthTextColor: COLORS.white,
                  indicatorColor: COLORS.white,
                  textDayFontWeight: '300',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '300',
                  arrowColor: COLORS.white,
                }}
            />
            <Text style={[styles.title, { color: COLORS.black }]}>Select Hours</Text>
            <View style={{ marginVertical: 12 }}>
              <FlatList
                  data={hoursData}
                  renderItem={renderHourItem}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
              />
            </View>

            <Text style={[styles.title, { color: COLORS.black }]}>Select Specialist</Text>
            <View style={{ marginTop: 22, marginBottom: 72 }}>
              <FlatList
                  data={specialists}
                  keyExtractor={(item) => item.id.toString()}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  renderItem={({ item }) => (
                      <SpecialistCard
                          id={item.id}
                          name={item.name}
                          avatar={item.avatar}
                          position={item.position}
                          onPress={handleSelectSpecialist}
                          isSelected={selectedSpecialist === item.id}
                      />
                  )}
              />
            </View>
          </ScrollView>
        </View>
        <View style={[styles.bottomContainer, { backgroundColor: COLORS.white }]}>
          <Button
              title="Continue"
              filled
              style={styles.button}
              onPress={() => navigation.navigate("ReviewSummary")}
          />
        </View>
      </SafeAreaView>
  );
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
  title: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.black
  },
  hourButton: {
    padding: 10,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
    backgroundColor: "transparent",
  },
  selectedHourButton: {
    backgroundColor: COLORS.primary,
  },
  selectedHourText: {
    fontSize: 12,
    fontFamily: 'medium',
    color: COLORS.white
  },
  hourText: {
    fontSize: 12,
    fontFamily: 'medium',
    color: COLORS.primary
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 72,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    alignItems: "center",
    backgroundColor: COLORS.white,
    justifyContent: "center"
  },
  button: {
    width: SIZES.width - 32,
    height: 54,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary
  }
});

export default BookAppointment;
