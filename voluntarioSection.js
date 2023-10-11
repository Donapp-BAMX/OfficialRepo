import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert,ActivityIndicator } from 'react-native';
import { logoutUser, getUserInformation, updateVolunteerStatus } from './firebase'; // Asegúrate de importar las funciones necesarias desde tu módulo de Firebase.
import { AuthContext } from './authContext';

const LoadingScreen = () => (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
);

const VoluntarioSection = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      getUserInformation(currentUser)
        .then((userData) => {
          setIsVolunteer(userData.voluntario);
        })
        .catch((error) => {
          console.error('Error fetching user information:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentUser]);

  const handleRegisterVolunteer = () => {
    if (!isVolunteer) {
      // Llama a la función de Firebase para actualizar el perfil como voluntario.
      updateVolunteerStatus(currentUser, true)
        .then(() => {
          setIsVolunteer(true);
        })
        .catch((error) => {
          console.error('Error al registrarse como voluntario:', error);
        });
    } else {
      // El usuario ya es voluntario, mostrar confirmación para dejar de ser voluntario.
      Alert.alert(
        'Confirmación',
        '¿Quieres dejar de ser voluntario?',
        [
          {
            text: 'No',
            style: 'cancel', // Botón de "No" para cancelar la acción.
          },
          {
            text: 'Sí',
            onPress: () => {
              // El usuario confirma que quiere dejar de ser voluntario.
              // Llama a la función de Firebase para actualizar el perfil como no voluntario.
              updateVolunteerStatus(currentUser, false)
                .then(() => {
                  setIsVolunteer(false);
                })
                .catch((error) => {
                  console.error('Error al dejar de ser voluntario:', error);
                });
            },
          },
        ]
      );
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pantalla de Voluntario</Text>
      {!isVolunteer ? (
        <Button title="Quiero ser voluntario" onPress={handleRegisterVolunteer} />
      ) : (
        <Button title="Dejar de ser voluntario" onPress={handleRegisterVolunteer} />
      )}

      {/* Mostrar u ocultar contenido adicional basado en el estado de voluntario */}
      {isVolunteer && (
        <View>
          <Text>¡Eres un voluntario!</Text>
          {/* Agrega aquí cualquier contenido que deseas mostrar para los voluntarios */}
        </View>
      )}
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

export default VoluntarioSection;
