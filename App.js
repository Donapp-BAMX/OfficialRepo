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
import { StripeProvider } from '@stripe/stripe-react-native';
import cart from './shoppingCart';

const Stack = createStackNavigator();
const STRIPE_KEY = 'pk_test_51NwmsiIMr3rp9BogQhuy8wFfE0kudkr9s8Hwue1cECUqO69y2lcm5YllzPJnQqwi6vxfAeyWM27OfEPC3C08Ivcz00Wa1DDDb2'

export default function App() {
  return (
    <AuthProvider>
      <StripeProvider publishableKey={STRIPE_KEY}>
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
              name="Cart" 
              component={cart} 
              options={{
                title: 'Cart',
              }}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </StripeProvider>
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
