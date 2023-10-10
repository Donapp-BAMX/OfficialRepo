// PaymentContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Creamos un contexto
const PaymentContext = createContext();

// Hook personalizado para acceder al contexto
export function usePayment() {
  return useContext(PaymentContext);
}

// Proveedor del contexto
export function PaymentProvider({ children }) {
  const [paymentResponse, setPaymentResponse] = useState(null);

  // Función para crear un pago
  async function createPaymentIntent(data) {
    try {
      const response = await axios.post('http://localhost:3000/payments/intents', data);
      setPaymentResponse(response.data);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      setPaymentResponse(null);
    }
  }

  return (
    <PaymentContext.Provider value={{ paymentResponse, createPaymentIntent }}>
      {children}
    </PaymentContext.Provider>
  );
}
