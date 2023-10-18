import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import { logoutUser, getUserInformation, saveAnuncio, getAnuncios } from './firebase';
import { AuthContext } from './authContext';
import { useNavigation } from '@react-navigation/native';
import { Card, Input, Button as RNEButton } from 'react-native-elements'; // Importa el componente Card, Input y Button de react-native-elements

const Anuncios = ({ currentUser }) => {
  const [hasIdTrabajo, setHasIdTrabajo] = useState(false);
  const [showCreateAdForm, setShowCreateAdForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [anuncios, setAnuncios] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (currentUser) {
      getUserInformation(currentUser)
        .then((userData) => {
          setHasIdTrabajo(userData.idTrabajo !== undefined);
        })
        .catch((error) => {
          console.error('Error fetching user information:', error);
        });

      getAnuncios()
        .then((anunciosData) => {
          setAnuncios(anunciosData);
        })
        .catch((error) => {
          console.error('Error fetching anuncios:', error);
        });
    }
  }, [currentUser]);

  const handleCreateAd = () => {
    setShowCreateAdForm(true);
  };

  const handleCloseCreateAdForm = () => {
    setShowCreateAdForm(false);
  };

  const handleSaveAd = async () => {
    try {
      await saveAnuncio(title, description);
      setShowCreateAdForm(false);

      // Obtén la lista actual de anuncios
      const currentAnuncios = [...anuncios];

      // Agrega el nuevo anuncio al principio de la lista
      currentAnuncios.unshift({ title, description, createdAt: new Date().getTime() });

      // Actualiza el estado con la nueva lista de anuncios
      setAnuncios(currentAnuncios);
    } catch (error) {
      console.error('Error al guardar el anuncio:', error);
    }
  };

  const handleOpenAdDetails = (item) => {
    navigation.navigate('AdDetails', item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        {/* Degradado sutil de color de rojo a amarillo en el fondo */}
      </View>
      <FlatList
        data={anuncios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card containerStyle={styles.anuncioItem}>
            <TouchableOpacity onPress={() => handleOpenAdDetails(item)}>
              <Text style={styles.anuncioTitle}>{item.title}</Text>
              <Text style={styles.anuncioDescription}>{item.description}</Text>
            </TouchableOpacity>
          </Card>
        )}
      />
      {hasIdTrabajo ? (
        <TouchableOpacity
          style={styles.createAdButton}
          onPress={handleCreateAd}
        >
          <Text style={styles.createAdButtonText}>+</Text>
        </TouchableOpacity>
      ) : null}
      <Modal visible={showCreateAdForm} animationType="slide">
        <View style={styles.modalContainer}>
          <Input
            placeholder="Título del anuncio"
            value={title}
            onChangeText={(text) => setTitle(text)}
            inputContainerStyle={styles.inputContainer}
            containerStyle={styles.inputField} // Centra el campo de entrada
          />
          <Input
            placeholder="Descripción del anuncio"
            value={description}
            onChangeText={(text) => setDescription(text)}
            inputContainerStyle={styles.inputContainer}
            containerStyle={styles.inputField} // Centra el campo de entrada
          />
          <RNEButton
            title="Guardar Anuncio"
            buttonStyle={styles.saveButton}
            titleStyle={styles.saveButtonText}
            onPress={handleSaveAd}
          />
          <RNEButton
            title="Cancelar"
            buttonStyle={styles.cancelButton}
            titleStyle={styles.cancelButtonText}
            onPress={handleCloseCreateAdForm}
          />
        </View>
      </Modal>
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  anuncioDescription: {
    fontSize: 16,
  },
});

export default Anuncios;
