import { Stack, useNavigation } from 'expo-router';
import CustomHeader from '../Components/CustomHeader';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, useCallback } from 'react';
import CustomSplashScreen from '@/Components/CustomSplashScreen';
import { AuthProvider } from '../context/AuthContext';
import { CartAnimationProvider } from '../context/CartAnimationContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayoutNav() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  const handleSplashEnd = useCallback(() => {
    setTimeout(() => setIsSplashFinished(true), 3000);
  }, []);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const CloseButton = useCallback(
    () => (
      <TouchableOpacity onPress={handleGoBack}>
        <Ionicons name="close-outline" size={28} color={Colors.primary} />
      </TouchableOpacity>
    ),
    [handleGoBack]
  );

  const BackButton = useCallback(
    () => (
      <TouchableOpacity onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={28} color={Colors.primary} />
      </TouchableOpacity>
    ),
    [handleGoBack]
  );

  const DishCloseButton = useCallback(
    () => (
      <TouchableOpacity style={styles.dishCloseButton} onPress={handleGoBack}>
        <Ionicons name="close-outline" size={28} color={Colors.primary} />
      </TouchableOpacity>
    ),
    [handleGoBack]
  );

  if (!isSplashFinished) {
    return (
      <GestureHandlerRootView style={styles.container}>
        <CustomSplashScreen onAnimationEnd={handleSplashEnd} />
      </GestureHandlerRootView>
    );
  }

  return (
    <AuthProvider>
      <GestureHandlerRootView style={styles.container}>
        <CartAnimationProvider>
          <BottomSheetModalProvider>
            <Stack>
            <Stack.Screen
              name="index"
              options={{
                header: () => <CustomHeader />,
              }}
            />
            <Stack.Screen
              name="details"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(modal)/filter"
              options={{
                presentation: 'modal',
                headerTitle: 'Suodata',
                headerShadowVisible: false,
                headerStyle: styles.modalHeader,
                headerLeft: CloseButton,
              }}
            />
            <Stack.Screen
              name="(modal)/location-search"
              options={{
                presentation: 'fullScreenModal',
                headerTitle: 'Valitse sijainti',
                headerLeft: CloseButton,
              }}
            />
            <Stack.Screen
              name="(modal)/dish"
              options={{
                presentation: 'modal',
                headerTitle: '',
                headerTransparent: true,
                headerLeft: DishCloseButton,
              }}
            />
            <Stack.Screen
              name="basket"
              options={{
                headerTitle: 'Ostoskori',
                headerLeft: BackButton,
              }}
            />
            </Stack>
          </BottomSheetModalProvider>
        </CartAnimationProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalHeader: {
    backgroundColor: Colors.lightGrey,
  },
  dishCloseButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
  },
});
