import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
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
    navigation.navigate('FoodRegister');  };
  

    return (
      <ImageBackground source={require('./assets/nino.jpg')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.customButton} onPress={handleDonateMoney}>
            <Text style={styles.buttonText}>Donar Dinero</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customButton} onPress={handleTDonateFood}>
            <Text style={styles.buttonText}>Donar Comida</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
};  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    opacity: 0.7,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 20,
  },
  nameText: {
    fontSize: 24,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 5,
    marginTop: 5,
  },
  mainHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoBox: {
    borderWidth: 2,
    borderColor: '#000000',
    paddingTop: 10,  // Ajuste del padding superior
    paddingBottom: 10,  // Ajuste del padding inferior
    paddingHorizontal: 10,  // Padding horizontal
    width: '80%',
    marginBottom: 20,
    borderRadius: 15,
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
    marginBottom: 5,
    marginTop: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default DonationView;
