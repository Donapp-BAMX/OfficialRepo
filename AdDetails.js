import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';

const AdDetails = ({ route, navigation }) => {
  const { title, description } = route.params;

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title}>{title}</Card.Title>
        <Card.Divider />
        <Text style={styles.description}>{description}</Text>
        <Button
          title="Regresar"
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          //onPress={() => navigation.navigate('HomeScreen.js')}
          //quiero que me regrese a homsecreen.js
            onPress={() => navigation.goBack()}

        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '80%',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: 18,
    marginTop: 10,
    color: 'black',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'yellow',
    marginTop: 10, // Agregamos espacio entre el texto y el botón
  },
  buttonTitle: {
    color: 'red',
  },
});

export default AdDetails;
