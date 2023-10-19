import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
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
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);

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

  return (
    <View style={styles.containerName}>
      <Text style={styles.heading}>Registrar Alimento</Text>
      <TextInput
        value={foodName}
        onChangeText={handleFoodNameChange}
        placeholder="Nombre del alimento"
        style={styles.inputContainer}
      />
      <TextInput
        value={calories}
        onChangeText={handleCaloriesChange}
        placeholder="Calorías"
        keyboardType="numeric"
        style={styles.inputContainer}
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
        style={[styles.inputContainer, { height: 100 }]}
        multiline
      />
      <TouchableOpacity style={styles.customButton} onPress={handleSubmit} disabled={isSubmitting}>
        <Text style={styles.registerButton}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButtonContainer} onPress={handleBackPress}>
        <Text style={styles.registerBackButton}>Volver</Text>
      </TouchableOpacity>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerName: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    height: '6%',
    height: 40,
  },
  heading: {
    fontSize: 30,
    marginBottom: 70,
    fontWeight: 'bold',
    marginTop: 60,
  },
  inputContainer: {
    width: '90%',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
    height: 40,
    height: '6%',
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
    marginLeft: -45,
  },
  foodTypeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
    height: 80,
    minWidth: 80,
    marginHorizontal: 5,
  },
  expirationDateText: {
    color: 'black',
    fontWeight: 'bold',
  },
  selectedFoodTypeButton: {
    backgroundColor: '#FFD700',
  },
  customButton: {
    backgroundColor: '#FFD700',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    marginTop: 0,
    marginBottom: 40,
  },
  backButtonContainer: {
    marginTop: 10,
    height: 40,
    justifyContent: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  registerButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  registerBackButton: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FoodRegister;
