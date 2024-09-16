import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput,Alert, Image, StyleSheet, Platform ,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importer useNavigation
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5 icons
import AsyncStorage from '@react-native-async-storage/async-storage';
import settings from '../../config/settings';
import Modal from "react-native-modal";

const ProfilScreen = () => {
    const navigation = useNavigation(); // Initialize navigation
    const [userData, setUserData] = useState(null);
    const [ModalVisibility, setModalVisibility] = useState(false);
    const [ModalVisibilityP, setModalVisibilityP] = useState(false);


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // Update with initial value if available
    const [address, setAddress] = useState(''); // Update with initial value if available
    const [newpasseword, setnewpasseword] = useState(''); // Update with initial value if available
    const [oldpasseword, setoldpasseword] = useState(''); // Update with initial value if available
    const [confirmpasseword, setconfirmpasseword] = useState(''); // Update with initial value if available
    const [newpasseworderror, setnewpasseworderror] = useState(''); // Update with initial value if available
    const [oldpasseworderror, setoldpasseworderror] = useState(''); // Update with initial value if available
    const [confirmpasseworderror, setconfirmpasseworderror] = useState(''); // Update with initial value if available

    
const handleUpdatePasseword = async () => {

  let Err = false;

// Validate new password
if (newpasseword === '') {
    setnewpasseworderror('ce champ est obligatoire');
    Err = true;
} else {
    setnewpasseworderror('');
}

// Validate old password
if (oldpasseword === '') {
    setoldpasseworderror('ce champ est obligatoire');
    Err = true;
} else {
    setoldpasseworderror('');
}

// Validate confirm password
if (confirmpasseword === '') {
    setconfirmpasseworderror('ce champ est obligatoire');
    Err = true;
} else {
    setconfirmpasseworderror('');
}

// Check if new password and confirm password are the same
if (newpasseword !== '' && confirmpasseword !== '' && newpasseword !== confirmpasseword) {
    setconfirmpasseworderror('Les mots de passe ne correspondent pas');
    Err = true;
}

if(!Err){
  
   

  try {
    const token = userData?.accessToken;
    console.log('tokennnn', token);
    
    if (!token) {
        throw new Error("Token is missing or invalid.");
    }

    const url = `${settings.apiUrl}:8050/auth/changepass?token=${token}`;
    const headers = {
        'Authorization': `Bearer ${token}`,
    };

    // Create a FormData object
    const formData = new FormData();
    formData.append('oldPassword', oldpasseword);
    formData.append('newPassword', newpasseword);

    const response = await fetch(url, {
        method: 'PUT',
        headers: headers, // Do not set 'Content-Type' when using FormData
        body: formData,
    });

    // Parse the response as text first, then JSON
    const rawResponse = await response.text();
    console.log('Raw Response:', rawResponse);

    let jsonResponse;
    try {
        jsonResponse = JSON.parse(rawResponse);
    } catch (error) {
        console.error('Failed to parse JSON:', error);
        throw new Error('Invalid server response');
    }

    console.log('Parsed Response:', jsonResponse);
    
    // Show the message from the response
    if (jsonResponse.message) {
        Alert.alert('Message', jsonResponse.message);
        
        if (jsonResponse.message === 'Password changed successfully') {
            setModalVisibilityP(false);
            setnewpasseword('')
            setnewpasseworderror('')
            setconfirmpasseword('')
            setconfirmpasseworderror('')
            setoldpasseword('')
            setoldpasseworderror('')
        }
    }

    // Only throw an error if the response is not okay and there is no handled message
    if (!response.ok) {
        return; // Exit the function without throwing another error
    }

} catch (error) {
    console.error('Error:', error);
    if (error.message !== 'Invalid server response') { // Avoid showing duplicate errors
        Alert.alert('Error', error.message);
    }
}




};}

    const handleUpdate = async () => {
        try {
          const response = await fetch(`${settings.apiUrl}/updateUser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userData.accessToken}`,
            },
            body: JSON.stringify({
              username,
              email,
              phoneNumber,
              address,
            }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to update user data');
          }
    
          const data = await response.json();
          console.log('User data updated:', data);

          setModalVisibility(false);
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      };  
   
      
      
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Retrieve user data from AsyncStorage
                const userString = await AsyncStorage.getItem('User');
                console.log("Fetched user data:", userString);
        
                if (userString) {
                    // Parse the JSON string into an object
                    const user = JSON.parse(userString);
                    console.log("Parsed user data:", user);
        
                    // Set the user data into state
                    setUserData(user);
        
                    // Use the properties from the user object
                    setEmail(user.email || ''); // Default to an empty string if email is undefined
                    setAddress("123 Main St, City, Country"); // Update if you have address in user data
                    setPhoneNumber("92131827"); // Update if you have phone number in user data
                    setUsername(user.username || ''); // Default to an empty string if username is undefined
                } else {
                    console.log("No user data found in AsyncStorage");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        

        fetchUserData();
    }, []);

    useEffect(() => {
        console.log('user data', userData);
    }, [userData]);

    const handleLogout = async () => {
      console.log('token',userData?.accessToken);
        try {
            const response = await fetch(`${settings.apiUrl}:8030/SECURITY-SERVICE/auth/signout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData?.accessToken}`
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Success Alert
            Alert.alert(
                'Success',
                'User is correctly logged out',
                [
                    {
                        text: 'OK',
                        onPress: async () => {
                            try {
                                await clearUserData(); // Appeler la fonction pour supprimer les données de l'utilisateur
                                navigation.replace('Login'); // Naviguer vers l'écran de connexion
                            } catch (error) {
                                console.error('Error during logout cleanup:', error);
                                Alert.alert('Error', 'Failed to log out.');
                            }
                        }
                    }
                ],
                { cancelable: false }
            );

        } catch (error) {
            console.error('Error during logout:', error);
            Alert.alert('Error', 'Failed to log out.');
        }
    };

    const clearUserData = async () => {
        try {
            await AsyncStorage.removeItem('User'); // Supprimer les données de l'utilisateur du stockage
        } catch (error) {
            console.error('Error clearing user data:', error);
        }
    };

    return (
        <ImageBackground source={require('../assets/backgroundBleu.jpg')} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.card}>
            <TouchableOpacity onPress={() =>setModalVisibility(true)} style={{ position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,}}>
              <Icon name="edit" size={24} color='blue' />
            </TouchableOpacity>
  
            <Image
              source={{ uri: `${settings.apiUrl}:8050/auth/file/${userData?.image}` }}
              style={styles.profileImage}
            />
  
            <Text style={styles.name}>{userData?.username}</Text>
            <Text style={styles.info}>
              <Icon name="calendar" size={16} color='blue' /> Age: 30
            </Text>
            <Text style={styles.info}>
              <Icon name="briefcase" size={16} color='blue' /> {userData?.roles[0]}
            </Text>
            <Text style={styles.info}>
              <Icon name="map-marker-alt" size={16} color='blue' /> Address: 123 Main St, City, Country
            </Text>
            <Text style={styles.info}>
              <Icon name="envelope" size={16} color='blue' /> {userData?.email}
            </Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:"center" ,borderBottomWidth:1,borderBottomColor:"blue"}} onPress={() =>setModalVisibilityP(true)}>
            <Text style={{alignSelf:"center" , color:"blue"}}>Change passeword</Text>
            </TouchableOpacity>
          </View>
          
          {/* <Modal isVisible={ModalVsiibility}>
                <View style={{ backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,}}>
                    <ScrollView contentContainerStyle={{  paddingBottom: 20,}}>
                        <Text style={{ fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,}}>Assign Users to Task</Text>
                     


                     <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#007BFF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur"
              value={username}
              onChangeText={text => }
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="at" size={20} color="#007BFF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={text => }
              keyboardType="email-address"
            />
          </View>


          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color="#007BFF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Numéro de téléphone"
              value={phoneNumber}
              onChangeText={text => }
              keyboardType="phone-pad"
            />
          </View>


          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color="#007BFF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Adresse"
              value={phoneNumber}
              onChangeText={text => }
              keyboardType="phone-pad"
            />
          </View>
        <TouchableOpacity style={styles.logoutButton} onPress={() =>setModalVsiibility(false)}>
              <Text style={styles.logoutButtonText}>update</Text>
        </TouchableOpacity>
                    
                     </ScrollView>
          </View>
     </Modal> */}

 <Modal isVisible={ModalVisibility}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisibility(false)}
        >
          <Icon name="times" size={24} color="#fff" />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.modalTitle}>Update your account</Text>

          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#007BFF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur"
              value={username}
              onChangeText={text => setUsername(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="at" size={20} color="#007BFF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color="#007BFF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Numéro de téléphone"
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="map-marker" size={20} color="#007BFF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Adresse"
              value={address}
              onChangeText={text => setAddress(text)}
            />
          </View>

          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>

    <Modal isVisible={ModalVisibilityP}>
  <View style={styles.modalContainer}>
    <TouchableOpacity
      style={styles.closeButton}
      onPress={() => setModalVisibilityP(false)}
    >
      <Icon name="times" size={24} color="#fff" />
    </TouchableOpacity>

    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.modalTitle}>Update your Password</Text>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#007BFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Old password"
          secureTextEntry={true}
          value={oldpasseword}
          onChangeText={text => setoldpasseword(text)}
        />

        
      </View>
      {oldpasseworderror!=''&&(
      <Text style={{color:'red', marginLeft:5 , marginTop:-10}}>{oldpasseworderror}</Text>

      )}

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#007BFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="New password"
          secureTextEntry={true}
          value={newpasseword}
          onChangeText={text => setnewpasseword(text)}
        />
      </View>
      {newpasseworderror!=''&&(
      <Text style={{color:'red', marginLeft:5 , marginTop:-10}}>{newpasseworderror}</Text>

      )}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#007BFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          secureTextEntry={true}
          value={confirmpasseword}
          onChangeText={text => setconfirmpasseword(text)}
        />
      </View>
      {confirmpasseworderror!=''&&(
      <Text style={{color:'red', marginLeft:5 , marginTop:-10}}>{confirmpasseworderror}</Text>

      )}
     
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdatePasseword}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
</Modal>

        </View>
      </ImageBackground>
    );
};

export default ProfilScreen;

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        position: 'relative',
      },
      closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1, // Ensure it is above other content
      },
      scrollContainer: {
        paddingBottom: 20,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10,
      },
      inputIcon: {
        marginRight: 10,
      },
      input: {
        flex: 1,
        fontSize: 16,
      },
      updateButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center',
      },
      updateButtonText: {
        color: '#fff',
        fontSize: 16,
      },
    
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
        width: '95%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'flex-start',
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
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
        alignSelf: 'center'
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    info: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#FF6347',
        padding: 10,
        borderRadius: 5,
        width: '50%',
        alignItems: 'center',
        alignSelf: 'center'
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
});
