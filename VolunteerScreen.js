import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { setAsVolunteer, unsetAsVolunteer, checkVolunteerStatus, getUserInformation } from './firebase';
import { getAuth } from 'firebase/auth'; // Necesario para obtener el usuario actual

const VolunteerScreen = () => {
  const navigation = useNavigation();
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la pantalla de carga

  const handleJoin = async () => {
    const auth = getAuth();
    try {
      if (auth.currentUser) {
        await setAsVolunteer(auth.currentUser.uid);
        setIsVolunteer(true);
      }
    } catch (error) {
      console.error('Error al unirse como voluntario:', error);
    }
  };

  const handleLeave = async () => {
    const auth = getAuth();
    try {
      if (auth.currentUser) {
        await unsetAsVolunteer(auth.currentUser.uid);
        setIsVolunteer(false);
      }
    } catch (error) {
      console.error('Error al dejar de ser voluntario:', error);
    }
  };

  useEffect(() => {
    const checkStatus = async () => {
      const auth = getAuth();
      try {
        if (auth.currentUser) {
          const status = await checkVolunteerStatus(auth.currentUser.uid);
          setIsVolunteer(status);

          const userInfo = await getUserInformation(auth.currentUser.uid);
          setUserName(userInfo.name || 'Usuario'); // Suponiendo que los usuarios tienen un campo 'name'
        }
      } catch (error) {
        console.error('Error al verificar el estado de voluntario o al obtener información del usuario:', error);
      } finally {
        setIsLoading(false);  // Setea isLoading a false después de obtener todos los datos
      }
    };

    checkStatus();
  }, []);

  // Si isLoading es true, muestra la pantalla de carga
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isVolunteer) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.mainHeading}>{userName.trim()}, usted es voluntario</Text>
        <Text style={styles.description}>
        Gracias por haber sido volunatario!
        {'\n\n'}
        Reconsidera volver.
        </Text>
        <Button title="Dejar de ser voluntario" onPress={handleLeave} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.mainHeading}>Únete a nosotros</Text>
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
      <Button title="Unirse" onPress={handleJoin} />
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
});

export default VolunteerScreen;
