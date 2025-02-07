import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import useBasketStore from '../store/basketStore';
import Colors from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Link } from 'expo-router';
import SwipeableRow from '../Components/SwipeableRow';
import { useSharedValue, withRepeat, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const Basket = () => {
  const { products, total, clearCart, reduceProduct } = useBasketStore();
  const [order, setOrder] = useState(false);
  const buttonWidth = useRef(200); // Initial button width

  const FEES = {
    service: 2.99,
    delivery: 5.99,
  };

  const startCheckout = () => {
    setOrder(true);
    clearCart();
  };

  // Shine animation (previous code remains unchanged)
  const shineAnimation = useSharedValue(-1);
  useEffect(() => {
    shineAnimation.value = withRepeat(
      withTiming(2, { duration: 2000 }), // 2 seconds per cycle
      -1, // Infinite repeat
      false
    );
  }, []);
  
  const animatedShineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shineAnimation.value * 200 }],
  }));

  // Pulsing animation for the button
  const pulseAnimation = useSharedValue(1); // Start with scale 1 (normal size)

  useEffect(() => {
    pulseAnimation.value = withRepeat(
      withTiming(1.1, { duration: 500, easing: Easing.inOut(Easing.ease) }), // Scale up to 1.1
      -1, // Infinite repeat
      true // Alternate the scaling (scale up and down)
    );
  }, []);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnimation.value }],
  }));

  return (
    <>
      {order && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fallSpeed={2500} fadeOut={true} autoStart={true} />}
      {order ? (
        <View style={{ marginTop: '50%', padding: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Kiitos tilauksesta!</Text>
          <Link href={'/'} asChild>
            <TouchableOpacity style={styles.orderBtn}>
              <Text style={styles.footerText}>Uusi tilaus</Text>
            </TouchableOpacity>
          </Link>
        </View>
      ) : (
        <>
          <FlatList
            data={products}
            ListHeaderComponent={<Text style={styles.section}>Tuotteet</Text>}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.grey }} />}
            renderItem={({ item }) => (
              <SwipeableRow onDelete={() => reduceProduct(item)}>
                <View style={styles.row}>
                  <Text style={{ color: Colors.primary, fontSize: 18 }}>{item.quantity}x</Text>
                  <Text style={{ flex: 1, fontSize: 18 }}>{item.name}</Text>
                  <Text style={{ fontSize: 18 }}>${item.price * item.quantity}</Text>
                </View>
              </SwipeableRow>
            )}
            ListFooterComponent={
              <View>
                <View style={{ height: 1, backgroundColor: Colors.grey }}></View>
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Välimaksu</Text>
                  <Text style={{ fontSize: 18 }}>€{total}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Palveluмaksu</Text>
                  <Text style={{ fontSize: 18 }}>€{FEES.service}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Toimitusmaksu</Text>
                  <Text style={{ fontSize: 18 }}>€{FEES.delivery}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Tilaus yhteensä</Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>€{(total + FEES.service + FEES.delivery).toFixed(2)}</Text>
                </View>
              </View>
            }
          />

          <View style={styles.footer}>
            <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#fff' }}>
              <TouchableOpacity
                onLayout={(event) => {
                  buttonWidth.current = event.nativeEvent.layout.width; // Update button width
                }}
                onPress={startCheckout}
                style={styles.fullButton}
              >
                <Text style={styles.footerText}>Tee tilaus nyt</Text>

                {/* Animated shine effect */}
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
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    gap: 20,
    alignItems: 'center',
  },
  section: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
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
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: 250,
    height: 50,
    justifyContent: 'center',
    marginTop: 20,
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
});

export default Basket;
