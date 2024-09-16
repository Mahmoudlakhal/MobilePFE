import React, { useState } from 'react';
import { View, Button, Text, TextInput, TouchableOpacity, Alert, ImageBackground,ActivityIndicator } from 'react-native';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { withDecay } from 'react-native-reanimated';
import messaging from '@react-native-firebase/messaging';
import settings, { Settings } from '../../config/settings';

const AddProject = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [loader, setLoader] = useState(false);

  const [description, setDescription] = useState('');
  const [typeProjet, setTypeProjet] = useState('AUCUNE_SELECTION');
  const navigation = useNavigation();
  const route = useRoute();
  const { onAddProject } = route.params || {};
  const handleButtonPress = async () => {
    // Logic to open a modal or dropdown to select complexity
    // For example purposes, we'll cycle through values
 console.log("hqndlebttonpress");
 
    setDescription("")
    if(
      title ==''){
      Alert.alert('Error', 'You must choose title as first to generqte description !');

    }
   else {
    console.log( "title", title);

      try {
        setLoader(true)
        // Replace with your API endpoint URL
        const apiUrl = `${settings.apiUrl}:5001/generate`;
        
        // Make the API call using fetch
        const apiResponse = await fetch(apiUrl, {
          method: 'POST', // Use 'PUT' if you are updating an existing resource
          headers: {
            'Content-Type': 'application/json',
            // Include any other headers you need
          },
          body: JSON.stringify({
            "title": title,
          })
        });
        console.log("before log apiResponse");

      console.log("apiResponse",apiResponse);
      
        // Handle the response
        if (apiResponse.ok) {
          
          // Convert response to JSON
          const responseData = await apiResponse.json();
          setDescription(responseData.description);
          setLoader(false)
          console.log('All is good.', responseData); // Access the actual response data here
        } else {
          setLoader(false)
          console.error('Failed to update FCM token:', apiResponse.statusText);
        }
      } catch (error) {
        setLoader(false)
        console.error('Error while calling the API:', error);
      }
   }
  };
  const handleAddProject = async () => {
    console.log("qjouttttt");
    
    // Vérification si tous les champs sont remplis
    if (!title || !description || typeProjet === 'AUCUNE_SELECTION') {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    if (!file) {
      Alert.alert('Erreur', 'Veuillez sélectionner un fichier');
      return;
    }

    try {
      const userDataString = await AsyncStorage.getItem('User');
      if (!userDataString) {
        console.error('No user data found');
        return;
      }

      const userData = JSON.parse(userDataString);
      const userId = userData.id;

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('typeProjet', typeProjet);

      // Formater la date en 'yyyy-MM-dd'
      const date = new Date();
      const formattedDate = date.toISOString().split('T')[0];
      formData.append('date_creation', formattedDate); // Ajouter la date actuelle

      if (file) {
        formData.append('file', {
          uri: file.uri,
          name: file.name,
          type: file.type || 'application/octet-stream',
          
        });
      }

      console.log('FormData being sent:', formData);

      const response = await fetch(`${settings.apiUrl}:8030/GESTIONTASK/SpringMVC/projet/addProjet/${userId}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error('Error response:', errorResponse);
        throw new Error(`HTTP error! Status: ${response.status} ${errorResponse}`);
      }

      console.log('reeeeeeeeeeeeeeee',response);
      

      const data = await response.json();
      console.log('Projet ajouté avec succès:', data);
      setTitle('');
      setDescription('');
      setTypeProjet('AUCUNE_SELECTION');
      setFile(null);

      // Appel du rappel pour rafraîchir la liste des projets
      if (onAddProject) onAddProject();






      navigation.navigate('Listprojet') // Retour à la liste des projets
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
        console.log('Annulation de la sélection du fichier');
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

       
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Titre"
            value={title}
            onChangeText={text => setTitle(text)}
          />

<View style={{ flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,}}>
   <TouchableOpacity 
  style={{
    
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 34,
    borderColor:'blue', backgroundColor: '#f0f0f0',
    marginRight: 10,

  

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25, // Reduced shadow opacity for a subtler appearance
    shadowRadius: 6, // Increased shadow radius
    elevation: 8,
  }}
  onPress={handleButtonPress}
>
  <Icon 
    name="robot" // AI-related icon name
    size={20} 
    color="blue" 
  />
</TouchableOpacity>
      <View style={{  
    paddingVertical: 8,
    paddingHorizontal: 1,
    borderRadius: 4,
    flexGrow: 1,}}>
         <Text style={{color:"black"}}>Use AI to generate new description :</Text>
         </View>
    </View>
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
            onValueChange={(itemValue) => setTypeProjet(itemValue)}
          >
            <Picker.Item label="AUCUNE_SELECTION" value="AUCUNE_SELECTION" />
            <Picker.Item label="INTEGRATION" value="INTEGRATION" />
            <Picker.Item label="DEVELOPPEMENT" value="DEVELOPPEMENT" />
            <Picker.Item label="CONTABILITE" value="CONTABILITE" />
            <Picker.Item label="ARCHITECTURAL" value="ARCHITECTURAL" />
          </Picker>
          <Button title="Select File" onPress={uploadFileOnPressHandler} />
          <TouchableOpacity style={styles.button} onPress={handleAddProject}>
            <Text style={styles.buttonText}>Ajouter le projet</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack('Listprojet')}>
            <View style={styles.list}>
              <Text style={styles.listProjetText}>
                <Icon name="chevron-left" size={13} color="gray" style={styles.icon} /> Go back
              </Text>
            </View>
          </TouchableOpacity>
        </View>


        {loader && (
        <ActivityIndicator size="large" color="#0000ff"  style={{position:'absolute' ,alignSelf:"center"}}/>
      )}
      </View>
    </ImageBackground>
  );
};

export default AddProject;
