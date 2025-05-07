import { FlatList, Image, StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import SubHeaderItem from '../components/SubHeaderItem';
import { appServer, COLORS, SIZES } from '../constants'
import { useNavigation } from '@react-navigation/native';
import { SalonContext } from '../components/SalonContext'

const numColumns = 3;
const screenWidth = SIZES.width -48;
const itemWidth = screenWidth / numColumns;

const OurGallery = () => {
    const navigation = useNavigation();
    const [ourGallery, setOurGallery] = useState([]);
    const { salonID } = useContext(SalonContext);

    useEffect(() => {
        const fetchOurGallery = async () => {
            try {
                const response = await fetch(`https://${appServer.serverName}/businesses/photos/${salonID}/gallery/urls`);
                const data = await response.json();
                console.log("data: " + data)
                console.log("salonID: " + salonID)
                if (Array.isArray(data)) {
                    const fullUrls = data.map(path => `https://${appServer.serverName}${path}`);
                    setOurGallery(fullUrls);
                } else {
                    console.warn("Unexpected data format for slider images:", data);
                    setOurGallery([]);
                }
                console.log(ourGallery)
            } catch (error) {
                console.error("Error fetching slider images:", error);
            }
        };
        if (salonID) {
            fetchOurGallery();
        }
    }, [salonID]);


    const renderItem = ({ item }) => (
        <Image source={{uri: item}} style={styles.image} />
    );

    return (
        <View style={[styles.container, { 
            backgroundColor: COLORS.tertiaryWhite,
        }]}>
            <SubHeaderItem
                title="Our Gallery"
                onPress={() =>navigation.navigate("SalonDetailsGallery")}
                navTitle="See All"
            />
            <View style={[styles.separateLine, { 
                backgroundColor: COLORS.grayscale200,
            }]} />
            <FlatList
                data={ourGallery}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={numColumns}
                contentContainerStyle={styles.container}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.tertiaryWhite,
    },
    separateLine: {
        width: SIZES.width - 32,
        height: 1,
        backgroundColor: COLORS.grayscale200,
        marginBottom: 12
    },
    image: {
        width: itemWidth,
        height: itemWidth,
        margin: 2,
        borderRadius: 16
    },
})

export default OurGallery