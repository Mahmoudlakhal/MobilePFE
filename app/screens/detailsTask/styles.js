import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fond semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
    textAlign: 'center',
  },
  taskContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fond semi-transparent
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailItem: {
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  detailValue: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
