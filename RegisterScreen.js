import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from './firebase'; 
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';


const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [biography, setBiography] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');

  const handleEmail = (text) => {
    setEmail(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  const handleVerifyPassword = (text) => {
    setVerifyPassword(text);
  };

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleLastNameChange = (text) => {
    setLastName(text);
  };

  const handleBiographyChange = (text) => {
    setBiography(text);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
    setModalVisible(false);
  };

  const handleSubmit = () => {
    if (!email || !password || password !== verifyPassword) {
      alert('Por favor, completa todos los campos y verifica las contraseñas.');
      return;
    }
  
    registerUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
  
        // Agregar usuario a Firestore
        const userData = {
          email: email,
          registeredAt: Timestamp.fromDate(new Date()),
          name: name,
          lastName: lastName,
          biography: biography,
          gender: selectedGender,
        };
  
        // Utiliza la UID del usuario autenticado para crear la referencia del documento
        const userDocRef = doc(db, 'users', user.uid);
  
        setDoc(userDocRef, userData)
          .then(() => {
            alert('¡Usuario creado con éxito!');
            // Redirige al usuario a la pestaña de inicio de sesión (login)
            navigation.navigate('Login'); // Esto debería funcionar correctamente ahora
          })
          .catch((error) => {
            alert('Error al agregar datos a Firestore: ' + error.message);
          });
      })
      .catch((error) => {
        alert('¡Algo salió mal! Verifica tus credenciales.');
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  const navigation = useNavigation();

  const handleSignInPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Registro</Text>
      <TextInput
        value={name}
        onChangeText={handleNameChange}
        placeholder="Ingresa tu nombre"
        style={styles.input}
      />
      <TextInput
        value={lastName}
        onChangeText={handleLastNameChange}
        placeholder="Ingresa tu apellido"
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={handleEmail}
        placeholder="Ingresa tu correo electrónico"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={handlePassword}
        placeholder="Ingresa tu contraseña"
        secureTextEntry={true}
        style={styles.input}
      />
      <TextInput
        value={verifyPassword}
        onChangeText={handleVerifyPassword}
        placeholder="Verifica tu contraseña"
        secureTextEntry={true}
        style={styles.input}
      />
      <TextInput
        value={biography}
        onChangeText={handleBiographyChange}
        placeholder="Escribe tu biografía (máx. 500 palabras)"
        multiline={true}
        numberOfLines={5}
        style={[styles.input, { height: 100 }]}
      />
      <Text style={styles.label}>Género seleccionado: {selectedGender}</Text>
      <Button title="Seleccionar Género" onPress={handleOpenModal} />
      <Button title="Enviar" onPress={handleSubmit} />
      <Text style={styles.signInText}>
        ¿Ya tienes una cuenta? Por favor,
        <Text style={{ color: '#293462', fontWeight: 'bold' }} onPress={handleSignInPress}>
          {' '}
          inicia sesión
        </Text>
      </Text>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Button title="Hombre" onPress={() => handleGenderSelection('Hombre')} />
            <Button title="Mujer" onPress={() => handleGenderSelection('Mujer')} />
            <Button title="Otro" onPress={() => handleGenderSelection('Otro')} />
            <Button title="Cancelar" onPress={handleCloseModal} />
          </View>
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
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  signInText: {
    fontSize: 12,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default RegisterScreen;
