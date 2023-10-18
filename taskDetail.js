import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Button } from 'react-native-elements';
import { AuthContext } from './authContext';
import { updateTaskAssigned, updateTask, getUserInformation } from './firebase';

const TaskDetail = ({ route }) => {
    const navigation = useNavigation();
    const { anuncio } = route.params;
    const { currentUser } = useContext(AuthContext);
    const [isAssigned, setIsAssigned] = useState(true);
    const [currentVolunteers, setCurrentVolunteers] = useState(anuncio.currentVol);

    useEffect(() => {
        if (currentUser) {
            getUserInformation(currentUser)
              .then((userData) => {
                setIsAssigned(userData.taskAssigned);
              })
              .catch((error) => {
                console.error('Error fetching user information:', error);
              })
          }
    }, [currentUser, anuncio.id]);

    const handleBackPress = () => {
        navigation.goBack();
    };
   
    const handleSignUp = () => {
        if (anuncio.currentVol < anuncio.volunteers && !isAssigned) {
            const newCurrentVolunteers = currentVolunteers + 1;
      
            // Configura isAssigned antes de llamar a updateTaskAssigned
            setIsAssigned(true);
      
            updateTask(anuncio.id, { currentVol: newCurrentVolunteers })
                .then(() => {
                    setCurrentVolunteers(newCurrentVolunteers);
      
                    // Utiliza el valor actualizado de isAssigned
                    updateTaskAssigned(currentUser, true)
                        .then(() => {
                            alert('Te has registrado para la tarea: ' + anuncio.title);
                        })
                        .catch((error) => {
                            alert('Error al actualizar la asignación', error);
                        });
                })
                .catch((error) => {
                    alert('Error al registrarse en la tarea', error);
                    // Restablece isAssigned en caso de error
                    setIsAssigned(false);
                });
        } else {
            alert('No puedes registrarte en dos tareas o la tarea ha alcanzado el máximo de voluntarios.');
        }
      };      

    const handleUnregister = () => {
        if (isAssigned) {
            const newCurrentVolunteers = currentVolunteers - 1;
      
            // Configura isAssigned antes de llamar a updateTaskAssigned
            setIsAssigned(false);
      
            updateTask(anuncio.id, { currentVol: newCurrentVolunteers })
                .then(() => {
                    setCurrentVolunteers(newCurrentVolunteers);
      
                    // Utiliza el valor actualizado de isAssigned
                    updateTaskAssigned(currentUser, false)
                        .then(() => {
                            alert('Te has dado de baja de la tarea: ' + anuncio.title);
                        })
                        .catch((error) => {
                            alert('Error al dar de baja', error);
                        });
                })
                .catch((error) => {
                    alert('Error al darse de baja en la tarea', error);
                    // Restablece isAssigned en caso de error
                    setIsAssigned(true);
                });
        } else {
            alert('No darte de baja de esta tarea.');
        }
      };   

    return (
        <View style={styles.container}>
            <Card containerStyle={styles.card}>
                <Card.Title style={styles.title}>{anuncio.title}</Card.Title>
                <Card.Divider />
                <Text style={styles.description}>{anuncio.description} {'\n'}</Text>
                <Text style={styles.description}>Voluntarios Requeridos: {anuncio.volunteers}           Voluntarios Enrrolados: {currentVolunteers} {'\n'}</Text>
                {isAssigned ? (
                <Button
                    title="Desasignarse"
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonTitle}
                    onPress={handleUnregister}
                    disabled={!isAssigned}
                />
                ) : (
                <Button
                    title="Asignarse"
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonTitle}
                    onPress={handleSignUp}
                    disabled={isAssigned}
                />
                )}
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