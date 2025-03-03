import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { restaurants } from '../assets/data/home';
import { Link } from 'expo-router';
import Colors from '../constants/Colors';
import Animated, { FadeIn, FadeOut, SlideInLeft, SlideOutRight } from 'react-native-reanimated';

const Restaurants = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}>
      {restaurants.map((restaurant, index) => (
        <Link href={'/details'} key={index} asChild>
          <TouchableOpacity>
            <Animated.View 
              style={styles.categoryCard}
              entering={FadeIn.delay(index * 100)}
              exiting={FadeOut}
            >
              <Animated.Image 
                source={restaurant.img} 
                style={styles.image}
                entering={SlideInLeft.delay(index * 100)}
                exiting={SlideOutRight}
              />
              <Animated.View 
                style={styles.categoryBox}
                entering={FadeIn.delay(index * 100 + 200)}
                exiting={FadeOut}
              >
                <Text style={styles.categoryText}>{restaurant.name}</Text>
                <Text style={{ color: Colors.green }}>
                  {restaurant.rating} {restaurant.ratings}
                </Text>
                <Text style={{ color: Colors.medium }}>{restaurant.distance}</Text>
              </Animated.View>
            </Animated.View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: 300,
    height: 250,
    backgroundColor: '#fff',
    marginEnd: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
  },
  categoryText: {
    paddingVertical: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  image: {
    flex: 5,
    width: undefined,
    height: undefined,
    borderRadius: 4,
  },
  categoryBox: {
    flex: 2,
    padding: 10,
  },
});

export default Restaurants;