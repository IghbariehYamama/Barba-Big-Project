import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { appServer, COLORS, SIZES } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { ScrollView } from 'react-native-virtualized-view';
import { Calendar } from 'react-native-calendars';
import Button from '../components/Button';
import SpecialistCard from '../components/SpecialistCard';
import { SalonContext } from '../components/SalonContext';
import { specialists } from '../data'

const BookAppointment = ({ route, navigation }) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [filteredHours, setFilteredHours] = useState([]);
  const [filteredSpecialists, setFilteredSpecialists] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [markedDates, setMarkedDates] = useState({});
  const [loadingCalendar, setLoadingCalendar] = useState(true);
  const todayString = today.toISOString().split('T')[0];
  const { salonID } = useContext(SalonContext);

  useEffect(() => {
    if (salonID && selectedMonth && selectedYear) {
      fetchAvailableSlots(selectedYear, selectedMonth);
    }
  }, [salonID, selectedMonth, selectedYear]);



  const fetchAvailableSlots = async (year, month) => {
    setMarkedDates({});
    setLoadingCalendar(true);

    try {
      const res = await fetch(`https://${appServer.serverName}/businesses/business/${salonID}/available/slots/month/${year}/${month}`);
      const data = await res.json();
      setAvailableSlots(data);

      const dateMap = {};
      const validDates = new Set(data.map(slot => slot.date));
      const allDatesInMonth = getAllDaysInMonth(year, month);

      // First, mark all days as disabled
      allDatesInMonth.forEach(date => {
        dateMap[date] = {
          disabled: true,
          disableTouchEvent: true
        };
      });


      // Then, mark only available days as enabled
      validDates.forEach(date => {
        dateMap[date] = {
          selected: false,
          marked: true,
          dotColor: COLORS.primary,
          disabled: false,
          disableTouchEvent: false
        };
      });

      setMarkedDates(dateMap);

    } catch (error) {
      console.error('Failed to fetch available slots:', error);
    } finally {
      setLoadingCalendar(false);
    }
  };




  const getAllDaysInMonth = (year, month) => {
    const days = [];
    const jsMonth = month - 1; // Convert to JS 0-based month
    const numDays = new Date(year, jsMonth, 0).getDate() + 1;

    for (let i = 1; i <= numDays; i++) {
      const date = new Date(year, jsMonth, i);
      const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      days.push(formatted);
    }
    return days;
  };





  const onDayPress = (day) => {
    const dateStr = day.dateString;
    setSelectedDate(dateStr);
    setSelectedHour(null);
    setSelectedSpecialist(null);

    const updatedMarks = {
      ...markedDates,
      [dateStr]: {
        ...(markedDates[dateStr] || {}),
        selected: true,
        selectedColor: COLORS.primary
      }
    };
    Object.keys(updatedMarks).forEach(key => {
      if (key !== dateStr && updatedMarks[key].selected) {
        updatedMarks[key].selected = false;
      }
    });
    setMarkedDates(updatedMarks);

    const slotForDate = availableSlots.find(slot => slot.date === dateStr);
    if (slotForDate) {
      const hourSet = new Set();
      slotForDate.employees.forEach(emp => {
        emp.slots.forEach(time => hourSet.add(time));
      });
      setFilteredHours([...hourSet].sort().map((hour, index) => ({ id: index, hour })));
      setFilteredSpecialists([]);
    } else {
      setFilteredHours([]);
      setFilteredSpecialists([]);
    }
  };

  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
    setSelectedSpecialist(null);

    const slotForDate = availableSlots.find(slot => slot.date === selectedDate);
    if (!slotForDate) return;

    const specialists = slotForDate.employees
        .filter(emp => emp.slots.includes(hour))
        .map(emp => emp.employeeId.toString()); // convert to string if needed

    setFilteredSpecialists(specialists);
    console.log("test1: " + specialists);
    renderSpecialistCard(specialists);
  };

  const handleSelectSpecialist = (id) => {
    setSelectedSpecialist(id);

    const slotForDate = availableSlots.find(slot => slot.date === selectedDate);
    if (!slotForDate) return;

    const emp = slotForDate.employees.find(emp => emp.employeeId === id);
    if (!emp) return;

    const empHours = emp.slots;
    setFilteredHours(empHours.map((hour, index) => ({ id: index, hour })));
  };

  const renderHourItem = ({ item }) => (
      <TouchableOpacity
          style={[
            styles.hourButton,
            selectedHour === item.hour && styles.selectedHourButton,
          ]}
          onPress={() => handleHourSelect(item.hour)}
      >
        <Text
            style={[
              styles.hourText,
              selectedHour === item.hour && styles.selectedHourText,
            ]}
        >
          {item.hour}
        </Text>
      </TouchableOpacity>
  );

  const renderSpecialistCard = ({ item }) => {
    if (!item) return null; // <- Prevent crashing on undefined item

    const specialist = specialists.find(s => s.id.toString() === item.toString());

    if (!specialist) return null; // <- If no match, skip rendering

    return (
        <SpecialistCard
            key={specialist.id}
            id={specialist.id}
            name={specialist.name}
            avatar={specialist.avatar}
            position={specialist.position}
            onPress={handleSelectSpecialist}
            isSelected={selectedSpecialist === specialist.id}
        />
    );
  };

  const handleMonthChange = (monthObj) => {
    setSelectedMonth(monthObj.month);
    setSelectedYear(monthObj.year);
  };



  return (
      <SafeAreaView style={styles.area}>
        <View style={styles.container}>
          <Header title="Booking Details" />
          <ScrollView contentContainerStyle={{ marginVertical: 16 }} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Select Date</Text>
            {loadingCalendar ? (
                <Text style={{ textAlign: 'center', marginVertical: 20 }}>Loading calendar...</Text>
            ) : (
                <Calendar
                    current={`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`}
                    onDayPress={onDayPress}
                    markedDates={markedDates}
                    disableAllTouchEventsForDisabledDays={true}
                    style={{ marginVertical: 16, borderRadius: 12 }}
                    theme={{
                      selectedDayBackgroundColor: COLORS.primary,
                      selectedDayTextColor: COLORS.white,
                      todayTextColor: COLORS.primary,
                      arrowColor: COLORS.primary
                    }}
                    onMonthChange={handleMonthChange}
                />

            )}

            <Text style={styles.title}>Select Hour</Text>
            <FlatList
                data={filteredHours}
                renderItem={renderHourItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginVertical: 12 }}
            />

            <Text style={styles.title}>Select Specialist</Text>
            <FlatList
                data={filteredSpecialists.filter(Boolean)} // <- Removes any undefined/null
                renderItem={renderSpecialistCard}
                keyExtractor={(id) => id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 22, marginBottom: 72 }}
            />

          </ScrollView>
        </View>

        <View style={styles.bottomContainer}>
          <Button
              title="Continue"
              filled
              style={styles.button}
              onPress={() => {
                navigation.navigate("ReviewSummary", {
                  date: selectedDate,
                  time: selectedHour,
                  specialist: selectedSpecialist,
                });
              }}
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
