import { View, Text, ScrollView, StyleSheet, RefreshControl, ViewStyle, TextStyle } from 'react-native';
import React, { useState, useCallback } from 'react';
import Categories from '../Components/Categories';
import { SafeAreaView } from 'react-native-safe-area-context';
import Restaurants from '../Components/Restaurants';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import PromoBanner from '../Components/PromoBanner';
import SectionHeader from '../Components/SectionHeader';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Hyvää huomenta';
  if (hour < 17) return 'Hyvää päivää';
  return 'Hyvää iltaa';
};

const Page = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      >
        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>{getGreeting()}! 👋</Text>
          <Text style={styles.subGreeting}>Mitä haluaisit tilata tänään?</Text>
        </View>

        {/* Promo Banner */}
        <PromoBanner />

        {/* Categories */}
        <SectionHeader
          title="Kategoriat"
          icon="grid-outline"
          showSeeAll={false}
        />
        <Categories />

        {/* Popular Restaurants */}
        <SectionHeader
          title="Suositut lähellä"
          icon="flame-outline"
        />
        <Restaurants />

        {/* Offers */}
        <SectionHeader
          title="Tarjoukset"
          icon="pricetag-outline"
        />
        <Restaurants />

        {/* Quick Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Ionicons name="time-outline" size={24} color={Colors.primary} />
            <Text style={styles.infoTitle}>Nopea toimitus</Text>
            <Text style={styles.infoText}>20-40 min</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="card-outline" size={24} color={Colors.secondary} />
            <Text style={styles.infoTitle}>Turvallinen maksu</Text>
            <Text style={styles.infoText}>Kortilla tai käteisellä</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create<{
  container: ViewStyle;
  scrollContent: ViewStyle;
  greetingContainer: ViewStyle;
  greeting: TextStyle;
  subGreeting: TextStyle;
  infoSection: ViewStyle;
  infoCard: ViewStyle;
  infoTitle: TextStyle;
  infoText: TextStyle;
}>({
  container: {
    top: Layout.customHeaderOffset,
    backgroundColor: Colors.background,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  greetingContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  subGreeting: {
    fontSize: 15,
    color: Colors.medium,
    marginTop: 4,
  },
  infoSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginTop: 24,
  },
  infoCard: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark,
    marginTop: 8,
  },
  infoText: {
    fontSize: 12,
    color: Colors.medium,
    marginTop: 2,
  },
});

export default Page;
