import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Target position for cart icon (top right area)
const CART_TARGET_X = SCREEN_WIDTH - 70;
const CART_TARGET_Y = 60;

interface FlyingItem {
  id: string;
  image: any;
  startX: number;
  startY: number;
}

interface CartAnimationContextType {
  triggerFlyToCart: (image: any, startX: number, startY: number) => void;
}

const CartAnimationContext = createContext<CartAnimationContextType | null>(null);

export const useCartAnimation = () => {
  const context = useContext(CartAnimationContext);
  if (!context) {
    throw new Error('useCartAnimation must be used within CartAnimationProvider');
  }
  return context;
};

export const CartAnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const itemCounter = useRef(0);

  const triggerFlyToCart = useCallback((image: any, startX: number, startY: number) => {
    const id = `flying-${itemCounter.current++}`;
    setFlyingItems(prev => [...prev, { id, image, startX, startY }]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setFlyingItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return (
    <CartAnimationContext.Provider value={{ triggerFlyToCart }}>
      {children}
      <View style={styles.overlay} pointerEvents="none">
        {flyingItems.map(item => (
          <FlyingImage
            key={item.id}
            image={item.image}
            startX={item.startX}
            startY={item.startY}
            onComplete={() => removeItem(item.id)}
          />
        ))}
      </View>
    </CartAnimationContext.Provider>
  );
};

interface FlyingImageProps {
  image: any;
  startX: number;
  startY: number;
  onComplete: () => void;
}

const FlyingImage: React.FC<FlyingImageProps> = ({ image, startX, startY, onComplete }) => {
  const translateX = useSharedValue(startX);
  const translateY = useSharedValue(startY);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const rotate = useSharedValue(0);

  React.useEffect(() => {
    // Animate to cart position with curve
    translateX.value = withTiming(CART_TARGET_X, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });

    translateY.value = withTiming(CART_TARGET_Y, {
      duration: 600,
      easing: Easing.in(Easing.cubic),
    });

    scale.value = withTiming(0.3, {
      duration: 600,
      easing: Easing.out(Easing.quad),
    });

    rotate.value = withTiming(360, {
      duration: 600,
    });

    opacity.value = withTiming(0, {
      duration: 600,
    }, () => {
      runOnJS(onComplete)();
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.flyingItem, animatedStyle]}>
      <Image source={image} style={styles.flyingImage} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 9999,
  },
  flyingItem: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  flyingImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
});

export default CartAnimationProvider;
