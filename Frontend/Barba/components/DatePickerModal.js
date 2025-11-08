import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { COLORS } from '../constants';

const DatePickerModal = ({
                           open,
                           startDate,
                           selectedDate,
                           onClose,
                           onChangeStartDate,
                         }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());

  useEffect(() => {
    if (selectedDate instanceof Date && !isNaN(selectedDate)) {
      setSelectedStartDate(selectedDate);
    } else if (selectedDate) {
      const parsedDate = new Date(selectedDate);
      if (!isNaN(parsedDate)) {
        setSelectedStartDate(parsedDate);
      }
    }
  }, [selectedDate]);


  const handleDateChange = (date) => {
    setSelectedStartDate(date);
    onChangeStartDate(date);
  };

  return (
      <Modal animationType="slide" transparent={true} visible={open}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
                date={selectedStartDate}
                mode="date"
                minimumDate={startDate ? new Date(startDate) : undefined}
                maximumDate={new Date()}
                onDateChange={handleDateChange}
            />

            <TouchableOpacity onPress={onClose}>
              <Text style={{ color: 'white', marginTop: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default DatePickerModal;
