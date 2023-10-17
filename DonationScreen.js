import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
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
    <View style={styles.fullScreen}>
      <ImageBackground source={require('./assets/nino.jpg')} style={styles.backgroundImage} />
      <View style={styles.container}>
        
        {/* Texto principal */}
        <View style={styles.headingContainer}>
          <Text style={styles.mainHeading}>¿Qué desea donar?</Text>
        </View>

        {/* Botones */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.customButton} onPress={handleDonateMoney}>
            <Text style={styles.buttonText}>Donar Dinero</Text>
            <Image source={require('./img/creditCard.png')} style={styles.imageCreditCard} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.customButton} onPress={handleTDonateFood}>
            <Text style={styles.buttonText}>Donar Comida</Text>
            <Image source={require('./img/food.png')} style={styles.imageFood} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  headingContainer: {
    marginBottom: 10, 
    marginTop: 80,
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  mainHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: "#ffffff",
  },
  customButton: {
    backgroundColor: '#FFD700',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    marginBottom: 10,
    marginTop: 10,
    width: 250,
    height: 60,
    flexDirection: 'row',
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
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default DonationView;
