import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, FlatList } from 'react-native';
import { logoutUser, getUserInformation, saveAnuncio, getAnuncios } from './firebase';
import { AuthContext } from './authContext';
import { useNavigation } from '@react-navigation/native';
import { Card, Input, Button as RNEButton } from 'react-native-elements';

const Anuncios = ({ currentUser }) => {
  const [hasIdTrabajo, setHasIdTrabajo] = useState(false);
  const [showCreateAdForm, setShowCreateAdForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [anuncios, setAnuncios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      getUserInformation(currentUser)
        .then((userData) => {
          setHasIdTrabajo(userData.idTrabajo !== undefined);
        })
        .catch((error) => {
          console.error('Error fetching user information:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });

      getAnuncios()
        .then((anunciosData) => {
          setAnuncios(anunciosData);
        })
        .catch((error) => {
          console.error('Error fetching anuncios:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentUser]);

  const handleCreateAd = () => {
    setShowCreateAdForm(true);
    setTitle('');
    setDescription('');
  };

  const handleCloseCreateAdForm = () => {
    setShowCreateAdForm(false);
  };

  const handleSaveAd = async () => {
    try {
      setIsLoading(true);
      await saveAnuncio(title, description);
      setShowCreateAdForm(false);

      const currentAnuncios = [...anuncios];
      currentAnuncios.unshift({ title, description, createdAt: new Date().getTime() });

      setAnuncios(currentAnuncios);
    } catch (error) {
      console.error('Error al guardar el anuncio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAdDetails = (item) => {
    navigation.navigate('AdDetails', item);
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      )}
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
          style={[styles.createAdButton, { backgroundColor: 'green' }]}
          onPress={handleCreateAd}
        >
          <Text style={styles.createAdButtonText}>+</Text>
        </TouchableOpacity>
      ) : null}
      <Modal visible={showCreateAdForm} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.inputContainer1}>
            <Input
              placeholder="Título del anuncio"
              value={title}
              onChangeText={(text) => setTitle(text)}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={{ width: '100%' }}
              inputStyle={{ textAlignVertical: 'center', color: 'black', fontSize: 16, marginTop: 20, placeholderTextColor: '#888' }}
            />
          </View>
          <View style={styles.inputContainer2}>
            <Input
              placeholder="Descripción del anuncio"
              value={description}
              onChangeText={(text) => setDescription(text)}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={{ width: '100%' }}
              inputStyle={{ textAlignVertical: 'center', color: 'black', fontSize: 16, marginTop: 20, placeholderTextColor: '#888' }}
            />
          </View>
          <RNEButton
            title="Guardar Anuncio"
            buttonStyle={styles.saveButton}
            titleStyle={styles.saveButtonText}
            onPress={handleSaveAd}
          />
          <RNEButton
            title="Cancelar"
            buttonStyle={[styles.cancelButton, { backgroundColor: 'transparent', borderWidth: 0 }]}
            titleStyle={[styles.cancelButtonText, { backgroundColor: 'transparent', borderWidth: 0 }]}
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
    backgroundColor: 'linear-gradient(to bottom, red, yellow)',
  },
  createAdButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'green',
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
  inputContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 40,
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 60,
  },
  inputContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 40,
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  saveButton: {
    backgroundColor: '#FFD700',
    borderRadius: 25,
    marginTop: 50,
  },
  saveButtonText: {
    color: 'black',
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    color: 'red',
  },
  anuncioItem: {
    padding: 10,
    borderRadius: 10,
  },
  anuncioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  anuncioDescription: {
    fontSize: 16,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});

export default Anuncios;
