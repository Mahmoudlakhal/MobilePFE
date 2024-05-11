import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './styles';
import axios from 'axios';
const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [functionalite, setFunctionalite] = useState('');
  const [privileges, setPrivileges] = useState('');
  const [projectRole, setProjectRole] = useState('');

  const handleSubmit = () => {
    // Prepare user data
    const userData = {
      firstName,
      lastName,
      image,
      email,
      password,
      functionalite,
      privileges,
      projectRole
    };
  
    
 
  };
  


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom de famille"
        value={lastName}
        onChangeText={text => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Image"
        value={image}
        onChangeText={text => setImage(text)}
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
        placeholder="Fonctionnalité"
        value={functionalite}
        onChangeText={text => setFunctionalite(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Privilèges"
        value={privileges}
        onChangeText={text => setPrivileges(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Rôle dans le projet"
        value={projectRole}
        onChangeText={text => setProjectRole(text)}
      />
      <Button
        title="S'inscrire"
        onPress={handleSubmit}
      />
    </View>
  );
};

export default Register;
