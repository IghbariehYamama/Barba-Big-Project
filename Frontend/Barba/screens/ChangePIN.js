import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { COLORS } from '../constants';
import { OtpInput } from "react-native-otp-entry";
import Button from "../components/Button";
import styles from '../ScreensStyle/ChangePINStyle'

const ChangePIN = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header title="Change PIN" />
        <ScrollView>
          <Text style={[styles.title, {
            color: COLORS.greyscale900
          }]}>Change your PIN number to make your account
            more secure.</Text>
          <OtpInput
            numberOfDigits={4}
            onTextChange={(text) => console.log(text)}
            focusColor={COLORS.primary}
            focusStickBlinkingDuration={500}
            onFilled={(text) => console.log(`OTP is ${text}`)}
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: COLORS.secondaryWhite,
                borderColor: COLORS.secondaryWhite,
                borderWidth: 1,
                borderRadius: 10,
                height: 58,
                width: 58,
              },
              pinCodeTextStyle: {
                color: COLORS.black,
              }
            }} />
        </ScrollView>
        <Button
          title="Continue"
          filled
          style={styles.button}
          onPress={() => { navigation.goBack() }}
        />
      </View>
    </SafeAreaView>
  )
};

export default ChangePIN