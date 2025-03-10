import { Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import Categories from '../Components/Categories';
import { SafeAreaView } from 'react-native-safe-area-context';
import Restaurants from '../Components/Restaurants';
import Colors from '../constants/Colors';

const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Categories />
        <Text style={styles.header}>Parhaat valinnat naapurustossasi</Text>
        <Restaurants />
        <Text style={styles.header}>Tarjouksia lähelläsi</Text>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 70,
    backgroundColor: Colors.main,
    flex: 1, 
    paddingBottom: 20, 
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
});

export default Page;
