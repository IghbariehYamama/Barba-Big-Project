import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useRef, useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { category, myBookmarkSalons as initialBookmarkSalons } from '../data';
import RBSheet from "react-native-raw-bottom-sheet";
import Button from '../components/Button';
import BookmarkSalonCard from '../components/BookmarkSalonCard';

const MyBookmark = ({ navigation }) => {
    const refRBSheet = useRef();
    const [selectedBookmarkItem, setSelectedBookmarkItem] = useState(null);
    const [myBookmarkCourses, setMyBookmarkCourses] = useState(initialBookmarkSalons || []);


    const handleRemoveBookmark = () => {
        // Implement your logic to remove the selectedBookmarkItem from the bookmark list
        if (selectedBookmarkItem) {
            const updatedBookmarkCourses = myBookmarkCourses.filter(
                (course) => course.id !== selectedBookmarkItem.id
            );
            setMyBookmarkCourses(updatedBookmarkCourses);

            // Close the bottom sheet
            refRBSheet.current.close();
        }
    };
    /**
     * Render header
     */
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
                        My Bookmark
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
       * Render my bookmark salons
       */
    const renderMyBookmarkSalons = () => {
        const [selectedCategories, setSelectedCategories] = useState(["1"]);

        const filteredCourses = myBookmarkCourses.filter(course => selectedCategories.includes("1") || selectedCategories.includes(course.categoryId));

        // Category item
        const renderCategoryItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    backgroundColor: selectedCategories.includes(item.id) ? COLORS.primary : "transparent",
                    padding: 10,
                    marginVertical: 5,
                    borderColor: COLORS.primary,
                    borderWidth: 1.3,
                    borderRadius: 24,
                    marginRight: 12,
                }}
                onPress={() => toggleCategory(item.id)}>
                <Text style={{
                    color: selectedCategories.includes(item.id) ? COLORS.white : COLORS.primary
                }}>{item.name}</Text>
            </TouchableOpacity>
        );

        // Toggle category selection
        const toggleCategory = (categoryId) => {
            const updatedCategories = [...selectedCategories];
            const index = updatedCategories.indexOf(categoryId);

            if (index === -1) {
                updatedCategories.push(categoryId);
            } else {
                updatedCategories.splice(index, 1);
            }

            setSelectedCategories(updatedCategories);
        };

        return (
            <View style={[styles.flatContainer,{ backgroundColor: COLORS.tertiaryWhite }]}>
                <View style={[styles.categoryContainer, { backgroundColor: COLORS.tertiaryWhite }]}>
                    <FlatList
                        data={category}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={renderCategoryItem}
                    />
                </View>
                <FlatList
                    data={filteredCourses}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <BookmarkSalonCard
                                name={item.name}
                                image={item.image}
                                category={item.category}
                                rating={item.rating}
                                location={item.location}
                                distance={item.distance}
                                onPress={()=>navigation.navigate("SalonDetails")}
                                categoryId={item.categoryId}
                                bookmarkOnPress={() => {
                                    // Show the bookmark item in the bottom sheet
                                    setSelectedBookmarkItem(item);
                                    refRBSheet.current.open()
                                }}
                            />
                        )
                    }}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: COLORS.white }]}>
            <View style={[styles.container, { backgroundColor: COLORS.white }]}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderMyBookmarkSalons()}
                </ScrollView>
            </View>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={380}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,0.5)",
                    },
                    draggableIcon: {
                        backgroundColor: COLORS.greyscale300,
                    },
                    container: {
                        borderTopRightRadius: 32,
                        borderTopLeftRadius: 32,
                        height: 380,
                        backgroundColor: COLORS.white,
                        alignItems: "center",
                        width: "100%"
                    }
                }}>
                <Text style={[styles.bottomSubtitle, {
                    color: COLORS.black
                }]}>Remove from Bookmark?</Text>
                <View style={styles.separateLine} />

                <View style={[styles.selectedBookmarkContainer, 
                    { backgroundColor: COLORS.tertiaryWhite }]}>
                    <BookmarkSalonCard
                        name={selectedBookmarkItem?.name}
                        image={selectedBookmarkItem?.image}
                        category={selectedBookmarkItem?.category}
                        rating={selectedBookmarkItem?.rating}
                        location={selectedBookmarkItem?.location}
                        distance={selectedBookmarkItem?.distance}
                        onPress={() => console.log("Course Card")}
                        categoryId={selectedBookmarkItem?.categoryId}
                        containerStyles={{ 
                            backgroundColor: COLORS.white
                        }}
                    />
                </View>

                <View style={styles.bottomContainer}>
                    <Button
                        title="Cancel"
                        style={{
                            width: (SIZES.width - 32) / 2 - 8,
                            backgroundColor: COLORS.tansparentPrimary,
                            borderRadius: 32,
                            borderColor: COLORS.tansparentPrimary
                        }}
                        textColor={COLORS.primary}
                        onPress={() => refRBSheet.current.close()}
                    />
                    <Button
                        title="Yes, Remove"
                        filled
                        style={styles.removeButton}
                        onPress={handleRemoveBookmark}
                    />
                </View>
            </RBSheet>
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
        backgroundColor: COLORS.white,
        padding: 16
    },
    headerContainer: {
        flexDirection: "row",
        width: SIZES.width - 32,
        justifyContent: "space-between",
        marginBottom: 16
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
    categoryContainer: {
        marginTop: 0,
        backgroundColor: COLORS.tertiaryWhite
    },
    flatContainer: {
        backgroundColor: COLORS.tertiaryWhite
    },
    bottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 12,
        paddingHorizontal: 16,
        width: "100%"
    },
    cancelButton: {
        width: (SIZES.width - 32) / 2 - 8,
        backgroundColor: COLORS.tansparentPrimary,
        borderRadius: 32
    },
    removeButton: {
        width: (SIZES.width - 32) / 2 - 8,
        backgroundColor: COLORS.primary,
        borderRadius: 32
    },
    bottomTitle: {
        fontSize: 24,
        fontFamily: "semiBold",
        color: "red",
        textAlign: "center",
    },
    bottomSubtitle: {
        fontSize: 22,
        fontFamily: "bold",
        color: COLORS.greyscale900,
        textAlign: "center",
        marginVertical: 12
    },
    selectedBookmarkContainer: {
        marginVertical: 16,
        backgroundColor: COLORS.tertiaryWhite
    },
    separateLine: {
        width: "100%",
        height: .2,
        backgroundColor: COLORS.greyscale300,
        marginHorizontal: 16
    }
})

export default MyBookmark