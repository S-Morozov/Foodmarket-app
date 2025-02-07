import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import useBasketStore from '../store/basketStore';
import Colors from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Link } from 'expo-router';
import SwipeableRow from '../Components/SwipeableRow';
import {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
  FadeIn,
  FadeInDown,
  FadeInRight,
  ZoomIn,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

const FEES = {
  service: 2.99,
  delivery: 5.99,
};

const EmptyCart = () => (
  <View style={styles.emptyContainer}>
    <Ionicons name="cart-outline" size={80} color={Colors.medium} />
    <Text style={styles.emptyTitle}>Ostoskori on tyhjä</Text>
    <Text style={styles.emptySubtitle}>Lisää tuotteita aloittaaksesi tilauksen</Text>
    <Link href="/" asChild>
      <TouchableOpacity style={styles.browseButton}>
        <Text style={styles.browseButtonText}>Selaa ravintoloita</Text>
      </TouchableOpacity>
    </Link>
  </View>
);

const OrderSuccess = () => {
  const scale = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 8, stiffness: 100 });
    rotate.value = withSequence(
      withTiming(-10, { duration: 100 }),
      withTiming(10, { duration: 100 }),
      withTiming(0, { duration: 100 })
    );
  }, []);

  const animatedCheckStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <View style={styles.orderCompleteContainer}>
      <ConfettiCannon
        count={200}
        origin={{ x: width / 2, y: -20 }}
        fallSpeed={3000}
        fadeOut
        autoStart
        explosionSpeed={400}
        colors={[Colors.primary, Colors.main, Colors.green, '#FFD700', '#FF69B4']}
      />

      {/* Lottie Success Animation */}
      <LottieView
        source={require('../assets/animations/success.json')}
        autoPlay
        loop={false}
        style={styles.lottieAnimation}
      />

      {/* Animated Check Icon */}
      <Animated.View style={[styles.checkContainer, animatedCheckStyle]}>
        <LinearGradient
          colors={[Colors.green, '#2E7D32']}
          style={styles.checkGradient}
        >
          <Ionicons name="checkmark" size={50} color="#fff" />
        </LinearGradient>
      </Animated.View>

      {/* Animated Text */}
      <Animated.Text
        entering={FadeInDown.delay(300).springify()}
        style={styles.orderCompleteTitle}
      >
        Kiitos tilauksesta!
      </Animated.Text>

      <Animated.Text
        entering={FadeInDown.delay(500).springify()}
        style={styles.orderCompleteSubtitle}
      >
        Tilauksesi on vastaanotettu ja valmistetaan pian
      </Animated.Text>

      {/* Delivery info card */}
      <Animated.View
        entering={ZoomIn.delay(700).springify()}
        style={styles.deliveryCard}
      >
        <View style={styles.deliveryRow}>
          <Ionicons name="time-outline" size={24} color={Colors.primary} />
          <Text style={styles.deliveryText}>Arvioitu toimitusaika: 25-35 min</Text>
        </View>
        <View style={styles.deliveryRow}>
          <Ionicons name="bicycle-outline" size={24} color={Colors.primary} />
          <Text style={styles.deliveryText}>Kuriiri on matkalla</Text>
        </View>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(900)}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.orderBtn}>
            <Text style={styles.footerText}>Takaisin etusivulle</Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const Basket = () => {
  const { products, total, clearCart, reduceProduct, addProduct } = useBasketStore();
  const [order, setOrder] = useState(false);

  const getFinalTotal = useCallback(() => {
    if (products.length > 0) {
      return total + FEES.service + FEES.delivery;
    }
    return total;
  }, [products.length, total]);

  const startCheckout = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setOrder(true);
    clearCart();
  }, [clearCart]);

  const handleReduceProduct = useCallback((item: typeof products[0]) => {
    reduceProduct(item);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [reduceProduct]);

  const handleAddProduct = useCallback((item: typeof products[0]) => {
    addProduct(item);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [addProduct]);

  const shineAnimation = useSharedValue(-1);

  useEffect(() => {
    shineAnimation.value = withRepeat(
      withTiming(2, { duration: 2000 }),
      -1,
      false
    );
  }, []);

  const animatedShineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shineAnimation.value * 200 }],
  }));

  const renderItem = useCallback(({ item, index }: { item: typeof products[0]; index: number }) => (
    <Animated.View entering={FadeInRight.delay(index * 80).springify().damping(14)}>
      <SwipeableRow onDelete={() => handleReduceProduct(item)}>
        <View style={styles.row}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>€{(item.price * item.quantity).toFixed(2)}</Text>
          </View>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityBtn}
              onPress={() => handleReduceProduct(item)}
            >
              <Ionicons name="remove" size={18} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityBtn}
              onPress={() => handleAddProduct(item)}
            >
              <Ionicons name="add" size={18} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </SwipeableRow>
    </Animated.View>
  ), [handleReduceProduct, handleAddProduct]);

  const keyExtractor = useCallback((item: typeof products[0]) => item.id.toString(), []);

  const ListFooterComponent = useCallback(() => (
    <View>
      <View style={styles.separator} />
      <View style={styles.totalRow}>
        <Text style={styles.total}>Välisumma</Text>
        <Text style={styles.totalValue}>€{total.toFixed(2)}</Text>
      </View>

      {products.length > 0 && (
        <>
          <View style={styles.totalRow}>
            <Text style={styles.total}>Palvelumaksu</Text>
            <Text style={styles.totalValue}>€{FEES.service.toFixed(2)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.total}>Toimitusmaksu</Text>
            <Text style={styles.totalValue}>€{FEES.delivery.toFixed(2)}</Text>
          </View>
        </>
      )}

      <View style={styles.totalRow}>
        <Text style={styles.total}>Tilaus yhteensä</Text>
        <Text style={styles.grandTotal}>€{getFinalTotal().toFixed(2)}</Text>
      </View>
    </View>
  ), [total, products.length, getFinalTotal]);

  if (order) {
    return <OrderSuccess />;
  }

  if (products.length === 0) {
    return <EmptyCart />;
  }

  return (
    <>
      <FlatList
        data={products}
        ListHeaderComponent={<Text style={styles.section}>Tuotteet</Text>}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={styles.listContent}
      />

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <TouchableOpacity onPress={startCheckout} style={styles.fullButton}>
          <Text style={styles.footerText}>Tee tilaus nyt</Text>
          <Animated.View style={[styles.shineEffect, animatedShineStyle]}>
            <LinearGradient
              colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.shineGradient}
            />
          </Animated.View>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 100,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: Colors.mediumDark,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '600',
    minWidth: 24,
    textAlign: 'center',
  },
  section: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.grey,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
  total: {
    fontSize: 18,
    color: Colors.medium,
  },
  totalValue: {
    fontSize: 18,
  },
  grandTotal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    overflow: 'hidden',
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    marginTop: 24,
  },
  shineEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 100,
    overflow: 'hidden',
  },
  shineGradient: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: Colors.mediumDark,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.medium,
    marginTop: 8,
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  browseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderCompleteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  lottieAnimation: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: '15%',
  },
  checkContainer: {
    marginBottom: 20,
  },
  checkGradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  orderCompleteTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
    color: Colors.mediumDark,
  },
  orderCompleteSubtitle: {
    fontSize: 16,
    color: Colors.medium,
    marginTop: 8,
    textAlign: 'center',
  },
  deliveryCard: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    width: '100%',
    maxWidth: 300,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  deliveryText: {
    fontSize: 15,
    color: Colors.mediumDark,
    flex: 1,
  },
});

export default Basket;
