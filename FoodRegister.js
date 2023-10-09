import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addFoodToFirebase } from './firebase'; // Importa la función para agregar alimentos a Firebase

const FoodRegister = () => {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFoodNameChange = (text) => {
    setFoodName(text);
  };

  const handleCaloriesChange = (text) => {
    setCalories(text);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // Valida que los campos no estén vacíos
      if (!foodName || !calories) {
        alert('Por favor, completa todos los campos.');
        return;
      }

      // Crea un objeto con los datos del alimento
      const foodData = {
        name: foodName,
        calories: parseInt(calories),
      };

      // Agrega el alimento a Firebase
      const foodId = await addFoodToFirebase(foodData);

      alert(`Alimento registrado con éxito. ID: ${foodId}`);

      // Limpia los campos del formulario
      setFoodName('');
      setCalories('');
    } catch (error) {
      alert('Error al registrar el alimento: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Registrar Alimento</Text>
      <TextInput
        value={foodName}
        onChangeText={handleFoodNameChange}
        placeholder="Nombre del alimento"
        style={styles.input}
      />
      <TextInput
        value={calories}
        onChangeText={handleCaloriesChange}
        placeholder="Calorías"
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Registrar" onPress={handleSubmit} disabled={isSubmitting} />
      <Button title="Volver" onPress={handleBackPress} />
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

export default FoodRegister;
