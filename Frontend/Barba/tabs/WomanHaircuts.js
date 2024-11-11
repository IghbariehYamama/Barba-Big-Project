import { View, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import { womanHaircuts } from '../data';
import ServiceListCard from '../components/ServiceListCard';
import { COLORS } from '../constants';

const WomanHaircuts = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handlePress = (itemId) => {
    // Toggle selection status of the item
    setSelectedItems(prevSelectedItems => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter(id => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  return (
    <View style={[styles.container, {
      backgroundColor: COLORS.tertiaryWhite
    }]}>
      <FlatList
        data={womanHaircuts}
        keyExtractor={item => item.id.toString()} // Assuming id is a number, convert it to stringkeyExtractor={item=>item.id}
        renderItem={({ item }) => (
          <ServiceListCard
            id={item.id}
            name={item.name}
            image={item.image}
            price={item.price}
            numBooked={item.numBooked}
            onPress={handlePress}
            isSelected={selectedItems.includes(item.id)} // Pass isSelected prop based on whether the item is selected
          />
        )}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.tertiaryWhite
  }
})

export default WomanHaircuts