import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, ImageBackground } from 'react-native'; // Importer ImageBackground
import styles from './styles';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logique de connexion ici
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
   // <ImageBackground source={require('./mobeliteMonastir.png')} style={styles.backgroundImage}>

      <View style={styles.container}>
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

        <Button title=" Login " onPress={handleLogin} />
        <View style={styles.linksContainer}>
           <Text></Text>
          <TouchableOpacity>
          <Text> have no account? <Text style={[styles.link, styles.createAccount]}> Create account</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
      
  //  </ImageBackground>
  );
};

export default LoginScreen;
