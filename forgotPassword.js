import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { resetPassword } from './firebase';

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
        navigation.navigate('Login'); // Otra opción: navegar de vuelta a la pantalla de inicio de sesión
      })
      .catch((error) => {
        alert('Error al enviar el correo de restablecimiento de contraseña. Verifica tu dirección de correo electrónico.');
        console.error(error);
      });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recuperar Contraseña</Text>
      <TextInput
        value={resetEmail}
        onChangeText={(text) => setResetEmail(text)}
        placeholder="Ingresa tu correo electrónico para recuperar la contraseña"
        style={styles.input}
      />
      <Button title="Enviar Correo de Restablecimiento" onPress={handleResetPassword} />
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
});

export default ForgotPassword;
