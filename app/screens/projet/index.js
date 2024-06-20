import React, { useState } from 'react';
import { View ,Button, Text, TextInput, TouchableOpacity, Alert} from 'react-native'; // Ajout d'Alert
import {ImageBackground}  from 'react-native';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'; // Import de useNavigation pour la navigation
import Icon from 'react-native-vector-icons/FontAwesome5';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddProject = () => {
  const [file, setFile] = useState(null);
 

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [typeProjet, setTypeProjet] = useState('AUCUNE_SELECTION');
  const [date_creation, setDateCreation] = useState('');

  const navigation = useNavigation();

  const handleAddProject = async () => {
  const userDataString = await AsyncStorage.getItem('User');
    console.log("sdvs",userDataString);
    
    // Vérification si tous les champs sont remplis
    if (!title || !description || typeProjet === 'AUCUNE_SELECTION') {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    if (!file) {
      Alert.alert('Erreur', 'Veuillez sélectionner un fichier');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date_creation', date_creation);

    formData.append('typeProjet', typeProjet);
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.name,
    });
    console.log("formDataformData",formData);

    try {
      const userDataString = await AsyncStorage.getItem('User');
      if (!userDataString) {
        console.error('No user data found');
        return;
      }
  
      const userData = JSON.parse(userDataString);
      const userId = userData.id;
  
      // Ensure formData is correctly formed
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('dateCreation', date_creation);
      formData.append('typeProjet', typeProjet);
      if (file) {
        formData.append('file', {
          uri: file.uri,
          name: file.name,
          type: file.type,
        });
      }
  
      const response = await fetch(`http://192.168.1.14:8010/SpringMVC/projet/addProjet/${userId}`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Projet ajouté avec succès:', data);
      setTitle('');
      setDescription('');
      setDateCreation('');
      setTypeProjet('AUCUNE_SELECTION');
      setFile(null);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du projet:', error.message);
    }
  };

  const uploadFileOnPressHandler = async () => {
    try {
      const pickedFile = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('pickedFile', pickedFile);
      setFile(pickedFile);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
      } else {
        console.error('Erreur lors de la sélection du fichier:', err);
        throw err;
      }
    }
  };
  
  return (
    <ImageBackground source={require('../assets/backgroundBleu.jpg')} style={styles.background}>

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

       <Button title="file" onPress={async () => {
              uploadFileOnPressHandler();
          }} />

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