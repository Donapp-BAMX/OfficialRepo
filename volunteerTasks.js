import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native';
import { getUserInformation, saveTasks, getTasks } from './firebase';
import { useNavigation } from '@react-navigation/native';
import { Card, Input, Button as RNEButton } from 'react-native-elements';

const VolunteerTasks = ({ currentUser }) => {
  const navigation = useNavigation();
  const [hasIdTrabajo, setHasIdTrabajo] = useState(false);
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [volunteers, setVolunteers] = useState('');
  const [tasks, setTasks] = useState([]);
  const [currentVol, setCurrentVol] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser && isLoading) {
      fetchData();
    }
  }, [currentUser, isLoading]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  const handleCreateTask = () => {
    setShowCreateTaskForm(true);
    setTitle('');
    setDescription('');
    setVolunteers('');
  };

  const handleCloseCreateTaskForm = () => {
    setShowCreateTaskForm(false);
  };

  const handleSaveTask = async () => {
    try {
      setIsLoading(true);
      const taskId = await saveTasks(title, description, volunteers, currentVol);
      setShowCreateTaskForm(false);
  
      const currentTasks = [...tasks];
      currentTasks.unshift({ id: taskId, title, description, volunteers, currentVol: 0, createdAt: new Date().getTime() });
  
      setTasks(currentTasks);
      setTitle('');
      setDescription('');
      setVolunteers('');
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card containerStyle={styles.anuncioItem}>
            <TouchableOpacity
              style={styles.taskItem}
              onPress={() => {
                navigation.navigate('TaskDetail', { anuncio: item });
              }}
            >
              <Text style={styles.anuncioTitle}>{item.title}</Text>
              <Text style={styles.anuncioDescription}>
                {`Requeridos: ${item.volunteers}\nAl momento: ${item.currentVol}\n${
                  item.description.length > 50 ? item.description.slice(0, 50) + '...' : item.description
                }`}
              </Text>
            </TouchableOpacity>
          </Card>
        )}
      />
      {hasIdTrabajo && (
        <TouchableOpacity
          style={styles.createAdButton}
          onPress={handleCreateTask}
        >
          <Text style={styles.createAdButtonText}>+</Text>
        </TouchableOpacity>
      )}
      <Modal visible={showCreateTaskForm} animationType="slide">
        <View style={styles.modalContainer}>
        <View style={styles.inputContainer1}>
            <Input
              placeholder="Título del anuncio"
              value={title}
              onChangeText={setTitle}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={{ width: '100%' }}
              inputStyle={{ textAlignVertical: 'center', color: 'black', fontSize: 16, marginTop: 20, placeholderTextColor: '#888' }}
            />
          </View>
          <View style={styles.inputContainer2}>
            <Input
              placeholder="Descripción del anuncio"
              value={description}
              onChangeText={setDescription}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={{ width: '100%' }}
              inputStyle={{ textAlignVertical: 'center', color: 'black', fontSize: 16, marginTop: 20, placeholderTextColor: '#888' }}
            />
          </View>
          <View style={styles.inputContainer2}>
            <Input
              placeholder="Voluntarios requeridos"
              value={volunteers}
              onChangeText={setVolunteers}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={{ width: '100%' }}
              inputStyle={{ textAlignVertical: 'center', color: 'black', fontSize: 16, marginTop: 20, placeholderTextColor: '#888' }}
            />
          </View>
          <RNEButton
            title="Guardar Anuncio"
            buttonStyle={styles.saveButton}
            titleStyle={styles.saveButtonText}
            onPress={handleSaveTask}
          />
          <RNEButton
            title="Cancelar"
            buttonStyle={[styles.cancelButton, { backgroundColor: 'transparent', borderWidth: 0 }]}
            titleStyle={[styles.cancelButtonText, { backgroundColor: 'transparent', borderWidth: 0 }]}
            onPress={handleCloseCreateTaskForm}
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
    bottom: 50,
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

export default VolunteerTasks;
