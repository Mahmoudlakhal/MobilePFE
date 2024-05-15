import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert, Button } from 'react-native';
import styles from './styles';
import { KanbanBoard, ColumnModel, CardModel } from '@intechnity/react-native-kanban-board';
import { useNavigation } from '@react-navigation/native'; // Import de useNavigation pour la navigation
import Modal from "react-native-modal";
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

    const ProjectTab = ({ route }) => {
    const { Project } = route.params;
    const [tasks, setTasks] = useState([]);
    const [detailtaskVisibility, setDetailtaskVisibility] = useState(false);
    const [task, setTask] = useState({});
    const [forceUpdate, setForceUpdate] = useState(false);
    useEffect(() => {
        setForceUpdate(prev => !prev);
    }, [cards]);
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`http://192.168.1.14:8010/SpringMVC/task/getTasksByProject/${Project.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Erreur lors du chargement des projets:', error.message);
            }
        };

        fetchTasks();
    }, []);
    useEffect(() => {
        console.log('taskkk',task);
        console.log('taskkk', cards);

    }, [cards,task]);
    useEffect(() => {
        const newCards = tasks.map(task => {
            return new CardModel(
                task.id.toString(), // Use task id as card id
                task.etat, // Use task state as column id
                task.title, // Card title
                task.decription, // Card description (change as per your requirement)
                `Task ID: ${task.id}`, // Example description (customize as per your requirement)
                [],
                null,
                1
            );
        });
        setCards(newCards);
    }, [tasks]);

    const [columns, setColumns] = useState([
        new ColumnModel("ETAT_A_FAIRE", "A Faire", 1),
        new ColumnModel("ETAT_ENCOURS", "En Cours", 2),
        new ColumnModel("ETAT_TERMINE", "Termine", 3),
        new ColumnModel("PROMLEME", "Probléme", 3),

    ]);

    const [cards, setCards] = useState([]);
    const navigation = useNavigation();
    const addNewCard = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    
        try {
            // Make POST request to create a new task
            const response = await fetch(`http://192.168.1.14:8010/SpringMVC/task/addTaskByProject/${Project.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    projectId: Project.id,
                    title: 'New Task', // Provide default title or other necessary details
                    decription: 'New Task Description',
                    piecejoint:'',
                    etat:'ETAT_A_FAIRE',
                    priority:'AUCUNE_SELECTION',
                    taskType:'AUCUNE_SELECTION',
                    complexity:'AUCUNE_SELECTION',
                    messionStrat:formattedDate,
                    messionEnd:formattedDate,
                    timepoinage:''
                    // Add other necessary properties
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to create new task');
            }
    
            // Fetch the updated list of tasks
            const updatedResponse = await fetch(`http://192.168.1.14:8010/SpringMVC/task/getTasksByProject/${Project.id}`);
            if (!updatedResponse.ok) {
                throw new Error('Failed to fetch updated tasks');
            }
            const updatedData = await updatedResponse.json();
    
            // Map the updated tasks to new cards
            const newCards = updatedData.map(task => {
                return new CardModel(
                    task.id.toString(),
                    task.etat,
                    task.title,
                    task.decription,
                    `Task ID: ${task.id}`,
                    [],
                    null,
                    1
                );
            });
        
            // Update the cards state with the new cards
         await   setCards(newCards);
    
            // Optionally, display a success alert
            Alert.alert('Success', 'New card added successfully');
        } catch (error) {
            console.error('Error adding new card:', error.message);
            // Display an error alert
            Alert.alert('Error', 'Failed to add new card');
        }
    };
    
    const deleteTask = (taskId) => {
        fetch(`http://192.168.1.14:8010/SpringMVC/task/deleteTask/${taskId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                console.log('Task deleted successfully');
                // Update the cards state to remove the deleted task
                setCards(prevCards => prevCards.filter(card => card.id !== taskId));
            } else {
                console.error('Failed to delete task');
            }
        })
        .catch(error => {
            console.error('Error deleting task:', error);
        });
    };
    
    const showDeleteConfirmation = () => {
        Alert.alert(
          'Confirmer la suppression',
          'Êtes-vous sûr de vouloir supprimer cette tâche ?',
          [
            {
              text: 'Annuler',
              onPress: () => console.log('Annulation de la suppression'),
              style: 'cancel',
            },
            {
              text: 'Supprimer',
              onPress: () => {
                deleteTask(task.id);
                setDetailtaskVisibility(false);
                console.log('Tâche supprimée');
              },
            },
          ],
          { cancelable: true }
        );
      };

    const onCardDragEnd = async (srcColumn, destColumn, item, cardIdx) => {
        try {
            console.log('ittem',item.id);
            const response = await fetch(`http://192.168.1.14:8010/SpringMVC/task/updateTask/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ etat: destColumn.id }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update task');
            }
            Alert.alert(
                'Card finished dragging',
                `Item: ${item.id} \nFrom column: ${srcColumn.id} \nTo column: ${destColumn.id} \nCard index: ${cardIdx}`
            );
        } catch (error) {
            console.error('Error updating task:', error.message);
            Alert.alert('Error', 'Failed to update task');
        }
    };
    
    const onCardPress = async (card) => {

       console.log('item in card press',card.id);
       console.log('caaaard',card);
       setDetailtaskVisibility(true);

       fetch(`http://192.168.1.14:8010/SpringMVC/task/getTask/${card.id}`)
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
    };

    console.log('my task',task);

    return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
        <View style={styles.container}>
            <Text style={styles.title2}>{Project.title}</Text>

          <View style={styles.actionsContainer}>

                <TouchableOpacity onPress={addNewCard} style={styles.addButtonContainer}>
                 <Icon name="plus" size={20} color="white" style={styles.icon} />   
                 <Text style={styles.buttonText}>Add new card</Text>
                </TouchableOpacity>
          </View>
                <KanbanBoard
                    columns={columns}
                    cards={cards}
                    onDragEnd={(srcColumn, destColumn, item, targetIdx) => onCardDragEnd(srcColumn, destColumn, item, targetIdx)}
                    onCardPress={(item) => onCardPress(item)}
                    style={styles.kanbanStyle}
                    forceUpdate={forceUpdate}
                />

        </View>
            
     <Modal
            isVisible={detailtaskVisibility}
            onSwipeComplete={() => {     
              setDetailtaskVisibility(false);
              setTask()
            }}
            swipeDirection={['down']}
            backdropOpacity={0.5}
            style={styles.modal}>

  <View style={styles.modalContent}>

  <View style={styles.contentSwipeDown}>
    <View style={styles.lineSwipeDown} />
  </View>
  <ScrollView contentContainerStyle={styles.container}>

    <Text style={styles.title}>Task Details</Text>
    {task?.title && <Text style={styles.detail}>Titre: {task?.title}</Text>}
    {task?.cle_projet && <Text style={styles.detail}>Clé Projet: {task?.cle_projet}</Text>}
    {task?.description && <Text style={styles.detail}>Description: {task?.description}</Text>}
    {task?.etat && <Text style={styles.detail}>État du Task: {task?.etat}</Text>}
    {task?.timeTask && <Text style={styles.detail}>Créé le: {task?.timeTask}</Text>}
    {task?.taskType && <Text style={styles.detail}>Domaine: {task?.taskType}</Text>}
    {task?.timepoinage && <Text style={styles.detail}>Heures de travail: {task?.timepoinage}</Text>}
    {task?.complexity && <Text style={styles.detail}>Complexité: {task?.complexity}</Text>}
    {task?.messionStrat && <Text style={styles.detail}>Début de mission: {task?.messionStrat}</Text>}
    {task?.messionEnd && <Text style={styles.detail}>Fin de mission: {task?.messionEnd}</Text>}
    {task?.priority && <Text style={styles.detail}>Priorité: {task?.priority}</Text>}

    <View style={styles.buttonContainer}>

       <TouchableOpacity style={styles.button2} onPress={() => showDeleteConfirmation()}>
       <Icon name="trash" size={20} color="white" style={styles.icon} />  
       <Text style={styles.buttonText}>Delete Task</Text>
       </TouchableOpacity>

       <View style={{ marginHorizontal: 10 }}></View>
    
      <TouchableOpacity style={styles.button3} onPress={() => navigation.navigate('Task', { taskId: task.id })}>
      <Icon name="edit" size={20} color="white" style={styles.icon} />  
      <Text style={styles.buttonText}>Update Task</Text>
      </TouchableOpacity>

     </View>

    </ScrollView>

   </View>

   </Modal>
</ImageBackground>
    );
};

export default ProjectTab;
