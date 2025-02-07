import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import React, { useEffect } from 'react';
import ParallaxScrollView from '../Components/ParallaxScrollView';
import Colors from '../constants/Colors';
import { Link, useRouter } from 'expo-router';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import useBasketStore from '../store/basketStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const restaurant = {
  name: 'Vapiano',
  img: require('../assets/data/r1.jpeg'),
  delivery: '10-20 min',
  tags: ['Italialainen', 'Pizza', 'Pasta', 'Salaatit'],
  about: 'Käsintehty tuore pasta, ohuet pizzat, proteiinipitoiset salaatit.',
  food: [
    {
      category: 'Ruokatarjoukset',
      meals: [
        { id: 1, name: 'Pasta Power', price: 17, info: 'Valkosipulileipä, pasta ja virvoitusjuoma', img: require('../assets/data/1.png') },
        { id: 2, name: 'Vegetariano', price: 17, info: 'Valkosipulileipä, kasvispasta ja juoma', img: require('../assets/data/2.png') },
        { id: 3, name: 'Vaps Date', price: 40, info: 'Kaksi pizzaa ja pullo viiniä', img: require('../assets/data/3.png') },
        { id: 4, name: 'Best Life', price: 80, info: 'Neljä pizzaa ja kaksi pulloa viiniä', img: require('../assets/data/4.png') },
      ],
    },
    {
      category: 'Pasta',
      meals: [
        { id: 5, name: 'Arrabbiata', price: 9.35, info: 'Tomaattikastike, chili, valkosipuli', img: require('../assets/data/5.png') },
        { id: 6, name: 'Pomodoro e Mozzarella', price: 10.75, info: 'Tomaattikastike, mozzarella', img: require('../assets/data/6.png') },
      ],
    },
    {
      category: 'Pizza',
      meals: [
        { id: 7, name: 'Salame', price: 11.35, info: 'Mausteinen makkara, tomaatti, mozzarella', img: require('../assets/data/7.png') },
        { id: 8, name: 'Margherita', price: 9.75, info: 'Tomaattikastike, mozzarella', img: require('../assets/data/8.png') },
      ],
    },
    {
      category: 'Salaatti',
      meals: [
        { id: 9, name: 'Insalata Mista Piccola', price: 5.99, info: 'Sekasalaatti, tomaatit, porkkana', img: require('../assets/data/9.png') },
        { id: 10, name: 'Insalata della Casa', price: 8.95, info: 'Suuri sekasalaatti', img: require('../assets/data/10.png') },
      ],
    },
  ],
};

const getDishById = (id: number) => {
  for (const category of restaurant.food) {
    const meal = category.meals.find((m) => m.id === id);
    if (meal) return meal;
  }
  return null;
};

export { getDishById };

const Details = () => {
  const router = useRouter();
  const { items, total } = useBasketStore();
  const shineAnimation = useSharedValue(-1);

  useEffect(() => {
    shineAnimation.value = withRepeat(withTiming(2, { duration: 2000 }), -1, false);
  }, []);

  const animatedShineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shineAnimation.value * 200 }],
  }));

  const sections = restaurant.food.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
  }));

  return (
    <>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={Colors.primary} />
      </TouchableOpacity>

      <ParallaxScrollView
        backgroundColor="#fff"
        style={styles.container}
        parallaxHeaderHeight={250}
        stickyHeaderHeight={100}
        renderBackground={() => (
          <Image source={restaurant.img} style={styles.headerImage} />
        )}
        contentBackgroundColor={Colors.lightGrey}
      >
        <View style={styles.detailsContainer}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantDescription}>
            {restaurant.delivery} · {restaurant.tags.join(' · ')}
          </Text>
          <Text style={styles.restaurantDescription}>{restaurant.about}</Text>

          <SectionList
            contentContainerStyle={styles.sectionListContent}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            sections={sections}
            renderItem={({ item }) => (
              <Link href={{ pathname: '/(modal)/dish', params: { id: item.id } }} asChild>
                <TouchableOpacity style={styles.item}>
                  <View style={styles.itemContent}>
                    <Text style={styles.dish}>{item.name}</Text>
                    <Text style={styles.dishText}>{item.info}</Text>
                    <Text style={styles.dishText}>€{item.price.toFixed(2)}</Text>
                  </View>
                  <Image source={item.img} style={styles.dishImage} />
                </TouchableOpacity>
              </Link>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
          />
        </View>
      </ParallaxScrollView>

      {items > 0 && (
        <View style={styles.footer}>
          <SafeAreaView edges={['bottom']} style={styles.safeArea}>
            <Link href="/basket" asChild>
              <TouchableOpacity>
                <Animated.View style={styles.fullButton}>
                  <Text style={styles.basket}>{items}</Text>
                  <Text style={styles.footerText}>Katso tilauksesi</Text>
                  <Text style={styles.basketTotal}>€{total.toFixed(2)}</Text>
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
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 100,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  headerImage: {
    height: 300,
    width: '100%',
  },
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
    margin: 16,
    lineHeight: 22,
    color: Colors.mediumDark,
  },
  sectionListContent: {
    paddingBottom: 50,
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
  itemContent: {
    flex: 1,
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
  safeArea: {
    backgroundColor: '#fff',
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
    overflow: 'hidden',
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
    width: 100,
  },
  shineGradient: {
    width: '100%',
    height: '100%',
  },
});

export default Details;
