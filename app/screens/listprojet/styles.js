import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
    padding: 20,
    borderRadius: 10, // Rounded corners
    margin: 10, // Margin around the container
  },
  title: {
    fontSize: 28, // Larger font size
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center', // Center the title
  },
  projectItem: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    backgroundColor: '#ffffff',
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Shadow for Android
  },
  projectTitle: {
    fontSize: 20, // Larger font size
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  addProject: {
    backgroundColor: '#007bff', // Blue background for the add button
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center', // Center the add button text
  },
  addProjectText: {
    color: '#fff', // White text color for the add button
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
});
