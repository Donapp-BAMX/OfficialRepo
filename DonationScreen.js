import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

function DonationView() {
  const navigation = useNavigation();

  const handleDonateMoney = () => {
    const url = 'https://donate.stripe.com/test_fZedUQ8QE4LG49ybII';
    Linking.openURL(url)
      .catch((error) => console.error('Error al abrir el enlace: ', error));
  };

  const handleTDonateFood = () => {
    navigation.navigate('FoodRegister');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleDonateMoney}>
        <Text style={styles.buttonText}>Donar Dinero</Text>
        <Image source={require('./img/creditCard.png')} style={styles.imageCreditCard} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleTDonateFood}>
        <Text style={styles.buttonText}>Donar Comida</Text>
        <Image source={require('./img/food.png')} style={styles.imageFood} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 250,
    height: 60,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonText: {
    textAlign: 'left',
    flex: 1,
    fontSize: 18,
  },
  imageCreditCard: {
    width: 70,
    height: 40,
  },
  imageFood: {
    width: 55,
    height: 55,
    marginRight: 5,
  },
});

export default DonationView;