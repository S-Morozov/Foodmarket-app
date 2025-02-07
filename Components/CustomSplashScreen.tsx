import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { 
  FadeIn, 
  FadeOut, 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence, 
  interpolate, 
  Extrapolate, 
  runOnJS 
} from 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';

interface CustomSplashScreenProps {
  onAnimationEnd: () => void;
}

SplashScreen.preventAutoHideAsync();

const CustomSplashScreen: React.FC<CustomSplashScreenProps> = ({ onAnimationEnd }) => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    async function prepare() {
      try {
        scale.value = withRepeat(
          withSequence(
            withTiming(1.1, { duration: 1500 }), 
            withTiming(1, { duration: 1500 }) 
          ),
          -1, 
          true
        );

        rotate.value = withRepeat(
          withSequence(
            withTiming(5, { duration: 1500 }),
            withTiming(-5, { duration: 1500 })
          ),
          -1,
          true
        );

        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
        onAnimationEnd();
      }
    }

    prepare();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View
      entering={FadeIn.duration(5000)} 
      exiting={FadeOut.duration(5000).withCallback((finished) => {
        if (finished) {
          runOnJS(SplashScreen.hideAsync)();
          runOnJS(onAnimationEnd)();
        }
      })}
      style={styles.container}
    >
      <Animated.Image
        source={require('../assets/images/foodexp.png')}
        style={[styles.image, animatedStyle]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
});

export default CustomSplashScreen;
