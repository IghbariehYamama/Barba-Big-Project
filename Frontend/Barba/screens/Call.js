import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS, icons, images } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../ScreensStyle/CallStyle'

const Call = ({ navigation }) => {
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [isMicrophoneOff, setIsMicrophoneOff] = useState(false);

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.headerContainer}>
                    <Image
                        source={icons.arrowLeft}
                        resizeMode='contain'
                        style={[styles.arrowLeftIcon, {
                            tintColor: COLORS.greyscale900
                        }]}
                    />
                </TouchableOpacity>
                <View style={styles.userInfo}>
                    <Image
                        source={images.user1}
                        resizeMode='contain'
                        style={styles.userImg}
                    />
                    <View style={styles.view}>
                        <Text style={[styles.username, {
                            color: COLORS.greyscale900
                        }]}>The Barber Show</Text>
                        <Text style={styles.usertime}>04:38 minutes</Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['#ff7c8f', '#ff556e']}
                            style={styles.bottomBtn}>
                            <Image
                                source={icons.cancelSquare}
                                resizeMode='contain'
                                style={styles.bottomBtnIcon} />
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsCameraOff(!isCameraOff)}>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['#577cfe', '#3b64f8']}
                            style={styles.bottomBtn}>
                            <Image
                                source={isCameraOff ? icons.videoCamera2Off : icons.videoCamera}
                                resizeMode='contain'
                                style={styles.bottomBtnIcon}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsMicrophoneOff(!isMicrophoneOff)}>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['#fea72f', '#fc980b']}
                            style={styles.bottomBtn}>
                            <Image
                                source={isMicrophoneOff ? icons.noSound : icons.mediumVolume}
                                resizeMode='contain'
                                style={styles.bottomBtnIcon}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default Call