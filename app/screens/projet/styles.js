import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    background: {
        flex: 1,
        resizeMode: 'cover', // ou 'stretch' pour étirer l'image pour remplir tout le conteneur
        justifyContent: 'center',
    },

  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#333',
  },
  input: {
    width: '100%',
    marginBottom: 15, // Espacement entre les champs
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    backgroundColor: '#fff',
    marginBottom: 20,

  },
  descriptionInput: {
    height: 100,
    marginBottom: 20,

  },
  picker: {
    width: '100%',
    marginBottom: 15, // Espacement entre les champs
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    backgroundColor: '#fff',
    marginBottom: 85,


  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 15,
    marginBottom: 15, // Espacement entre le bouton et les champs
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },


  listProjet: {
    flexDirection: 'row', // Alignement horizontal des éléments
    alignItems: 'center', // Alignement vertical des éléments
  },
  icon: {
    marginRight: 5, // Espacement entre l'icône et le texte
  },
  listProjetText: {
    fontSize: 16, // Taille du texte "Back"
    color: 'gray', // Couleur du texte "Back"
  },
});
