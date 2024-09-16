import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import settings, { Settings } from '../../config/settings';

const Register = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  // Function to select an image from the gallery
  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        };
        setImage(source);
      }
    });
  };

  // Function to validate email format
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Function to validate phone number format
  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+\d{11,15}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    setIsLoading(true);

    // Basic input validation
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a username.');
      setIsLoading(false);
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      setIsLoading(false);
      return;
    }
    if (!phoneNumber.trim() || !validatePhoneNumber(phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      setIsLoading(false);
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter a password.');
      setIsLoading(false);
      return;
    }

    // Preparing the form data
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('password', password);
    if (image) {
      formData.append('file', {
        uri: image.uri,
        name: image.name,
        type: image.type,
      });
    }

    // Sending data to the backend
    try {
      const response = await fetch(`${settings.apiUrl}:8050/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Utilisateur ajouté avec succès:', data);
      Alert.alert('Utilisateur ajouté avec succès');

      // Clear input fields after successful submission
      setUsername('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
      setImage(null);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error.message);
      Alert.alert('Erreur lors de l\'ajout de l\'utilisateur:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../assets/backgroundBleu.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={require('../assets/agtialogo.png')} style={styles.image} />

          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#007BFF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur"
              value={username}
              onChangeText={text => setUsername(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="at" size={20} color="#007BFF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#007BFF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color="#007BFF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Numéro de téléphone"
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
              keyboardType="phone-pad"
            />
          </View>

          {/* Button to select image */}
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={selectImage} style={styles.button}>
              <Text style={styles.buttonText}>Votre image</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image.uri }} style={{ width: 100, height: 100, marginTop: 10 }} />}
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
          )}

          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Vous avez déjà un compte ? Connectez-vous</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Register;
