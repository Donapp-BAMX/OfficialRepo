import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';

const AdDetails = ({ route, navigation }) => {
  const { title, description } = route.params;

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title}>{title}</Card.Title>
        <Card.Divider />
        <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={styles.customButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
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
    width: '90%',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    marginTop: 0,
    marginBottom: 3,
    color: 'black',
    textAlign: 'center',
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
    marginTop: 10,
    marginBottom: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default AdDetails;
