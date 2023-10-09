import React from 'react';
import { View, Text, Button } from 'react-native';
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
    <View>
      <Text id='Title'>Pestaña de Donaciones</Text>
      <Button class='Boton' title="Donar Dinero" onPress={handleDonateMoney} />
      <Button class='Boton' title="Donar Comida" onPress={handleTDonateFood} />
    </View>
  );
};  

export default DonationView;
