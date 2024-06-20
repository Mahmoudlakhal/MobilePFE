import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListProject = () => {
  const [projects, setProjects] = useState([]);
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('User');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          console.log('User data:', userData);
          console.log('User roles:', userData.roles);
          const hasAdminRole = userData.roles.includes('ROLE_ADMIN');
          console.log('Is user an admin?', hasAdminRole);
          setIsAdmin(hasAdminRole);
          setUser(userDataString);
        } else {
          console.log('User data is not available');
        }

        const response = await fetch('http://192.168.1.14:8010/SpringMVC/projet/getAllProjet');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error.message);
      }
    };

    fetchData();
  }, [isAdmin]);

  const renderProjectItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('ProjectTab', { Project: item })}
      style={styles.projectItem}
    >
      <Text style={styles.projectTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={{ uri: 'https://example.com/background.jpg' }} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Liste des Projets</Text>
        {isAdmin && (
          <TouchableOpacity onPress={() => navigation.navigate('Projet')}>
            <View style={styles.addProject}>
              <Text style={styles.addProjectText}>
                <Icon name="plus" size={12} color="gray" style={styles.icon} /> Add Project
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <FlatList
          data={projects}
          renderItem={renderProjectItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </ImageBackground>
  );
};

export default ListProject;
