import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    paddingHorizontal: 16,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,


  },
  button: {
    width: '50%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    opacity: 0.85,
    marginBottom: 30,

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '80%',
    height: 100,
    borderRadius: 8,
    marginBottom: 30,
    opacity: 0.9,
  },
});
