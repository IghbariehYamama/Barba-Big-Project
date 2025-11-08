import { View, Text, ScrollView, Alert, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList, TextInput } from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { reducer } from '../utils/reducers/formReducers';
import { validateInput } from '../utils/actions/formActions';
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { launchImagePicker } from '../utils/ImagePickerHelper';
import Input from '../components/Input';
import { getFormatedDate } from "react-native-modern-datepicker";
import DatePickerModal from '../components/DatePickerModal';
import Button from '../components/Button';
import { customer } from '../data/index';
import { allcities } from '../data/allCities'
import { Calendar } from 'react-native-calendars';
import { FillYourProfileAPI } from '../APIs/FillYourProfileAPIs'
import styles from '../ScreensStyle/FillYourProfileStyle'

const isTestMode = false;

const initialState = {
  inputValues: {
    name: isTestMode ? 'John Doe' : '',
    email: isTestMode ? 'example@gmail.com' : '',
    password: isTestMode ? "" : "",
    dateOfBirth: '2001-12-31',
    gender: ''
  },
  inputValidities: {
    name: false,
    email: false,
    password: false,
    dateOfBirth: false,
    gender: false,
  },
  formIsValid: false,
};

const FillYourProfile = ({ route, navigation }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [genderDropdownVisible, setGenderDropdownVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState(formState.inputValues.gender);
  const [cities, setCities] = useState(allcities);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityDropdownVisible, setCityDropdownVisible] = useState(false);
  const { phoneNumber } = route.params;
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [calendarMode, setCalendarMode] = useState('day'); // 'day', 'month', or 'year'
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [calendarDate, setCalendarDate] = useState('');

  useEffect(() => {
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-01`;
    setCalendarDate(dateStr);
  }, [selectedYear, selectedMonth]);


  const genders = ["MALE", "FEMALE"];

  console.log('Date of birth:', dateOfBirth);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    inputChangedHandler("gender", gender);
    setGenderDropdownVisible(false);
  };

// Date formatting util
  const formatDateToDisplay = (date) => {
    // Ensure consistent formatting for display
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // "YYYY-MM-DD"
  };

  useEffect(() => {
    // Initialize selectedDate from formState
    if (formState.inputValues.dateOfBirth) {
      setSelectedDate(formatDateToDisplay(formState.inputValues.dateOfBirth));
    }
  }, []);


  const today = getFormatedDate(new Date(), 'YYYY-MM-DD'); // Or 'YYYY/MM/DD' based on library


  const handleDateChange = (date) => {
    setSelectedDate(date);
    inputChangedHandler('dateOfBirth', date);
    setOpenDatePicker(false);
  };

  const inputChangedHandler = useCallback(
      (inputId, inputValue) => {
        const result = validateInput(inputId, inputValue);
        dispatchFormState({ inputId, validationResult: result, inputValue });
      },
      [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error);
    }
  }, [error]);

  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker();

      if (!tempUri) return;

      setImage({ uri: tempUri });
    } catch (error) {}
  };

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
        .then(response => response.json())
        .then(data => {
          let areaData = data.map((item) => {
            return {
              code: item.alpha2Code,
              item: item.name,
              callingCode: `+${item.callingCodes[0]}`,
              flag: `https://flagsapi.com/${item.alpha2Code}/flat/64.png`
            };
          });

          setAreas(areaData);
          if (areaData.length > 0) {
            let defaultData = areaData.filter((a) => a.code == "IL");

            if (defaultData.length > 0) {
              setSelectedArea(defaultData[0]);
            }
          }
        });
  }, []);

  function RenderAreasCodesModal() {
    const renderItem = ({ item }) => {
      return (
          <TouchableOpacity
              style={{
                padding: 10,
                flexDirection: "row"
              }}
              onPress={() => {
                setSelectedArea(item),
                    setModalVisible(false);
              }}
          >
            <Image
                source={{ uri: item.flag }}
                contentFit='contain'
                style={{
                  height: 30,
                  width: 30,
                  marginRight: 10
                }}
            />
            <Text style={{ fontSize: 16, color: "#fff" }}>{item.item}</Text>
          </TouchableOpacity>
      );
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
          <TouchableWithoutFeedback
              onPress={() => setModalVisible(false)}
          >
            <View
                style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            >
              <View
                  style={{
                    height: SIZES.height,
                    width: SIZES.width,
                    backgroundColor: COLORS.primary,
                    borderRadius: 12
                  }}
              >
                <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.closeBtn}>
                  <Ionicons name="close-outline" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <FlatList
                    data={areas}
                    renderItem={renderItem}
                    horizontal={false}
                    keyExtractor={(item) => item.code}
                    style={{
                      padding: 20,
                      marginBottom: 20
                    }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
    );
  }

  return (
      <SafeAreaView style={styles.area}>
        <View style={styles.container}>
          <Header title="Fill Your Profile" />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: "center", marginVertical: 12 }}>
              <View style={styles.avatarContainer}>
                <Image
                    source={image === null ? icons.userDefault2 : image}
                    resizeMode="cover"
                    style={styles.avatar} />
                <TouchableOpacity
                    onPress={pickImage}
                    style={styles.pickImage}>
                  <MaterialCommunityIcons
                      name="pencil-outline"
                      size={24}
                      color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Input
                  id="name"
                  onInputChanged={inputChangedHandler}
                  errorText={formState.inputValidities['name']}
                  placeholder="Name"
                  placeholderTextColor={COLORS.gray} />
              <Input
                  id="email"
                  onInputChanged={inputChangedHandler}
                  errorText={formState.inputValidities['email']}
                  placeholder="email"
                  keyboardType="email-address"
                  placeholderTextColor={COLORS.gray} />
              <Input
                  id="phone"
                  onInputChanged={inputChangedHandler}
                  errorText={formState.inputValidities['phone']}
                  placeholder="Phone Number"
                  placeholderTextColor={COLORS.gray}
                  value={phoneNumber}
                  editable={false}
              />
              <Input
                  id="password"
                  onInputChanged={inputChangedHandler}
                  errorText={formState.inputValidities['password']}
                  placeholder="Password"
                  placeholderTextColor={COLORS.gray}
                  secureTextEntry={true} />

              <TouchableOpacity
                  style={[styles.genderSelector, selectedGender && { borderColor: COLORS.primary }]}
                  onPress={() => setGenderDropdownVisible(true)}
              >
                <Text style={[styles.genderText, selectedGender && { color: COLORS.primary }]}>
                  {selectedGender || "Select Gender"}
                </Text>
                <Feather name="chevron-down" size={20} color={COLORS.gray} />
              </TouchableOpacity>


              {/* Gender Dropdown Modal */}
              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={genderDropdownVisible}
              >
                <TouchableWithoutFeedback onPress={() => setGenderDropdownVisible(false)}>
                  <View style={styles.modalOverlay}>
                    <View style={styles.genderModal}>
                      <Text style={styles.modalTitle}>Select Gender</Text>

                      <View style={styles.genderOptionsContainer}>
                        {genders.map((gender) => (
                            <TouchableOpacity
                                key={gender}
                                style={[
                                  styles.genderOption,
                                  selectedGender === gender && styles.selectedGenderOption
                                ]}
                                onPress={() => handleGenderSelect(gender)}
                            >
                              <Ionicons
                                  name={gender === "MALE" ? "male-outline" : "female-outline"}
                                  size={24}
                                  color={selectedGender === gender ? COLORS.white : COLORS.black}
                              />
                              <Text
                                  style={[
                                    styles.genderOptionText,
                                    selectedGender === gender && { color: COLORS.white }
                                  ]}
                              >
                                {gender}
                              </Text>
                            </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>



              {/*
              <TouchableOpacity
                  style={[styles.inputBtn, { marginVertical: 12 }]}
                  onPress={() => setCityDropdownVisible(true)}
              >
                <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
                  {selectedCity || "Select City"}
                </Text>
                <Feather name="chevron-down" size={20} color={COLORS.gray} />
              </TouchableOpacity>
              */}
              {/* Dropdown modal for cities
              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={cityDropdownVisible}
              >
                <TouchableWithoutFeedback onPress={() => setCityDropdownVisible(false)}>
                  <View style={styles.modalOverlay}>
                    <View style={styles.dropdownContainer}>
                      <FlatList
                          data={cities}
                          keyExtractor={(item, index) => `${item}-${index}`}
                          renderItem={({ item }) => (
                              <TouchableOpacity
                                  style={styles.dropdownItem}
                                  onPress={() => {
                                    setSelectedCity(item);
                                    inputChangedHandler("city", item); // Update form state
                                    setCityDropdownVisible(false);
                                  }}
                              >
                                <Text style={styles.dropdownItemText}>{item}</Text>
                              </TouchableOpacity>
                          )}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>*/}

              <View style={{ width: SIZES.width - 32 }}>
                <TouchableOpacity onPress={() => setDateModalVisible(true)} style={styles.datePicker}>
                  <Text style={styles.datePickerText}>
                    {dateOfBirth
                        ? new Date(dateOfBirth).toLocaleDateString('en-GB') // dd/mm/yyyy format
                        : "Choose Date of Birth"}
                  </Text>
                </TouchableOpacity>
              </View>


            </View>
          </ScrollView>
        </View>
        <Modal
            visible={isDateModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setDateModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 16, width: '90%' }}>
              <TouchableOpacity onPress={() => {
                if (calendarMode === 'day') setCalendarMode('month');
                else if (calendarMode === 'month') setCalendarMode('year');
              }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
                  {calendarMode === 'day' && `${new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long' })} ${selectedYear}`}
                  {calendarMode === 'month' && selectedYear}
                  {calendarMode === 'year' && 'Select Year'}
                </Text>
              </TouchableOpacity>

              {/* Year Selector */}
              {calendarMode === 'year' && (
                  <FlatList
                      data={Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => new Date().getFullYear() - i)} // descending
                      keyExtractor={(item) => item.toString()}
                      numColumns={3}
                      contentContainerStyle={{ paddingVertical: 10 }}
                      showsVerticalScrollIndicator={false}
                      style={{ maxHeight: 300 }} // limit height
                      renderItem={({ item: year }) => (
                          <TouchableOpacity
                              onPress={() => {
                                setSelectedYear(year);
                                setCalendarDate(`${year}-${String(selectedMonth + 1).padStart(2, '0')}-01`);
                                setCalendarMode('month');
                              }}

                              style={{ flex: 1, margin: 6, alignItems: 'center', paddingVertical: 10, backgroundColor: '#f0f0f0', borderRadius: 8 }}
                          >
                            <Text style={{ fontSize: 16 }}>{year}</Text>
                          </TouchableOpacity>
                      )}
                  />
              )}


              {calendarMode === 'month' && (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {Array.from({ length: 12 }, (_, month) => (
                        <TouchableOpacity
                            key={month}
                            onPress={() => {
                              setSelectedMonth(month);
                              setCalendarDate(`${selectedYear}-${String(month + 1).padStart(2, '0')}-01`);
                              setCalendarMode('day');
                            }}
                            style={{ width: '30%', marginVertical: 8, alignItems: 'center' }}
                        >
                          <Text style={{ fontSize: 16 }}>
                            {new Date(2020, month).toLocaleString('default', { month: 'short' })}
                          </Text>
                        </TouchableOpacity>
                    ))}
                  </View>
              )}


              {/* Day Selector (Calendar) */}
              {calendarMode === 'day' && (
                  <Calendar
                      onDayPress={(day) => {
                        setDateOfBirth(day.dateString);
                        inputChangedHandler('dateOfBirth', day.dateString); // <-- ADD THIS LINE
                        setDateModalVisible(false);
                      }}

                      key={`${selectedYear}-${selectedMonth}`}
                      current={calendarDate}
                      maxDate={new Date().toISOString().split('T')[0]}
                      markedDates={{
                        ...(dateOfBirth && {
                          [dateOfBirth]: {
                            selected: true,
                            selectedColor: COLORS.primary,
                            selectedTextColor: COLORS.white
                          }
                        })
                      }}
                      theme={{
                        selectedDayBackgroundColor: COLORS.primary,
                        todayTextColor: COLORS.primary,
                        arrowColor: COLORS.primary,
                      }}
                      hideArrows={true}
                      renderHeader={() => null}
                      style={{ borderRadius: 12 }}
                  />
              )}

              <TouchableOpacity
                  style={{ marginTop: 16, alignSelf: 'flex-end' }}
                  onPress={() => {
                    setCalendarMode('day');
                    setDateModalVisible(false);
                  }}
              >
                <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


        {RenderAreasCodesModal()}
        <View style={styles.bottomContainer}>
          <Button
              title="Continue"
              filled
              style={styles.continueButton}
              onPress={async () => {
                if (isTestMode) {
                  const { name, email, password, dateOfBirth, gender } = formState.inputValues;
                  console.log(name, email, password, dateOfBirth, gender);
                  navigation.navigate("Main");
                }
                let { name, email, password, dateOfBirth, gender } = formState.inputValues;
                const phone = phoneNumber;
                dateOfBirth = dateOfBirth.slice(0, 4) + "-" + dateOfBirth.slice(5, 7) + "-" + dateOfBirth.slice(8, 10);

                if (!name || !email || !password) {
                  Alert.alert("Incomplete Information", "Please complete all the fields.");
                  return;
                }

                try {
                  const customerData = await FillYourProfileAPI.registerCustomer({
                    name,
                    email,
                    password,
                    phone: phoneNumber,
                    dateOfBirth,
                    gender
                  });

                  customer.id = customerData;
                  customer.email = email;
                  customer.name = name;
                  customer.phone = phoneNumber;
                  customer.verified = true;

                  Alert.alert("Success", "Profile created successfully!");
                  navigation.navigate("Main");

                } catch (error) {
                  Alert.alert("Error", "An error occurred while processing your request.");
                }
              }}

          />
        </View>
      </SafeAreaView>
  );
};


export default FillYourProfile