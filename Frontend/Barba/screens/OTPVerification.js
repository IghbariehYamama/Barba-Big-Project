import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { appServer, COLORS } from '../constants';
import { OtpInput } from 'react-native-otp-entry';
import Button from '../components/Button';
import { customer } from '../data';

const isTestMode = true;

const OTPVerification = ({ route, navigation }) => {
  const [time, setTime] = useState(55);
  const [codeEnter, setCodeEnter] = useState('');
  const [showResendButton, setShowResendButton] = useState(false);
  const { phoneNumber, login } = route.params;

  // Timer useEffect
  useEffect(() => {
    if (time > 0) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setShowResendButton(true);
    }
  }, [time]);

  // Handle verification
  const handleVerification = async () => {
    try {
      if (login) {

        // Login verification
        const loginCustomer = await fetch(`https://${appServer.serverName}/customers/signIn/phone/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phoneNumber: phoneNumber, code: codeEnter }),
        });

        if (loginCustomer.ok) {
          const customerData = await loginCustomer.json();
          customer.id = customerData.id;
          customer.email = customerData.email;
          customer.name = customerData.name;
          customer.phone = phoneNumber;
          customer.gender = customerData.gender;
          customer.dateOfBirth = customerData.dateOfBirth;
          customer.verified = true;
          navigation.navigate('Main');
        } else {
          Alert.alert('Error', 'Failed to verify. Please try again.');
        }
        navigation.navigate('Main');
      } else {
        // Signup verification
        const checkResponse = await fetch(`https://${appServer.serverName}/customers/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phoneNumber: phoneNumber, code: codeEnter }),
        });

        if (!checkResponse.ok) {
          Alert.alert('Expired/Invalid Code', 'Invalid or Expired Code, Please Try Again');
        } else {
          navigation.navigate('FillYourProfile', { phoneNumber: phoneNumber });
        }
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  // Resend OTP Code
  const handleResendCode = async () => {
    try {
      const resendResponse = await fetch(`https://${appServer.serverName}/customers/signIn/phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phoneNumber }),
      });
      if (resendResponse.ok) {
        Alert.alert('Success', 'A new verification code has been sent.');
        setTime(55); // Reset timer
        setShowResendButton(false); // Hide the button
      } else {
        Alert.alert('Error', 'Failed to resend the code. Please try again.');
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
      <SafeAreaView style={[styles.area, { backgroundColor: COLORS.white }]}>
        <View style={[styles.container, { backgroundColor: COLORS.white }]}>
          <Header title="Please Enter Code" />
          <ScrollView>
            <Text style={[styles.title, { color: COLORS.black }]}>
              Code has been sent to {phoneNumber.slice(0, 2) + '******' + phoneNumber.slice(8, 10)}
            </Text>

            <OtpInput
                numberOfDigits={4}
                onTextChange={(text) => setCodeEnter(text)}
                focusColor={COLORS.primary}
                focusStickBlinkingDuration={500}
                theme={{
                  pinCodeContainerStyle: {
                    backgroundColor: COLORS.secondaryWhite,
                    borderColor: COLORS.secondaryWhite,
                    borderWidth: 0.4,
                    borderRadius: 10,
                    height: 58,
                    width: 58,
                  },
                  pinCodeTextStyle: {
                    color: COLORS.black,
                  },
                }}
            />

            {/* Timer or Resend Button */}
            {showResendButton ? (
                <TouchableOpacity onPress={handleResendCode} style={styles.resendButton}>
                  <Text style={styles.resendText}>Resend Code</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.codeContainer}>
                  <Text style={[styles.code, { color: COLORS.greyscale900 }]}>Resend code in</Text>
                  <Text style={styles.time}>{`  ${time}  `}</Text>
                  <Text style={[styles.code, { color: COLORS.greyscale900 }]}>s</Text>
                </View>
            )}
          </ScrollView>

          <Button title="Verify" filled style={styles.button} onPress={handleVerification} />
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 18,
    fontFamily: 'medium',
    color: COLORS.greyscale900,
    textAlign: 'center',
    marginVertical: 54,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    justifyContent: 'center',
  },
  code: {
    fontSize: 18,
    fontFamily: 'medium',
    color: COLORS.greyscale900,
    textAlign: 'center',
  },
  time: {
    fontFamily: 'medium',
    fontSize: 18,
    color: COLORS.primary,
  },
  button: {
    borderRadius: 32,
  },
  resendButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 16,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
});

export default OTPVerification;
