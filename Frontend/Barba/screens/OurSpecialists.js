import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, icons } from '../constants';
import { ScrollView } from 'react-native-virtualized-view';
import { specialists } from '../data';
import SpecialistMessageCard from '../components/SpecialistMessageCard';

const OurSpecialists = ({ route, navigation }) => {
    /**
     * 
    * Render header
    */
    const employees = route.params.employees;
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
                   Our Specialists
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
    return (
        <View style={{ marginVertical: 22  }}>
            <FlatList
                  data={employees}
                  keyExtractor={item=>item.id}
                  renderItem={({ item }) => (
                    <SpecialistMessageCard
                      name={item.name}
                      position={item.position}
                      employeeId={item.id}
                    />
                  )}
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
})

export default OurSpecialists