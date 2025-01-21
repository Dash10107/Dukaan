import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import styles from './searchTile.style';
import {useNavigation} from '@react-navigation/native';
const SearchTile = ({item}) => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <TouchableOpacity
        style={[styles.container, {backgroundColor: 'white'}]}
        onPress={() =>
          navigation.navigate('ProductDetails', {
            item,
          })
        }>
        <View style={styles.image}>
          <Image source={{uri: item?.images[0]?.url}} style={styles.productImage} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>{item?.title}</Text>
          {/* <Text style={styles.textTitle}>{item?.description}</Text> */}
          <Text style={styles.textSupplier}>{item?.supplier}</Text>
          <Text style={styles.textProductLocation}>
            Category: {item?.category}
          </Text>
        </View>
        <Text style={styles.textPrice}>{item?.price}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SearchTile;
