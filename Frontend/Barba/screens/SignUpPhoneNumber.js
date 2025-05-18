import { View, Text, StyleSheet, ScrollView, Image, Alert, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, images, appServer, icons } from '../constants'
import Header from '../components/Header';
import Button from '../components/Button';
import Checkbox from 'expo-checkbox'
import Input from '../components/Input'
import { isTestMode } from '../constants/serverAPIS'

const SignUpPhoneNumber = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState(null);
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isChecked, setChecked] = useState(false);

    // error useffect
    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error]);

    // fectch codes from rescountries api
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
                    }
                });

                setAreas(areaData);
                if (areaData.length > 0) {
                    let defaultData = areaData.filter((a) => a.code == "IL");
                    if (defaultData.length > 0) {
                        setSelectedArea(defaultData[0])
                    }
                }
            })
    }, [])


    // Handle sending phone number to API
    const handleSendPhoneNumber = async () => {
        console.log("check1")
        if (isTestMode){
            navigation.navigate('FillYourProfile', { phoneNumber: phoneNumber });
        }
        else{
            console.log("check2")
            if (!phoneNumber) {
                console.log("check2")
                Alert.alert('Error', 'Please enter a valid phone number.');
                return;
            }
            console.log("check3")
            //const fullPhoneNumber = `${selectedArea.callingCode}${phoneNumber}`;
            console.log("check4")
            try {
                console.log("check5")
                // Check if phone number exists
                const checkResponse = await fetch(`https://${appServer.serverName}/customers/notExist`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ phoneNumber: phoneNumber }),
                });

                const checkResult = await checkResponse.json();
                console.log(checkResult)
                if (!checkResult) {
                    Alert.alert('Info', 'This phone number is already registered.');
                    return;
                }

                Alert.alert('Success', 'A verification code has been sent to your phone.');
                setCodeSent(true);
                navigation.navigate("OTPVerification", { phoneNumber: phoneNumber });

            } catch (err) {
                setError(err.message);
            }
        }

    };


    // Handle verifying the code
    const handleVerifyCode = async () => {
        try {
            let response = await fetch('https://your-api-endpoint.com/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber: `${selectedArea.callingCode}${phoneNumber}`, code: verificationCode }),
            });
            console.log(1);
            let result = await response.json();
            if (!response.ok || !result.success) {
                Alert.alert('Error', 'Invalid verification code.');
                return;
            }

            response = await fetch(`https://${appServer.serverName}/get-customer-according-to-phone-number`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber: fullPhoneNumber }),
            });
            result = await response.json();

            Alert.alert('Success', 'Your phone number has been verified.');
            navigation.navigate("FillYourProfile");
        } catch (err) {
            setError(err.message);
        }
    };


    // render countries codes modal
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
                            setModalVisible(false)
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
            )
        }
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
                                height: 400,
                                width: SIZES.width * 0.8,
                                backgroundColor: COLORS.primary,
                                borderRadius: 12
                            }}
                        >
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
        )
    }

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                <Header title="Sign Up"/>
                <ScrollView style={{ marginVertical: 54 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.logoContainer}>
                        <Image source={images.logo} resizeMode="contain" style={styles.logo} />
                    </View>
                    <Text style={[styles.title, { color: COLORS.black }]}>
                        {codeSent ? 'Enter the Code' : 'Enter Your Phone Number'}
                    </Text>
                    {!codeSent ? (
                        <>
                            <View style={[styles.inputContainer, { backgroundColor: COLORS.greyscale500 }]}>
                                <Input
                                    style={[styles.input, { color: COLORS.black }]}
                                    placeholder="Enter your phone number"
                                    icon={icons.phoneCall}
                                    placeholderTextColor={COLORS.gray}
                                    keyboardType="numeric"
                                    onInputChanged={(_, text) => setPhoneNumber(text)}
                                />
                            </View>
                            <Button title="Send Code" filled onPress={handleSendPhoneNumber} style={styles.button} />
                        </>
                    ) : (
                        <>
                            <TextInput
                                style={[styles.input, { color: COLORS.black, marginVertical: 16 }]}
                                placeholder="Enter the verification code"
                                placeholderTextColor={COLORS.gray}
                                keyboardType="numeric"
                                onChangeText={setVerificationCode}
                            />
                            <Button title="Verify Code" filled onPress={handleVerifyCode} style={styles.button} />
                        </>
                    )}
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
                                }]}>By continuing you accept our Privacy Policy</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {RenderAreasCodesModal()}
                <View style={styles.bottomContainer}>
                    <Text style={[styles.bottomLeft, {
                        color: COLORS.black
                    }]}>Already have an account ?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("LoginPhoneNumber")}>
                        <Text style={styles.bottomRight}>{" "}Sign In</Text>
                    </TouchableOpacity>
                </View>
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
    logo: {
        width: 100,
        height: 100,
        tintColor: COLORS.primary
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 32
    },
    title: {
        fontSize: 26,
        fontFamily: "semiBold",
        color: COLORS.black,
        textAlign: "center",
        marginBottom: 22
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    checkBoxContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 18,
    },
    checkbox: {
        marginRight: 8,
        height: 16,
        width: 16,
        borderRadius: 4,
        borderColor: COLORS.primary,
        borderWidth: 2,
    },
    privacy: {
        fontSize: 12,
        fontFamily: "regular",
        color: COLORS.black,
    },
    socialTitle: {
        fontSize: 19.25,
        fontFamily: "medium",
        color: COLORS.black,
        textAlign: "center",
        marginVertical: 26
    },
    socialBtnContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    bottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 18,
        position: "absolute",
        bottom: 12,
        right: 0,
        left: 0,
    },
    bottomLeft: {
        fontSize: 14,
        fontFamily: "regular",
        color: "black"
    },
    bottomRight: {
        fontSize: 16,
        fontFamily: "medium",
        color: COLORS.primary
    },
    button: {
        marginVertical: 6,
        width: SIZES.width - 32,
        borderRadius: 30
    },
    forgotPasswordBtnText: {
        fontSize: 16,
        fontFamily: "semiBold",
        color: COLORS.primary,
        textAlign: "center",
        marginTop: 12
    },
    inputContainer: {
        flexDirection: "row",
        borderColor: COLORS.greyscale500,
        borderWidth: .4,
        borderRadius: 6,
        height: 58,
        width: SIZES.width - 32,
        alignItems: 'center',
        marginVertical: 16,
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
    }
});

export default SignUpPhoneNumber;
