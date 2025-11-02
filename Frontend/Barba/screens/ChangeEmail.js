import { View, Text, ScrollView, Image, Alert, TouchableWithoutFeedback, Modal } from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, icons, illustrations } from '../constants';
import Header from '../components/Header';
import { reducer } from '../utils/reducers/formReducers';
import { validateInput } from '../utils/actions/formActions';
import Input from '../components/Input';
import Checkbox from 'expo-checkbox';
import Button from '../components/Button';
import styles from '../ScreensStyle/ChangeEmailStyle';

const isTestMode = true

const initialState = {
  inputValues: {
    email: isTestMode ? '**********' : '',
    newEmail: isTestMode ? '**********' : '',
  },
  inputValidities: {
    email: false,
    newEmail: false,
  },
  formIsValid: false,
}


const ChangeEmail = ({ navigation }) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [error, setError] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue)
      dispatchFormState({ inputId, validationResult: result, inputValue })
    },
    [dispatchFormState]
  )

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error)
    }
  }, [error])

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
            <View style={[styles.modalSubContainer, { backgroundColor: COLORS.white }]}>
              <Image
                source={illustrations.passwordSuccess}
                resizeMode='contain'
                style={styles.modalIllustration}
              />
              <Text style={styles.modalTitle}>Congratulations!</Text>
              <Text style={styles.modalSubtitle}>Your account is ready to use. You will be redirected to the Home page in a few seconds..</Text>
              <Button
                title="Continue"
                filled
                onPress={() => {
                  setModalVisible(false)
                  navigation.goBack()
                }}
                style={{
                  width: "100%",
                  marginTop: 12
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header title="Change Email" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image
              source={illustrations.success}
              resizeMode='contain'
              style={styles.success}
            />
          </View>
          <Text style={[styles.title, { color: COLORS.black }]}>Reset Email</Text>
          <Input
            id="email"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['email']}
            placeholder="Old Email"
            placeholderTextColor={COLORS.black}
            icon={icons.email}
            keyboardType="email-address"
          />
          <Input
            id="newEmail"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['newEmail']}
            placeholder="New Email"
            placeholderTextColor={COLORS.black}
            icon={icons.email}
            keyboardType="email-address"
          />

          <View style={styles.checkBoxContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                color={isChecked ? COLORS.primary : "gray"}
                onValueChange={setChecked}
              />
              <View style={{ flex: 1 }}>
                <Text style={[styles.privacy, {
                  color: COLORS.black
                }]}>Remenber me</Text>
              </View>
            </View>
          </View>
          <View>
          </View>
        </ScrollView>
        <Button
          title="Continue"
          filled
          onPress={() => setModalVisible(true)}
          style={styles.button}
        />
        {renderModal()}
      </View>
    </SafeAreaView>
  )
};

export default ChangeEmail