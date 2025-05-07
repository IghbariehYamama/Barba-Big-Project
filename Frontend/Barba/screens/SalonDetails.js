import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Linking } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { COLORS, SIZES, icons, images, socials, appServer } from '../constants'
import AutoSlider from '../components/AutoSlider';
import { StatusBar } from 'expo-status-bar';
import LinkItem from '../components/LinkItem';
import SubHeaderItem from '../components/SubHeaderItem';
import { specialists } from '../data';
import SpecialistCard from '../components/SpecialistCard';
import { TabSelection } from '../tabs';
import { ScrollView } from 'react-native-virtualized-view';
import RBSheet from "react-native-raw-bottom-sheet";
import SocialIcon from '../components/SocialIcon';
import { isTestMode, serverName } from '../constants/serverAPIS'
import { SalonContext } from '../components/SalonContext'; // Adjust path

const SalonDetails = ({ route, navigation }) => {
  const refRBSheet = useRef();
  const { salonInfo, setSalonInfo } = useContext(SalonContext);
  const [sliderImages, setSliderImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // moved here so it's controlled by real data
  const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const today = new Date();
  const todayDayName = daysOfWeek[today.getDay()];

  useEffect(() => {
    if (isTestMode) {
      setSalonInfo({
        salonID: "testID",
        salonName: "testName",
        salonLocation: "testLocation",
        salonRating: "5.0",
        facebook: '',
        instagram: '',
        waze: '',
        employees: []
      });
      setIsOpen(true);
    } else {
      const fetchSalonData = async () => {
        try {
          const response = await fetch(`https://${appServer.serverName}/businesses/get/${route.params.salonID}`);
          const data = await response.json();
          console.log(data);

          setSalonInfo({
            salonID: route.params.salonID,
            salonName: data.name,
            salonLocation: data.location,
            salonPhone: data.phone,
            aboutUs: data.aboutUs,
            salonRating: data.rating,
            facebook: data.facebook,
            instagram: data.instagram,
            waze: data.waze,
            employees: data.employees
          });

          if (data.workingHours && Array.isArray(data.workingHours)) {
            const todayHours = data.workingHours.find(item => item.dayOfWeek === todayDayName);
            console.log(todayDayName)
            if (todayHours) {
              const [currentHour, currentMinute] = [today.getHours(), today.getMinutes()];
              const nowInMinutes = currentHour * 60 + currentMinute;

              const [startHour, startMinute] = todayHours.startTime.split(':').map(Number);
              const [endHour, endMinute] = todayHours.endTime.split(':').map(Number);
              const startInMinutes = startHour * 60 + startMinute;
              const endInMinutes = endHour * 60 + endMinute;
              console.log("nowInMinutes: " + nowInMinutes)
              console.log("startInMinutes: " + startInMinutes)
              console.log("endInMinutes: " + endInMinutes)
              if (nowInMinutes >= startInMinutes && nowInMinutes <= endInMinutes) {
                setIsOpen(true);
              } else {
                setIsOpen(false);
              }
            } else {
              // No working hours today
              setIsOpen(false);
            }
          } else {
            console.warn("No opening hours data available.");
            setIsOpen(false);
          }

        } catch (error) {
          console.error("Error fetching salon data:", error);
        }
      };

      fetchSalonData();
    }
  }, [route.params.salonID]);



  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await fetch(`https://${appServer.serverName}/businesses/photos/${route.params.salonID}/sliders/urls`);
        const data = await response.json();
        if (Array.isArray(data)) {
          const fullUrls = data.map(path => `https://${appServer.serverName}${path}`);
          setSliderImages(fullUrls);
        } else {
          console.warn("Unexpected data format for slider images:", data);
          setSliderImages([]);
        }
      } catch (error) {
        console.error("Error fetching slider images:", error);
      }
    };

    if (salonInfo) {
      fetchSliderImages();
    }
  }, [salonInfo]);


  // Slider images
  /*const sliderImages = [
    `https://${serverName}/businesses/photos/${salonID}`
  //images.salon2,
    //images.salon3,
    //images.salon4,
    //images.salon5,
  ]*/

  /*
  * [
  "/businesses/photos/1/sliders/salon1.jpeg",
  "/businesses/photos/1/sliders/salon2.jpeg",
  "/businesses/photos/1/sliders/salon3.jpeg",
  "/businesses/photos/1/sliders/salon7.jpeg",
  "/businesses/photos/1/sliders/salon8.jpeg",
  "/businesses/photos/1/sliders/salon9.jpeg"
]
  * */



  // render header
  const renderHeader = () => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            resizeMode='contain'
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsBookmarked(!isBookmarked)}>
          <Image
            source={isBookmarked ? icons.bookmark2 : icons.bookmark2Outline}
            resizeMode='contain'
            style={styles.bookmarkIcon}
          />
        </TouchableOpacity>
      </View>
    )
  }

  // render content
  const renderContent = () => {

    return (
        <View style={styles.contentContainer}>
          <View style={styles.salonHeaderContainer}>
            <Text style={styles.salonName}>{salonInfo.salonName}</Text>
            <TouchableOpacity
                style={[styles.salonBtn, {
                  backgroundColor: isOpen ? "green" : "red"
                }]}
                onPress={() => setIsOpen(prev => !prev)} // Allow manual toggle
            >
              <Text style={styles.salonBtnText}>{isOpen ? "Open" : "Closed"}</Text>
            </TouchableOpacity>
          </View>

        <View style={styles.salonItemContainer}>
          <Image
            source={icons.location2}
            resizeMode='contain'
            style={styles.locationIcon}
          />
          <Text style={[styles.locationText, {
            color: COLORS.grayscale700,
          }]}>{salonInfo.salonLocation}</Text>
        </View>
        <View style={styles.salonItemContainer}>
          <Image
            source={icons.starMiddle}
            resizeMode='contain'
            style={styles.starMiddleIcon}
          />
          <Text style={[styles.starMiddleText, {
            marginVertical: 6,
            color: COLORS.grayscale700,
          }]}>{salonInfo.salonRating} (3,279 reviews)</Text>
        </View>

        {/* More information links */}
        <View style={styles.linkContainer}>
          {/*
          <LinkItem
            name="Website"
            icon={icons.explore}
            onPress={() => console.log("Website")}
          />
          <LinkItem
            name="Message"
            icon={icons.chat}
            onPress={() => navigation.navigate("Inbox")}
          />
          <LinkItem
            name="Call"
            icon={icons.phoneCall}
            onPress={() => navigation.navigate("Call")}
          />
          */}
          <LinkItem
              name="Facebook"
              icon={icons.facebook2}
              onPress={() => Linking.openURL('https://facebook.com/Contour.Design.Studio')}
          />
          <LinkItem
              name="Instagram"
              icon={icons.instagram}
              onPress={() => Linking.openURL('https://www.instagram.com/contourstudio?igsh=a2ttdWM2amZpM2M0')}
          />
          <LinkItem
            name="Direction"
            icon={icons.location2}
            onPress={() => Linking.openURL('https://waze.com/ul/hsv8wxyts7')}
          />
          <LinkItem
            name="Share"
            icon={icons.send2}
            onPress={() => refRBSheet.current.open()}
          />
        </View>

        <View style={[styles.separateLine, {
          backgroundColor: COLORS.grayscale200
        }]} />

        {/* Specialists information */}
        <View>
          <SubHeaderItem
            title="Our Specialists"
            navTitle="See All"
            onPress={() => navigation.navigate("OurSpecialists", { employees: salonInfo.employees })}
          />
          <FlatList
            data={salonInfo.employees}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item, index }) => (
              <SpecialistCard
                name={item.name}
                position={item.position}
                id={item.id}
                onPress={() => { console.log("Pressed") }}
              />
            )}
          />
        </View>

        <TabSelection salonID={salonInfo.salonID}/>
      </View>
    )
  }
  return (
    <View style={[styles.area,
    { backgroundColor: COLORS.white }]}>
      <StatusBar hidden />
      <AutoSlider images={sliderImages} />
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={250}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          draggableIcon: {
            backgroundColor: COLORS.grayscale200,
          },
          container: {
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            height: 250,
            backgroundColor: COLORS.white,
            alignItems: "center",
          }
        }}
      >
        <Text style={[styles.bottomTitle, {
          color: COLORS.greyscale900
        }]}>Share</Text>
        <View style={[styles.separateLine, {
          backgroundColor: COLORS.grayscale200,
          marginVertical: 12
        }]} />
        <View style={styles.socialContainer}>
          <SocialIcon
            icon={socials.whatsapp}
            name="WhatsApp"
            onPress={() => console.log("WhatsApp")}
          />
          {/*
          <SocialIcon
            icon={socials.twitter}
            name="X"
            onPress={() => console.log("Twitter")}
          />
          */}
          <SocialIcon
            icon={socials.facebook}
            name="Facebook"
            onPress={() => console.log("Facebook")}
          />
          <SocialIcon
            icon={socials.instagram}
            name="Instagram"
            onPress={() => console.log("Instagram")}
          />
          <SocialIcon
              icon={socials.wechat}
              name="Copy Link"
              onPress={() => console.log("Instagram")}
          />
        </View>
        {/*
        <View style={styles.socialContainer}>
          <SocialIcon
            icon={socials.yahoo}
            name="Yahoo"
            onPress={() => console.log("Yahoo")}
          />
          <SocialIcon
            icon={socials.titktok}
            name="Tiktok"
            onPress={() => console.log("Tiktok")}
          />
          <SocialIcon
            icon={socials.messenger}
            name="Chat"
            onPress={() => console.log("Chat")}
          />
          <SocialIcon
            icon={socials.wechat}
            name="Wechat"
            onPress={() => console.log("Wechat")}
          />
        </View>
        */}
      </RBSheet>
    </View>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  headerContainer: {
    width: SIZES.width - 32,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 32,
    zIndex: 999,
    left: 16,
    right: 16
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.white
  },
  bookmarkIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.white
  },
  contentContainer: {
    marginHorizontal: 16
  },
  salonHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12
  },
  salonName: {
    fontSize: 24,
    fontFamily: "bold",
    color: COLORS.black,
  },
  salonBtn: {
    width: 72,
    height: 30,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  salonBtnText: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.white,
  },
  salonItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    width: 14,
    height: 14,
    tintColor: COLORS.primary,
    marginRight: 8
  },
  locationText: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.grayscale700,
  },
  starMiddleIcon: {
    width: 14,
    height: 14,
    tintColor: COLORS.primary,
    marginRight: 8
  },
  starMiddleText: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.grayscale700,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12
  },
  separateLine: {
    width: SIZES.width - 32,
    height: 1,
    backgroundColor: COLORS.grayscale200
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: "semiBold",
    color: COLORS.black,
    textAlign: "center",
    marginTop: 12
  },
  socialContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    width: SIZES.width - 32
  }
})

export default SalonDetails