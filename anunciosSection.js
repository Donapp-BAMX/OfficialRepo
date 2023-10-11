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
import { logoutUser, getUserInformation, saveAnuncio, getAnuncios } from './firebase'; // Importa getAnuncios
import { AuthContext } from './authContext';

const Anuncios = ({ currentUser }) => {
  const [hasIdTrabajo, setHasIdTrabajo] = useState(false);
  const [showCreateAdForm, setShowCreateAdForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [anuncios, setAnuncios] = useState([]);

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

  return (
    <View style={styles.container}>
      {hasIdTrabajo && (
        <TouchableOpacity
          style={styles.createAdButton}
          onPress={handleCreateAd}
        >
          <Text style={styles.createAdButtonText}>+</Text>
        </TouchableOpacity>
      )}

      <Modal visible={showCreateAdForm} animationType="slide">
        <View style={styles.modalContainer}>
          {/* Formulario de Creación de Anuncios */}
          <Text>Título del anuncio:</Text>
          <TextInput
            placeholder="Título"
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.input}
          />
          <Text>Descripción del anuncio:</Text>
          <TextInput
            placeholder="Descripción"
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={styles.input}
          />
          <Button title="Guardar Anuncio" onPress={handleSaveAd} />
          <Button title="Cancelar" onPress={handleCloseCreateAdForm} />
        </View>
      </Modal>

      {/* Lista de Anuncios */}
      <FlatList
        data={anuncios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.anuncioItem}
            onPress={() => {
              // Manejar la apertura de anuncio o navegación a detalles
              console.log("Abre el anuncio:", item.title);
            }}
          >
            <Text style={styles.anuncioTitle}>{item.title}</Text>
            <Text style={styles.anuncioDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAdButton: {
    position: 'absolute',
    top: 10,
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
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  anuncioItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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