import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { appServer, COLORS } from '../constants'
import { OtpInput } from "react-native-otp-entry";
import Button from "../components/Button";
import { customer } from '../data'

const isTestMode = true

const OTPVerification = ({ route, navigation }) => {
  const [time, setTime] = useState(55);
  const [codeEnter, setCodeEnter] = useState('');
  const { phoneNumber, login } = route.params;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  // handle verification
  const handleVerification = async () => {
    try {
      // login
      if(login){
        // Check if code entered is correct
        const loginCustomer = await fetch(`https://${appServer.serverName}/customers/signIn/phone/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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

          navigation.navigate("Main");
        } else {
          Alert.alert("Error", "Failed to create profile. Please try again.");
        }
      }
      // signup
      else{
        // Check if code entered is correct
        const checkResponse = await fetch(`https://${appServer.serverName}/customers/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phoneNumber: phoneNumber, code: codeEnter }),
        });

        if (!checkResponse.ok) {
          Alert.alert('Expired/Invalid Code', 'An Invalid or Expired Code, Please Try Again');
        }
        navigation.navigate("FillYourProfile", { phoneNumber: phoneNumber });
      }

    } catch (err) {
      setError(err.message);
    }
  };



  return (
    <SafeAreaView style={[styles.area, { backgroundColor: COLORS.white }]}>
      <View style={[styles.container, { backgroundColor: COLORS.white}]}>
        <Header title="Forgot Password" />
        <ScrollView>
          <Text style={[styles.title, {
            color: COLORS.black
          }]}>Code has been sent to +1 111 ******99</Text>
          <OtpInput 
              numberOfDigits={4}
              onTextChange={(text) => setCodeEnter(text)}
              focusColor={COLORS.primary}
              focusStickBlinkingDuration={500}
              //onFilled={(text) => setCodeEnter(text)}
              theme={{
                pinCodeContainerStyle: {
                  backgroundColor: COLORS.secondaryWhite,
                  borderColor: COLORS.secondaryWhite,
                  borderWidth: .4,
                  borderRadius: 10,
                  height: 58,
                  width: 58,
                },
                pinCodeTextStyle: {
                  color: COLORS.black,
                }
              }}/>
          <View style={styles.codeContainer}>
            <Text style={[styles.code, {
              color: COLORS.greyscale900
            }]}>Resend code in</Text>
            <Text style={styles.time}>{`  ${time}  `}</Text>
            <Text style={[styles.code, {
              color: COLORS.greyscale900
            }]}>s</Text>
          </View>
        </ScrollView>
        <Button
          title="Verify"
          filled
          style={styles.button}
          onPress={handleVerification}
        />
      </View>
    </SafeAreaView>
  )
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
  title: {
    fontSize: 18,
    fontFamily: "medium",
    color: COLORS.greyscale900,
    textAlign: "center",
    marginVertical: 54
  },
  OTPStyle: {
    borderRadius: 8,
    height: 58,
    width: 58,
    backgroundColor: COLORS.secondaryWhite,
    borderBottomColor: "gray",
    borderBottomWidth: .4,
    borderWidth: .4,
    borderColor: "gray"
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    justifyContent: "center"
  },
  code: {
    fontSize: 18,
    fontFamily: "medium",
    color: COLORS.greyscale900,
    textAlign: "center"
  },
  time: {
    fontFamily: "medium",
    fontSize: 18,
    color: COLORS.primary
  },
  button: {
    borderRadius: 32
  }
})

export default OTPVerification