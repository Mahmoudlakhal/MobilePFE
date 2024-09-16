import React, { useState, useEffect } from 'react';
import { View, Text,FlatList, TouchableOpacity,KeyboardAvoidingView, ImageBackground,TextInput, Alert, Button } from 'react-native';
import styles from './styles';
import { KanbanBoard, ColumnModel, CardModel } from '@intechnity/react-native-kanban-board';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Picker } from '@react-native-picker/picker';
import messaging from '@react-native-firebase/messaging';
import settings from '../../config/settings';
import DocumentPicker from 'react-native-document-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

    const ProjectTab = ({ route }) => {
    const { Project , user } = route.params;
    console.log('projeeeeeeeeeeeeeeeeeect',user);
    const [tasks, setTasks] = useState([]);
    const [Comments, setComments] = useState([]);

    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [usersByTask, setUsersByTask] = useState([]);
    const[newComment,setNewComment]=useState()
    const [detailtaskVisibility, setDetailtaskVisibility] = useState(false);
    const [updattaskVisibility, setUpdateaskVisibility] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showstartDatePicker, setShowstartDatePicker] = useState(false);
    const [shomwdatepickermessionstart, setshomwdatepickermessionstart] = useState(false);
    const [shomwdatepickermessionend, setshomwdatepickermessionend] = useState(false);
    const [UserModalVsiibility, setUserModalVsiibility] = useState(false);
    const [commentsCount, setCommentsCount] = useState(0);
    const [file, setFile] = useState(null);
    const [TextFromOCR, setTextFromOCR] = useState( '');
    const [TextFromOCRmodal, setTextFromOCRmodal] = useState(false);

    
    const [task, setTask] = useState({});
    const [comment, setComment] = useState({});


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




    const handleButtonPress = async () => {
      // Logic to open a modal or dropdown to select complexity
      // For example purposes, we'll cycle through values
   

      if(complexity==''||!complexity || taskType==''||!taskType ){
        Alert.alert('Error', 'You must choose Complexity && taskType as first !');

      }
     else {
      console.log( "complexity", complexity,
        "taskType", taskType);


        try {
          // Replace with your API endpoint URL
          const apiUrl = `${settings.apiUrl}:5007/prioritize_tasks`;
          
          // Make the API call using fetch
          const apiResponse = await fetch(apiUrl, {
            method: 'POST', // Use 'PUT' if you are updating an existing resource
            headers: {
              'Content-Type': 'application/json',
              // Include any other headers you need
            },
            body: JSON.stringify({
              "complexity": complexity,
              "taskType": taskType
            })
          });
        
          // Handle the response
          if (apiResponse.ok) {
            // Convert response to JSON
            const responseData = await apiResponse.json();
            setPriority(responseData.priority);
            console.log('All is good.', responseData); // Access the actual response data here
          } else {
            console.error('Failed to update FCM token:', apiResponse.statusText);
          }
        } catch (error) {
          console.error('Error while calling the API:', error);
        }
     }
    };

    const uploadFileOnPressHandler = async () => {
      try {
        const pickedFile = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.allFiles],
        });
        console.log('pickedFile', pickedFile);
    
        const formData = new FormData();
        if (pickedFile) {
          formData.append('image', { // Corrected 'file' to 'image' to match the Postman request
            uri: pickedFile.uri,
            name: pickedFile.name,
            type: pickedFile.type || 'application/octet-stream',
          });
        }
    
        console.log('FormData being sent:', formData);
    
        try {
          const apiUrl = `${settings.apiUrl}:5000/ocr`;
    
          // Make the API call using fetch
          const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            body: formData,  // No need to manually set 'Content-Type'
          });
          console.log("before log apiResponse");
    
          // Handle the response
          if (apiResponse.ok) {
            const responseData = await apiResponse.json();
            setTextFromOCR(responseData.text)
            setTextFromOCRmodal(true)
            console.log('Response from server:', responseData);
          } else {
           // setTextFromOCRmodal(false)
            console.error('Failed to get response:', apiResponse.statusText);
            setTextFromOCR("")
          //  setTextFromOCRmodal(false)
          }
        } catch (error) {
          console.error('Error while calling the API:', error);
        }
    
        setFile(pickedFile);
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('File selection was cancelled');
        } else {
          console.error('Error while selecting file:', err);
          throw err;
        }
      }
    };
    
console.log('mession end',messionEnd);
    const [forceUpdate, setForceUpdate] = useState(false);
    const fetchTasks = async () => {
        try {
            const response = await fetch(`${settings.apiUrl}:8010/SpringMVC/task/getTasksByProject/${Project.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Erreur lors du chargement des projets:', error.message);
        }
    };
    const CustomMenu = ({ item, handleUpdate, handleDelete }) => {
      const [isMenuVisible, setMenuVisible] = useState(false);
    
      return (
        <View style={{ position: 'relative',alignSelf:'flex-end',alignItems:'flex-end', width:100 }}>
        <TouchableOpacity onPress={() => setMenuVisible(!isMenuVisible)}>
          <Icon name="ellipsis-v" size={20} color="#1F41BB" style={styles.menuIcon} />
        </TouchableOpacity>
        {isMenuVisible && (
          <View style={{ backgroundColor:'#ffffff'}}>
            <TouchableOpacity style={styles.menuOption} onPress={() => { 
  setTitle(task.title);
          setTimepoinage(task.timepoinage);
          setEtat(task.etat);
          setTimeTask(task.timeTask);
          setTaskType(task.taskType);
          setComplexity(task.complexity);
          setMessionStart(new Date(task.title2));
          setMessionEnd(new Date(task.title3));
          setPriority(task.priority);
          setIdTask(task.id);
          setDescription(task.decription);
          setCleProjet(task.cle_projet);
          setDetailtaskVisibility(false);
          setUpdateaskVisibility(true);
}}>
            <Icon name="edit" size={20} color="#1A73E8" style={styles.menuIcon} />
            <Text style={styles.menuOptionText}>Update</Text>
       </TouchableOpacity>
            
      <TouchableOpacity style={styles.menuOption} onPress={() => {  showDeleteConfirmation(); setMenuVisible(false); }}>
            <Icon name="trash" size={20} color="#E74C3C" style={styles.menuIcon} />
            <Text style={styles.menuOptionText}>Delete</Text>
      </TouchableOpacity>
          </View>
        )}
      </View>
    
      );
    };
 /*   const handlemenyUpdate = (project) => {
      // Handle project update
      console.log("Update project:", project);
    };
  
    const handlemenuDelete = (project) => {
      // Handle project delete
      console.log("Delete project:", project);
    };*/
    const fetchComeents = async () => {
      console.log('Fetching comments for task ID:', task.id);
      const url = `${settings.apiUrl}:8010/SpringMVC/Commentaire/task/${task.id}/comments`;
      console.log('Request URL:', url);
      
      try {
        const response = await fetch(url);
        console.log('Response Status:', response.status);

        
        if (!response.ok) {
          const errorText = await response.text(); // Get error message from response
          throw new Error(`Failed to fetch comments: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Comments data:&', JSON.stringify(data, null , 2));
        setComments(data);
      } catch (error) {
        console.error('Erreur lors du chargement des commentaires:', error);
      }
    };
    
    
    const fetchNbComments = async () => {
      console.log('Fetching comments for task ID:', task.id);
      try {
          const response = await fetch(`${settings.apiUrl}:8010/SpringMVC/Commentaire/task/${task.id}/comments/count`);
          if (!response.ok) {
              throw new Error('Failed to fetch comments');
          }
          const data = await response.json();
          console.log('Number of comments:', data);
         await setCommentsCount(data);
      } catch (error) {
          console.error('E rreur lors du chargement des commentaires:', error);
      }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchComeents();  // Fetch the comments themselves
      await fetchNbComments(); // Fetch the number of comments

    };
  
    fetchData();
  }, [task.id]); // Add dependencies if needed
  


const deleteComment = async (id) => {
  console.log('Comment ID passed to deleteComment:', id); // Vérifiez l'ID ici
  try {
    const response = await fetch(`${settings.apiUrl}:8010/SpringMVC/Commentaire/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log('Comment deleted successfully');
      if (typeof fetchComeents === 'function') {
        await fetchComeents();
      } else {
        console.error('fetchComments is not defined');
      }
    } else {
      const errorText = await response.text();
      console.error('Failed to delete comment:', response.status, errorText);
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};


    const handleUpdateProject = async ()=>{
      console.log('ssssss',selectedUsers);
      try {
        // Log the selected user IDs
        console.log('Selected User IDs:', selectedUsers);

        // Construct the URL with the selected user IDs
        const userIdsString = selectedUsers.join(',');
        const url = `${settings.apiUrl}:8010/SpringMVC/projet/affecter/${Project.id}?listeIdsMembres=${userIdsString}`;
        
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
        if(response.status==200){
          try {
            // Replace with your API endpoint URL
            const apiUrl = `${settings.apiUrl}:8010/SpringMVC/sendNewTaskNotification`;
            
            // Your FCM token that you want to send in the request body
            const token = await messaging().getToken();
        
            // Make the API call using fetch
            const apiResponse = await fetch(apiUrl, {
              method: 'POST', // Use 'PUT' if you are updating an existing resource
              headers: {
                'Content-Type': 'application/json',
                // Include any other headers you need
              },
              body: JSON.stringify({ token }) // Sending the fcmtoken in the request body
            });
        
            // Handle the response
            if (apiResponse.ok) {
              console.log('FCM token updated successfully.');
            } else {
              console.error('Failed to update FCM token:', apiResponse.statusText);
            }
          } catch (error) {
            console.error('Error while calling the API:', error);
          }
        }
        Alert.alert('Success', 'Users added successfully');

        // Fetch the tasks again to update the state
        fetchTasks();
    } catch (error) {
          console.error('Erreur lors du chargement des projets:', error.message);
      }
    }

    const fetchUserss = async () => {
      try {
          const response = await fetch(`${settings.apiUrl}:8050/user/all`);
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

const fetchUsersByProject = async () => {
  try {
      const response = await fetch(`${settings.apiUrl}:8010/SpringMVC/projet/getMembresByProjet/${Project.id}`);
      if (!response.ok) {
          throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      console.log('fetchUsersByProject',data);
      setUsersByTask(data);
  } catch (error) {
      console.error('Erreur lors du chargement des projets:', error.message);
  }
};
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};






const handleAddComment = async() => {
 if(newComment.length==0){
  Alert.alert('Error', 'please enter a valid comment');

 }
 else {
  try {
    // Make POST request to create a new task
    const response = await fetch(`${settings.apiUrl}:8010/SpringMVC/Commentaire/${user.id}/${task.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            description:newComment
            
            // Add other necessary properties
        }),
    });

    if (!response.ok) {
      console.log('reeeeeesssss1111s',response);

        throw new Error('Failed to add comment');
    }
   else{
    console.log('reeeeeessssss',response);
    await setNewComment()
    await fetchComeents();
    //await fetchNbComments();
   }

   
} catch (error) {
    console.error('Error adding new comment:', error.message);
    // Display an error alert
    Alert.alert('Error', 'Failed to add comment');
}
 }
};
const renderItem = ({ item }) => (
  <ScrollView style={styles.commentCard}>
            <View style={styles.commentHeader}>
        <Icon name="user" size={24} color="#007BFF" style={styles.userIcon} />
        <Text style={styles.userName}>{item.username}</Text>
        <TouchableOpacity onPress={() => deleteComment(item.id)} style={styles.deleteButton}>
             <Icon name="trash" size={20} color="#cdcdcd" />
        </TouchableOpacity>

      </View>
      <Text style={styles.userComment}>{item.description}</Text>

    </ScrollView>
);
    useEffect(() => {
        setForceUpdate(prev => !prev);
    }, [cards]);
    useEffect(() => {
      fetchUsersByProject()
      fetchUserss();
        fetchTasks();
        fetchComeents()
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
        const url = `${settings.apiUrl}:8010/SpringMVC/task/updateTask/${taskid}`;
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
          Alert.alert(
            'Success',
            'Task updated successfully',
            [
            
              {
                text: 'Confirmer',
                onPress: () => {
                  setUpdateaskVisibility(false);
                },
              },
            ],
            { cancelable: true }
          );
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
            const response = await fetch(`${settings.apiUrl}:8010/SpringMVC/task/addTaskByProject/${Project.id}`, {
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
            const updatedResponse = await fetch(`${settings.apiUrl}:8010/SpringMVC/task/getTasksByProject/${Project.id}`);
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
        fetch(`${settings.apiUrl}:8010/SpringMVC/task/deleteTask/${taskId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                console.log('Task deleted successfully');
                fetchTasks();
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
            const response = await fetch(`${settings.apiUrl}:8010/SpringMVC/task/updateTask/${item.id}`, {
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

       fetch(`${settings.apiUrl}:8010/SpringMVC/task/getTask/${card.id}`)
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
        <ScrollView style={styles.container}>
            <Text style={styles.title2}>{Project.title}</Text>
      
            <View style={styles.buttonsContainer}>
      <TouchableOpacity onPress={addNewCard} style={styles.addButton}>
        <Icon name="plus" size={20} color="white" style={styles.icon} />   
        <Text style={styles.buttonText}>Add new card</Text>
      </TouchableOpacity>
      {Project.id_user == user.id && (
        <TouchableOpacity onPress={addNewUser} style={[styles.addButton, styles.addUserButton]}>
          <Icon name="user-plus" size={20} color="white" style={styles.icon} />   
          <Text style={styles.buttonText}>Add new User</Text>
        </TouchableOpacity>
      )}
    </View>
       

<View contentContainerStyle={styles.usercontainer} style={{  flexDirection: 'row',marginBottom:20 }}>
      {usersByTask.map((user) => (
        <View key={user.id} style={{}}>
          <View style={[styles.circle, { backgroundColor: getRandomColor() }]}>
            <Text style={styles.initial}>{user.username.charAt(0).toUpperCase()}</Text>
          </View>
        </View>
      ))}
    </View>
          <KanbanBoard
                    columns={columns}
                    cards={cards}
                    onDragEnd={(srcColumn, destColumn, item, targetIdx) => onCardDragEnd(srcColumn, destColumn, item, targetIdx)}
                    onCardPress={(item) => onCardPress(item)}
                    style={styles.kanbanStyle}
                    forceUpdate={forceUpdate}
                />

<TouchableOpacity style={{flexDirection: 'row',
width:80,
flexDirection: 'row',
width: 60, // Adjust size as needed for the round shape
height: 60, // Ensure height and width are the same for a circle
backgroundColor: '#1A73E8', // Background color of the button
borderRadius: 30, // Half of the width/height to make it fully round
alignItems: 'center',
justifyContent: 'center',
alignSelf:"flex-end",
marginRight:50,
elevation: 2, }} onPress={uploadFileOnPressHandler}>
  <MaterialCommunityIcons name="ocr" size={44} color="#fff" />
  {/* <Text style={{ color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',}}>Use OCR</Text> */}
      </TouchableOpacity>

        </ScrollView>
        {/* details modal*/}    
        <Modal
      isVisible={detailtaskVisibility}
      onSwipeComplete={() => {     
        setDetailtaskVisibility(false);
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
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
              {task?.title && (
            <View style={styles.detail}>
              <Text style={styles.title}><Icon name="clipboard" size={16} color="#007BFF" /> Titre:</Text>
              <Text style={styles.value}>{task.title}</Text>
            </View>
          )}
          {task?.cle_projet && (
            <View style={styles.detail}>
              <Text style={styles.title}><Icon name="key" size={16} color="#007BFF" /> Clé Projet:</Text>
              <Text style={styles.value}>{task.cle_projet}</Text>
            </View>
          )}
          {task?.description && (
            <View style={styles.detail}>
              <Text style={styles.title}><Icon name="file-alt" size={16} color="#007BFF" /> Description:</Text>
              <Text style={styles.value}>{task.description}</Text>
            </View>
          )}
          {task?.etat && (
            <View style={styles.detail}>
              <Text style={styles.title}><Icon name="info-circle" size={16} color="#007BFF" /> État du Task:</Text>
              <Text style={styles.value}>{task.etat}</Text>
            </View>
          )}
          {task?.timeTask && (
            <View style={styles.detail}>
              <Text style={styles.title}><Icon name="calendar" size={16} color="#007BFF" /> Créé le:</Text>
              <Text style={styles.value}>{task.timeTask}</Text>
            </View>
          )}
          {task?.taskType && (
            <View style={styles.detail}>
              <Text style={styles.title}><Icon name="cogs" size={16} color="#007BFF" /> Domaine:</Text>
              <Text style={styles.value}>{task.taskType}</Text>
            </View>
          )}
          {task?.timepoinage && (
            <View style={styles.detail}>
              <Text style={styles.title}><Icon name="clock" size={16} color="#007BFF" /> Heures de travail:</Text>
              <Text style={styles.value}>{task.timepoinage}</Text>
            </View>
          )}
          {task?.complexity && (
            <View style={styles.detail}>
              <Text style={styles.title}><Icon name="tasks" size={16} color="#007BFF" /> Complexité:</Text>
              <Text style={styles.value}>{task.complexity}</Text>
            </View>
          )}
          {task?.messionStrat && (
            <View style={styles.detail}>
              <Text style={styles.title}><Icon name="play" size={16} color="#007BFF" /> Début de mission:</Text>
              <Text style={styles.value}>{task.title2}</Text>
            </View>
          )}
          {task?.messionEnd && (
            <View style={styles.detail}>
              <Text style={styles.title}><Icon name="stop" size={16} color="#007BFF" /> Fin de mission:</Text>
              <Text style={styles.value}>{task.title3}</Text>
            </View>
          )}
          {task?.priority && (
            <View style={styles.detail}>
              <Text style={styles.title}><Icon name="exclamation-circle" size={16} color="#007BFF" /> Priorité:</Text>
              <Text style={styles.value}>{task.priority}</Text>
            </View>
          )}
                <View style={styles.commentSection}>
                  <Icon name="comment" size={20} color="#000" />
                  <Text style={styles.commentText}>{commentsCount} commentaire{commentsCount > 1 ? 's' : ''}</Text>
                </View>
              </View>
              <View style={{ alignSelf:'flex-start'}}>

             <CustomMenu item={task} handleUpdate={handleUpdate}  />

              </View>
            </View>
          </View>
         
          <KeyboardAvoidingView style={{ flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, margin: 10, backgroundColor: '#fff' }} behavior="padding">
            <FlatList
              data={Comments}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Add a comment..."
                value={newComment}
                onChangeText={text => setNewComment(text)}
              />
              <TouchableOpacity onPress={handleAddComment} style={styles.sendButton}>
                <Icon name="paper-plane" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
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

 {/* 
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
        onPress={() =>  setshomwdatepickermessionstart (true)}
      >
        <Text style={styles.date}>{messionStart.toDateString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setshomwdatepickermessionend(true)}
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
          <Text style={styles.buttonText}>Update Task</Text>
        </TouchableOpacity>
      </View>
          </ScrollView> 
 */}   


  </View>
</Modal>

<Modal
  animationType="slide"
  transparent={true}
  visible={shomwdatepickermessionend}
  onRequestClose={() => setshomwdatepickermessionend(false)}
>
  <View style={{
   
   alignSelf:'center',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgba(128, 128, 128, 0.98)', // Semi-transparent background color for the modal
   zIndex: 9999,
   height:350,
   borderRadius:20,
   width:'90%'
  }}>
    <DatePicker
      date={messionEnd}
      mode="date"
      onDateChange={date => {
        const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');

        console.log('datess',formattedDate);
        setMessionEnd(date);
      }}
    />
    <TouchableOpacity
      onPress={() => setshomwdatepickermessionend(false)}
      style={[{marginRight:20,marginTop:30,alignSelf:"flex-end"}]}
    >
      <Text style={styles.buttonText}>Continuer</Text>
    </TouchableOpacity>
  </View>
</Modal>


<Modal
  animationType="slide"
  transparent={true}
  visible={shomwdatepickermessionstart}
  onRequestClose={() => setshomwdatepickermessionstart(false)}
>
  <View style={{
   alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.98)', // Semi-transparent background color for the modal
    zIndex: 9999,
    height:350,
    borderRadius:20,
    width:'90%'
  }}>
    <DatePicker
      date={messionStart}
      mode="date"
      onDateChange={date => {
        const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');

        console.log('datess',formattedDate);
        setMessionStart(date);

      }}
      onConfirm={(date) => {
        setshomwdatepickermessionstart(false);
          setMessionStart(date);
      }}
      onCancel={() => {
        setshomwdatepickermessionstart(false);
      }}
    />
    <TouchableOpacity
      onPress={() => setshomwdatepickermessionstart(false)}
      style={[{marginRight:20,marginTop:30,alignSelf:"flex-end"}]}
    >
      <Text style={styles.buttonText}>Continuer</Text>
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
                            placeholder="Ajouter une Description"
                            value={description}
                            onChangeText={setDescription}
                        />
                     {/*    <TextInput
                            style={styles.input}
                            placeholder="Priority"
                            value={priority}
                            onChangeText={setPriority}
                        />*/}

         


                      {/*  <TextInput
                            style={styles.input}
                            placeholder="State"
                            value={etat}
                            onChangeText={setEtat}
                        />*/}
                        
         <Picker
           selectedValue={etat}
           style={{borderWidth:1 , marginBottom:18}}
           onValueChange={(itemValue) => setEtat(itemValue)}>
           <Picker.Item label="ETAT_A_FAIRE" value="ETAT_A_FAIRE" />
           <Picker.Item label="ETAT_ENCOURS" value="ETAT_ENCOURS" />
           <Picker.Item label="PROMLEME" value="PROMLEME" />
           <Picker.Item label="ETAT_TERMINE" value="ETAT_TERMINE" />
         </Picker>


                       {/*<TextInput
                            style={styles.input}
                            placeholder="Task Type"
                            value={taskType}
                            onChangeText={setTaskType}
                        />*/} 

       <Picker
          selectedValue={taskType}
          style={{borderWidth:1 , marginBottom:18}}
          onValueChange={(itemValue) => setTaskType(itemValue)}
         >
          <Picker.Item label="DevelopementWeb" value="DevelopementWeb" />
          <Picker.Item label="BackenDev" value="BackenDev" />
          <Picker.Item label="FrontEndDev" value="FrontEndDev" />
          <Picker.Item label="Mobile" value="Mobile" />
          <Picker.Item label="Integration" value="Integration" />
          <Picker.Item label="Deployement" value="Deployement" />
          <Picker.Item label="CI_CD" value="CI_CD" />

         </Picker>

                     {/*<TextInput
                            style={styles.input}
                            placeholder="Complexity"
                            value={complexity}
                            onChangeText={setComplexity}
                        />*/}

      <Picker
          selectedValue={complexity}
          style={{borderWidth:1 , marginBottom:18}}
          onValueChange={(itemValue) => setComplexity(itemValue)}
         >
          <Picker.Item label="NIVEAU_1" value="NIVEAU_1" />
          <Picker.Item label="NIVEAU_2" value="NIVEAU_2" />
          <Picker.Item label="NIVEAU_3" value="NIVEAU_3" />
          <Picker.Item label="NIVEAU_4" value="NIVEAU_4" />
          <Picker.Item label="NIVEAU_5" value="NIVEAU_5" />
       </Picker>
 

                       {/* <TextInput
                            style={styles.input}
                            placeholder="Task Time"
                            value={timeTask}
                            onChangeText={setTimeTask}
                        />*/}
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setshomwdatepickermessionstart(true)}
                        >
                            <Text style={{ color: 'black' }}>{moment(messionStart).format('YYYY-MM-DD')}</Text>
                        </TouchableOpacity>
                       
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setshomwdatepickermessionend(true)}
                        >
                            <Text style={{ color: 'black' }}>{moment(messionEnd).format('YYYY-MM-DD')}</Text>
                        </TouchableOpacity>
                        



                        <Text style={{marginBottom:5}}> Use AI to generate the priority</Text>
       <View style={{ flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,}}>
   <TouchableOpacity 
  style={{
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 34,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  }}
  onPress={handleButtonPress}
>
  <Icon 
    name="robot" // AI-related icon name
    size={20} 
    color="#000" 
  />
</TouchableOpacity>
      <View style={{  borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    flexGrow: 1,}}>
        <Text style={{fontSize: 16,}}>{priority}</Text>
      </View>
    </View>

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
        <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setUserModalVsiibility(false)}
        >
            <Icon name="times" size={20} color="#fff" />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.modalTitle}>Assign Users to Task</Text>
            {users.map(user => (
                <TouchableOpacity
                    key={user.id}
                    style={[
                        styles.userItem,
                        selectedUsers.includes(user.id) && styles.userItemSelected
                        ,{ flexDirection: 'row'}
                    ]}
                    onPress={() => handleUserSelection(user.id)}
                >
                    <Icon name="user-circle" size={30} color="#007bff" style={styles.userIcon} />
                    <Text style={styles.userItemText}>{user.username}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity
                style={styles.updateButton}
                onPress={() => {
                    console.log('Selected User IDs:', selectedUsers);
                    setDetailtaskVisibility(false);
                    handleUpdateProject();
                }}
            >
                <Text style={styles.updateButtonText}>Assign</Text>
            </TouchableOpacity>
        </ScrollView>
    </View>
</Modal>



            <Modal isVisible={TextFromOCRmodal}>
  <View style={styles.modalContainer}>
    <TouchableOpacity onPress={() => setTextFromOCRmodal(false)} style={styles.closeButton}>
      <Text style={styles.closeButtonText}>X</Text>
    </TouchableOpacity>

    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.modalTitle}>refornulation de l'image </Text>
      <Text style={[{
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20,
        
        height:'90%',

      }]}>{TextFromOCR}</Text>
    </ScrollView>
  </View>
</Modal>

 </ImageBackground>
    );
};

export default ProjectTab;