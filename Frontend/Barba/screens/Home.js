import { View, Text, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, icons, images, appServer } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { banners, categories, category, customer, mostPopularSalons } from '../data'
import Category from '../components/Category';
import SubHeaderItem from '../components/SubHeaderItem';
import SalonCard from '../components/SalonCard';
import { homeAPIs } from '../APIs/HomeAPIs';
import styles from '../ScreensStyle/HomeStyle'

const Home = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [salonsNearbyYourLocation, setSalonsNearbyYourLocation] = useState([]);

    // Fetch salons nearby your location from API
    useEffect(() => {
        const fetchSalons = async () => {
            const salons = await homeAPIs.fetchAllSalons();

            // 🔐 If images are private, fetch them securely
            const salonsWithImages = await Promise.all(
                salons.map(async (salon) => ({
                    ...salon,
                    imageUri: await homeAPIs.fetchProtectedSalonImage(salon.id),
                }))
            );

            setSalonsNearbyYourLocation(salonsWithImages);
        };

        fetchSalons();
    }, []);


    const getGreeting = () => {
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            return "Good Morning 🌞";
        } else if (currentHour < 18) {
            return "Good Afternoon 🌅";
        } else {
            return "Good Evening 🌙";
        }
    };

  const renderBannerItem = ({ item }) => (
    <View style={styles.bannerContainer}>
      <View style={styles.bannerTopContainer}>
        <View>
          <Text style={styles.bannerDicount}>{item.discount} OFF</Text>
          <Text style={styles.bannerDiscountName}>{item.discountName}</Text>
        </View>
        <Text style={styles.bannerDiscountNum}>{item.discount}</Text>
      </View>
      <View style={styles.bannerBottomContainer}>
        <Text style={styles.bannerBottomTitle}>{item.bottomTitle}</Text>
        <Text style={styles.bannerBottomSubtitle}>{item.bottomSubtitle}</Text>
      </View>
    </View>
  );

  const keyExtractor = (item) => item.id.toString();

  const handleEndReached = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const renderDot = (index) => {
    return (
      <View
        style={[styles.dot, index === currentIndex ? styles.activeDot : null]}
        key={index}
      />
    );
  };

  /**
   * render header
   */
  const renderHeader = ()=>{
    return (
      <View style={styles.headerContainer}>
          <View style={styles.viewLeft}>
            <Image
              source={images.user1}
              resizeMode='contain'
              style={styles.userIcon}
            />
            <View style={styles.viewNameContainer}>
               <Text style={styles.greeeting}>{getGreeting()}</Text>
               <Text style={[styles.title, { 
                color: COLORS.greyscale900
               }]}>{customer.name}</Text>
            </View>
          </View>
          <View style={styles.viewRight}>
            <TouchableOpacity
             onPress={()=>navigation.navigate("Notifications")}>
              <Image
                source={icons.notificationBell2}
                resizeMode='contain'
                style={[styles.bellIcon, { tintColor: COLORS.greyscale900 }]}
              />
            </TouchableOpacity>
            <TouchableOpacity
             onPress={()=>navigation.navigate("MyBookmark")}>
              <Image
                source={icons.bookmarkOutline}
                resizeMode='contain'
                style={[styles.bookmarkIcon, { tintColor: COLORS.greyscale900 }]}
              />
            </TouchableOpacity>
          </View>
      </View>
    )
  }
  /**
   * Render search bar
   */
  const renderSearchBar = ()=>{

    const handleInputFocus = () => {
      // Redirect to another screen
      navigation.navigate('Search');
    };

    return (
      <TouchableOpacity
        onPress={()=>navigation.navigate("Search")}
        style={[styles.searchBarContainer, { 
          backgroundColor: COLORS.secondaryWhite
          }]}>
        <TouchableOpacity>
          <Image
            source={icons.search2}
            resizeMode='contain'
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <TextInput
          placeholder='Search'
          placeholderTextColor={COLORS.gray}
          style={styles.searchInput}
          onFocus={handleInputFocus}
        />
        <TouchableOpacity>
          <Image
            source={icons.filter}
            resizeMode='contain'
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }
  /**
   * Render banner
   */
  const renderBanner = ()=>{
    return (
      <View style={styles.bannerItemContainer}>
      <FlatList
        data={banners}
        renderItem={renderBannerItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / SIZES.width
          );
          setCurrentIndex(newIndex);
        }}
      />
      <View style={styles.dotContainer}>
        {banners.map((_, index) => renderDot(index))}
      </View>
    </View>
    )
  }

  /**
   * Render categories
   */
  const renderCategories = () => {

    return (
      <View>
        <SubHeaderItem
          title="Categories"
          navTitle="See All"
          onPress={() => console.log("See all services")}
        />

        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          numColumns={4} // Render two items per row
          renderItem={({ item, index }) => (
            <Category
              name={item.name}
              icon={item.icon}
              iconColor={item.iconColor}
              backgroundColor={item.backgroundColor}
              onPress={() => navigation.navigate({ name: item.navigation })}
            />
          )}
        />
      </View>
    )
  }

  /**
   * 
   * @returns Render salons nearby your location
   */
  const renderSalonsNearbyYourLocation = () => {
    const [selectedCategories, setSelectedCategories] = useState(["1"]);

    const filteredSalons = salonsNearbyYourLocation.filter(course => selectedCategories.includes("1") || selectedCategories.includes(course.categoryId));

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
      <View>
          <SubHeaderItem
          title="All Salons"
          navTitle="See All"
          onPress={() => navigation.navigate("SalonsNearbyYourLocation")}
        />

        <FlatList
          data={category}
          keyExtractor={item=>item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={renderCategoryItem}
        />
        <View style={{ backgroundColor: COLORS.tertiaryWhite }}>
          <FlatList
            data={filteredSalons.slice(0,4)}
            keyExtractor={item=>item.id}
            renderItem={({ item })=>{
              return (
                <SalonCard
                  name={item.name}
                  image={{ uri: item.imageUri }}
                  category={item.category}
                  rating={item.rating}
                  location={item.location}
                  //distance={item.distance}
                  onPress={() => navigation.navigate("SalonDetails", { salonName: item.name, salonLocation: item.location, salonRating: item.rating, salonID: item.id })}
                  categoryId={item.categoryId} 
                />
              )
            }}
          />
        </View>
      </View>
    )
  }

  /**
   * @returns render most popular salons 
   */
  const renderMostPopularSalons = () => {
    const [selectedCategories, setSelectedCategories] = useState(["1"]);

    const filteredSalons = mostPopularSalons.filter(course => selectedCategories.includes("1") || selectedCategories.includes(course.categoryId));

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
      <View>
         <SubHeaderItem
          title="Most Popular"
          navTitle="See All"
          onPress={() => navigation.navigate("MostPopularSalons")}
        />

        <FlatList
          data={category}
          keyExtractor={item=>item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={renderCategoryItem}
        />
        <View style={{ backgroundColor: COLORS.tertiaryWhite }}>
          <FlatList
            data={filteredSalons}
            keyExtractor={item=>item.id}
            renderItem={({ item })=>{
              return (
                <SalonCard
                  name={item.name}
                  image={item.image}
                  category={item.category}
                  rating={item.rating}
                  location={item.location}
                  //distance={item.distance}
                  onPress={()=>navigation.navigate("SalonDetails")}
                  categoryId={item.categoryId} 
                />
              )
            }}
          />
        </View>
      </View>
    )
  }

  return (
   <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
        {renderSearchBar()}
        {renderBanner()}
        {renderCategories()}
        {renderSalonsNearbyYourLocation()}
        {renderMostPopularSalons()}
        </ScrollView>
      </View>
   </SafeAreaView>
  )
};


export default Home