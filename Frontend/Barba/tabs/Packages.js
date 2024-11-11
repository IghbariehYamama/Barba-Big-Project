import { View, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import SubHeaderItem from '../components/SubHeaderItem';
import { packages } from '../data';
import PackageCard from '../components/PackageCard';
import { COLORS, SIZES } from '../constants';
import { useNavigation } from '@react-navigation/native';

const Packages = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { 
      backgroundColor: COLORS.tertiaryWhite
    }]}>
       <SubHeaderItem
          title="Packages"
          onPress={()=>navigation.navigate("SalonDetailsOurPackages")}
          navTitle="See All"
       />
       <View style={[styles.separateLine, { 
        backgroundColor: COLORS.grayscale200,
       }]} />
       <FlatList
         data={packages}
         keyExtractor={item=>item.id}
         renderItem={({ item })=>(
            <PackageCard
              image={item.image}
              name={item.name}
              description={item.description}
              price={item.price}
              onPress={()=>navigation.navigate("OurServices")}
            />
         )}
       />
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 2,
        backgroundColor: COLORS.tertiaryWhite
    },
    separateLine: {
        width: SIZES.width - 32,
        height: 1,
        backgroundColor: COLORS.grayscale200,
        marginBottom: 12
    }
})

export default Packages