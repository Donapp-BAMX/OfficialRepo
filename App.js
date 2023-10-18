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
import Anuncios from './anunciosSection'; // Importa el componente Anuncios
import AdDetails from './AdDetails'; // Importa el componente AdDetails
import volunteerTasks from './volunteerTasks';
import TaskDetail from './taskDetail';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="FoodRegister"
            component={FoodRegister}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="VoluntarioSection"
            component={VoluntarioSection}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="Anuncios"
            component={Anuncios} // Agrega la pantalla Anuncios
            options={{
              title: 'Anuncios',
            }}
          />
          <Stack.Screen
            name="VolunteerTasks"
            component={volunteerTasks}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="TaskDetail"
            component={TaskDetail}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="AdDetails"
            component={AdDetails} // Agrega la pantalla AdDetails
            options={{
              title: 'Detalles del Anuncio',
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
