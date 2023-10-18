import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native';
import { updateTask, getUserInformation, saveTasks, getTasks } from './firebase'; // Importa getAnuncios
import { AuthContext } from './authContext';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation desde React Navigation
import TaskDetail from './taskDetail';

const VolunteerTasks = ({ currentUser }) => {
  const navigation = useNavigation();
  const [hasIdTrabajo, setHasIdTrabajo] = useState(false);
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [volunteers, setVolunteers] = useState('');
  const [tasks, setTasks] = useState([]);

useEffect(() => {
  if (currentUser) {
    getUserInformation(currentUser)
      .then((userData) => {
        setHasIdTrabajo(userData.idTrabajo !== undefined);
      })
      .catch((error) => {
        console.error('Error fetching user information:', error);
      });

    getTasks()
      .then((anunciosData) => {
        setTasks(anunciosData);
      })
      .catch((error) => {
        console.error('Error fetching announcements:', error);
      });
  }
}, [currentUser]);

  const handleCreateTask = () => {
    setShowCreateTaskForm(true);
  };

  const handleCloseCreateTaskForm = () => {
    setShowCreateTaskForm(false);
  };

  const handleSaveTask = async () => {
    if (title.trim() === '' || description.trim() === '' || volunteers.trim() === '') {
      console.error('Título, descripción y número de voluntarios son obligatorios.');
      return;
    }
  
    try {
      const taskId = await saveTasks(title, description, volunteers);
      setShowCreateTaskForm(false);
  
      // Obtén la lista actual de tareas
      const currentTasks = [...tasks];
  
      // Agrega la nueva tarea al principio de la lista
      currentTasks.unshift({ id: taskId, title, description, volunteers });
  
      // Actualiza el estado con la nueva lista de tareas
      setTasks(currentTasks);
  
      // Restablece los valores de title, description y volunteers
      setTitle('');
      setDescription('');
      setVolunteers('');
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
    }
  };

return (
    <View style={styles.container}>
        {hasIdTrabajo && (
            <View style={styles.createTaskButton}>
                <TouchableOpacity onPress={handleCreateTask}>
                    <Text style={styles.createTaskButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        )}

        <Modal visible={showCreateTaskForm} animationType="slide">
            <View style={styles.modalContainer}>
            <Text>Título de la tarea:</Text>
                <TextInput
                placeholder="Título"
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.input}
            />
            <Text>Descripción de la tarea:</Text>
            <TextInput
                placeholder="Descripción"
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={styles.input}
            />
            <Text>Voluntarios Requeridos:</Text>
            <TextInput
                placeholder="Voluntarios"
                value={volunteers}
                onChangeText={(text) => setVolunteers(text)}
                style={styles.input}
            />
            <Button title="Guardar Tarea" onPress={handleSaveTask} />
            <Button title="Cancelar" onPress={handleCloseCreateTaskForm} />
            </View>
        </Modal>

        <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                style={styles.TaskItem}
                onPress={() => {
                    navigation.navigate('TaskDetail', { anuncio: item });
                }}
                >
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskDescription}>
                    {"Requeridos: " + item.volunteers + '\n' + "Al momento: " + item.currentVol + '\n'}
                    {item.description.length > 50 ? item.description.slice(0, 50) + '...' : item.description}
                </Text>
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
  createTaskButton: {  
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'blue',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  createTaskButtonText: {
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
  TaskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
  fontSize: 16,
  },
});
  
  
export default VolunteerTasks;