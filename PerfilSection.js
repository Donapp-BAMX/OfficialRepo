// PerfilSection.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from './authContext';
import { getUserInformation, logoutUser } from './firebase';

const PerfilSection = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (currentUser) {
      getUserInformation(currentUser)
        .then((userData) => {
          setUserData(userData);
        })
        .catch((error) => {
          console.error('Error fetching user information:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentUser]);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
      <Image source={require('./assets/giph.gif')} style={{ width: 200, height: 200 }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('./assets/perfil.png')} style={styles.profileImage} />
      <Text style={styles.mainHeading}>{userData.name}{userData.lastName}</Text>

      <View style={styles.infoBox}>

      <View style={styles.emailContainer}>
      <Text style={styles.descriptionTwo}>Email</Text>
      <Text style={styles.emailValue}>{userData.email}</Text>
      </View>

      <View style={styles.emailContainer}>
      <Text style={styles.descriptionTwo}>Bio</Text>
      <Text style={styles.emailValue}>{userData.biography}</Text>
      </View>

      <View style={styles.emailContainer}>
      <Text style={styles.descriptionTwo}>Fecha de Regist</Text>
      <Text style={styles.emailValue}>{userData.registeredAt.toDate().toISOString().substring(0, 10)}</Text>
      </View>
      </View>

      <TouchableOpacity style={styles.customButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
  descriptionTwo: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 5,
    marginTop: 5,
    fontWeight: 'bold',
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
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  emailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  emailValue: {
    fontSize: 16,
    textAlign: 'right',
  }
});

export default PerfilSection;
