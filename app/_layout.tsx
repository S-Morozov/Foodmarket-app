import { Stack, useNavigation } from 'expo-router';
import CustomHeader from '../Components/CustomHeader';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';  // Import GestureHandlerRootView
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import CustomSplashScreen from '@/Components/CustomSplashScreen';

SplashScreen.preventAutoHideAsync();


export default function RootLayoutNav() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);


  return (
    // Wrap the whole stack in GestureHandlerRootView
    <GestureHandlerRootView style={{ flex: 1 }}>
{!isSplashFinished ? (
  <CustomSplashScreen onAnimationEnd={() => setTimeout(() => setIsSplashFinished(true), 3000)} />
) : (

      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              header: () => <CustomHeader />,
            }}
          />
          <Stack.Screen
            name="(modal)/filter"
            options={{
              presentation: 'modal',
              headerTitle: 'Filter',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: Colors.lightGrey,
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Ionicons name="close-outline" size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="(modal)/location-search"
            options={{
              presentation: 'fullScreenModal',
              headerTitle: 'Select location',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Ionicons name="close-outline" size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="(modal)/dish"
            options={{
              presentation: 'modal',
              headerTitle: '',
              headerTransparent: true,
              headerLeft: () => (
                <TouchableOpacity
                  style={{ backgroundColor: '#fff', borderRadius: 20, padding: 6 }}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Ionicons name="close-outline" size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="basket"
            options={{
              headerTitle: 'Basket',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Ionicons name="arrow-back" size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
      )}
    </GestureHandlerRootView>
  );
}
