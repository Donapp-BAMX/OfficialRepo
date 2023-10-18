import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Button } from 'react-native-elements';
import { getCurrentUser, getTasks, updateTask, updateTaskAssigned } from './firebase';

const LoadingScreen = () => (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FFD700" />
    </View>
  );

const TaskDetail = ({ route }) => {
    const navigation = useNavigation();
    const { anuncio, currentUser } = route.params;
    const [isAssigned, setIsAssigned] = useState(false);
    const [currentVolunteers, setCurrentVolunteers] = useState(anuncio.currentVol);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    if (isLoading) {
        return <LoadingScreen />;
    }

    useEffect(() => {
        getTasks()
           .then(() => {
            console.log("loading")
        })
            .catch((error) => {
            console.error('Error fetching user information:', error);
        })
            .finally(() => {
            setIsLoading(false);
        });
    }, [currentUser, anuncio.id]);

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleSignUp = () => {
        if (anuncio.currentVol < anuncio.volunteers && !isAssigned) {
            const newCurrentVolunteers = currentVolunteers + 1;
            setIsButtonDisabled(true);
            updateTask(anuncio.id, { currentVol: newCurrentVolunteers })
                .then(() => {
                    setCurrentVolunteers(newCurrentVolunteers);
                    setIsAssigned(true);
                    updateTaskAssigned(currentUser, true);
                    alert('Te has registrado para la tarea: ' + anuncio.title);
                })
                .catch((error) => {
                    alert('Error al registrarse en la tarea:', error);
                    setIsButtonDisabled(false);
                });
        } else {
            alert('No puedes registrarte en dos tareas o la tarea ha alcanzado el máximo de voluntarios.');
        }
    };

    const handleUnregister = () => {
        if (isAssigned) {
            const newCurrentVolunteers = currentVolunteers - 1;
            updateTask(anuncio.id, { currentVol: newCurrentVolunteers })
                .then(() => {
                    setCurrentVolunteers(newCurrentVolunteers);
                    setIsAssigned(false);
                    updateTaskAssigned(currentUser, false);
                    alert('Te has desregistrado de la tarea: ' + anuncio.title);
                })
                .catch((error) => {
                    alert('Error al desregistrarse de la tarea:', error);
                    setIsButtonDisabled(false);
                });
        } else {
            alert('No estás registrado en esta tarea o la operación está en curso.');
        }
    };

    return (
        <View style={styles.container}>
            <Card containerStyle={styles.card}>
                <Card.Title style={styles.title}>{anuncio.title}</Card.Title>
                <Card.Divider />
                <Text style={styles.description}>{anuncio.description} {'\n'}</Text>
                <Text style={styles.description}>Voluntarios Requeridos: {anuncio.volunteers}           Voluntarios Enrrolados: {currentVolunteers} {'\n'}</Text>
                <Button 
                    title="Asignarse" 
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonTitle}
                    onPress={handleSignUp} 
                    disabled={isAssigned} 
                />
                <Button 
                    title="Volver" 
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonTitle}
                    onPress={handleBackPress} 
                />
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        card: {
          width: '80%',
          borderRadius: 10,
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          color: 'black',
        },
        description: {
          fontSize: 18,
          marginTop: 10,
          color: 'black',
          textAlign: 'center',
        },
        button: {
          backgroundColor: 'yellow',
          marginTop: 10, // Agregamos espacio entre el texto y el botón
        },
        buttonTitle: {
          color: 'red',
        },
      });

export default TaskDetail;