import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
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

  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  return (
    <View style={styles.fullScreen}>
      <View style={styles.container}>
        { !imagesLoaded && 
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFD700" />
          </View>
        }
        <View style={styles.headingContainer}>
          <Text style={styles.mainHeading}>¿Qué desea donar?</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.customButton} onPress={handleDonateMoney}>
            <Text style={styles.buttonText}>Dinero</Text>
            <Image 
              source={require('./img/creditCard.png')} 
              style={styles.imageCreditCard} 
              onLoad={handleImageLoad}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.customButton} onPress={handleTDonateFood}>
            <Text style={styles.buttonText}>Alimentos</Text>
            <Image 
              source={require('./img/food.png')} 
              style={styles.imageFood} 
              onLoad={handleImageLoad}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Ya es blanco por defecto
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Hacemos la animación de carga un poco más opaca
  },
  headingContainer: {
    marginBottom: 5,
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
    color: '#000000',
  },
  customButton: {
    backgroundColor: '#FFD700',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    marginBottom: 5,
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    width: 170,
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
    marginRight: -3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default DonationView;