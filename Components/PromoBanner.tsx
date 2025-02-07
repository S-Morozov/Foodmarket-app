import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const PromoBanner = () => {
  return (
    <Animated.View entering={FadeInRight.delay(200)} style={styles.container}>
      <TouchableOpacity activeOpacity={0.9}>
        <LinearGradient
          colors={['#FF6B35', '#FF8F65']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.content}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>UUSI</Text>
            </View>
            <Text style={styles.title}>Ilmainen toimitus</Text>
            <Text style={styles.subtitle}>Ensimmäisestä tilauksestasi</Text>
            <View style={styles.cta}>
              <Text style={styles.ctaText}>Tilaa nyt</Text>
              <Ionicons name="arrow-forward" size={16} color="#FF6B35" />
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="bicycle" size={80} color="rgba(255,255,255,0.3)" />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  banner: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  badge: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  badgeText: {
    color: '#FF6B35',
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginBottom: 12,
  },
  cta: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  ctaText: {
    color: '#FF6B35',
    fontWeight: '600',
    fontSize: 14,
  },
  iconContainer: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
});

export default PromoBanner;
