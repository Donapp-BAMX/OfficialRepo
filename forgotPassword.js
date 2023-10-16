import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { resetPassword } from './firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

const ForgotPassword = () => {
  const [resetEmail, setResetEmail] = useState('');
  const navigation = useNavigation();

  const handleResetPassword = () => {
    if (!resetEmail) {
      alert('Por favor, ingresa una dirección de correo electrónico válida.');
      return;
    }
  
    resetPassword(resetEmail)
      .then(() => {
        alert('Correo de restablecimiento de contraseña enviado con éxito. Verifica tu correo electrónico.');
        navigation.navigate('Login');
      })
      .catch((error) => {
        alert('Error al enviar el correo de restablecimiento de contraseña. Verifica tu dirección de correo electrónico.');
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('./img/logoenojado.png')} style={styles.logo} />
      <Text style={styles.heading}>Recuperar Contraseña</Text>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} style={styles.icon} />
        <TextInput
          value={resetEmail}
          onChangeText={(text) => setResetEmail(text)}
          placeholder="Ingresa tu correo electrónico"
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Enviar Correo de Restablecimiento" onPress={handleResetPassword} color="white" />
      </View>
      <Image source={require('./img/empresa.png')} style={styles.empresaLogo} />
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
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
    height: '6%',
  },
  buttonContainer: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: 'green',
    marginBottom: 20,
    borderRadius: 20,
    height: '6%',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
    marginLeft: 3,
    color: 'gray',
  },
  input: {
    flex: 1,
  },
  logo: {
    width: 175,
    height: 244,
    marginBottom: 50,
    marginTop: 70,
  },
  empresaLogo: {
    width: 90,
    height: 30,
    marginTop: 240,
  },
});

export default ForgotPassword;
