import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
  logo: {
    width: 200,
    height: 70,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  input: {
    width: '95%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  button: {
    width: '50%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linksContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkText: {
    color: '#007BFF',
    marginHorizontal: 5,
    fontSize: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  createAccount: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  activityIndicator: {
    marginTop: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },

  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 9999,
    height: 350,
    borderRadius: 20,
    margin: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalinput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  ModalbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalbutton: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  modalcancelButton: {
    backgroundColor: 'gray',
  },
  modalsubmitButton: {
    backgroundColor: 'blue',
  },
  modalbuttonText: {
    color: 'white',
    fontSize: 16,
  },
  card: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
});

export default styles;
