import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import styles from './styles'; // Importer les styles depuis styles.js

const TaskDetails = ({ route }) => {
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch('http://192.168.1.14:8010/SpringMVC/task/getTask/11')
      .then(response => response.json())
      .then(data => {
        console.log('Réponse de l\'API:', data);
        if (data) {
          setTask(data);
        } else {
          console.warn('Aucune donnée de tâche disponible');
        }
      })
      .catch(error => {
        console.error('Erreur lors du chargement des détails des tâches:', error.message);
      });
  }, []);

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        {task && (
          <View style={styles.taskContainer}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.detailText}>Le projet: {task.projet.title}</Text>
            <Text style={styles.detailText}>Description: {task.decription}</Text>
            <Text style={styles.detailText}>État du task: {task.etat}</Text>
            <Text style={styles.detailText}>Créé le:  {task.timeTask}</Text>
            <Text style={styles.detailText}>Domaine: {task.taskType}</Text>
            <Text style={styles.detailText}>Heures de travail: {task.timepoinage}</Text>
            <Text style={styles.detailText}>Complexité: {task.complexity}</Text>
            <Text style={styles.detailText}>Début de mission: {task.messionStrat}</Text>
            <Text style={styles.detailText}>Fin du mission: {task.messionEnd}</Text>
            <Text style={styles.detailText}>Priorité: {task.priority}</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default TaskDetails;
