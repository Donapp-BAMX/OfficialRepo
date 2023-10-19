import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { deleteAnuncio, getUserInformation, getTasks  } from './firebase'; // Importa la función para eliminar anuncios
import { AuthContext } from './authContext';
import React, { useState, useEffect, useContext } from 'react';

const AdDetails = ({ route, navigation }) => {
  const { id, title, description } = route.params;
  const { currentUser } = useContext(AuthContext);
  const [hasIdTrabajo, setHasIdTrabajo] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserInformation(currentUser);
        setHasIdTrabajo(userData.idTrabajo !== undefined);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }

      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, [currentUser]);

  // Función para manejar la eliminación de anuncios
  const handleDeleteAd = async () => {
    // Mostrar un diálogo de confirmación antes de eliminar
    Alert.alert(
      'Eliminar Anuncio',
      '¿Estás seguro de que deseas eliminar este anuncio?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              // Llama a la función para eliminar el anuncio
              await deleteAnuncio(id);
              // Redirige de nuevo a la lista de anuncios u otra pantalla
              navigation.goBack();
            } catch (error) {
              console.error('Error al eliminar el anuncio:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title}>{title}</Card.Title>
        <Card.Divider />
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity style={styles.customButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
        {hasIdTrabajo && (
          <Button
            title="Eliminar Anuncio"
            buttonStyle={{ backgroundColor: 'red' }}
            onPress={handleDeleteAd}
          />
        )}
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
    width: '90%',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    marginTop: 0,
    marginBottom: 3,
    color: 'black',
    textAlign: 'center',
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
    marginTop: 10,
    marginBottom: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default AdDetails;