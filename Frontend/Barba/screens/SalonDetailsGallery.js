import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import { COLORS, SIZES, icons, appServer } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { SalonContext } from '../components/SalonContext'
import { agendaDayNumColor } from 'react-native-calendars/src/style'
import { SalonDetailsGalleryAPI } from '../APIs/SalonDetailsGalleryAPIs'

const numColumns = 3;
const screenWidth = SIZES.width - 48;
const itemWidth = screenWidth / numColumns;

const SalonDetailsGallery = ({ navigation }) => { 
     /**
     * Render header
     */
    const [ourGallery, setOurGallery] = useState([]);
    const { salonInfo } = useContext(SalonContext);

    useEffect(() => {
        const loadGallery = async () => {
            try {
                const images = await SalonDetailsGalleryAPI.fetchGalleryImages(salonInfo.salonID);
                setOurGallery(images);
            } catch (error) {
                setOurGallery([]);
            }
        };

        if (salonInfo) {
            loadGallery();
        }
    }, [salonInfo]);

     const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={icons.back}
                            resizeMode='contain'
                            style={[styles.backIcon, { 
                              tintColor: COLORS.greyscale900
                            }]}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { 
                      color: COLORS.greyscale900
                    }]}>
                    Our Gallery
                    </Text>
                </View>
                <TouchableOpacity>
                    <Image
                        source={icons.moreCircle}
                        resizeMode='contain'
                        style={[styles.moreIcon, { 
                          tintColor: COLORS.greyscale900
                        }]}
                    />
                </TouchableOpacity>
            </View>
        )
    }
  /**
   * Render content
   */

  const renderContent = ()=>{

    const renderItem = ({ item }) => (
        <Image source={{uri: item}} style={styles.image} />
    );

    return (
        <View style={{ marginVertical: 22 }}>
            <FlatList
                data={ourGallery}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={numColumns}
                contentContainerStyle={styles.container}
            />
        </View>
    )
  }
  return (
    <SafeAreaView style={[styles.area, { backgroundColor: COLORS.white }]}>
    <View style={[styles.container, { backgroundColor: COLORS.white }]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
            {renderContent()}
        </ScrollView>
    </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    headerContainer: {
        flexDirection: "row",
        width: SIZES.width - 32,
        justifyContent: "space-between",
        marginBottom: 0
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    backIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'bold',
        color: COLORS.black,
        marginLeft: 16
    },
    moreIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.black
    },
    image: {
        width: itemWidth,
        height: itemWidth,
        margin: 2,
        borderRadius: 16
    },
})

export default SalonDetailsGallery