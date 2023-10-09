import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';

describe('LoginScreen', () => {
  it('debería mostrar los campos de correo electrónico y contraseña', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);

    const emailInput = getByPlaceholderText('Ingresa tu correo electrónico');
    const passwordInput = getByPlaceholderText('Ingresa tu contraseña');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('debería permitir el ingreso de correo electrónico y contraseña', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText('Ingresa tu correo electrónico');
    const passwordInput = getByPlaceholderText('Ingresa tu contraseña');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('debería mostrar un mensaje de error si se envía el formulario vacío', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    const submitButton = getByText('Iniciar Sesión');

    fireEvent.press(submitButton);

    const errorMessage = getByText('Por favor, completa todos los campos.');
    expect(errorMessage).toBeTruthy();
  });

  it('debería mostrar un mensaje de éxito después de iniciar sesión', async () => {
    // Mock loginUser para simular un inicio de sesión exitoso
    jest.mock('./firebase', () => ({
      loginUser: jest.fn().mockResolvedValue({}),
    }));

    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText('Ingresa tu correo electrónico');
    const passwordInput = getByPlaceholderText('Ingresa tu contraseña');
    const submitButton = getByText('Iniciar Sesión');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(submitButton);

    // Espera a que aparezca el mensaje de éxito
    const successMessage = await waitFor(() => getByText('¡Inicio de sesión exitoso!'));
    expect(successMessage).toBeTruthy();
  });
});