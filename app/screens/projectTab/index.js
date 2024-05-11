import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert, Button } from 'react-native';
import styles from './styles';
import { KanbanBoard, ColumnModel, CardModel } from '@intechnity/react-native-kanban-board';

const ProjectTab = ({ route }) => {
    const { Project } = route.params;
    const [tasks, setTasks] = useState([]);

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
        const newCards = tasks.map(task => {
            return new CardModel(
                task.id.toString(), // Use task id as card id
                task.etat, // Use task state as column id
                task.title, // Card title
                task.title, // Card description (change as per your requirement)
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





    const addNewCard = async () => {
        // Get the current date
    const currentDate = new Date();
    
    // Format the current date as "YYYY-MM-DD"
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
                    description: 'New Task Description',
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
                    task.title,
                    `Task ID: ${task.id}`,
                    [],
                    null,
                    1
                );
            });
    
            // Update the cards state with the new cards
            setCards(newCards);
    
            // Optionally, display a success alert
            Alert.alert('Success', 'New card added successfully');
        } catch (error) {
            console.error('Error adding new card:', error.message);
            // Display an error alert
            Alert.alert('Error', 'Failed to add new card');
        }
    };
    
    
    




   /* const addNewCard = () => {
        const newCard = new CardModel(
            "Generated card",
            "todo",
            "New card " + exampleCardNo++,
            "Example card44",
            "Some description",
            [],
            null,
            1
        );

        setCards([...cards, newCard]);
    };
*/
    const onCardDragEnd = async (srcColumn, destColumn, item, cardIdx) => {
        try {
            console.log('ittem',item.id);
            // Make PUT request to update task's state
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
    
            // Display alert after successful update
            Alert.alert(
                'Card finished dragging',
                `Item: ${item.id} \nFrom column: ${srcColumn.id} \nTo column: ${destColumn.id} \nCard index: ${cardIdx}`
            );
        } catch (error) {
            console.error('Error updating task:', error.message);
            // Optionally, display an error alert
            Alert.alert('Error', 'Failed to update task');
        }
    };
    

    const onCardPress = (card) => {
        console.log('item in card press',card.id);
        Alert.alert(`Card '${card.title}' pressed`);
    };

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text>Example kanban board</Text>
                <View style={styles.actionsContainer}>
                    <Button onPress={addNewCard} title='Add new card' />
                </View>
                <KanbanBoard
                    columns={columns}
                    cards={cards}
                    onDragEnd={(srcColumn, destColumn, item, targetIdx) => onCardDragEnd(srcColumn, destColumn, item, targetIdx)}
                    onCardPress={(item) => onCardPress(item)}
                    style={styles.kanbanStyle}
                />
            </View>
        </ImageBackground>
    );
};

export default ProjectTab;
