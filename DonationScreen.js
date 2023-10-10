import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

function DonationView() {
  const navigation = useNavigation();

  const handleDonateMoney = () => {
    navigation.navigate('Cart'); // Assuming you have a 'Cart' screen defined for your 'cart' component
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
