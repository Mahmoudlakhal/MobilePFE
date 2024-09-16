import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#D9D9D9D9',
  },
  logo: {
    width: 200,
    height: 70,
    marginBottom: 30,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    padding: 10,
    backgroundColor: '#1F41BB',
    borderRadius: 5,
    marginBottom: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});