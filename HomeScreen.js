import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native';
import { logoutUser, getUserInformation, saveAnuncio, getAnuncios } from './firebase'; // Importa getAnuncios
import { AuthContext } from './authContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DonationView from './DonationScreen'
import Anuncios from './anunciosSection';
import VoluntarioSection from './voluntarioSection';
import PerfilSection from './PerfilSection';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <Anuncios currentUser={currentUser} />
    </View>
  );
};

const LoadingScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

const PerfilScreen = ({ navigation }) => { 
  const { currentUser } = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <PerfilSection currentUser={currentUser} navigation={navigation} />
    </View>
  );
};

const VoluntarioScreen = () => {
  return (
    <VoluntarioSection />
  );
};

const DonationScreen = () => {
  return <DonationView />;
};



const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Principal" component={HomeScreen} />
      <Tab.Screen name="Donaciones" component={DonationScreen} /> 
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Voluntario" component={VoluntarioScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  createAdButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'blue',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAdButtonText: {
    color: 'white',
    fontSize: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  anuncioItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  anuncioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  anuncioDescription: {
    fontSize: 16,
  },
});

export default TabNavigator;
