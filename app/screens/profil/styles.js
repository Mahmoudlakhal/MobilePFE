import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9D9', // Semi-transparent background for readability
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
   
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
},
scrollContainer: {
    paddingBottom: 20,
},
modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
},
modalDescription: {
    fontSize: 16,
    marginBottom: 20,
},


});
