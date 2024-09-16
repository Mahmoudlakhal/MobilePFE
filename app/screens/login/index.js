import React, { useState } from 'react';
import { View, TextInput, ImageBackground,Text, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importer useNavigation
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5 icons
import settings from '../../config/settings';


const LoginScreen = () => {
  const navigation = useNavigation(); // Initialiser la navigation
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ModalVisibility, setModalVisibility] = useState(false);
  const [modaltoken, setModalToken] = useState(false);
  const [resettoken, setResetToken] = useState('');
  const [newpasseword,   setNewpasseword] = useState('');
  const [confirmpasseword,   setConfirmpasseword] = useState('');

  
  
  
  const [email, setEmail] = useState('');

  const handlesendtoken = async () => {
    console.log('resettoken resettoken:',resettoken);
    console.log('newpasseword newpasseword:',newpasseword);
    console.log('confirmpasseword confirmpasseword:',confirmpasseword);



    setIsLoading(true);
  
  if(resettoken.length<3){
    Alert.alert('Error:', 'enter a valid token ');
    return
  }
  // Password validation criteria
  const passwordRegex = /^.{6}$/;

  if (newpasseword.length<3) {
    Alert.alert(
      'Error',
      'Password must be at least 6 characters long and contain at least one symbol and one number.'
    );
    return;
  }

  if(confirmpasseword != newpasseword){
    Alert.alert('Error:', 'confirm passeword and new passeword must be the same');
    return
  }
  console.log(`${settings.apiUrl}:8050/auth/savePassword/${resettoken}`);
  console.log('newpasasa',newpasseword);

  try {
    // Create FormData object and append the new password
    const formData = new FormData();
    formData.append('newPassword', newpasseword);

    const response = await fetch(`${settings.apiUrl}:8050/auth/savePassword/${resettoken}`, {
      method: 'POST',
      body: formData,
    });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  else{

    const data = await response.json();
      console.log('Check ', data);
      Alert.alert('Success:', 'your passeword has been correctly chaned');

      Alert.alert(
        'Success ',
        'your passeword has been correctly chaned.',
        [
          {
            text: 'OK',
            onPress: () => {
              
             setModalToken(false);
              setModalVisibility(false);
              setNewpasseword()
              setResetToken()
              setEmail()

              
            },
          },
        ],
        { cancelable: false });
      
  }
      
  
    
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error:', error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };






const handleforgotpasseword = async ()=>{
   console.log('ok');
  setModalVisibility(true)
}
const handleCancel = () => {
  setModalVisibility(false);
};

const handleSubmit = async () => {
  console.log('Email submitted:', email);
  setIsLoading(true);

  try {
    // Create FormData object and append the email
    const formData = new FormData();
    formData.append('email', email);

    const response = await fetch(`${settings.apiUrl}:8050/auth/forgetpassword`, {
      method: 'POST',
      body: formData,
      headers: {
        // Note: 'Content-Type': 'multipart/form-data' is set automatically by FormData
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Check your Mail:', data);

    if (data.user && data.user.length > 0) {
      Alert.alert(
        'Success to send token',
        'Token has been sent. Please check your email and continue.',
        [
          {
            text: 'OK',
            onPress: () => {
              setModalVisibility(false);

              setModalToken(true);
            },
          },
        ],
        { cancelable: false });
    } else {
      Alert.alert(
        'Success to send token',
        data.user,
        [
          {
            text: 'OK', onPress: () => {
              if (data.user === 'user not found') {
                return;
              } else {
                setModalVisibility(false);
                setModalToken(true)
              }
            }
          }
        ],
        { cancelable: false }
      );
    }
  } catch (error) {
    console.error('Error:', error);
    Alert.alert('Error:', error.message);
  } finally {
    setIsLoading(false);
  }
};

  const handleLogin = async () => {
    setIsLoading(true);

    const userData = {
      username,
      password,
    };

    try {
      const response = await fetch(`${settings.apiUrl}:8050/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('User ajouté avec succès:', data);

      if (data.message && data.message.length > 0) {
        Alert.alert(data.message);
      } else {
        Alert.alert(
          'Success logged in',
          data.email,
          [
            { text: 'OK', onPress: () => navigation.replace('Main') }, // Naviguer vers Listprojet
          ],
          { cancelable: false }
        );

        await AsyncStorage.setItem('User', JSON.stringify(data));
      }

      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du user:', error);
      Alert.alert('Erreur lors de l\'ajout du user:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
              <ImageBackground source={require('../assets/backgroundBleu.jpg')} style={styles.background}> 

      <Image source={require('../assets/agtialogo.png')} style={styles.logo}/>
      <View style={styles.card}>

      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>

      <Icon name="user" size={20} color="#007BFF" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      </View>
     

      <View style={styles.inputContainer}>
      <Icon name="lock" size={20} color="#007BFF" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      </View>

     
      
      <TouchableOpacity onPress={handleforgotpasseword} style={{alignSelf:'flex-end', marginRight:8}}><Text style={{color:'#007BFF'}} >mot de pass oublier ?</Text>
      </TouchableOpacity>
            

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.linksContainer}>
      <Text style={styles.linkText}>  
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>vous n'avez pas un compte ?</Text>
        </TouchableOpacity>
      </Text>
    </View>
      
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      </View></ImageBackground>



      <Modal
      animationType="slide"
      transparent={true}
      visible={ModalVisibility}
      onRequestClose={handleCancel}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Enter your email to reset your password</Text>
        <TextInput
          style={styles.modalinput}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.ModalbuttonContainer}>
          <TouchableOpacity
            onPress={handleCancel}
            style={[styles.modalbutton, styles.modalcancelButton]}
          >
            <Text style={styles.modalbuttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.modalbutton, styles.modalsubmitButton]}
          >
            <Text style={styles.modalbuttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

   

    <Modal
        animationType="slide"
        transparent={true}
        visible={modaltoken}
        onRequestClose={() => setModalToken(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter token and new passeword here to reset your password</Text>

          <View>
            <Text>Token</Text>
          <TextInput
            style={[styles.modalinput,{width:'80%'}]}
            placeholder="Enter token"
            value={resettoken}
            onChangeText={setResetToken}
            autoCapitalize="none"
          />

           <Text>New PAsseword</Text>
          <TextInput
            style={[styles.modalinput,{width:'80%'}]}
            placeholder="Enter New passeword"
            value={newpasseword}
            onChangeText={setNewpasseword}
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <Text>Confirm PAsseword</Text>
          <TextInput
            style={[styles.modalinput,{width:'80%'}]}
            placeholder="Enter New passeword"
            value={confirmpasseword}
            onChangeText={setConfirmpasseword}
            autoCapitalize="none"
            secureTextEntry={true}
          />
          </View>
        
          <View style={styles.ModalbuttonContainer}>
            <TouchableOpacity
              onPress={() => {
                setModalToken(false);
                setModalVisibility(true);
                setResetToken()
                setConfirmpasseword()
                setNewpasseword()
              }}
              style={[styles.modalbutton, styles.modalcancelButton]}
            >
              <Text style={styles.modalbuttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlesendtoken}
              style={[styles.modalbutton, styles.modalsubmitButton]}
            >
              <Text style={styles.modalbuttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
</View>
  );
};

export default LoginScreen;
