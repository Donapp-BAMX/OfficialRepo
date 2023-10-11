import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import ForgotPassword from './forgotPassword';
import FoodRegister from './FoodRegister';
import { AuthProvider } from './authContext';
import VoluntarioSection from './voluntarioSection';


const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: 'Register',
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Login',
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Home',
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              title: 'Forgot Password',
            }}
          />
          <Stack.Screen
            name="FoodRegister"
            component={FoodRegister} // Agrega la pantalla FoodRegister
            options={{
              title: 'Food Register',
            }}
          />
          <Stack.Screen
            name="VoluntarioSection"
            component={VoluntarioSection}
            options={{
              title: 'Voluntario Section',
            }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
