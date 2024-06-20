//index.js
import React, { useState } from 'react';
import { View, Text, TextInput,ImageBackground, TouchableOpacity, Alert, ActivityIndicator ,Image} from 'react-native';
import styles from './styles';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    const userData = { username, email, phoneNumber, password };

    try {
      const response = await fetch('http://192.168.1.14:8050/Admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        Alert.alert('Utilisateur ajouté avec succès');
      }

      const data = await response.json();
      console.log('Utilisateur ajouté avec succès:', data);

      setUsername('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error.message);
      Alert.alert('Erreur lors de l\'ajout de l\'utilisateur:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>

          <ImageBackground source={require('../assets/backgroundBleu.jpg')} style={styles.background}>

            <Image source={require('../assets/agtialogo.png')} style={styles.image} />

      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Numéro de téléphone"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
      )}
   </ImageBackground>

    </View>
  );
};

export default Register;
