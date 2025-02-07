import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import Colors from '../constants/Colors';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import useSearchStore from '../store/searchStore';
import useFavoritesStore from '../store/favoritesStore';
import * as Haptics from 'expo-haptics';

const allRestaurants = [
  {
    id: '1',
    name: 'Vapiano',
    tags: ['pizza', 'pasta', 'italian'],
    rating: 4.5,
    reviews: '500+',
    distance: '0.7 km',
    time: '20-30',
    img: require('../assets/data/r4.jpeg'),
  },
  {
    id: '2',
    name: 'Urban Greens',
    tags: ['salad', 'vegan', 'healthy'],
    rating: 4.9,
    reviews: '300+',
    distance: '1.7 km',
    time: '15-25',
    img: require('../assets/data/r2.jpeg'),
  },
  {
    id: '3',
    name: 'El Taco',
    tags: ['mexican', 'taco', 'burrito'],
    rating: 4.5,
    reviews: '400+',
    distance: '3 km',
    time: '25-40',
    img: require('../assets/data/r3.jpeg'),
  },
];

const Restaurants = () => {
  const query = useSearchStore((state) => state.query);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const favorites = useFavoritesStore((state) => state.favorites);

  const searchLower = query.toLowerCase().trim();

  const restaurants = searchLower
    ? allRestaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(searchLower) ||
          r.tags.some((tag) => tag.includes(searchLower))
      )
    : allRestaurants;

  const handleFavorite = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleFavorite(id);
  };

  if (restaurants.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="search-outline" size={48} color={Colors.medium} />
        <Text style={styles.emptyText}>Ei tuloksia haulle "{query}"</Text>
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {restaurants.map((restaurant, index) => {
        const isFav = favorites.includes(restaurant.id);
        return (
          <Animated.View
            key={restaurant.id}
            entering={FadeInRight.delay(index * 100)}
            style={styles.cardWrapper}
          >
            <Link href="/details" asChild>
              <TouchableOpacity activeOpacity={0.9} style={styles.card}>
                <Animated.Image
                  source={restaurant.img}
                  style={styles.image}
                />
                <View style={styles.cardContent}>
                  <View style={styles.titleRow}>
                    <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
                    <View style={styles.ratingBadge}>
                      <Ionicons name="star" size={12} color="#FFB800" />
                      <Text style={styles.rating}>{restaurant.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.reviews}>{restaurant.reviews} arvostelua</Text>
                  <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                      <Ionicons name="time-outline" size={14} color={Colors.medium} />
                      <Text style={styles.infoText}>{restaurant.time} min</Text>
                    </View>
                    <View style={styles.infoDot} />
                    <View style={styles.infoItem}>
                      <Ionicons name="location-outline" size={14} color={Colors.medium} />
                      <Text style={styles.infoText}>{restaurant.distance}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => handleFavorite(restaurant.id)}
            >
              <Ionicons
                name={isFav ? 'heart' : 'heart-outline'}
                size={22}
                color={isFav ? '#FF4757' : '#fff'}
              />
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  cardWrapper: {
    position: 'relative',
  },
  emptyContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.medium,
    textAlign: 'center',
  },
  card: {
    width: 280,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 14,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark,
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.dark,
  },
  reviews: {
    fontSize: 13,
    color: Colors.medium,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.grey,
    marginHorizontal: 8,
  },
  infoText: {
    fontSize: 13,
    color: Colors.medium,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
});

export default Restaurants;
