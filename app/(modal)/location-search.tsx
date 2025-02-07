import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useCallback } from 'react';
import MapView from 'react-native-maps';
import Colors from '../../constants/Colors';
import { useNavigation } from 'expo-router';
import { GooglePlacesAutocomplete, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import 'react-native-get-random-values';

const INITIAL_REGION = {
  latitude: 60.1699,
  longitude: 24.9384,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

const LocationSearch = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(INITIAL_REGION);

  const handlePlaceSelect = useCallback((_data: any, details: GooglePlaceDetail | null) => {
    const point = details?.geometry?.location;
    if (!point) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLocation((prev) => ({
      ...prev,
      latitude: point.lat,
      longitude: point.lng,
    }));
  }, []);

  const handleConfirm = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search or move the map"
        fetchDetails={true}
        onPress={handlePlaceSelect}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: 'en',
        }}
        renderLeftButton={() => (
          <View style={styles.boxIcon}>
            <Ionicons name="search-outline" size={24} color={Colors.medium} />
          </View>
        )}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            backgroundColor: Colors.grey,
            paddingLeft: 35,
            borderRadius: 10,
          },
          textInputContainer: {
            padding: 8,
            backgroundColor: '#fff',
          },
        }}
      />
      <MapView showsUserLocation={true} style={styles.map} region={location} />
      <View style={styles.absoluteBox}>
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Vahvista</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  boxIcon: {
    position: 'absolute',
    left: 15,
    top: 18,
    zIndex: 1,
  },
});

export default LocationSearch;
