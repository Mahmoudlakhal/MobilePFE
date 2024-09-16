import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  
    title2: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white', 
        marginBottom: 20,
        // Couleur du texte blanche
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'red',
      borderRadius: 20,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
      },
    addButtonContainer: {
        flexDirection: 'row', // Pour aligner les éléments horizontalement
        alignItems: 'center', // Pour aligner les éléments verticalement au centre
        justifyContent: 'flex-start', // Pour aligner les éléments à l'extrême gauche
        padding: 10,
      },
      closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1, // Ensure it is above other content
      },
      buttonContainer: {
        flexDirection: 'row', // Aligner les éléments horizontalement
        justifyContent: 'space-between', // Espacement égal entre les boutons
        alignItems: 'center', // Alignement vertical des éléments
        marginBottom: 20, // Espacement en bas du conteneur
      },

    addButton: {
        backgroundColor: 'blue',
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row', // Pour aligner les éléments horizontalement
        alignItems: 'center',
      },
      icon: {
        marginRight: 10, // Ajoute un espacement entre l'icône et le bord du bouton
      },
      
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
      
      },
      
      modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20,
        marginTop: 100,
        height:'90%',
      },
      contentSwipeDown: {
        alignItems: 'center',
      },
      lineSwipeDown: {
        width: 35,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#D4D5D6',
        marginTop: 5,
      },
    background: {
        flex: 1,
        resizeMode: 'cover', // ou 'stretch' pour couvrir toute la vue, peu importe sa taille
    },
    
    container: {
        flex: 1,
      //  justifyContent: 'center',
    //    alignItems: 'center',
        paddingHorizontal: 20,

    },
    projectDetails: {
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        marginBottom: 40,
        // Centrer le texte
    },
    description: {
        fontSize: 23,
        marginBottom: 10,
        textAlign: 'center', // Centrer le texte
    },
    type: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center', // Centrer le texte
    },
    date: {
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center', // Centrer le texte
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },

    button2: {
        backgroundColor: 'red',
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row', // Pour aligner les éléments horizontalement
        alignItems: 'center',
        
    },
    
    commantairebutton: {
        borderColor: 'green',
        borderWidth:1,
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row', // Pour aligner les éléments horizontalement
        alignItems: 'center',

        
    },
    button3: {
        backgroundColor: 'gray',
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row', // Pour aligner les éléments horizontalement
        alignItems: 'center',
        
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center', // Centrer le texte
    },
    commantairebuttonText: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center', // Centrer le texte
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
      },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5, // For Android shadow
  },
  
  scrollContainer: {
      paddingBottom: 20,
  },
  modalTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: '#333',
      marginBottom: 15,
  },
  userItem: {
      flexDirection: 'row',         // Align items in a row
      alignItems: 'center',         // Center items vertically
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
  },
  userItemSelected: {
      backgroundColor: '#e0f7fa',   // Highlight color for selected item
  },
  userItemText: {
      fontSize: 16,
      marginLeft: 10,
      color: '#333',
  },
  userIcon: {
      marginRight: 10,
  },
  updateButton: {
      backgroundColor: '#007bff',
      paddingVertical: 12,
      borderRadius: 25,
      alignItems: 'center',
      marginTop: 20,
  },
  updateButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
  },
  
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    userItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    userItemSelected: {
        backgroundColor: '#d3d3d3',
    },
    userItemText: {
        fontSize: 16,
    },
    userContainer: {
        alignItems: 'center',
        margin: 10,
        
      },
      usercontainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10,
       
      },
      circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
      },
      initial: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
      },
      username: {
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center'
      },
      buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        alignSelf: 'center',
      },
      addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1F41BB',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginRight: 10,
      },
      addUserButton: {
        backgroundColor: '#4CAF50', // Different background color for user button
      },
      icon: {
        marginRight: 5,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
      },
      listContainer: {
        padding: 10,
      },
      commentCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 4,
      },
      commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      userIcon: {
        marginRight: 10,
      },
      userName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
        flex: 1,
      },
      deleteButton: {
        padding: 5,
      },
      userComment: {
        fontSize: 14,
        color: '#555',
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
      },
      input: {
        flex: 1,
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 20,
        marginRight: 10,
        backgroundColor: '#f9f9f9',
        marginBottom:18
      },
      sendButton: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 50,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
      },
      card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
        marginBottom: 20,
      },
      detail: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
      },
      menuOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
      },
      menuIcon: {
        marginRight: 10,
      },
      menuOptionText: {
        fontSize: 16,
        color: '#333',
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      
      title: {
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
      },
      value: {
        color: '#555',
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
      },
    
      icon: {
        marginRight: 10,
      },
      commentSection: {
        flexDirection: 'row', // Align items horizontally
        alignItems: 'center', // Align items vertically centered
    },
    commentText: {
        marginLeft: 10,
        fontSize: 16,
    },
});

export default styles;