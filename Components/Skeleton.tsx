import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';

interface SkeletonProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, borderRadius = 4, style }) => {
  const shimmerTranslate = useSharedValue(-1);

  useEffect(() => {
    shimmerTranslate.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.ease }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shimmerTranslate.value,
      [-1, 1],
      [-150, 150]
    );
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View
      style={[
        styles.skeleton,
        { width: width as any, height, borderRadius, overflow: 'hidden' },
        style,
      ]}
    >
      <Animated.View style={[styles.shimmerContainer, animatedStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.shimmerGradient}
        />
      </Animated.View>
    </View>
  );
};

export const RestaurantSkeleton = () => (
  <View style={styles.restaurantCard}>
    <Skeleton width={300} height={150} borderRadius={4} />
    <View style={styles.restaurantInfo}>
      <Skeleton width={180} height={16} style={{ marginBottom: 8 }} />
      <Skeleton width={120} height={14} style={{ marginBottom: 4 }} />
      <Skeleton width={80} height={14} />
    </View>
  </View>
);

export const CategorySkeleton = () => (
  <View style={styles.categoryCard}>
    <Skeleton width={100} height={60} borderRadius={8} />
    <Skeleton width={70} height={14} style={{ marginTop: 8 }} />
  </View>
);

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.grey,
  },
  shimmerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 150,
    height: '100%',
  },
  shimmerGradient: {
    flex: 1,
    width: 150,
  },
  restaurantCard: {
    width: 300,
    height: 250,
    backgroundColor: '#fff',
    marginEnd: 10,
    borderRadius: 4,
    overflow: 'hidden',
  },
  restaurantInfo: {
    padding: 10,
  },
  categoryCard: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    marginEnd: 10,
    borderRadius: 8,
    padding: 0,
    alignItems: 'center',
  },
});

export default Skeleton;
