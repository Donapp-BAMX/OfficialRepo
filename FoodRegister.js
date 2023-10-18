import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { addFoodToFirebase } from './firebase';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FFD700" />
    </View>
  );
};

const FoodRegister = () => {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [foodType, setFoodType] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para la pantalla de carga

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
      setIsLoading(true); // Mostrar pantalla de carga al iniciar el registro

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

      //alert(`Alimento registrado con éxito. ID: ${foodId}`);

      setFoodName('');
      setCalories('');
      setExpirationDate(new Date());
      setFoodType('');
      setDescription('');
      
      setIsLoading(false);
      navigation.goBack();

    } catch (error) {
      alert('Error al registrar el alimento: ' + error.message);
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
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

  const inputContainer = {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
  };

  const buttonContainer = {
    width: '80%',
    marginTop: 50,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: 'green',
    marginBottom: 20,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
  };

  const backButtonContainer = {
    marginBottom: 20,
    height: 40,
    justifyContent: 'center',
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      fontSize: 30,
      marginBottom: 70,
      fontWeight: 'bold',
      marginTop: 60,
    },
    input: {
      width: '80%',
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 20,
      padding: 10,
      borderRadius: 20,
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
    expirationDateText: {
      color: 'green',
    },
    selectedFoodTypeButton: {
      backgroundColor: 'lightgreen',
    },
    loadingContainer: {
      ...StyleSheet.absoluteFill,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Registrar Alimento</Text>
      <TextInput
        value={foodName}
        onChangeText={handleFoodNameChange}
        placeholder="Nombre del alimento"
        style={inputContainer}
      />
      <TextInput
        value={calories}
        onChangeText={handleCaloriesChange}
        placeholder="Calorías"
        keyboardType="numeric"
        style={inputContainer}
      />
      <View style={styles.datePickerContainer}>
        <Text style={styles.expirationDateText}>Fecha de caducidad: </Text>
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
        style={[inputContainer, { height: 100 }]}
        multiline
      />
      <TouchableOpacity style={buttonContainer} onPress={handleSubmit} disabled={isSubmitting}>
        <Text style={{ textAlign: 'center', color: 'white' }}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={backButtonContainer} onPress={handleBackPress}>
        <Text style={{ textAlign: 'center', color: 'red' }}>Volver</Text>
      </TouchableOpacity>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      )}
    </View>
  );
};

export default FoodRegister;
