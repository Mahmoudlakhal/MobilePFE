import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity  ,ImageBackground} from 'react-native'; // Import de FlatList pour afficher une liste
import styles from './styles';
import { useNavigation } from '@react-navigation/native'; // Import de useNavigation pour la navigation
import Icon from 'react-native-vector-icons/FontAwesome5';

const ListProject = () => {
  const [projects, setProjects] = useState([]);
  const navigation = useNavigation(); // Utilisation de useNavigation pour la navigation

  
  useEffect(() => {
    // Fonction pour charger la liste des projets lors du chargement initial
    fetch('http://192.168.1.14:8010/SpringMVC/projet/getAllProjet')
      .then(response => response.json())
      .then(data => {
        // Mise à jour de l'état avec les données des projets
        setProjects(data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des projets:', error.message);
      });
  }, []); // [] indique que cet effet ne s'exécute qu'une seule fois lors du montage initial

  const renderProjectItem = ({ item }) => (
    // Fonction pour afficher un élément de la liste des projets
    <TouchableOpacity    onPress={() =>
        navigation.navigate('ProjectTab', {Project: item})
      }style={styles.projectItem}>
      <Text style={styles.projectTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Liste des Projets</Text>

    <TouchableOpacity onPress={() => navigation.navigate('Projet')}>
       <View style={styles.addProject}>
        <Text style={styles.addProjectText}><Icon name="plus" size={12} color="gray" style={styles.icon} /> Add Project</Text>
       </View>
    </TouchableOpacity>



      <FlatList
        data={projects}
        renderItem={renderProjectItem}
        keyExtractor={item => item.id.toString()} // Utilisez une clé unique pour chaque élément de la liste
      />
    </View>
  );
};

export default ListProject;
