import { View, Text, TouchableOpacity, Image, Switch } from 'react-native';
import React, { useState, useRef } from 'react';
import { COLORS, SIZES, icons, images } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { MaterialIcons } from '@expo/vector-icons';
import { launchImagePicker } from '../utils/ImagePickerHelper';
import SettingsItem from '../components/SettingsItem';
import RBSheet from "react-native-raw-bottom-sheet";
import Button from '../components/Button';
import { customer } from '../data'
import styles from '../ScreensStyle/ProfileStyle'

const Profile = ({ navigation }) => {
  const refRBSheet = useRef();

  /**
   * Render Header
   */
  const renderHeader = () => {
    return (
      <TouchableOpacity style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Image
            source={images.logo}
            resizeMode='contain'
            style={styles.logo}
          />
          <Text style={[styles.headerTitle, { 
            color: COLORS.greyscale900
          }]}>Profile</Text>
        </View>
        <TouchableOpacity>
          <Image
            source={icons.moreCircle}
            resizeMode='contain'
            style={[styles.headerIcon, { 
              tintColor: COLORS.greyscale900
            }]}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }
  /**
   * Render User Profile
   */
  const renderProfile = () => {
    const [image, setImage] = useState(images.user1)

    const pickImage = async () => {
      try {
        const tempUri = await launchImagePicker()

        if (!tempUri) return

        // set the image
        setImage({ uri: tempUri })
      } catch (error) { }
    };
    return (
      <View style={styles.profileContainer}>
        <View>
          <Image
            source={image}
            resizeMode='cover'
            style={styles.avatar}
          />
          <TouchableOpacity
            onPress={pickImage}
            style={styles.picContainer}>
            <MaterialIcons name="edit" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.title, { color: COLORS.greyscale900 }]}>{customer.name}</Text>
        <Text style={[styles.subtitle, { color: COLORS.greyscale900 }]}>{customer.email}</Text>
      </View>
    )
  }
  /**
   * Render Settings
   */
  const renderSettings = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
      setIsDarkMode((prev) => !prev);
    };

    return (
      <View style={styles.settingsContainer}>
        <SettingsItem
          icon={icons.userOutline}
          name="Edit Profile"
          onPress={() => navigation.navigate("EditProfile")}
        />
        <SettingsItem
          icon={icons.bell2}
          name="Notification"
          onPress={() => navigation.navigate("SettingsNotifications")}
        />
        <SettingsItem
          icon={icons.wallet2Outline}
          name="Payment"
          onPress={() => navigation.navigate("SettingsPayment")}
        />
        <SettingsItem
          icon={icons.shieldOutline}
          name="Security"
          onPress={() => navigation.navigate("SettingsSecurity")}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("SettingsLanguage")}
          style={styles.settingsItemContainer}>
          <View style={styles.leftContainer}>
            <Image
              source={icons.more}
              resizeMode='contain'
              style={[styles.settingsIcon, {
                tintColor: COLORS.greyscale900
              }]}
            />
            <Text style={[styles.settingsName, {
              color: COLORS.greyscale900
            }]}>Language & Region</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={[styles.rightLanguage, { 
              color: COLORS.greyscale900
            }]}>English (US)</Text>
            <Image
              source={icons.arrowRight}
              resizeMode='contain'
              style={[styles.settingsArrowRight, {
                tintColor: COLORS.greyscale900
              }]}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsItemContainer}>
          <View style={styles.leftContainer}>
            <Image
              source={icons.show}
              resizeMode='contain'
              style={[styles.settingsIcon, {
                tintColor: COLORS.greyscale900
              }]}
            />
            <Text style={[styles.settingsName, {
              color: COLORS.greyscale900
            }]}>Dark Mode</Text>
          </View>
          <View style={styles.rightContainer}>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              thumbColor={isDarkMode ? '#fff' : COLORS.white}
              trackColor={{ false: '#EEEEEE', true: COLORS.primary }}
              ios_backgroundColor={COLORS.white}
              style={styles.switch}
            />
          </View>
        </TouchableOpacity>
        <SettingsItem
          icon={icons.lockedComputerOutline}
          name="Privacy Policy"
          onPress={() => navigation.navigate("SettingsPrivacyPolicy")}
        />
        <SettingsItem
          icon={icons.infoCircle}
          name="Help Center"
          onPress={() => navigation.navigate("HelpCenter")}
        />
        <SettingsItem
          icon={icons.people4}
          name="Invite Friends"
          onPress={() => navigation.navigate("InviteFriends")}
        />
        <TouchableOpacity 
          onPress={() => refRBSheet.current.open()}
          style={styles.logoutContainer}>
          <View style={styles.logoutLeftContainer}>
            <Image
              source={icons.logout}
              resizeMode='contain'
              style={[styles.logoutIcon, {
                tintColor: "red"
              }]}
            />
            <Text style={[styles.logoutName, {
              color: "red"
            }]}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <SafeAreaView style={[styles.area, { backgroundColor: COLORS.white }]}>
      <View style={[styles.container, { backgroundColor: COLORS.white }]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderProfile()}
          {renderSettings()}
        </ScrollView>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={SIZES.height * .8}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          draggableIcon: {
            backgroundColor: COLORS.grayscale200,
            height: 4
          },
          container: {
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            height: 260,
            backgroundColor: COLORS.white
          }
        }}
        >
        <Text style={styles.bottomTitle}>Logout</Text>
        <View style={styles.separateLine} />
        <Text style={[styles.bottomSubtitle, { 
          color: COLORS.black
        }]}>Are you sure you want to log out?</Text>
        <View style={styles.bottomContainer}>
          <Button
            title="Cancel"
            style={{
              width: (SIZES.width - 32) / 2 - 8,
              backgroundColor: COLORS.tansparentPrimary,
              borderRadius: 32,
              borderColor: COLORS.tansparentPrimary
            }}
            textColor={COLORS.primary }
            onPress={() => refRBSheet.current.close()}
          />
          <Button
            title="Yes, Logout"
            filled
            style={styles.logoutButton}
            onPress={() => refRBSheet.current.close()}
          />
        </View>
      </RBSheet>
    </SafeAreaView>
  )
};

export default Profile