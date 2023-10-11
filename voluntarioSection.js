import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { logoutUser, getUserInformation, updateVolunteerStatus, toggleVolunteerStatus } from './firebase';
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

  const confirmLeaveVolunteer = () => {
    updateVolunteerStatus(currentUser, false)
      .then(() => {
        setIsVolunteer(false);
      })
      .catch((error) => {
        console.error('Error al dejar de ser voluntario:', error);
      });
  };

  const handleRegisterVolunteer = async () => {
    if (!isVolunteer) {
      try {
        await toggleVolunteerStatus(currentUser, true);
        setIsVolunteer(true);
      } catch (error) {
        console.error("Error al registrarse como voluntario:", error);
      }
    } else {
      Alert.alert(
        "Confirmación",
        "¿Quieres dejar de ser voluntario?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Sí",
            onPress: async () => {
              try {
                await toggleVolunteerStatus(currentUser, false);
                setIsVolunteer(false);
              } catch (error) {
                console.error("Error al dejar de ser voluntario:", error);
              }
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pantalla de Voluntario</Text>
      {!isVolunteer ? (
        <Button title="Quiero ser voluntario" onPress={handleRegisterVolunteer} />
      ) : (
        <Button title="Dejar de ser voluntario" onPress={confirmLeaveVolunteer} />
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
