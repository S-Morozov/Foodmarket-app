import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Animated, { FadeInRight } from 'react-native-reanimated';

const categories = [
  { id: '1', name: 'Ravintolat', img: require('../assets/data/c1.png'), color: '#FFE5DC' },
  { id: '2', name: 'Ruoka', img: require('../assets/data/c2.png'), color: '#E5F6E5' },
  { id: '3', name: 'Tarjoukset', img: require('../assets/data/c3.png'), color: '#FFF3DC' },
  { id: '4', name: 'Nouto', img: require('../assets/data/c4.png'), color: '#E5EEFF' },
  { id: '5', name: 'HOP', img: require('../assets/data/c5.png'), color: '#F5E5FF' },
  { id: '6', name: 'Apteekki', img: require('../assets/data/c6.png'), color: '#E5F9FF' },
];

const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {categories.map((category, index) => (
        <Animated.View
          key={category.id}
          entering={FadeInRight.delay(index * 50)}
        >
          <TouchableOpacity activeOpacity={0.7}>
            <View style={[styles.categoryCard, { backgroundColor: category.color }]}>
              <Image source={category.img} style={styles.image} />
            </View>
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  categoryCard: {
    width: 72,
    height: 72,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  categoryText: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.dark,
  },
});

export default React.memo(Categories);
