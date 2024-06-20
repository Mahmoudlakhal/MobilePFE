import React, { useState } from 'react';
import { View, TextInput, ImageBackground,Text, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importer useNavigation
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import Modal from "react-native-modal";

const LoginScreen = () => {
  const navigation = useNavigation(); // Initialiser la navigation
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ModalVisibility, setModalVisibility] = useState(false);
  const [email, setEmail] = useState('');
const handleforgotpasseword = async ()=>{
   console.log('ok');
  setModalVisibility(true)
}
const handleCancel = () => {
  setModalVisibility(false);
};

const handleSubmit = async () => {
  console.log('Email submitted:', email);
  setIsLoading(true);

  try {
    // Create FormData object and append the email
    const formData = new FormData();
    formData.append('email', email);

    const response = await fetch('http://192.168.1.14:8050/auth/forgetpassword', {
      method: 'POST',
      body: formData,
      headers: {
        // Note: 'Content-Type': 'multipart/form-data' is set automatically by FormData
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Check your Mail:', data);

    if (data.user && data.user.length > 0) {
      Alert.alert(data.user);
    } else {
      Alert.alert(
        'Success to send token',
        data.user,
        [
          {
            text: 'OK', onPress: () => {
              if (data.user === 'user not found') {
                return;
              } else {
                setModalVisibility(false);
              }
            }
          }
        ],
        { cancelable: false }
      );
    }
  } catch (error) {
    console.error('Error:', error);
    Alert.alert('Error:', error.message);
  } finally {
    setIsLoading(false);
  }
};

  const handleLogin = async () => {
    setIsLoading(true);

    const userData = {
      username,
      password,
    };

    try {
      const response = await fetch('http://192.168.1.14:8050/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('User ajouté avec succès:', data);

      if (data.message && data.message.length > 0) {
        Alert.alert(data.message);
      } else {
        Alert.alert(
          'Success logged in',
          data.email,
          [
            { text: 'OK', onPress: () => navigation.replace('Listprojet') }, // Naviguer vers Listprojet
          ],
          { cancelable: false }
        );

        await AsyncStorage.setItem('User', JSON.stringify(data));
      }

      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du user:', error);
      Alert.alert('Erreur lors de l\'ajout du user:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
              <ImageBackground source={require('../assets/backgroundBleu.jpg')} style={styles.background}>

      <Image source={require('../assets/agtialogo.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleforgotpasseword} style={{alignSelf:'flex-end', marginRight:50}}><Text style={{color:'#ffffff'}} >Forgot passeword</Text>
      </TouchableOpacity>
            

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.linksContainer}>
        <Text style={styles.linkText}>
          Have no account? <Text style={styles.createAccount}>Create account</Text>
        </Text>
      </View>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      </ImageBackground>



      <Modal
      animationType="slide"
      transparent={true}
      visible={ModalVisibility}
      onRequestClose={handleCancel}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Enter your email to reset your password</Text>
        <TextInput
          style={styles.modalinput}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.ModalbuttonContainer}>
          <TouchableOpacity
            onPress={handleCancel}
            style={[styles.modalbutton, styles.modalcancelButton]}
          >
            <Text style={styles.modalbuttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.modalbutton, styles.modalsubmitButton]}
          >
            <Text style={styles.modalbuttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
</View>
  );
};

export default LoginScreen;
