import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

const Cart = () => {
  const [amount, setAmount] = useState('');
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handleAmountChange = (text) => {
    setAmount(text);
  };

  const onCheckout = async () => {
    try {
      // Realizar una solicitud para crear el PaymentIntent en tu servidor
      const response = await fetch('http://localhost:3000/api/intents', {
        method: 'POST',
        headers: {  
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: Math.floor(amount * 100) }), // Asegúrate de ajustar el objeto de solicitud según tu API
      });

      if (!response.ok) {
        Alert.alert('Something went wrong');
        return;
      }

      const responseData = await response.json();

      // Inicializar el Payment Sheet
      const initResponse = await initPaymentSheet({
        merchantDisplayName: 'Banco de Alimentos de Guadalajara',
        paymentIntentClientSecret: responseData.paymentIntent.client_secret,
      });

      if (initResponse.error) {
        console.log(initResponse.error);
        Alert.alert('Something went wrong');
        return;
      }

      // Presentar el Payment Sheet de Stripe
      const paymentResponse = await presentPaymentSheet();

      if (paymentResponse.error) {
        Alert.alert(
          `Error code: ${paymentResponse.error.code}`,
          paymentResponse.error.message
        );
        return;
      }

      // Si el pago es exitoso, puedes continuar con la creación de la orden
      onCreateOrder();
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ingrese una cantidad a donar:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleAmountChange}
        value={amount}
        keyboardType="numeric"
      />
      <Button title="Checkout" onPress={onCheckout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default Cart;