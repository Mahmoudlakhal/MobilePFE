import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    detail: {
        fontWeight: 'bold',
        marginBottom: 20,
        // Couleur du texte blanche
    },
    title2: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white', 
        marginBottom: 20,
        // Couleur du texte blanche
    },
    addButtonContainer: {
        flexDirection: 'row', // Pour aligner les éléments horizontalement
        alignItems: 'center', // Pour aligner les éléments verticalement au centre
        justifyContent: 'flex-start', // Pour aligner les éléments à l'extrême gauche
        padding: 10,
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
        justifyContent: 'center',
        alignItems: 'center',
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
    background: {
        flex: 1,
        resizeMode: 'cover',
      },
    
});

export default styles;