import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Redimensionnement de l'image pour couvrir tout le conteneur
  },

  linkSeparator: {
    width: 10, // Largeur de l'espace
  },

  forgetPassword: {
    color: 'blue', // Couleur bleue
    marginRight: 10, // Marge à droite pour séparer les liens
  },

  createAccount: {
    color: 'blue', // Couleur bleue
  },

});

export default styles;
