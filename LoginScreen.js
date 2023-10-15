import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from './firebase';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const navigation = useNavigation();

  const handleEmail = (text) => {
    setEmail(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      <Image
        source={require('./img/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.heading}>Inicio de Sesión</Text>
      <View style={styles.inputContainer}>
        <AntDesign name="user" size={24} color="black" style={styles.icon} />
        <TextInput
          value={email}
          onChangeText={handleEmail}
          placeholder="Ingresa tu correo electrónico"
          style={styles.inputMail}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={24} color="black" style={styles.icon} />
        <TextInput
          value={password}
          onChangeText={handlePassword}
          placeholder="Ingresa tu contraseña"
          secureTextEntry={!showPassword} // Mostrar/ocultar contraseña según el estado
          style={styles.inputPassword}
        />
        <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.iconContainer}>
          <FontAwesome
            name={showPassword ? 'eye' : 'eye-slash'}
            size={24}
            color="black"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Iniciar Sesión"
          onPress={handleSubmit}
          color="white"
          style={styles.button}
        />
      </View>
      <Text style={styles.registerText}>
        ¿No tienes una cuenta?
        <Text
          style={{ color: 'red', fontWeight: 'bold' }}
          onPress={handleRegisterPress}
        >
          {' '}
          Regístrate aquí
        </Text>
      </Text>
      <TouchableOpacity onPress={handleForgotPasswordPress}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <Image
        source={require('./img/empresa.png')}
        style={styles.empresaLogo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  logo: {
    width: 175,
    height: 244,
    marginBottom: 30,
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
  icon: {
    marginRight: 10,
  },
  inputMail: {
    flex: 1,
    marginLeft: -7,
  },
  inputPassword: {
    flex: 1,
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
  button: {
    backgroundColor: 'green',
  },
  registerText: {
    fontSize: 14,
    marginTop: 20,
  },
  forgotPasswordText: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: -55,
    color: 'black',
  },
  empresaLogo: {
    width: 90,
    height: 30,
    marginTop: 170,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
  },
  eyeIcon: {
    fontSize: 24,
  },
});

export default LoginScreen;
