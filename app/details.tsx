import { View, Text, StyleSheet, Image, TouchableOpacity, SectionList } from 'react-native';
import React, { useState, useEffect } from 'react';
import ParallaxScrollView from '../Components/ParallaxScrollView';
import Colors from '../constants/Colors';
import { restaurant } from '../assets/data/restaurant';
import { Link, useNavigation } from 'expo-router';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import useBasketStore from '../store/basketStore';
import { SafeAreaView } from 'react-native-safe-area-context';

const Details = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const { items, total } = useBasketStore();

  // Animated value for the shine effect
  const shineAnimation = useSharedValue(-1);

  useEffect(() => {
    // Animation for the shine moving from left to right
    shineAnimation.value = withRepeat(
      withTiming(2, { duration: 2000 }), // 2 seconds for one cycle
      -1, // Infinite repeat
      false
    );
  }, []);

  // Animated style for the shine effect
  const animatedShineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shineAnimation.value * 200 }], // Move the shine across the button
  }));

  return (
    <>
      <ParallaxScrollView
        backgroundColor={'#fff'}
        style={{ flex: 1 }}
        parallaxHeaderHeight={250}
        stickyHeaderHeight={100}
        renderBackground={() => <Image source={restaurant.img} style={{ height: 300, width: '100%' }} />}
        contentBackgroundColor={Colors.lightGrey}>

        {/* Container with the restaurant description */}
        <View style={styles.detailsContainer}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantDescription}>
            {restaurant.delivery} · {restaurant.tags.join(' · ')}
          </Text>
          <Text style={styles.restaurantDescription}>{restaurant.about}</Text>

          {/* List of dishes */}
          <SectionList
            contentContainerStyle={{ paddingBottom: 50 }}
            keyExtractor={(item, index) => `${item.id + index}`}
            scrollEnabled={false}
            sections={restaurant.food.map((item, index) => ({
              title: item.category,
              data: item.meals,
              index,
            }))}
            renderItem={({ item }) => (
              <Link href={{ pathname: '/(modal)/dish', params: { id: item.id } }} asChild>
                <TouchableOpacity style={styles.item}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.dish}>{item.name}</Text>
                    <Text style={styles.dishText}>{item.info}</Text>
                    <Text style={styles.dishText}>€{item.price}</Text>
                  </View>
                  <Image source={item.img} style={styles.dishImage} />
                </TouchableOpacity>
              </Link>
            )}
            renderSectionHeader={({ section: { title } }) => <Text style={styles.sectionHeader}>{title}</Text>}
          />
        </View>
      </ParallaxScrollView>

      {/* Footer with the shopping basket */}
      {items > 0 && (
        <View style={styles.footer}>
          <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#fff' }}>
            <Link href="/basket" asChild>
              <TouchableOpacity>
                {/* Button with shine animation */}
                <Animated.View style={styles.fullButton}>
                  <Text style={styles.basket}>{items}</Text>
                  <Text style={styles.footerText}>Katso tilauksesi</Text>
                  <Text style={styles.basketTotal}>€{total}</Text>

                  {/* Animated shine effect */}
                  <Animated.View style={[styles.shineEffect, animatedShineStyle]}>
                    <LinearGradient
                      colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.1)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.shineGradient}
                    />
                  </Animated.View>
                </Animated.View>
              </TouchableOpacity>
            </Link>
          </SafeAreaView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: Colors.main,
  },
  restaurantName: {
    textAlign: 'center',
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 'bold',
    margin: 16,
  },
  restaurantDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 16,
    lineHeight: 22,
    color: Colors.lightGrey,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
    margin: 16,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
  },
  dishImage: {
    height: 80,
    width: 80,
    borderRadius: 4,
  },
  dish: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dishText: {
    fontSize: 14,
    color: Colors.mediumDark,
    paddingVertical: 4,
  },
  footer: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingTop: 20,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    height: 50,
    overflow: 'hidden', // To prevent the shine effect from overflowing
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  basket: {
    color: '#fff',
    backgroundColor: Colors.main,
    fontWeight: 'bold',
    padding: 8,
    borderRadius: 2,
  },
  basketTotal: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  shineEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 100, // Width of the shine effect
  },
  shineGradient: {
    width: '100%',
    height: '100%',
  },
});

export default Details;