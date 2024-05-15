import React, { useState } from 'react';
import { View , Text, TextInput, TouchableOpacity, Alert} from 'react-native'; // Ajout d'Alert
import {ImageBackground}  from 'react-native';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'; // Import de useNavigation pour la navigation
import Icon from 'react-native-vector-icons/FontAwesome5';

const AddProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [typeProjet, setTypeProjet] = useState('AUCUNE_SELECTION');
  const navigation = useNavigation();
  const handleAddProject = () => {
    // Vérification si tous les champs sont remplis
    if (!title || !description || typeProjet === 'AUCUNE_SELECTION') {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const projet = {
      title,
      description,
      typeProjet,
     // date_creation,
    };

    fetch('http://192.168.1.14:8010/SpringMVC/projet/addProject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projet)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Projet ajouté avec succès:', data);
      setTitle('');
      setDescription('');
      setTypeProjet('AUCUNE_SELECTION');
    })
    .catch(error => {
      console.error('Erreur lors de l\'ajout du projet:', error.message);
    });
  };

  return (
    <ImageBackground source={require('../assets/agtia.png')} style={styles.background}>

    <View style={styles.container}>

      <Text style={styles.title}>Create New Project</Text>
      <TextInput
        style={styles.input}
        placeholder="Titre"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        multiline={true}
        placeholder="Description"
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <Picker
        selectedValue={typeProjet}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setTypeProjet(itemValue)}>

        <Picker.Item label="AUCUNE_SELECTION" value="AUCUNE_SELECTION" />
        <Picker.Item label="INTEGRATION" value="INTEGRATION" />
        <Picker.Item label="DEVELOPPEMENT" value="DEVELOPPEMENT" />
        <Picker.Item label="CONTABILITE" value="CONTABILITE" />
        <Picker.Item label="ARCHITECTURAL" value="ARCHITECTURAL" />


      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleAddProject}>
        <Text style={styles.buttonText}>Ajouter le projet</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Listprojet')}>
       <View style={styles.list}>
        <Text style={styles.listProjetText}><Icon name="chevron-left" size={13} color="gray" style={styles.icon} /> Your Projects</Text>
       </View>
      </TouchableOpacity>

    </View>
    </ImageBackground>
  );
};

export default AddProject;