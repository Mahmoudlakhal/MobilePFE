import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground,TextInput, Alert, Button } from 'react-native';
import styles from './styles';
import { KanbanBoard, ColumnModel, CardModel } from '@intechnity/react-native-kanban-board';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

    const ProjectTab = ({ route }) => {
    const { Project } = route.params;
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const [detailtaskVisibility, setDetailtaskVisibility] = useState(false);
    const [updattaskVisibility, setUpdateaskVisibility] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showstartDatePicker, setShowstartDatePicker] = useState(false);
    const [UserModalVsiibility, setUserModalVsiibility] = useState(false);

    const [task, setTask] = useState({});


    const [title, setTitle] = useState('');
    const [cleProjet, setCleProjet] = useState( '');
    const [description, setDescription] = useState('');
    const [etat, setEtat] = useState(task?.etat || '');
    const [timeTask, setTimeTask] = useState( '');
    const [taskType, setTaskType] = useState('');
    const [timepoinage, setTimepoinage] = useState(new Date());
    const [complexity, setComplexity] = useState( '');
    const [messionStart, setMessionStart] = useState(new Date());
    const [messionEnd, setMessionEnd] = useState(new Date());
    const [priority, setPriority] = useState('');
    const [taskid, setIdTask] = useState('');
console.log('mession end',messionEnd);
    const [forceUpdate, setForceUpdate] = useState(false);
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
    const handleUpdateProject = async ()=>{
      console.log('ssssss',selectedUsers);
      try {
        // Log the selected user IDs
        console.log('Selected User IDs:', selectedUsers);

        // Construct the URL with the selected user IDs
        const userIdsString = selectedUsers.join(',');
        const url = `http://192.168.1.14:8010/SpringMVC/projet/affecter/${Project.id}?listeIdsMembres=${userIdsString}`;
        
        // Make the PUT request
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
            }
        });

        // Check if the response is okay
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response data
        const data = await response.json();
        console.log('Task updated successfully:', data);
        Alert.alert('Success', 'Users added successfully');
        // Fetch the tasks again to update the state
        fetchTasks();
    } catch (error) {
          console.error('Erreur lors du chargement des projets:', error.message);
      }
    }

    const fetchUserss = async () => {
      try {
          const response = await fetch(`http://192.168.1.14:8050/user/all`);
          if (!response.ok) {
              throw new Error('Failed to fetch users');
          }
          const data = await response.json();
          console.log('daaara',data);
          setUsers(data);
      } catch (error) {
          console.error('Erreur lors du chargement des projets:', error.message);
      }
  };
  const handleUserSelection = (userId) => {
    setSelectedUsers(prevSelectedUsers => {
        if (prevSelectedUsers.includes(userId)) {
            return prevSelectedUsers.filter(id => id !== userId);
        } else {
            return [...prevSelectedUsers, userId];
        }
    });
}


    useEffect(() => {
        setForceUpdate(prev => !prev);
    }, [cards]);
    useEffect(() => {
      fetchUserss();
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

    const handleUpdate = async () => {
        const taskData = {
          title,
          description,
          priority,
          etat,
          taskType,
          complexity,
          timeTask,
          missionStart: messionStart.toString(),
          missionEnd: messionEnd.toString(),
          timePointage: timepoinage,
          title2: messionEnd.toString(),
          title3:messionStart.toString(),
        };
      
        console.log('JSON.stringify(taskData)',JSON.stringify(taskData))
        const url = `http://192.168.1.14:8010/SpringMVC/task/updateTask/${taskid}`;
        const method = 'PUT';
      
        fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json' // Specify the content type as JSON
          },
          body: JSON.stringify(taskData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Task updated successfully:', data);
          fetchTasks(); // Assuming fetchTasks is a function to fetch tasks again
        })
        .catch(error => {
          console.error('Error updating task:', error.message);
        });
      }
      
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
    const addNewUser = async ()=>{
      setUserModalVsiibility(true)
    }
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

                <TouchableOpacity onPress={addNewUser} style={styles.addButtonContainer}>
                 <Icon name="plus" size={20} color="white" style={styles.icon} />   
                 <Text style={styles.buttonText}>Add new User</Text>
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
        {/* details modal*/}    
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
    
      <TouchableOpacity style={styles.button3} onPress={() =>{setTitle(task.title),setTimepoinage(task.timepoinage),
        setEtat(task.etat),setTimeTask(task.timeTask),setTaskType(task.taskType),setComplexity(task.complexity),setMessionStart(new Date(task.messionStrat)),
    
        setMessionEnd(new Date(task.messionEnd)); setPriority(task.priority),setIdTask(task.id)
        setDescription(task.decription),setCleProjet(task.cle_projet), setDetailtaskVisibility(false); setUpdateaskVisibility(true); console.log('taaasksk',task);} }>
      <Icon name="edit" size={20} color="white" style={styles.icon} />  
      <Text style={styles.buttonText}>Update Task</Text>
      </TouchableOpacity>

     </View>

    </ScrollView>

   </View>

   </Modal>




       {/* add users modal*/}    
       <Modal
            isVisible={UserModalVsiibility}
            onSwipeComplete={() => {     
              setUserModalVsiibility(false);
            }}
            swipeDirection={['down']}
            backdropOpacity={0.5}
            style={styles.modal}>

  <View style={styles.modalContent}>

  <View style={styles.contentSwipeDown}>
    <View style={styles.lineSwipeDown} />
  </View>
  <ScrollView contentContainerStyle={styles.container}>

   


    <View style={styles.buttonContainer}>

       <TouchableOpacity style={styles.button2} onPress={() => showDeleteConfirmation()}>
      
       <Text style={styles.buttonText}>cancel</Text>
       </TouchableOpacity>

       <View style={{ marginHorizontal: 10 }}></View>
    
      <TouchableOpacity style={styles.button3} onPress={() =>{}}>
      <Text style={styles.buttonText}>add user</Text>
      </TouchableOpacity>

     </View>

    </ScrollView>

   </View>

   </Modal>

      {/* update modal*/}    


      <Modal
  isVisible={updattaskVisibility}
  onSwipeComplete={() => {     
    setUpdateaskVisibility(false);
  }}
  swipeDirection={['down']}
  backdropOpacity={0.5}
  style={styles.modal}
>
  <View style={styles.modalContent}>
    <View style={styles.contentSwipeDown}>
      <View style={styles.lineSwipeDown} />
    </View>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Task update</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Titre"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />
      <TextInput
        style={styles.input}
        value={etat}
        onChangeText={setEtat}
        placeholder="État du Task"
      />
      <TextInput
        style={styles.input}
        value={timeTask}
        onChangeText={setTimeTask}
        placeholder="Créé le"
      />
      <TextInput
        style={styles.input}
        value={taskType}
        onChangeText={setTaskType}
        placeholder="Domaine"
      />
      <TextInput
        style={styles.input}
        value={timepoinage}
        onChangeText={setTimepoinage}
        placeholder="Heures de travail"
      />
      <TextInput
        style={styles.input}
        value={complexity}
        onChangeText={setComplexity}
        placeholder="Complexité"
      />
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() =>  setShowstartDatePicker (true)}
      >
        <Text style={styles.date}>{messionStart.toDateString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.date}>{messionEnd.toDateString()}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={priority}
        onChangeText={setPriority}
        placeholder="Priorité"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button3}
          onPress={() => {
            setDetailtaskVisibility(false);
            setUpdateaskVisibility(true);
            handleUpdate();
          }}
        >
          <Icon name="edit" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Update Taskkk</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
</Modal>



   <Modal
  animationType="slide"
  transparent={true}
  visible={showDatePicker}
  onRequestClose={() => setShowDatePicker(false)}
>
  <View style={{
   
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.9)', // Semi-transparent background color for the modal
    zIndex: 9999,
    height:350,
    borderRadius:20
  }}>
    <DatePicker
      date={messionEnd}
      mode="date"
      onDateChange={date => {
        const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');

        console.log('datess',formattedDate);
        setMessionEnd(date);
        // setShowDatePicker(false);
      }}
    />
    <TouchableOpacity
      onPress={() => setShowDatePicker(false)}
      style={[styles.button, styles.roundButton]}
    >
      <Text style={styles.buttonText}>Confirmer</Text>
    </TouchableOpacity>
  </View>
</Modal>



<Modal
  animationType="slide"
  transparent={true}
  visible={showstartDatePicker}
  onRequestClose={() => setShowstartDatePicker(false)}
>
  <View style={{
   
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.9)', // Semi-transparent background color for the modal
    zIndex: 9999,
    height:350,
    borderRadius:20
  }}>
    <DatePicker
      date={messionStart}
      mode="date"
      onDateChange={date => {
        const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');

        console.log('datess',formattedDate);
        setMessionStart(date);
        // setShowDatePicker(false);
      }}
    />
    <TouchableOpacity
      onPress={() => setShowstartDatePicker(false)}
      style={[styles.button, styles.roundButton]}
    >
      <Text style={styles.buttonText}>Confirmer</Text>
    </TouchableOpacity>
  </View>
</Modal>



<Modal isVisible={updattaskVisibility}>
                <View style={styles.modalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <Text style={styles.modalTitle}>Update Task</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Priority"
                            value={priority}
                            onChangeText={setPriority}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="State"
                            value={etat}
                            onChangeText={setEtat}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Task Type"
                            value={taskType}
                            onChangeText={setTaskType}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Complexity"
                            value={complexity}
                            onChangeText={setComplexity}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Task Time"
                            value={timeTask}
                            onChangeText={setTimeTask}
                        />
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setShowstartDatePicker(true)}
                        >
                            <Text style={{ color: 'black' }}>{moment(messionStart).format('YYYY-MM-DD')}</Text>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={showstartDatePicker}
                            date={messionStart}
                            onConfirm={(date) => {
                                setShowstartDatePicker(false);
                                setMessionStart(date);
                            }}
                            onCancel={() => {
                                setShowstartDatePicker(false);
                            }}
                        />
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={{ color: 'black' }}>{moment(messionEnd).format('YYYY-MM-DD')}</Text>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={showDatePicker}
                            date={messionEnd}
                            onConfirm={(date) => {
                                setShowDatePicker(false);
                                setMessionEnd(date);
                            }}
                            onCancel={() => {
                                setShowDatePicker(false);
                            }}
                        />
                        <TouchableOpacity style={[styles.updateButton, { backgroundColor: 'blue' }]} onPress={handleUpdate}>
                            <Text style={styles.updateButtonText}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.updateButton, { backgroundColor: 'grey' }]} onPress={() => setUpdateaskVisibility(false)}>
                            <Text style={styles.updateButtonText}>Close</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>

            <Modal isVisible={UserModalVsiibility}>
                <View style={styles.modalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <Text style={styles.modalTitle}>Assign Users to Task</Text>
                        {users.map(user => (
                            <TouchableOpacity
                                key={user.id}
                                style={[
                                    styles.userItem,
                                    selectedUsers.includes(user.id) && styles.userItemSelected
                                ]}
                                onPress={() => handleUserSelection(user.id)}
                            >
                                <Text style={styles.userItemText}>{user.username}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={[styles.updateButton, { backgroundColor: 'green' }]}
                            onPress={() => {
                                console.log('Selected User IDs:', selectedUsers);
                              //  setUserModalVsiibility(false);
                                setDetailtaskVisibility(false);
                                handleUpdateProject()
                            }}>
                            <Text style={styles.updateButtonText}>Assign</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.updateButton, { backgroundColor: 'grey' }]}
                            onPress={() => setUserModalVsiibility(false)}>
                            <Text style={styles.updateButtonText}>Close</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>
</ImageBackground>
    );
};

export default ProjectTab;