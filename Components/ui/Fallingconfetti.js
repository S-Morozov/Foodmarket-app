import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  withRepeat,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

const FallingConfetti = () => {
  const numConfetti = 200; // Количество конфетти
  const confetti = [];

  // Генерация случайных координат и анимаций для конфетти
  for (let i = 0; i < numConfetti; i++) {
    const translateX = useSharedValue(Math.random() * 300 - 150); // Начальные координаты X
    const translateY = useSharedValue(0); // Начальная позиция Y
    const rotate = useSharedValue(Math.random() * 360); // Вращение
    const opacity = useSharedValue(1); // Прозрачность
    const scale = useSharedValue(Math.random() * 0.6 + 0.5); // Случайный размер
    const colors = ['#FF6347', '#FFD700', '#32CD32', '#00BFFF', '#FF1493']; // Цвета

    // Анимация движения конфетти снизу вверх
    useEffect(() => {
      translateY.value = withRepeat(
        withTiming(-300, { duration: 1000, easing: Easing.inOut(Easing.ease) }), // Двигается вверх
        1,
        false
      );

      // Падение конфетти вниз
      translateY.value = withRepeat(
        withTiming(600, { duration: 1500, easing: Easing.inOut(Easing.ease) }), // Падение вниз
        1,
        false
      );

      rotate.value = withRepeat(
        withTiming(360, { duration: 2000, easing: Easing.linear }),
        -1,
        false
      );

      opacity.value = withRepeat(
        withTiming(0, { duration: 1500, easing: Easing.ease }),
        1,
        false
      );
    }, []);

    const confettiStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    }));

    confetti.push(
      <Animated.View
        key={i}
        style={[
          styles.confetti,
          confettiStyle,
          { left: Math.random() * 300, width: 10 + Math.random() * 15, height: 10 + Math.random() * 15, backgroundColor: colors[Math.floor(Math.random() * colors.length)] },
        ]}
      />
    );
  }

  return <>{confetti}</>;
};

const styles = StyleSheet.create({
  confetti: {
    position: 'absolute',
    zIndex: 1000,
    borderRadius: 5,
  },
});

export default FallingConfetti;
