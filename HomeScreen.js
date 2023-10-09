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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FoodRegister from './FoodRegister';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const { currentUser } = useContext(AuthContext);
  const [hasIdTrabajo, setHasIdTrabajo] = useState(false);
  const [showCreateAdForm, setShowCreateAdForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [anuncios, setAnuncios] = useState([]);
  const [isAnuncioModalVisible, setIsAnuncioModalVisible] = useState(false);
  const [selectedAnuncio, setSelectedAnuncio] = useState(null);


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
          // Ordena los anuncios por fecha de creación en orden descendente
          const orderedAnuncios = anunciosData.sort((a, b) => {
            return b.createdAt - a.createdAt;
          });
  
          setAnuncios(orderedAnuncios);
        })
        .catch((error) => {
          console.error('Error fetching anuncios:', error);
        });
    }
  }, [currentUser]);

  const orderAnunciosByDate = (anunciosData) => {
    return anunciosData.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
  };

  const handleCreateAd = () => {
    setTitle('');
    setDescription('');
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

  const updateAnunciosList = async () => {
    try {
      const anunciosData = await getAnuncios();
      setAnuncios(anunciosData);
    } catch (error) {
      console.error('Error fetching anuncios:', error);
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

      <FlatList
        data={anuncios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.anuncioItem}
            onPress={() => {
              setSelectedAnuncio(item);
              setIsAnuncioModalVisible(true);
            }}
          >
            <Text style={styles.anuncioTitle}>{item.title}</Text>
            <Text style={styles.anuncioDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={isAnuncioModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedAnuncio && (
            <>
              <Text style={styles.anuncioTitle}>{selectedAnuncio.title}</Text>
              <Text style={styles.anuncioDescription}>{selectedAnuncio.description}</Text>
              <Button title="Cerrar" onPress={() => setIsAnuncioModalVisible(false)} />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const LoadingScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

const PerfilScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (currentUser) {
      getUserInformation(currentUser)
        .then((userData) => {
          setUserData(userData);
        })
        .catch((error) => {
          console.error('Error fetching user information:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentUser]);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>¡Bienvenido usuario!</Text>
      <Text>Si estás aquí, ¡tienes permiso para estarlo!</Text>
      <Text>Email: {userData.email}</Text>
      <Text>Date of register: {userData.registeredAt.toDate().toISOString().substring(0, 10)}</Text>
      <Text>Name: {userData.name}</Text>
      <Text>Last name: {userData.lastName}</Text>
      <Text>Bio: {userData.biography}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const VoluntarioScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pantalla de Voluntario</Text>
    </View>
  );
};

const DonacionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pantalla de Voluntario</Text>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Principal" component={HomeScreen} />
      <Tab.Screen name="Donaciones" component={FoodRegister} /> 
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Voluntario" component={VoluntarioScreen} />
    </Tab.Navigator>
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

export default TabNavigator;
