import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator, ScrollView, TouchableOpacity, Image } from 'react-native';
import { logoutUser, getUserInformation, updateVolunteerStatus } from './firebase';
import { AuthContext } from './authContext';
import VolunteerTasks from './volunteerTasks';

const LoadingScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#FFD700" />
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
      updateVolunteerStatus(currentUser, true)
        .then(() => {
          setIsVolunteer(true);
        })
        .catch((error) => {
          console.error('Error al registrarse como voluntario:', error);
        });
    } else {
      Alert.alert('Confirmación', '¿Quieres dejar de ser voluntario?', [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: () => {
            updateVolunteerStatus(currentUser, false)
              .then(() => {
                setIsVolunteer(false);
              })
              .catch((error) => {
                console.error('Error al dejar de ser voluntario:', error);
              });
          },
        },
      ]);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!isVolunteer && (
        <View>
          <Text>
            ¡Únetenos!
          </Text>
          <Text>
            {/* ... (tu contenido actual) ... */}
          </Text>
        </View>
      )}
      {isVolunteer && (
        <View>
          <Text style={styles.anuncioTitle}>{'\n'}¡Eres un voluntario!{'\n'}</Text>
          <VolunteerTasks currentUser={currentUser} />
        </View>
      )}
      <View>
        <TouchableOpacity style={styles.customButton} onPress={handleRegisterVolunteer}>
          <Text style={styles.buttonText}>
            {isVolunteer ? 'Dejar de ser voluntario' : 'Quiero ser voluntario'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: 'linear-gradient(to bottom, red, yellow)', // Degradado de rojo a amarillo
  },
  createAdButton: {
    position: 'absolute',
    bottom: 10,
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
  inputContainer: {
    width: '80%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  inputField: {
    width: '100%', // Centra el campo de entrada
  },
  saveButton: {
    backgroundColor: '#FFD700', // Baja el tono de amarillo
    borderRadius: 25, // Añade redondez a los botones
    marginTop: 10, // Crea profundidad
  },
  saveButtonText: {
    color: 'black',
  },
  cancelButton: {
    backgroundColor: '#FFD700', // Baja el tono de amarillo
    borderRadius: 25, // Añade redondez a los botones
    marginTop: 10, // Crea profundidad
  },
  cancelButtonText: {
    color: 'black',
  },
  anuncioItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 10,
  },
  anuncioTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center', // Agrega esta línea
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  customButton: {
    backgroundColor: '#FFD700',
    borderRadius: 25,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
});

export default VoluntarioSection;
