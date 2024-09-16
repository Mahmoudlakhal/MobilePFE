import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(217, 217, 217, 0.8)', // Semi-transparent background for readability
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#ffffff',
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f0f0f0', // Light gray background
  },
  descriptionInput: {
    height: 100,
    marginBottom: 15,
    textAlignVertical: 'top', // Ensure multiline text is aligned to the top
  },
  picker: {
    width: '100%',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  listProjetText: {
    fontSize: 16,
    color: 'gray',
  },
  icon: {
    marginRight: 5,
  },
});
