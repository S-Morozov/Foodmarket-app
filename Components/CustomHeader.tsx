import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Link } from 'expo-router';
import BottomSheet from './BottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import useBasketStore from '../store/basketStore';
import useSearchStore from '../store/searchStore';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const SearchBar = () => {
  const { query, setQuery } = useSearchStore();

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchSection}>
        <View style={styles.searchField}>
          <Ionicons style={styles.searchIcon} name="search" size={20} color={Colors.medium} />
          <TextInput
            style={styles.input}
            placeholder="Ravintolat, kaupat, tuotteet"
            value={query}
            onChangeText={setQuery}
            placeholderTextColor={Colors.medium}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color={Colors.medium} />
            </TouchableOpacity>
          )}
        </View>
        <Link href={'/(modal)/filter'} asChild>
          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="options-outline" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const CustomHeader = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { items } = useBasketStore();
  const prevItems = useRef(items);

  // Pulse animation for badge
  const badgeScale = useSharedValue(1);
  const basketScale = useSharedValue(1);

  useEffect(() => {
    if (items > prevItems.current) {
      // Item added - trigger pulse animation
      badgeScale.value = withSequence(
        withSpring(1.4, { damping: 3, stiffness: 400 }),
        withSpring(1, { damping: 6, stiffness: 200 })
      );
      basketScale.value = withSequence(
        withTiming(1.15, { duration: 100 }),
        withSpring(1, { damping: 8, stiffness: 300 })
      );
    }
    prevItems.current = items;
  }, [items]);

  const animatedBadgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
  }));

  const animatedBasketStyle = useAnimatedStyle(() => ({
    transform: [{ scale: basketScale.value }],
  }));

  const openModal = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BottomSheet ref={bottomSheetRef} />

      <View style={styles.container}>
        <TouchableOpacity onPress={openModal}>
          <Image style={styles.bike} source={require('../assets/images/splash.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.titleContainer} onPress={openModal}>
          <Text style={styles.title}>Toimitus · Nyt</Text>
          <View style={styles.locationName}>
            <Text style={styles.subtitle}>Vantaa</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        <Link href="/basket" asChild>
          <TouchableOpacity style={styles.basketButton}>
            <Animated.View style={animatedBasketStyle}>
              <Ionicons name="cart-outline" size={20} color={Colors.primary} />
            </Animated.View>
            {items > 0 && (
              <Animated.View style={[styles.badge, animatedBadgeStyle]}>
                <Text style={styles.badgeText}>{items > 9 ? '9+' : items}</Text>
              </Animated.View>
            )}
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <SearchBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  bike: {
    width: 50,
    height: 50,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: Colors.medium,
  },
  locationName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  basketButton: {
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 50,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileButton: {
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 50,
  },
  searchContainer: {
    height: 60,
    backgroundColor: '#fff',
  },
  searchSection: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  searchField: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    color: Colors.mediumDark,
  },
  searchIcon: {
    paddingLeft: 10,
  },
  clearButton: {
    paddingRight: 10,
  },
  optionButton: {
    padding: 10,
    borderRadius: 50,
  },
});

export default CustomHeader;
