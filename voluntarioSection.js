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

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleRegisterOrUnregisterVolunteer = () => {
    if (isVolunteer) {
      Alert.alert('Confirmación', '¿Quieres dejar de ser voluntario?', [
        {
          text: 'Sí',
          onPress: () => {
            setIsLoading(true);
            updateVolunteerStatus(currentUser, false)
              .then(() => {
                setIsVolunteer(false);
              })
              .catch((error) => {
                console.error('Error al dejar de ser voluntario:', error);
              })        
              .finally(() => {
                setIsLoading(false);
              });
          },
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ]);
    } else {
      Alert.alert('Confirmación', '¿Quieres ser voluntario?', [
        {
          text: 'Sí',
          onPress: () => {
            setIsLoading(true);
            updateVolunteerStatus(currentUser, true)
              .then(() => {
                setIsVolunteer(true);
              })
              .catch((error) => {
                console.error('Error al registrarse como voluntario:', error);
              })
              .finally(() => {
                setIsLoading(false);
              });
          },
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {!isVolunteer && (
        <View>
          <Text style={styles.descriptionTitle}>¡Únetenos!</Text>
          <Text style={styles.descriptionText}>
            Únete a nuestro valioso equipo de voluntarios en el Banco de Medicina y marca la diferencia en la vida de aquellos que lo necesitan.
          </Text>
          <Text style={styles.descriptionText}>
            {'\n'}
            En nuestro compromiso de proporcionar acceso a medicamentos esenciales para quienes no pueden pagarlos, necesitamos personas como tú, con un corazón generoso y un deseo de contribuir al bienestar de la comunidad.
            {'\n\n'}
            Como voluntario, tendrás la oportunidad de:
          </Text>
          <Text style={styles.bulletPoint}>- Participar en la distribución de medicamentos a individuos vulnerables.</Text>
          <Text style={styles.bulletPoint}>- Colaborar en eventos de recaudación de medicamentos y recursos.</Text>
          <Text style={styles.bulletPoint}>- Compartir tu tiempo y habilidades para ayudar a quienes necesitan apoyo médico.</Text>
          <Text style={styles.descriptionText}>
            {'\n\n'}
            Cada pequeña acción puede marcar una gran diferencia en la vida de quienes enfrentan desafíos de salud. Tu dedicación y solidaridad son invaluables.
            {'\n\n'}
            ¡Únete a nosotros hoy y sé parte del cambio positivo que nuestro mundo necesita! Juntos, podemos brindar esperanza y salud a quienes más lo necesitan. ¡Te recibimos con los brazos abiertos!
          </Text>
        </View>
      )}
      {isVolunteer && (
        <View>
          <Text style={styles.anuncioTitle}>¡Eres un voluntario!{'\n'}</Text>
          <VolunteerTasks currentUser={currentUser} />
        </View>
      )}
      <TouchableOpacity
        style={styles.customButton}
        onPress={handleRegisterOrUnregisterVolunteer}
      >
        <Text style={styles.buttonText}>
          {isVolunteer ? 'Dejar de ser voluntario' : 'Quiero ser voluntario'}
        </Text>
      </TouchableOpacity>
    </View>
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