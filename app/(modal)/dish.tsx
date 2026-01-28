import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { getDishById } from '../details';
import Colors from '../../constants/Colors';
import Animated, {
  FadeInLeft,
  FadeInUp,
  ZoomIn,
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import useBasketStore from '../../store/basketStore';
import { Ionicons } from '@expo/vector-icons';

const Dish = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addProduct, reduceProduct, products } = useBasketStore();
  const item = getDishById(Number(id));
  const [showAdded, setShowAdded] = useState(false);

  const cartItem = products.find((p) => p.id === Number(id));
  const quantity = cartItem?.quantity || 0;

  // Button animation
  const buttonScale = useSharedValue(1);
  const imageScale = useSharedValue(1);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  const addToCart = () => {
    if (!item) return;

    // Trigger button animation
    buttonScale.value = withSequence(
      withSpring(0.9, { damping: 10 }),
      withSpring(1, { damping: 8 })
    );

    // Trigger image pulse
    imageScale.value = withSequence(
      withSpring(1.05, { damping: 8 }),
      withSpring(1, { damping: 10 })
    );

    // Show "Added" indicator
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 1200);

    addProduct({
      id: item.id,
      name: item.name,
      price: item.price,
      info: item.info,
      img: item.img,
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const removeFromCart = () => {
    if (!item) return;
    reduceProduct({
      id: item.id,
      name: item.name,
      price: item.price,
      info: item.info,
      img: item.img,
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  if (!item) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Tuotetta ei löytynyt</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Animated.View entering={ZoomIn.duration(400).springify().damping(15)}>
          <Animated.View style={animatedImageStyle}>
            <Animated.Image
              source={item.img}
              style={styles.image}
            />
          </Animated.View>
        </Animated.View>
        {showAdded && (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={styles.addedBadge}
          >
            <Ionicons name="checkmark-circle" size={24} color="#fff" />
            <Text style={styles.addedText}>Lisätty!</Text>
          </Animated.View>
        )}
      </View>
      <View style={styles.content}>
        <Animated.Text entering={FadeInLeft.duration(400).delay(200)} style={styles.dishName}>
          {item.name}
        </Animated.Text>
        <Animated.Text entering={FadeInLeft.duration(400).delay(400)} style={styles.dishInfo}>
          {item.info}
        </Animated.Text>
      </View>

      <View style={styles.footer}>
        {quantity === 0 ? (
          <Animated.View style={animatedButtonStyle}>
            <TouchableOpacity style={styles.fullButton} onPress={addToCart}>
              <Text style={styles.footerText}>Lisää tilaukseen €{item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <View style={styles.footerWithCart}>
            <Animated.View entering={FadeInUp.duration(300)} style={styles.quantityContainer}>
              <TouchableOpacity style={styles.quantityButton} onPress={removeFromCart}>
                <Ionicons name="remove" size={24} color={Colors.primary} />
              </TouchableOpacity>

              <View style={styles.quantityTextContainer}>
                <Text style={styles.quantityText}>{quantity}</Text>
                <Text style={styles.quantityPrice}>€{(item.price * quantity).toFixed(2)}</Text>
              </View>

              <Animated.View style={animatedButtonStyle}>
                <TouchableOpacity style={styles.quantityButton} onPress={addToCart}>
                  <Ionicons name="add" size={24} color={Colors.primary} />
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(300).delay(100)}>
              <Link href="/basket" asChild>
                <TouchableOpacity style={styles.goToCartButton}>
                  <Ionicons name="cart" size={20} color="#fff" />
                  <Text style={styles.goToCartText}>Siirry ostoskoriin</Text>
                </TouchableOpacity>
              </Link>
            </Animated.View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: Colors.medium,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 300,
  },
  addedBadge: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -25 }],
    backgroundColor: Colors.green,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  addedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  dishName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dishInfo: {
    fontSize: 16,
    color: Colors.mediumDark,
    lineHeight: 24,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: Colors.grey,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primary,
    padding: 8,
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityTextContainer: {
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  quantityPrice: {
    fontSize: 14,
    color: Colors.mediumDark,
    marginTop: 2,
  },
  footerWithCart: {
    gap: 12,
  },
  goToCartButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  goToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Dish;
