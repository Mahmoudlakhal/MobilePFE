import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Modal from 'react-native-modal';
import styles from './styles'; // Assuming you have a separate styles.js file
import { Picker } from '@react-native-picker/picker';
import settings, { Settings } from '../../config/settings';

const ListProject = () => {
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState(null);
  const [userChecked, setUserChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigation = useNavigation();

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
        setProjects(data);
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userChecked, user, refresh]);

  const handleUpdate = (project) => {
    setSelectedProject(project);
    setUpdateModalVisible(true);
  };

  const handleDelete = (project) => {
    // Handle project delete
    console.log("Delete project:", project);
  };

  const renderProjectItem = ({ item }) => (
    <View style={styles.projectItemContainer}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('ProjectTab', { Project: item, user: user })}
        style={styles.projectItem}
      >
        <Icon name="folder" size={20} color="#1F41BB" style={styles.projectIcon} />
        <Text style={styles.projectTitle}>{item.title}</Text>
      </TouchableOpacity>
      <Menu>
        <MenuTrigger>
          <Icon name="ellipsis-v" size={20} color="#1F41BB" style={styles.menuIcon} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => handleUpdate(item)}>
            <Text style={styles.menuOptionText}>Update</Text>
          </MenuOption>
          <MenuOption onSelect={() => handleDelete(item)}>
            <Text style={styles.menuOptionText}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Projets</Text>
      <FlatList
        data={projects}
        renderItem={renderProjectItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    
        <TouchableOpacity 
          style={styles.fab} 
          onPress={() => navigation.navigate('Projet', { onAddProject: () => setRefresh(!refresh) })}
        >
          <Icon name="plus" size={24} color="#fff" />
        </TouchableOpacity>
     
      <UpdateProjectModal
        isVisible={isUpdateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
        project={selectedProject}
        onUpdate={() => setRefresh(!refresh)}
      />
    </View>
  );
};

const UpdateProjectModal = ({ isVisible, onClose, project, onUpdate }) => {
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [typeProjet, setTypeProjet] = useState(project?.typeProjet || '');

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${settings.apiUrl}:8010/SpringMVC/projet/UpdateProjet/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, typeProjet }),
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error('Error response:', errorResponse);
        throw new Error(`HTTP error! Status: ${response.status} ${errorResponse}`);
      }

      const data = await response.json();
      console.log('Projet mis à jour avec succès:', data);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du projet:', error.message);
    }
  };

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Update Project</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          multiline
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <Picker
          selectedValue={typeProjet}
          style={styles.picker}
          onValueChange={setTypeProjet}
        >
          <Picker.Item label="AUCUNE_SELECTION" value="AUCUNE_SELECTION" />
          <Picker.Item label="INTEGRATION" value="INTEGRATION" />
          <Picker.Item label="DEVELOPPEMENT" value="DEVELOPPEMENT" />
          <Picker.Item label="CONTABILITE" value="CONTABILITE" />
          <Picker.Item label="ARCHITECTURAL" value="ARCHITECTURAL" />
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update Project</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ListProject;
