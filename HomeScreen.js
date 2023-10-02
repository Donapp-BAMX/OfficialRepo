import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { logoutUser, getUserInformation } from './firebase'; // Importa getUserInformation desde firebase.js
import { AuthContext } from './authContext'; // Asegúrate de que el contexto de autenticación se importe desde el archivo correcto

const HomeScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);

  const [email, setEmail] = useState(null);
  const [registered, setRegistered] = useState(null);

  useEffect(() => {
    if (currentUser) {
      getUserInformation(currentUser) // Pasa currentUser como argumento
        .then((userData) => {
          setEmail(userData.email);
          setRegistered(userData.registeredAt.toDate().toISOString().substring(0, 10));
        })
        .catch((error) => {
          console.error('Error fetching user information:', error);
        });
    }
  }, [currentUser]); // Agrega currentUser como dependencia para que se vuelva a cargar cuando cambie

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
      <Button title="Logout" onPress={handleLogout} />
    </View>
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

export default HomeScreen;
