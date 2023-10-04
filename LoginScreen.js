import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from './firebase';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleEmail = (text) => {
    setEmail(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  const handleSubmit = () => {
    if (!email || !password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    loginUser(email, password)
      .then((userCredential) => {
        alert('¡Inicio de sesión exitoso!');
        navigation.navigate('Home');
      })
      .catch((error) => {
        alert('¡Algo salió mal! Verifica tus credenciales.');
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const handleForgotPasswordPress = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
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
      <Button title="Iniciar Sesión" onPress={handleSubmit} />
      <Text style={styles.registerText}>
        ¿No tienes una cuenta? Regístrate
        <Text style={{ color: '#293462', fontWeight: 'bold' }} onPress={handleRegisterPress}>
          {' '}
          aquí
        </Text>
      </Text>
      <TouchableOpacity onPress={handleForgotPasswordPress}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
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
  registerText: {
    fontSize: 12,
    marginTop: 20,
  },
  forgotPasswordText: {
    color: '#293462',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default LoginScreen;
