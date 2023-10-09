import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { addFoodToFirebase } from './firebase';

const FoodRegister = () => {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [expirationDate, setExpirationDate] = useState(new Date()); // Cambia a un estado de fecha
  const [foodType, setFoodType] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFoodNameChange = (text) => {
    setFoodName(text);
  };

  const handleCaloriesChange = (text) => {
    setCalories(text);
  };

  const handleExpirationDateChange = (event, selectedDate) => {
    setExpirationDate(selectedDate || expirationDate);
  };

  const handleFoodTypeChange = (type) => {
    setFoodType(type);
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      if (!foodName || !calories || !expirationDate || !foodType || !description) {
        alert('Por favor, completa todos los campos.');
        return;
      }

      const foodData = {
        name: foodName,
        calories: parseInt(calories),
        expirationDate,
        foodType,
        description,
      };

      const foodId = await addFoodToFirebase(foodData);

      alert(`Alimento registrado con éxito. ID: ${foodId}`);

      setFoodName('');
      setCalories('');
      setExpirationDate(new Date());
      setFoodType('');
      setDescription('');
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

  const foodTypes = [
    { label: 'Fruta/Verdura', value: 'fruta_verdura' },
    { label: 'Abrefácil', value: 'abrefacil' },
    { label: 'Lata', value: 'lata' },
    { label: 'Otros', value: 'otros' },
  ];

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
      <View style={styles.datePickerContainer}>
        <Text>Fecha de caducidad: </Text>
        <DateTimePicker
          value={expirationDate}
          mode="date"
          display="default"
          onChange={handleExpirationDateChange}
        />
      </View>
      <View style={styles.foodTypeButtons}>
        {foodTypes.map((type) => (
          <TouchableOpacity
            key={type.value}
            style={[
              styles.foodTypeButton,
              foodType === type.value ? styles.selectedFoodTypeButton : {},
            ]}
            onPress={() => handleFoodTypeChange(type.value)}
          >
            <Text>{type.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        value={description}
        onChangeText={handleDescriptionChange}
        placeholder="Descripción del alimento"
        style={styles.input}
        multiline
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
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  foodTypeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  foodTypeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    alignItems: 'center',
  },
  selectedFoodTypeButton: {
    backgroundColor: 'lightblue',
  },
});

export default FoodRegister;
