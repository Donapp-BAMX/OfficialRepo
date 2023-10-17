import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from './firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import verificarContrasena from './verificarContrasena';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [biography, setBiography] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    setSelectedGender('Seleccionar Género');
    setModalVisible(false);
  };

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
    setModalVisible(false);
  };

  const handleSubmit = () => {
    if (!email || !password || password !== verifyPassword || !verificarContrasena(password)) {
      alert('Por favor, completa todos los campos y verifica las contraseñas.');
      return;
    }

    setIsLoading(true);

    registerUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        const userData = {
          email: email,
          registeredAt: Timestamp.fromDate(new Date()),
          name: name,
          lastName: lastName,
          biography: biography,
          gender: selectedGender,
        };

        const userDocRef = doc(db, 'users', user.uid);

        setDoc(userDocRef, userData)
          .then(() => {
            alert('¡Usuario creado con éxito!');
            navigation.navigate('Login');
            setIsLoading(false);
          })
          .catch((error) => {
            alert('Error al agregar datos a Firestore: ' + error.message);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        alert('¡Algo salió mal! Verifica tus credenciales.');
        const errorCode = error.code;
        console.log(errorCode);
        setIsLoading(false);
      });
  };

  const navigation = useNavigation();

  const handleSignInPress = () => {
    setIsLoading(false);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Registro</Text>
      <TextInput
        value={name}
        onChangeText={handleNameChange}
        placeholder="Ingresa tu nombre"
        style={styles.inputNombre}
        data-test="name"
      />
      <TextInput
        value={lastName}
        onChangeText={handleLastNameChange}
        placeholder="Ingresa tu apellido"
        style={styles.inputApellido}
        data-test="lastName"
      />
      <TextInput
        value={email}
        onChangeText={handleEmail}
        placeholder="Ingresa tu correo electrónico"
        style={styles.inputMail}
        data-test="email"
      />
      <TextInput
        value={password}
        onChangeText={handlePassword}
        placeholder="Ingresa tu contraseña"
        secureTextEntry={true}
        style={styles.inputPassword}
        data-test="password"
      />
      <TextInput
        value={verifyPassword}
        onChangeText={handleVerifyPassword}
        placeholder="Verifica tu contraseña"
        secureTextEntry={true}
        style={styles.inputVerifyPassword}
        data-test="verifyPassword"
      />
      <TextInput
        value={biography}
        onChangeText={handleBiographyChange}
        placeholder="Escribe tu biografía (máx. 500 palabras)"
        multiline={true}
        numberOfLines={5}
        style={styles.inputBiography}
        data-test="biography"
      />
      <View style={styles.genderContainer}>
        <View style={styles.GenderOptions}>
          <Button
            title={selectedGender || 'Seleccionar Género'}
            onPress={handleOpenModal}
            color="green"
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Enviar" onPress={handleSubmit} color="white" />
      </View>
      <Text style={styles.signInText}>
        ¿Ya tienes una cuenta? Por favor,
        <Text style={{ color: 'red', fontWeight: 'bold' }} onPress={handleSignInPress} data-test="back-to-login">
          {' '}
          inicia sesión
        </Text>
      </Text>
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Button title="Hombre" onPress={() => handleGenderSelection('Hombre')} color="green" />
            <Button title="Mujer" onPress={() => handleGenderSelection('Mujer')} color="green" />
            <Button title="Otro" onPress={() => handleGenderSelection('Otro')} color="green" />
            <Button title="Cancelar" onPress={handleCloseModal} color="red" />
          </View>
        </View>
      </Modal>
      <Image source={require('./img/empresa.png')} style={styles.image} />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 30,
    marginTop: 70,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  inputNombre: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
  },
  inputApellido: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
  },
  inputMail: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
  },
  inputPassword: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
  },
  inputVerifyPassword: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
  },
  inputBiography: {
    width: '80%',
    height: 100,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
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
  buttonContainer: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: 'green',
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  image: {
    width: 90,
    height: 30,
    marginTop: 60,
  },
  GenderOptions: {
    flex: 1,
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});

export default RegisterScreen;
