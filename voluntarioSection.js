import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import { logoutUser, getUserInformation, updateVolunteerStatus } from './firebase';
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
      updateVolunteerStatus(currentUser, true)
        .then(() => {
          setIsVolunteer(true);
        })
        .catch((error) => {
          console.error('Error al registrarse como voluntario:', error);
        });
    } else {
      Alert.alert(
        'Confirmación',
        '¿Quieres dejar de ser voluntario?',
        [
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
        ]
      );
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!isVolunteer && (
        <View>
          <Text style={styles.mainHeading}>¡Únetenos!</Text>
          <Text style={styles.description}>
            Únete a nuestro valioso equipo de voluntarios en el Banco de Medicina y marca la diferencia en la vida de aquellos que lo necesitan.
            {'\n\n'}
            En nuestro compromiso de proporcionar acceso a medicamentos esenciales para quienes no pueden pagarlos, necesitamos personas como tú, con un corazón generoso y un deseo de contribuir al bienestar de la comunidad.
            {'\n\n'}
            Como voluntario, tendrás la oportunidad de:
            {'\n'}
            - Participar en la distribución de medicamentos a individuos vulnerables.
            {'\n'}
            - Colaborar en eventos de recaudación de medicamentos y recursos.
            {'\n'}
            - Compartir tu tiempo y habilidades para ayudar a quienes necesitan apoyo médico.
            {'\n\n'}
            Cada pequeña acción puede marcar una gran diferencia en la vida de quienes enfrentan desafíos de salud. Tu dedicación y solidaridad son invaluables.
            {'\n\n'}
            ¡Únete a nosotros hoy y sé parte del cambio positivo que nuestro mundo necesita! Juntos, podemos brindar esperanza y salud a quienes más lo necesitan. ¡Te recibimos con los brazos abiertos!
          </Text>
        </View>
      )}
      {!isVolunteer ? (
        <TouchableOpacity style={styles.customButton} onPress={handleRegisterVolunteer}>
          <Text style={styles.buttonText}>Quiero ser voluntario</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.customButton} onPress={handleRegisterVolunteer}>
          <Text style={styles.buttonText}>Dejar de ser voluntario</Text>
        </TouchableOpacity>
      )}
      {isVolunteer && (
        <View>
          <Text>¡Eres un voluntario!</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mainHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  customButton: {
    backgroundColor: '#FFD700',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default VoluntarioSection;