import { View, Text, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList, TextInput } from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { COLORS, SIZES, FONTS, icons, appServer } from '../constants';
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


  const genders = ["MALE", "FEMALE"];

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    inputChangedHandler("gender", gender);
    setGenderDropdownVisible(false);
  };


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
                  style={[styles.inputBtn, { marginVertical: 12 }]}
                  onPress={() => setGenderDropdownVisible(true)}
              >
                <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
                  {selectedGender || "Select Gender"}
                </Text>
                <Feather name="chevron-down" size={20} color={COLORS.gray} />
              </TouchableOpacity>

              {/* Gender Dropdown Modal */}
              <Modal
                  animationType="fade"
                  transparent={true}
                  visible={genderDropdownVisible}
              >
                <TouchableWithoutFeedback onPress={() => setGenderDropdownVisible(false)}>
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                      <Text style={styles.dropdownHeader}>Select Gender</Text>
                      <FlatList
                          data={genders}
                          keyExtractor={(item) => item}
                          renderItem={({ item }) => (
                              <TouchableOpacity
                                  style={styles.dropdownItem}
                                  onPress={() => handleGenderSelect(item)}
                              >
                                <Text style={styles.dropdownItemText}>{item}</Text>
                              </TouchableOpacity>
                          )}
                      />
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

              <View style={{
                width: SIZES.width - 32
              }}>
                <TouchableOpacity
                    style={styles.inputBtn}
                    onPress={() => setOpenDatePicker(true)}>
                  <Text style={styles.dateText}>{selectedDate || "Select Date of Birth"}</Text>
                  <Feather name="calendar" size={24} color={COLORS.gray} />
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        </View>
        <DatePickerModal
            open={openDatePicker}
            startDate={getFormatedDate(new Date('1900/01/01'), 'YYYY/MM/DD')} // Earliest selectable date
            selectedDate={selectedDate}
            onClose={() => setOpenDatePicker(false)}
            onChangeStartDate={(date) => {
              const today = new Date();
              const selected = new Date(date);

              if (selected <= today) {
                handleDateChange(date); // Valid date
              } else {
                Alert.alert("Invalid Date", "You cannot select a future date."); // Handle invalid date
              }
            }}
            maximumDate={getFormatedDate(new Date(), 'YYYY/MM/DD')} // Prevent future dates
            options={{
              textHeaderColor: COLORS.primary,
              textSecondaryColor: COLORS.gray,
              mainColor: COLORS.primary,
              textDisabledColor: COLORS.lightGray, // Style for disabled dates
            }}
            mode="calendar" // Ensure it's in calendar mode
            customDatesStyles={(date) => {
              const today = new Date();
              const selectedDate = new Date(date);

              if (selectedDate > today) {
                return {
                  textStyle: { color: COLORS.lightGray }, // Grey out future dates
                  disabled: true, // Prevent future dates from being selectable
                };
              }
              return {};
            }}
        />





        {RenderAreasCodesModal()}
        <View style={styles.bottomContainer}>
          <Button
              title="Continue"
              filled
              style={styles.continueButton}
              onPress={async () => {
                if (true) {
                  const { name, email, password, dateOfBirth, gender } = formState.inputValues;
                  console.log(name, email, password, dateOfBirth, gender);
                  navigation.navigate("Main");
                }
                const { name, email, password, dateOfBirth, gender } = formState.inputValues;
                const phone = phoneNumber;
                if (!name || !email || !password) {
                  Alert.alert("Incomplete Information", "Please complete all the fields.");
                  return;
                }

                try {
                  const addCustomerResponse = await fetch(`https://${appServer.serverName}/customers/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      name,
                      email,
                      password,
                      phone,
                      dateOfBirth,
                      gender
                    }),
                  });

                  if (addCustomerResponse.ok) {

                    customer.email = email;
                    customer.name = name;
                    customer.phone = phoneNumber;
                    customer.verified = true;

                    Alert.alert("Success", "Profile created successfully!");
                    navigation.navigate("Main");
                  } else {
                    Alert.alert("Error", "Failed to create profile. Please try again.");
                  }
                } catch (error) {
                  Alert.alert("Error", "An error occurred while processing your request.");
                }
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
    padding: 16,
    backgroundColor: COLORS.white
  },
  avatarContainer: {
    marginVertical: 12,
    alignItems: "center",
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  avatar: {
    height: 130,
    width: 130,
    borderRadius: 65,
  },
  pickImage: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: COLORS.greyscale500,
    borderWidth: .4,
    borderRadius: 12,
    height: 52,
    width: SIZES.width - 32,
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: COLORS.greyscale500,
  },
  downIcon: {
    width: 10,
    height: 10,
    tintColor: "#111"
  },
  selectFlagContainer: {
    width: 90,
    height: 50,
    marginHorizontal: 5,
    flexDirection: "row",
  },
  flagIcon: {
    width: 30,
    height: 30
  },
  input: {
    flex: 1,
    marginVertical: 10,
    height: 40,
    fontSize: 14,
    color: "#111"
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.greyscale500,
    height: 52,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "space-between",
    marginTop: 4,
    backgroundColor: COLORS.greyscale500,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bottomContainer: {
    position: "absolute",
    bottom: 32,
    right: 16,
    left: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    width: SIZES.width - 32,
    alignItems: "center"
  },
  continueButton: {
    width: (SIZES.width - 32) - 8,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary
  },
  closeBtn: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    position: "absolute",
    right: 16,
    top: 32,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android shadow
    alignItems: 'center',
  },

  dropdownHeader: {
    marginBottom: 16,
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '600',
  },

  dropdownItem: {
    width: '100%',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    alignItems: 'center',
  },

  dropdownItemText: {
    fontSize: 16,
    color: COLORS.black,
  },

  genderOption: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
    marginRight: 8,
  },
  genderText: {
    fontSize: 16,
    color: COLORS.black,
  },
  label: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 4,
  },

  selectedDropdownItem: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 20,
  },

  selectedDropdownText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },

})

export default FillYourProfile