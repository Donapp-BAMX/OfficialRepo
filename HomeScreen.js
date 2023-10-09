import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator  } from 'react-native';
import { logoutUser, getUserInformation } from './firebase';
import { AuthContext } from './authContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FoodRegister from './FoodRegister';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const handleLogout = () => {
    logoutUser()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pagina principal</Text>
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

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (currentUser) {
      getUserInformation(currentUser)
        .then((userData) => {
          setUserData(userData);
        })
        .catch((error) => {
          console.error('Error fetching user information:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentUser]);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>¡Bienvenido usuario!</Text>
      <Text>Si estás aquí, ¡tienes permiso para estarlo!</Text>
      <Text>Email: {userData.email}</Text>
      <Text>Date of register: {userData.registeredAt.toDate().toISOString().substring(0, 10)}</Text>
      <Text>Name: {userData.name}</Text>
      <Text>Last name: {userData.lastName}</Text>
      <Text>Bio: {userData.biography}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const VoluntarioScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pantalla de Voluntario</Text>
    </View>
  );
};

const DonacionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pantalla de Voluntario</Text>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Principal" component={HomeScreen} />
      <Tab.Screen name="Donaciones" component={FoodRegister} /> 
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
});

export default TabNavigator;
