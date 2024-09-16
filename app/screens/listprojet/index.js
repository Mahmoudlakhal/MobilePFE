import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, TextInput, ActivityIndicator, Alert , Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import styles from './styles'; // Assuming you have a separate styles.js file
import Modal from "react-native-modal";
import { Picker } from '@react-native-picker/picker';
import settings, { Settings } from '../../config/settings';
const ListProject = () => {
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState(null);
  const [userChecked, setUserChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateTypeProjet, setUpdateTypeProjet] = useState('AUCUNE_SELECTION');
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null); // Add state for current project ID
  console.log('stttt',settings.apiUrl);
  
  const checkUser = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('User');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUser(userData);
        const hasAdminRole = userData.roles.includes('ROLE_ADMIN');
        setIsAdmin(hasAdminRole);
      } else {
        setUser(null);
      }
      setUserChecked(true);
    } catch (error) {
      console.error('Error reading user data from AsyncStorage:', error.message);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!userChecked || !user) return;

      try {
        const response = await fetch(`${settings.apiUrl}:8010/SpringMVC/projet/getProjetsByIdUser/${user.id}`);
        const data = await response.json();
          console.log('datadata',JSON.stringify(data,null , 2 ));
          
        setProjects(data);
      } catch (error) {
        console.error('Erreur lors du chargement des projets:1', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userChecked, user, refresh]);

  const handleUpdate = (project) => {
    setUpdateTitle(project.title);
    setUpdateDescription(project.description);
    setUpdateTypeProjet(project.typeProjet);
    setUpdateModalVisible(true);
    setCurrentProjectId(project.id); // Set current project ID
  };

  const handleUpdateSubmit = async () => {
    if (!currentProjectId) return;
  
    try {
      console.log(`Updating project with ID: ${currentProjectId}`);
      console.log(`Payload:`, {
        title: updateTitle,
        description: updateDescription,
        typeProjet: updateTypeProjet,
        date_creation: new Date().toISOString().split('T')[0],
      });

      const response = await fetch(`${settings.apiUrl}:8010/SpringMVC/projet/UpdateProjet/${currentProjectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updateTitle,
          description: updateDescription,
          typeProjet: updateTypeProjet,
          date_creation: new Date().toISOString().split('T')[0],
        }),
      });

      if (response.ok) {
        console.log('resssssss',response);
        const updatedProject = await response.json();
        setProjects((prevProjects) => prevProjects.map((project) =>
          project.id === updatedProject.id ? updatedProject : project
        ));
        setUpdateModalVisible(false);
        Alert.alert('Success', 'Project updated successfully');
      } else {
        console.error('Failed to update project:', response.status, response.statusText);
        Alert.alert('Error', 'Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error.message);
      Alert.alert('Error', 'Error updating project');
    }
  };

  const deleteProject = async (projectId) => {
    try {
      const response = await fetch(`${settings.apiUrl}:8010/SpringMVC/projet/DeleteProjet/${projectId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
        Alert.alert('Success', 'Project deleted successfully');
      } else {
        console.error('Failed to delete project:', response.statusText);
        Alert.alert('Error', 'Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error.message);
      Alert.alert('Error', 'Error deleting project');
    }
  };

  const handleDelete = (project) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this project?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => deleteProject(project.id),
          style: "destructive"
        }
      ]
    );
  };

  const renderProjectItem = ({ item }) => (
   
    
    <View style={styles.projectItemContainer}>
    <TouchableOpacity 
        onPress={() => navigation.navigate('ProjectTab', { Project: item, user: user })}
        style={styles.projectItem}
      >
        <Image
    source={{ uri: `${settings.apiUrl}:8010/SpringMVC/projet/file/${item?.icon}` }}
    
    style={{borderWidth:1 ,borderColor:'#fff', width:70, height:70 , borderRadius:8 , marginRight:25}}
/>
      
        <Text style={styles.projectTitle}>{item.title}</Text>
        {user.id==item.id_user&&(  <Menu>
          <MenuTrigger>
            <Icon name="ellipsis-v" size={20} color="#000" />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => handleUpdate(item)}>
              <View style={styles.menuOption}>
                <Icon name="edit" size={20} color="#1A73E8" style={styles.menuIcon} />
                <Text style={styles.menuOptionText}>Update</Text>
              </View>
            </MenuOption>
            <MenuOption onSelect={() => handleDelete(item)}>
              <View style={styles.menuOption}>
                <Icon name="trash" size={20} color="#E21717" style={styles.menuIcon} />
                <Text style={styles.menuOptionText}>Delete</Text>
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>)}
      
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground source={require('../assets/backgroundBleu.jpg')} style={styles.background}>
   
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View  style={styles.container}>
           <Text style={styles.title}>Liste des Projets</Text>
        <FlatList
          data={projects}
          renderItem={renderProjectItem}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={() => setRefresh(!refresh)}
          refreshing={loading}
        />
        <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('Projet', { onAddProject: () => setRefresh(!refresh) })}
      >
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity></View>
      )}

      <Modal isVisible={isUpdateModalVisible}>
        <View style={styles.modalContent}>


        <TouchableOpacity
      style={styles.closeButton}
      onPress={() => setUpdateModalVisible(false)}
    >
      <Icon name="times" size={14} color="#fff" />
    </TouchableOpacity>



          <Text style={styles.modalTitle}>Update Project</Text>



          <Text style={{marginTop:10 , fontSize:15 , fontWeight:"bold" , color:"black"}}>Project title :</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={updateTitle}
            onChangeText={setUpdateTitle}
          />
          <Text style={{marginTop:10 , fontSize:15 , fontWeight:"bold" , color:"black"}}>Project description :</Text>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={updateDescription}
            onChangeText={setUpdateDescription}
          />
         <Text style={{marginTop:10 , fontSize:15 , fontWeight:"bold" , color:"black"}}>Choisir type de projet :</Text>

          <Picker
            selectedValue={updateTypeProjet}
            onValueChange={(itemValue) => setUpdateTypeProjet(itemValue)}
            style={{
              
              width: '100%',
              marginBottom: 15,
              padding: 10,
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 10,
              backgroundColor: '#f0f0f0',

            }}
          >
            <Picker.Item label="Select Type" value="AUCUNE_SELECTION" />
            <Picker.Item label="Formation" value="FORMATION" />
            <Picker.Item label="Développement" value="DEVELOPPEMENT" />
          </Picker>
          <View style={styles.buttonContainer}>
          <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.fullWidthButton} onPress={handleUpdateSubmit}>
        <Text style={styles.buttonText}>Update</Text>
    </TouchableOpacity>
</View>
</View>


        </View>
      </Modal>
   
    </ImageBackground>
  );
};

export default ListProject;
