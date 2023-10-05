import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { logoutUser, getUserInformation } from './firebase';
import { AuthContext } from './authContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

const PerfilScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);

  const [email, setEmail] = useState(null);
  const [registered, setRegistered] = useState(null);
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [biography, setBio] = useState(null)

  useEffect(() => {
    if (currentUser) {
      getUserInformation(currentUser)
        .then((userData) => {
          setEmail(userData.email);
          setRegistered(userData.registeredAt.toDate().toISOString().substring(0, 10));
          setName(userData.name);
          setLastName(userData.lastName);
          setBio(userData.biography);
        })
        .catch((error) => {
          console.error('Error fetching user information:', error);
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>¡Bienvenido usuario!</Text>
      <Text>Si estás aquí, ¡tienes permiso para estarlo!</Text>
      <Text>Email: {email}</Text>
      <Text>Date of register: {registered}</Text>
      <Text>Name: {name}</Text>
      <Text>Last name: {lastName}</Text>
      <Text>Bio: {biography}</Text>
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

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Principal" component={HomeScreen} />
      <Tab.Screen name="Donacion" component={DonacionScreen} />
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
